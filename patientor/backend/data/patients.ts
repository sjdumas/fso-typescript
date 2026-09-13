import type { Patient } from "../types";
import { HealthCheckRating } from "../types";

const patients: Patient[] = [
	{
		id: "d2773336-f723-11e9-8f0b-362b9e155667",
		name: "John McClane",
		dateOfBirth: "1986-07-09",
		ssn: "090786-122X",
		gender: "male",
		occupation: "New york city cop",
		entries: [
			{
				id: "d811e46d-70b3-4d90-b090-4535c7cf8fb1",
				date: "2015-01-02",
				type: "Hospital",
				specialist: "MD House",
				diagnosisCodes: ["S62.5"],
				description:
					"Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
				discharge: {
					date: "2015-01-16",
					criteria: "Thumb has healed.",
				},
			},
			{
				id: "a3f8c2b1-1234-4d90-b090-4535c7cf8fb2",
				date: "2020-06-10",
				type: "HealthCheck",
				specialist: "MD House",
				description: "Routine annual checkup.",
				healthCheckRating: HealthCheckRating.LowRisk,
			},
		],
	},
	{
		id: "d2773598-f723-11e9-8f0b-362b9e155667",
		name: "Martin Riggs",
		dateOfBirth: "1979-01-30",
		ssn: "300179-77A",
		gender: "male",
		occupation: "Cop",
		entries: [
			{
				id: "fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62",
				date: "2019-08-05",
				type: "OccupationalHealthcare",
				specialist: "MD House",
				employerName: "HyPD",
				diagnosisCodes: ["Z57.1", "Z74.3", "M51.2"],
				description:
					"Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning.",
				sickLeave: {
					startDate: "2019-08-05",
					endDate: "2019-08-28",
				},
			},
			{
				id: "b7e2a9c0-5678-4d90-b090-4535c7cf8fb3",
				date: "2021-11-02",
				type: "OccupationalHealthcare",
				specialist: "MD House",
				employerName: "HyPD",
				description: "Routine workplace physical, no leave needed.",
			},
		],
	},
	{
		id: "d27736ec-f723-11e9-8f0b-362b9e155667",
		name: "Hans Gruber",
		dateOfBirth: "1970-04-25",
		ssn: "250470-555L",
		gender: "other",
		occupation: "Technician",
		entries: [
			{
				id: "b4c56cf4-d0f0-4b3f-8b3a-9a5c25e56d3f",
				date: "2021-03-14",
				type: "HealthCheck",
				specialist: "MD House",
				description: "Routine annual checkup.",
				healthCheckRating: HealthCheckRating.Healthy,
			},
			{
				id: "c9d1e4f2-8901-4d90-b090-4535c7cf8fb4",
				date: "2022-09-20",
				type: "HealthCheck",
				specialist: "MD House",
				description: "Follow-up checkup after minor incident.",
				healthCheckRating: HealthCheckRating.CriticalRisk,
			},
			{
				id: "e5f6a7b8-2345-4d90-b090-4535c7cf8fb5",
				date: "2023-02-11",
				type: "Hospital",
				specialist: "MD House",
				diagnosisCodes: ["H54.7"],
				description: "Fell off a skyscraper. Miraculously survived.",
				discharge: {
					date: "2023-03-01",
					criteria: "Fully recovered, cleared for duty.",
				},
			},
		],
	},
	{
		id: "d2773822-f723-11e9-8f0b-362b9e155667",
		name: "Dana Scully",
		dateOfBirth: "1974-01-05",
		ssn: "050174-432N",
		gender: "female",
		occupation: "Forensic Pathologist",
		entries: [],
	},
	{
		id: "d2773c6e-f723-11e9-8f0b-362b9e155667",
		name: "Matti Luukkainen",
		dateOfBirth: "1971-04-09",
		ssn: "090471-8890",
		gender: "male",
		occupation: "Digital evangelist",
		entries: [],
	},
];

export default patients;
