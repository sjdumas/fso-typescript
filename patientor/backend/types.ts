import { z } from "zod";

export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export const Gender = {
	Male: "male",
	Female: "female",
	Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
	entries: Entry[];
}

export type NonsensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id" | "entries">;

export const NewPatientSchema = z.object({
	name: z.string(),
	dateOfBirth: z.iso.date(),
	ssn: z.string(),
	gender: z.enum(Gender),
	occupation: z.string(),
});
