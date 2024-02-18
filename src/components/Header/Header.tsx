import React, { ReactNode } from 'react'
import './styles.scss'
import { Button } from 'react-bootstrap'
import { Page, routes } from '../../routes/RoutesBuilder'
import { PagePropsTemplate } from '../../models/PagePropsTemplate'
import Cookies from 'js-cookie'
import { AuthConstants } from '../../utils/constants/AuthConstants'
import { connect } from 'react-redux'
import {
  ProfileState,
  loadProfileData,
  resetUserProfileData,
} from '../../utils/store/UserProfileReducer'
import { UserProfileProps } from '../../models/UserProfile'
import SignIn from '../SignIn'
import { LoginState } from '../../utils/store/UserLoginReducer'
import { Location, NavigateFunction } from 'react-router-dom'

interface HeaderProps {
  profileDetails: UserProfileProps
  loginDetails: LoginState
  resetUserProfileData(): void
  loadProfileData(): string
  location: Location<any>
  navigate: NavigateFunction
  path: string
  setPageTitle?(title: string): void
}
interface HeaderState {
  signInActive: boolean
}

class HeaderView extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props)
    this.state = {
      signInActive: false,
    }
  }

  componentDidMount = async (): Promise<void> => {
    const tryLoading =
      Cookies.get(AuthConstants.HEADER_AUTH_CODE) &&
      Cookies.get(AuthConstants.HEADER_USER_ID)
    if (tryLoading && !this.props.profileDetails.userId) {
      await this?.props?.loadProfileData()
    }
  }

  componentDidUpdate = async (): Promise<void> => {
    const tryLoading =
      Cookies.get(AuthConstants.HEADER_AUTH_CODE) &&
      Cookies.get(AuthConstants.HEADER_USER_ID)
    if (
      tryLoading &&
      this.props.loginDetails.isLoggedIn &&
      !this.props.profileDetails.userId
    ) {
      await this?.props?.loadProfileData()
    }
  }

  renderRightPanel = (data: Page, index: number): ReactNode => {
    let isCurrentPath = this.props.location?.pathname === data.path
    let canAdd =
      (!data.requireLogin ||
        (data.requireLogin && this.props.profileDetails.userId !== '')) &&
      data.viewOnHeader
    return (
      canAdd && (
        <Button
          key={`${data.componentName}_key_${index}`}
          disabled={isCurrentPath}
          className={`${isCurrentPath ? 'btn-light' : 'btn-dark'}`}
          onClick={() => {
            if (!isCurrentPath) {
              this.props.navigate(data.path, {})
            }
          }}
        >
          {data.componentName}
        </Button>
      )
    )
  }

  renderAccountStatus = (): ReactNode => {
    return !this.props.profileDetails.userId ? (
      <Button
        className="btn-dark"
        onClick={() => {
          this.setState({ signInActive: true })
        }}
      >
        Sign In
      </Button>
    ) : null
  }

  signout = (): void => {
    Cookies.remove(AuthConstants.HEADER_AUTH_CODE)
    Cookies.remove(AuthConstants.HEADER_REFRESH_TOKEN)
    Cookies.remove(AuthConstants.HEADER_USERNAME)
    Cookies.remove(AuthConstants.HEADER_USER_ID)
    this.props.resetUserProfileData()
    this.props.navigate('/')
  }

  render(): ReactNode {
    return (
      <div className="d-flex justify-content-between header-root">
        <SignIn
          showModal={this.state.signInActive}
          onHide={() => {
            this.setState({ signInActive: false })
          }}
        />
        <div className="header-section-left w-25">Course Planner</div>
        <div className="header-section-right w-75 d-flex justify-content-end">
          {routes.map(this.renderRightPanel)}
          {this.renderAccountStatus()}
          {this.props.profileDetails.userId !== '' ? (
            <Button className="btn-dark" onClick={this.signout}>
              Sign Out
            </Button>
          ) : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: UserProfileProps, props: UserProfileProps) => {
  return {
    loginDetails: state?.userLoginReducer || {},
    profileDetails: state?.userProfileReducer || ({} as UserProfileProps),
    ...props,
  }
}

const mapDispatchToProps = {
  loadProfileData,
  resetUserProfileData,
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderView)
