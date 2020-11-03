import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>

  )
}

const FeedbackButton = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const total = good + neutral + bad
  const average = () => {
    return (
      total === 0 ? 0 : (good - bad) / total
    )
  }
  const positive = () => {
    return (
      total === 0 ? "0" : (good / total) * 100 + "%"
    )
  }

  return (
    total === 0 ?
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
      :
      <>
        <table>
          <thead><tr><th>Statistics</th></tr></thead>
          <tbody><StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="All" value={good + neutral + bad}/>
            <StatisticLine text="Average" value={average()}/>
            <StatisticLine text="Positive" value={positive()}/>
          </tbody>

        </table>
      </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <FeedbackButton handleClick={() => setGood(good + 1)} text={"Good"} />
      <FeedbackButton handleClick={() => setNeutral(neutral + 1)} text={"Neutral"} />
      <FeedbackButton handleClick={() => setBad(bad + 1)} text={"Bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)