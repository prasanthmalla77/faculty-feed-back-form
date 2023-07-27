import React, { useEffect } from "react";
import { db } from "../firebase";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
const Data = () => {
  const [data, setData] = useState([]);

  const fetchPost = async () => {
    await getDocs(collection(db, "feedback-form-data")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(newData);
        console.log(data, newData);
      }
    );
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Registered Number</th>
          <th>Date of Birth</th>
          <th>Father Name</th>
          <th>Father Profession</th>
          <th>Father Mobile</th>
          <th>Father Email</th>
          <th>Address</th>
          <th>Feedback</th>
        </tr>
        {data.map((item) => (
          <tr>
            <td>{item.name}</td>
            <td>{item.registeredNumber}</td>
            <td>{item.dob}</td>
            <td>{item.fatherName}</td>
            <td>{item.fatherProfession}</td>
            <td>{item.fatherMobile}</td>
            <td>{item.fatherEmail}</td>
            <td>{item.address}</td>
            <td>{item.feedback}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Data;
