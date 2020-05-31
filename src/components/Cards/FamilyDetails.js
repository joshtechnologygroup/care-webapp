import React from 'react';
import { useTranslation } from "react-i18next";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
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

// Importing mock data
import { relationshipChoices } from 'Mockdata/relationshipChoices.json';
import { genderChoices } from 'Constants/app.const';

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

export default function FamilyDetails(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();

  const { profile, handleEdit } = props;
  console.log(profile)
  return (
    <Card elevation={4}>
      <CardHeader
        title={i18n.t('Family Details')}
        action={
          <IconButton variant="contained" className={classes.action} aria-label="settings">
            <Add fontSize="large"/>
          </IconButton>
        }
      />
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12}>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>{i18n.t('Name')}</StyledTableCell>
                  <StyledTableCell>{i18n.t('Relationship')} #</StyledTableCell>
                  <StyledTableCell>{i18n.t('Gender')}</StyledTableCell>
                  <StyledTableCell>{i18n.t('Age')}</StyledTableCell>
                  <StyledTableCell>{i18n.t('Phone')}</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  profile.map((val, index) => 
                    <TableRow className={classes.tableRow} key={index}>
                      <StyledTableCell>
                        <Typography color="primary" variant="h5" >{val.name}</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        {
                          relationshipChoices.map(choice => {
                              return choice.id === val.relation ? (choice.name) : ''
                          })
                        }
                      </StyledTableCell>
                      <StyledTableCell>
                        {
                          genderChoices.map(choice => {
                              return choice.id === val.gender ? (choice.name) : ''
                          })
                        }
                      </StyledTableCell>
                      <StyledTableCell>
                        {val.ageYears} {i18n.t('years')} {val.ageMonths ? `${val.ageMonths} ${i18n.t('months')}` : ''}
                      </StyledTableCell>
                      <StyledTableCell>
                        {val.phone}
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
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

FamilyDetails.propTypes = {
  profile: PropTypes.array.isRequired,
  handleEdit: PropTypes.func
}

FamilyDetails.defaultProps = {
  profile: []
}


