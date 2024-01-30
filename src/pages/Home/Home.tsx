import React, { ReactNode } from 'react'
import { PagePropsTemplate } from '../../models/PagePropsTemplate'

export class Home extends React.Component<PagePropsTemplate> {
  constructor(props: PagePropsTemplate) {
    super(props)
    console.log('**** props: ', props)
  }
  componentDidMount(): void {
    this.props.setPageTitle('Home Page')
  }
  render(): ReactNode {
    return <div className="m-1">Home</div>
  }
}
