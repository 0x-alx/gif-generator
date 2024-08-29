const express = require("express");
const app = express();
const { generateImage, generate, remainingTimeCalculator } = require("./utils");

const dotenv = require("dotenv");

dotenv.config();

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.send("Connected to the server");
});

app.listen(3000, async () => {
	const countdownKeys = Object.keys(process.env).filter((key) =>
		key.startsWith("COUNTDOWN_")
	);
	for (const key of countdownKeys) {
		const remainingTime = remainingTimeCalculator(
			new Date(process.env[key])
		);
		console.log(
			"-----------------------------------------------------------"
		);
		console.log("🔑 Key: ", key);
		console.log("📅 Today Date: ", new Date()); // Affiche la date actuelle
		console.log("🎯 Target Date: ", new Date(process.env[key]));
		console.log(
			"⏱️  Remaining Time: ",
			remainingTime.days +
				"D " +
				remainingTime.hours +
				"H " +
				remainingTime.minutes +
				"M " +
				remainingTime.seconds +
				"S"
		);
		console.log(
			"-----------------------------------------------------------"
		);

		//Génère l'image
		const images = await generateImage(remainingTime);

		await generate(images, "fr", process.env[key]);
		console.log("GIF FR generated successfully ✅");
		await generate(images, "en", process.env[key]);
		console.log("GIF EN generated successfully ✅");
		await generate(images, "es", process.env[key]);
		console.log("GIF ES generated successfully ✅");
		await generate(images, "de", process.env[key]);
		console.log("GIF DE generated successfully ✅");
		await generate(images, "it", process.env[key]);
		console.log("GIF IT generated successfully ✅");
		await generate(images, "nl", process.env[key]);
		console.log("GIF NL generated successfully ✅ \n");
	}

	//Permet de relancer le script toutes les 60 secondes
	setInterval(async () => {
		for (const key of countdownKeys) {
			const remainingTime = remainingTimeCalculator(
				new Date(process.env[key])
			);

			console.log(
				"-----------------------------------------------------------"
			);
			console.log("🔑 Key: ", key);
			console.log("📅 Today Date: ", new Date()); // Affiche la date actuelle
			console.log("🎯 Target Date: ", new Date(process.env[key]));
			console.log(
				"⏱️  Remaining Time: ",
				remainingTime.days +
					"D " +
					remainingTime.hours +
					"H " +
					remainingTime.minutes +
					"M " +
					remainingTime.seconds +
					"S"
			);

			console.log(
				"-----------------------------------------------------------"
			);

			//Génère l'image
			const images = await generateImage(remainingTime);

			await generate(images, "fr", process.env[key]);
			console.log("GIF FR generated successfully ✅");
			await generate(images, "en", process.env[key]);
			console.log("GIF EN generated successfully ✅");
			await generate(images, "es", process.env[key]);
			console.log("GIF ES generated successfully ✅");
			await generate(images, "de", process.env[key]);
			console.log("GIF DE generated successfully ✅");
			await generate(images, "it", process.env[key]);
			console.log("GIF IT generated successfully ✅");
			await generate(images, "nl", process.env[key]);
			console.log("GIF NL generated successfully ✅ \n");
		}
	}, 60000); // 60000 ms = 60 seconds
});
