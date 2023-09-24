// horoscope.js
const { createApi } = require('openai');

const openai = createApi({
  key: process.env.OPENAI_API_KEY, // Set your OpenAI API key as an environment variable
  endpoint: 'https://api.openai.com', // Use the OpenAI API endpoint
});


document.getElementById("submit-btn").addEventListener('click',()=>{
    const name = document.getElementById('name').value;
    const zodiac = document.getElementById('zodiac').value;
   const result = getHoroscope(name, zodiac);
   console.log(result)
document.getElementById('horoscopeResult').innerText = result;
})

// module.exports = async (req, res) => {
//   const { name, zodiac } = req.query;
export async function getHoroscope (name, zodiac) {
  // Create a prompt based on user input
  const prompt = `Generate a horoscope for ${name} with zodiac sign ${zodiac}.`;

  try {
    // Make an API request to ChatGPT
    const response = await openai.createCompletion({
      prompt,
      max_tokens: 50, // Adjust the token limit as needed
    });

    // Extract the generated horoscope from the response
    const generatedHoroscope = response.choices[0].text;

    // Return the generated horoscope as JSON
    // res.status(200).json({ horoscope: generatedHoroscope });
    return generatedHoroscope;
  } catch (error) {
    console.error('Error generating horoscope:', error);
    // Handle errors gracefully
    // res.status(500).json({ error: 'Failed to generate a horoscope' });

    alert('Unable to generate horoscope');
    return;
  }


};
