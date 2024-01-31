"use client";
import { BsArrowClockwise } from "react-icons/bs";
import "./style.scss";
import { useEffect, useState } from "react";
interface dataTypes {
  id: number;
  name: string;
  phone_number: number;
}
const page = () => {
  const [contactData, setContactData] = useState<dataTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"contact" | "enquiries">(
    "contact"
  );

  const fetchData = () => {
    setLoading(true);
    console.log("Fetching..");

    fetch(
      "https://script.google.com/macros/s/AKfycbysvpPeuHRGHaG3qIdLSk_vdv52AhxzE4sOqo34SCSqMDArxgJqPNEVkRWG4KzjMhAg/exec?action=getData",
      {
        method: "POST",
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

  useEffect(() => {
    fetchData();
  }, []);

  //console.log("contactData=>", contactData);

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
          <button
            className={`refetch ${loading ? "loading" : ""}`}
            onClick={() => fetchData()}
          >
            <BsArrowClockwise />
          </button>
        </div>
        <div className="tabs">
          {activeTab === "contact" && (
            <table>
              <thead>
                <tr>
                  <th>Sr/No</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {contactData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.phone_number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
