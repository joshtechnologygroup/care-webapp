import React, {useEffect, useState} from 'react';
import TableComponent from 'Components/TableComponent';
import Grid from '@material-ui/core/Grid';
import { GET } from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import * as Routes from 'Src/routes';
import * as StringUtils from 'Src/utils/stringformatting';
import { CONFIG } from './config';
import { PAGINATION_LIMIT, INITIAL_PAGE, OFFSET } from 'Src/constants';
import moment from "moment";
import { mappingIdWithNames } from 'Src/utils/mapping-functions'
import PaginationController from 'Components/PaginationController';
import Sort from 'Components/Sort';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { getsBedsListDependencies } from 'Actions/BedsListAction';


export function BedsList(props) {
  const [ selectedParams, setSelectedParams ] = useState({});
  const [showColumnsPanel, setShowColumnsPanel] = useState(false);
  const [ facilityInfrastructureList, setFacilityInfrastructureList ] = useState(props.facilityInfrastructureList);
  const [ currentPage, setCurrentPage ] = useState(INITIAL_PAGE);
  const [ currentUrl, setCurrentUrl ] = useState(StringUtils.formatVarString(Routes.FACILITY_INFRASTRUCTURE_LIST_URL, [PAGINATION_LIMIT, OFFSET]));
  const [ totalPages, setTotalPages ] = useState(INITIAL_PAGE);

  const handleApiCall = async () => {
    let required_data = [[], []];

    const required = {
      'facility_infrastructure': [currentUrl, ReducerTypes.GET_FACILITY_INFRASTRUCTURE_LIST],
      'facilities':[Routes.FACILITY_LIST_URL, ReducerTypes.GET_FACILITY_LIST],
      'room_type': [Routes.ROOM_TYPES_LIST_URL, ReducerTypes.GET_ROOM_TYPE_LIST],
      'bed_type': [Routes.BED_TYPES_LIST_URL, ReducerTypes.GET_BED_TYPE_LIST]
    };

    Object.keys(required).forEach((list) => {
      if(!props[list]){
        required_data[0].push([ required[list][0], GET, {}, selectedParams ])
        required_data[1].push(required[list][1])
      }
    });
    props.getsBedsListDependencies(required_data);
  };

  useEffect(() => {
      handleApiCall();
  }, [ currentUrl ]);

  useEffect(() => {
    const { facilityInfrastructureList, facilities, roomType, bedTypeList } = props
    if(
      facilityInfrastructureList &&
      facilities &&
      roomType &&
      bedTypeList
    ){
      let update_facilityInfrastructureList = new Array(...props.facilityInfrastructureList);
      update_facilityInfrastructureList.forEach((row, index) => {
        row.updated_at =  moment(row.updated_at).format('DD-MM-YYYY h:mm a');
      });

      const list = [
        [facilities, 'facility'],
        [roomType, 'room_type'],
        [bedTypeList, 'bed_type']
      ];

      list.forEach((x) => {
        update_facilityInfrastructureList = mappingIdWithNames(update_facilityInfrastructureList, x[0], x[1]);
      })
      setTotalPages(Math.ceil(props.count/PAGINATION_LIMIT))
      setFacilityInfrastructureList(update_facilityInfrastructureList);
    }
  }, [
    props.facilityInfrastructureList,
    props.facilities,
    props.roomType
  ]);

  const bringPage = async () => {

  }
  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={3} >
          <Sort
            onSelect={(val) => console.log(`Sort By ${val} using API`)}
            options={CONFIG.columnDefs}
            onToggleSort={(toggleVal => console.log(`Sort By ${toggleVal} using API`))} />
        </Grid>
        <Grid item xs={12} sm={4} >

          <PaginationController
            resultsShown={currentPage}
            totalResults={totalPages}
            onFirst={() => {
              setCurrentUrl(StringUtils.formatVarString(Routes.FACILITY_INFRASTRUCTURE_LIST_URL, [PAGINATION_LIMIT, OFFSET]));
              setCurrentPage(INITIAL_PAGE)
            }}
            onPrevious={() => {
              if(props.prevPage){
                setCurrentUrl(props.prevPage);
                setCurrentPage(currentPage - 1)
              }}}
            onNext={() => {
              if(props.nextPage){
                setCurrentUrl(props.nextPage);
                setCurrentPage(currentPage + 1)
              }}}
            onLast={() => {
              setCurrentUrl(StringUtils.formatVarString(Routes.FACILITY_INFRASTRUCTURE_LIST_URL, [PAGINATION_LIMIT, PAGINATION_LIMIT * (totalPages - 1)]));
              setCurrentPage(totalPages);
            }}
            onShowList={() => { setShowColumnsPanel(!showColumnsPanel) }}
          />
        </Grid>
      </Grid>
      <TableComponent
        modules={CONFIG.modules}
        columnDefs={CONFIG.columnDefs}
        rowHeight={CONFIG.rowHeight}
        headerHeight={CONFIG.headerHeight}
        autoGroupColumnDef={CONFIG.autoGroupColumnDef}
        defaultColDef={CONFIG.defaultColDef}
        rowSelection={CONFIG.rowSelection}
        rowGroupPanelShow={CONFIG.rowGroupPanelShow}
        pivotPanelShow={CONFIG.pivotPanelShow}
        frameworkComponents={CONFIG.frameworkComponents}
        cellStyle={CONFIG.cellStyle}
        pagination={CONFIG.pagination}
        rowData={facilityInfrastructureList}
        showColumnsPanel={showColumnsPanel}
        onCloseColumnsPanel={() => { setShowColumnsPanel(false) }}
      />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  facilityInfrastructureList: state.facilityInfrastructure.results,
  count: state.facilityInfrastructure.count,
  nextPage: state.facilityInfrastructure.next,
  prevPage: state.facilityInfrastructure.previous,
  bedTypeList: state.bedType.results,
  facilities: state.facilities.results,
  roomType: state.roomType.results,
});

BedsList.propTypes = {
  facilityInfrastructureList: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  nextPage: PropTypes.object.isRequired,
  prevPage: PropTypes.object.isRequired,
  bedTypeList: PropTypes.array.isRequired,
  facilities: PropTypes.array.isRequired,
  roomType: PropTypes.array.isRequired,
  getsBedsListDependencies: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getsBedsListDependencies })(BedsList);
