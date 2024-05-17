import React from 'react'
import { Routes, Route } from 'react-router-dom'

//common components 
import Nav from './Components/CommonComponents/Nav'
import Footer from './Components/CommonComponents/Footer'
import LandingPage from './Components/CommonComponents/LandingPage'
import AboutTheDevs from './Components/CommonComponents/AboutTheDevs'

//Components
import AccidentIndex from './Components/AccidentIndex';
import AccidentDetailed from './Components/AccidentDetailed';
import DetailsMap from './Components/DetailsMap'
import IndexMap from './Components/IndexMap'
import PeopleIndex from './Components/PeopleIndex'


const App = () => {


  return (
    <>
      <Nav/>
      <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/accidents" element={<AccidentIndex />} />
          <Route
            path="/accidents/:id"
            element={<AccidentDetailed />}
          />
          <Route path="/People" element={<PeopleIndex />} />
          <Route path="/maps" element={<DetailsMap />} />
          <Route path="/indexmaps" element={<IndexMap />} />
          <Route path="/aboutthedevs" element={<AboutTheDevs />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
