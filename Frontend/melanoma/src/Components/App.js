import React, { useState } from "react";
import axios from "axios";

const App = () => {
  /*const [files, setFiles] = useState();
  const [previews, setPreviews] = useState();

  useEffect(() => {
    if (!files) return;

    let tmp = [];
    for (let i = 0; i < files.length; i++) {
      tmp.push(URL.createObjectURL(files[i]));
    }
    const objectUrls = tmp;
    setPreviews(objectUrls);

    for (let i = 0; i < objectUrls.length; i++) {
      return () => {
        URL.revokeObjectURL(objectUrls[i]);
      };
    }
  }, [files]); */

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("Lütfen bir dosya seçin.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Dosya başarıyla yüklendi:", response.data);
    } catch (error) {
      console.error("Dosya yüklenirken bir hata oluştu:", error);
    }
  };

  return (
    /*   <main className="...">
      <br />
      <h3>Form with image preview</h3>
      <input
        type="file"
        accept="image/jpg,image/jpeg,image/png"
        multiple
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            FileSystemWritableFileStream(e.target.files);
          }
        }}
      />
      {previews &&
        previews.map((pic) => {
          return <img src={pic} />;
        })}
    </main>
  );
 */
    <div className="container col-12 mt-4">
      <div className="row">
        <div className="mb-3 col-9">
          <label htmlFor="formFile" className="form-label">
            Lütfen fotoğrafınızı giriniz
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept=".jpg"
            onChange={handleFileChange}
          />
        </div>
        <div className="col-3">
          <button className="btn btn-primary" onClick={handleUpload}>
            Dosyayı Yükle
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
