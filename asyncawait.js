const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
	return new Promise((resolve, rejects) => {
		fs.readFile(`${__dirname}/${file}`, "utf-8", (err, data) => {
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

//   ---  with one api call  ---
// const getUpdatedList = () => {
// 	return new Promise(async (resolve, rejects) => {
// 		try {
// 			const readFile = await readFilePro(`dog.txt`);
// 			console.log(readFile);

// 			const updatedList = await superagent.get(`https://dog.ceo/api/breed/${readFile}/images/random`);
// 			console.log(updatedList.body.message);

// 			const writefile = await writeFilePro(`dogImage.txt`, updatedList.body.message);
// 			console.log(writefile);
// 		} catch (error) {
// 			console.log(error);

// 			rejects(error);
// 		}
// 		resolve("Ready 🐶");
// 	});
// };

//   ---  with many api call  ---
const getUpdatedList = () => {
	return new Promise(async (resolve, rejects) => {
		try {
			const readFile = await readFilePro(`dog.txt`);
			console.log(readFile);

			const api1 = await superagent.get(`https://dog.ceo/api/breed/${readFile}/images/random`);
			const api2 = await superagent.get(`https://dog.ceo/api/breed/${readFile}/images/random`);
			const api3 = await superagent.get(`https://dog.ceo/api/breed/${readFile}/images/random`);

			const apis = Promise.all([api1, api2, api3]);

			const updatedList = (await apis).map((el) => el.body.message);

			console.log(updatedList);

			const writefile = await writeFilePro(`dogImage.txt`, updatedList.join("\n"));
			console.log(writefile);
		} catch (error) {
			console.log(error);

			rejects(error);
		}
		resolve("Ready 🐶");
	});
};
(async () => {
	try {
		console.log("1 log run");
		const x = await getUpdatedList();
		console.log(x);
		console.log("2 log run");
	} catch {
		(err) => {
			if (err) console.log("Error 💥💥💥");
		};
	}
})();

// console.log("1 log run");
// getUpdatedList()
// 	.then((d) => {
// 		console.log(d);
// 		console.log("2 log run");
// 	})
// 	.catch((err) => {
// 		if (err) console.log("Error 💥💥💥");
// 	});
