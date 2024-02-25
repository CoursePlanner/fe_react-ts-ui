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
import {
  MAX_API_ATTEMPTS,
  PageState,
  setDataLoadingState,
} from '../../utils/store/PageStateReducer'

interface HeaderProps {
  profileDetails: UserProfileProps
  loginDetails: LoginState
  resetUserProfileData(): void
  loadProfileData(): string
  location: Location<any>
  navigate: NavigateFunction
  path: string
  setPageTitle(title: string): void
  setDataLoadingState(pageState: boolean): void
  pageState: PageState
}
interface HeaderState {
  signInActive: boolean
  loadProfileAttempts: number
}

class HeaderView extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props)
    this.state = {
      signInActive: false,
      loadProfileAttempts: MAX_API_ATTEMPTS,
    }
  }

  componentDidMount = (): void => {
    this.checkAndLoadUserProfile()
  }

  componentDidUpdate = (): void => {
    this.checkAndLoadUserProfile()
  }

  checkAndLoadUserProfile = async (): Promise<void> => {
    const tryLoading =
      Cookies.get(AuthConstants.HEADER_AUTH_CODE) &&
      Cookies.get(AuthConstants.HEADER_USER_ID)

    if (
      tryLoading &&
      this.props.profileDetails.userId === '' &&
      this.state.loadProfileAttempts > 0
    ) {
      this.props.setDataLoadingState(true)
      await this.props.loadProfileData()
      this.props.setDataLoadingState(false)
      if (this.props.profileDetails.userId === '') {
        this.setState({
          loadProfileAttempts: this.state.loadProfileAttempts - 1,
        })
      } else {
        this.setState({
          loadProfileAttempts: MAX_API_ATTEMPTS,
        })
      }
    }

    if (tryLoading && this.state.loadProfileAttempts === 0) {
      this.signout()
      this.setState({
        signInActive: false,
        loadProfileAttempts: MAX_API_ATTEMPTS,
      })
      this.props.navigate('/')
      alert("You've been logged out, please re-login.")
    }

    if (
      this.props.profileDetails.userId === '' &&
      this.pageRequiresLogin()
    ) {
      this.props.navigate('/')
    }
  }

  pageRequiresLogin = (): boolean => {
    let pageObj: Page[] =
      routes.filter((page) => page.path === this.props.location.pathname) || []
    if (pageObj.length !== 0) {
      return pageObj[0].requireLogin
    }
    return false
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
          className={`${isCurrentPath ? 'btn-light' : 'btn-warning'} me-2`}
          onClick={() => {
            if (!isCurrentPath) {
              this.props.setPageTitle(data.displayName)
              this.props.navigate(data.path, {})
            }
          }}
        >
          {data.displayName}
        </Button>
      )
    )
  }

  renderAccountStatus = (): ReactNode => {
    return this.props.profileDetails.userId === '' ? (
      <Button
        className="btn-light"
        onClick={() => {
          this.setState({ signInActive: true })
        }}
      >
        Sign In
      </Button>
    ) : (
      <Button className="btn-danger" onClick={this.signout}>
        Sign Out
      </Button>
    )
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
      <>
      {this.props.pageState.isDataLoading && (
        <div className="common-loader-bar" />
      )}
        <div className="d-flex justify-content-between header-root p-2 mb-2">
          <SignIn
            showModal={this.state.signInActive}
            onHide={() => {
              this.setState({ signInActive: false })
            }}
          />
          <div className="header-section-left w-25 mt-2">CP</div>
          <div className="header-section-right w-75 d-flex justify-content-end">
            {routes.map(this.renderRightPanel)}
            {this.renderAccountStatus()}
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (
  state: {
    userLoginReducer: any
    userProfileReducer: any
    pageStateReducer: any
  },
  props: any,
) => {
  return {
    loginDetails: state?.userLoginReducer || {},
    profileDetails: state?.userProfileReducer || ({} as UserProfileProps),
    pageState: state?.pageStateReducer || {},
    ...props,
  }
}

const mapDispatchToProps = {
  loadProfileData,
  resetUserProfileData,
  setDataLoadingState,
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderView)
