import { useState, useEffect } from "react";
import axios from "axios";
import diaryService from "./services/diaries";
import DiaryForm from "./components/DiaryForm";
import type { NonSensitiveDiaryEntry, NewDiaryEntry } from "./types";

interface ZodIssue {
	message: string;
}

const App = () => {
	const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		diaryService.getAllDiaries().then((data) => setDiaries(data));
	}, []);

	const notify = (message: string) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 5000);
	};

	const addDiary = (values: NewDiaryEntry) => {
		diaryService
			.createDiary(values)
			.then((newDiary) => {
			setDiaries(diaries.concat(newDiary));
		})
		.catch((error: unknown) => {
			if (axios.isAxiosError(error)) {
				const data = error.response?.data;

				if (
					data && typeof data === "object" &&
					"error" in data &&
					Array.isArray(data.error)
				) {
					const issues = data.error as ZodIssue[];
					const messages = issues.map((issue) => issue.message).join(", ");
					notify(messages);
				} else {
					notify("Something went wrong");
				}
			} else {
				notify("Unknown error occured");
			}
		});
	};

	return (
		<div>
			<h1>Flight diaries</h1>
			{errorMessage && (
				<div style={{ color: "red" }}>{errorMessage}</div>
			)}
			<DiaryForm addDiary={addDiary} />
			{diaries.map((diary) => (
				<div key={diary.id}>
					<h3>{diary.date}</h3>
					<p>visibility: {diary.visibility}</p>
					<p>weather: {diary.weather}</p>
				</div>
			))}
		</div>
	);
};

export default App;
