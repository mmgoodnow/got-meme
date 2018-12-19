import * as express from "express";
import ImageSearch from "./Search";

class App {
	public express;

	constructor() {
		this.express = express();
		this.mountRoutes();
	}

	private mountRoutes(): void {
		const router = express.Router();
		let slackImage = this.slackImage.bind(this);
		let slackMeme = this.slackMeme.bind(this);
		router.get("/image", slackImage);
		router.get("/meme", slackMeme);
		router.post("/image", slackImage);
		router.post("/meme", slackMeme);

		this.express.use("/got-meme", router);
	}

	async findImage(query: string) {
		return await ImageSearch.searchImage(query);
	}

	async slackImage(req, res) {
		let results = await this.findImage(req.query["q"]);
		res.send(results[0].contentUrl);
	}

	async slackMeme(req, res) {
		let results = await this.findImage(req.query["q"] + " meme");
		//let confirmedMeme = results.find(result => result.hostPageUrl.includes("knowyourmeme.com"));
		res.send(results[0].contentUrl);
	}
}

export default new App().express;
