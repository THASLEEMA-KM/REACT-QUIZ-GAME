import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from "../../assets/data.js";
import { Button } from 'react-bootstrap';
import winnerAnimation from '../../assets/winner3.gif'
import loserAnimation from '../../assets/loser2.gif'
import rightAns from '../../assets/right.wav'
import wrongAns from '../../assets/wrong.wav'
import victory from '../../assets/gamewon.wav'
import losing from '../../assets/gameover.wav'
import buttonClick from '../../assets/click.wav'

import { Link } from 'react-router-dom';

function Quiz() {

    // create state to get index
    let [index,setIndex] = useState(0);
    // create state to get qstn
    let [question,setQuestion] = useState(data[index]);
    // state for lock the options
    let [lock,setLock] = useState(false);
    // state for count 
    let [count,setCount] = useState(0);
    // state for store currect answer -score state
    let [score,setScore] = useState(0);
    // state for show result
    let [result,setResult] = useState(false);

    // creating useref for display right answer
    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    // create array for the ref option
    let optionArray = [Option1,Option2,Option3,Option4];

    // function for music wright answer
    function playsRight() {
        new Audio(rightAns).play()
    }
    // function for music wrong answer
    function playsWrong() {
        new Audio(wrongAns).play()
    }
    // function for music game winning
    function playsWin() {
        new Audio(victory).play()
    }
    // function for music game lose
    function playsLose() {
        new Audio(losing).play()
    }
    // function for button click
    function playsClick() {
        new Audio(buttonClick).play()
    }
    // function for check answer
   
    const checkAns = (e,ans) =>
        {
           
            if(lock===false)
                {
                    
                    if(question.ans===ans)
                    {
                        playsRight();
                        e.target.classList.add("correct");
                        setLock(true);
                        setCount(++count);
                        setScore(prev=>prev+5);
                    }
                    else
                    {
                        e.target.classList.add("wrong");
                        setLock(true);
                        playsWrong();
                        optionArray[question.ans-1].current.classList.add("correct");
                    }
                }

        }
    
    // function for next
    const next = () =>
    {
        if(lock===true)
        {
            if(index===data.length-1)
                {
                    setResult(true);
                    return 0;
                }
                setIndex(++index);
                setQuestion(data[index]);
                setLock(false);
                optionArray.map((option)=>
                {
                    option.current.classList.remove("wrong");
                    option.current.classList.remove("correct");
                    return null;
                }
            )
        }

    }
     // function for reset
     const reset = () =>
    {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
        setCount(0);
    }
  return (
    <>
        <div  style={{width:'550px'}} className='container   d-flex flex-column mt-5 border rounded shadow quizdiv animate__animated animate__backInDown' >
            
                        <h1 className='text-center fw-bold pt-3'>Quiz App</h1>
                        <hr />
                        {result?<></>:<>
                        <h2 className='questionhead'>{index+1}.{question.question}</h2>
                        <ul >
                            <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
                            <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
                            <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
                            <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
                        </ul>
                        {/* <Button className='btn btn-info' onClick={next}>Next</Button> */}
                        <div className='text-center  py-2'><Button className='btn fs-4' variant="info" onClick={()=>{
                            next()
                            playsClick()
                        }
                        }>Next</Button></div>
                        <div className='py-3 text-center'>{index+1} of {data.length} questions</div>
    
                        </>}
    
                        {result?
                        <> 
                           <div className='pt-3'>

                                <h2 className='text-center'>You Answered {count} Out of {data.length}</h2>
                                <h2 className='text-center fw-bold'>Your Score is : {score}</h2>
                                <div className='text-center py-2 d-flex justify-content-center align-items-center'>
                                    <Button className='btn' variant="warning" onClick={()=>{
                            reset()
                            playsClick()
                        }
                        } >RESET</Button>
                                    {/* <Button className='btn ms-3' variant="success" >HOME</Button> */}
                                    <Link to={'/'} className='btn btn-success ms-3' onClick={playsClick} >HOME</Link>
                                </div>
                           </div>
                           {score>0?
                               
                               ( <div className='pt-3 text-center'>
                                 {playsWin()}
                                     <img className='pb-2 bg bg-transparent' src={winnerAnimation} width={'250px'} height={'300px'} alt="winner" />
                                </div>)
                                
                                :
                                (<div className='my-5 text-center'>
                                    {playsLose()}
                                     <img className='pb-1 bg bg-transparent'  src={loserAnimation} width={'300px'} height={'300px'} alt="winner" />
                                </div>)
                           }

                        </>
                        :
                        <>
                        </>}
                    
        </div>

    </>

  )
}

export default Quiz

