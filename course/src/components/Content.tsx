import Part from "./Part";
import type { CoursePart } from "../types";

interface ContentProps {
	courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
	return (
		<div>
			{courseParts.map((part) => (
				<Part key={part.name} coursePart={part} />
			))}
		</div>
	);
};

export default Content;
