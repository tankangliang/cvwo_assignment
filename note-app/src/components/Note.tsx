import React from "react";
import { INote } from "../reducers/types";
import { connect, ConnectedProps } from "react-redux";
import { updateNote, removeNote } from "../reducers/notesReducer";
import { Paper, Typography, IconButton, Grid, Chip } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { makeStyles } from "@material-ui/styles";
import CreateNote from "./CreateNote";
import moment from "moment";

const useStyles = makeStyles({
  greenButton: {
    color: "#00e676"
  },
  redButton: {
    color: "#ff1744"
  }
});

const mapDispatch = {
  updateNote,
  removeNote
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const styles = {
  textDecoration: "line-through"
};
type IProps = PropsFromRedux & {
  note: INote;
};

const Note = (props: IProps) => {
  const handleDone = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.updateNote({ ...props.note, done: !props.note.done });
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.removeNote(props.note.id);
  };
  const dateToString = (date: Date) => {
    const obj = moment(date);
    return obj.format("dddd, D MMMM YYYY");
  };
  const classes = useStyles();
  return (
    <Paper
      style={{
        marginTop: 5,
        marginBottom: 5,
        padding: 20,
        textTransform: "capitalize"
      }}
      variant="outlined"
    >
      <Grid container={true} alignItems="center">
        <Typography variant="h5" style={props.note.done ? styles : undefined}>
          {props.note.content}
        </Typography>
        <IconButton className={classes.greenButton} onClick={handleDone}>
          <DoneIcon />
        </IconButton>
        <div style={{ flex: 1 }} />
        <CreateNote type="edit" note={props.note} />
        <IconButton onClick={handleRemove} className={classes.redButton}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Grid>
      <Grid container={true} alignItems="center">
        {props.note.tags.map(tag => {
          return (
            <Chip
              key={tag}
              style={{ margin: 5 }}
              variant="outlined"
              color="primary"
              label={tag}
            />
          );
        })}
        <div style={{ flex: 1 }} />
        <Typography variant="subtitle1">
          Due on {dateToString(props.note.dateComplete!)}
        </Typography>
      </Grid>
    </Paper>
  );
};

export default connector(Note);
