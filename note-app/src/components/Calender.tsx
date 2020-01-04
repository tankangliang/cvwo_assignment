import React, { useState } from "react";
import { Typography, IconButton, Grid, Badge } from "@material-ui/core";
import moment from "moment";
import styled from "styled-components";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { RootState } from "../store";
import { connect, ConnectedProps } from "react-redux";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { setDateFilter } from "../reducers/datesReducer";

const mapState = (state: RootState) => ({
  eventDates: state.dates.events
});

const mapDispatch = {
  setDateFilter
};
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Table = styled.table`
  border: 2px solid grey;
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
`;

const TableHead = styled.th`
  border: 2px solid grey;
  height: 30px;
  background-color: #3f51b5;
  color: white;
`;

const TableData = styled.td`
  border: 2px solid grey;
  height: 90px
  vertical-align: top;
  padding: 5px
`;

const CircledText = styled.span`
{-moz-border-radius: 15px;
  border-radius: 20px;
  border: 2px dotted #f44336
  color:black;
  padding-left:15px;
  padding-right:15px;
  padding-top:10px;
  padding-bottom:10px;
`;

const Calender = (props: PropsFromRedux) => {
  const [dateObject, setDateObject] = useState(moment());

  const handleCalenderClick = (dateToSet: string) => {
    props.setDateFilter(dateToSet);
  };
  const firstDayOfMonth = () => {
    const firstDay = moment(dateObject)
      .startOf("month")
      .format("d");
    return Number(firstDay);
  };
  const eventfulDates = Object.keys(props.eventDates);
  const blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(<TableData key={i}>{""}</TableData>);
  }
  const daysInMonth = [];
  for (let d = 1; d <= dateObject.daysInMonth(); d++) {
    let currentDay = <span>{d}</span>;
    let events = null;
    if (
      moment().month() === dateObject.month() &&
      d === moment().date() &&
      moment().year() === dateObject.year()
    ) {
      currentDay = <CircledText>{d}</CircledText>;
    }
    const formattedDate = dateObject.date(d).format("D MMMM YYYY");
    if (eventfulDates.includes(formattedDate)) {
      events = (
        <div style={{ textAlign: "center" }}>
          <IconButton
            onClick={() => handleCalenderClick(formattedDate)}
            style={{ display: "inline-block" }}
          >
            <Badge
              color="secondary"
              badgeContent={props.eventDates[formattedDate]}
            >
              <NotificationsNoneIcon fontSize="large" />
            </Badge>
          </IconButton>
        </div>
      );
    }
    daysInMonth.push(
      <TableData key={firstDayOfMonth() + d}>
        {currentDay} {events}
      </TableData>
    );
  }

  const totalSlots = [...blanks, ...daysInMonth];
  const rows: JSX.Element[][] = [];
  let cells: JSX.Element[] = [];

  totalSlots.forEach((row: JSX.Element, i: number) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  let daysinmonth = rows.map((d: JSX.Element[], i: number) => {
    return <tr key={i}>{d}</tr>;
  });

  const weekdayshort = moment.weekdaysShort();

  const weekdaynames = weekdayshort.map(day => {
    return <TableHead key={day}>{day}</TableHead>;
  });

  const changeMonth = (i: number) => () => {
    const prevObj = dateObject.clone();
    setDateObject(prevObj.add(i, "M"));
  };
  return (
    <div>
      <Grid container>
        <IconButton onClick={changeMonth(-1)}>
          <ChevronLeftIcon fontSize="large" />
        </IconButton>
        <div style={{ flex: 1 }} />
        <Typography align="center" variant="h3" color="primary">
          {dateObject.format("MMMM")} {dateObject.format("YYYY")}
        </Typography>
        <div style={{ flex: 1 }} />
        <IconButton onClick={changeMonth(1)}>
          <ChevronRightIcon fontSize="large" />
        </IconButton>
      </Grid>

      <Table>
        <thead>
          <tr>{weekdaynames}</tr>
        </thead>
        <tbody>{daysinmonth}</tbody>
      </Table>
    </div>
  );
};

export default connector(Calender);
