import React, { PureComponent } from 'react';
import {
  ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import './styles.scss';

export default class OccupancyStatus extends PureComponent {
  render() {
      const COLORS = ['#ffee02', '#ff9600', '#ff2807'];

    return (
      <div className="chart-wrap">
        <span className="chart-title">
          {this.props.title}
        </span>
        <ResponsiveContainer>
          <ComposedChart
            layout="vertical"
            data={this.props.data}
            margin={{
              top: 20, right: 20, bottom: 20, left: 20,
            }}
            >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="Occupied" stackId="a" barSize={20} fill="#c7c7cc" />
            <Bar dataKey="Vacancy" stackId="a" barSize={20}>
                {
                    this.props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
