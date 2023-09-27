import {
    Button,
    Container,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    Typography,
  } from '@mui/material';
  import React, { useState } from 'react';
  
  function AddProgram() {
    const [programData, setProgramData] = useState({
      name: '',
      organization: '',
      field: '',
      eligibility: {
        age: '',
        year: '',
      },
      type: '',
      cost: '',
      location: '',
      virtual: false,
      startDate: '',
      endDate: '',
      website: '',
      applicationDeadline: '',
      description: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProgramData({
        ...programData,
        [name]: value,
      });
    };
  
    const handleSwitchChange = (e) => {
      setProgramData({
        ...programData,
        virtual: e.target.checked,
      });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(programData);
      
        try {
          const response = await fetch('/api/add-program', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(programData),
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log('Success:', data);
          } else {
            console.log('Server responded with status', response.status);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
  
    return (
      <Container>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Rows */}
            <Grid item xs={6}>
              <TextField required name="name" label="Program Name" variant="outlined" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField required name="organization" label="Organization" variant="outlined" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField required name="field" label="Field" variant="outlined" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Type</InputLabel>
                <Select name="type" label="Type" onChange={handleChange}>
                  <MenuItem value="Internship">Internship</MenuItem>
                  <MenuItem value="Research">Research</MenuItem>
                  <MenuItem value="Course">Course</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField name="cost" label="Cost" variant="outlined" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField name="location" label="Location" variant="outlined" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Switch checked={programData.virtual} onChange={handleSwitchChange} name="virtual" />}
              />
              <Typography variant="body2" sx={{color: (theme) => theme.palette.text.primary}}>Virtual</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField required name="startDate" label="Start Date" type="date" InputLabelProps={{ shrink: true }} fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField name="endDate" label="End Date" type="date" InputLabelProps={{ shrink: true }} fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField required name="website" label="Website" variant="outlined" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField name="applicationDeadline" label="Application Deadline" type="date" InputLabelProps={{ shrink: true }} fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField name="description" label="Description" variant="outlined" fullWidth multiline rows={4} onChange={handleChange} />
            </Grid>
            {/* Submit Button */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
  
  export default AddProgram;
  