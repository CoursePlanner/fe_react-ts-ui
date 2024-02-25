import loadable from '@loadable/component'
import React from 'react'
import {
  Route,
  RouteObject,
  NavigateFunction,
  Navigate,
  Location,
} from 'react-router-dom'

export interface Page {
  path: string
  componentName: string
  displayName: string
  viewOnHeader: boolean
  requireLogin: boolean
}

export const routes: Page[] = [
  {
    path: '/',
    componentName: 'Home',
    displayName: 'Home',
    viewOnHeader: true,
    requireLogin: false,
  },
  {
    path: '/account',
    componentName: 'MyAccount',
    displayName: 'My Account',
    viewOnHeader: true,
    requireLogin: true,
  },
  {
    path: '/orders',
    componentName: 'Orders',
    displayName: 'My Orders',
    viewOnHeader: true,
    requireLogin: true,
  },
  {
    path: '*',
    componentName: 'NotFound',
    displayName: 'Lost In Space',
    viewOnHeader: false,
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
          title={data.displayName}
          setPageTitle={setPageTitle}
        />
      }
    />
  )
}

export const routesList = (
  navigate: NavigateFunction,
  location: Location<any>,
  setPageTitle: React.Dispatch<React.SetStateAction<string>>,
): React.ReactElement[] => {
  return routes.map((data, index) =>
    buildRouteObjects(data, index, navigate, location, setPageTitle),
  )
}
