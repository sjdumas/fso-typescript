import { z } from "zod";
import type { NewPatient } from "./types";
import { Gender } from "./types";

export const newPatientSchema = z.object({
	name: z.string(),
	dateOfBirth: z.iso.date(),
	ssn: z.string(),
	gender: z.enum(Gender),
	occupation: z.string(),
});

export const toNewPatient = (object: unknown): NewPatient => {
	return newPatientSchema.parse(object);
};
