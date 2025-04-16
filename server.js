const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// 替换为你的 DeepSeek API Key
const DEEPSEEK_API_KEY = 'sk-41306a6a5e8840be862f0a16ff65fbf4';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

app.use(express.json());
app.use(express.static('public')); // 提供静态文件

// 处理前端请求
app.post('/ask-deepseek', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            DEEPSEEK_API_URL,
            {
                model: 'deepseek-chat',
                messages: [{ role: 'user', content: message }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
                },
            }
        );

        const reply = response.data.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error('DeepSeek API 调用失败:', error);
        res.status(500).json({ error: 'DeepSeek API 调用失败' });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});