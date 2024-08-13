const express = require("express");
const app = express();
const cron = require("node-cron");

const futureDate = new Date("2024-12-31T23:59:59");

const generateCountdown = () => {
	const DateNow = new Date();

	const timeDifference = futureDate - DateNow;

	const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor(
		(timeDifference % (1000 * 60 * 60)) / (1000 * 60)
	);
	const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

	console.log(
		`Compte à rebours: ${days} jours, ${hours} heures, ${minutes} minutes, ${seconds} secondes`
	);
};

app.use(express.static("public"));

app.use((req, res, next) => {
	if (req.url.startsWith("/")) {
		console.log(`Image demandée: ${req.url}`);
	}
	next();
});

app.get("/", (req, res) => {
	res.send("Target reports sent successfully");
	generateCountdown();
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});

// cron.schedule("0/1 * * * * *", generateCountdown);
