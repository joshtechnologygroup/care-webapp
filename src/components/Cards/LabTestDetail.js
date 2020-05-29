import React from 'react';
import { useTranslation } from "react-i18next";
import moment from 'moment';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Fab,
  TableContainer,
} from '@material-ui/core';
import { EditOutlined, Add } from '@material-ui/icons';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';
import NullState from 'Components/NullState';

// Importing mock data
import { labTestStatusChoices } from 'Mockdata/labTestStatusChoices.json';

const useStyles = makeStyles(theme =>
  createStyles({
    table: {
      minWidth: 900,
      overflow: 'hidden',
    },
    edit: {
      transform: 'translateX(100px)',
      transition: '.2s',
      boxShadow: 'none',
    },
    action: {
      position: 'absolute',
      right: '.2em',
      top: '.2em',
    },
    tableRow: {
      transition: 'background .4s',
      background: theme.palette.gray.tint,
      borderTop: '.5rem #fff solid',
      '&:hover': {
        background: theme.palette.gray.lighter,
        '& .MuiFab-root': {
          transform: 'translateX(0)',
        }
      },
    },
  })
);
  
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#839fde',
    color: theme.palette.common.white,
    fontSize: 16,
    lineHeight: 1.2,
    padding: `1rem 1.6rem`,
  },
  body: {
    border: 0,
    fontSize: 16,
    padding: `.6rem 1.6rem`,
  },
}))(TableCell);

export default function LabTestDetail(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();

  const { profile } = props;
  return (
    <Card elevation={4}>
      <CardHeader
        title={i18n.t('Lab Tests')}
        action={
          <IconButton variant="contained" className={classes.action} aria-label="settings">
            <Add fontSize="large"/>
          </IconButton>
        }
      />
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            {
              profile.length > 0 && 
              <TableContainer>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>{i18n.t('Lab name')}</StyledTableCell>
                      <StyledTableCell>{i18n.t('Lab code')} #</StyledTableCell>
                      <StyledTableCell>{i18n.t('Sample collection date')}</StyledTableCell>
                      <StyledTableCell>{i18n.t('Last Updated')}</StyledTableCell>
                      <StyledTableCell align="center">{i18n.t('Status')}</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      profile.map((test, index) => 
                        <TableRow className={classes.tableRow} key={index}>
                          <StyledTableCell>
                            <Typography color="primary" variant="h5" >{test.labName}</Typography>
                          </StyledTableCell>
                          <StyledTableCell>{test.labCode}</StyledTableCell>
                          <StyledTableCell>{moment.unix(test.sampleDate).format('DD-MM-YYYY')}</StyledTableCell>
                          <StyledTableCell>{moment.unix(test.updated).format('DD-MM-YYYY')}</StyledTableCell>
                          <StyledTableCell align="center">
                            <Chip
                              label={
                              labTestStatusChoices.map(choice => {
                                return choice.id === test.status ? choice.name : ''
                              })
                            } />
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Fab size="small" color="primary" aria-label="edit" className={classes.edit}>
                              <EditOutlined />
                            </Fab>
                          </StyledTableCell>
                        </TableRow>
                      )
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            }
            {
              !profile.length &&
              <NullState msg={i18n.t('null_messages.labtest')} />
            }
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

LabTestDetail.propTypes = {
  profile: PropTypes.array.isRequired,
}

LabTestDetail.defaultProps = {
  profile: []
}
