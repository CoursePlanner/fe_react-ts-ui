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
} from '../../utils/store/UserProfileReducer'

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
}

class MyAccountView extends React.Component<MyAccountProps> {
  componentDidMount = async (): Promise<void> => {
    const tryLoading =
      Cookies.get(AuthConstants.HEADER_AUTH_CODE) &&
      Cookies.get(AuthConstants.HEADER_USER_ID)
    if (tryLoading && !this.props.profileDetails.userId) {
      await this?.props?.loadProfileData()
    }
  }

  render(): ReactNode {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            contentEditable={false}
            value={this.props.profileDetails.fullName}
            onChange={(e) => this.props.setFullName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            contentEditable={false}
            value={this.props.profileDetails.username}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            contentEditable={true}
            value={this.props.profileDetails.password || '**********'}
            onChange={(e) => this.props.setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Created On</Form.Label>
          <Form.Control
            contentEditable={false}
            value={this.props.profileDetails.createdOn}
          />
        </Form.Group>
        <Form.Group>
          <Button
            onClick={() =>
              this.props.updateProfileData(this.props.profileDetails)
            }
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
    ...props,
  } as MyAccountProps
}

export const MyAccount = connect(mapStateToProps, {
  setFullName,
  setPassword,
  updateProfileData,
})(MyAccountView)
