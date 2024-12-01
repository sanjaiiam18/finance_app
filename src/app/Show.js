import { useState } from "react";
import "./globals.css";

export default function Datainput() {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [loanPayment, setLoanPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanInterestAmount, setLoanInterestAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [emiAmount, setEmiAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [months, setMonths] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [alternateMobileNumber, setAlternateMobileNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [benamiName, setBenamiName] = useState("");
  const [benamiAadhaarNumber, setBenamiAadhaarNumber] = useState("");
  const [placeVia, setPlaceVia] = useState("");
  const [taluk, setTaluk] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous messages
    setSuccessMessage("");
    setErrorMessage("");

    // Collect form data into an object
    const formData = {
      aadhaarNumber,
      name,
      address,
      productAmount: productAmount ? parseFloat(productAmount) : 0,
      downPayment: downPayment ? parseFloat(downPayment) : 0,
      loanPayment: loanPayment ? parseFloat(loanPayment) : 0,
      interestRate: interestRate ? parseFloat(interestRate) : 0,
      loanInterestAmount: loanInterestAmount
        ? parseFloat(loanInterestAmount)
        : 0,
      totalAmount: totalAmount ? parseFloat(totalAmount) : 0,
      emiAmount: emiAmount ? parseFloat(emiAmount) : 0,
      dueDate,
      months: months ? parseInt(months, 10) : 0,
      mobileNumber,
      alternateMobileNumber: alternateMobileNumber || null,
      fatherName,
      benamiName,
      benamiAadhaarNumber,
      placeVia,
      taluk,
      district,
      pincode: pincode ? parseInt(pincode, 10) : null,
    };

    try {
      console.log("Submitting form data:", formData);

      const response = await fetch("/api/data", {
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
      console.log("API response:", result);

      setSuccessMessage("Data successfully submitted!");
    } catch (error) {
      console.error("Error submitting form:", error);

      if (error.message.includes("Duplicate entry")) {
        setErrorMessage(
          `Aadhaar Number ${aadhaarNumber} already exists. Please use a unique Aadhaar Number.`
        );
      } else {
        setErrorMessage(
          "There was an error submitting the form. Please try again."
        );
      }
    }
  };

  return (
    <div>
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
          {successMessage}
          <button
            onClick={() => setSuccessMessage("")}
            className="ml-4 text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50">
          {errorMessage}
          <button
            onClick={() => setErrorMessage("")}
            className="ml-4 text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-header">
          <h2>New Entry</h2>
        </div>
        <div className="form-body">
          {/* Input Fields */}
          {[
            [
              "aadhaarNumber",
              "Aadhaar Number",
              aadhaarNumber,
              setAadhaarNumber,
              "text",
              12,
            ],
            ["name", "Name", name, setName, "text", 100],
            ["address", "Address", address, setAddress, "text", 255],
            [
              "productAmount",
              "Product Amount",
              productAmount,
              setProductAmount,
              "number",
            ],
            [
              "downPayment",
              "Down Payment",
              downPayment,
              setDownPayment,
              "number",
            ],
            [
              "loanPayment",
              "Loan Payment",
              loanPayment,
              setLoanPayment,
              "number",
            ],
            [
              "interestRate",
              "Interest Rate",
              interestRate,
              setInterestRate,
              "number",
            ],
            [
              "loanInterestAmount",
              "Loan Interest Amount",
              loanInterestAmount,
              setLoanInterestAmount,
              "number",
            ],
            [
              "totalAmount",
              "Total Amount",
              totalAmount,
              setTotalAmount,
              "number",
            ],
            ["emiAmount", "EMI Amount", emiAmount, setEmiAmount, "number"],
            ["dueDate", "Due Date", dueDate, setDueDate, "date"],
            ["months", "Months", months, setMonths, "number"],
            [
              "mobileNumber",
              "Mobile Number",
              mobileNumber,
              setMobileNumber,
              "text",
              15,
            ],
            [
              "alternateMobileNumber",
              "Alternate Mobile Number",
              alternateMobileNumber,
              setAlternateMobileNumber,
              "text",
              15,
            ],
            [
              "fatherName",
              "Father's Name",
              fatherName,
              setFatherName,
              "text",
              100,
            ],
            [
              "benamiName",
              "Benami Name",
              benamiName,
              setBenamiName,
              "text",
              100,
            ],
            [
              "benamiAadhaarNumber",
              "Benami Aadhaar Number",
              benamiAadhaarNumber,
              setBenamiAadhaarNumber,
              "text",
              12,
            ],
            ["placeVia", "Place Via", placeVia, setPlaceVia, "text"],
            ["taluk", "Taluk", taluk, setTaluk, "text"],
            ["district", "District", district, setDistrict, "text"],
            ["pincode", "Pincode", pincode, setPincode, "text", 6],
          ].map(([id, label, value, setter, type, maxLength]) => (
            <div className="form-field" key={id}>
              <label htmlFor={id}>{label}</label>
              <input
                id={id}
                type={type}
                maxLength={maxLength}
                value={value || ""}
                onChange={(e) => setter(e.target.value)}
                placeholder={`Enter ${label}`}
              />
            </div>
          ))}

          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
