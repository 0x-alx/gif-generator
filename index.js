const express = require("express");
const {
	formatCountdownPartsPathsArray,
	generateGIF,
	remainingTimeCalculator,
	uploadToFirebaseStorage,
} = require("./utils");

const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(express.static("public"));
app.use("/healthcheck", require("./routes/healthcheck.routes"));

app.get("/", (_req, res, _next) => {
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
		console.log("📅 Today Date: ", new Date());
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

		//Formate le tableau des images paths en fonction du temps restant
		const countdownPartsPathsArray = await formatCountdownPartsPathsArray(
			remainingTime
		);

		//Génère les GIFs
		await generateGIF(countdownPartsPathsArray, "fr", process.env[key]);
		console.log("GIF FR generated successfully ✅");
		await generateGIF(countdownPartsPathsArray, "en", process.env[key]);
		console.log("GIF EN generated successfully ✅");
		await generateGIF(countdownPartsPathsArray, "es", process.env[key]);
		console.log("GIF ES generated successfully ✅");
		await generateGIF(countdownPartsPathsArray, "de", process.env[key]);
		console.log("GIF DE generated successfully ✅");
		await generateGIF(countdownPartsPathsArray, "it", process.env[key]);
		console.log("GIF IT generated successfully ✅");
		await generateGIF(countdownPartsPathsArray, "nl", process.env[key]);
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
			const countdownPartsPathsArray =
				await formatCountdownPartsPathsArray(remainingTime);

			await generateGIF(countdownPartsPathsArray, "fr", process.env[key]);
			console.log("GIF FR generated successfully ✅");
			await generateGIF(countdownPartsPathsArray, "en", process.env[key]);
			console.log("GIF EN generated successfully ✅");
			await generateGIF(countdownPartsPathsArray, "es", process.env[key]);
			console.log("GIF ES generated successfully ✅");
			await generateGIF(countdownPartsPathsArray, "de", process.env[key]);
			console.log("GIF DE generated successfully ✅");
			await generateGIF(countdownPartsPathsArray, "it", process.env[key]);
			console.log("GIF IT generated successfully ✅");
			await generateGIF(countdownPartsPathsArray, "nl", process.env[key]);
			console.log("GIF NL generated successfully ✅ \n");
		}
	}, 60000); // 60000 ms = 60 seconds
});
