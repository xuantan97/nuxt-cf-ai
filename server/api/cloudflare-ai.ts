import axios, { AxiosResponse } from "axios";

interface CloudflareAIResponse {
    // Define the response structure based on the chosen service
    output: string; // Example for Text Transform
}

export default defineEventHandler(async (event) => {
    if (event.method == "POST") {
        const body = await readBody(event);
        if (!body.model || !body.input) {
            return { error: "model and input are required" };
        }
        const apiKey = process.env.CLOUDFLARE_AI_KEY; // Your API key
        const url = "https://api.cloudflare.com/v1/<model>/<input>"; // Replace with specific URL

        const data: { input: string } = { // Your data for the API call
            input: "your input text",
        };

        const headers = {
            Authorization: `Bearer ${apiKey}`,
        };

        try {
            const response: AxiosResponse<CloudflareAIResponse> = await axios.post(url, data, { headers });
            return response.data;
        } catch (error) {
            console.error("Error calling Cloudflare AI:", error);
            return { error: "An error occurred" };
        }
    }
    return 1;

});
