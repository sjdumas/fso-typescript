import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";

const app = express();

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
	const { height, weight } = req.query;

	if (
		!height ||
		!weight ||
		typeof height !== "string" ||
		typeof weight !== "string" ||
		isNaN(Number(height)) ||
		isNaN(Number(weight))
	) {
		return res.status(400).json( { error: "malformatted parameters" });
	}

	const heightNumber = Number(height);
	const weightNumber = Number(weight);
	const bmi = calculateBmi(heightNumber, weightNumber);

	return res.json({
		weight: weightNumber,
		height: heightNumber,
		bmi,
	});
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} at http://localhost:${PORT}`);
});
