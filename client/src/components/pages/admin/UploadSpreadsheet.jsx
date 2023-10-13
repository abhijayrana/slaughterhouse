import React, { useState } from "react";
import * as XLSX from "xlsx";

const UploadSpreadsheet = () => {
  const [programs, setPrograms] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      const parsedPrograms = data.map((row) => ({
        name: row["Name"],
        organization: row["Organization"],
        description: row["Description"],
        field: JSON.parse(row["Field"]),
        eligibility: JSON.parse(row["Eligibility"]).map(Number),
        type: row["Type"],
        cost: parseInt(row["Cost"], 10),
        salary: parseInt(row["Salary"], 10),
        location: row["Location"],
        virtual: row["Virtual"] === "yes",
        website: row["Website"],
        startDate: new Date((row["StartDate"] - 25569) * 86400 * 1000),
        endDate: new Date((row["EndDate"] - 25569) * 86400 * 1000),
      }));
      setPrograms(parsedPrograms);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = () => {
    fetch("/api/upload-programs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ programs }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>
      <ul>
        {programs.map((program, index) => (
          <li key={index}>
            <strong>{program.name}</strong>
            <ul>
              <li>Organization: {program.organization}</li>
              <li>Description: {program.description}</li>
              <li>Field: {JSON.stringify(program.field)}</li>
              <li>Eligibility: {JSON.stringify(program.eligibility)}</li>
              <li>Type: {program.type}</li>
              <li>Cost: {program.cost}</li>
              <li>Salary: {program.salary}</li>
              <li>Location: {program.location}</li>
              <li>Virtual: {String(program.virtual)}</li>
              <li>Website: {program.website}</li>
              <li>Start Date: {program.startDate.toString()}</li>
              <li>End Date: {program.endDate.toString()}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadSpreadsheet;
