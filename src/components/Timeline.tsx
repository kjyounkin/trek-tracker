import { useJourney } from '../hooks/useJourney';
import { MILESTONES } from '../data/milestones';
import { CheckCircle2, Circle, MapPin } from 'lucide-react';

export function Timeline() {
  const { totalMiles } = useJourney();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
          <MapPin className="text-emerald-600" />
          Journey Milestones
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2"></div>
          
          <div className="space-y-12 relative">
            {MILESTONES.map((milestone, index) => {
              const isCompleted = totalMiles >= milestone.mile;
              const isCurrent = totalMiles >= milestone.mile && (index === MILESTONES.length - 1 || totalMiles < MILESTONES[index + 1].mile);
              
              const prevMilestone = index > 0 ? MILESTONES[index - 1] : null;
              const showBookHeader = !prevMilestone || prevMilestone.book !== milestone.book;
              const showRegionHeader = !prevMilestone || prevMilestone.region !== milestone.region;

              return (
                <React.Fragment key={milestone.id}>
                  {showBookHeader && (
                    <div className="relative z-10 flex justify-center py-4">
                      <div className="bg-emerald-800 text-emerald-50 px-6 py-2 rounded-full font-bold shadow-md tracking-widest uppercase text-sm border-2 border-emerald-900">
                        {milestone.book}
                      </div>
                    </div>
                  )}
                  
                  {showRegionHeader && !showBookHeader && (
                    <div className="relative z-10 flex justify-center py-2">
                      <div className="bg-white text-emerald-700 px-4 py-1 rounded-full font-semibold shadow-sm tracking-wider uppercase text-xs border border-emerald-200">
                        {milestone.region}
                      </div>
                    </div>
                  )}

                  <div className={`relative flex items-center justify-between md:justify-normal ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Icon Circle */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full border-4 border-white bg-white z-10 shadow-sm">
                      <div className={`w-3 h-3 rounded-full ${isCurrent ? 'bg-emerald-500 animate-pulse' : isCompleted ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                    </div>

                    {/* Content Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-bold text-lg ${isCompleted ? 'text-slate-800' : 'text-slate-500'}`}>
                          {milestone.title}
                        </h3>
                        <span className={`text-sm font-bold ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`}>
                          Mile {milestone.mile}
                        </span>
                      </div>
                      <div className="mb-2 text-xs font-semibold tracking-wide uppercase text-slate-500 flex items-center gap-2">
                        <span className="text-emerald-700">{milestone.region}</span>
                        <span>&bull;</span>
                        <span className="truncate" title={milestone.chapter}>{milestone.chapter}</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
