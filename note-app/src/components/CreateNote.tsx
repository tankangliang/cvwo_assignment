import React, { useState, useEffect } from "react";
import { createNote, updateNote } from "../reducers/notesReducer";
import { connect, ConnectedProps } from "react-redux";
import { INewNote, INote } from "../reducers/types";
import { RootState } from "../store";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  DialogTitle,
  IconButton
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  cyanButton: {
    color: "#00bcd4"
  }
});

const mapState = (state: RootState) => ({
  allTags: state.tags
});

const mapDispatch = {
  createNote,
  updateNote
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type IProps = PropsFromRedux & {
  type: string;
  note?: INote;
};

const CreateNote = (props: IProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [date, setDate] = useState<Date | null>(new Date());
  const [tag, setTag] = useState<string>("");
  const [contentError, setContentError] = useState<string>("");
  const [tagsError, setTagsError] = useState<string>("");
  const classes = useStyles();
  const { allTags, type, note } = props;
  const handleTagsChange = (event: any, values: string[]) => {
    setTags(values);
  };

  const handleError = (
    message: string,
    func: React.Dispatch<React.SetStateAction<string>>
  ) => {
    func(message);
    setTimeout(() => func(""), 5000);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (content === "") {
      handleError("Content cannot be empty", setContentError);
      return null;
    } else if (tags.length === 0) {
      if (tag === "") {
        handleError("Tags cannot be empty", setTagsError);
        return null;
      }
    }
    /* had some problem with rails where it always set the date back by 1
    and the fixes online to setting the timezone did not work so here I am */
    let newDate = new Date();
    newDate.setDate(date!.getDate() + 1);
    const newNote: INewNote = {
      content,
      tags: tags.length === 0 ? [tag.toLowerCase()] : tags,
      done: false,
      dateComplete: newDate
    };
    if (note === undefined) {
      props.createNote(newNote);
    } else {
      const noteToUpdate: INote = { ...note, ...newNote };
      props.updateNote(noteToUpdate);
    }

    setContent("");
    setTags([]);
    setDate(new Date());
    setOpen(false);
    setTag("");
  };

  useEffect(() => {
    if (note !== undefined) {
      setContent(note.content);
      setTags(note.tags);
      setDate(note.dateComplete);
    }
  }, [note]);
  const DisplayButton = ({ type }: { type: string }) => {
    if (type === "create") {
      return (
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => setOpen(true)}
        >
          Create a new note
        </Button>
      );
    }
    return (
      <IconButton onClick={() => setOpen(true)}>
        <EditOutlinedIcon className={classes.cyanButton} />
      </IconButton>
    );
  };
  return (
    <div>
      <DisplayButton type={type} />
      <Dialog fullWidth={true} open={open} onClose={() => setOpen(false)}>
        <DialogTitle style={{ textTransform: "uppercase" }}>{type}</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            error={contentError === "" ? false : true}
            helperText={contentError}
            autoFocus={true}
            margin="dense"
            label="Content"
            type="text"
            value={content}
            onChange={({ target }) => setContent(target.value)}
            fullWidth={true}
          />
          <Autocomplete
            multiple={true}
            size="small"
            freeSolo={true}
            options={allTags.all}
            getOptionLabel={(option: string) => option}
            onChange={handleTagsChange}
            value={tags}
            inputValue={tag}
            onInputChange={(e: object, value: string) =>
              setTag(value.toLowerCase())
            }
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                label="Tags"
                placeholder="Tags"
                fullWidth={true}
                error={tagsError === "" ? false : true}
                helperText={tagsError}
              />
            )}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              label="Date to complete by:"
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              value={date}
              onChange={setDate}
              autoOk={true}
              disablePast={true}
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default connector(CreateNote);
