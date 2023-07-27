import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { saveAs } from "file-saver";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: "20px",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  field: {
    marginBottom: "5px",
  },
});

const FeedbackFormMain = () => {
  const [formData, setFormData] = useState({
    name: "",
    registeredNumber: "",
    dob: "",
    fatherName: "",
    fatherProfession: "",
    fatherMobile: "",
    fatherEmail: "",
    address: "",
  });
  const [showPdf, setShowPdf] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/feedback", formData)
      .then((response) => {
        console.log(response.data); // Handle success
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
          className={styles.field}
        />
        {/* Add more form fields as needed */}
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
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FeedbackFormMain;
