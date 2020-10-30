import React from 'react'; 
const Part = (props) => {
    return (
      <p>{props.part} {props.exercises}</p>
    )
  }
  
  const Header = (props) => {
    return (
      <h1>{props.course.name}</h1>
    )
  }
  
  const Content = (props) => {
    const parts = props.course.parts
    return (
      <div>
        {parts.map(part =>
          <Part part={part.name} exercises={part.exercises} />)}
      </div>
    )
  }
  
  const Total = (props) => {
    const parts = props.course.parts
    let total = parts.reduce(function (a, part) {
      return a + part.exercises;
    }, 0);
    return (
      <p className="total">Total of {total} exercises</p>
    )
  }
  
  const Course = (props) => {
    return (
      <div>
        <Header course={props.course} />
        <Content course={props.course} />
        <Total course={props.course} />
      </div>
    )
  }
  export default Course; 