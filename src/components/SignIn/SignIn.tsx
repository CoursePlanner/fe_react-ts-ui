import React, { ReactNode } from 'react'
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap'
import { connect } from 'react-redux'
import {
  LoginState,
  performLogin,
  setPassword,
  setUsername,
} from '../../utils/store/UserLoginReducer'
import { loadProfileData } from '../../utils/store/UserProfileReducer'
import { UserProfileProps } from '../../models/UserProfile'
import { PageState, setDataLoadingState } from '../../utils/store/PageStateReducer'

interface SignInViewProps {
  showModal: boolean
  onHide(): void
  performLogin({}: LoginState): void
  setUsername(username: string): void
  setPassword(password: string): void
  loginDetails: LoginState
  userProfileDetails: UserProfileProps
  setDataLoadingState(pageState: boolean): void
  pageState: PageState
}

class SignInView extends React.Component<SignInViewProps> {
  componentDidUpdate(
    prevProps: Readonly<SignInViewProps>,
    prevState: Readonly<{}>,
    snapshot?: any,
  ): void {
    if (
      this.props.showModal &&
      this.props.userProfileDetails.userId !== undefined &&
      this.props.userProfileDetails.userId !== ''
    ) {
      this.props.onHide()
    }
  }
  render(): ReactNode {
    return (
      <Modal show={this.props.showModal} onHide={this.props.onHide}>
        <ModalHeader closeButton>
          <ModalTitle>Sign In</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={this.props.loginDetails.username}
                type="text"
                onChange={(e) => this.props.setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={this.props.loginDetails.password}
                type="password"
                onChange={(e) => this.props.setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              className="btn-success w-100 mt-3"
              onClick={async () => {
                setDataLoadingState(true)
                await this.props.performLogin({
                  username: this.props.loginDetails.username,
                  password: this.props.loginDetails.password,
                })
                setDataLoadingState(false)
              }}
            >
              Sign In
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    )
  }
}

const mapStateToProps = (state: any, props: any) => {
  return {
    loginDetails: state?.userLoginReducer || {},
    userProfileDetails: state?.userProfileReducer || {},
    pageState: state.pageStateReducer || {},
    ...props,
  }
}

export const SignIn = connect(mapStateToProps, {
  setUsername,
  setPassword,
  performLogin,
  loadProfileData,
  setDataLoadingState,
})(SignInView)
