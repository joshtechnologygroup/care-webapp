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
import { PAGINATION_LIMIT, INITIAL_PAGE, OFFSET } from 'Src/constants';
import { mappingIdWithNames } from 'Src/utils/mapping-functions'
import PaginationController from 'Components/PaginationController';
import Sort from 'Components/Sort';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Filters from "Components/Filters";
import { getsFacilityStaffListDependencies, getStaffList } from 'Actions/FacilityStaffAction';


export function DoctorAttendantList(props) {
  const [ selectedParams, setSelectedParams ] = useState({});
  const [showColumnsPanel, setShowColumnsPanel] = useState(false);
  const [ facilityStaffList, setFacilityInfrastructureList ] = useState(props.facilityStaffList);
  const [ currentPage, setCurrentPage ] = useState(INITIAL_PAGE);
  const [ currentUrl, setCurrentUrl ] = useState(StringUtils.formatVarString(Routes.FACILITY_STAFF_LIST_URL, [PAGINATION_LIMIT, OFFSET]));
  const [ totalPages, setTotalPages ] = useState(INITIAL_PAGE);
  const [ ordering, setOrdering ] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);

  const handleApiCall = async () => {
    let update_params = { ...selectedParams };
    if(ordering.field) {
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
        ReducerTypes.GET_FACILITY_STAFF_LIST
      ]
    ];
    const requiredDependencies = {
      'facilities':[Routes.FACILITY_LIST_URL, ReducerTypes.GET_FACILITY_LIST ],
      'staffDesignationList':[Routes.STAFF_DESIGNATION_LIST_URL, ReducerTypes.GET_STAFF_DESIGNATION_LIST ],
    };

    Object.keys(requiredDependencies).forEach((list) => {
      if(!props[list]){
        required_data[0].push([ requiredDependencies[list][0], GET, {}])
        required_data[1].push(requiredDependencies[list][1])
      }
    });
    props.getsFacilityStaffListDependencies(required_data);
  };

  useEffect(() => {
      handleApiCall();
  }, [ currentUrl, ordering ]);

  useEffect(() => {
    const { facilities, facilityStaffList, staffDesignationList } = props;
    if(
      facilities &&
      facilityStaffList &&
      staffDesignationList
    ){
      let update_facilityStaffList = new Array(...facilityStaffList);

      const list = [
        [facilities, 'facility'],
        [staffDesignationList, 'designation']
      ];

      list.forEach((x) => {
        update_facilityStaffList = mappingIdWithNames(update_facilityStaffList, x[0], x[1]);
      })

      const update_list = {
        'updated_facility_list' : [],
        'updated_designation_list' : [],
      };

      const props_list = {
        'updated_facility_list': facilities,
        'updated_designation_list' : staffDesignationList,
      };

      Object.keys(update_list).forEach((list_name) => {
        props_list[list_name].forEach((element)=>{
          update_list[list_name].push(element.name);
        })
      });

      CONFIG.columnDefs.forEach((col) => {
        if(col.field === 'facility') {
          col.cellRendererParams.options = update_list['updated_facility_list']
        }
        if(col.field === 'designation') {
          col.cellRendererParams.options = update_list['updated_designation_list']
        }
      });


      setTotalPages(Math.ceil(props.count/PAGINATION_LIMIT))
      setFacilityInfrastructureList(update_facilityStaffList);
    }
  }, [
    props.facilities,
    props.facilityStaffList,
    props.staffDesignationList
  ]);

  const handleBooleanCallBack = (val) => {
    const { facilities } = props
    const mapping_id_list = {
      'facility': facilities,
    };
    let update_select_params = multiSelectBooleanFilterCallback(
      selectedParams,
      mapping_id_list,
      val);
    setSelectedParams({ ...update_select_params });
  }

  const handleStringCallBack = (field, val) => {
    let update_select_params = { ... selectedParams }
    update_select_params[field] = val;
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
            handleApplyFilter={() => props.getStaffList(currentUrl, selectedParams)}
            handleReset={() => {
              props.getStaffList(currentUrl, {});
              setSelectedParams({});
            }}
            handleBooleanCallBack={val => handleBooleanCallBack(val)}
            handleStringCallBack={(field, val) => handleStringCallBack(field, val)}/>

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
                if(val === 'facility')
                setOrdering({...ordering, field: ['facility__name']});
                else
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
                setCurrentUrl(StringUtils.formatVarString(Routes.FACILITY_STAFF_LIST_URL, [PAGINATION_LIMIT, OFFSET]));
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
                setCurrentUrl(StringUtils.formatVarString(Routes.FACILITY_STAFF_LIST_URL, [PAGINATION_LIMIT, PAGINATION_LIMIT * (totalPages - 1)]));
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
          rowData={facilityStaffList}
          showColumnsPanel={showColumnsPanel}
          onCloseColumnsPanel={() => { setShowColumnsPanel(false) }}
        />
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  count: state.facilityStaff.count,
  nextPage: state.facilityStaff.next,
  prevPage: state.facilityStaff.previous,
  bedTypeList: state.bedType.results,
  facilities: state.facilities.results,
  facilityStaffList: state.facilityStaff.results,
  staffDesignationList: state.staffDesignation.results
});

DoctorAttendantList.propTypes = {
  facilityStaffList: PropTypes.array.isRequired,
  staffDesignationList: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  nextPage: PropTypes.object.isRequired,
  prevPage: PropTypes.object.isRequired,
  facilities: PropTypes.array.isRequired,
  getsFacilityStaffListDependencies: PropTypes.func.isRequired,
  getStaffList: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getsFacilityStaffListDependencies, getStaffList })(DoctorAttendantList);
