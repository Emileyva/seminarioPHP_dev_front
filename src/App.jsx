import { useState } from 'react'
import pokeLogo from '/favicon.svg'
import { Route, Routes } from "react-router-dom";
import React from "react";
import Layout from "@/components/Layout";
import Home from './pages/home/home';
import Stats from './pages/stat/StatPage';
import Registro from './pages/registro/RegistroPage';


function App() {
 //hacer protección de rutas
  return (
      <Routes>
          <Route
            path="/"
            element={
                <Layout>
                  <Home />
                </Layout>
            }
          />
          <Route
            path="/estadisticas"
            element={
                <Layout>
                   <Stats /> 
                </Layout>
            }
          />
          {/* <Route
            path="/login"
            element={
                <Layout>
                  <Login />
                </Layout>
            }
          /> */}
          <Route
            path="/registro"
            element={
                <Layout>
                  <Registro />
                </Layout>
            }
          />
      </Routes>
  )
}

export default App
