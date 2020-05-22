import React from 'react';
import {Pie} from 'react-chartjs-2';


const data = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ]
  }]
};

const legendOpts = {
  display: true,
  position: 'top',
  fullWidth: true,
  reverse: false,
  labels: {
    fontColor: 'rgb(255, 99, 132)'
  }
};

export const AppPie = (props) => {
  return (
      <div>
        <Pie data={data} legend={legendOpts} redraw />
      </div>
    );
}

export default AppPie;
