import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Divider } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Patient, Gender, Entry, Diagnosis } from "../types";
import patientService from "../services/patients";

interface EntryDetailsProps {
	entry: Entry;
	diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
	const findDiagnosis = (code: string) => {
		return diagnoses.find((d) => d.code === code);
	};

	return (
		<div style={{ border: "1px solid black", borderRadius: "5px", padding: "0.5em", marginBottom: "0.5em" }}>
			<Typography>{entry.date} {entry.description}</Typography>
			<ul>
				{entry.diagnosisCodes?.map((code) => {
					const diagnosis = findDiagnosis(code);
					return (
						<li key={code}>
							{code} {diagnosis ? diagnosis.name : ""}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

interface PatientPageProps {
	diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
	const { id } = useParams<{ id: string }>();
	const [patient, setPatient] = useState<Patient | null>(null);

	useEffect(() => {
		const fetchPatient = async () => {
			if (id) {
				const fetchedPatient = await patientService.getById(id);
				setPatient(fetchedPatient);
			}
		};
		void fetchPatient();
	}, [id]);

	if (!patient) {
		return <div>loading...</div>;
	}

	const genderIcon = () => {
		switch (patient.gender) {
			case Gender.Male:
				return <MaleIcon />;
			case Gender.Female:
				return <FemaleIcon />;
			case Gender.Other:
				return <TransgenderIcon />;
			default:
				return null;
		}
	};

	return (
		<div>
			<Typography variant="h4" sx={{ marginBottom: "0.5em" }}>
				{patient.name} {genderIcon()}
			</Typography>
			<Typography>ssn: {patient.ssn}</Typography>
			<Typography>date of birth: {patient.dateOfBirth}</Typography>
			<Typography>occupation: {patient.occupation}</Typography>
			<Divider sx={{ marginY: 2 }} />
			<Typography variant="h6">entries</Typography>
			{patient.entries.map((entry) => (
				<EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
			))}
		</div>
	);
};

export default PatientPage;
