import React, {useEffect, useState} from 'react';
import TableComponent from 'Components/TableComponent';
import Grid from '@material-ui/core/Grid';
import { GET } from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import * as Routes from 'Src/routes';
import * as StringUtils from 'Src/utils/stringformatting';
import { CONFIG } from './config';
import {
  multiSelectBooleanFilterCallback
} from "Src/utils/listFilter";
import { PAGINATION_LIMIT, INITIAL_PAGE, OFFSET, DATE_FORMAT } from 'Src/constants';
import moment from "moment";
import { mappingIdWithNames } from 'Src/utils/mapping-functions'
import PaginationController from 'Components/PaginationController';
import Sort from 'Components/Sort';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Filters from "Components/Filters";
import { getsBedsListDependencies, getBedsList } from 'Actions/BedsListAction';


export function BedsList(props) {
  const [ selectedParams, setSelectedParams ] = useState({});
  const [showColumnsPanel, setShowColumnsPanel] = useState(false);
  const [ facilityInfrastructureList, setFacilityInfrastructureList ] = useState(props.facilityInfrastructureList);
  const [ currentPage, setCurrentPage ] = useState(INITIAL_PAGE);
  const [ currentUrl, setCurrentUrl ] = useState(StringUtils.formatVarString(Routes.FACILITY_INFRASTRUCTURE_LIST_URL, [PAGINATION_LIMIT, OFFSET]));
  const [ totalPages, setTotalPages ] = useState(INITIAL_PAGE);
  const [ ordering, setOrdering ] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);

  const handleApiCall = async () => {
    let update_params;
    update_params = { ...selectedParams };
    if(ordering.field){
      Object.assign(update_params, {'ordering': [ordering.field]})
    }
    if(ordering.ordering === 'desc'){
      update_params.ordering = '-' + update_params.ordering
    }
    let required_data = [
      [
        [currentUrl, GET, {}, update_params]
      ],
      [
        ReducerTypes.GET_FACILITY_INFRASTRUCTURE_LIST
      ]
    ];
    const requiredDependencies = {
      'facilities':[Routes.FACILITY_LIST_URL, ReducerTypes.GET_FACILITY_LIST ],
      'roomTypeList': [Routes.ROOM_TYPES_LIST_URL, ReducerTypes.GET_ROOM_TYPE_LIST ],
      'bedTypeList': [Routes.BED_TYPES_LIST_URL, ReducerTypes.GET_BED_TYPE_LIST ]
    };

    Object.keys(requiredDependencies).forEach((list) => {
      if(!props[list]){
        required_data[0].push([ requiredDependencies[list][0], GET, {}])
        required_data[1].push(requiredDependencies[list][1])
      }
    });
    props.getsBedsListDependencies(required_data);
  };

  useEffect(() => {
      handleApiCall();
  }, [ currentUrl, ordering ]);

  useEffect(() => {
    const { facilityInfrastructureList, facilities, roomTypeList, bedTypeList } = props;
    if(
      facilityInfrastructureList &&
      facilities &&
      roomTypeList &&
      bedTypeList
    ){
      let update_facilityInfrastructureList = new Array(...props.facilityInfrastructureList);
      update_facilityInfrastructureList.forEach((row, index) => {
        row.updated_at =  moment(row.updated_at).format(DATE_FORMAT);
      });

      const list = [
        [facilities, 'facility'],
        [roomTypeList, 'room_type'],
        [bedTypeList, 'bed_type']
      ];

      list.forEach((x) => {
        update_facilityInfrastructureList = mappingIdWithNames(update_facilityInfrastructureList, x[0], x[1]);
      })

      const update_list = {
        'updated_facility_list' : [],
        'updated_room_type_list': [],
        'updated_bed_type_list': [],
      };

      const props_list = {
        'updated_facility_list': facilities,
        'updated_room_type_list': roomTypeList,
        'updated_bed_type_list': bedTypeList,
      };

      Object.keys(update_list).forEach((list_name) => {
        props_list[list_name].forEach((element)=>{
          update_list[list_name].push(element.name);
        })
      });

      CONFIG.columnDefs.forEach((col) => {
        if(col.field === 'facility'){
          col.cellRendererParams.options = update_list['updated_facility_list']
        }
        if(col.field === 'room_type'){
          col.cellRendererParams.options = update_list['updated_room_type_list']
        }
        if(col.field === 'bed_type'){
          col.cellRendererParams.options = update_list['updated_bed_type_list']
        }
      });


      setTotalPages(Math.ceil(props.count/PAGINATION_LIMIT))
      setFacilityInfrastructureList(update_facilityInfrastructureList);
    }
  }, [
    props.facilityInfrastructureList,
    props.facilities,
    props.roomTypeList
  ]);

  const handleBooleanCallBack = (val) => {
    const { facilities, roomTypeList, bedTypeList } = props
    const mapping_id_list = {
      'facility': facilities,
      'room_type': roomTypeList,
      'bed_type': bedTypeList,
    };
    let update_select_params = multiSelectBooleanFilterCallback(
      selectedParams,
      mapping_id_list,
      val);
    setSelectedParams({ ...update_select_params });
  }

  const handleNumberCallBack = (val) => {
    let update_select_params = { ...selectedParams }
    delete update_select_params[val.field + '_min']
    delete update_select_params[val.field + '_max']
    if(val.type === 'Equals To'){
      update_select_params[val.field + '_min'] = [val.fromValue]
      update_select_params[val.field + '_max'] = [val.fromValue]
    } else if(val.type === 'Less Than'){
      update_select_params[val.field + '_max'] = [val.fromValue]
    } else if(val.type === 'Greater Than'){
      update_select_params[val.field + '_min'] = [val.fromValue]
    } else if(val.type === 'Range'){
      update_select_params[val.field + '_min'] = [val.fromValue]
      update_select_params[val.field + '_max'] = [val.toValue]
    }
    setSelectedParams({ ...update_select_params });
  }



  return (
    <React.Fragment>
      <Grid
        container
        direction
        alignItems="center"
        className={`container-padding ${
          showOverlay
            ? "filter-container-overlay"
            : "filter-container"
        }`}
      >
        <Grid item xs={12} sm={12}>
          <Filters
            options={CONFIG.columnDefs}
            onSeeMore={() => {
              setShowOverlay(!showOverlay);
            }}
            handleApplyFilter={() => props.getBedsList(currentUrl, selectedParams)}
            handleBooleanCallBack={val => handleBooleanCallBack(val)}
            handleNumberCallBack={(val) => handleNumberCallBack(val)}
          />
        </Grid>
      </Grid>
      <div
        onClick={() => setShowOverlay(!showOverlay)}
        className={showOverlay ? "overlay overlay-show" : "overlay"}
      ></div>
      <div className="container-padding">
        <Grid
          container
          className="sort-pagination"
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={3} >
            <Sort
              onSelect={val => {
                setOrdering({...ordering, field: [val]});
              }}
              options={CONFIG.columnDefs}
              onToggleSort={toggleVal => {
                setOrdering({...ordering, ordering: toggleVal});
              }} />
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
      </div>
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
  roomTypeList: state.roomType.results,
});

BedsList.propTypes = {
  getBedsList: PropTypes.func.isRequired,
  facilityInfrastructureList: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  nextPage: PropTypes.object.isRequired,
  prevPage: PropTypes.object.isRequired,
  bedTypeList: PropTypes.array.isRequired,
  facilities: PropTypes.array.isRequired,
  roomTypeList: PropTypes.array.isRequired,
  getsBedsListDependencies: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getsBedsListDependencies, getBedsList })(BedsList);
