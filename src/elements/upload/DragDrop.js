import React, { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useSpring, animated, easings } from "react-spring";
import { url } from "../../custom/data";
import axios from "axios";
import "./drag.css";
import ShowImage from "./ShowImage";

export default function DragDropFile() {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageTable, setImageTable] = useState([]);
  const [anim, setAnim] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef(null);

  //for animation
  const props = useSpring({
    scale: anim ? 1 : 0,
    opacity: anim ? 1 : 0,
    transform: anim ? "translateY(0%)" : "translateY(-40%)",
    config: { duration: 800, easing: easings.easeInOutQuint },
  });

  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      setSelectedFiles((p) => [...p, files[i]]);
      setImages((p) => [
        ...p,
        <ShowImage
          image={URL.createObjectURL(files[i])}
          name={files[i].name}
        />,
      ]);
    }
  }
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  //shows images as rows of 3
  const ImageRow = ({ row }) => {
    return (
      <>
        {images.map((image, index) =>
          index >= row * 3 - 3 && index < row * 3 ? (
            <div key={index}>{image}</div>
          ) : null
        )}
      </>
    );
  };

  useEffect(() => {
    const formData = new FormData();
    if (selectedFiles.length !== 0) {
      axios
        .post(`${url}/deleteImages`, {
          body: "delete images",
        })
        .then((data) => {
          selectedFiles.forEach((file) => {
            formData.append("File", file);
            axios.post(`${url}/sendImages`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              onUploadProgress: (data) => {
                //Set the progress value to show the progress bar
                setProgress(Math.round((100 * data.loaded) / data.total));
              },
            });
          });
        });
    }
  }, [selectedFiles]);

  //to determine the row size
  useEffect(() => {
    const rowSize = Math.ceil(images.length / 3);
    for (let i = 0; i < rowSize; i++) {
      if (i === 0) {
        setImageTable([<ImageRow row={i + 1} />]);
        continue;
      }
      setImageTable((p) => [...p, <ImageRow row={i + 1} />]);
    }
  }, [images]);

  useEffect(() => {
    setAnim(true);
    axios
      .post(`${url}/checkImages`, {
        body: "checking for images",
      })
      .then(({ data }) => {
        data.msg.forEach((image) => {
          setImages((p) => [
            ...p,
            <ShowImage image={`/images/${image}`} name={image} />,
          ]);
        });
      });
  }, []);

  return (
    <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <animated.div
        style={{
          opacity: props.opacity,
          transform: props.transform,
          zIndex: 1,
          position: "sticky",
          top: "0%",
        }}
      >
        <div
          style={{
            backgroundColor: "#333333",
            width: "100vw",
            height: "15vh",
          }}
        >
          <input
            ref={inputRef}
            type="file"
            id="input-file-upload"
            multiple={true}
            onChange={handleChange}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0% 5%",
              color: "ghostwhite",
              fontFamily: "helvetica",
            }}
          >
            <div>
              <h1>
                DROP FILES{" "}
                {progress === 0 || progress === 100 ? null : `${progress}%`}
              </h1>
              <p>Drag and drop your files to upload</p>
            </div>
            <div>
              <Button
                className="upload-button"
                variant="contained"
                onClick={onButtonClick}
              >
                Upload file
              </Button>
            </div>
          </div>
        </div>
      </animated.div>
      <animated.div
        style={{
          opacity: props.opacity,
          background: "black",
          minHeight: "85vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "scroll",
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {images.length !== 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10%",
            }}
          >
            {imageTable.map((image, index) => (
              <div
                key={index}
                style={{
                  width: "100vw",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                {image}
              </div>
            ))}
          </div>
        ) : (
          <Add sx={{ fontSize: "8rem", color: "#333333" }} />
        )}
      </animated.div>
    </form>
  );
}
