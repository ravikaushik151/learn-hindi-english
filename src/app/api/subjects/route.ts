import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface SubjectItem {
  id: string;
  nameEnglish: string;
  nameHindi: string;
  icon: string;
  color?: string;
  badgeColor?: string;
  description?: string;
  grades?: string[];
  isDefault?: boolean;
  createdAt?: number;
}

const DB_PATH = path.join(process.cwd(), 'data', 'subjectsDb.json');

function readDb(): SubjectItem[] {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return [];
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading subjectsDb:', err);
    return [];
  }
}

function writeDb(data: SubjectItem[]): boolean {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing subjectsDb:', err);
    return false;
  }
}

// GET all subjects
export async function GET() {
  const subjects = readDb();
  return NextResponse.json({ success: true, subjects });
}

// POST create new subject
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nameEnglish, nameHindi, icon, description, grades } = body;

    if (!nameEnglish || !nameEnglish.trim()) {
      return NextResponse.json({ success: false, message: 'Subject name is required.' }, { status: 400 });
    }

    const subjects = readDb();
    const cleanId = nameEnglish.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');

    if (subjects.some((s) => s.id === cleanId)) {
      return NextResponse.json({ success: false, message: 'Subject with this ID or name already exists.' }, { status: 400 });
    }

    const newSubject: SubjectItem = {
      id: cleanId,
      nameEnglish: nameEnglish.trim(),
      nameHindi: nameHindi ? nameHindi.trim() : nameEnglish.trim(),
      icon: icon || '📘',
      description: description ? description.trim() : '',
      grades: Array.isArray(grades) && grades.length > 0 ? grades : ['nursery', 'class-1', 'class-2', 'class-3', 'class-4-5'],
      isDefault: false,
      createdAt: Date.now(),
    };

    subjects.push(newSubject);
    writeDb(subjects);

    return NextResponse.json({ success: true, message: 'Subject added successfully!', subject: newSubject });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}

// PUT update existing subject
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, nameEnglish, nameHindi, icon, description, grades } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Subject ID is required.' }, { status: 400 });
    }

    const subjects = readDb();
    const index = subjects.findIndex((s) => s.id === id);

    if (index === -1) {
      return NextResponse.json({ success: false, message: 'Subject not found.' }, { status: 404 });
    }

    subjects[index] = {
      ...subjects[index],
      nameEnglish: nameEnglish ? nameEnglish.trim() : subjects[index].nameEnglish,
      nameHindi: nameHindi ? nameHindi.trim() : subjects[index].nameHindi,
      icon: icon || subjects[index].icon,
      description: description !== undefined ? description.trim() : subjects[index].description,
      grades: Array.isArray(grades) ? grades : subjects[index].grades,
    };

    writeDb(subjects);
    return NextResponse.json({ success: true, message: 'Subject updated successfully!', subject: subjects[index] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}

// DELETE subject
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ success: false, message: 'Subject ID is required.' }, { status: 400 });
  }

  const subjects = readDb();
  const target = subjects.find((s) => s.id === id);

  if (!target) {
    return NextResponse.json({ success: false, message: 'Subject not found.' }, { status: 404 });
  }

  if (target.isDefault) {
    return NextResponse.json({ success: false, message: 'Default core subjects cannot be deleted.' }, { status: 400 });
  }

  const filtered = subjects.filter((s) => s.id !== id);
  writeDb(filtered);

  return NextResponse.json({ success: true, message: `Subject "${target.nameEnglish}" deleted.` });
}

