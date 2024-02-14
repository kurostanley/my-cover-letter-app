const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require("openai");
require('dotenv').config();



const app = express();
const port = 3001; // 可以使用你想要的任何端口

app.use(cors());
app.use(bodyParser.json());

// Open AI Configuration
const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});


// POST 請求處理程序
app.post('/generate-cover-letter', async (req, res) => {
  try {
    const { summary, skills, experience, workexperience, education, jobTitle, jobDescription, companyProducts, cvReference } = req.body;

    // 將使用者輸入的資訊組合成一個 prompt
    const userInformation = `${summary} ${skills} ${experience} ${workexperience} ${education}`;

    // 將公司的工作敘述、產品特色組合成另一個 prompt
    const companyInformation = `${jobTitle}${jobDescription} ${companyProducts}`;

    // 透過這兩個 prompts 來引導 GPT-3.5 生成求職信
    const prompt = `User Information: ${userInformation}\nCompany Information: ${companyInformation}\nCover letter reference: ${cvReference}  \n---\n please use the information above help me (my name is Shin Ting Lin) to generate a cover letter for company as ${jobTitle},which relate to about Shin Ting Lin's uniqueness and his personal life with the company's product(if you can research by your database) and give me clean subject title as well. use the writing style of ${cvReference}. Keep within 150 words long.`;

    // 使用 OpenAI API 來生成求職信
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: `${prompt}` }],
      model: 'gpt-3.5-turbo',
      // 其他 GPT-3.5 相關參數
    });

    const generatedCoverLetter = chatCompletion.choices[0].message;

    console.log(generatedCoverLetter)

    // 將生成的求職信回傳給前端
    res.json({ coverLetter: generatedCoverLetter });
  } catch (error) {
    console.error('Error generating cover letter:', error);
    res.status(500).json({ error: 'An error occurred while generating cover letter' });
  }
});

// 監聽指定的端口
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
