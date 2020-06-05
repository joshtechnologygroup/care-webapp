import React from 'react';
import AgProvider from 'Containers/AgProvider';
import { useHistory } from "react-router-dom";
import * as StringUtils from "Src/utils/stringformatting";
import { RELATIVE_PATH_FACILITY_DETAIL } from 'Src/routes'


export const FacilityRenderer = (item) => {
  const { data } = item;

  let history = useHistory();
  function handleClick() {
    history.push(StringUtils.formatVarString(RELATIVE_PATH_FACILITY_DETAIL, [ data.id ]));
  }
  return (
    <AgProvider>
      <div className="text--link-sm" onClick={handleClick}>
        {item.value}
      </div>
    </AgProvider>
  );
};

export default FacilityRenderer;
