import React, { ReactNode, useState } from 'react'
import { Header } from './components'
import { Routes } from 'react-router-dom'
import { routesList } from './routes/RoutesBuilder'
import { useNavigate, useLocation } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export const App = (): ReactNode => {
  const navigate = useNavigate()
  const location = useLocation()
  const [pageTitle, setPageTitle] = useState('Home')

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`CP | ${pageTitle}`}</title>
      </Helmet>
      <Header navigate={navigate} setPageTitle={setPageTitle} location={location} />
      <Routes>{routesList(navigate, location, setPageTitle)}</Routes>
    </HelmetProvider>
  )
}
