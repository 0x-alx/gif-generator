const express = require("express");
const app = express();
const fs = require("fs");
const sharp = require("sharp");
const GIFEncoder = require("gifencoder");
const { createCanvas, loadImage } = require("canvas");
const path = require("path");

const futureDate = new Date("2024-08-31T23:59:59");

const imageList = [
	{ id: "00", image: "public/countdown-parts/00.png" },
	{ id: "01", image: "public/countdown-parts/01.png" },
	{ id: "02", image: "public/countdown-parts/02.png" },
	{ id: "03", image: "public/countdown-parts/03.png" },
	{ id: "04", image: "public/countdown-parts/04.png" },
	{ id: "05", image: "public/countdown-parts/05.png" },
	{ id: "06", image: "public/countdown-parts/06.png" },
	{ id: "07", image: "public/countdown-parts/07.png" },
	{ id: "08", image: "public/countdown-parts/08.png" },
	{ id: "09", image: "public/countdown-parts/09.png" },
	{ id: "10", image: "public/countdown-parts/10.png" },
	{ id: "11", image: "public/countdown-parts/11.png" },
	{ id: "12", image: "public/countdown-parts/12.png" },
	{ id: "13", image: "public/countdown-parts/13.png" },
	{ id: "14", image: "public/countdown-parts/14.png" },
	{ id: "15", image: "public/countdown-parts/15.png" },
	{ id: "16", image: "public/countdown-parts/16.png" },
	{ id: "17", image: "public/countdown-parts/17.png" },
	{ id: "18", image: "public/countdown-parts/18.png" },
	{ id: "19", image: "public/countdown-parts/19.png" },
	{ id: "20", image: "public/countdown-parts/20.png" },
	{ id: "21", image: "public/countdown-parts/21.png" },
	{ id: "22", image: "public/countdown-parts/22.png" },
	{ id: "23", image: "public/countdown-parts/23.png" },
	{ id: "24", image: "public/countdown-parts/24.png" },
	{ id: "25", image: "public/countdown-parts/25.png" },
	{ id: "26", image: "public/countdown-parts/26.png" },
	{ id: "27", image: "public/countdown-parts/27.png" },
	{ id: "28", image: "public/countdown-parts/28.png" },
	{ id: "29", image: "public/countdown-parts/29.png" },
	{ id: "30", image: "public/countdown-parts/30.png" },
	{ id: "31", image: "public/countdown-parts/31.png" },
	{ id: "32", image: "public/countdown-parts/32.png" },
	{ id: "33", image: "public/countdown-parts/33.png" },
	{ id: "34", image: "public/countdown-parts/34.png" },
	{ id: "35", image: "public/countdown-parts/35.png" },
	{ id: "36", image: "public/countdown-parts/36.png" },
	{ id: "37", image: "public/countdown-parts/37.png" },
	{ id: "38", image: "public/countdown-parts/38.png" },
	{ id: "39", image: "public/countdown-parts/39.png" },
	{ id: "40", image: "public/countdown-parts/40.png" },
	{ id: "41", image: "public/countdown-parts/41.png" },
	{ id: "42", image: "public/countdown-parts/42.png" },
	{ id: "43", image: "public/countdown-parts/43.png" },
	{ id: "44", image: "public/countdown-parts/44.png" },
	{ id: "45", image: "public/countdown-parts/45.png" },
	{ id: "46", image: "public/countdown-parts/46.png" },
	{ id: "47", image: "public/countdown-parts/47.png" },
	{ id: "48", image: "public/countdown-parts/48.png" },
	{ id: "49", image: "public/countdown-parts/49.png" },
	{ id: "50", image: "public/countdown-parts/50.png" },
	{ id: "51", image: "public/countdown-parts/51.png" },
	{ id: "52", image: "public/countdown-parts/52.png" },
	{ id: "53", image: "public/countdown-parts/53.png" },
	{ id: "54", image: "public/countdown-parts/54.png" },
	{ id: "55", image: "public/countdown-parts/55.png" },
	{ id: "56", image: "public/countdown-parts/56.png" },
	{ id: "57", image: "public/countdown-parts/57.png" },
	{ id: "58", image: "public/countdown-parts/58.png" },
	{ id: "59", image: "public/countdown-parts/59.png" },
];

const generateImage = async (time) => {
	const timeArray = [];
	for (let i = 0; i <= 30; i++) {
		const currentTime = {
			days: time.days.toString().padStart(2, "0"),
			hours: time.hours.toString().padStart(2, "0"),
			minutes: time.minutes.toString().padStart(2, "0"),
			seconds: (time.seconds - i).toString().padStart(2, "0"),
		};
		if (parseInt(currentTime.seconds) < 0) {
			currentTime.seconds = (parseInt(currentTime.seconds) + 60)
				.toString()
				.padStart(2, "0");
			currentTime.minutes = (parseInt(currentTime.minutes) - 1)
				.toString()
				.padStart(2, "0");
		}
		if (parseInt(currentTime.minutes) < 0) {
			currentTime.minutes = (parseInt(currentTime.minutes) + 60)
				.toString()
				.padStart(2, "0");
			currentTime.hours = (parseInt(currentTime.hours) - 1)
				.toString()
				.padStart(2, "0");
		}
		if (parseInt(currentTime.hours) < 0) {
			currentTime.hours = (parseInt(currentTime.hours) + 24)
				.toString()
				.padStart(2, "0");
			currentTime.days = (parseInt(currentTime.days) - 1)
				.toString()
				.padStart(2, "0");
		}
		timeArray.push(currentTime);
	}

	const formatTimeArray = () => {
		return timeArray.map(
			(time, index) =>
				`${time.days}${time.hours}${time.minutes}${time.seconds}`
		);
	};
	const formattedTimeArray = formatTimeArray().map((time) =>
		time.match(/.{1,2}/g)
	);

	let pathBundle = [];
	let imagePaths = [];
	let counter = 0;

	const images = formattedTimeArray.map((subArray) => {
		return subArray.map((id) => {
			const imageObj = imageList.find((item) => item.id === id);
			return imageObj ? imageObj.image : null;
		});
	});

	console.log(images);

	// formattedTimeArray.map((time) =>
	// 	time.map((itemq) => {
	// 		if (counter < 4) {
	// 			pathBundle.push(
	// 				imageList.find((item) => item.id === itemq)?.image
	// 			);

	// 			counter++;
	// 		} else {
	// 			imagePaths.push(pathBundle);
	// 			pathBundle = [];
	// 			counter = 0;
	// 		}
	// 	})
	// );

	await generate(images);
};

const generate = async (imagePaths) => {
	await Promise.all(
		imagePaths.map(async (paths, index) => {
			await sharp({
				create: {
					width: 9000,
					height: 1300,
					channels: 3,
					background: { r: 255, g: 255, b: 255 },
				},
			})
				.composite(
					paths.map((image, index) => ({
						input: image,
						left: 900 * index,
						top: 0,
						width: 900,
						height: 1300,
					}))
				)
				.toFormat("png", { quality: 100 })
				.toBuffer()
				.then((buffer) => {
					fs.writeFileSync(`public/output-${index}.png`, buffer);
				});
		})
	);
	await generateGif();
};

const generateGif = async () => {
	console.log("Generating gif");
	const encoder = new GIFEncoder(9000, 1300);
	const canvas = createCanvas(9000, 1300);
	const ctx = canvas.getContext("2d");
	console.log("Step 1");
	encoder.start();
	encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
	encoder.setDelay(1000); // frame delay in ms
	encoder.setQuality(10); // image quality, 10 is default
	console.log("Step 2");
	for (let i = 0; i < 24; i++) {
		const imagePath = path.join(__dirname, `public/output-${i}.png`);
		console.log(imagePath);
		const img = await loadImage(imagePath);
		ctx.drawImage(img, 0, 0, 9000, 1300);
		encoder.addFrame(ctx);
	}
	console.log("Step 3");
	encoder.finish();

	const buffer = encoder.out.getData();
	fs.writeFileSync("public/output.gif", buffer);
	console.log("Gif generated");
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

	return { days, hours, minutes, seconds };
};

// app.use((req, res, next) => {
// 	if (req.url === "/output.gif") {
// 		const time = generateCountdown();
// 		generateImage(time);
// 	}
// 	next();
// });

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.send("Target reports sent successfully");
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
	setInterval(() => {
		const time = generateCountdown();
		generateImage(time);
	}, 300000); // 60000 ms = 60 seconds
});

// cron.schedule("0/1 * * * * *", generateCountdown);
