import React from 'react'
import AdditionalData from './additinolData/aditinalData'
import Popularcourses from './Popularcourses'
import { registerOperatorRoute } from "../../../../../imports/client/ui";



export default function index() {

  return (
    <div>
    <Popularcourses/>
    <AdditionalData/>

    </div>

  )
}


registerOperatorRoute({
  group: "moduleblock",
  path: "/modules/addmodule",
  MainComponent:Popularcourses ,
});