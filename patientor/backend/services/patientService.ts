import { v1 as uuid } from "uuid";
import patientsData from "../data/patients";
import type { NewPatient, NonsensitivePatient, Patient, NewEntry, Entry } from "../types";

const patients: Patient[] = patientsData;

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

const addEntry = (patientId: string, entry: NewEntry): Entry | undefined => {
	const patient = findById(patientId);

	if (!patient) {
		return undefined;
	}

	const newEntry: Entry = {
		id: uuid(),
		...entry,
	} as Entry;

	patient.entries.push(newEntry);
	return newEntry;
};

export default {
	getEntries,
	getNonSensitiveEntries,
	findById,
	addPatient,
	addEntry,
};
