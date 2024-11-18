const axios = require("axios");

async function copilot(prompt) {
    const url = "https://copilot.asadmemon.com/api/autocomplete";
    const data = {
     prefix: prompt,
     suffix: "",
     language: prompt,
     model: "gpt-4-1106-preview",
    };
    const headers = {
     "Content-Type": "application/json",
    };
    const { data: res } = await axios.post(url, data, { headers });
    return res;
   }

   module.exports = {
    copilot
   }