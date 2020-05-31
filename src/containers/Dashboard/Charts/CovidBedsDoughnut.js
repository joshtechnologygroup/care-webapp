import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip
} from 'recharts';
import './styles.scss';

const COLORS = ['#ff2851', '#0375ff', '#00b6ce', '#ffc991'];

export default class CovidBedsDoughnut extends PureComponent {
  render() {
    return (
      <div className="chart-wrap">
        <span className="chart-title">
          {this.props.title}
        </span>
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
