import { Location, NavigateFunction } from 'react-router-dom'

export interface PagePropsTemplate {
  location?: Location<any>
  navigate?: NavigateFunction
  path?: string
  setPageTitle(title: string): void
}
