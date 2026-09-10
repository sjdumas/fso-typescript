import { useState, useEffect } from "react";
import diaryService from "./services/diaries";
import type { NonSensitiveDiaryEntry } from "./types";

const App = () => {
	const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

	useEffect(() => {
		diaryService.getAllDiaries().then((data) => setDiaries(data));
	}, []);

	return (
		<div>
			<h1>Flight diaries</h1>
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
