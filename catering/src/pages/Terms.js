import React, { useEffect } from "react";
import "./PrivacyTerms.css";

const Terms = () => {
    useEffect(() => {
          window.scrollTo(0, 0); // Scroll to the top of the page
        }, []);
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1>Terms and Conditions</h1>
        <p>Last Updated: March 2025</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Elite Caterings. By accessing and using our services, you
            agree to be bound by these Terms and Conditions. Please read them
            carefully.
          </p>
        </section>

        <section>
          <h2>2. Services Provided</h2>
          <p>
            Elite Caterings offers food catering services for various events.
            Our services are subject to availability, and we reserve the right
            to refuse service at our discretion.
          </p>
        </section>

        <section>
          <h2>3. Orders and Payments</h2>
          <ul>
            <li>All orders must be placed at least 24 hours in advance.</li>
            <li>Full or partial payment may be required upon order confirmation.</li>
            <li>We accept online payments through secure gateways.</li>
            <li>Prices are subject to change without prior notice.</li>
          </ul>
        </section>

        <section>
          <h2>4. Cancellations and Refunds</h2>
          <p>
            If you need to cancel an order, please notify us at least 12 hours
            in advance. Refunds, if applicable, will be processed based on our
            refund policy.
          </p>
        </section>

        <section>
          <h2>5. Delivery and Pickup</h2>
          <p>
            We strive to deliver orders on time. However, delays due to traffic
            or unforeseen circumstances may occur. Customers must provide an
            accurate delivery address and contact details.
          </p>
        </section>

        <section>
          <h2>6. Liability</h2>
          <p>
            Elite Caterings is not responsible for any allergic reactions or
            health issues arising from the consumption of our food. Customers
            should inform us of any dietary restrictions or allergies in
            advance.
          </p>
        </section>

        <section>
          <h2>7. Intellectual Property</h2>
          <p>
            All content, logos, and materials on this website are the property
            of Elite Caterings and may not be copied or used without permission.
          </p>
        </section>

        <section>
          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to update these Terms and Conditions at any
            time. Customers will be notified of major changes via email or
            website updates.
          </p>
        </section>

        <section>
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions, please contact us at:
            <br />
            <strong>Email:</strong> support@elitecaterings.com
            <br />
            <strong>Phone:</strong> +91-9876543210
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
