import { useState } from "react";
import axios from "axios";
import {
	TextField,
	Button,
	Typography,
	Paper,
	Stack,
	Alert,
	Select,
	MenuItem,
	InputLabel,
	OutlinedInput,
	Checkbox,
	ListItemText,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

import { NewEntry, HealthCheckRating, Entry, Diagnosis } from "../types";
import patientService from "../services/patients";

interface Props {
	patientId: string;
	diagnoses: Diagnosis[];
	onEntryAdded: (entry: Entry) => void;
}

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

const AddEntryForm = ({ patientId, diagnoses, onEntryAdded }: Props) => {
	const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
	const [description, setDescription] = useState("");
	const [date, setDate] = useState("");
	const [specialist, setSpecialist] = useState("");
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

	const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
		HealthCheckRating.Healthy
	);

	const [dischargeDate, setDischargeDate] = useState("");
	const [dischargeCriteria, setDischargeCriteria] = useState("");

	const [employerName, setEmployerName] = useState("");
	const [sickLeaveStart, setSickLeaveStart] = useState("");
	const [sickLeaveEnd, setSickLeaveEnd] = useState("");

	const [error, setError] = useState<string | null>(null);

	const resetFields = () => {
		setDescription("");
		setDate("");
		setSpecialist("");
		setDiagnosisCodes([]);
		setHealthCheckRating(HealthCheckRating.Healthy);
		setDischargeDate("");
		setDischargeCriteria("");
		setEmployerName("");
		setSickLeaveStart("");
		setSickLeaveEnd("");
	};

	const handleTypeChange = (event: SelectChangeEvent<EntryType>) => {
		setEntryType(event.target.value as EntryType);
	};

	const handleDiagnosisCodesChange = (
		event: SelectChangeEvent<typeof diagnosisCodes>
	) => {
		const value = event.target.value;
		setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
	};

	const handleHealthCheckRatingChange = (
		event: SelectChangeEvent<HealthCheckRating>
	) => {
		setHealthCheckRating(Number(event.target.value) as HealthCheckRating);
	};

	const buildEntry = (): NewEntry => {
		const codes = diagnosisCodes.length > 0 ? diagnosisCodes : undefined;

		switch (entryType) {
			case "HealthCheck":
				return {
					type: "HealthCheck",
					description,
					date,
					specialist,
					diagnosisCodes: codes,
					healthCheckRating,
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

					<div>
						<InputLabel>Diagnosis Codes</InputLabel>
						<Select
							multiple
							fullWidth
							value={diagnosisCodes}
							onChange={handleDiagnosisCodesChange}
							input={<OutlinedInput label="Diagnosis Codes" />}
							renderValue={(selected) => selected.join(", ")}
						>
							{diagnoses.map((diagnosis) => (
								<MenuItem key={diagnosis.code} value={diagnosis.code}>
									<Checkbox checked={diagnosisCodes.includes(diagnosis.code)} />
									<ListItemText primary={`${diagnosis.code} ${diagnosis.name}`} />
								</MenuItem>
							))}
						</Select>
					</div>

					{entryType === "HealthCheck" && (
						<div>
							<InputLabel>Health Check Rating</InputLabel>
							<Select
								fullWidth
								value={healthCheckRating}
								onChange={handleHealthCheckRatingChange}
							>
								<MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
								<MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
								<MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
								<MenuItem value={HealthCheckRating.CriticalRisk}>
									Critical Risk
								</MenuItem>
							</Select>
						</div>
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
