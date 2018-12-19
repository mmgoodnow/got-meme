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
		router.get("/image", this.slackImage.bind(this));
		router.get("/meme", this.slackMeme.bind(this));
		this.express.use("/", router);
	}

	async findImage(query: string) {
		return await ImageSearch.searchImage(query);
	}

	async slackImage(req, res) {
		let results = await this.findImage(req.query["q"]);
		res.send(
			`<a href=${results[0].contentUrl}>${results[0].contentUrl}</a>`
		);
	}

	async slackMeme(req, res) {
		let results = await this.findImage(req.query["q"] + " meme");
		//let confirmedMeme = results.find(result => result.hostPageUrl.includes("knowyourmeme.com"));
		res.send(
			`<a href=${results[0].contentUrl}>${results[0].contentUrl}</a>`
		);
	}
}

export default new App().express;
