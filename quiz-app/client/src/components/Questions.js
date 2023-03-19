import React, { useState } from 'react'

export default function Questions() {

  const [checked, setChecked] = useState(true)

  function onSelect () {
    setChecked(true)
    console.log("radio button change")
  }

  return (
    <div>
        <h2>What is your Name?</h2>

        <ul>
          <li>
            <input type="radio" checked={ checked } name="options" id='q1-option' onChange={onSelect} />
          </li>
        </ul>

        <label htmlFor='q1-option'>option</label>
        <div>

        </div>

    </div>
  )
}
