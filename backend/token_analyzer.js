const express = require('express');
const cors = require('cors');
const {encoding_for_model} = require('@dqbd/tiktoken');
const {SummarizerManager} = require('node-summarizer');
const { optimizePrompt } = require('./prompt_optimizer_utility');

const app = express();
app.use(cors());
app.use(express.json());  
const model = 'gpt-4';  

app.post('/analyze', async (req, res) => {
    try {
        const { prompt } = req.body;
        const encoding = encoding_for_model(model);
        const tokens = encoding.encode(prompt);
        const tokenCount = tokens.length;

        const optimizedPrompt = optimizePrompt(prompt);
        const optimizedTokensOne = encoding.encode(optimizedPrompt);

        const summarizer = new SummarizerManager(prompt, 3);
        const summary = summarizer.getSummaryByRank();

        const wordCount = prompt.split(/\s+/).length;

        let newPrompt;

        summary.then((result) => {
            newPrompt = result.summary;
            const encoding = encoding_for_model(model);
            const optimizedTokensTwo = encoding.encode(newPrompt);
            res.json({
                tokenCount,
                wordCount,
                optimizedPrompt: newPrompt,
                optimizedTokensOne,
                optimizedTokensTwo,
                summary
            });
        }).catch((error) => {
            console.error('Error generating summary:', error);            
        });

    } catch (error) {
        console.error('Error analyzing prompt:', error);
        res.status(500).json({ error: 'An error occurred while analyzing the prompt.' });
    }});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});