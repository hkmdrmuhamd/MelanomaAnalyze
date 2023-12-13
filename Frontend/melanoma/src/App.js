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
import axios from "axios";

const App = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const data = [
    { name: "Melanocytic nevi", value: 10 },
    { name: "Benign keratosis-like lesions", value: 85 },
    { name: "Basal cell carcinoma", value: 1 },
    { name: "Actinic keratoses", value: 2 },
    { name: "Vascular lesions", value: 1 },
    { name: "Dermatofibroma", value: 1 },
  ];

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsUploading(true);

    // Get the image URL from the selected file
    const imageUrl = URL.createObjectURL(selectedImage);

    try {
      // Send a POST request with the URL
      const response = await axios.post("/api/upload-image", { imageUrl });

      // Handle the response from your backend
      if (response.data.success) {
        setIsUploading(false);
        alert("Image uploaded successfully!");
      } else {
        setIsUploading(false);
        alert("Error uploading image: " + response.data.error);
      }
    } catch (error) {
      setIsUploading(false);
      console.error(error);
      alert("An unexpected error occurred");
    }
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
            <button onClick={onSubmit}>Buton</button>
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
          width={1200}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={50}
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
