const express = require("express");
const app = express();
const fs = require("fs");
const sharp = require("sharp");

const futureDate = new Date("2024-08-31T23:59:59");

const imageList = [
	{ id: "1", image: "public/countdown-parts/1.webp" },
	{ id: "2", image: "public/countdown-parts/2.webp" },
	{ id: "3", image: "public/countdown-parts/3.webp" },
	{ id: "4", image: "public/countdown-parts/4.webp" },
	{ id: "5", image: "public/countdown-parts/5.webp" },
	{ id: "6", image: "public/countdown-parts/6.webp" },
	{ id: "7", image: "public/countdown-parts/7.webp" },
	{ id: "8", image: "public/countdown-parts/8.webp" },
	{ id: "9", image: "public/countdown-parts/9.webp" },
];

const generateImage = async (time) => {
	console.log(time);
	const emptyImage = await sharp({
		create: {
			width: 9000,
			height: 1300,
			channels: 3,
			background: { r: 255, g: 255, b: 255 },
		},
	})
		.composite(
			time.map((image, index) => ({
				input: imageList.find((item) => item.id === image)?.image,
				left: index * 900,
				top: 0,
				width: 900,
				height: 10,
			}))
		)
		.toFile("public/output.webp", (err, info) => {
			console.log(info);
		})
		.toFormat("webp", { quality: 100 })
		.toBuffer();
};

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

	return `${days}${hours}${minutes}${seconds}`.split("");
};

app.use((req, res, next) => {
	if (req.url === "/output.webp") {
		const time = generateCountdown();
		generateImage(time);
	}
	next();
});

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.send("Target reports sent successfully");
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});

// cron.schedule("0/1 * * * * *", generateCountdown);
