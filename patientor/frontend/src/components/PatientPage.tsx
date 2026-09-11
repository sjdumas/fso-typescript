import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography, Divider } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

import { Patient, Gender } from "../types";
import patientService from "../services/patients";

const PatientPage = () => {
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
			<Typography>occupation: {patient.occupation}</Typography>
			<Typography>date of birth: {patient.dateOfBirth}</Typography>
			<Divider sx={{ marginY: 2 }} />
		</div>
	);
};

export default PatientPage;
