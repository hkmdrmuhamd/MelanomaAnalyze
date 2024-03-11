import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import "./styles/navBar.css";

function Demo({ info }) {
  const [open1, setOpen1] = useState(false);

  /*   useEffect(() => {
    if (open1) {
      document.body.style.backgroundImage =
        "url('https://www.acibadem.com.tr/hayat/Images/YayinMakaleler/kirmizi-benlere-dikkat_6031_1.jpg')";
      document.body.style.position = "relative"; // Diğer içerikle uyumlu olması için
      document.body.style.zIndex = "1"; // Resmi ön plana alır
    } else {
      document.body.style.backgroundImage = "none"; // open1 false olduğunda resmi kaldır
      document.body.style.zIndex = "0"; // Diğer içeriği ön plana alır
    }

    // clean up
    return () => {
      document.body.style.backgroundImage = "none";
      document.body.style.zIndex = "0";
    };
  }, [open1]); */

  const handleOpen1 = () => {
    setOpen1(true);
  };

  return (
    <div>
      <div className="menu_block">
        <a className="menu_link">
          <button
            className="name"
            onClick={handleOpen1}
            style={{
              backgroundColor: "#272d3b",
              margin: "0px",
              padding: "0px",
              border: "none",
              font: "inherit",
              color: "inherit",
              cursor: "pointer",
              background: "none",
              outline: "none",
              fontSize: "20px",
            }}
          >
            {info?.tür}
          </button>
        </a>
      </div>

      <Modal
        title={<div style={{ fontSize: "24px" }}>{info?.tür}</div>}
        centered
        footer={null}
        width={1000}
        open={open1}
        onCancel={() => setOpen1(false)}
      >
        <p style={{ fontSize: "20px" }}>
          {info?.özellikler}
          Özellikler:
          {info?.bilgi}
        </p>
      </Modal>
    </div>
  );
}

export default Demo;
