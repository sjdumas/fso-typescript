import { v1 as uuid } from "uuid";
import patientsData from "../data/patients";
import type { NewPatient, NonsensitivePatient, Patient } from "../types";

const patients: Patient[] = patientsData.map((patient) => ({
	...patient,
	entries: [],
}));

const getEntries = (): Patient[] => {
	return patients;
};

const getNonSensitiveEntries = (): NonsensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const findById = (id: string): Patient | undefined => {
	return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
	const newPatient: Patient = {
		id: uuid(),
		...patient,
		entries: [],
	};

	patients.push(newPatient);
	return newPatient;
};

export default {
	getEntries,
	getNonSensitiveEntries,
	findById,
	addPatient,
};
