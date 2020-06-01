import React from 'react';
import { useTranslation } from "react-i18next";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { timeline } from 'Mockdata/timeline.json';
import moment from 'moment';
import './Timeline.scss';

export default function Timeline() {
  const { i18n } = useTranslation();
  return (
    <>
      <div className="section-header">
        <h4 className="heading--card">{i18n.t('Patient Timeline')}</h4>
      </div>
      <Card elevation={4}>
        <Grid
          container
          direction="column-reverse"
          justify="flex-end"
          alignItems="stretch"
          className="timeline_wrap"
        >
          {timeline.map(item => (
            <div key={item.id} className={`item`}>
              <span className={`pointer __${item.type} __${item.risk}`} />
              <p className="title">{item.title}</p>
              <p className="desc">{item.description}</p>
              <span className="date">{moment.unix(item.date).format("DD-MMM-YYYY")}</span>
            </div>
          ))}
        </Grid>
      </Card>
    </>
  );
}
