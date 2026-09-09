import type { CoursePart } from "../types";

const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
	switch (coursePart.kind) {
		case "basic":
			return (
				<div>
					<strong>
						{coursePart.name} {coursePart.exerciseCount}
					</strong>
					<p>{coursePart.description}</p>
				</div>
			);
		case "group":
			return (
				<div>
					<strong>
						{coursePart.name} {coursePart.exerciseCount}
					</strong>
					<p>project exercises {coursePart.groupProjectCount}</p>
				</div>
			);
		case "background":
			return (
				<div>
					<strong>
						{coursePart.name} {coursePart.exerciseCount}
					</strong>
					<p>{coursePart.description}</p>
					<p>submit to {coursePart.backgroundMaterial}</p>
				</div>
			);
		case "special":
			return (
				<div>
					<strong>
						{coursePart.name} {coursePart.exerciseCount}
					</strong>
					<p>{coursePart.description}</p>
					<p>required skills: {coursePart.requirements.join(", ")}</p>
				</div>
			);
		default:
			return assertNever(coursePart);
	}
};

export default Part;
