import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

interface SimpleBarChartProps {
  data: ChartData[];
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-[26rem]"> {/* Increased height from h-96 */}
      <h3 className="text-lg font-medium text-gray-700 mb-4">Monthly Activity</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" name="Page Views" />
          <Bar dataKey="uv" fill="#82ca9d" name="Unique Visitors" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;
