"use client";

import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, CheckCircle, Circle, PlayCircle, Shield, Gamepad2, PenTool, Globe } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  category: 'Language' | 'Art';
  instructor: string;
  progress: number;
  status: 'active' | 'queued' | 'completed';
}

export default function CourseTracker() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 'k2', title: 'The Complete Korean Course for Beginners', category: 'Language', instructor: 'Keehwan Kim', progress: 0, status: 'active' },
    { id: 'k1', title: 'TOPIK II Reading Complete Prep: Target Level 4+', category: 'Language', instructor: 'JIYEON PARK', progress: 0, status: 'queued' },
    { id: 'a1', title: 'Anatomy Art School: Drawing the Human Form', category: 'Art', instructor: 'Scott Harris', progress: 0, status: 'active' },
    { id: 'a2', title: 'Perspective Art School: The Complete Drawing Course', category: 'Art', instructor: 'Scott Harris', progress: 0, status: 'queued' },
    { id: 'a5', title: 'Character Art School: Complete Character Drawing', category: 'Art', instructor: 'Scott Harris', progress: 0, status: 'queued' },
    { id: 'a4', title: 'Character Art School: Complete Coloring & Painting', category: 'Art', instructor: 'Scott Harris', progress: 0, status: 'queued' },
    { id: 'a3', title: 'Manga Art School: The Complete Anime & Manga Drawing Course', category: 'Art', instructor: 'Scott Harris', progress: 0, status: 'queued' },
  ]);

  useEffect(() => {
    const loadData = () => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('pf_course_progress_v2');
        if (saved) setCourses(JSON.parse(saved));
      }
    };
    
    loadData();
    window.addEventListener('hunterStateChanged', loadData);
    window.addEventListener('storage', loadData);
    return () => {
      window.removeEventListener('hunterStateChanged', loadData);
      window.removeEventListener('storage', loadData);
    };
  }, []);

  const updateProgress = (id: string, newProgress: number) => {
    const updated = courses.map(c => {
      if (c.id !== id) return c;
      const progress = Math.min(100, Math.max(0, newProgress));
      const status = progress === 100 ? 'completed' : c.status === 'completed' ? 'active' : c.status;
      return { ...c, progress, status };
    });
    setCourses(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pf_course_progress_v2', JSON.stringify(updated));

      window.dispatchEvent(new CustomEvent('hunterStateChanged'));
    }
  };

  const activeKorean = courses.find(c => c.category === 'Language' && c.status === 'active') || courses.find(c => c.category === 'Language');
  const activeArt = courses.find(c => c.category === 'Art' && c.status === 'active') || courses.find(c => c.category === 'Art');

  return (
    <div className="space-y-6 pb-12">
      {/* Top HUD Panel */}
      <div className="bg-system-panel p-6 rounded-2xl border border-system-blue/30 shadow-hud relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-system-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-system-cyan mb-2 relative z-10">
          <BookOpen className="w-4 h-4 text-system-blue animate-pulse" />
          <span>Curriculum Deadline: April 2nd</span>
        </div>
        
        <h2 className="text-3xl font-black tracking-widest text-white uppercase text-glow mb-2 relative z-10 font-display">
          Skill Materia Development
        </h2>
        
        <p className="text-sm text-zinc-300 max-w-2xl relative z-10 mb-6 border-l-2 border-system-gold pl-4 py-1">
          The study schedule has been compressed to <strong>1.5 hours daily</strong> to ensure you have time to relax, play games, and post your art to TikTok and Instagram.
        </p>

        {/* Daily Directives Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          <div className="bg-system-dark/80 p-4 rounded-xl border border-system-cyan/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-system-cyan font-mono text-xs font-bold">18:00 - 18:45</span>
                <Globe className="w-4 h-4 text-system-blue" />
              </div>
              <h3 className="font-bold text-white text-sm mb-1">Language Training</h3>
              <p className="text-xs text-zinc-400 leading-tight">Focus on 1-2 modules of <span className="text-zinc-200">{activeKorean?.title}</span>.</p>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-system-cyan uppercase font-bold tracking-wider">
              45 Min Block
            </div>
          </div>

          <div className="bg-system-dark/80 p-4 rounded-xl border border-system-purple/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-system-purple font-mono text-xs font-bold">18:45 - 19:30</span>
                <PenTool className="w-4 h-4 text-system-purple" />
              </div>
              <h3 className="font-bold text-white text-sm mb-1">Art & Anatomy</h3>
              <p className="text-xs text-zinc-400 leading-tight">Focus on 1-2 modules of <span className="text-zinc-200">{activeArt?.title}</span>.</p>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-system-purple uppercase font-bold tracking-wider">
              45 Min Block
            </div>
          </div>

          <div className="bg-system-dark/80 p-4 rounded-xl border border-system-gold/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-system-gold font-mono text-xs font-bold">19:30 Onward</span>
                <Gamepad2 className="w-4 h-4 text-system-gold" />
              </div>
              <h3 className="font-bold text-white text-sm mb-1">Free Time & Content</h3>
              <p className="text-xs text-zinc-400 leading-tight">Play games, relax, and prep/post your art content to Instagram & TikTok.</p>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 text-[10px] text-system-gold uppercase font-bold tracking-wider">
              Rest / Social Media
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language Courses */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2 border-b border-system-blue/30 pb-2 font-display">
            <span className="w-2 h-2 rounded-sm bg-system-blue animate-pulse shadow-glow-blue"></span>
            Korean Language
          </h3>
          <div className="space-y-3">
            {courses.filter(c => c.category === 'Language').map(course => (
              <CourseCard key={course.id} course={course} onUpdate={updateProgress} />
            ))}
          </div>
        </div>

        {/* Art Courses */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2 border-b border-system-purple/30 pb-2 font-display">
            <span className="w-2 h-2 rounded-sm bg-system-purple animate-pulse shadow-glow-purple"></span>
            Art & Drawing
          </h3>
          <div className="space-y-3">
            {courses.filter(c => c.category === 'Art').map(course => (
              <CourseCard key={course.id} course={course} onUpdate={updateProgress} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course, onUpdate }: { course: Course, onUpdate: (id: string, p: number) => void }) {
  const isCompleted = course.status === 'completed';
  const isActive = course.status === 'active';

  return (
    <div className={`bg-system-card border rounded-xl p-4 transition-all group relative overflow-hidden ${
      isActive ? 'border-system-cyan shadow-glow-blue' : 
      isCompleted ? 'border-system-gold/50 opacity-70' : 'border-white/10 hover:border-white/20'
    }`}>
      {isActive && (
        <div className="absolute top-0 right-0 px-2 py-1 bg-system-cyan text-[#0b0c10] text-[9px] font-black uppercase tracking-widest rounded-bl-lg">
          Active Directive
        </div>
      )}
      {isCompleted && (
        <div className="absolute top-0 right-0 px-2 py-1 bg-system-gold text-[#0b0c10] text-[9px] font-black uppercase tracking-widest rounded-bl-lg">
          Mastered
        </div>
      )}

      <div className="flex justify-between items-start gap-4 mb-3 pr-16">
        <div>
          <h4 className={`text-sm font-bold leading-tight ${isCompleted ? 'text-system-gold' : 'text-white'}`}>
            {course.title}
          </h4>
          <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase">{course.instructor}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold font-mono">
          <span className="text-zinc-400">Mastery Level</span>
          <span className={isCompleted ? 'text-system-gold' : isActive ? 'text-system-cyan' : 'text-zinc-400'}>
            {course.progress}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-black/80 rounded-full overflow-hidden border border-white/5">
          <div 
            className={`h-full transition-all duration-500 ${
              isCompleted ? 'bg-system-gold shadow-glow-gold' : 
              isActive ? 'bg-gradient-to-r from-system-blue to-system-cyan shadow-glow-blue' : 
              'bg-zinc-600'
            }`}
            style={{ width: `${course.progress}%` }}
          />
        </div>
        <div className="flex justify-between gap-2 pt-2">
          <button 
            onClick={() => onUpdate(course.id, course.progress - 5)}
            className="flex-1 text-[10px] uppercase font-bold text-zinc-500 bg-black/40 py-1.5 rounded border border-white/5 hover:text-white transition-colors"
          >
            -5%
          </button>
          {!isCompleted && (
            <button 
              onClick={() => onUpdate(course.id, course.progress + 5)}
              className={`flex-1 text-[10px] uppercase font-bold py-1.5 rounded transition-all ${
                isActive ? 'bg-system-cyan text-[#0b0c10] hover:bg-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              +5%
            </button>
          )}
          {isCompleted && (
            <div className="flex-1 text-[10px] uppercase font-bold text-system-gold bg-system-gold/10 py-1.5 rounded text-center border border-system-gold/20 flex items-center justify-center gap-1">
              <CheckCircle className="w-3 h-3" /> Mastered
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
