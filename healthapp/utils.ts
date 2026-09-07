export const isNotNumber = (argument: string): boolean => isNaN(Number(argument));

interface BmiValues {
	height: number;
	weight: number;
}

export const parseBmiArguments = (args: string[]): BmiValues => {
	if (args.length < 4) throw new Error("Not enough arguments");
	if (args.length > 4) throw new Error("Too many arguments");

	if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
		return {
			height: Number(args[2]),
			weight: Number(args[3]),
		};
	} else {
		throw new Error("Provided values were not numbers!");
	}
};

interface ExerciseValues {
	target: number;
	hours: number[];
}

export const parseExerciseArguments = (args: string[]): ExerciseValues => {
	const inputs = args.slice(2);

	if (inputs.length < 2) {
		throw new Error("Not enough arguments: provide a target and at least one daily hour value");
	}

	if (inputs.some((arg) => isNotNumber(arg))) {
		throw new Error("Provided values were not numbers!");
	}

	const [target, ...hours] = inputs.map(Number);

	return { target, hours };
};
