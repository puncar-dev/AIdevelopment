// Import necessary libraries using CommonJS require
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { name, zodiac } = req.query; // Assuming you're passing name and zodiac as query parameters

    // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY';

    // Create a prompt based on user input
    const prompt = `Generate a horoscope for ${name} with zodiac sign ${zodiac}.`;

    try {
        // Make an API request to OpenAI
        const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 50 // Adjust the token limit as needed
            })
        });

        // Check if the response status is OK
        if (response.ok) {
            // Extract the generated horoscope from the response
            const data = await response.json();
            const generatedHoroscope = data.choices[0].text;

            // Return the generated horoscope as JSON
            res.status(200).json({ horoscope: generatedHoroscope });
        } else {
            console.error('Error generating horoscope:', response.statusText);
            // Handle errors gracefully
            res.status(500).json({ error: 'Failed to generate a horoscope' });
        }
    } catch (error) {
        console.error('Error generating horoscope:', error);
        // Handle errors gracefully
        res.status(500).json({ error: 'Failed to generate a horoscope' });
    }
};
