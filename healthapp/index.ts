import express from "express";
import { calculateBmi } from "./bmiCalculator.js";
import { calculateExercises } from "./exerciseCalculator.js";

const app = express();
app.use(express.json());

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
		return res.status(400).json({ error: "malformatted parameters" });
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

app.post("/exercises", (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
	const body: any = req.body;

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target } = body;

	if (daily_exercises === undefined || target === undefined) {
		return res.status(400).json({ error: "parameters missing" });
	}

	if (!Array.isArray(daily_exercises)) {
		return res.status(400).json({ error: "malformatted parameters" });
	}

	const hoursAreNumbers = daily_exercises.every(
		(h) => typeof h === "number" || (!isNaN(Number(h)) && h !== "" && h !== null)
	);

	if (!hoursAreNumbers || isNaN(Number(target))) {
		return res.status(400).json({ error: "malformatted parameters" });
	}

	const hours: number[] = daily_exercises.map((h) => Number(h));
	const targetNumber = Number(target);

	const result = calculateExercises(hours, targetNumber);
	return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} at http://localhost:${PORT}`);
});
