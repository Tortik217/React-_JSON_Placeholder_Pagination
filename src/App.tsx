// import { useState } from 'react'
import { Outlet } from "react-router-dom";
import {Header} from "./components/Header/Header.tsx";

function App() {

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
