import React from 'react';

const DelayRenderer = (item) => {
  const { firstField, secondField, useInnerFlight } = item;
  const { data } = item;
  let dataIn = { ...data };
  if (useInnerFlight) {
    dataIn = { ...data.flight };
  }
  return (
    <React.Fragment>
      <div>
        <span>{dataIn[firstField]}</span>
        {dataIn[secondField] && <span> / </span>}
        <span className="ag-cell-warning">{dataIn[secondField]}</span>
      </div>
    </React.Fragment>
  );
};

export default DelayRenderer;
