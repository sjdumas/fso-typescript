import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
import type { CoursePart } from "./types";

const App = () => {
	const courseName = "Half Stack application development";
	const courseParts: CoursePart[] = [
		{
			name: "Fundamentals",
			exerciseCount: 10,
			description: "This is an awesome course part",
			kind: "basic",
		},
		{
			name: "Advanced",
			exerciseCount: 7,
			description: "This is the harded course part",
			kind: "basic",
		},
		{
			name: "Using props to pass data",
			exerciseCount: 7,
			groupProjectCount: 3,
			kind: "group",
		},
		{
			name: "Deeper type usage",
			exerciseCount: 14,
			description: "Confusing description",
			backgroundMaterial:
				"https://fake-exercise-submit-made-up-url.dev",
			kind: "background",
		},
		{
			name: "Backend development",
			exerciseCount: 21,
			description: "Typing the backend",
			requirements: ["nodejs", "jest"],
			kind: "special",
		},
	];

	const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

	return (
		<div>
			<Header name={courseName} />
			<Content courseParts={courseParts} />
			<Total total={totalExercises} />
		</div>
	);
};

export default App;
