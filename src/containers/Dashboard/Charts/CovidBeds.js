import React, { PureComponent } from 'react';
import {
  PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip
} from 'recharts';
import './styles.scss';

const COLORS = ['#ff2851', '#0375ff', '#00b6ce', '#ffc991'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class CovidBeds extends PureComponent {
  render() {
    return (
      <div className="chart-wrap">
        <span className="chart-title">
          {this.props.title}
        </span>
        <ResponsiveContainer>
          <PieChart>
            <Legend />
            <Tooltip />
            <Pie
              data={this.props.data}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              >
              {
                this.props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
          </PieChart>
          </ResponsiveContainer>
        </div>
    );
  }
}
