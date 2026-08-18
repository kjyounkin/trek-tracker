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

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-slate-300 before:to-slate-300">
          {MILESTONES.map((milestone, index) => {
            const isCompleted = totalMiles >= milestone.mile;
            const isNext = !isCompleted && (index === 0 || totalMiles >= MILESTONES[index - 1].mile);
            
            return (
              <div key={milestone.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${
                  isCompleted ? 'bg-emerald-100 border-emerald-500 text-emerald-600' : 
                  isNext ? 'bg-white border-emerald-400 text-emerald-500' : 
                  'bg-white border-slate-300 text-slate-300'
                }`}>
                  {isCompleted ? <CheckCircle2 size={20} /> : <Circle size={16} fill={isNext ? 'currentColor' : 'none'} />}
                </div>

                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-bold ${isCompleted ? 'text-slate-800' : 'text-slate-500'}`}>
                      {milestone.title}
                    </h3>
                    <span className={`text-sm font-medium ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`}>
                      Mile {milestone.mile}
                    </span>
                  </div>
                  <div className="mb-2 text-xs font-semibold tracking-wide uppercase text-slate-400 flex items-center gap-2">
                    <span>{milestone.region}</span>
                    <span>&bull;</span>
                    <span className="truncate" title={milestone.chapter}>{milestone.chapter}</span>
                  </div>
                  <p className="text-sm text-slate-600">{milestone.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
