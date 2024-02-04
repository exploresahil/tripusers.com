"use client";

import { IoMdDownload } from "react-icons/io";
import { BsArrowClockwise } from "react-icons/bs";
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { UserButton } from "@clerk/nextjs";

interface dataTypes {
  id: number;
  name: string;
  phone_number: number;
  createAt: string;
}
interface enquiryDataTypes {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  guest: number;
  message: string;
  createAt: string;
}

const Admin = () => {
  const [contactData, setContactData] = useState<dataTypes[]>([]);
  const [enquiryData, setEnquiryData] = useState<enquiryDataTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"contact" | "enquiries">(
    "contact"
  );
  const conatctTableRef = useRef<HTMLTableElement | null>(null);
  const enquiriesTableRef = useRef<HTMLTableElement | null>(null);

  const fetchData = () => {
    setLoading(true);
    console.log("Fetching..");

    fetch(`${process.env.NEXT_PUBLIC_SANITY_APP_SCRIPT_URL}?action=getData`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((result) => {
        const sortedData = result.data.sort(
          (a: dataTypes, b: dataTypes) => b.id - a.id
        );
        setContactData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching contactData:", error);
        setLoading(false);
      })
      .finally(() => {
        console.log("Finished fetching contactData");

        setLoading(false);
      });
  };

  const fetchEnquiryData = () => {
    setLoading(true);
    console.log("Fetching..");

    fetch(
      `${process.env.NEXT_PUBLIC_SANITY_APP_SCRIPT_URL}?action=getEnquiries`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((result) => {
        const sortedData = result.data.sort(
          (a: dataTypes, b: dataTypes) => b.id - a.id
        );
        setEnquiryData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching contactData:", error);
        setLoading(false);
      })
      .finally(() => {
        console.log("Finished fetching contactData");

        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    fetchEnquiryData();
  }, []);

  //console.log("contactData=>", contactData);
  //console.log("enquiryData=>", enquiryData);

  const generateFilename = (prefix: string) => {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    const hh = String(date.getHours() % 12 || 12).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "pm" : "am";

    return `TU-${prefix}-${dd}-${mm}-${yyyy}-${hh}-${min}-${ampm}`;
  };

  const { onDownload: contactDownload } = useDownloadExcel({
    currentTableRef: conatctTableRef.current,
    filename: generateFilename("Contact-sheet"),
    sheet: "Contact",
  });
  const { onDownload: enquiriesDownload } = useDownloadExcel({
    currentTableRef: enquiriesTableRef.current,
    filename: generateFilename("Enquiry-sheet"),
    sheet: "Enquiry",
  });

  return (
    <>
      <section id="adminHero">
        <h2>Admin</h2>
      </section>
      <section id="dataTabs">
        <div className="menu">
          <div className="tabs-button">
            <button
              onClick={() => setActiveTab("contact")}
              className={activeTab === "contact" ? "active" : ""}
            >
              Contact
            </button>
            <button
              onClick={() => setActiveTab("enquiries")}
              className={activeTab === "enquiries" ? "active" : ""}
            >
              Enquiries
            </button>
          </div>
          <div className="refresh-signout">
            <button
              className={`refetch ${loading ? "loading" : ""}`}
              onClick={() => fetchData()}
            >
              <BsArrowClockwise />
            </button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
        <div className="tabs">
          <>
            {activeTab === "contact" && (
              <div className="table-title">
                <h3>Contact Form Data</h3>
                <button onClick={contactDownload}>
                  <IoMdDownload />
                </button>
              </div>
            )}
          </>
          <>
            {activeTab === "enquiries" && (
              <div className="table-title">
                <h3>Enquiries Form Data</h3>
                <button onClick={enquiriesDownload}>
                  <IoMdDownload />
                </button>
              </div>
            )}
          </>
          {loading ? (
            <p>Loading Data...</p>
          ) : (
            <div className="table-container">
              <>
                {activeTab === "contact" && (
                  <table ref={conatctTableRef}>
                    <thead>
                      <tr>
                        <th>Sr/No</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Submitted at</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contactData.map((data, index) => (
                        <tr key={index}>
                          <td>{data.id}</td>
                          <td>{data.name}</td>
                          <td>{data.phone_number}</td>
                          <td>{data.createAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
              <>
                {activeTab === "enquiries" && (
                  <table ref={enquiriesTableRef}>
                    <thead>
                      <tr>
                        <th>Sr/No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Travel Date</th>
                        <th>Guest</th>
                        <th>Message</th>
                        <th>Submitted at</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiryData.map((data, index) => (
                        <tr key={index}>
                          <td>{data.id}</td>
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>{data.phone}</td>
                          <td>{data.date}</td>
                          <td>{data.guest}</td>
                          <td>{data.message}</td>
                          <td>{data.createAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Admin;
