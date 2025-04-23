import React from 'react';

interface ActivityItem {
  id: number;
  user: string;
  action: string;
  time: string;
}

interface ActivityFeedProps {
  data: ActivityItem[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Recent Activity</h3>
      <ul className="divide-y divide-gray-200">
        {data.map((item) => (
          <li key={item.id} className="py-3">
            <p className="text-sm text-gray-800">
              <span className="font-medium">{item.user}</span> {item.action}
            </p>
            <p className="text-xs text-gray-500">{item.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
