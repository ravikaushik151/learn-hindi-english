import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { ChildProfile } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'kidProfilesDb.json');

function isGuestProfileName(name?: string): boolean {
  if (!name) return true;
  const clean = name.trim().toLowerCase();
  return (
    clean === 'young explorer' ||
    clean === 'little explorer' ||
    clean === 'नन्हा छात्र' ||
    clean.includes('my child') ||
    clean.includes('नन्हा छात्र')
  );
}

function readDb(): ChildProfile[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf8');
      return [];
    }
    const content = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(content) as ChildProfile[];
  } catch (err) {
    console.error('Error reading kid profiles DB:', err);
    return [];
  }
}

function writeDb(profiles: ChildProfile[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(profiles, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing kid profiles DB:', err);
  }
}

// GET: Find child profile across any browser by kidCode OR by Name + PIN
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawKidCode = searchParams.get('kidCode')?.trim();
  const rawName = searchParams.get('name')?.trim();
  const rawPin = searchParams.get('pin')?.trim();
  const rawGrade = searchParams.get('grade')?.trim();

  const profiles = readDb();
  const norm = (s: string) => (s || '').trim().toLowerCase();

  // 1. Check if the input looks like a Kid Code (e.g. "RAI-5678", "JEEV-5533", "JEEV-9280")
  const potentialCode = rawKidCode || (rawName && (rawName.includes('-') || (rawName.length >= 6 && /\d/.test(rawName))) ? rawName : null);

  if (potentialCode) {
    const codeUpper = potentialCode.toUpperCase();
    const match = profiles.find((p) => (p.kidCode || '').toUpperCase() === codeUpper);
    if (!match) {
      return NextResponse.json(
        { success: false, error: 'NOT_FOUND', message: `No profile found with Kid Code "${potentialCode}".` },
        { status: 404 }
      );
    }
    // Strict PIN check if provided
    if (rawPin) {
      const targetPin = (match.pin || '1234').trim();
      if (rawPin.trim() !== targetPin) {
        return NextResponse.json(
          { success: false, error: 'INCORRECT_PIN', message: 'Wrong 4-digit PIN for this Kid Code.' },
          { status: 401 }
        );
      }
    }
    const withComputedStars = (p: any) => ({
      ...p,
      stars:
        (p.englishStars || 0) +
        (p.hindiStars || 0) +
        (p.mathsStars || 0) +
        (p.scienceStars || 0) +
        (p.gkStars || 0),
    });

    return NextResponse.json({ success: true, profile: withComputedStars(match) });
  }

  // 2. Search by Name + PIN (Students with same name are strictly distinguished by their secret PIN!)
  if (rawName) {
    const inputName = norm(rawName);
    
    // Find all matching students by name
    let candidates = profiles.filter((p) => norm(p.name) === inputName);

    // If no exact match, allow fallback matching
    if (candidates.length === 0) {
      candidates = profiles.filter(
        (p) =>
          norm(p.kidCode || '') === inputName ||
          norm(p.name).includes(inputName) ||
          inputName.includes(norm(p.name))
      );
    }

    if (candidates.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'NOT_FOUND',
          message: `"${rawName}" नाम का कोई छात्र नहीं मिला। कृपया नाम की वर्तनी जांचें या नीचे नया प्रोफ़ाइल बनाएं।`,
        },
        { status: 404 }
      );
    }

    // STRICT CHECK: Both Name AND PIN must match!
    const enteredPin = rawPin ? rawPin.trim() : '1234';
    
    // Find candidate whose PIN strictly matches the entered PIN
    const pinMatches = candidates.filter((p) => (p.pin || '1234').trim() === enteredPin);

    const withComputedStars = (p: any) => ({
      ...p,
      stars:
        (p.englishStars || 0) +
        (p.hindiStars || 0) +
        (p.mathsStars || 0) +
        (p.scienceStars || 0) +
        (p.gkStars || 0),
    });

    if (pinMatches.length === 1) {
      return NextResponse.json({ success: true, profile: withComputedStars(pinMatches[0]) });
    }

    if (pinMatches.length === 0) {
      // Name was found, but the PIN does not match any student with that name!
      return NextResponse.json(
        {
          success: false,
          error: 'INCORRECT_PIN',
          message: `गलत पिन! "${rawName}" के लिए यह 4-अंकों का पिन सही नहीं है। कृपया सही पिन दर्ज करें।`,
        },
        { status: 401 }
      );
    }

    // If multiple students have the exact same name AND the exact same PIN
    // Disambiguate by Grade if provided
    if (rawGrade) {
      const gradeMatch = pinMatches.find((p) => norm(p.grade || '') === norm(rawGrade));
      if (gradeMatch) {
        return NextResponse.json({ success: true, profile: withComputedStars(gradeMatch) });
      }
    }

    // Otherwise return the first match
    return NextResponse.json({
      success: true,
      profile: withComputedStars(pinMatches[0]),
      disambiguationNeeded: pinMatches.length > 1,
    });
  }

  // Fallback: Only return full profiles list if admin=true (Strict privacy: never leak student names to public API)
  const isAdmin = searchParams.get('admin') === 'true';

  if (!isAdmin) {
    return NextResponse.json({
      success: true,
      totalProfiles: profiles.length,
      profiles: [],
    });
  }

  return NextResponse.json({
    success: true,
    totalProfiles: profiles.length,
    profiles: profiles.map((p) => ({
      id: p.id,
      name: p.name,
      kidCode: p.kidCode,
      avatar: p.avatar,
      grade: p.grade || 'Class 1',
      age: p.age || 6,
      pin: p.pin || '1234',
      englishStars: p.englishStars || 0,
      hindiStars: p.hindiStars || 0,
      mathsStars: p.mathsStars || 0,
      scienceStars: p.scienceStars || 0,
      gkStars: p.gkStars || 0,
      stars:
        (p.englishStars || 0) +
        (p.hindiStars || 0) +
        (p.mathsStars || 0) +
        (p.scienceStars || 0) +
        (p.gkStars || 0),
      streakDays: p.streakDays || 1,
      lastActiveDate: p.lastActiveDate,
      completedLessons: p.completedLessons || [],
      masteredWords: p.masteredWords || [],
      badges: p.badges || [],
      createdAt: p.createdAt,
    })),
  });
}

// POST: Save or Sync child profile to server
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const profile = body.profile as ChildProfile;

    if (!profile || !profile.name) {
      return NextResponse.json({ success: false, error: 'INVALID_PROFILE' }, { status: 400 });
    }

    // Never save temporary or guest profiles to server DB
    if (isGuestProfileName(profile.name) || (profile.id && profile.id.startsWith('guest-'))) {
      return NextResponse.json({ success: true, message: 'Guest profile not persisted to server DB', profile });
    }

    const profiles = readDb();

    // Auto-generate unique Kid Code if missing (e.g. JEEV-4829)
    if (!profile.kidCode) {
      const cleanName =
        profile.name
          .trim()
          .replace(/[^a-zA-Z0-9]/g, '')
          .toUpperCase()
          .slice(0, 4) || 'KID';
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      profile.kidCode = `${cleanName}-${randomDigits}`;
    }

    // Default PIN if missing
    if (!profile.pin) {
      profile.pin = '1234';
    }

    // Ensure valid avatar emoji
    if (!profile.avatar || profile.avatar.length < 2 || profile.avatar.includes('dY')) {
      profile.avatar = '🦁';
    }

    // Find existing profile to update:
    // 1. Match by Kid Code (Unique identifier across browsers)
    // 2. OR match by unique ID (excluding generic IDs)
    // 3. OR match by Name + PIN strictly
    const existingIndex = profiles.findIndex((p) => {
      if (p.kidCode && profile.kidCode && p.kidCode.toUpperCase() === profile.kidCode.toUpperCase()) {
        return true;
      }
      if (p.id && profile.id && p.id === profile.id && !p.id.startsWith('guest-') && p.id !== 'child-default-1') {
        return true;
      }
      if (
        p.name.trim().toLowerCase() === profile.name.trim().toLowerCase() &&
        (p.pin || '1234').trim() === (profile.pin || '1234').trim()
      ) {
        return true;
      }
      return false;
    });

    if (existingIndex !== -1) {
      const existing = profiles[existingIndex];
      // Intelligently merge progress so earned stars or lessons across different browser sessions NEVER regress!
      const mergedEnglishStars = Math.max(existing.englishStars || 0, profile.englishStars || 0);
      const mergedHindiStars = Math.max(existing.hindiStars || 0, profile.hindiStars || 0);
      const mergedMathsStars = Math.max(existing.mathsStars || 0, profile.mathsStars || 0);
      const mergedScienceStars = Math.max(existing.scienceStars || 0, profile.scienceStars || 0);
      const mergedGkStars = Math.max(existing.gkStars || 0, profile.gkStars || 0);
      const mergedCompletedLessons = Array.from(
        new Set([...(existing.completedLessons || []), ...(profile.completedLessons || [])])
      );
      const mergedMasteredWords = Array.from(
        new Set([...(existing.masteredWords || []), ...(profile.masteredWords || [])])
      );
      const mergedBadges = Array.from(
        new Set([...(existing.badges || []), ...(profile.badges || [])])
      );

      profiles[existingIndex] = {
        ...existing,
        ...profile,
        id: existing.id, // Preserve immutable server ID
        kidCode: existing.kidCode || profile.kidCode,
        englishStars: mergedEnglishStars,
        hindiStars: mergedHindiStars,
        mathsStars: mergedMathsStars,
        scienceStars: mergedScienceStars,
        gkStars: mergedGkStars,
        completedLessons: mergedCompletedLessons,
        masteredWords: mergedMasteredWords,
        badges: mergedBadges,
        lastActiveDate: profile.lastActiveDate || new Date().toISOString().split('T')[0],
      };
      profile.englishStars = mergedEnglishStars;
      profile.hindiStars = mergedHindiStars;
      profile.mathsStars = mergedMathsStars;
      profile.scienceStars = mergedScienceStars;
      profile.gkStars = mergedGkStars;
      profile.kidCode = profiles[existingIndex].kidCode;
    } else {
      profiles.push(profile);
    }

    writeDb(profiles);

    return NextResponse.json({ success: true, profile });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}

// PUT: Admin update student profile (edit details, change class, reset PIN, adjust stars)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, kidCode, updates } = body;

    if (!id && !kidCode) {
      return NextResponse.json({ success: false, message: 'Student ID or Kid Code is required.' }, { status: 400 });
    }

    const profiles = readDb();
    const index = profiles.findIndex(
      (p) => (id && p.id === id) || (kidCode && p.kidCode?.toUpperCase() === kidCode.toUpperCase())
    );

    if (index === -1) {
      return NextResponse.json({ success: false, message: 'Student profile not found.' }, { status: 404 });
    }

    profiles[index] = {
      ...profiles[index],
      ...updates,
      id: profiles[index].id, // Keep existing immutable ID
    };

    writeDb(profiles);
    return NextResponse.json({
      success: true,
      message: `Profile for "${profiles[index].name}" updated successfully!`,
      profile: profiles[index],
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}

// DELETE: Admin delete student profile
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const kidCode = searchParams.get('kidCode');

    if (!id && !kidCode) {
      return NextResponse.json({ success: false, message: 'Student ID or Kid Code is required.' }, { status: 400 });
    }

    const profiles = readDb();
    const target = profiles.find(
      (p) => (id && p.id === id) || (kidCode && p.kidCode?.toUpperCase() === kidCode.toUpperCase())
    );

    if (!target) {
      return NextResponse.json({ success: false, message: 'Student profile not found.' }, { status: 404 });
    }

    const filtered = profiles.filter((p) => p.id !== target.id);
    writeDb(filtered);

    return NextResponse.json({
      success: true,
      message: `Student "${target.name}" (${target.kidCode}) deleted successfully.`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}
