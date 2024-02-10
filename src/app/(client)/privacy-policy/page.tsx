import React from "react";
import "./style.scss";
const page = () => {
  return (
    <section className="section-body">
      <div className="header">
        <h1>Terms and Conditions</h1>
        <span>Last updated: October 27, 2022</span>
      </div>
      <div className="body">
        <p>
          This web page represents a legal document that serves as the terms of
          use for our website (“Terms of Use”), www.thrillophilia.com and any
          associated mobile application (collectively, “Website”), as owned and
          operated by 53Take off Pvt limited, Barasingha Private Limited,
          Thrillophilia Inc., Thrillophilia FZCO or Thrillophilia Travel
          Solutions (“Thrillophilia”). 53takeoffs and Barasingha are the
          supplier / sourcing partner company for Thrillophilia for diverse
          destinations, 53takeoffs and Barasingha does the fulfilment and
          contracting with the help of local suppliers across the globe and
          would operate certain stays and tours booked on Thrillophilia.
          Capitalised terms, unless otherwise defined, have the meaning
          specified within the Definitions section below. This Terms of Use, and
          other posted guidelines within our Website, (collectively “Legal
          Terms”), constitute the entire and only agreement between you and
          Thrillophilia, and supersede all other agreements, representations,
          warranties and understandings with respect to our Website and the
          subject matter contained herein. We may amend our Legal Terms at any
          time without specific notice to you. The latest copies of our Legal
          Terms will be posted on our Website, and you should review all Legal
          Terms prior to using our Website. After any revisions to our Legal
          Terms are posted, you agree to be bound to any such changes to them.
          Therefore, it is important for you to periodically review our Legal
          Terms to make sure you still agree to them. By using our Website, you
          agree to fully comply with and be bound by our Legal Terms. Please
          review them carefully. If you do not accept our Legal Terms, do not
          access and use our Website. If you do not accept our Legal Terms, you
          should not access our Website. If you have already accessed our
          Website and do not accept our Legal Terms, you should immediately
          discontinue use of our Website.
        </p>
        {[
          {
            head: "Definitions",
            info: `The terms: “us” or “we” or “our” refers to Thrillophilia, the owner of
            the Website. A “Member” is an individual that has registered with our
            Website to use our Website's features. A “supplier” is a Member of our
            Website that is a business offering tours, activities, and other
            travel-related goods and services to the general public and has
            registered with our Website to offer their goods/services. We refer to
            a Member who purchases goods/services from suppliers as a “Customer”.
            A “Profile” is an online collection of information provided by a
            Member about their business if a supplier, or generally about
            themselves if a Customer. A “User” is a collective identifier that
            refers to either a Visitor or a Member. A “Visitor” is someone who
            merely browses our Website. All text, information, graphics, audio,
            video, and data offered through our Website, whether free to all or
            part of our paid features of our Website, are collectively known as
            our “Content”. We may refer to Content provided by our Members,
            whether as part of their Profile or in other postings to our Website,
            as “Member Content.” When we refer to our Website, our Content is
            included by reference.`,
          },
          {
            head: "Limited License",
            info: `Thrillophilia grants you a non-exclusive, non-transferable, revocable licence to access and use our Website strictly in accordance with our Legal Terms. Your use of our Website is solely for the purposes as provided herein.`,
          },
          {
            head: "Our Relationship to You",
            info: `Thrillophilia is strictly a venue that does NOT enter into any other relationship with you, other than that of an independent contractor. Our Legal Terms in no way create any agency, partnership, joint venture, employee-employer or franchisor-franchisee relationship between you and Thrillophilia, other Users, or our affiliates.`,
          },
          {
            head: "Legal Compliance",
            info: `You agree to comply with all applicable domestic and international laws, statutes, ordinances, and regulations regarding your use of our Website. Thrillophilia reserves the right to investigate complaints or reported violations of our Legal Terms and to take any action we deem appropriate, including but not limited to cancelling your Member account, reporting any suspected unlawful activity to law enforcement officials, regulators, or other third parties and disclosing any information necessary or appropriate to such persons or entities relating to your profile, email addresses, usage history, posted materials, IP addresses and traffic information, as allowed under our Privacy Policy.`,
          },
        ].map((v) => (
          <>
            <h3>{v.head}</h3>
            <p>{v.info}</p>
          </>
        ))}
      </div>
    </section>
  );
};

export default page;
