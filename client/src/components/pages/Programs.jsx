import React, { useState, useEffect } from "react";
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

const fieldOptions = ["Computer Science", "Engineering", "Physics", "Chemistry", "Biology", "Law"];
const eligibilityOptions = [9, 10, 11, 12];
const virtualOptions = [true, false];
const costOptions = ["Free/Salaried", "$100-$500", "$500-$1000", ">$1000"];
const seasonOptions = ["Summer", "Fall", "Winter", "Spring"];

function Programs() {
  const [open, setOpen] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [filters, setFilters] = useState({
    field: "",
    eligibility: "",
    virtual: ``,
    cost: "",
    season: "",
  });

  const [filteredPrograms, setFilteredPrograms] = useState([]);

  function getSeason(date) {
    const month = date.getMonth();
    if (month >= 11 || month <= 1) {
      return 'Winter';
    } else if (month >= 2 && month <= 4) {
      return 'Spring';
    } else if (month >= 5 && month <= 7) {
      return 'Summer';
    } else {
      return 'Fall';
    }
  }
  

  useEffect(() => {
    fetch("/api/programs")
      .then((res) => res.json())
      .then((data) => {
        console.log("Received data:", data.programs); // Log data here
        setPrograms(data.programs);
        console.log("Programs:", programs); // Log programs here
        setFilteredPrograms(data.programs);
      })
      .catch((err) => console.error("Fetch error:", err)); // Log error here
  }, []);

  useEffect(() => {
    // Filter logic
    if (Array.isArray(programs)) {
      const newFilteredPrograms = programs.filter((program) => {
        return Object.keys(filters).every((key) => {
          if (key === "cost") {
            switch (filters[key]) {
              case "Free/Salaried":
                return program[key] <= 0;
              case "$100-$500":
                return program[key] >= 100 && program[key] <= 500;
              case "$500-$1000":
                return program[key] > 500 && program[key] <= 1000;
              case ">$1000":
                return program[key] > 1000;
              default:
                return true; // No filter applied
            }
          } else if (key==="season") {
            return !filters[key] || getSeason(new Date(program.startDate)) === filters[key];
          }
          else if (Array.isArray(program[key])) {
            return !filters[key] || program[key].includes(filters[key]);
          } else {
            return !filters[key] || filters[key] === program[key];
          }
        });
      });
      console.log("Filtered programs:", newFilteredPrograms);
      setFilteredPrograms(newFilteredPrograms);
    }
  }, [filters]);

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

  const resetFilters = () => {
    setFilters({
      field: "",
      eligibility: "",
      virtual: "",
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
                {option.toString()} {/* Convert number to string */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ marginRight: 1, flex: 1 }}>
          <InputLabel>Virtual</InputLabel>
          <Select
            name="virtual"
            value={filters.virtual}
            onChange={handleFilterChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {virtualOptions.map((option, index) => (
              <MenuItem value={option} key={index}>
                {option ? "Yes" : "No"} {/* Convert boolean to string */}
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

        <FormControl variant="outlined" sx={{ marginRight: 1, flex: 1 }}>
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
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map((program, index) => (
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
                    {program.field.join(", ")} |{" "}
                    {program.cost > 0
                      ? "Cost: $" + program.cost
                      : "Stipend: $" + program.salary + "/hr"}{" "}
                    | {program.virtual ? "Virtual" : "In-Person"}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <Typography variant="h6" component="div">
            No programs found.
          </Typography>
        )}
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
            <strong>Name:</strong> {selectedProgram?.name}
            <br />
            <strong>Organization:</strong> {selectedProgram?.organization}
            <br />
            <strong>Description:</strong> {selectedProgram?.description}
            <br />
            <strong>Field:</strong> {selectedProgram?.field.join(", ")}

            <br />
            <strong>Eligibility:</strong> {selectedProgram?.eligibility.join(", ")}
            <br />
            <strong>Type:</strong> {selectedProgram?.type}
            <br />
            <strong>Cost:</strong> {selectedProgram?.cost}
            <br />
            <strong>Salary:</strong> {selectedProgram?.salary}
            <br />
            <strong>Location:</strong> {selectedProgram?.location}
            <br />
            <strong>Virtual:</strong> {selectedProgram?.virtual ? "Yes" : "No"}
            <br />
            <strong>Website:</strong>
            <a
              href={selectedProgram?.website}
              target="_blank"
              rel="noreferrer"
              style={{ color: "inherit" }}
            >
              {selectedProgram?.website}
            </a>
            <br />
            <strong>Start Date:</strong> {new Date(selectedProgram?.startDate).toLocaleDateString()}
            <br />
            <strong>End Date:</strong> {new Date(selectedProgram?.endDate).toLocaleDateString()}
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
