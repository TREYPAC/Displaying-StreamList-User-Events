import React from 'react';

export default function About() {
  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '3rem', marginBottom: '20px' }}>About EZTechMovie</h1>
      
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
        EZTechMovie is a startup company driven by innovation and powered by creativity. Our core product, <strong>StreamList</strong>, is designed to be a one-stop solution for discovering, saving, and sharing your favorite movies and shows across platforms.
      </p>

      <h2 style={{ fontSize: '1.8rem', marginTop: '30px' }}>Our Mission</h2>
      <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
        We believe in simplifying entertainment choices. StreamList gives users full control over their watchlist experience—from personalized recommendations and search to secure purchases and seamless sharing.
      </p>

      <h2 style={{ fontSize: '1.8rem', marginTop: '30px' }}>Our Process</h2>
      <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
        Our development approach embraces modern best practices. We begin each feature with wireframing to gather feedback and identify usability issues early. With team collaboration and clear task division, each developer brings their specialty to the table to build robust, scalable features efficiently.
      </p>

      <h2 style={{ fontSize: '1.8rem', marginTop: '30px' }}>Project Tracking</h2>
      <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
        To ensure alignment and transparency, we use Gantt charts to track our progress and deliver weekly project status reports to EZTechMovie leadership. Our agile feedback loops help us pivot quickly and respond to new ideas or changes.
      </p>

      <h2 style={{ fontSize: '1.8rem', marginTop: '30px' }}>Creativity Meets Technology</h2>
      <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
        As a company with no boundaries, EZTechMovie embraces outside-the-box thinking. Our goal is to redefine streaming discovery with exciting features that engage users and foster community. From dynamic watchlists to immersive recommendation carousels—we’re just getting started.
      </p>

      <div style={{ marginTop: '40px', textAlign: 'center', fontStyle: 'italic', color: '#555' }}>
        Built by creators. Inspired by users. Powered by possibility.
      </div>
    </div>
  );
}
