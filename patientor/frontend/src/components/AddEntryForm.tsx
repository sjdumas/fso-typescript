import { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Paper, Stack, Alert, Select, MenuItem, InputLabel } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

import { NewEntry, HealthCheckRating, Entry } from "../types";
import patientService from "../services/patients";

interface Props {
	patientId: string;
	onEntryAdded: (entry: Entry) => void;
}

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

const AddEntryForm = ({ patientId, onEntryAdded }: Props) => {
	const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [specialist, setSpecialist] = useState("");
	const [diagnosisCodes, setDiagnosisCodes] = useState("");

	// HealthCheck-specific
	const [healthCheckRating, setHealthCheckRating] = useState("");

	// Hospital-specific
	const [dischargeDate, setDischargeDate] = useState("");
	const [dischargeCriteria, setDischargeCriteria] = useState("");

	// OccupationalHealthcare-specific
	const [employerName, setEmployerName] = useState("");
	const [sickLeaveStart, setSickLeaveStart] = useState("");
	const [sickLeaveEnd, setSickLeaveEnd] = useState("");

	const [error, setError] = useState<string | null>(null);

	const resetFields = () => {
		setDescription("");
		setDate("");
		setSpecialist("");
		setDiagnosisCodes("");
		setHealthCheckRating("");
		setDischargeDate("");
		setDischargeCriteria("");
		setEmployerName("");
		setSickLeaveStart("");
		setSickLeaveEnd("");
	};

	const handleTypeChange = (event: SelectChangeEvent<EntryType>) => {
		setEntryType(event.target.value as EntryType);
	};

	const buildEntry = (): NewEntry => {
		const codes = diagnosisCodes
			? diagnosisCodes.split(",").map((code) => code.trim())
			: undefined;

		switch (entryType) {
			case "HealthCheck":
				return {
					type: "HealthCheck",
					description,
					date,
					specialist,
					diagnosisCodes: codes,
					healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
				};
			case "Hospital":
				return {
					type: "Hospital",
					description,
					date,
					specialist,
					diagnosisCodes: codes,
					discharge: {
						date: dischargeDate,
						criteria: dischargeCriteria,
					},
				};
			case "OccupationalHealthcare":
				return {
					type: "OccupationalHealthcare",
					description,
					date,
					specialist,
					diagnosisCodes: codes,
					employerName,
					sickLeave:
						sickLeaveStart && sickLeaveEnd
							? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
							: undefined,
				};
			default:
				throw new Error("Unhandled entry type");
		}
	};

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		const newEntry = buildEntry();

		try {
			const addedEntry = await patientService.createEntry(patientId, newEntry);
			onEntryAdded(addedEntry);
			resetFields();
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
				New Entry
			</Typography>
			{error && (
				<Alert severity="error" sx={{ marginBottom: 2 }}>
					{error}
				</Alert>
			)}
			<form onSubmit={handleSubmit}>
				<Stack spacing={2}>
					<div>
						<InputLabel>Entry type</InputLabel>
						<Select fullWidth value={entryType} onChange={handleTypeChange}>
							<MenuItem value="HealthCheck">Health Check</MenuItem>
							<MenuItem value="Hospital">Hospital</MenuItem>
							<MenuItem value="OccupationalHealthcare">
								Occupational Healthcare
							</MenuItem>
						</Select>
					</div>

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
						label="Diagnosis Codes"
						fullWidth
						placeholder="comma separated, e.g. Z57.1, M51.2"
						value={diagnosisCodes}
						onChange={({ target }) => setDiagnosisCodes(target.value)}
					/>

					{entryType === "HealthCheck" && (
						<TextField
							label="Health Check Rating"
							fullWidth
							placeholder="0 = Healthy, 1 = Low Risk, 2 = High Risk, 3 = Critical Risk"
							value={healthCheckRating}
							onChange={({ target }) => setHealthCheckRating(target.value)}
						/>
					)}

					{entryType === "Hospital" && (
						<>
							<TextField
								label="Discharge Date"
								type="date"
								fullWidth
								value={dischargeDate}
								onChange={({ target }) => setDischargeDate(target.value)}
								slotProps={{ inputLabel: { shrink: true } }}
							/>
							<TextField
								label="Discharge Criteria"
								fullWidth
								value={dischargeCriteria}
								onChange={({ target }) => setDischargeCriteria(target.value)}
							/>
						</>
					)}

					{entryType === "OccupationalHealthcare" && (
						<>
							<TextField
								label="Employer Name"
								fullWidth
								value={employerName}
								onChange={({ target }) => setEmployerName(target.value)}
							/>
							<TextField
								label="Sick Leave Start"
								type="date"
								fullWidth
								value={sickLeaveStart}
								onChange={({ target }) => setSickLeaveStart(target.value)}
								slotProps={{ inputLabel: { shrink: true } }}
							/>
							<TextField
								label="Sick Leave End"
								type="date"
								fullWidth
								value={sickLeaveEnd}
								onChange={({ target }) => setSickLeaveEnd(target.value)}
								slotProps={{ inputLabel: { shrink: true } }}
							/>
						</>
					)}

					<Button type="submit" variant="contained" color="primary">
						Add Entry
					</Button>
				</Stack>
			</form>
		</Paper>
	);
};

export default AddEntryForm;
