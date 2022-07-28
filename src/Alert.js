import React from 'react'

const Alert = ({ color, text }) => {
  return <p className={`alert ${color}`}>{text}</p>
}

export default Alert
