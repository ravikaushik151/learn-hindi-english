"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { soundEffects } from '@/lib/sounds';
import confetti from 'canvas-confetti';
import { QuestionUploaderModal } from '@/components/QuestionUploaderModal';
import { CLASS_WISE_CURRICULUM } from '@/data/classWiseCurriculumData';
import {
  Shield,
  ShieldCheck,
  Users,
  BookOpen,
  Upload,
  Plus,
  Trash2,
  Edit3,
  KeyRound,
  Search,
  Filter,
  Download,
  ArrowLeft,
  LogOut,
  Sparkles,
  RefreshCw,
  Eye,
  EyeOff,
  Lock,
  BarChart3,
  Layers,
  Settings,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
  Globe2,
  Calculator,
  Languages,
  Check,
  X,
  FileSpreadsheet,
  ExternalLink,
} from 'lucide-react';

interface StudentProfile {
  id: string;
  name: string;
  kidCode: string;
  avatar: string;
  grade: string;
  age: number;
  pin?: string;
  englishStars?: number;
  hindiStars?: number;
  mathsStars?: number;
  scienceStars?: number;
  gkStars?: number;
  stars?: number;
  streakDays: number;
  lastActiveDate?: string;
  completedLessons?: string[];
  createdAt?: number;
}

interface QuestionItem {
  id: string;
  grade: string;
  subject: string;
  questionEnglish: string;
  questionHindi?: string;
  options: string[];
  correctAnswer: string;
  explanationEnglish?: string;
  explanationHindi?: string;
  visual?: string;
  source?: string;
  createdAt?: number;
}

interface SubjectItem {
  id: string;
  nameEnglish: string;
  nameHindi: string;
  icon: string;
  description?: string;
  grades?: string[];
  isDefault?: boolean;
}

const DEFAULT_ADMIN_PIN = '9999';

export default function AdminDashboardPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminPinInput, setAdminPinInput] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'questions' | 'subjects' | 'settings'>('overview');

  // Data states
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [customQuestions, setCustomQuestions] = useState<QuestionItem[]>([]);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modals
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentProfile | null>(null);

  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuestionItem | null>(null);

  const [subjectModalOpen, setSubjectModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<SubjectItem | null>(null);

  // Filters
  const [studentSearch, setStudentSearch] = useState('');
  const [studentGradeFilter, setStudentGradeFilter] = useState('all');

  const [questionSearch, setQuestionSearch] = useState('');
  const [questionGradeFilter, setQuestionGradeFilter] = useState('all');
  const [questionSubjectFilter, setQuestionSubjectFilter] = useState('all');

  // Check existing session on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAuth = sessionStorage.getItem('admin_session_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Fetch all administration data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch Students
      const profRes = await fetch('/api/profiles?admin=true');
      const profData = await profRes.json();
      if (profData.success && Array.isArray(profData.profiles)) {
        setStudents(profData.profiles);
      }

      // 2. Fetch Custom Questions
      const qRes = await fetch('/api/questions');
      const qData = await qRes.json();
      if (qData.success && Array.isArray(qData.questions)) {
        setCustomQuestions(qData.questions);
      }

      // 3. Fetch Subjects
      const subRes = await fetch('/api/subjects');
      const subData = await subRes.json();
      if (subData.success && Array.isArray(subData.subjects)) {
        setSubjects(subData.subjects);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Auth Handler
  const handleAdminLogin = (e?: React.FormEvent, customVal?: string) => {
    if (e) e.preventDefault();
    const pin = (customVal !== undefined ? customVal : adminPinInput).trim();
    const storedMaster = (typeof window !== 'undefined' && localStorage.getItem('admin_custom_pin')) || DEFAULT_ADMIN_PIN;

    if (pin === storedMaster || pin === 'admin' || pin === '1234' || pin === '9999') {
      soundEffects.playCelebration();
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_session_auth', 'true');
      setAuthError(null);
    } else {
      soundEffects.playTryAgain();
      setAuthError('Incorrect Admin PIN / Password. Default is 9999 (or type admin).');
    }
  };

  const handleAdminLogout = () => {
    soundEffects.playPop();
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_session_auth');
  };

  // Student CRUD
  const handleSaveStudent = async (studentData: Partial<StudentProfile>) => {
    try {
      if (editingStudent) {
        const res = await fetch('/api/profiles', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingStudent.id, updates: studentData }),
        });
        const d = await res.json();
        if (d.success) {
          showToast(`Student "${studentData.name}" updated successfully!`);
          setStudentModalOpen(false);
          setEditingStudent(null);
          fetchData();
        } else {
          showToast(d.message || 'Error updating student', 'error');
        }
      } else {
        const res = await fetch('/api/profiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            profile: {
              ...studentData,
              id: `child-${Date.now()}`,
              createdAt: Date.now(),
              scienceStars: studentData.scienceStars || 0,
              gkStars: studentData.gkStars || 0,
              mathsStars: studentData.mathsStars || 0,
              englishStars: studentData.englishStars || 0,
              hindiStars: studentData.hindiStars || 0,
              streakDays: 1,
              completedLessons: [],
              masteredWords: [],
            },
          }),
        });
        const d = await res.json();
        if (d.success) {
          showToast(`Student "${studentData.name}" created successfully!`);
          setStudentModalOpen(false);
          fetchData();
        } else {
          showToast(d.message || 'Error creating student', 'error');
        }
      }
    } catch (e: any) {
      showToast(e?.message || 'Server error', 'error');
    }
  };

  const handleDeleteStudent = async (student: StudentProfile) => {
    if (!confirm(`Are you sure you want to delete student "${student.name}" (${student.kidCode})? This will permanently remove their records.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/profiles?id=${student.id}`, { method: 'DELETE' });
      const d = await res.json();
      if (d.success) {
        showToast(`Student "${student.name}" deleted.`);
        fetchData();
      } else {
        showToast(d.message || 'Error deleting student', 'error');
      }
    } catch (e: any) {
      showToast(e?.message || 'Server error', 'error');
    }
  };

  // Question CRUD
  const handleSaveQuestion = async (qData: Partial<QuestionItem>) => {
    try {
      if (editingQuestion) {
        const res = await fetch('/api/questions', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingQuestion.id, updates: qData }),
        });
        const d = await res.json();
        if (d.success) {
          showToast('Question updated successfully!');
          setQuestionModalOpen(false);
          setEditingQuestion(null);
          fetchData();
        } else {
          showToast(d.message || 'Error updating question', 'error');
        }
      } else {
        const res = await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questions: [qData] }),
        });
        const d = await res.json();
        if (d.success) {
          showToast('Question added to class curriculum!');
          setQuestionModalOpen(false);
          fetchData();
        } else {
          showToast(d.message || 'Error saving question', 'error');
        }
      }
    } catch (e: any) {
      showToast(e?.message || 'Server error', 'error');
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    try {
      const res = await fetch(`/api/questions?id=${id}`, { method: 'DELETE' });
      const d = await res.json();
      if (d.success) {
        showToast('Question deleted.');
        fetchData();
      } else {
        showToast(d.message || 'Error deleting question', 'error');
      }
    } catch (e: any) {
      showToast(e?.message || 'Server error', 'error');
    }
  };

  // Subject CRUD
  const handleSaveSubject = async (subData: Partial<SubjectItem>) => {
    try {
      if (editingSubject) {
        const res = await fetch('/api/subjects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingSubject.id, ...subData }),
        });
        const d = await res.json();
        if (d.success) {
          showToast(`Subject "${subData.nameEnglish}" updated!`);
          setSubjectModalOpen(false);
          setEditingSubject(null);
          fetchData();
        } else {
          showToast(d.message || 'Error updating subject', 'error');
        }
      } else {
        const res = await fetch('/api/subjects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subData),
        });
        const d = await res.json();
        if (d.success) {
          showToast(`Subject "${subData.nameEnglish}" added!`);
          setSubjectModalOpen(false);
          fetchData();
        } else {
          showToast(d.message || 'Error creating subject', 'error');
        }
      }
    } catch (e: any) {
      showToast(e?.message || 'Server error', 'error');
    }
  };

  const handleDeleteSubject = async (sub: SubjectItem) => {
    if (sub.isDefault) {
      alert('Core default subjects cannot be deleted.');
      return;
    }
    if (!confirm(`Are you sure you want to delete subject "${sub.nameEnglish}"?`)) return;

    try {
      const res = await fetch(`/api/subjects?id=${sub.id}`, { method: 'DELETE' });
      const d = await res.json();
      if (d.success) {
        showToast(`Subject "${sub.nameEnglish}" deleted.`);
        fetchData();
      } else {
        showToast(d.message || 'Error deleting subject', 'error');
      }
    } catch (e: any) {
      showToast(e?.message || 'Server error', 'error');
    }
  };

  // Compute stats
  const coreQuestionsCount = Object.values(CLASS_WISE_CURRICULUM).reduce((total, grade) => {
    const list = [
      ...grade.mathsTopics,
      ...grade.englishTopics,
      ...grade.hindiTopics,
      ...(grade.scienceTopics || []),
      ...(grade.gkTopics || []),
    ];
    return total + list.reduce((sub, t) => sub + t.quizQuestions.length, 0);
  }, 0);

  const totalQuestions = coreQuestionsCount + customQuestions.length;
  const totalStudents = students.length;
  const totalStarsAwarded = students.reduce(
    (acc, s) =>
      acc +
      (s.englishStars || 0) +
      (s.hindiStars || 0) +
      (s.mathsStars || 0) +
      (s.scienceStars || 0) +
      (s.gkStars || 0),
    0
  );

  // Filter students
  const filteredStudents = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      (s.kidCode || '').toLowerCase().includes(studentSearch.toLowerCase()) ||
      (s.pin || '').includes(studentSearch);
    const matchGrade = studentGradeFilter === 'all' || s.grade.toLowerCase().includes(studentGradeFilter.toLowerCase());
    return matchSearch && matchGrade;
  });

  // Filter questions
  const filteredQuestions = customQuestions.filter((q) => {
    const matchSearch =
      q.questionEnglish.toLowerCase().includes(questionSearch.toLowerCase()) ||
      (q.questionHindi || '').toLowerCase().includes(questionSearch.toLowerCase());
    const matchGrade = questionGradeFilter === 'all' || q.grade.toLowerCase() === questionGradeFilter.toLowerCase();
    const matchSubject = questionSubjectFilter === 'all' || q.subject.toLowerCase() === questionSubjectFilter.toLowerCase();
    return matchSearch && matchGrade && matchSubject;
  });

  // -------------------------------------------------------------
  // 1. PROFESSIONAL ADMIN AUTHENTICATION GATE
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-center p-4 overflow-y-auto font-sans">
        <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex p-3.5 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 text-[11px] font-black uppercase tracking-wider rounded-full border border-indigo-500/30 mb-1">
                Admin & Teacher Portal
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">Academy Console</h1>
              <p className="text-xs text-slate-400 mt-1">
                Manage students, upload questions, and configure class curriculum.
              </p>
            </div>
          </div>

          {/* Auth Error */}
          {authError && (
            <div className="p-3 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold rounded-xl text-center flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={(e) => handleAdminLogin(e)} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Enter Admin Master PIN / Password:</span>
              </label>

              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  required
                  autoFocus
                  value={adminPinInput}
                  onChange={(e) => setAdminPinInput(e.target.value)}
                  placeholder="PIN: 9999 or admin"
                  className="w-full px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-700 text-white font-mono text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Unlock 1-Click Button */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Default PIN: 9999</span>
              <button
                type="button"
                onClick={() => handleAdminLogin(undefined, '9999')}
                className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
              >
                ⚡ Quick Unlock (9999)
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white font-black text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Admin Console ➔</span>
            </button>
          </form>

          {/* Back link */}
          <div className="pt-2 border-t border-slate-800 text-center">
            <Link
              href="/"
              className="text-xs font-bold text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Student Learning App</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. MAIN ADMIN CONSOLE (AUTHENTICATED)
  // -------------------------------------------------------------
  return (
    <div className="fixed inset-0 z-40 bg-slate-950 text-slate-100 flex flex-col overflow-y-auto font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-black tracking-tight leading-tight">
                Academy Admin Portal
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                ● Live Database
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Class & Questions Administration</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Student View</span>
          </Link>

          <button
            onClick={handleAdminLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-4 space-y-2 shrink-0">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 py-1">
            Navigation Menu
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview & Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'students'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>Students / Users</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs font-mono">
              {students.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('questions')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'questions'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4" />
              <span>Question Bank</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs font-mono">
              {totalQuestions}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('subjects')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'subjects'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4" />
              <span>Subjects & Topics</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs font-mono">
              {subjects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings & Backup</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Toast Notification */}
          {toastMessage && (
            <div
              className={`p-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between gap-2 shadow-lg animate-in slide-in-from-top-2 ${
                toastMessage.type === 'success'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-rose-500 text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                {toastMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{toastMessage.text}</span>
              </div>
              <button onClick={() => setToastMessage(null)} className="opacity-80 hover:opacity-100 cursor-pointer">
                ✕
              </button>
            </div>
          )}

          {/* ========================================================
              TAB 1: OVERVIEW & STATS
              ======================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black">System Overview</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Key academy metrics, question bank totals, and student engagement.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase">Total Students</span>
                    <Users className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-black font-mono text-white">{totalStudents}</div>
                  <p className="text-[11px] text-slate-400">Registered across Nursery - Class 5</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase">Question Bank</span>
                    <BookOpen className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black font-mono text-white">{totalQuestions}</div>
                  <p className="text-[11px] text-slate-400">
                    {coreQuestionsCount} core + {customQuestions.length} custom uploaded
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase">Active Subjects</span>
                    <Layers className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="text-3xl font-black font-mono text-white">{subjects.length}</div>
                  <p className="text-[11px] text-slate-400">Science, GK, Maths, English, Hindi</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase">Stars Awarded</span>
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-3xl font-black font-mono text-amber-400">⭐ {totalStarsAwarded}</div>
                  <p className="text-[11px] text-slate-400">Total student quiz achievements</p>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-2xl space-y-4 shadow-sm">
                <h3 className="text-base font-black flex items-center gap-2">
                  <span>⚡ Quick Admin Actions</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      setEditingStudent(null);
                      setStudentModalOpen(true);
                    }}
                    className="p-4 bg-slate-800 hover:bg-slate-700/80 rounded-xl border border-slate-700 text-left transition-all cursor-pointer group"
                  >
                    <Users className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="font-bold text-sm text-white">Add New Student</div>
                    <div className="text-xs text-slate-400">Create profile, assign PIN & class</div>
                  </button>

                  <button
                    onClick={() => setIsUploaderOpen(true)}
                    className="p-4 bg-slate-800 hover:bg-slate-700/80 rounded-xl border border-slate-700 text-left transition-all cursor-pointer group"
                  >
                    <Upload className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="font-bold text-sm text-white">Upload Questions</div>
                    <div className="text-xs text-slate-400">Bulk import from Excel (.xlsx) or PDF</div>
                  </button>

                  <button
                    onClick={() => {
                      setEditingSubject(null);
                      setSubjectModalOpen(true);
                    }}
                    className="p-4 bg-slate-800 hover:bg-slate-700/80 rounded-xl border border-slate-700 text-left transition-all cursor-pointer group"
                  >
                    <Layers className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="font-bold text-sm text-white">Create Subject</div>
                    <div className="text-xs text-slate-400">Add new academic subject & topics</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: STUDENTS / USERS MANAGEMENT
              ======================================================== */}
          {activeTab === 'students' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black">Student & User Management</h2>
                  <p className="text-xs text-slate-400">
                    View student PINs, edit profiles, change classes, and manage access.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingStudent(null);
                    setStudentModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Student</span>
                </button>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-2xl">
                <div className="flex items-center gap-2 flex-1 w-full bg-slate-800 px-3 py-2 rounded-xl border border-slate-700">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="Search by student name, kid code, or PIN..."
                    className="bg-transparent text-xs sm:text-sm text-white focus:outline-none w-full placeholder-slate-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                  <select
                    value={studentGradeFilter}
                    onChange={(e) => setStudentGradeFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 focus:outline-none w-full sm:w-auto"
                  >
                    <option value="all">All Classes</option>
                    <option value="Nursery">Nursery / LKG</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4 & 5</option>
                  </select>
                </div>
              </div>

              {/* Students Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-800/80 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-700">
                      <tr>
                        <th className="p-3.5">Student</th>
                        <th className="p-3.5">Kid Code</th>
                        <th className="p-3.5">Class & Age</th>
                        <th className="p-3.5">4-Digit PIN</th>
                        <th className="p-3.5">Total Stars</th>
                        <th className="p-3.5">Streak</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredStudents.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3.5 flex items-center gap-2.5">
                            <span className="text-2xl p-1 bg-slate-800 rounded-xl">{s.avatar || '🦁'}</span>
                            <div>
                              <div className="font-bold text-white">{s.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono">ID: {s.id}</div>
                            </div>
                          </td>
                          <td className="p-3.5 font-mono font-bold text-indigo-300">{s.kidCode}</td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-bold text-xs">
                              {s.grade} • {s.age} yrs
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-mono font-black border border-amber-500/30">
                              {s.pin || '1234'}
                            </span>
                          </td>
                          <td className="p-3.5 font-bold text-amber-400">
                            ⭐ {(s.englishStars || 0) + (s.hindiStars || 0) + (s.mathsStars || 0) + (s.scienceStars || 0) + (s.gkStars || 0)}
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                              Sci: {s.scienceStars || 0} | GK: {s.gkStars || 0} | Math: {s.mathsStars || 0} | Eng: {s.englishStars || 0} | Hin: {s.hindiStars || 0}
                            </div>
                          </td>
                          <td className="p-3.5 font-bold text-orange-400">🔥 {s.streakDays || 1} d</td>
                          <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => {
                                setEditingStudent(s);
                                setStudentModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 transition-colors cursor-pointer"
                              title="Edit Student Details"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(s)}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition-colors cursor-pointer"
                              title="Delete Student"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}

                      {filteredStudents.length === 0 && (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-500 font-bold">
                            No students match your search criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: QUESTION BANK MANAGEMENT
              ======================================================== */}
          {activeTab === 'questions' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black">Question Bank Management</h2>
                  <p className="text-xs text-slate-400">
                    Add, edit, bulk upload via Excel/PDF, and manage questions class-wise.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="/downloads/Sample_Questions_Template.xlsx"
                    download="Sample_Questions_Template.xlsx"
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                    title="Download Sample Excel Spreadsheet with Icons and Questions"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    <span>Sample Excel (.xlsx)</span>
                  </a>

                  <a
                    href="/downloads/Sample_Questions_Guide.pdf"
                    download="Sample_Questions_Guide.pdf"
                    className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                    title="Download Sample PDF Question Paper with Icons"
                  >
                    <Download className="w-4 h-4 text-rose-400" />
                    <span>Sample PDF (.pdf)</span>
                  </a>

                  <button
                    onClick={() => setIsUploaderOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Excel / PDF</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditingQuestion(null);
                      setQuestionModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Single Question</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-900 border border-slate-800 rounded-2xl">
                <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-xl border border-slate-700">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={questionSearch}
                    onChange={(e) => setQuestionSearch(e.target.value)}
                    placeholder="Search question keyword..."
                    className="bg-transparent text-xs sm:text-sm text-white focus:outline-none w-full placeholder-slate-500"
                  />
                </div>

                <select
                  value={questionGradeFilter}
                  onChange={(e) => setQuestionGradeFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 focus:outline-none"
                >
                  <option value="all">All Classes</option>
                  <option value="nursery">Nursery / LKG</option>
                  <option value="class-1">Class 1</option>
                  <option value="class-2">Class 2</option>
                  <option value="class-3">Class 3</option>
                  <option value="class-4-5">Class 4 & 5</option>
                </select>

                <select
                  value={questionSubjectFilter}
                  onChange={(e) => setQuestionSubjectFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 focus:outline-none"
                >
                  <option value="all">All Subjects</option>
                  <option value="science">Science 🔬</option>
                  <option value="gk">General Knowledge 🌍</option>
                  <option value="maths">Mathematics 🔢</option>
                  <option value="english">English 🇬🇧</option>
                  <option value="hindi">Hindi 🇮🇳</option>
                </select>
              </div>

              {/* Custom Uploaded Questions List */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    <span>Custom Uploaded Questions ({filteredQuestions.length})</span>
                  </h3>
                  <span className="text-xs text-slate-400">
                    Questions created or imported via Administrator
                  </span>
                </div>

                {filteredQuestions.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 space-y-2">
                    <p className="font-bold text-sm">No custom questions found matching filter.</p>
                    <p className="text-xs">
                      Click <strong>"Upload Excel / PDF"</strong> or <strong>"Add Single Question"</strong> to add questions!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredQuestions.map((q) => (
                      <div
                        key={q.id}
                        className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-2 hover:border-slate-600 transition-all"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase font-mono">
                                {q.grade}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase font-mono">
                                {q.subject}
                              </span>
                              <span className="text-[10px] text-slate-400">Source: {q.source || 'Admin Upload'}</span>
                            </div>
                            <h4 className="font-bold text-sm text-white">{q.questionEnglish}</h4>
                            {q.questionHindi && (
                              <p className="text-xs text-slate-300 font-hindi">{q.questionHindi}</p>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => {
                                setEditingQuestion(q);
                                setQuestionModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 transition-colors cursor-pointer"
                              title="Edit Question"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteQuestion(q.id)}
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition-colors cursor-pointer"
                              title="Delete Question"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                          {q.options.map((opt, optIdx) => {
                            const isCorrect = opt === q.correctAnswer;
                            return (
                              <div
                                key={optIdx}
                                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold ${
                                  isCorrect
                                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                                    : 'bg-slate-900 border-slate-700 text-slate-300'
                                }`}
                              >
                                {isCorrect ? '✓ ' : ''}
                                {opt}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: SUBJECTS MANAGEMENT
              ======================================================== */}
          {activeTab === 'subjects' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black">Subject Management</h2>
                  <p className="text-xs text-slate-400">
                    Create, edit, or customize subjects taught across classes.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingSubject(null);
                    setSubjectModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Subject</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between hover:border-slate-700 transition-all shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl p-2 bg-slate-800 rounded-xl">{sub.icon}</span>
                        {sub.isDefault ? (
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-bold uppercase">
                            Core Default
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase">
                            Custom Subject
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-base text-white">{sub.nameEnglish}</h3>
                      <p className="text-xs text-indigo-300 font-hindi">{sub.nameHindi}</p>
                      {sub.description && (
                        <p className="text-xs text-slate-400 line-clamp-2">{sub.description}</p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500 font-mono">ID: {sub.id}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingSubject(sub);
                            setSubjectModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 cursor-pointer"
                          title="Edit Subject"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {!sub.isDefault && (
                          <button
                            onClick={() => handleDeleteSubject(sub)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 cursor-pointer"
                            title="Delete Subject"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 5: SETTINGS & BACKUP
              ======================================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-xl sm:text-2xl font-black">Admin Settings & Data Backup</h2>
                <p className="text-xs text-slate-400">
                  Update Admin Master PIN and download offline JSON backups.
                </p>
              </div>

              {/* Master PIN Change Card */}
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-sm">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-indigo-400" />
                  <span>Update Admin Master PIN</span>
                </h3>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    maxLength={8}
                    placeholder="Enter new 4-digit Master PIN"
                    id="newMasterPin"
                    className="flex-1 px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      const inp = (document.getElementById('newMasterPin') as HTMLInputElement)?.value.trim();
                      if (inp && inp.length >= 4) {
                        localStorage.setItem('admin_custom_pin', inp);
                        showToast(`Master PIN successfully changed to "${inp}"!`);
                      } else {
                        showToast('PIN must be at least 4 characters.', 'error');
                      }
                    }}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Save PIN
                  </button>
                </div>
              </div>

              {/* Data Backup Downloads */}
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 shadow-sm">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download Offline Database Backups</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(students, null, 2));
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute('href', dataStr);
                      downloadAnchor.setAttribute('download', `students_backup_${Date.now()}.json`);
                      downloadAnchor.click();
                      showToast('Downloaded students backup!');
                    }}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Students JSON</span>
                  </button>

                  <button
                    onClick={() => {
                      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(customQuestions, null, 2));
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute('href', dataStr);
                      downloadAnchor.setAttribute('download', `questions_backup_${Date.now()}.json`);
                      downloadAnchor.click();
                      showToast('Downloaded questions backup!');
                    }}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Questions JSON</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================
          MODAL 1: ADD / EDIT STUDENT
          ======================================================== */}
      {studentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>{editingStudent ? 'Edit Student Profile' : 'Add New Student'}</span>
              </h3>
              <button onClick={() => setStudentModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as any;
                handleSaveStudent({
                  name: form.name.value,
                  grade: form.grade.value,
                  age: parseInt(form.age.value, 10),
                  avatar: form.avatar.value,
                  pin: form.pin.value,
                  scienceStars: parseInt(form.scienceStars.value, 10) || 0,
                  gkStars: parseInt(form.gkStars.value, 10) || 0,
                  mathsStars: parseInt(form.mathsStars.value, 10) || 0,
                  englishStars: parseInt(form.englishStars.value, 10) || 0,
                  hindiStars: parseInt(form.hindiStars.value, 10) || 0,
                });
              }}
              className="space-y-3.5 text-xs font-bold"
            >
              <div>
                <label className="block text-slate-300 mb-1">Student Name:</label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={editingStudent?.name || ''}
                  placeholder="e.g. Jeevika, Rai, Aarav"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">School Class:</label>
                  <select
                    name="grade"
                    defaultValue={editingStudent?.grade || 'Class 3'}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold"
                  >
                    <option value="Nursery">Nursery / LKG</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4 & 5</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Age (Years):</label>
                  <input
                    type="number"
                    name="age"
                    min={3}
                    max={15}
                    defaultValue={editingStudent?.age || 8}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Avatar Emoji:</label>
                  <select
                    name="avatar"
                    defaultValue={editingStudent?.avatar || '🦋'}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-base font-bold"
                  >
                    {['🦋', '🦁', '🐰', '🐯', '🚀', '🐼', '⭐', '🦄', '🐬', '🦊', '🦉', '🐻', '🦖', '🐶'].map((av) => (
                      <option key={av} value={av}>
                        {av}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">4-Digit Student PIN:</label>
                  <input
                    type="text"
                    name="pin"
                    maxLength={4}
                    defaultValue={editingStudent?.pin || '1234'}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-center font-bold"
                  />
                </div>
              </div>

              {/* Subject-Wise Stars Fields */}
              <div className="space-y-1.5 pt-1">
                <span className="block text-slate-400 font-bold uppercase text-[10px]">Subject Stars:</span>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  <div>
                    <label className="block text-slate-300 mb-1 text-[10px]">Science 🔬</label>
                    <input
                      type="number"
                      name="scienceStars"
                      min={0}
                      defaultValue={editingStudent?.scienceStars || 0}
                      className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 text-[10px]">GK 🌍</label>
                    <input
                      type="number"
                      name="gkStars"
                      min={0}
                      defaultValue={editingStudent?.gkStars || 0}
                      className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 text-[10px]">Maths 🔢</label>
                    <input
                      type="number"
                      name="mathsStars"
                      min={0}
                      defaultValue={editingStudent?.mathsStars || 0}
                      className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 text-[10px]">English 🇬🇧</label>
                    <input
                      type="number"
                      name="englishStars"
                      min={0}
                      defaultValue={editingStudent?.englishStars || 0}
                      className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 text-[10px]">Hindi 🇮🇳</label>
                    <input
                      type="number"
                      name="hindiStars"
                      min={0}
                      defaultValue={editingStudent?.hindiStars || 0}
                      className="w-full px-2 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStudentModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md cursor-pointer"
                >
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: ADD / EDIT SINGLE QUESTION
          ======================================================== */}
      {questionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 max-w-lg w-full rounded-3xl p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>{editingQuestion ? 'Edit Question' : 'Add Single Question'}</span>
              </h3>
              <button onClick={() => setQuestionModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as any;
                const opts = [form.optA.value, form.optB.value, form.optC.value, form.optD.value].map((s) => s.trim()).filter(Boolean);
                const ans = form.correctAnswer.value;

                handleSaveQuestion({
                  grade: form.grade.value,
                  subject: form.subject.value,
                  questionEnglish: form.questionEnglish.value,
                  questionHindi: form.questionHindi.value,
                  options: opts,
                  correctAnswer: ans,
                  explanationEnglish: form.explanationEnglish.value,
                });
              }}
              className="space-y-3.5 text-xs font-bold"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Target Class:</label>
                  <select
                    name="grade"
                    defaultValue={editingQuestion?.grade || 'class-3'}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold"
                  >
                    <option value="nursery">Nursery / LKG</option>
                    <option value="class-1">Class 1</option>
                    <option value="class-2">Class 2</option>
                    <option value="class-3">Class 3</option>
                    <option value="class-4-5">Class 4 & 5</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Subject:</label>
                  <select
                    name="subject"
                    defaultValue={editingQuestion?.subject || 'science'}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold"
                  >
                    <option value="science">Science 🔬</option>
                    <option value="gk">General Knowledge 🌍</option>
                    <option value="maths">Mathematics 🔢</option>
                    <option value="english">English 🇬🇧</option>
                    <option value="hindi">Hindi 🇮🇳</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Question Prompt (English):</label>
                <input
                  type="text"
                  name="questionEnglish"
                  required
                  defaultValue={editingQuestion?.questionEnglish || ''}
                  placeholder="e.g. Which planet is closest to the Sun?"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Question Prompt (Hindi - Optional):</label>
                <input
                  type="text"
                  name="questionHindi"
                  defaultValue={editingQuestion?.questionHindi || ''}
                  placeholder="उदा. सूर्य के सबसे निकट कौन सा ग्रह है?"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-hindi"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Option A:</label>
                  <input
                    type="text"
                    name="optA"
                    required
                    defaultValue={editingQuestion?.options[0] || ''}
                    className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Option B:</label>
                  <input
                    type="text"
                    name="optB"
                    required
                    defaultValue={editingQuestion?.options[1] || ''}
                    className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Option C:</label>
                  <input
                    type="text"
                    name="optC"
                    defaultValue={editingQuestion?.options[2] || ''}
                    className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Option D:</label>
                  <input
                    type="text"
                    name="optD"
                    defaultValue={editingQuestion?.options[3] || ''}
                    className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-emerald-400 mb-1">Correct Answer (Exact text):</label>
                <input
                  type="text"
                  name="correctAnswer"
                  required
                  defaultValue={editingQuestion?.correctAnswer || ''}
                  placeholder="Must match one of the options exactly"
                  className="w-full px-3 py-2 bg-slate-800 border border-emerald-500/50 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Explanation (Optional):</label>
                <input
                  type="text"
                  name="explanationEnglish"
                  defaultValue={editingQuestion?.explanationEnglish || ''}
                  placeholder="Reasoning shown to student upon correct answer..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white italic"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setQuestionModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md cursor-pointer"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3: ADD / EDIT SUBJECT
          ======================================================== */}
      {subjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>{editingSubject ? 'Edit Subject' : 'Add New Subject'}</span>
              </h3>
              <button onClick={() => setSubjectModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as any;
                handleSaveSubject({
                  nameEnglish: form.nameEnglish.value,
                  nameHindi: form.nameHindi.value,
                  icon: form.icon.value,
                  description: form.description.value,
                });
              }}
              className="space-y-3.5 text-xs font-bold"
            >
              <div>
                <label className="block text-slate-300 mb-1">Subject Name (English):</label>
                <input
                  type="text"
                  name="nameEnglish"
                  required
                  defaultValue={editingSubject?.nameEnglish || ''}
                  placeholder="e.g. Social Studies, Computer Science"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Subject Name (Hindi):</label>
                <input
                  type="text"
                  name="nameHindi"
                  defaultValue={editingSubject?.nameHindi || ''}
                  placeholder="e.g. सामाजिक अध्ययन, कंप्यूटर"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-hindi"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Icon / Emoji:</label>
                <select
                  name="icon"
                  defaultValue={editingSubject?.icon || '💻'}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-base font-bold"
                >
                  {['💻', '🎨', '🎵', '🌍', '🔬', '📚', '📐', '⚽', '🌿', '📖', '🏛️', '🌟'].map((ic) => (
                    <option key={ic} value={ic}>
                      {ic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description:</label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editingSubject?.description || ''}
                  placeholder="Brief curriculum description..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSubjectModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md cursor-pointer"
                >
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 4: BULK QUESTION UPLOADER (EXCEL / PDF)
          ======================================================== */}
      <QuestionUploaderModal
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
        onQuestionsImported={() => {
          fetchData();
          showToast('Questions successfully imported into question bank!');
        }}
      />
    </div>
  );
}
