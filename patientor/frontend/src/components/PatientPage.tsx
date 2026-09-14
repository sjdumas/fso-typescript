import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Divider } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Patient, Gender, Entry, Diagnosis, HealthCheckRating } from "../types";
import AddEntryForm from "./AddEntryForm";
import patientService from "../services/patients";

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const healthCheckColor = (rating: HealthCheckRating) => {
	switch (rating) {
		case HealthCheckRating.Healthy:
			return "green";
		case HealthCheckRating.LowRisk:
			return "yellow";
		case HealthCheckRating.HighRisk:
			return "orange";
		case HealthCheckRating.CriticalRisk:
			return "red";
		default:
			return assertNever(rating);
	}
};

interface EntryDetailsProps {
	entry: Entry;
	diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
	const findDiagnosis = (code: string) => {
		return diagnoses.find((d) => d.code === code);
	};

	const diagnosisList = (
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
	);

	switch (entry.type) {
		case "Hospital":
			return (
				<div style={{ border: "1px solid black", borderRadius: "5px", padding: "0.5em", marginBottom: "0.5em" }}>
					<Typography>{entry.date} <LocalHospitalIcon /></Typography>
					<Typography style={{ fontStyle: "italic" }}>{entry.description}</Typography>
					{diagnosisList}
					<Typography>
						discharge: {entry.discharge.date} - {entry.discharge.criteria}
					</Typography>
					<Typography>specialist: {entry.specialist}</Typography>
				</div>
			);
		case "OccupationalHealthcare":
			return (
				<div style={{ border: "1px solid black", borderRadius: "5px", padding: "0.5em", marginBottom: "0.5em" }}>
					<Typography>{entry.date} <WorkIcon /> {entry.employerName}</Typography>
					<Typography style={{ fontStyle: "italic" }}>{entry.description}</Typography>
					{diagnosisList}
					{entry.sickLeave && (
						<Typography>
							sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
						</Typography>
					)}
					<Typography>specialist: {entry.specialist}</Typography>
				</div>
			);
		case "HealthCheck":
			return (
				<div style={{ border: "1px solid black", borderRadius: "5px", padding: "0.5em", marginBottom: "0.5em" }}>
					<Typography>{entry.date} <MonitorHeartIcon /></Typography>
					<Typography style={{ fontStyle: "italic" }}>{entry.description}</Typography>
					{diagnosisList}
					<FavoriteIcon style={{ color: healthCheckColor(entry.healthCheckRating) }} />
					<Typography>specialist: {entry.specialist}</Typography>
				</div>
			);
		default:
			return assertNever(entry);
	}
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

	const handleEntryAdded = (entry: Entry) => {
		setPatient((prev) => {
			if (!prev) return prev;
			return { ...prev, entries: prev.entries.concat(entry) };
		});
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
			{id && <AddEntryForm patientId={id} onEntryAdded={handleEntryAdded} />}
		</div>
	);
};

export default PatientPage;
