import axios, { AxiosResponse } from "axios";

interface CloudflareAIResponse {
    // Define the response structure based on the chosen service
    output: string; // Example for Text Transform
}

export default defineEventHandler(async (event) => {
    if (event.method == "POST") {
        const body = await readFormData(event);
        if (!body || !body.get('model') || !body.get('input')) {
            return { error: "model and input are required" };
        }
        let model = body.get('model');
        let input = body.get('input');
        const apiKey = process.env.CLOUDFLARE_AI_KEY;
        const account_id = process.env.CLOUDFLARE_ACCOUNT_ID;
        const url = `https://api.cloudflare.com/client/v4/accounts/${account_id}/ai/run/${model}`; // Replace with specific URL


        const data = [
            {
                role: "system",
                content: "You are a friendly assistan that helps write stories",
            },
            {
                role: "user",
                content:
                    "Write a short story about a llama that goes on a journey to find an orange cloud ",
            },
        ];

        const options = {
            method: 'POST',
            url: url,
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
            data
        };
        console.log(options);

        try {
            const response: AxiosResponse<CloudflareAIResponse> = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error("Error calling Cloudflare AI:", error);
            return { error: "An error occurred" };
        }
    }
    return "URL is working";

});
