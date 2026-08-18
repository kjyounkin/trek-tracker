import React, { useMemo } from 'react';
import { useJourney } from '../hooks/useJourney';
import { MILESTONES, type Milestone } from '../data/milestones';
import { MapPin, UserCircle2 } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

interface UserProgress {
  name: string;
  miles: number;
  avatar?: string;
  isMe?: boolean;
}

const MOCK_USERS: UserProgress[] = [
  { name: 'Sarah M.', miles: 42, avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { name: 'Alex K.', miles: 145, avatar: 'https://i.pravatar.cc/150?u=alex' },
  { name: 'Samwise', miles: 890, avatar: 'https://i.pravatar.cc/150?u=sam' },
  { name: 'Elena R.', miles: 1105, avatar: 'https://i.pravatar.cc/150?u=elena' },
  { name: 'David T.', miles: 1300, avatar: 'https://i.pravatar.cc/150?u=david' }
];

type TimelineItem = 
  | { type: 'milestone', mile: number, data: Milestone, originalIndex: number }
  | { type: 'user', mile: number, data: UserProgress };

export function Timeline() {
  const { totalMiles } = useJourney();
  const { user } = useUser();

  const timelineItems = useMemo(() => {
    const items: TimelineItem[] = MILESTONES.map((m, i) => ({ type: 'milestone', mile: m.mile, data: m, originalIndex: i }));
    
    // Add mock users
    MOCK_USERS.forEach(u => items.push({ type: 'user', mile: u.miles, data: u }));
    
    // Add current user
    items.push({ 
      type: 'user', 
      mile: totalMiles, 
      data: { 
        name: user?.firstName || 'You', 
        miles: totalMiles, 
        isMe: true,
        avatar: user?.imageUrl
      }
    });

    // Sort by mile. If miles are equal, put milestones first so users appear slightly after the milestone dot
    items.sort((a, b) => {
      if (a.mile !== b.mile) return a.mile - b.mile;
      if (a.type === 'milestone' && b.type === 'user') return -1;
      if (a.type === 'user' && b.type === 'milestone') return 1;
      return 0;
    });

    return items;
  }, [totalMiles, user]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
          <MapPin className="text-emerald-600" />
          Journey Timeline
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2"></div>
          
          <div className="space-y-8 relative pb-12">
            {timelineItems.map((item, idx) => {
              
              if (item.type === 'milestone') {
                const milestone = item.data;
                const index = item.originalIndex;
                const isCompleted = totalMiles >= milestone.mile;
                const isCurrent = totalMiles >= milestone.mile && (index === MILESTONES.length - 1 || totalMiles < MILESTONES[index + 1].mile);
                
                const prevMilestone = index > 0 ? MILESTONES[index - 1] : null;
                const showBookHeader = !prevMilestone || prevMilestone.book !== milestone.book;
                const showRegionHeader = !prevMilestone || prevMilestone.region !== milestone.region;

                return (
                  <React.Fragment key={`m-${milestone.id}`}>
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

                    <div className={`relative flex items-center justify-between md:justify-normal ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} pt-4 pb-4`}>
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
              }

              if (item.type === 'user') {
                const isMe = item.data.isMe;
                // Alternate sides based on index to keep it organic, or always put users on the right? 
                // Let's just put users slightly offset on the line
                return (
                  <div key={`u-${item.data.name}-${idx}`} className="relative flex items-center justify-center py-2">
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center z-20">
                      <div className={`flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-md border ${isMe ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-slate-200'} transform -translate-x-1/2 md:-translate-x-0 ml-6 md:ml-4`}>
                        {item.data.avatar ? (
                          <img src={item.data.avatar} alt={item.data.name} className="w-6 h-6 rounded-full border border-slate-200" />
                        ) : (
                          <UserCircle2 className="w-6 h-6 text-slate-400" />
                        )}
                        <div className="flex flex-col">
                          <span className={`text-xs font-bold leading-none ${isMe ? 'text-emerald-700' : 'text-slate-700'}`}>
                            {item.data.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-semibold leading-none mt-0.5">
                            Mile {item.data.miles.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
