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

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: string;
	occupation: string;
}

export type NonsensitivePatient = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;
