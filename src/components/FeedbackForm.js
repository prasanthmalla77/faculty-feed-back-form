import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
// import axios from "axios";
import top from "../images/top.png";
import html2pdf from "html2pdf.js";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    registeredNumber: "",
    dob: "",
    fatherName: "",
    fatherProfession: "",
    fatherMobile: "",
    fatherEmail: "",
    address: "",
    feedback: "",
  });

  // const formRef = useRef(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(
        collection(db, "feedback-form-data"),
        formData
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // Send form data to the backend
    // axios
    //   .post("http://localhost:4000/api/feedback", formData)
    //   .then((response) => {
    //     console.log(response.data);
    //     if (response.data.message === true) {
    //       alert("Thank you for your feedback!");

    //       window.location.reload();
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveAsPDF = () => {
    const element = document.getElementById("pageToSave");
    html2pdf()
      .set({ html2canvas: { scale: 2 } })
      .from(element)
      .save();
  };

  return (
    <Box>
      <form
        style={{ textAlign: "center", width: "70%", margin: "auto" }}
        id="pageToSave"
        onSubmit={handleSubmit}
      >
        <img width={"100%"} src={top} alt="top-image" />
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="registeredNumber"
          label="Registered Number"
          value={formData.registeredNumber}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="dob"
          label="Date of Birth"
          type="date"
          value={formData.dob}
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
          name="fatherName"
          label="Father's Name"
          value={formData.fatherName}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="fatherProfession"
          label="Father's Profession"
          value={formData.fatherProfession}
          onChange={handleChange}
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="fatherMobile"
          label="Father's Mobile Number"
          value={formData.fatherMobile}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="fatherEmail"
          label="Father's Email"
          type="email"
          value={formData.fatherEmail}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="address"
          label="Permanent Address"
          multiline
          rows={4}
          value={formData.address}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
        <TextField
          name="feedback"
          label="Feedback"
          multiline
          rows={4}
          value={formData.feedback}
          onChange={handleChange}
          required
          fullWidth
        />
        <br />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <br />
        <br />
        <Button variant="contained" onClick={handlePrint}>
          Print
        </Button>
        <br />
        <br />
        <Button variant="contained" onClick={handleSaveAsPDF}>
          Save as PDF
        </Button>
      </form>
    </Box>
  );
};

export default FeedbackForm;
