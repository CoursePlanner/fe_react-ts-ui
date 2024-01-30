import loadable from '@loadable/component'
import React from 'react'
import {
  Route,
  RouteObject,
  NavigateFunction,
  Navigate,
} from 'react-router-dom'

interface Page {
  path: string
  componentName: string
  viewOnHeader: boolean
  requireLogin: boolean
}

export const routes: Page[] = [
  {
    path: '/',
    componentName: 'Home',
    viewOnHeader: true,
    requireLogin: false,
  },
]

const buildRouteObjects = (
  data: Page,
  key: number,
  navigate: NavigateFunction,
  location: Location,
  setPageTitle: React.Dispatch<React.SetStateAction<string>>,
): React.ReactElement => {
  const Component = loadable(
    (props: any) => import('src/pages/' + data.componentName),
  )
  return (
    <Route
      path={data.path}
      key={key}
      element={
        <Component
          navigate={navigate}
          location={location}
          path={data.path}
          setPageTitle={setPageTitle}
        />
      }
    />
  )
}

export const routesList = (
  navigate: NavigateFunction,
  location: Location,
  setPageTitle: React.Dispatch<React.SetStateAction<string>>,
): React.ReactElement[] => {
  return routes.map((data, index) =>
    buildRouteObjects(data, index, navigate, location, setPageTitle),
  )
}
