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
interface enquiriesDataTypes {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  guest: number;
  message: string;
  createAt: string;
}

interface enquiryDataTypes {
  id: number;
  packageName: string;
  adult: string;
  child: string;
  travelDate: string;
  name: string;
  email: string;
  mobile: string;
  createAt: string;
}

interface subscribeDataTypes {
  id: number;
  name: string;
  email: string;
  phone: string;
  createAt: string;
}

const Admin = () => {
  const [contactData, setContactData] = useState<dataTypes[]>([]);
  const [enquiriesData, setEnquiriesData] = useState<enquiriesDataTypes[]>([]);
  const [enquiryData, setEnquiryData] = useState<enquiryDataTypes[]>([]);
  const [subscribeData, setSubscribeData] = useState<subscribeDataTypes[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "contact" | "enquiries" | "enquiry" | "subscribe"
  >("contact");
  const conatctTableRef = useRef<HTMLTableElement | null>(null);
  const enquiriesTableRef = useRef<HTMLTableElement | null>(null);
  const enquiryTableRef = useRef<HTMLTableElement | null>(null);
  const subscribeTableRef = useRef<HTMLTableElement | null>(null);

  const fetchData = () => {
    setLoading(true);
    console.log("Fetching..");

    fetch(`${process.env.NEXT_PUBLIC_FORM_APP_SCRIPT_URL}?action=getData`, {
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

  const fetchEnquiriesData = () => {
    setLoading(true);
    console.log("Fetching..");

    fetch(
      `${process.env.NEXT_PUBLIC_FORM_APP_SCRIPT_URL}?action=getEnquiries`,
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
        setEnquiriesData(sortedData);
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

    fetch(`${process.env.NEXT_PUBLIC_FORM_APP_SCRIPT_URL}?action=getEnquiry`, {
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

  const fetchSubscriptionData = () => {
    setLoading(true);
    console.log("Fetching..");

    fetch(`${process.env.NEXT_PUBLIC_FORM_APP_SCRIPT_URL}?action=getSub`, {
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
        setSubscribeData(sortedData);
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
    fetchEnquiriesData();
    fetchEnquiryData();
    fetchSubscriptionData();
  }, []);

  //console.log("contactData=>", contactData);
  //console.log("enquiriesData=>", enquiriesData);
  //console.log("enquiryData=>", enquiryData);
  //console.log("subscribeData=>", subscribeData);

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
    filename: generateFilename("Enquiries-sheet"),
    sheet: "Enquiries",
  });
  const { onDownload: enquiryDownload } = useDownloadExcel({
    currentTableRef: enquiryTableRef.current,
    filename: generateFilename("Enquiry-sheet"),
    sheet: "Enquiry",
  });
  const { onDownload: subscribeDownload } = useDownloadExcel({
    currentTableRef: subscribeTableRef.current,
    filename: generateFilename("subscription-sheet"),
    sheet: "subscription",
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options
    );
    return formattedDate;
  };

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
            <button
              onClick={() => setActiveTab("enquiry")}
              className={activeTab === "enquiry" ? "active" : ""}
            >
              Enquiry
            </button>
            <button
              onClick={() => setActiveTab("subscribe")}
              className={activeTab === "subscribe" ? "active" : ""}
            >
              Subscription
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
          <>
            {activeTab === "enquiry" && (
              <div className="table-title">
                <h3>Enquiry Form Data</h3>
                <button onClick={enquiryDownload}>
                  <IoMdDownload />
                </button>
              </div>
            )}
          </>
          <>
            {activeTab === "subscribe" && (
              <div className="table-title">
                <h3>Subscription Form Data</h3>
                <button onClick={subscribeDownload}>
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
                      {enquiriesData.map((data, index) => (
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
              <>
                {activeTab === "enquiry" && (
                  <table ref={enquiryTableRef}>
                    <thead>
                      <tr>
                        <th>Sr/No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Adult</th>
                        <th>Child</th>
                        <th>Travel Date</th>
                        <th>Submitted at</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiryData.map((data, index) => (
                        <tr key={index}>
                          <td>{data.id}</td>
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>{data.mobile}</td>
                          <td>{data.adult}</td>
                          <td>{data.child}</td>
                          <td>{formatDate(data.travelDate)}</td>
                          <td>{data.createAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
              <>
                {activeTab === "subscribe" && (
                  <table ref={subscribeTableRef}>
                    <thead>
                      <tr>
                        <th>Sr/No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Submitted at</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribeData.map((data, index) => (
                        <tr key={index}>
                          <td>{data.id}</td>
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>{data.phone}</td>
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
