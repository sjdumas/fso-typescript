import { z } from "zod";
import type { NewPatient, NewEntry } from "./types";
import { Gender, NewEntrySchema } from "./types";

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

export const toNewEntry = (object: unknown): NewEntry => {
	return NewEntrySchema.parse(object);
};
