import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StaticContentManagement = () => {
  const [staticContents, setStaticContents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Default static content data
    const defaultContent = [
      {
        _id: '1',
        contentType: 'PRIVACY_POLICY',
        title: 'Privacy Policy',
        description: `
          <h1>Privacy Policy</h1>
          <p><strong>Last updated: June 17, 2025</strong></p>
          <h2>Introduction</h2>
          <p>We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.</p>
          <h2>Information We Collect</h2>
          <ul>
            <li><strong>Personal Information</strong>: Name, email address, phone number, and payment details.</li>
            <li><strong>Usage Data</strong>: IP address, browser type, and pages visited.</li>
          </ul>
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To process transactions and manage your account.</li>
            <li>To improve our services and personalize your experience.</li>
            <li>To communicate with you, including sending updates and promotional materials.</li>
          </ul>
          <h2>Sharing Your Information</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>Service providers who assist with payment processing or analytics.</li>
            <li>Law enforcement or government agencies when required by law.</li>
          </ul>
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access and update your personal information.</li>
            <li>Opt out of marketing communications.</li>
            <li>Request deletion of your data, subject to legal obligations.</li>
          </ul>
          <h2>Contact Us</h2>
          <p>If you have questions about this Privacy Policy, contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
        `.trim(),
        createdAt: '2025-06-17T10:00:00Z',
      },
      {
        _id: '2',
        contentType: 'REFUND_POLICY',
        title: 'Refund Policy',
        description: `
          <h1>Refund Policy</h1>
          <p><strong>Effective Date: June 17, 2025</strong></p>
          <h2>Overview</h2>
          <p>We strive to ensure customer satisfaction. This Refund Policy outlines the conditions under which refunds are available for purchases made through our platform.</p>
          <h2>Eligibility for Refunds</h2>
          <ul>
            <li>Refunds are available within 30 days of purchase for eligible products or services.</li>
            <li>Products must be unused, and services must not have been fully delivered.</li>
            <li>Digital products are non-refundable unless defective.</li>
          </ul>
          <h2>Refund Process</h2>
          <ol>
            <li>Submit a refund request via email to <a href="mailto:refunds@example.com">refunds@example.com</a>.</li>
            <li>Include your order ID and reason for the refund.</li>
            <li>We will review your request and respond within 5 business days.</li>
          </ol>
          <h2>Non-Refundable Items</h2>
          <ul>
            <li>Services fully rendered.</li>
            <li>Custom orders or personalized products.</li>
            <li>Digital downloads after access has been granted.</li>
          </ul>
          <h2>Contact Us</h2>
          <p>For refund-related inquiries, reach out to <a href="mailto:refunds@example.com">refunds@example.com</a>.</p>
        `.trim(),
        createdAt: '2025-06-17T10:00:00Z',
      },
      {
        _id: '3',
        contentType: 'TERMS_AND_CONDITIONS',
        title: 'Terms and Conditions',
        description: `
          <h1>Terms and Conditions</h1>
          <p><strong>Last Updated: June 17, 2025</strong></p>
          <h2>Acceptance of Terms</h2>
          <p>By using our services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our platform.</p>
          <h2>Use of Services</h2>
          <ul>
            <li>You must be at least 18 years old to use our services.</li>
            <li>You agree not to use our platform for any illegal or unauthorized purpose.</li>
            <li>We reserve the right to terminate accounts that violate these terms.</li>
          </ul>
          <h2>Payment Terms</h2>
          <ul>
            <li>All payments must be made through approved methods.</li>
            <li>You are responsible for ensuring accurate payment information.</li>
          </ul>
          <h2>Limitation of Liability</h2>
          <p>We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.</p>
          <h2>Changes to Terms</h2>
          <p>We may update these Terms and Conditions from time to time. Changes will be posted on this page, and continued use of our services constitutes acceptance of the updated terms.</p>
          <h2>Contact Us</h2>
          <p>For questions about these Terms and Conditions, contact us at <a href="mailto:terms@example.com">terms@example.com</a>.</p>
        `.trim(),
        createdAt: '2025-06-17T10:00:00Z',
      },
    ];
    setStaticContents(defaultContent);
  }, []);

  const tdStyle = {
    padding: '14px',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    borderBottom: '1px solid #eee',
  };

  const thStyle = {
    padding: '14px',
    fontSize: '14px',
    fontWeight: 600,
    backgroundColor: '#fff',
    borderBottom: '2px solid #f0f0f0',
    textAlign: 'left',
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px', background: '#f5f7fa' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
        <h4 style={{ margin: 0, marginBottom: '20px' }}>Static Content Management</h4>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '20px',
            }}
          >
            <thead>
              <tr>
                <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Sr No.</th>
                <th style={{ ...thStyle, borderRight: '1px solid #eee', borderBottom: '1px solid #ccc' }}>Title</th>
                <th style={{ ...thStyle, borderBottom: '1px solid #ccc' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staticContents.length > 0 ? (
                staticContents.map((content, index) => (
                  <tr key={content._id}>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{index + 1}</td>
                    <td style={{ ...tdStyle, borderRight: '1px solid #eee' }}>{content.title}</td>
                    <td style={tdStyle}>
                      <FaEdit
                        title="Edit"
                        style={{ color: '#ff9800', cursor: 'pointer' }}
                        onClick={() => navigate('/admin/edit-static-content', { state: { content, mode: 'edit' } })}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                    No Static Content Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaticContentManagement;