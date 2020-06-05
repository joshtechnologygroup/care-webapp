import React from 'react';
import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types';
import {
  Grid,
  Card,
} from '@material-ui/core';
import NullState from 'Components/NullState';
import imgNull from 'Assets/images/timeline.jpg';
import { EventOutlined, AccessTime } from '@material-ui/icons';
import moment from 'moment';
import './Timeline.scss';
import { DATE_ONLY_FORMAT, TIME_FORMAT } from 'Src/constants';
export default function Timeline(props) {
  const { i18n } = useTranslation();
  const { timeline } = props;
  return (
    <>
      <div className="section-header">
        <h4 className="heading--card">{i18n.t('Patient Timeline')}</h4>
      </div>
      {
        Boolean(timeline.length) &&
        <Card elevation={4}>
          <Grid
            container
            direction="column-reverse"
            justify="flex-end"
            alignItems="stretch"
            className="timeline_wrap"
          >
            {timeline.map((item, index) => (
              <div key={index} className={`item`}>
                <div className="date">
                  <p className="align-items-center">
                    <EventOutlined className="mr-5" />
                    {moment(item.date).format(DATE_ONLY_FORMAT)}
                  </p>
                  <p className="align-items-center">
                    <AccessTime className="mr-5" />
                    {moment(item.date).format(TIME_FORMAT)}
                  </p>
                </div>
                {/* <span className={`pointer __${item.type} __${item.risk}`} /> */}
                <span className={`pointer __admission __normal`} />
                {/* <p className="title">{item.title}</p> */}
                <p className="desc">{item.description}</p>
                {/* <span className="date">{moment.unix(item.date).format("DD-MMM-YYYY")}</span> */}
              </div>
            ))}
          </Grid>
        </Card>
      }
      {
        !timeline.length > 0 && 
        <Grid
            item
            xs={12}
          >
          <Card>
            <NullState img={imgNull} message={i18n.t('null_messages.timeline')} />
          </Card>
        </Grid>
     }
    </>
  );
}

Timeline.propTypes = {
  timeline: PropTypes.array.isRequired,
}

Timeline.defaultProps = {
  timeline: []
};
