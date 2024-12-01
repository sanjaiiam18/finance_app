"use client";
import { useState, useEffect } from "react";
import { MdHomeFilled } from "react-icons/md";
import { useRouter } from "next/navigation";
import "./page.css";
import { IoSearchSharp } from "react-icons/io5";

export default function Full() {
  const [loans, setLoans] = useState([]); // All loan data
  const [filteredLoans, setFilteredLoans] = useState([]); // Data to display
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const router = useRouter();

  // Fetch loans on component mount
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

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Update filtered loans based on the query
    if (query.trim() === "") {
      setFilteredLoans(loans); // Show all data if query is empty
    } else {
      const filtered = loans.filter((loan) =>
        loan.aadhaarNumber.toString().includes(query)
      );
      setFilteredLoans(filtered);
    }
  };

  // Handle navigation
  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <>
      <form>
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by Aadhaar Number"
        />
      </form>
      <div className="container">
        <MdHomeFilled
          size={40}
          type="button"
          onClick={() => handleNavigation("/")}
          className="home-icon"
        />
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : filteredLoans.length > 0 ? (
          <table className="loans-table">
            <thead>
              <tr>
                <th>Aadhaar Number</th>
                <th>Name</th>
                <th>Address</th>
                <th>Product Amount</th>
                <th>Down Payment</th>
                <th>Interest Rate</th>
                <th>Due Date</th>
                <th>Months</th>
                <th>LoanPayment</th>
                <th>Mobile Number</th>
                <th>Alternate Mobile Number</th>
                <th>Father`s Name</th>
                <th>Benami Name</th>
                <th>Benami Aadhaar</th>
                <th>Place Via</th>
                <th>Taluk</th>
                <th>District</th>
                <th>Pincode</th>
                <th>Repaid</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => (
                <tr key={loan.AadhaarNumber}>
                  <td>{loan.AadhaarNumber}</td>
                  <td>{loan.Name}</td>
                  <td>{loan.Address}</td>
                  <td>{loan.ProductAmount}</td>
                  <td>{loan.DownPayment}</td>
                  <td>{loan.InterestRate}</td>
                  <td>{loan.DueDate}</td>
                  <td>{loan.Months}</td>
                  <td>{loan.loanPayment}</td>
                  <td>{loan.MobileNumber}</td>
                  <td>{loan.AlternateMobileNumber}</td>
                  <td>{loan.FatherName}</td>
                  <td>{loan.BenamiName}</td>
                  <td>{loan.BenamiAadhaarNumber}</td>
                  <td>{loan.PlaceVia}</td>
                  <td>{loan.Taluk}</td>
                  <td>{loan.District}</td>
                  <td>{loan.Pincode}</td>
                  <td>{loan.Repaid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No data found</div>
        )}
      </div>
    </>
  );
}
