import fetch from "node-fetch";

export default class ImageSearch {
	static url: string =
		"https://eastus.api.cognitive.microsoft.com/bing/v7.0/images/search";
	static async searchImage(query: string) {
		try {
			// Fetches Items from Google Image Search URL
			let response = await fetch(
				`${this.url}?q=${encodeURIComponent(query)}`,
				{
					method: "GET",
					headers: {
						"Ocp-Apim-Subscription-Key": process.env.APIKEY,
					},
				}
			);
			let json: any = await response.json();
			return json.value;
		} catch (e) {
			console.error(`Failed to search images for ${query}, got ${e}`);
		}
	}
}
