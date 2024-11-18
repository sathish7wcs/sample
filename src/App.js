import './App.css';
import React, { useEffect, useRef, useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { FaGlobe, FaLocationDot } from "react-icons/fa6";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

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
  "Tahoma",
  "Trebuchet MS",
  "Palatino Linotype",
  "Lucida Console",
  "Comic Sans MS",
  "Impact, Charcoal",
  "Gadget",
  "Garamond",
  "Baskerville",
  "Arial Narrow",
  "Droid Sans",
  "Open Sans",
  "Roboto",
];

const App = () => {
  const cardRef = useRef(null);


  const [cardDetails, setCardDetails] = useState({
    firstName: "Sathish",
    lastName: "Kumar",
    userEmailID:"satz@gmail.com",
    mobileNumber: "9876543210",
    jobTitle: "Full Stack Developer",
    companyName: "Winngoo Consultancy Services",
    website: "http://mywebsite.com",
    addressLineOne: "Adyar",
    addressLineTwo: "Chennai",
    user_logo: "https://ik.imagekit.io/sathishkumar/digitalCardImages/resetPswd.jpg?updatedAt=1728196332207",
    user_image: "https://ik.imagekit.io/sathishkumar/digitalCardImages/userDp.webp?updatedAt=1728042791706",
  });

  const [activeElement, setActiveElement] = useState(null);
  const [styles, setStyles] = useState({
    name: { ...baseStyle },
    email: { ...baseStyle },
    phone: { ...baseStyle },
    role: { ...baseStyle },
    company: { ...baseStyle },
    userImage: { ...baseStyle },
    companyLogo: { ...baseStyle },
    address: { ...baseStyle },
    website: { ...baseStyle },
    locationIcon : {...baseStyle},
    globeIcon : {...baseStyle},
    callIcon : {...baseStyle},
    mailIcon : {...baseStyle},
  });

  const {
    firstName,
    lastName,
    userEmailID,
    mobileNumber,
    jobTitle,
    companyName,
    website,
    addressLineOne,
    addressLineTwo,
    user_logo,
    user_image,
  } = cardDetails;

  const [imageSizeLogo, setImageSizeLogo] = useState(60);
  const [imageSizeUser, setImageSizeUser] = useState(60);
  const [resizingImage, setResizingImage] = useState(null);


  const saveAsImage = () => {
    html2canvas(cardRef.current, { useCORS: true }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "d-card.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const saveAsPDF = () => {
    html2canvas(cardRef.current, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 90;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("d-card.pdf");
    });
  };

  const updateStyle = (styleType, value) => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      [activeElement]: { ...prevStyles[activeElement], [styleType]: value || "#000000" },
    }));
  };

  const handleDraggableClick = (field) => {
    setActiveElement(field);
  };

  const handleImageClick = (imageType) => {
    setResizingImage(imageType);
  };
  

  return (
    <>
      <div className="d-card-edit" ref={cardRef}>
      <Draggable>
          <div className="draggable-item" onClick={() => handleDraggableClick("name")}>
            <h3 style={{ ...styles.name }}>
              {firstName} {lastName}
            </h3>
          </div>
        </Draggable>
        <Draggable>
          <div className="draggable-item" onClick={() => handleDraggableClick("mailIcon")}>
            <p style={{ ...styles.mailIcon }}>
              <MdEmail  /> 
            </p>
          </div>
        </Draggable>
        <Draggable>
          <div className="draggable-item" onClick={() => handleDraggableClick("email")}  >
            <p style={{ ...styles.email }}>{userEmailID}</p>
          </div>
        </Draggable>
        <Draggable>
          <div className="draggable-item" onClick={() => handleDraggableClick("company")}>
            <p style={{ ...styles.company }}>{companyName}</p>
          </div>
        </Draggable>
        <Draggable>
          <div className="draggable-item" onClick={() => handleDraggableClick("callIcon")}>
            <p style={{ ...styles.callIcon }}>
              <IoMdCall  /> 
            </p>
          </div>
        </Draggable>
        <Draggable>
          <div className="draggable-item" onClick={() => handleDraggableClick("phone")}>
            <p style={{ ...styles.phone }}>{mobileNumber}</p>
          </div>
        </Draggable>
        <Draggable>
          <div className="draggable-item" onClick={() => handleImageClick("logo")}>
            <img
              src={user_logo}
              alt="Company Logo"
              className="company-logo draggable-items"
              style={{
                width: `${imageSizeLogo}px`,
                height: `${imageSizeLogo}px`,
                borderRadius: "10px",
              }}
            />
          </div>
        </Draggable>
        <Draggable>
          <div className="draggable-item" onClick={() => handleImageClick("user")}>
            <img
              src={user_image}
              alt="User Image"
              className="user-image draggable-items"
              style={{
                width: `${imageSizeUser}px`,
                height: `${imageSizeUser}px`,
                borderRadius: "10px",
              }}
            />
          </div>
        </Draggable>
        <Draggable>
          <div className="draggable-item" onClick={() => handleDraggableClick("locationIcon")}>
            <p style={{ ...styles.locationIcon }}>
              <FaLocationDot  /> 
            </p>
          </div>
        </Draggable>
        <Draggable>
          <div className="draggable-item" onClick={() => handleDraggableClick("address")}>
            <p style={{ ...styles.address }}>
              {addressLineOne}, {addressLineTwo}
            </p>
          </div>
        </Draggable>
        <Draggable>
          <div className="draggable-item" onClick={() => handleDraggableClick("globeIcon")}>
            <p >
              <FaGlobe size={25} style={{ ...styles.globeIcon}} />
            </p>
          </div>
        </Draggable>
        <Draggable>
          <div className="draggable-item" onClick={() => handleDraggableClick("website")}>
            <p style={{ ...styles.website }}>
              {website}
            </p>
          </div>
        </Draggable>
        <Draggable>
          <div className="draggable-item" onClick={() => handleDraggableClick("role")}>
            <p style={{ ...styles.role }}>{jobTitle}</p>
          </div>
        </Draggable>
      </div>
      <div className="input-section">
        {activeElement && (
          <>
            <div className="input-section">
        {activeElement && (
          <>
            <div className="option-button">
              <span>Font Family</span>
              <select
                value={styles[activeElement].fontFamily}
                onChange={(e) => updateStyle("fontFamily", e.target.value)}
              >
                {fontFamilies.map((font, index) => (
                  <option key={index} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>
            <div className="option-button">
              <span>Aa</span>
              <span>Text Size</span>
              <input
                type="range"
                min="12"
                max="44"
                value={parseInt(styles[activeElement].fontSize, 10)}
                onChange={(e) => updateStyle("fontSize", `${e.target.value}px`)}
              />
            </div>
            <div className="option-button">
              <span>Color</span>
              <input
                type="color"
                value={styles[activeElement].color}
                onChange={(e) => updateStyle("color", e.target.value)}
              />
            </div>
            <div className="option-button">
              <span>Background Color</span>
              <input
                type="color"
                value={styles[activeElement].backgroundColor}
                onChange={(e) => updateStyle("backgroundColor", e.target.value)}
              />
            </div>
            <div className="option-button">
              <span>Border Radius</span>
              <input
                type="range"
                min="0"
                max="50"
                value={parseInt(styles[activeElement].borderRadius, 10)}
                onChange={(e) => updateStyle("borderRadius", `${e.target.value}px`)}
              />
            </div>
            <div className="option-button">
              <span>Letter Spacing</span>
              <input
                type="range"
                min="-10"
                max="10"
                value={parseInt(styles[activeElement].letterSpacing, 10)}
                onChange={(e) => updateStyle("letterSpacing", `${e.target.value}px`)}
              />
            </div>
            <div className="option-button">
              <span>Bold</span>
              <input
                type="checkbox"
                checked={styles[activeElement].fontWeight === "bold"}
                onChange={(e) => updateStyle("fontWeight", e.target.checked ? "bold" : "normal")}
              />
            </div>
            <div className="option-button">
              <label htmlFor="underline">Underline</label>
              <input
                type="checkbox"
                id="underline"
                style={{display:"none"}}
                checked={styles[activeElement].textDecoration === "underline"}
                onChange={(e) => updateStyle("textDecoration", e.target.checked ? "underline" : "none")}
              />
            </div>
            {resizingImage && (
              <div className="option-button">
                <span>Image Size</span>
                <input
                  type="range"
                  min="30"
                  max="150"
                  value={resizingImage === "logo" ? imageSizeLogo : imageSizeUser}
                  onChange={(e) => {
                    const size = e.target.value;
                    if (resizingImage === "logo") {
                      setImageSizeLogo(size);
                    } else {
                      setImageSizeUser(size);
                    }
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
      <div className="button-section">
        <button onClick={saveAsImage}>Download as Image</button>
        <button onClick={saveAsPDF}>Download as PDF</button>
      </div>
    </>
  );
};

export default App;
