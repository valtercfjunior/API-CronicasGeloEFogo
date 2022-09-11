const fetchURL = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

function getImage(isbn, callback) {
	const URL = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
	fetchURL(URL)
		.then((response) => response.url)
		.then((url) => {
			const base64 = Buffer.from(url, "utf8").toString("base64");
			callback(base64);
		});
}

module.exports = getImage;
