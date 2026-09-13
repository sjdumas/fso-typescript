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

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis["code"]>;
}

export const HealthCheckRating = {
	Healthy: 0,
	LowRisk: 1,
	HighRisk: 2,
	CriticalRisk: 3,
} as const;

export type HealthCheckRating = (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

interface Discharge {
	date: string;
	criteria: string;
}

interface HospitalEntry extends BaseEntry {
	type: "Hospital";
	discharge: Discharge;
}

interface SickLeave {
	startDate: string;
	endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: SickLeave;
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

// Special Omit for unions, since a plain Omit collapses to only shared fields
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, "id">;

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

const BaseEntrySchema = z.object({
	description: z.string(),
	date: z.iso.date(),
	specialist: z.string(),
	diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckRatingSchema = z.union([
	z.literal(HealthCheckRating.Healthy),
	z.literal(HealthCheckRating.LowRisk),
	z.literal(HealthCheckRating.HighRisk),
	z.literal(HealthCheckRating.CriticalRisk),
]);

const HealthCheckEntrySchema = BaseEntrySchema.extend({
	type: z.literal("HealthCheck"),
	healthCheckRating: HealthCheckRatingSchema,
});

const DischargeSchema = z.object({
	date: z.iso.date(),
	criteria: z.string(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
	type: z.literal("Hospital"),
	discharge: DischargeSchema,
});

const SickLeaveSchema = z.object({
	startDate: z.iso.date(),
	endDate: z.iso.date(),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
	type: z.literal("OccupationalHealthcare"),
	employerName: z.string(),
	sickLeave: SickLeaveSchema.optional(),
});

export const NewEntrySchema = z.discriminatedUnion("type", [
	HospitalEntrySchema,
	OccupationalHealthcareEntrySchema,
	HealthCheckEntrySchema,
]);
