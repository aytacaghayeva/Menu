import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import './Menu.css';

function Menu() {
  const [complaint, setComplaint] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const fileInputRef = useRef(null); 

  const sendEmail = (e) => {
    e.preventDefault();
    const templateParams = {
      to_email: "agayeva.aytac005@gmail.com",
      phone_number: phoneNumber || "No phone number provided",
      message: complaint
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then((response) => {
        setMessageSent(true);
        setComplaint("");
        setPhoneNumber("");
      })
      .catch((err) => {
        console.error("Email sending failed", err);
      });
  };

  const handleAddPhoto = () => {
    fileInputRef.current.click(); 
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="" alt="MenuPhoto" />
      </div>
      <input
        type="text"
        placeholder="Əlaqə Nömrəsi (istəyə bağlı)"
        className="input-field"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <textarea
        rows="5"
        placeholder="Təklif və şikayətinizi qeyd edin"
        className="input-field"
        value={complaint}
        onChange={(e) => setComplaint(e.target.value)}
        required
      ></textarea>
      <input
        type="file"
        accept="image/*" 
        capture="user" 
        style={{ display: "none" }} 
        ref={fileInputRef} 
      />
      <button className="add-photo-btn" onClick={handleAddPhoto}>
        <span>Add Photo</span> 
      </button>
      <button 
        className="send-btn" 
        onClick={sendEmail} 
        disabled={!complaint}
      >
        Göndər
      </button>
      {messageSent && <p>Email has been sent successfully!</p>}
      <p className="ican"><i>supported by ICan</i></p>
    </div>
  );
}

export default Menu;
