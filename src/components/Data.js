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
          <th>academicYear</th>
          <th>year</th>
          <th>semester</th>
          <th>branch</th>
          <th>faculty</th>
          <th>totalStudents</th>
          <th>subject</th>
        </tr>
        {data.map((item) => (
          <tr>
          <td>{item.academicYear}</td>
            <td>{item.year}</td>
            <td>{item.semester}</td>
            <td>{item.branch}</td>
            <td>{item.faculty}</td>
            <td>{item.totalStudents}</td>
            <td>{item.subject}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Data;
