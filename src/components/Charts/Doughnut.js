import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip
} from 'recharts';

const COLORS = ['#ff2851', '#0375ff', '#00b6ce', '#ffc991'];

export default class AppDoughnut extends PureComponent {
  render() {
    return (
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <PieChart onMouseEnter={this.onPieEnter}>
            <Legend />
            <Tooltip />
            <Pie
              data={this.props.data}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
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
