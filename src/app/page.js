"use client";
import { BiSolidBank } from "react-icons/bi";
import { IoPersonAdd } from "react-icons/io5";
import "./globals.css";
import { IoMdRefresh } from "react-icons/io";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { BiSolidNavigation } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Datainput from "./Show";
import { GrUpdate } from "react-icons/gr";
export default function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

function Home() {
  const router = useRouter();
  const handleNavigation = (path) => {
    router.push(path);
  };
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const refreshPage = () => {
    window.location.reload();
  };
  useEffect(() => {
    async function fetchLoans() {
      try {
        const response = await fetch("/api/loans");
        if (!response.ok) {
          throw new Error("Failed to fetch loans");
        }
        const data = await response.json();
        setLoans(data); // Set the full data
        setFilteredLoans(data); // Initialize filteredLoans to show all data
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }

    fetchLoans();
  }, []);
  const loanRef = useRef(null);
  const loanabout = useRef(null);
  const home = useRef(null);

  function showloan() {
    loanRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  function showabout() {
    loanabout.current?.scrollIntoView({ behavior: "smooth" });
  }
  function showhome() {
    home.current?.scrollIntoView({ behavior: "smooth" });
  }

  if (isLoading) return <div></div>;
  return (
    <>
      <section ref={home} id="home" className="section home">
        <ul className="list">
          <li>
            <div className="icon-container">
              <BiSolidBank
                size={60}
                style={{ color: "black" }}
                type="button"
                onClick={showloan}
              />
              <span className="text">Show Loan Data</span>
            </div>
          </li>
          <li>
            <div className="icon-container">
              <IoPersonAdd
                size={60}
                style={{ color: "black" }}
                type="button"
                onClick={showabout}
              />
              <span className="text">Add People</span>
            </div>
          </li>
          <li>
            <div className="icon-container">
              <GrUpdate
                size={60}
                style={{ color: "black" }}
                type="button"
                onClick={() => handleNavigation("/updatepage")}
              />
              <span className="text">Update Data</span>
            </div>
          </li>
        </ul>
      </section>
      <section ref={loanRef} className="loans-section">
        <FaLongArrowAltLeft
          size={40}
          type="button"
          color="white"
          onClick={showhome}
          style={{ padding: "10px", borderRadius: "50%", background: "black" }}
        />
        <div className="button-container">
          <button className="button" onClick={() => handleNavigation("/pages")}>
            <p className="text">Show full data</p>
            <BiSolidNavigation size={20} />
          </button>
        </div>

        <div className="loan-header">
          <span>Aadhaar Number</span>
          <span>Name</span>
          <span>Loan Payment</span>
          <span>Mobile Number</span>
          <span>Total Amount</span>
          <span>Down Payment</span>
        </div>
        {/* Loan Items */}
        {loans.map((loan) => (
          <div key={loan.AadhaarNumber} className="loan-item">
            <span>{loan.AadhaarNumber}</span>
            <span>{loan.Name}</span>
            <span>{loan.loanPayment}</span>
            <span>{loan.MobileNumber}</span>
            <span>{loan.TotalAmount}</span>
            <span>{loan.DownPayment}</span>
          </div>
        ))}
      </section>

      <section ref={loanabout} style={{ height: "100vh" }}>
        <Datainput />
      </section>
    </>
  );
}
