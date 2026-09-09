import express from "express";
import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import patientService from "../services/patientService";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
	res.send(patientService.getNonSensitiveEntries());
});

router.post("/", (req: Request, res: Response, next: NextFunction) => {
	try {
		const newPatient = toNewPatient(req.body);
		const addedPatient = patientService.addPatient(newPatient);

		res.json(addedPatient);
	} catch (error: unknown) {
		next(error);
	}
});

router.use((error: unknown, _req: Request, res: Response, next: NextFunction) => {
	if (error instanceof z.ZodError) {
		res.status(400).send("Something went wrong. Error: " + error.issues.map((i) => i.message).join(", "));
	} else {
		next(error);
	}
});

export default router;
