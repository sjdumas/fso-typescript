import diagnosisData from "../data/diagnoses";
import type { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = diagnosisData;

const getEntries = (): Diagnosis[] => {
	return diagnoses;
};

export default {
	getEntries,
};
