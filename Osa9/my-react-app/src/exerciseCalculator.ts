interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}
/* RATING CRITERIA:
1: THE AVERAGE IS 75% OR LESS FROM TARGET
2: THE AVERAGE IS ABOVE 75% FROM THE TARGET
3: TARGET MET OR EXCEEDED*/
export const calculateExercises = (exerciseHours: Array<number>, target: number): Result => {
	const periodLength = exerciseHours.length;
	const trainingDays = exerciseHours.filter(h => h > 0).length;
	const total = exerciseHours.reduce((a, b) => a + b, 0);
	const average = total / periodLength;
	const succesess = average >= target;
	let rating = 1;
	let ratingDescription = 'You could do better';
	if (average / target >= 0.75 && average / target < 1) {
		rating = 2;
		ratingDescription = 'Not too bad but could be better';
	}
	if (average / target >= 1) {
		rating = 3;
		ratingDescription = 'You reached your goal. Good job!';
	}
	return {
		periodLength: periodLength,
		trainingDays: trainingDays,
		success: succesess,
		rating: rating,
		ratingDescription: ratingDescription,
		target: target,
		average: average
	};
};
interface exerciseValues {
    target: number,
    hours: Array<number>
}
const parseArgumentsExercise = (args: Array<string>): exerciseValues => {
	if (args.length < 4) throw new Error('Not enough arguments');
	const target =  Number(process.argv[2]);
	const hours = process.argv.slice(3).map(h => Number(h));

	if (!isNaN(target) && hours.filter(h => isNaN(h)).length === 0) {
		return {
			target: target,
			hours: hours
		};
	} else {
		throw new Error('Provided values were not numbers!');
	}
};
try {
	const { target, hours } = parseArgumentsExercise(process.argv);
	console.log(calculateExercises(hours, target));
} catch (e) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	console.log('Error, something bad happened, message: ', e.message);
}