import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testmonials from '../components/Testmonials'
import GenerateBtn from '../components/GenerateBtn'

function Home() {
  return (
    <div>
        <Header/>
        <Steps/>
        <Description/>
        <Testmonials/>
        <GenerateBtn/>
    </div>
  )
}

export default Home