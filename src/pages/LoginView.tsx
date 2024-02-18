import React, { ReactNode } from 'react'
import { connect } from 'react-redux'
import {
  LoginState,
  clearLoginDetails,
  performLogin,
} from '../utils/store/UserLoginReducer'
import { ReducerType } from '../utils/store/store'
import { LoginCredentials } from '../models/LoginCredentials'

interface PropStates {
  userLoginReducer: LoginState
  clearLoginDetails(): void
  performLogin(credentials: LoginCredentials): void
}

class LoginViewCore extends React.Component<PropStates> {
  constructor(props: PropStates) {
    super(props)
    this.props.performLogin({
      username: 'testuser',
      password: 'testuser',
    })
  }
  render(): ReactNode {
    return (
      <div>
        <span>{this.props.userLoginReducer.errorMessage}</span>
      </div>
    )
  }
}

const mapStateToProps = (state: ReducerType, props: PropStates) => {
  return { ...props, userLoginReducer: state?.userLoginReducer }
}

const mapDispatchToProps = {
  performLogin,
  clearLoginDetails,
}

const LoginView = connect(mapStateToProps, mapDispatchToProps)(LoginViewCore)
export default LoginView
export { LoginView }
