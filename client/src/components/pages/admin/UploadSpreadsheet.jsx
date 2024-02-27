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

      const parseDate = (dateStr, compareTo) => {
        const seasonalValues = [
          "Year-round",
          "Spring",
          "Summer",
          "Fall",
          "Winter",
        ];
        if (!dateStr) {
          return compareTo && seasonalValues.includes(compareTo)
            ? compareTo
            : null;
        } else if (seasonalValues.includes(dateStr)) {
          return dateStr;
        } else {
          const [month, day, year] = dateStr.split("/");
          return new Date(year, month - 1, day);
        }
      };
      const ageToGrade = (age) => {
        let grades = [];
        if ([13, 14, 15].includes(age)) grades.push(9);
        if ([14, 15, 16].includes(age)) grades.push(10);
        if ([15, 16, 17].includes(age)) grades.push(11);
        if ([16, 17, 18].includes(age)) grades.push(12);
        return grades;
      };
      
      const parseEligibility = (eligibilityStr, eligType) => {
        if (!eligibilityStr) return null;
      
        try {
          const parsedValues = JSON.parse(eligibilityStr).map(Number);
          if (eligType === "Age") {
            // Convert age to grades if eligType is 'age'
            const gradeRanges = parsedValues
              .map(ageToGrade)
              .flat() // Flatten the array of arrays
              .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
            return {
              eligType: "Grade", // Convert the type to 'grade' after conversion
              range: gradeRanges,
            };
          } else {
            // If eligType is 'grade', return as is
            return {
              eligType: eligType,
              range: parsedValues,
            };
          }
        } catch (error) {
          console.error("Error parsing eligibility", error);
          return null;
        }
      };

      const parseCost = (costStr, type) => {
        if (costStr === "FREE" || costStr === "Free" || costStr === "free") {
          return { amount: 0, costType: "Free" };
        } else {
          const costValue = isNaN(parseInt(costStr, 10))
            ? costStr
            : parseInt(costStr, 10);
          return {
            amount: costValue,
            costType: type === "stipend" || type === "Stipend" ? "Stipend" : "Cost",
          };
        }
      };

      const parsedPrograms = data.map((row) => ({
        name: row["Name"],
        organization: row["Organization"],
        description: row["Description"],
        field: JSON.parse(row["Field"]),
        eligibility: parseEligibility(row["Eligibility"], row["EligType"]),
        paymentType: row["PaymentType"],
        cost: parseCost(row["Cost"], row["PaymentType"]),
        location: row["Location"],
        virtual: row["Virtual"] === "yes",
        website: row["Website"],
        startDate: parseDate(row["StartDate"]),
        endDate: parseDate(row["EndDate"], row["StartDate"]),
      }));

      setPrograms(parsedPrograms);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = () => {
    console.log(programs)
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
              <li>
                {program.cost.type}: ${program.cost.amount}
              </li>
              <li>Payment Type: {program.paymentType}</li>
              <li>Location: {program.location}</li>
              <li>Virtual: {String(program.virtual)}</li>
              <li>Website: {program.website}</li>
              <li>
                Start Date:{" "}
                {typeof program.startDate === "string"
                  ? program.startDate
                  : program.startDate.toDateString()}
              </li>
              <li>
                End Date:{" "}
                {program.endDate
                  ? typeof program.endDate === "string"
                    ? program.endDate
                    : program.endDate.toDateString()
                  : "Not specified"}
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadSpreadsheet;
