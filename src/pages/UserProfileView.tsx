import React, { ReactNode } from 'react'
import { UserProfileProps } from '../models/UserProfile'
import { connect } from 'react-redux'
import {
  loadProfileData,
  resetUserProfileData,
} from '../utils/store/UserProfileReducer'

interface UserProfileViewProps {
  userProfileReducer: UserProfileProps
  updateUserProfileData(): void
  resetUserProfileData(): void
}

class UserProfileViewCore extends React.Component<UserProfileViewProps> {
  constructor(public props: UserProfileViewProps) {
    super(props)
    this.reloadProfile()
  }

  reloadProfile = async (): Promise<void> => {
    await this.props.loadProfileData()
  }

  render(): ReactNode {
    return (
      <div>
        <div>
          <span>Name</span>
          <span>{this.props?.userProfileReducer?.fullName}</span>
        </div>
        <button onClick={this.reloadProfile}>Load Profile</button>
        <button onClick={() => this.props?.resetUserProfileData()}>
          Reset
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state: UserProfileProps, props: UserProfileProps) => {
  return { ...state, ...props }
}

const mapDispatchToProps = {
  loadProfileData,
  resetUserProfileData,
}

const UserProfileView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfileViewCore)

export { UserProfileView }
