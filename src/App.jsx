import { useState,useEffect } from 'react';
import './App.css'
import Loading from './Component/Loading/Loading'
import Quiz from './Component/Quiz/Quiz'
import Rules from './Component/Rules/Rules';
import { Route, Routes } from 'react-router-dom';


function App() {
 
// preloading state
let [loading, setLoading] = useState(false);


// preloading function 
useEffect(()=>{
  setLoading(true);
  setTimeout(()=>{
    setLoading(false);
  },2000);
},[])

  return (
    <>
    {
    loading?
    <Loading/>
    :
    <>
    <Routes>

      <Route element={<Rules/>}path='/'></Route>
      <Route element={<Quiz/> }path='/quiz'></Route>

    </Routes>
    </>
    }
      
    </>
  )
}

export default App
