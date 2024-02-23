import React, { ReactNode } from 'react'
import { Button } from 'react-bootstrap'
import { Location, NavigateFunction } from 'react-router-dom'
import './styles.scss'

export interface HomeProps {
  resetUserProfileData(): void
  loadProfileData(): string
  location: Location<any>
  navigate: NavigateFunction
  path: string
  setPageTitle(title: string): void
  setDataLoadingState(pageState: boolean): void
}

export class Home extends React.Component<HomeProps> {
  constructor(props: HomeProps) {
    super(props)
  }

  render(): ReactNode {
    return (
      <div className="home-root p-2">
        <Button className="custom-button-class btn-dark">
          Click Me From Home
        </Button>
      </div>
    )
  }
}
