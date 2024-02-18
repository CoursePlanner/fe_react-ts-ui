import React, { ReactNode } from 'react'
import { PagePropsTemplate } from '../../models/PagePropsTemplate'
import { Button } from 'react-bootstrap'

export class Home extends React.Component<PagePropsTemplate> {
  constructor(props: PagePropsTemplate) {
    super(props)
  }
  componentDidMount(): void {
    this.props.setPageTitle('Home Page')
  }
  render(): ReactNode {
    return (
      <div className="home-root">
        <Button className="custom-button-class btn-dark">
          Click Me From Home
        </Button>
      </div>
    )
  }
}
