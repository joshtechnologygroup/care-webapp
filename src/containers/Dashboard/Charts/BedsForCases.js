import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import './styles.scss';

export default class BedsForCases extends PureComponent {
  render() {
    return (
      <div className="chart-wrap">
        <span className="chart-title">
          {this.props.title}
        </span>
        <ResponsiveContainer>
          <BarChart
            data={this.props.data}
            margin={{
              top: 20, right: 30, left: 20, bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Mild" fill="#ffee02" />
            <Bar dataKey="Moderate" fill="#ff9600" />
            <Bar dataKey="Severe" fill="#ff2807" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

