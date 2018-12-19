import * as express from "express";
import * as bodyParser from "body-parser";
import ImageSearch from "./Search";
import * as debugPkg from "debug";

const debug = debugPkg("got-meme");

class App {
	public express;

	constructor() {
		this.express = express();
		this.express.use(bodyParser.urlencoded({ extended: true }));
		this.mountRoutes();
	}

	private mountRoutes(): void {
		const router = express.Router();
		let recieve = this.recieveRequest.bind(this);
		router.post("/image", recieve);
		router.post("/meme", recieve);

		this.express.use("/got-meme", router);
	}

	async findImage(query: string) {
		return await ImageSearch.searchImage(query);
	}

	async recieveRequest(req, res) {
		debug("body", req.body);
		let query = req.body.text;
		let command = req.body.command;
		if (!query) {
			res.send("Please provide some text to search.");
			return;
		}
		if (command === "/meme") {
			query += " meme";
		}
		let results = await this.findImage(query);
		let msg = this.formatMsg(req.body.text, results[0].contentUrl);
		res.setHeader("Content-Type", "application/json");
		res.send(msg);
	}

	formatMsg(query: string, url: string) {
		let body = {
			response_type: "in_channel",
			attachments: [
				{
					image_url: url,
					title: query,
				},
			],
		};
		return body;
	}
}

export default new App().express;
