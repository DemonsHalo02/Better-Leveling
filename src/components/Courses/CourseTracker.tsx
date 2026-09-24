"use client";

import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, CheckCircle, Circle, PlayCircle } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  category: 'Language' | 'Art';
  instructor: string;
  progress: number;
}

export default function CourseTracker() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 'k1', title: 'TOPIK II Reading Complete Prep: Target Level 4+', category: 'Language', instructor: 'JIYEON PARK', progress: 0 },
    { id: 'k2', title: 'The Complete Korean Course for Beginners | 10 courses in 1!', category: 'Language', instructor: 'Keehwan Kim', progress: 0 },
    { id: 'a1', title: 'Anatomy Art School: Drawing the Human Form', category: 'Art', instructor: 'Scott Harris', progress: 0 },
    { id: 'a2', title: 'Perspective Art School: The Complete Drawing Course', category: 'Art', instructor: 'Scott Harris', progress: 0 },
    { id: 'a3', title: 'Manga Art School: The Complete Anime & Manga Drawing Course', category: 'Art', instructor: 'Scott Harris', progress: 0 },
    { id: 'a4', title: 'Character Art School: Complete Coloring & Painting', category: 'Art', instructor: 'Scott Harris', progress: 0 },
    { id: 'a5', title: 'Character Art School: Complete Character Drawing', category: 'Art', instructor: 'Scott Harris', progress: 0 },
  ]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pf_course_progress');
      if (saved) setCourses(JSON.parse(saved));
    }
  }, []);

  const updateProgress = (id: string, newProgress: number) => {
    const updated = courses.map(c => c.id === id ? { ...c, progress: Math.min(100, Math.max(0, newProgress)) } : c);
    setCourses(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pf_course_progress', JSON.stringify(updated));
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-system-panel p-6 rounded-2xl border border-system-blue/30 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-system-cyan mb-1">
          <BookOpen className="w-3.5 h-3.5 text-system-blue" />
          <span>Curriculum Deadline: April 2nd</span>
        </div>
        <h2 className="text-2xl font-black tracking-wider text-white uppercase text-glow">
          Study & Skill Development
        </h2>
        <p className="text-xs text-zinc-400 mt-1 max-w-xl">
          Daily study block: <strong className="text-white">6:00 PM - 10:00 PM</strong> (or shorter if you complete the daily modules early). Focus on consistency.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-system-dark px-4 py-2 rounded-xl border border-white/10 text-xs">
            <Calendar className="w-4 h-4 text-system-gold" />
            <span className="text-zinc-300">Target: <strong className="text-white">April 2nd</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-system-dark px-4 py-2 rounded-xl border border-white/10 text-xs">
            <Clock className="w-4 h-4 text-system-cyan" />
            <span className="text-zinc-300">Daily Block: <strong className="text-white">18:00 - 22:00</strong></span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Language Courses */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-system-blue animate-pulse"></span>
            Korean Language
          </h3>
          {courses.filter(c => c.category === 'Language').map(course => (
            <CourseCard key={course.id} course={course} onUpdate={updateProgress} />
          ))}
        </div>

        {/* Art Courses */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-system-purple animate-pulse"></span>
            Art & Drawing
          </h3>
          {courses.filter(c => c.category === 'Art').map(course => (
            <CourseCard key={course.id} course={course} onUpdate={updateProgress} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course, onUpdate }: { course: Course, onUpdate: (id: string, p: number) => void }) {
  return (
    <div className="bg-system-card border border-white/10 rounded-xl p-4 shadow-sm hover:border-system-blue/30 transition-all group">
      <div className="flex justify-between items-start gap-4 mb-3">
        <div>
          <h4 className="text-sm font-bold text-white leading-tight">{course.title}</h4>
          <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase">{course.instructor}</p>
        </div>
        <button className="text-system-cyan hover:text-white transition-colors bg-system-blue/10 p-2 rounded-lg hover:bg-system-blue/20">
          <PlayCircle className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold font-mono">
          <span className="text-zinc-400">Progress</span>
          <span className="text-system-cyan">{course.progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
          <div 
            className="h-full bg-gradient-to-r from-system-blue to-system-cyan transition-all duration-500"
            style={{ width: `${course.progress}%` }}
          />
        </div>
        <div className="flex justify-between gap-2 pt-2">
          <button 
            onClick={() => onUpdate(course.id, course.progress - 5)}
            className="flex-1 text-[10px] uppercase font-bold text-zinc-400 bg-system-dark py-1 rounded hover:text-white"
          >
            -5%
          </button>
          <button 
            onClick={() => onUpdate(course.id, course.progress + 5)}
            className="flex-1 text-[10px] uppercase font-bold text-system-dark bg-system-cyan py-1 rounded hover:bg-white"
          >
            +5%
          </button>
        </div>
      </div>
    </div>
  );
}
