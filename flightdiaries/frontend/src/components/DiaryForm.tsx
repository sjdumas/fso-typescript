import { useState } from "react";
import { Weather, Visibility } from "../types";
import type { NewDiaryEntry } from "../types";

interface DiaryFormProps {
	addDiary: (values: NewDiaryEntry) => void;
}

const DiaryForm = ({ addDiary }: DiaryFormProps) => {
	const [date, setDate] = useState("");
	const [weather, setWeather] = useState<Weather>(Weather.Sunny);
	const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
	const [comment, setComment] = useState("");

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();

		addDiary({
			date,
			weather,
			visibility,
			comment,
		});

		setDate("");
		setWeather(Weather.Sunny);
		setVisibility(Visibility.Great);
		setComment("");
	};

	return (
		<div>
			<h3>Add new entry</h3>
			<form onSubmit={handleSubmit}>
				<div>
					date{" "}
					<input
						type="date"
						value={date}
						onChange={(event) => setDate(event.target.value)}
					/>
				</div>
				<div>
					visibility{" "}
					{Object.values(Visibility).map((v) => (
						<span key={v}>
							{v}
							<input
								type="radio"
								name="visibility"
								value={v}
								checked={visibility === v}
								onChange={() => setVisibility(v)}
							/>
						</span>
					))}
				</div>
				<div>
					weather{" "}
					{Object.values(Weather).map((w) => (
						<span key={w}>
							{w}
							<input
								type="radio"
								name="weather"
								value={w}
								checked={weather === w}
								onChange={() => setWeather(w)}
							/>
						</span>
					))}
				</div>
				<div>
					comment{" "}
					<input
						value={comment}
						onChange={(event) => setComment(event.target.value)}
					/>
				</div>
				<button type="submit">add</button>
			</form>
		</div>
	);
};

export default DiaryForm;
