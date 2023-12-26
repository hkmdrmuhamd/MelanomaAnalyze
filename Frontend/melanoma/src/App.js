/* import React, { useState } from "react";
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
import "./styles/App.css";
import { Button, Popconfirm } from "antd";

const App = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [chartData, setChartData] = useState(null);

  const confirm = (e) => {
    console.log(e);
    removeSelectedImage();
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

const fetchChartData = () => {
  // Burada başka bir API'den isteği gerçekleştirin ve gelen veriyi döndürün
  return axios
    .get(process.env.REACT_APP_OTHER_API_URL + "/api/responseSend")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching chart data:", error);
      return [];
    });
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      await axios
        .post(process.env.REACT_APP_BACKEND_URL + "/api/upload", formData)
        .then((response) => {
          setMessage(response.data.message);
          const newChartData = await fetchChartData();
          setChartData(newChartData);
        })
        .catch((error) => {
          setMessage(error.message);
        });
    } else {
      setMessage("Lütfen bir resim dosyası seçin");
    }
  };

  const removeSelectedImage = () => {
    setFile();
  };

  return (
    <>
      <div className="container">
        <section>
          <h1> Fotoğrafınızı seçiniz </h1>

          <form onSubmit={handleSubmit} className="form-inline">
            <div className="form-group">
              <label>Yüklenecek Fotoğrafı Seçiniz: </label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <br />
            <button className="btnSend" onClick={handleSubmit}>
              Gönder
            </button>
          </form>
        </section>

        <section>
          <div>
            {file && (
              <div style={styles.preview}>
                <Popconfirm
                  title="Fotoğrafı Sil"
                  description="Fotoğrafı silmek istediğinize emin misiniz?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Evet"
                  cancelText="Hayır"
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
                <img
                  src={URL.createObjectURL(file)}
                  style={styles.image}
                  alt="Thumb"
                />
              </div>
            )}
          </div>
        </section>

        {file ? (
          <>
            <section>
              <div style={{ width: "400px" }}>
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
                  <Bar
                    dataKey="value"
                    fill="#8884d8"
                    background={{ fill: "#eee" }}
                  />
                </BarChart>
              </div>
            </section>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default App;

const styles = {
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    width: "500px",
    marginBottom: "50px",
    justifyContent: "center",
    alignItems: "end",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
    width: "100%",
  },
};
 */

import React, { useState, useEffect } from "react";
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
import "./styles/App.css";
import { Button, Popconfirm, message } from "antd";

const App = () => {
  const [file, setFile] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Component mount edildiğinde veya chartData değiştiğinde çalışacak olan kod
    if (chartData) {
      // ChartData'nın güncellendiği an buraya gelebilirsiniz
      console.log("ChartData updated:", chartData);
    }
  }, [chartData]);

  const confirm = (e) => {
    console.log(e);
    removeSelectedImage();
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const fetchChartData = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/api/data"
      );

      return response.data;
    } catch (error) {
      console.error("Grafik verisi alınırken hata oluştu:", error);
      // Kullanıcıya uygun bir hata mesajı gösterin veya tekrar deneme seçeneği sunun
      return null; // veya uygun bir hata nesnesi döndürün
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const uploadResponse = await axios.post(
          process.env.REACT_APP_BACKEND_URL + "/api/upload",
          formData
        );
        setMessageText(uploadResponse.data.message);

        const newChartData = await fetchChartData();
        setChartData(newChartData);
      } catch (error) {
        setMessageText(error.message);
      }
    } else {
      setMessageText("Lütfen bir resim dosyası seçin");
    }
  };

  const removeSelectedImage = () => {
    setFile(null);
  };

  const barChartData = Object.keys(chartData).map((key) => ({
    name: key,
    value: parseFloat(chartData[key]),
  }));

  return (
    <>
      <div className="container">
        <section>
          <h1> Fotoğrafınızı seçiniz </h1>
          <form onSubmit={handleSubmit} className="form-inline">
            <div className="form-group">
              <label>Yüklenecek Fotoğrafı Seçiniz: </label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <br />
            <button type="submit" className="btnSend">
              Gönder
            </button>
          </form>
        </section>

        <section>
          <div>
            {file && (
              <div style={styles.preview}>
                <Popconfirm
                  title="Fotoğrafı Sil"
                  description="Fotoğrafı silmek istediğinize emin misiniz?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Evet"
                  cancelText="Hayır"
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
                <img
                  src={URL.createObjectURL(file)}
                  style={styles.image}
                  alt="Thumb"
                />
              </div>
            )}
          </div>
        </section>

        {file && chartData ? (
          <section>
            <div style={{ width: "400px" }}>
              <BarChart
                width={1200}
                height={300}
                data={barChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={30}
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
                <Bar
                  dataKey="value"
                  fill="#8884d8"
                  background={{ fill: "#eee" }}
                />
              </BarChart>
            </div>
          </section>
        ) : null}

        <section>
          <div>{messageText}</div>
        </section>
      </div>
    </>
  );
};

export default App;

const styles = {
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    width: "300px",
    marginBottom: "50px",
    justifyContent: "center",
    alignItems: "end",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
    width: "100%",
  },
};
