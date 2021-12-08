const fs = require("fs");
const superagent = require("superagent");

//   ---  promisse in superagent only  ---
// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
// 	if (err) console.log(err);
// 	superagent
// 		.get(`https://dog.ceo/api/breed/${data}/images/random`)
// 		.then((data) =>
// 			fs.writeFile(`${__dirname}/dogImage.txt`, data.body.message, (err) => {
// 				if (err) console.log(err.message);
// 				console.log("Update file with latest list..");
// 			})
// 		)
// 		.catch((err) => {
// 			if (err) console.log(err);
// 		});
// });

//   ---  take promisses to the next level   ---

const readFilePro = (file) => {
	return new Promise((resolve, rejects) => {
		fs.readFile(`${__dirname}/${file}`, (err, data) => {
			if (err) rejects(err);
			resolve(data);
		});
	});
};

const writeFilePro = (file, data) => {
	return new Promise((resolve, rejects) => {
		fs.writeFile(`${__dirname}/${file}`, data, (err) => {
			if (err) rejects(err);
			resolve("File Updated!!!");
		});
	});
};

readFilePro(`dog.txt`)
	.then((data) => {
		return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
	})
	.then((data) => {
		console.log(data.body.message);
		return writeFilePro(`dogImage.txt`, data.body.message);
	})
	.then((data) => console.log(data))
	.catch((err) => console.log(err));
