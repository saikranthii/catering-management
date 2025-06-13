import "./PrivacyTerms.css";
import React, { useEffect } from "react";

const Privacy = () => {
    useEffect(() => {
          window.scrollTo(0, 0); // Scroll to the top of the page
        }, []);
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <h1>Privacy Policy</h1>
        <p>Last Updated: March 2025</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Elite Caterings. We are committed to protecting your
            privacy and ensuring that your personal information is handled
            securely and responsibly.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>Personal details (name, email, phone number)</li>
            <li>Order details and preferences</li>
            <li>Payment information (processed securely)</li>
            <li>Website usage data via cookies</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use your information for:</p>
          <ul>
            <li>Processing orders and delivering catering services</li>
            <li>Improving our website and user experience</li>
            <li>Sending updates, promotions, and service notifications</li>
            <li>Ensuring compliance with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2>4. Sharing Your Information</h2>
          <p>
            We do not sell your personal data. However, we may share it with:
          </p>
          <ul>
            <li>Service providers (e.g., payment gateways, delivery partners)</li>
            <li>Legal authorities if required by law</li>
          </ul>
        </section>

        <section>
          <h2>5. Security of Your Information</h2>
          <p>
            We take appropriate measures to secure your data, including
            encryption and secure payment processing.
          </p>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access, modify, or delete your personal data</li>
            <li>Opt out of marketing emails</li>
            <li>Request information on how we use your data</li>
          </ul>
        </section>

        <section>
          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Please review it
            periodically.
          </p>
        </section>

        <section>
          <h2>8. Contact Us</h2>
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

export default Privacy;
