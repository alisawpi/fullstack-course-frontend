import React from "react";
import ReactDOM from "react-dom";
// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CourseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CourseWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CourseWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CourseWithDescription {
  name: "My new course part"
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;


const Header: React.FC<{ header: string }> = ({ header }) => {
  return (
    <h1>{header}</h1>
  )
}
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  return (
    <>
      {(() => {

        switch (part.name) {
          case "Fundamentals":
            return(<p> <strong>Title</strong> {part.name} <strong>Exercises:</strong> {part.exerciseCount} <strong>Description:</strong> {part.description}</p>)
          case "Using props to pass data":
            return(<p> <strong>Title</strong> {part.name} <strong>Exercises:</strong> {part.exerciseCount} <strong>Group project: </strong> {part.groupProjectCount}</p>)
          case "Deeper type usage":
            return(<p> <strong>Title</strong> {part.name} <strong>Exercises:</strong> {part.exerciseCount} <strong>Submissions: </strong> {part.exerciseSubmissionLink} </p>)
          case "My new course part":
            return (<p><strong>Title</strong> {part.name} <strong>Exercises:</strong> {part.exerciseCount} <strong>Description:</strong> {part.description}</p>)
          default:
            assertNever(part)
            break;
        }
      })()}
    </>
  )
}
const Content: React.FC<{ parts: Array<CoursePart> }> = ({ parts }) => {
  return (
    <div>
      {parts.map(p => (
        <Part key={p.name} part={p} />
      )
      )}
    </div>
  )
}

const Total: React.FC<{ parts: Array<CoursePart> }> = ({ parts }) => {
  return (
    <div>
      Total number of exercises: {parts.reduce((acc, cur) => (acc + cur.exerciseCount), 0)}
    </div>

  )
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "My new course part",
      description: "Last part of the course",
      exerciseCount: 5
    }
  ];

  return (
    <div>
      <Header header={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));