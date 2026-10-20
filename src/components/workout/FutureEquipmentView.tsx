import React, { useState } from 'react';
import {
  FUTURE_DUMBBELL_SCHEDULE,
  TREADMILL_PROTOCOLS,
  FutureExercise,
  TreadmillProtocol,
} from '../../data/futureEquipmentWorkouts';
import { DayOfWeek } from '../../types';
import {
  Dumbbell,
  Activity,
  Flame,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Info,
  VolumeX,
  Gauge,
  Check,
} from 'lucide-react';

export const FutureEquipmentView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dumbbells' | 'treadmill'>('dumbbells');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('monday');
  const [expandedExerciseId, setExpandedExerciseId] = useState<string | null>(null);

  const days: { id: DayOfWeek; short: string; label: string }[] = [
    { id: 'monday', short: 'Mon', label: 'Push A' },
    { id: 'tuesday', short: 'Tue', label: 'Pull A' },
    { id: 'wednesday', short: 'Wed', label: 'Legs A' },
    { id: 'thursday', short: 'Thu', label: 'Push B' },
    { id: 'friday', short: 'Fri', label: 'Pull B' },
    { id: 'saturday', short: 'Sat', label: 'Skill/Legs' },
    { id: 'sunday', short: 'Sun', label: 'Rest' },
  ];

  const currentDayRoutines = FUTURE_DUMBBELL_SCHEDULE[selectedDay];

  return (
    <div className="space-y-4">
      {/* Future-Proofing Hero Notice */}
      <div className="bg-dark-850/90 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-sm space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-dark-50">
                Future Equipment Workouts
              </h2>
              <p className="text-xs text-dark-400 mt-0.5">
                Ready to activate when your adjustable dumbbells and treadmill arrive
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-800/40 text-[11px] font-mono text-amber-300 self-start sm:self-auto">
            <span>✨ Preserved for Delivery</span>
          </div>
        </div>

        <p className="text-xs text-dark-300 leading-relaxed pt-1">
          Your active daily plan remains pure 6-day calisthenics + daily bladder support. These routines are pre-loaded so you have zero setup friction the day your gear arrives at your door!
        </p>

        {/* Tab Switcher: Dumbbells vs Treadmill */}
        <div className="grid grid-cols-2 gap-1.5 pt-2">
          <button
            onClick={() => setActiveTab('dumbbells')}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition border ${
              activeTab === 'dumbbells'
                ? 'bg-amber-500 text-dark-950 border-amber-400 shadow-md shadow-amber-500/15'
                : 'bg-dark-900 border-dark-750 text-dark-400 hover:text-dark-200'
            }`}
          >
            <Dumbbell size={15} />
            <span>Adjustable Dumbbells (6-Day)</span>
          </button>

          <button
            onClick={() => setActiveTab('treadmill')}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition border ${
              activeTab === 'treadmill'
                ? 'bg-amber-500 text-dark-950 border-amber-400 shadow-md shadow-amber-500/15'
                : 'bg-dark-900 border-dark-750 text-dark-400 hover:text-dark-200'
            }`}
          >
            <Activity size={15} />
            <span>Treadmill Protocols (4 Modes)</span>
          </button>
        </div>
      </div>

      {/* DUMBBELL VIEW */}
      {activeTab === 'dumbbells' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Day Selector */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {days.map((day) => {
              const isSelected = selectedDay === day.id;
              const isRest = day.id === 'sunday';

              return (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={`flex-1 min-w-[58px] py-2 px-1.5 rounded-xl border text-center transition ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 font-bold'
                      : 'bg-dark-850 border-dark-750 text-dark-400 hover:text-dark-200'
                  }`}
                >
                  <div className="text-xs uppercase font-mono">{day.short}</div>
                  <div className="text-[10px] font-normal truncate mt-0.5 opacity-80">
                    {isRest ? 'Rest' : day.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Routine Header */}
          <div className="bg-dark-850 border border-dark-750 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-dark-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-dark-800 text-amber-400 font-bold uppercase">
                    {selectedDay}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-dark-50">
                    {currentDayRoutines.focusTitle}
                  </h3>
                </div>
                <p className="text-xs text-dark-400 mt-1">{currentDayRoutines.subtitle}</p>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-dark-900 border border-dark-750 text-[11px] font-mono text-dark-300">
                <VolumeX size={13} className="text-emerald-400" />
                <span>Apartment Friendly</span>
              </div>
            </div>

            {/* Exercises List */}
            {currentDayRoutines.exercises.length === 0 ? (
              <div className="py-6 text-center space-y-1">
                <h4 className="font-bold text-xs text-dark-200">Rest & Recovery Day</h4>
                <p className="text-xs text-dark-400">Zero dumbbell loading on Sundays. Focus on daily bladder routine and hydration.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {currentDayRoutines.exercises.map((ex: FutureExercise, idx) => {
                  const isExpanded = expandedExerciseId === ex.id;
                  return (
                    <div
                      key={ex.id}
                      className="rounded-xl bg-dark-900 border border-dark-750 overflow-hidden"
                    >
                      <div className="p-3.5 flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-dark-500">#{idx + 1}</span>
                            <h4 className="font-bold text-xs sm:text-sm text-dark-100">{ex.name}</h4>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] font-mono text-dark-400">
                            <span className="text-amber-400 font-semibold">
                              {ex.defaultSets} Sets × {ex.defaultReps}
                            </span>
                            {ex.suggestedWeightLbs && (
                              <span className="text-dark-300">• Suggestion: {ex.suggestedWeightLbs}</span>
                            )}
                            <span>• Rest: {ex.restSeconds}s</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setExpandedExerciseId(isExpanded ? null : ex.id)}
                          className="p-1 rounded-lg text-dark-400 hover:text-dark-200"
                        >
                          <ChevronDown
                            size={16}
                            className={`transform transition-transform ${
                              isExpanded ? 'rotate-180 text-amber-400' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="px-3.5 pb-3.5 pt-1 border-t border-dark-800 text-xs space-y-2 bg-dark-950/40">
                          <div>
                            <span className="font-semibold text-dark-300 block mb-1 text-[11px]">
                              Form Cues:
                            </span>
                            <ul className="list-disc list-inside space-y-0.5 text-dark-400 text-[11px]">
                              {ex.cues.map((c, i) => (
                                <li key={i}>{c}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-[10.5px] text-emerald-300 flex items-start gap-1.5">
                            <ShieldCheck size={14} className="flex-shrink-0 mt-0.5 text-emerald-400" />
                            <span>
                              <strong>Apartment Tip:</strong> {ex.apartmentTip}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TREADMILL VIEW */}
      {activeTab === 'treadmill' && (
        <div className="space-y-3 animate-fadeIn">
          <div className="bg-dark-850 border border-dark-750 rounded-2xl p-4 sm:p-5 space-y-3">
            <div>
              <h3 className="font-bold text-sm text-dark-50">Treadmill Incline Protocols</h3>
              <p className="text-xs text-dark-400 mt-0.5">
                Steep incline walking provides massive caloric expenditure & aerobic base building with zero ankle or knee impact and zero neighbor noise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {TREADMILL_PROTOCOLS.map((protocol: TreadmillProtocol) => (
                <div
                  key={protocol.id}
                  className="p-4 rounded-xl bg-dark-900 border border-dark-750 space-y-2.5"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-dark-800">
                    <h4 className="font-bold text-xs sm:text-sm text-dark-100 flex items-center gap-1.5">
                      <Gauge size={15} className="text-amber-400" />
                      <span>{protocol.title}</span>
                    </h4>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-2 py-0.5 rounded-md">
                      {protocol.durationMinutes} Min
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-dark-850 border border-dark-800">
                      <span className="text-[10px] text-dark-400 block">Speed</span>
                      <span className="font-bold text-dark-100">{protocol.speedMph}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-dark-850 border border-dark-800">
                      <span className="text-[10px] text-dark-400 block">Incline</span>
                      <span className="font-bold text-amber-400">{protocol.inclinePct}</span>
                    </div>
                  </div>

                  <p className="text-[11.5px] text-dark-300 leading-relaxed">{protocol.description}</p>

                  <div className="p-2 rounded-lg bg-dark-850/60 border border-dark-800 text-[11px] text-dark-400">
                    <span className="font-semibold text-emerald-400 block mb-0.5">Key Benefit:</span>
                    <span>{protocol.benefits}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
