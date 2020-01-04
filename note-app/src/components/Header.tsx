import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import CreateNote from "./CreateNote";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography style={{ flex: 1 }} variant="h6">
          Notes
        </Typography>
        <CreateNote type="create" />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
