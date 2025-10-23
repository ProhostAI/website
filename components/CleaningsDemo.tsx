'use client';

import { useState } from 'react';

interface Cleaning {
  id: string;
  title: string;
  listing: string;
  status: 'not_started' | 'in_progress' | 'ready_for_inspection' | 'completed';
  time: string;
  assignee: string | null;
}

const statusConfig = {
  not_started: {
    label: 'Not Started',
    color: 'bg-gray-100 text-gray-700',
    icon: '⏸',
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-blue-100 text-blue-700',
    icon: '▶',
  },
  ready_for_inspection: {
    label: 'Ready for Inspection',
    color: 'bg-yellow-100 text-yellow-700',
    icon: '👁',
  },
  completed: {
    label: 'Completed',
    color: 'bg-green-100 text-green-700',
    icon: '✓',
  },
};

export default function CleaningsDemo() {
  const [cleanings, setCleanings] = useState<Cleaning[]>([
    {
      id: '1',
      title: 'Turnover Cleaning',
      listing: 'Downtown Loft',
      status: 'not_started',
      time: '10:00 AM - 12:00 PM',
      assignee: 'Sarah',
    },
    {
      id: '2',
      title: 'Deep Clean',
      listing: 'Beach House',
      status: 'in_progress',
      time: '9:00 AM - 2:00 PM',
      assignee: 'Mike',
    },
    {
      id: '3',
      title: 'Turnover Cleaning',
      listing: 'Mountain Cabin',
      status: 'ready_for_inspection',
      time: '8:00 AM - 11:00 AM',
      assignee: 'Sarah',
    },
    {
      id: '4',
      title: 'Quick Clean',
      listing: 'City Studio',
      status: 'completed',
      time: '7:00 AM - 9:00 AM',
      assignee: 'Mike',
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleStatusChange = (cleaningId: string) => {
    setCleanings((prev) =>
      prev.map((cleaning) => {
        if (cleaning.id === cleaningId) {
          // Cycle through statuses
          const statusOrder: Cleaning['status'][] = [
            'not_started',
            'in_progress',
            'ready_for_inspection',
            'completed',
          ];
          const currentIndex = statusOrder.indexOf(cleaning.status);
          const nextIndex = (currentIndex + 1) % statusOrder.length;
          return { ...cleaning, status: statusOrder[nextIndex] };
        }
        return cleaning;
      })
    );
  };

  const groupedCleanings = cleanings.reduce((acc, cleaning) => {
    if (!acc[cleaning.status]) {
      acc[cleaning.status] = [];
    }
    acc[cleaning.status].push(cleaning);
    return acc;
  }, {} as Record<Cleaning['status'], Cleaning[]>);

  const statusOrder: Cleaning['status'][] = [
    'not_started',
    'in_progress',
    'ready_for_inspection',
    'completed',
  ];

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Cleanings Dashboard</h3>
            <p className="text-gray-600 mt-1">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() - 1);
                setSelectedDate(newDate);
              }}
              className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-700 font-medium"
            >
              ← Previous
            </button>
            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-700 font-medium"
            >
              Today
            </button>
            <button
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() + 1);
                setSelectedDate(newDate);
              }}
              className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-700 font-medium"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50">
        {statusOrder.map((status) => {
          const config = statusConfig[status];
          const count = groupedCleanings[status]?.length || 0;
          return (
            <div key={status} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{count}</div>
                  <div className="text-sm text-gray-600 mt-1">{config.label}</div>
                </div>
                <div className="text-3xl">{config.icon}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cleanings List */}
      <div className="p-6 space-y-6">
        <div className="text-sm text-gray-500 mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
          💡 <strong>Try it:</strong> Click on any status badge below to see it change in real-time!
        </div>

        {statusOrder.map((status) => {
          const config = statusConfig[status];
          const statusCleanings = groupedCleanings[status] || [];

          if (statusCleanings.length === 0) return null;

          return (
            <div key={status} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${config.color}`}>
                  {config.icon} {config.label}
                </span>
                <span className="text-sm text-gray-500">
                  {statusCleanings.length} cleaning{statusCleanings.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-2">
                {statusCleanings.map((cleaning) => (
                  <div
                    key={cleaning.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleStatusChange(cleaning.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold ${config.color} hover:ring-2 ring-gray-400 transition-all`}
                          >
                            {config.icon}
                          </button>
                          <div>
                            <h4 className="font-semibold text-gray-900">{cleaning.title}</h4>
                            <p className="text-sm text-gray-600">{cleaning.listing}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-700 font-medium">{cleaning.time}</div>
                        {cleaning.assignee && (
                          <div className="text-xs text-gray-500 mt-1">
                            Assigned to {cleaning.assignee}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Features Footer */}
      <div className="bg-gray-50 p-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl mb-2">📸</div>
            <div className="text-sm font-semibold text-gray-900">Timestamped Photos</div>
            <div className="text-xs text-gray-600">Track progress visually</div>
          </div>
          <div>
            <div className="text-2xl mb-2">✅</div>
            <div className="text-sm font-semibold text-gray-900">Checklists</div>
            <div className="text-xs text-gray-600">Ensure quality standards</div>
          </div>
          <div>
            <div className="text-2xl mb-2">🔔</div>
            <div className="text-sm font-semibold text-gray-900">Auto-assignment</div>
            <div className="text-xs text-gray-600">Smart cleaner scheduling</div>
          </div>
        </div>
      </div>
    </div>
  );
}
