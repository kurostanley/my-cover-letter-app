const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const OpenAI = require("openai");
const path = require('path');
require('dotenv').config();

const app = express();
const port = parseInt(process.env.PORT) || 8080;

// CORS 配置
app.use(cors({
  origin: ['http://localhost:3000', 'https://cover-letter-app-237142443924.asia-east1.run.app'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(bodyParser.json());

// 服務靜態文件
app.use(express.static(path.join(__dirname, 'public')));

// 健康檢查端點
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

// Open AI Configuration
// const openai = new OpenAI({
//   apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
// });


// POST 請求處理程序
app.post('/generate-cover-letter', async (req, res) => {
  try {
    const { 
      summary, 
      skills, 
      experience, 
      workexperience, 
      education, 
      jobTitle, 
      jobDescription, 
      companyProducts, 
      cvReference,
      apiKey  // 從請求中獲取 API 密鑰
    } = req.body;

    // 檢查是否提供了 API 密鑰
    if (!apiKey) {
      return res.status(400).json({ error: '請提供 OpenAI API 密鑰' });
    }

    // 創建新的 OpenAI 實例，使用提供的 API 密鑰
    const customOpenAI = new OpenAI({
      apiKey: apiKey
    });

    // 將使用者輸入的資訊組合成一個 prompt
    const userInformation = `summary: ${summary}, skills : ${skills} , project experience : ${experience}, workexperience : ${workexperience}, education experience: ${education}`;

    // 將公司的工作敘述、產品特色組合成另一個 prompt
    const companyInformation = `job title : ${jobTitle}, jobDescription: ${jobDescription}, company products: ${companyProducts}`;

    // 透過這兩個 prompts 來引導 GPT-3.5 生成求職信
    const prompt = `User Information: ${userInformation}\nCompany Information: ${companyInformation}\nCover letter reference: ${cvReference}  \n---\n please use the information triple Hyphen help me (my name is 林信廷) to generate a cover letter for company as ${jobTitle}, which connect 林信廷's background with the company's product and give me clean subject title as well. for the skill set please find relevant informantion. use the writing style of ${cvReference}. The cover letter should use at most 1000 characters and use "traditional chinese" to write.`;

    // 使用新創建的實例發送請求
    const chatCompletion = await customOpenAI.chat.completions.create({
      messages: [{ role: 'user', content: `${prompt}` }],
      model: 'gpt-3.5-turbo',
      temperature: 0
    });

    const generatedCoverLetter = chatCompletion.choices[0].message;
    res.json({ coverLetter: generatedCoverLetter });

  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ 
      error: '生成求職信時發生錯誤',
      details: error.message 
    });
  }
});

// 新增一個路由來設置 API 密鑰
app.post('/set-api-key', (req, res) => {
  const { apiKey } = req.body;
  
  if (!apiKey || !apiKey.startsWith('sk-')) {
    return res.status(400).json({ error: '無效的 API 密鑰格式' });
  }

  process.env.USER_OPENAI_API_KEY = apiKey;
  res.json({ success: true });
});

// 監聽指定的端口
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});