import React from 'react';
import { useTranslation } from "react-i18next";
import {
  Grid,
  Card,
  Typography,
} from '@material-ui/core';
import { EventOutlined, AccessTime } from '@material-ui/icons';
import moment from 'moment';
import './Timeline.scss';
import { DATE_FORMAT } from 'Src/constants';
export default function Timeline(props) {
  const { i18n } = useTranslation();
  const { timeline } = props;
  return (
    <>
      <div className="section-header">
        <h4 className="heading--card">{i18n.t('Patient Timeline')}</h4>
      </div>
      {timeline &&
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
                <span className="date"> {moment(item.date).format(DATE_FORMAT)}</span>
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
          !timeline && 
          <Card elevation={4}>
          <Grid
            container
            direction="column-reverse"
            justify="flex-end"
            alignItems="stretch"
            className="timeline_wrap"
          >
            NO TIMELINE EXIST
          </Grid>
        </Card>
        }
    </>
  );
}
