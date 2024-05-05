import React from 'react'
import { Link } from 'react-router-dom'
import './Rules.css'
import buttonClick from '../../assets/click.wav'
function Rules() {
      // function for button click
      function playsClick() {
        new Audio(buttonClick).play()
    }
  return (
    <>

      <div style={{width:'550px'}} className='container align-itms-center rulesdiv d-flex flex-column mt-5 border rounded shadow animate__animated animate__bounceIn '>
      <h1 className='text-center fw-bold pt-3'>Rules</h1>
      <hr />
      <h2 className='text-center'>A very simple Quiz game Related to React </h2>
      <p>
        <ol>
          <li> In this section, there are 10 Multiple choice questions with 4 options.</li>
          <li> Only after selecting one option you can click next button.</li>
          <li> Each qustion carries 5 marks</li>
          <li> Your score will display at the end of the game.</li>
          <li> There is a timer for each question, So answer before time.</li>
          <li> Click OK to start the Game, "Best of Luck!!!"</li>
        </ol>
      </p>
      <div className='text-center py-3'>
        
      <Link to={'/quiz'} onClick={playsClick} className='btn btn-success mt-3'>OK</Link>
      </div>

      </div>

    </>
  )
}

export default Rules