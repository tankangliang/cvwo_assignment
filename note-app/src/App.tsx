import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { initializeNotes } from "./reducers/notesReducer";
import Notes from "./components/Notes";
import Header from "./components/Header";
import TagSelector from "./components/TagSelector";
import Calender from "./components/Calender";
import { Grid } from "@material-ui/core";

const gridStyle = {
  height: window.innerHeight,
  padding: "10px",
  borderLeft: "8px dotted grey",
  position: "relative"
} as React.CSSProperties;

const mapDispatch = {
  getAllNotes: initializeNotes
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const App = (props: PropsFromRedux) => {
  const { getAllNotes } = props;
  React.useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);

  return (
    <div>
      <Header />
      <Grid container={true}>
        <Grid item={true} xs={2}>
          <TagSelector />
        </Grid>
        <Grid style={gridStyle} item={true} xs={5}>
          <Notes />
        </Grid>
        <Grid style={gridStyle} item={true} xs={5}>
          <Calender />
        </Grid>
      </Grid>
    </div>
  );
};

export default connector(App);
