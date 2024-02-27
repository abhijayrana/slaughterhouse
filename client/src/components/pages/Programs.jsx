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

const gradeEligibilityOptions = [9, 10, 11, 12];
const virtualOptions = [true, false];
const paymentOptions = [
  "$1-$500",
  "$500-$1000",
  "$1000-$2000",
  "$2000-$5000",
];
const stipendOptions = ["$10-$20", "$20-$30", "$30-$40", "$40-$50"];
const seasonOptions = ["Summer", "Fall", "Winter", "Spring", "Year-round"];

function Programs() {
  const [open, setOpen] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [fieldOptions, setFieldOptions] = useState([]);
  const [filters, setFilters] = useState({
    field: [],
    eligType: "",
    eligibility: [],
    virtual: ``,
    paymentType: "",
    paymentAmount: "",
    season: "",
  });
  const [filteredPrograms, setFilteredPrograms] = useState([]);

  function getSeason(date) {
    if (date == "Year-round") return "Year-round";
    const month = date.getMonth();
    if (month >= 11 || month <= 1) {
      return "Winter";
    } else if (month >= 2 && month <= 4) {
      return "Spring";
    } else if (month >= 5 && month <= 7) {
      return "Summer";
    } else if (month >= 8 && month <= 11) {
      return "Fall";
    }
  }

  useEffect(() => {
    fetch("/api/programs")
      .then((res) => res.json())
      .then((data) => {
        setPrograms(data.programs);
        setFilteredPrograms(data.programs);
        console.log(data.programs);
      })
      .catch((err) => console.error("Fetch error:", err));

    fetch("/api/unique-fields")
      .then((res) => res.json())
      .then((data) => {
        setFieldOptions(data);
        console.log(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    if (Array.isArray(programs)) {
      const newFilteredPrograms = programs.filter((program) => {
        return Object.keys(filters).every((key) => {
          if (key === "field") {
            // Check if any selected field is in the program's field array
            return (
              filters.field.length === 0 ||
              program.field.some((pf) => filters.field.includes(pf))
            );
          } else if (key === "eligibility") {
            if (filters.eligibility.length === 0) {
              return true; // Include all programs if no specific eligibility filter is selected
            }
            // Filter based on the eligibility grades
            return filters.eligibility.some((selectedGrade) =>
              program.eligibility.range.includes(selectedGrade)
            );
          } else if (key === "season") {
            return (
              !filters[key] ||
              (program.startDate === "Year-round" &&
                filters[key] === "Year-round") ||
              getSeason(new Date(program.startDate)) === filters[key]
            );
          } else if (key === "paymentType") {
            console.log(
              "Filtering by paymentType:",
              filters.paymentType,
              "Program cost type:",
              program.cost.costType
            );

            if (filters.paymentType === "Free") {
              return program.cost.costType === "Free";
            } else if (filters.paymentType === "Paid") {
              return program.cost.costType === "Cost";
            } else if (filters.paymentType === "Stipended") {
              return program.cost.costType === "Stipend";
            } else {
              return true; // Include all if no specific type is selected
            }
          } else if (key === "paymentAmount") {
            // Example logic for filtering by payment amount
            // You will need to adapt this to match how your program data is structured
            if (filters.paymentAmount === "") {
              return true;
            }
            
            if (
              filters.paymentType === "Paid" ||
              filters.paymentType === "Stipended"
            ) {
              const amountRange = filters.paymentAmount.replace(/\$/g, "").split("-");
              const [min, max] = amountRange.map(Number);
              return program.cost.amount >= min && program.cost.amount <= max;
            } else {
              return true;
            }
          } else if (Array.isArray(program[key])) {
            return !filters[key] || program[key].includes(filters[key]);
          } else {
            return !filters[key] || filters[key] === program[key];
          }
        });
      });
      setFilteredPrograms(newFilteredPrograms);
    }
  }, [filters, programs]);

  const handleOpen = (program) => {
    setSelectedProgram(program);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === "eligibility" || name==="field" && value.includes("")) {
      // If "None" is selected, reset other selections
      setFilters((prevFilters) => ({ ...prevFilters, [name]: [""] }));
    } else {
      // Normal handling for other options
      setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    }
  };

  const resetFilters = () => {
    setFilters({
      field: [],
      eligibility: [],
      virtual: "",
      cost: "",
      paymentType: "",
      paymentAmount: "",
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
      {/* Filter Controls */}
      <Box
        sx={{
          marginBottom: 2,
          width: "80%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Field Filter */}
        <FormControl variant="outlined" sx={{ marginRight: 1, flex: 1 }}>
          <InputLabel>Field</InputLabel>
          <Select
            name="field"
            multiple
            value={filters.field}
            onChange={handleFilterChange}
            renderValue={(selected) => selected.join(", ")}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {fieldOptions?.map((option, index) => (
              <MenuItem value={option} key={index}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ marginRight: 1, flex: 1 }}>
          <InputLabel>Grades</InputLabel>
          <Select
            name="eligibility"
            multiple
            value={filters.eligibility}
            onChange={handleFilterChange}
            renderValue={(selected) => selected.join(", ")}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {gradeEligibilityOptions.map((option, index) => (
              <MenuItem value={option} key={index}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Virtual Filter */}
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
                {option ? "Yes" : "No"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Payment Type Filter */}
        <FormControl variant="outlined" sx={{ marginRight: 1, flex: 1 }}>
          <InputLabel>Payment Type</InputLabel>
          <Select
            name="paymentType"
            value={filters.paymentType}
            onChange={handleFilterChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>{" "}
            {/* Resets the filter */}
            <MenuItem value="Free">Free</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Stipended">Stipended</MenuItem>
          </Select>
        </FormControl>
        {/* Payment Amount Filter (Conditional) */}
        {filters.paymentType && (
          <FormControl variant="outlined" sx={{ marginRight: 1, flex: 1 }}>
            <InputLabel>Payment Amount</InputLabel>
            <Select
              name="paymentAmount"
              value={filters.paymentAmount}
              onChange={handleFilterChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>{" "}
              {/* Resets the filter */}
              {(filters.paymentType === "Paid"
                ? paymentOptions
                : stipendOptions
              ).map((option, index) => (
                <MenuItem value={option} key={index}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {/* Season Filter */}
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

        {/* Reset Filters Button */}
        <Button variant="outlined" sx={{ flex: 0.8 }} onClick={resetFilters}>
          Reset Filters
        </Button>
      </Box>

      {/* Display Programs */}
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
                    {program.cost.costType === "Free"
                      ? "Free"
                      : program.cost.costType === "Cost"
                      ? `Cost: $${program.cost.amount}`
                      : `Stipend: $${program.cost.amount}/hr`}{" "}
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

      {/* Program Details Dialog */}
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
            {/* Program Details */}
            <strong>Name:</strong> {selectedProgram?.name}
            <br />
            <strong>Organization:</strong> {selectedProgram?.organization}
            <br />
            <strong>Description:</strong> {selectedProgram?.description}
            <br />
            <strong>Field:</strong> {selectedProgram?.field.join(", ")}
            <br />
            <strong>Eligibility:</strong>{" "}
            {selectedProgram?.eligibility.eligType +
              "s: " +
              selectedProgram?.eligibility.range.join(", ")}
            <br />
            <strong>Cost:</strong>{" "}
            {selectedProgram?.cost?.costType === "Free"
              ? "Free"
              : selectedProgram?.cost?.costType === "Cost"
              ? `$${selectedProgram?.cost?.amount}`
              : `Stipend: $${selectedProgram?.cost?.amount}/hr`}
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
            <strong>Start Date:</strong>{" "}
            {new Date(selectedProgram?.startDate).toLocaleDateString()}
            <br />
            <strong>End Date:</strong>{" "}
            {new Date(selectedProgram?.endDate).toLocaleDateString()}
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
