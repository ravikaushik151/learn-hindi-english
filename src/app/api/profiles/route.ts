import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { ChildProfile } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'kidProfilesDb.json');

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
  const kidCode = searchParams.get('kidCode')?.trim().toUpperCase();
  const name = searchParams.get('name')?.trim();
  const pin = searchParams.get('pin')?.trim();

  const profiles = readDb();

  // 1. Search by Unique Kid Code (e.g. "RAI-7429" or "RAVI-3184")
  if (kidCode) {
    const match = profiles.find((p) => (p.kidCode || '').toUpperCase() === kidCode);
    if (!match) {
      return NextResponse.json(
        { success: false, error: 'NOT_FOUND', message: 'No profile found with this Kid Code.' },
        { status: 404 }
      );
    }
    // If PIN is provided or required, verify PIN
    if (match.pin && pin && match.pin !== pin) {
      return NextResponse.json(
        { success: false, error: 'INCORRECT_PIN', message: 'Wrong 4-digit PIN for this Kid Code.' },
        { status: 401 }
      );
    }
    return NextResponse.json({ success: true, profile: match });
  }

  // 2. Search by Name + PIN (Protects users having the same name like Rai or Ravi)
  if (name && pin) {
    const matchingByName = profiles.filter(
      (p) => p.name.trim().toLowerCase() === name.toLowerCase()
    );

    if (matchingByName.length === 0) {
      return NextResponse.json(
        { success: false, error: 'NOT_FOUND', message: `No profile found for "${name}".` },
        { status: 404 }
      );
    }

    const exactMatch = matchingByName.find((p) => p.pin === pin || (!p.pin && pin === '1234'));
    if (!exactMatch) {
      return NextResponse.json(
        {
          success: false,
          error: 'INCORRECT_PIN',
          message: `Profile for "${name}" is protected with a 4-digit PIN. Please enter the correct PIN.`,
        },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true, profile: exactMatch });
  }

  return NextResponse.json({
    success: true,
    totalProfiles: profiles.length,
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

    const profiles = readDb();

    // Auto-generate unique Kid Code if missing (e.g. RAI-4829)
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

    // Update existing profile or push new one
    const existingIndex = profiles.findIndex(
      (p) => p.id === profile.id || (p.kidCode && p.kidCode === profile.kidCode)
    );

    if (existingIndex !== -1) {
      profiles[existingIndex] = {
        ...profiles[existingIndex],
        ...profile,
        lastActiveDate: profile.lastActiveDate || new Date().toISOString().split('T')[0],
      };
    } else {
      profiles.push(profile);
    }

    writeDb(profiles);

    return NextResponse.json({ success: true, profile });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}

