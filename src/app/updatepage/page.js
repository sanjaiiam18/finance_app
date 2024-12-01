"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdHomeFilled } from "react-icons/md";
import "./page1.css";

export default function Update() {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [repaid, setRepaid] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      aadhaarNumber,
      Repaid: parseFloat(repaid),
    };

    try {
      const response = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Error submitting form");
      }

      const result = await response.json();
      setSuccessMessage("Data successfully submitted!");
      setAadhaarNumber("");
      setRepaid("");

      setTimeout(() => {
        handleNavigation("/");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container">
      <MdHomeFilled
        size={40}
        type="button"
        onClick={() => handleNavigation("/")}
        className="home-icon"
      />

      {successMessage && (
        <div className="success-message">
          {successMessage}
          <button onClick={() => setSuccessMessage("")} className="close-btn">
            ✕
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-heading">Update Information</h2>
        <label htmlFor="aadhaarNumber" className="form-label">
          Aadhaar Number
        </label>
        <input
          id="aadhaarNumber"
          type="text"
          maxLength="12"
          value={aadhaarNumber}
          onChange={(e) => setAadhaarNumber(e.target.value)}
          placeholder="Enter Aadhaar Number"
          className="form-input"
        />
        <label htmlFor="repaid" className="form-label">
          Repaid Amount
        </label>
        <input
          id="repaid"
          type="number"
          value={repaid}
          onChange={(e) => setRepaid(e.target.value)}
          placeholder="Enter the repaid amount"
          className="form-input"
        />
        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
