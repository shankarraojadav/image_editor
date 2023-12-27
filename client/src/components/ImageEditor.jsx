import { useState, useRef } from "react";
import Dropzone from "react-dropzone";
import Slider from "@mui/material/Slider";
import "./styles/imageeditor.css";
import { Button } from "@mui/material";
import { UploadFile, Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { ImageUploader } from "../redux/actions/imageActions";

const ImageEditor = () => {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null); 
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    loadImage(file);
  };

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const loadImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = () => {
        setImage(reader.result);
        setImageName(file.name); 
        resolve();
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    await loadImage(file);
  };

  const handleBrightnessChange = (event, newValue) => {
    setBrightness(newValue);
  };

  const handleContrastChange = (event, newValue) => {
    setContrast(newValue);
  };

  // const handleSave = () => {
  //   setImage(null);
  //   setImageName(null); 
  // };

  const handleDownload = () => {
    const formData = new FormData();
   
    formData.append("image", image);
    dispatch(ImageUploader(formData, imageName));
    const img = new Image();
    img.src = image;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const downloadLink = document.createElement("a");
      downloadLink.href = canvas.toDataURL("image/jpeg");
      downloadLink.download = "edited_image.jpg";
      downloadLink.click();
    };
  };

  return (
    <div className="main_container">
      <div className="container">
        <div className="img_editor">
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />

          <Dropzone
            onDrop={handleDrop}
            accept="image/*"
            className="img_uploader"
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} style={{ cursor: "pointer" }}>
                <input {...getInputProps()} />
                <div>
                  {image ? (
                    ""
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Add color="#EEF5FF" style={{ fontSize: "20vh" }} />

                      <h1 className="upload_text">Drag and drop or Upload Files</h1>
                      <Button
                        className="upload_btn"
                        variant="contained"
                      >
                        Upload File
                      </Button>
                    </div>
                  )}
                </div>
                {image && (
                  <div className="image_viewer">
                    <img
                      src={image}
                      alt="Uploaded"
                      style={{
                        width: "100%",
                        height: "100%",
                        
                        borderRadius: "4px",
                        filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                      }}
                    />
                    
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          {image && (
            <div className="img_controll">
              {imageName && <p>{imageName}</p>}
              {image && (
                <div className="img_controllers">
                  
                  <label>Brightness:</label>
                  <Slider
                    value={brightness}
                    onChange={handleBrightnessChange}
                    min={0}
                    max={200}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value - 100}%`}
                  />
                  <label>Contrast:</label>
                  <Slider
                    value={contrast}
                    onChange={handleContrastChange}
                    min={0}
                    max={200}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value - 100}%`}
                  />
                </div>
              )}
              <div style={{ marginTop: "70vh" }}>
                {image ? (
                  <Button
                    onClick={handleDownload}
                    variant="contained"
                    className="download_btn"
                  >
                    Save & Download
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ mt: "-10vh" }}>
        {image && (
          <Button
            variant="contained"
            onClick={handleUploadClick}
            sx={{
              p: "2vh",
              background:"#11235A",
            }}
          >
            <UploadFile />
            Upload Image
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImageEditor;
