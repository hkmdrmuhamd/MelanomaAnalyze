import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const App = () => {
  const [selectedImage, setSelectedImage] = useState();
  const data = [
    { name: "Facebook", value: 200000 },
    { name: "Twitter", value: 150000 },
    { name: "Instagram", value: 3452000 },
    { name: "Whatsapp", value: 4120000 },
  ];

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alert(URL.createObjectURL(selectedImage));
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  return (
    <>
      <div className="container">
        <h1> ReactJS Show Image Preview before Uploading </h1>
        <div className="row">
          <form onSubmit={onSubmit} className="form-inline">
            <div className="form-group">
              <label>Choose File to Upload: </label>
              <input
                type="file"
                className="form-control"
                onChange={imageChange}
                accept="image/*"
              />
            </div>{" "}
            <br />
            <button type="submit" className="btn btn-success">
              Upload File
            </button>
          </form>

          {selectedImage && (
            <div style={styles.preview}>
              <img
                src={URL.createObjectURL(selectedImage)}
                style={styles.image}
                alt="Thumb"
              />
              <button onClick={removeSelectedImage} style={styles.delete}>
                Remove This Image
              </button>
            </div>
          )}
        </div>

        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </>
  );
};

export default App;

// Just some styles
const styles = {
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
};
