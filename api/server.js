const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require("openai");
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Default prompt template
const DEFAULT_PROMPT_TEMPLATE = 
`User Information: {userInformation}
Company Information: {companyInformation}
Cover letter reference: {cvReference}
---
please use the information above help me (my name is {userName}) to generate a cover letter for company as {jobTitle}, which relate to about {userName}'s uniqueness and his personal life with the company's product(if you can research by your database) and give me clean subject title as well. use the writing style of {cvReference}. Keep within 150 words long.`;

app.post('/generate-cover-letter', async (req, res) => {
  try {
    const { 
      userName,
      summary, 
      skills, 
      experience, 
      workexperience, 
      education, 
      jobTitle, 
      jobDescription, 
      cvReference,
      apiKey,
      promptTemplate 
    } = req.body;

    // Set the API key from the request
    const openai = new OpenAI({
      apiKey: apiKey
    });

    // Combine user information into a single prompt
    const userInformation = `${summary} ${skills} ${experience} ${workexperience} ${education}`;

    // Combine company information
    const companyInformation = `${jobTitle} ${jobDescription}`;

    // Use provided prompt template or default
    const finalPromptTemplate = promptTemplate || DEFAULT_PROMPT_TEMPLATE;

    // Replace variables in the prompt template
    const prompt = finalPromptTemplate
      .replace('{userInformation}', userInformation)
      .replace('{companyInformation}', companyInformation)
      .replace('{cvReference}', cvReference)
      .replace(/{userName}/g, userName)
      .replace('{jobTitle}', jobTitle);

    // Use OpenAI API to generate cover letter
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });

    const generatedCoverLetter = chatCompletion.choices[0].message.content;

    // Return the generated cover letter to frontend
    res.json({ coverLetter: generatedCoverLetter });
  } catch (error) {
    console.error('Error generating cover letter:', error);
    res.status(500).json({ 
      error: 'An error occurred while generating the cover letter',
      details: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
