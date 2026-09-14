import { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Paper, Stack, Alert } from "@mui/material";

import { NewHealthCheckEntry, HealthCheckRating, Entry } from "../types";
import patientService from "../services/patients";

interface Props {
	patientId: string;
	onEntryAdded: (entry: Entry) => void;
}

const AddEntryForm = ({ patientId, onEntryAdded }: Props) => {
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [specialist, setSpecialist] = useState("");
	const [healthCheckRating, setHealthCheckRating] = useState("");
	const [diagnosisCodes, setDiagnosisCodes] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		const newEntry: NewHealthCheckEntry = {
			type: "HealthCheck",
			description,
			date,
			specialist,
			healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
			diagnosisCodes: diagnosisCodes
				? diagnosisCodes.split(",").map((code) => code.trim())
				: undefined,
		};

		try {
			const addedEntry = await patientService.createEntry(patientId, newEntry);
			onEntryAdded(addedEntry);
			setDescription("");
			setDate("");
			setSpecialist("");
			setHealthCheckRating("");
			setDiagnosisCodes("");
			setError(null);
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				if (e.response?.data && typeof e.response.data === "string") {
					const message = e.response.data.replace("Something went wrong. Error: ", "");
					setError(message);
				} else {
					setError("Unrecognized axios error");
				}
			} else {
				setError("Unknown error");
			}
		}
	};

	return (
		<Paper variant="outlined" sx={{ padding: 3, marginTop: 2, marginBottom: 2 }}>
			<Typography variant="h6" gutterBottom>
				New HealthCheck Entry
			</Typography>
			{error && (
				<Alert severity="error" sx={{ marginBottom: 2 }}>
					{error}
				</Alert>
			)}
			<form onSubmit={handleSubmit}>
				<Stack spacing={2}>
					<TextField
						label="Date"
						type="date"
						fullWidth
						value={date}
						onChange={({ target }) => setDate(target.value)}
						slotProps={{ inputLabel: { shrink: true } }}
					/>
					<TextField
						label="Description"
						fullWidth
						value={description}
						onChange={({ target }) => setDescription(target.value)}
					/>
					<TextField
						label="Specialist"
						fullWidth
						value={specialist}
						onChange={({ target }) => setSpecialist(target.value)}
					/>
					<TextField
						label="Health Check Rating"
						fullWidth
						placeholder="0 = Healthy, 1 = Low Risk, 2 = High Risk, 3 = Critical Risk"
						value={healthCheckRating}
						onChange={({ target }) => setHealthCheckRating(target.value)}
					/>
					<TextField
						label="Diagnosis Codes"
						fullWidth
						placeholder="comma separated, e.g. Z57.1, M51.2"
						value={diagnosisCodes}
						onChange={({ target }) => setDiagnosisCodes(target.value)}
					/>
					<Button type="submit" variant="contained" color="primary">
						Add Entry
					</Button>
				</Stack>
			</form>
		</Paper>
	);
};

export default AddEntryForm;
