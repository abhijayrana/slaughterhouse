import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

const dummyPrograms = [
  {
    name: "Program 11",
    eligibility: ["10", "11"],
    field: "Mathematics",
    virtual_in_person: "Virtual",
    cost: ">$1000",
    season: "Summer",
    website_url: "https://program11.com",
    acceptance_rate: "87%",
    description: "This is a description for Program 11.",
    app_deadline: "2023-5-10",
  },
  {
    name: "Program 12",
    eligibility: ["11", "12"],
    field: "Mathematics",
    virtual_in_person: "Virtual",
    cost: "$100-$500",
    season: "Fall",
    website_url: "https://program12.com",
    acceptance_rate: "48%",
    description: "This is a description for Program 12.",
    app_deadline: "2023-4-3",
  },
  {
    name: "Program 13",
    eligibility: ["9", "10", "11", "12"],
    field: "Engineering",
    virtual_in_person: "Virtual",
    cost: "$100-$500",
    season: "Fall",
    website_url: "https://program13.com",
    acceptance_rate: "21%",
    description: "This is a description for Program 13.",
    app_deadline: "2023-5-18",
  },
];

const eligibilityOptions = ["9", "10", "11", "12"];
const fieldOptions = ["Engineering", "Science", "Arts", "Mathematics"];
const virtualOptions = ["Virtual", "In-Person"];
const costOptions = ["Free", "$100-$500", "$500-$1000", ">$1000"];
const seasonOptions = ["Summer", "Fall", "Winter"];

function Programs() {
  const [open, setOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [filters, setFilters] = useState({
    eligibility: "",
    field: "",
    virtual_in_person: "",
    cost: "",
    season: "",
  });

  const handleOpen = (program) => {
    setSelectedProgram(program);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredPrograms = dummyPrograms.filter((program) => {
    return Object.keys(filters).every((key) => {
      if (Array.isArray(program[key])) {
        return !filters[key] || program[key].includes(filters[key]);
      } else {
        return !filters[key] || filters[key] === program[key];
      }
    });
  });
  const resetFilters = () => {
    setFilters({
      eligibility: "",
      field: "",
      virtual_in_person: "",
      cost: "",
      season: "",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          marginBottom: 2,
          width: "80%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FormControl variant="outlined" sx={{ marginRight: 1, flex: 1 }}>
          <InputLabel>Eligibility</InputLabel>
          <Select
            name="eligibility"
            value={filters.eligibility}
            onChange={handleFilterChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {eligibilityOptions.map((option, index) => (
              <MenuItem value={option} key={index}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ marginRight: 1, flex: 1 }}>
          <InputLabel>Field</InputLabel>
          <Select
            name="field"
            value={filters.field}
            onChange={handleFilterChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {fieldOptions.map((option, index) => (
              <MenuItem value={option} key={index}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ marginRight: 1, flex: 1 }}>
          <InputLabel>Virtual/In-Person</InputLabel>
          <Select
            name="virtual_in_person"
            value={filters.virtual_in_person}
            onChange={handleFilterChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {virtualOptions.map((option, index) => (
              <MenuItem value={option} key={index}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ marginRight: 1, flex: 1 }}>
          <InputLabel>Cost</InputLabel>
          <Select
            name="cost"
            value={filters.cost}
            onChange={handleFilterChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {costOptions.map((option, index) => (
              <MenuItem value={option} key={index}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ flex: 1 }}>
          <InputLabel>Season</InputLabel>
          <Select
            name="season"
            value={filters.season}
            onChange={handleFilterChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {seasonOptions.map((option, index) => (
              <MenuItem value={option} key={index}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="outlined" sx={{ flex: 0.8 }} onClick={resetFilters}>
          Reset Filters
        </Button>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {filteredPrograms.map((program, index) => (
          <Card
            key={index}
            sx={{
              width: "80%",
              marginBottom: 2,
              backgroundColor: (theme) => theme.palette.background.default,
              color: (theme) => theme.palette.text.primary,
            }}
          >
            <CardActionArea onClick={() => handleOpen(program)}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {program.name}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {program.field} | {program.virtual_in_person} | {program.cost}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          {selectedProgram?.name}
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          <Typography variant="body1">
            <strong>Field:</strong> {selectedProgram?.field}
            <br />
            <strong>Eligibility:</strong> {selectedProgram?.eligibility}
            <br />
            <strong>Virtual/In-Person:</strong>{" "}
            {selectedProgram?.virtual_in_person}
            <br />
            <strong>Cost:</strong> {selectedProgram?.cost}
            <br />
            <strong>Season:</strong> {selectedProgram?.season}
            <br />
            <strong>Website:</strong>{" "}
            <a
              href={selectedProgram?.website_url}
              target="_blank"
              rel="noreferrer"
              style={{ color: "inherit" }}
            >
              {selectedProgram?.website_url}
            </a>
            <br />
            <strong>Acceptance Rate:</strong> {selectedProgram?.acceptance_rate}
            <br />
            <strong>Application Deadline:</strong>{" "}
            {selectedProgram?.app_deadline}
            <br />
            <strong>Description:</strong> {selectedProgram?.description}
            <br />
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            color: (theme) => theme.palette.text.primary,
          }}
        >
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Programs;
