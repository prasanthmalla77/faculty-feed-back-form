import React, { useState } from "react";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import top from "../images/top.png";
// import EvaluationForm from "./EvaluationForm";
import html2pdf from "html2pdf.js";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
// import { Link } from "react-router-dom";
import Pdf from "./Pdf";
import  './EvaluationForm.css'

const FeedbackForm = () => {
  const [open, setOpen] = useState(false);
  
  const [evaluations, setEvaluations] = useState([
    { id: 1, characteristic: 'Knowledge of the Subject', rating: '', marks: '' },
    { id: 2, characteristic: 'Coming well prepared for the Class', rating: '', marks: '' },
    { id: 3, characteristic: 'Giving Clear Explanations', rating: '', marks: '' },
    { id: 4, characteristic: 'Command of Language', rating: '', marks: '' },
    { id: 5, characteristic: 'Clear and Audible Voice', rating: '', marks: '' },
    { id: 6, characteristic: 'Holding the attention of students through the Class', rating: '', marks: '' },
    { id: 7, characteristic: 'Providing more matter than in the Text Book', rating: '', marks: '' },
    { id: 8, characteristic: 'Capability to clear the doubts of Students', rating: '', marks: '' },
    { id: 9, characteristic: 'Encouraging students to ask questions and participate in  Discussions', rating: '', marks: '' },
    { id: 10, characteristic: 'Appreciating students as and when deserving', rating: '', marks: '' },
    { id: 11, characteristic: 'Willingness to help students even out of Class', rating: '', marks: '' },
    { id: 12, characteristic: 'Return of valued Test Papers / Records in Time', rating: '', marks: '' },
    { id: 13, characteristic: 'Punctuality and following Time Table Schedule', rating: '', marks: '' },
    { id: 14, characteristic: 'Coverage of Syllabus', rating: '', marks: '' },
    { id: 15, characteristic: 'Impartial (Treating all students alike)', rating: '', marks: '' },
  ]);
  const totalMarks = evaluations.reduce((sum, evaluation) => sum + (evaluation.marks ? parseInt(evaluation.marks) : 0), 0);
  const percentage = (totalMarks / 75) * 100;
  console.log(percentage);
  const [formData, setFormData] = useState({
    academicYear: "",
    year: "",
    semester: "",
    branch: "",
    faculty: "",
    totalStudents: "",
    subject: "",
  },);
  console.log(formData)
  const combinedData = {
    ...formData,
    ...evaluations,
  };
  console.log(combinedData);
  const handleRatingChange = (id, newRating) => {
    const updatedEvaluations = evaluations.map(evaluation => {
      if (evaluation.id === id) {
        return { ...evaluation, rating: newRating };
      }
      return evaluation;
    });

    setEvaluations(updatedEvaluations);
  };

  const handleMarksChange = (id, newMarks) => {
    if (!isNaN(newMarks) && newMarks >= 0 && newMarks <= 5) {
      const updatedEvaluations = evaluations.map(evaluation => {
        if (evaluation.id === id) {
          return { ...evaluation, marks: newMarks };
        }
        return evaluation;
      });

      setEvaluations(updatedEvaluations);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(
        collection(db, "formdata"),
        combinedData
      );
      console.log("Document written with ID: ", docRef.id);
      setOpen(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // const handlePrint = () => {
  //   window.print();
  // };

  const handleSaveAsPDF = () => {
    const element = document.getElementById("pageToSave");
    html2pdf()
      .set({ html2canvas: { scale: 2 } })
      .from(element)
      .save();
  };

  return (
    <div style={
      {margin: '20px',
    padding: '20px',
    border: '1px solid #ccc',}
    }>
    
    <Box>
      <form
        style={{ textAlign: "center", width: "70%", margin: "auto" }}
        id="pageToSave"
        onSubmit={handleSubmit}
      >
        <img width={"100%"} src={top} alt="Top section of the webpage" />
        <TextField
          name="academicYear"
          label="Academic Year"
          value={formData.academicYear}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="year"
          label="Year"
          value={formData.year}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="semester"
          label="Semester"
          value={formData.semester}
          onChange={handleChange}
          required
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <br />
        <TextField
          name="branch"
          label="Branch"
          value={formData.branch}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="faculty"
          label="Faculty"
          value={formData.faculty}
          onChange={handleChange}
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="totalStudents"
          label="Total Students Appeared"
          value={formData.totalStudents}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="subject"
          label="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          fullWidth
        />
       
        <br />
        <br />
        <div className="evaluation-form">
        <table >
          <thead>
            <tr>
              <th>Sl. No.</th>
              <th>Characteristics</th>
              <th>Very Good</th>
              <th>Good</th>
              <th>Average</th>
              <th>Below Average</th>
              <th>Poor</th>
              <th>Marks (0-5)</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map(evaluation => (
              <tr key={evaluation.id}>
                <td>{evaluation.id}</td>
                <td>{evaluation.characteristic}</td>
                <td>
                  <input
                    type="radio"
                    name={`rating-${evaluation.id}`}
                    value={evaluation.rating}
                    checked={evaluation.rating === 'Very Good'}
                    onChange={() => handleRatingChange(evaluation.id, 'Very Good')}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    name={`rating-${evaluation.id}`}
                    value="Good"
                    checked={evaluation.rating === 'Good'}
                    onChange={() => handleRatingChange(evaluation.id, 'Good')}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    name={`rating-${evaluation.id}`}
                    value="Average"
                    checked={evaluation.rating === 'Average'}
                    onChange={() => handleRatingChange(evaluation.id, 'Average')}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    name={`rating-${evaluation.id}`}
                    value="Below Average"
                    checked={evaluation.rating === 'Below Average'}
                    onChange={() => handleRatingChange(evaluation.id, 'Below Average')}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    name={`rating-${evaluation.id}`}
                    value="Poor"
                    checked={evaluation.rating === 'Poor'}
                    onChange={() => handleRatingChange(evaluation.id, 'Poor')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={evaluation.marks}
                    onChange={e => handleMarksChange(evaluation.id, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        <br />
        <br />
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Form successfully Submitted!
            </Alert>
          </Snackbar>
          <br />
          <br />
          {/* <Button variant="contained" onClick={handlePrint}>
            Print
          </Button> */}
          <br />
          <br />
          <Button variant="contained" onClick={handleSaveAsPDF}>
            Save as PDF
          </Button>
          <br />
          <br />
          {/* <Button variant="contained" LinkComponent={Link} to="/data">
            Data
          </Button> */}
          <br/>
          <br/>
          
          <Pdf combinedData={evaluations} formData={formData} />
        </Box>
      </form>
      
    </Box>
    </div>
  );
};

export default FeedbackForm;
