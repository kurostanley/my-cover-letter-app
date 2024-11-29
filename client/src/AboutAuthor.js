import React from 'react';

const AboutAuthor = () => {
  return (
    <div className="about-author">
      <div className="author-card">
        <h2>About the Author</h2>
        <img 
          src="./profile.jpeg" 
          alt="Shin Ting Lin" 
          className="author-image"
        />
        <h3>Shin Ting Lin</h3>
        <p>Full Stack Developer passionate about creating tools that make people's lives easier.</p>
        
        <div className="social-links">
          <a href="https://github.com/kurostanley" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i> GitHub
          </a>
          <a href="https://www.linkedin.com/in/john-peatey-a36630192/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
          <a href="https://www.instagram.com/stl_oopig/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i> Twitter
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutAuthor;