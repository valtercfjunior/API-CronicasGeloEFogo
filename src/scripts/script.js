const Book = require("../models/books");
const Character = require("../models/characters");
const getImage = require("./getImage");

const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function abasteceDB() {
	fetch("https://www.anapioficeandfire.com/api/books")
		.then((response) => response.json())
		.then((data) => {
			data.forEach(async (element) => {
				const povCharactersNames = await element.povCharacters.reduce(
					async (charactersPromise, url) => {
						const names = await charactersPromise;
						const namesReq = await fetch(url);
						const namesParse = await namesReq.json();

						const charactersArray = [...names, namesParse.name];
						return charactersArray;
					},
					[]
				);
				getImage(element.isbn, (capaBase64) => {
					Book.insertMany({
						name: element.name,
						isbn: element.isbn,
						cover: capaBase64,
						numberOfPages: element.numberOfPages,
						povCharacters: povCharactersNames,
					});
				});
			});
		});

	let continueFetching = true;
	let pages = 0;

	while (continueFetching) {
		const response = await fetch(
			`https://www.anapioficeandfire.com/api/characters?page=${pages}&pageSize=50`
		);

		const responseJson = await response.json();

		if (responseJson.length == 0) {
			continueFetching = false;
		}

		responseJson.forEach(async (element) => {
			if (element.povBooks.length > 0) {
				const povBooksNames = await element.povBooks.reduce(
					async (namesPromise, url) => {
						const names = await namesPromise;
						const povbooksreq = await fetch(url);
						const povbookparse = await povbooksreq.json();

						const booksArray = [...names, povbookparse.name];
						return booksArray;
					},
					[]
				);

				Character.insertMany({
					name: element.name,
					gender: element.gender,
					culture: element.culture,
					born: element.born,
					titles: element.titles,
					aliases: element.aliases,
					povBooks: povBooksNames,
				});
			}
		});
		pages++;
	}
	return `OK`;
}
(async () => {
	const dados = await abasteceDB();
})();
