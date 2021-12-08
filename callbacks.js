const fs = require("fs");
const superagent = require("superagent");

fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
	if (err) console.log(err);
	superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, data) => {
		if (err) console.log(err);
		fs.writeFile(`${__dirname}/dogImage.txt`, data.body.message, (err) => {
			if (err) console.log(err.message);
			console.log("Update file with latest list..");
		});
	});
});
