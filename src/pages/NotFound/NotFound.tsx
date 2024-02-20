import React, { ReactNode } from 'react'
import { Location, NavigateFunction } from 'react-router-dom'

export interface NotFoundProps {
  location: Location<any>
  navigate: NavigateFunction
  path: string
  title: string
  setPageTitle(title: string): void
}

export class NotFound extends React.Component<NotFoundProps> {
  constructor(props: NotFoundProps) {
    super(props)
    props.setPageTitle(props.title)
  }
  render(): ReactNode {
    return <div>You seem to be lost...</div>
  }
}
