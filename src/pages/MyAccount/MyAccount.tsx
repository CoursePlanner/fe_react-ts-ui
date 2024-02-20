import React, { ReactNode } from 'react'
import { UserProfileProps } from '../../models/UserProfile'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { AuthConstants } from '../../utils/constants/AuthConstants'
import { Form, Button } from 'react-bootstrap'
import { Location, NavigateFunction } from 'react-router-dom'
import {
  ProfileState,
  setFullName,
  setPassword,
  updateProfileData,
  loadProfileData,
} from '../../utils/store/UserProfileReducer'
import {
  PageState,
  setDataLoadingState,
} from '../../utils/store/PageStateReducer'

interface MyAccountProps {
  profileDetails: UserProfileProps
  resetUserProfileData(): void
  loadProfileData(): string
  location: Location<any>
  navigate: NavigateFunction
  path: string
  setPageTitle(title: string): void
  setFullName(fullName: string): void
  setPassword(password: string): void
  updateProfileData(profileDetails: ProfileState): void
  pageState: PageState
  setDataLoadingState(pageState: boolean): void
}

class MyAccountView extends React.Component<MyAccountProps> {
  render(): ReactNode {
    return (
      <Form className="p-2">
        <Form.Group>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            required
            value={this.props.profileDetails.fullName}
            onChange={(e) => this.props.setFullName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control readOnly value={this.props.profileDetails.username} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            value={this.props.profileDetails.password || ''}
            placeholder="Update Password"
            onChange={(e) => this.props.setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Created On</Form.Label>
          <Form.Control readOnly value={this.props.profileDetails.createdOn} />
        </Form.Group>
        <Form.Group>
          <Button
            className="btn-dark w-100 mt-2"
            onClick={async () => {
              this.props.setDataLoadingState(true)
              await this.props.updateProfileData(this.props.profileDetails)
              this.props.setDataLoadingState(false)
            }}
          >
            Update Profile
          </Button>
        </Form.Group>
      </Form>
    )
  }
}

const mapStateToProps = (state: any, props: any) => {
  return {
    profileDetails: state?.userProfileReducer || ({} as UserProfileProps),
    pageState: state?.pageStateReducer || ({} as PageState),
    ...props,
  } as MyAccountProps
}

export const MyAccount = connect(mapStateToProps, {
  setFullName,
  setPassword,
  updateProfileData,
  loadProfileData,
  setDataLoadingState,
})(MyAccountView)
