/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises} from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    res.status(400).send({
      error: "malformatted parameters"
    });
    return;
  }
  res.send({
    weight: weight,
    height: height,
    bmi: calculateBmi(height, weight)
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).send({
      error: "parameters missing"
    });
    return;
  }
  
  if (daily_exercises.some(isNaN) || isNaN(target)){
    res.status(400).send({
      error: "malformatted parameters"
    });
    return;
  }
  res.send(calculateExercises(daily_exercises,target));
  
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});