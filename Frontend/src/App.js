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
import "./styles/Line.css";
import { Button, Popconfirm, message } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Demo from "./Demo";
import "./styles/deneme.css";

var lezyonlar = [
  {
    tür: "Melanocytic Nevi",
    özellikler:
      "Deride melanosit hücrelerinin birikimi sonucu oluşan deri lekeleridir, genellikle kahverengi renkte ve genellikle zararsızdır. ",
    bilgi:
      " Asimetri, düzensiz sınırlar, düzensiz renk, geniş çap veya evrim göstermeyen düzgün bir leke.",
  },
  {
    tür: "Melanoma",
    özellikler:
      "Cilt kanserinin agresif bir türüdür; melanositlerin kontrolsüz büyümesi ve yayılmasıyla karakterizedir. ",
    bilgi:
      " ABCDE kriterlerine göre değerlendirilir - Asimetri, Sınırlar, Renk, Çap, Evrim. Erken teşhis ve tedavi önemlidir.",
  },
  {
    tür: "Benign Keratosis",
    özellikler:
      "Cildin üst katmanında (epidermis) meydana gelen, genellikle keratinle ilişkili benign (zararsız) lezyonlardır. ",
    bilgi:
      " Genellikle renkli olmayan, kabuklu veya pullu yüzeylere sahip lezyonlar.",
  },
  {
    tür: "Basal Cell Carcinoma",
    özellikler:
      "Cilt kanserinin başka bir türüdür, genellikle güneşe maruz kalan bölgelerde ortaya çıkar ve genellikle yavaş büyür. ",
    bilgi:
      " Genellikle açık renkli, parlak kenarlı, yara benzeri bir lezyon olabilir.",
  },
  {
    tür: "Actinic Keratoses",
    özellikler:
      "Güneşin neden olduğu hasar sonucu ortaya çıkan precancerous (önceden kanseröz) lezyonlardır. ",
    bilgi:
      " Kabuklu, kırmızı lezyonlar; çoğunlukla güneşe maruz kalan alanlarda bulunur.",
  },
  {
    tür: "Vascular Lesions",
    özellikler:
      "Ciltteki damarlarla ilişkili lezyonlardır, örneğin, hemangioma veya telanjiektazi gibi. ",
    bilgi:
      " Renkli veya renksiz olabilir, genellikle damarların genişlemesiyle ilişkilidir.",
  },
  {
    tür: "Dermatofibroma",
    özellikler:
      "Deride sıklıkla görülen, genellikle zararsız olan bir tür fibrohistiyositik tümördür. ",
    bilgi:
      " Genellikle sert, kahverengi renkte ve genellikle hafif kabarık bir yüzeye sahip olabilir.",
  },
];
const App = () => {
  const [file, setFile] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [chartData, setChartData] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (chartData) {
      console.log("ChartData updated:", chartData);
    }
  }, [chartData]);

  const handleButtonClick = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
    }, 6000);
  };

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
      setLoading(false);

      return response.data;
    } catch (error) {
      console.error("Grafik verisi alınırken hata oluştu:", error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      setLoading(true);

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
      setMessageText(
        <div style={{ color: "white", fontSize: "20px" }}>
          Lütfen bir resim dosyası seçin
        </div>
      );
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
    <div
      style={{ backgroundColor: "#1c2a3e", height: "1000px", marginTop: "0px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {lezyonlar.map((item) => {
          return <Demo info={item} />;
        })}
      </div>

      <div className="line-container">
        <hr className="horizontal-line" />
      </div>
      <div className="container">
        <section>
          <h1 style={{ color: "white" }}> Fotoğrafınızı seçiniz </h1>
          <form onSubmit={handleSubmit} className="form-inline">
            <div className="form-group">
              <label style={{ color: "white" }}>
                Yüklenecek Fotoğrafı Seçiniz:{" "}
              </label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <br />
            <button
              style={{
                margin: "0px",
                padding: "0px",
                border: "none",
                font: "inherit",
                color: "inherit",
                cursor: "pointer",
                background: "none",
                outline: "none",
                fontSize: "20px",
                width: "300px",
                height: "100px",
              }}
            >
              <div
                className={`button ${uploading ? "progress" : ""}`}
                style={{ height: "100px", backgroundColor: "purple" }}
                onClick={handleButtonClick}
              >
                <div className="text-icon">
                  <span className="text">
                    {uploading ? "Uploading..." : "Upload File"}
                  </span>
                </div>
              </div>
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
                  alt="Fotoğraf"
                />
              </div>
            )}
          </div>
        </section>

        <form onSubmit={fetchChartData}>
          {loading ? (
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />}
            />
          ) : file && chartData ? (
            <section>
              <div style={{ width: "400px" }}>
                <BarChart
                  width={1250}
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
        </form>

        <section>
          <div>{messageText}</div>
        </section>
      </div>
    </div>
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
