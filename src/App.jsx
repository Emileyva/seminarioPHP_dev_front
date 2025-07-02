import { useState } from 'react'
import pokeLogo from '/favicon.svg'
import { Route, Routes } from "react-router-dom";
import React from "react";
import Layout from "@/components/Layout";
import Home from './pages/home/home';
import Stats from './pages/stat/StatPage';
import Registro from './pages/registro/RegistroPage';
import Login from './pages/login/LoginPage';
import MisMazos from './pages/MisMazos/MazosPages';
import AltaMazosPage from './pages/AltaMazos/AltaMazosPage';
import EditarUsuario from './pages/EditarUsuario/UserEdit';
import Jugar from './pages/jugar/jugarPage';


import Notifications from "@/components/Notificaciones";
import ProtectedRoute from "@/components/ProtectedRoute";


function App() {
  return (
    <>
      <Notifications />
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
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/registro"
          element={
            <Layout>
              <Registro />
            </Layout>
          }
        />
        <Route
          path="/mis-mazos"
          element={
            <ProtectedRoute>
              <Layout>
                <MisMazos />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/alta-mazo"
          element={
            <ProtectedRoute>
              <Layout>
                <AltaMazosPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/editar-usuario"
          element={
            <ProtectedRoute>
              <Layout>
                <EditarUsuario />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/jugar/:mazoId"
          element={
            <ProtectedRoute>
              <Layout>
                <Jugar />
              </Layout>
            </ProtectedRoute>
          }
        />
       
      </Routes>
    </>
  )
}

export default App
