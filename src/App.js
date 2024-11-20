import React, { useEffect, useRef, useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { FaGlobe, FaLocationDot } from "react-icons/fa6";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./App.css";

const baseStyle = {
  fontSize: "16px",
  color: "#000000",
  fontWeight: "normal",
  textDecoration: "none",
  letterSpacing: "normal",
  backgroundColor: null,
  padding: "5px",
  borderRadius: "0px",
};

const fontFamilies = [
  "Arial",
  "Courier New",
  "Georgia",
  "Times New Roman",
  "Verdana",
];

const App = () => {
  const cardRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [dragElement, setDragElement] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null); // Track selected element
  const [cardDetails, setCardDetails] = useState({
    firstName: "Sathish",
    lastName: "Kumar",
    userEmailID: "satz@gmail.com",
    mobileNumber: "9876543210",
    jobTitle: "Full Stack Developer",
    companyName: "Winngoo Consultancy Services",
    website: "http://mywebsite.com",
    addressLineOne: "Adyar",
    addressLineTwo: "Chennai",
  });

  const [styles, setStyles] = useState({
    name: { ...baseStyle },
    email: { ...baseStyle },
    phone: { ...baseStyle },
    role: { ...baseStyle },
    company: { ...baseStyle },
    address: { ...baseStyle },
    website: { ...baseStyle },
  });

  const onMouseDown = (e, field) => {
    setDragging(true);
    setDragElement(field);
    setSelectedElement(field); // Set selected element for style editing
  };

  const onMouseMove = (e) => {
    if (dragging && dragElement) {
      const element = document.querySelector(`.${dragElement}`);
      if (element) {
        element.style.position = "absolute";
        element.style.left = `${e.clientX}px`;
        element.style.top = `${e.clientY}px`;
      }
    }
  };

  const onMouseUp = () => {
    setDragging(false);
    setDragElement(null);
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, dragElement]);

  const handleStyleChange = (key, value) => {
    if (selectedElement) {
      setStyles((prevStyles) => ({
        ...prevStyles,
        [selectedElement]: {
          ...prevStyles[selectedElement],
          [key]: value,
        },
      }));
    }
  };

  return (
    <div className="app-container">
      <div className="d-card-edit" ref={cardRef}>
        <div
          className="name draggable-item"
          onMouseDown={(e) => onMouseDown(e, "name")}
          style={styles.name}
        >
          <h3>
            {cardDetails.firstName} {cardDetails.lastName}
          </h3>
        </div>
        <div
          className="email draggable-item"
          onMouseDown={(e) => onMouseDown(e, "email")}
          style={styles.email}
        >
          <p>{cardDetails.userEmailID}</p>
        </div>
        <div
          className="company draggable-item"
          onMouseDown={(e) => onMouseDown(e, "company")}
          style={styles.company}
        >
          <p>{cardDetails.companyName}</p>
        </div>
        <div
          className="phone draggable-item"
          onMouseDown={(e) => onMouseDown(e, "phone")}
          style={styles.phone}
        >
          <p>{cardDetails.mobileNumber}</p>
        </div>
        <div
          className="role draggable-item"
          onMouseDown={(e) => onMouseDown(e, "role")}
          style={styles.role}
        >
          <p>{cardDetails.jobTitle}</p>
        </div>
        <div
          className="address draggable-item"
          onMouseDown={(e) => onMouseDown(e, "address")}
          style={styles.address}
        >
          <p>
            {cardDetails.addressLineOne}, {cardDetails.addressLineTwo}
          </p>
        </div>
        <div
          className="website draggable-item"
          onMouseDown={(e) => onMouseDown(e, "website")}
          style={styles.website}
        >
          <p>{cardDetails.website}</p>
        </div>
      </div>

      {/* Style Editor */}
      <div className="style-editor">
        <h3>Style Editor</h3>
        {selectedElement && (
          <div>
            <label>
              Font Size:
              <input
                type="number"
                value={styles[selectedElement]?.fontSize.replace("px", "")}
                onChange={(e) => handleStyleChange("fontSize", `${e.target.value}px`)}
              />
            </label>
            <label>
              Font Color:
              <input
                type="color"
                value={styles[selectedElement]?.color}
                onChange={(e) => handleStyleChange("color", e.target.value)}
              />
            </label>
            <label>
              Font Weight:
              <select
                value={styles[selectedElement]?.fontWeight}
                onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
              </select>
            </label>
            <label>
              Letter Spacing:
              <input
                type="number"
                value={styles[selectedElement]?.letterSpacing.replace("px", "")}
                onChange={(e) =>
                  handleStyleChange("letterSpacing", `${e.target.value}px`)
                }
              />
            </label>
            <label>
              Background Color:
              <input
                type="color"
                value={styles[selectedElement]?.backgroundColor || "#ffffff"}
                onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
              />
            </label>
          </div>
        )}
        {!selectedElement && <p>Select an element to edit its styles.</p>}
      </div>
    </div>
  );
};

export default App;