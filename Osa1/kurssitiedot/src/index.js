import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
  return(
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
        <Part part={part.name} exercises={part.exercises}/>)}
    </div>
  )
}

const Total = (props) => {
  const parts = props.course.parts
  let total = parts.reduce(function(a, part){
    return a+part.exercises;
  },0);
  return(
    <p>Number of exercises {total}</p>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))