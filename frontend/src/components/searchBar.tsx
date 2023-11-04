'use client';
import React, { useState, ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

function searchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: any) => {
    event.preventDefault();
    console.log("state", searchTerm);

    setSearchTerm("");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const gridContainerStyle = {
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  const textFieldStyle = {
    border: "0px solid #141D4F",
    borderRadius: "0px",
    borderTopLeftRadius: "5px",
    borderBottomLeftRadius: "5px",
  };

  const gridIconContainerStyle = {
    backgroundColor: "#141D4F",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  };

  const iconButtonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const iconStyle = {
    color: "white",
  };

  return (
    <Grid container spacing={0} style={gridContainerStyle}>
      <Grid item xs={9.5}>
        <TextField
          value={searchTerm}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            style: textFieldStyle,
          }}
        />
      </Grid>
      <Grid item xs={2.5} style={gridIconContainerStyle}>
        <IconButton style={iconButtonStyle} onClick={handleSearch}>
          <FaSearch style={iconStyle} />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default searchBar;
