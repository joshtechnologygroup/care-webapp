import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { timeline } from 'Mockdata/timeline.json';
import moment from 'moment';
import './Timeline.scss';

export default function Timeline() {
  return (
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
  );
}
