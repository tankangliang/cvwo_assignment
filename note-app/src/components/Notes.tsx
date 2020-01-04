import React, { useState, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store";
import { INote } from "../reducers/types";
import { initializeTags } from "../reducers/tagsReducer";
import { initializeEvents, setDateFilter } from "../reducers/datesReducer";
import Note from "./Note";
import { Typography, ButtonGroup, Button } from "@material-ui/core";
import moment from "moment";

const filterNotes = (notes: INote[], tags: string[]) => {
  let displayNotes: INote[] = [];
  if (tags.length > 0) {
    const filteredNotes = notes.filter(note =>
      tags.every(tag => note.tags.indexOf(tag) > -1)
    );
    displayNotes = filteredNotes;
  } else {
    displayNotes = notes;
  }
  return displayNotes;
};
const mapState = (state: RootState) => ({
  notes: state.notes,
  filteredNotes: filterNotes(state.notes, state.tags.filter),
  dateFilter: state.dates.filterType
});

const mapDispatch = {
  initTags: initializeTags,
  initEvents: initializeEvents,
  setDateFilter
};
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Notes = (props: PropsFromRedux) => {
  const { initTags, initEvents, notes } = props;
  const [sortType, setSortType] = useState<string>("date created");

  useEffect(() => {
    initTags(notes);
    initEvents(notes);
  }, [notes, initTags, initEvents]);

  let filteredNotes: INote[] = props.filteredNotes;

  if (sortType === "date created") {
    filteredNotes.sort(
      (a, b) => b.created_at.getTime() - a.created_at.getTime()
    );
  } else {
    filteredNotes.sort(
      (a, b) => a.dateComplete!.getTime() - b.dateComplete!.getTime()
    );
  }

  if (props.dateFilter !== "sort") {
    filteredNotes = filteredNotes.filter(note => {
      return (
        moment(note.dateComplete!).format("D MMMM YYYY") === props.dateFilter
      );
    });
  }
  const handleClick = (value: string) => (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setSortType(value);
  };
  return (
    <div
      style={{ height: window.innerHeight, overflow: "auto", marginLeft: 5 }}
    >
      <div>
        <Typography align="center" color="primary" variant="h2">
          Notes
        </Typography>
      </div>

      <div>
        {props.dateFilter === "sort" ? (
          <>
            <ButtonGroup fullWidth={true} color="primary" size="large">
              <Button
                variant={sortType === "date created" ? "contained" : undefined}
                onClick={handleClick("date created")}
              >
                date created
              </Button>
              <Button
                variant={sortType === "date due" ? "contained" : undefined}
                onClick={handleClick("date due")}
              >
                date due
              </Button>
            </ButtonGroup>
            <Typography
              style={{ marginTop: 5, marginBottom: 5, color: "grey" }}
              variant="subtitle1"
            >
              Sorting by{" "}
              {sortType === "date created" ? "latest created" : "earliest due"}
            </Typography>
          </>
        ) : (
          <Button onClick={() => props.setDateFilter("sort")}>Back</Button>
        )}
      </div>

      <div>
        {filteredNotes.map((note: INote) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default connector(Notes);
