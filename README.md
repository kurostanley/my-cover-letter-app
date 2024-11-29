# AI Cover Letter Generator

An AI-powered web application that generates personalized cover letters by analyzing your professional profile and job descriptions. Built with React and Node.js, deployed on Google Cloud Platform.

## Live Demo

https://cover-letter-app-237142443924.asia-east1.run.app

## Features

- **AI-Powered Generation**: Leverages OpenAI's GPT-3.5 model for intelligent cover letter creation
- **Preset Management**: Save and manage multiple professional profiles
- **Customizable Templates**: Flexible prompt templates for different writing styles
- **Real-Time Generation**: Instant cover letter creation with live preview
- **Local Storage**: Securely stores your presets and settings locally
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- OpenAI API key

### Installation

1. Clone the repository:
   bash
   git clone https://github.com/kurostanley/cover-letter-generator.git
2. Install dependencies:
   bash
   Install backend dependencies
   cd api
   npm install
   Install frontend dependencies
   cd ../client
   npm install
3. Start the development servers:
   bash
   Start backend server (from api directory)
   npm start
   Start frontend server (from client directory)
   npm start

## Usage Guide

1. **API Setup**

   - Get an OpenAI API key from [OpenAI's website](https://platform.openai.com/api-keys)
   - Enter your API key in the API Settings page

2. **Create Preset**

   - Fill in your professional information
   - Include name, summary, skills, experience, and education
   - Save the preset for future use

3. **Generate Cover Letter**
   - Select a saved preset
   - Enter the job title and description
   - Click "Generate" to create your cover letter
   - Review and copy the generated content

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- CSS3

### Backend

- Node.js
- Express
- OpenAI API

### Deployment

- Google Cloud Platform (Cloud Run)

## Author

Shin Ting Lin

- GitHub: [@kurostanley](https://github.com/kurostanley)
- LinkedIn: [Shin Ting Lin](https://www.linkedin.com/in/john-peatey-a36630192/)
- Instagram: [@stl_oopig](https://www.instagram.com/stl_oopig/)

## License

This project is licensed under the MIT License
