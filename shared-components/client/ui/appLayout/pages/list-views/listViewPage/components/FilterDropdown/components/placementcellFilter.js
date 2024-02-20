import React, { useState } from "react";
import {
  Select,
  MenuItem,
  Grid,
  Button,
  InputBase,
  IconButton,
  Stack,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import withStyles from "@material-ui/core/styles/withStyles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const options = [
  {
    label: "Job title",
    value: "Job title",
  },
  {
    label: "Location",
    value: "Location",
  },
  {
    label: "Platform",
    value: "Job matches %",
  },
  {
    label: "Salary",
    value: "Salary",
  },
  {
    label: "Status",
    value: "Status",
  },
];  

function placementcellFilter() {
  const [selectedOption, setSelectedOption] = useState([{ category: "" }]);
  const [searchText, setSearchText] = useState("");

  const handleChange = (e, i) => {
    const { value } = e.target;
    const list = [...selectedOption];
    list[i]["category"] = value;
    setSelectedOption(list);
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e.target.value);
  };


  const handleReset = () => {
    setSelectedOption(selectedOption.slice(0, -1));
    setSearchText("");
  };

  const handleAddFilter = () => {
    // Handle the Add Filter button click event
    console.log("Add Filter clicked");
    // Add your custom functionality here
  };

  const ShopSelectorInput = withStyles(() => ({
    input: {
      "&:focus": {
        // background: "transparent",
      },
    },
  }))(InputBase);

  const handleAddClick = () => {
    setSelectedOption([...selectedOption, { category: "" }]);
  };

  return (
    <>
      {selectedOption.map((x, i) => {
        return (
          <Grid container spacing={1} alignItems="center" marginBottom={1}>
            <Grid item>
              <Stack direction="row" spacing={1} alignItems="center">
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<AddIcon />}
                  sx={{ fontSize: "12px" }}
                  onClick={handleAddClick} // Add onClick event
                >
                  Add Filter
                </Button>

                <Select
                  value={x.category || ""}
                  options={options}
                  onChange={(e) => handleChange(e, i)}
                  displayEmpty
                  sx={{ fontSize: "12px" }}
                  size="small"
                >
                  <MenuItem value="" disabled>
                    Select Option
                  </MenuItem>
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>
            <Grid item>
              {x.category && (
                <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "2px",
                      width: "180px",
                      height: "38px", // Adjust the height as needed
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1, fontSize: "12px", height: "100%" }}
                      placeholder="Search"
                      inputProps={{ "aria-label": "search" }}
                      onChange={handleSearchInputChange}
                    />
                    <IconButton type="button" sx={{ p: "8px" }} aria-label="search">
                      <SearchIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              )}
            </Grid>
            <Grid item>
              <Button
                onClick={handleReset}
                variant="outlined"
                color="secondary"
                size="small"
                startIcon={<DeleteOutlineIcon />}
                sx={{ fontSize: "12px" }}
                disabled={!selectedOption}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
}

export default placementcellFilter;
