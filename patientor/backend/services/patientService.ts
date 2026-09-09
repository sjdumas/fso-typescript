import { v1 as uuid } from "uuid";
import patientData from "../data/patients";
import type { NewPatient, NonsensitivePatient, Patient } from "../types";

const patients: Patient[] = patientData;

const getEntries = (): Patient[] => {
	return patients;
}

const getNonSensitiveEntries = (): NonsensitivePatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addPatient = (patient: NewPatient): Patient => {
	const newPatient = {
		id: uuid(),
		...patient,
	};

	patients.push(newPatient);
	return newPatient;
}

export default {
	getEntries,
	getNonSensitiveEntries,
	addPatient,
};
