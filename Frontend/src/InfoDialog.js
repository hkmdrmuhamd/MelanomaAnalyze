import React, { useState } from "react";
import { Modal } from "antd";
import "./styles/Button.css";
const InfoDialog = (props) => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleOpen3 = () => {
    setOpen3(true);
  };

  const handleOpen4 = () => {
    setOpen4(true);
  };

  const handleOpen5 = () => {
    setOpen5(true);
  };

  const handleOpen6 = () => {
    setOpen6(true);
  };

  const handleOpen7 = () => {
    setOpen7(true);
  };

  return (
    <>
      <div
        className="containerSpecial"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <button className="Btn" type="primary" onClick={handleOpen1}>
          Melanocytic Nevi
        </button>
        <Modal
          title={<div style={{ fontSize: "24px" }}>Melanocytic Nevi</div>}
          centered
          footer={null}
          width={1000}
          open={open1}
          onCancel={() => setOpen1(false)}
        >
          <p style={{ fontSize: "20px" }}>{props.info1}</p>
        </Modal>

        <button className="Btn" type="primary" onClick={handleOpen2}>
          Melanoma
        </button>
        <Modal
          title={<div style={{ fontSize: "24px" }}>Melanoma</div>}
          centered
          footer={null}
          width={1000}
          open={open2}
          onCancel={() => setOpen2(false)}
        >
          <p style={{ fontSize: "20px" }}>{props.info2}</p>
        </Modal>

        <button className="Btn" type="primary" onClick={handleOpen3}>
          Benign Keratosis-Like Lesions
        </button>
        <Modal
          title={
            <div style={{ fontSize: "24px" }}>
              Benign Keratosis-Like Lesions
            </div>
          }
          centered
          footer={null}
          width={1000}
          open={open3}
          onCancel={() => setOpen3(false)}
        >
          <p style={{ fontSize: "20px" }}>{props.info3}</p>
        </Modal>

        <button className="Btn" type="primary" onClick={handleOpen4}>
          Basal Cell Carcinoma
        </button>
        <Modal
          title={<div style={{ fontSize: "24px" }}>Basal Cell Carcinoma</div>}
          centered
          footer={null}
          width={1000}
          open={open4}
          onCancel={() => setOpen4(false)}
        >
          <p style={{ fontSize: "20px" }}>{props.info4}</p>
        </Modal>

        <button className="Btn" type="primary" onClick={handleOpen5}>
          Actinic Keratoses
        </button>
        <Modal
          title={<div style={{ fontSize: "24px" }}>Actinic Keratoses</div>}
          centered
          footer={null}
          width={1000}
          open={open5}
          onCancel={() => setOpen5(false)}
        >
          <p style={{ fontSize: "20px" }}>{props.info5}</p>
        </Modal>

        <button className="Btn" type="primary" onClick={handleOpen6}>
          Vascular Lesions
        </button>
        <Modal
          title={<div style={{ fontSize: "24px" }}>Vascular Lesions</div>}
          centered
          footer={null}
          width={1000}
          open={open6}
          onCancel={() => setOpen6(false)}
        >
          <p style={{ fontSize: "20px" }}>{props.info6}</p>
        </Modal>

        <button className="Btn" type="primary" onClick={handleOpen7}>
          Dermatofibroma
        </button>
        <Modal
          title={<div style={{ fontSize: "24px" }}>Dermatofibroma</div>}
          centered
          footer={null}
          width={1000}
          open={open7}
          onCancel={() => setOpen7(false)}
        >
          <p style={{ fontSize: "20px" }}>{props.info7}</p>
        </Modal>
      </div>
    </>
  );
};
export default InfoDialog;
