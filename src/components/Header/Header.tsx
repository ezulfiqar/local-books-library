import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { USER } from "../../constants";

export const Header = () => {
  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Local Books Library
        </Typography>
        <Typography>Logged in as {USER}</Typography>
      </Toolbar>
    </AppBar>
  );
};
