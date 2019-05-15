import { gql } from 'apollo-boost';
import React from 'react';
import { Mutation, MutationFn, MutationResult, } from 'react-apollo';
import { AUTH_TOKEN } from '../constants';
import { RouteComponentProps } from 'react-router-dom';
import { CustomLoader } from './Loader'
import { H1, Wrapper, Logo, ErrorStyled, SideMarginStyled } from '../styles/Taqstyles'
import logo from '../styles/taqtile.png'
import { CustomButton } from './Button'
import Form from './Form'

const LOGIN_OPERATION = gql`
  mutation LoginOp($email:String!, $password:String!){
    Login(data: {
      email: $email
      password: $password
    }) {
      user {
        id
        name
      }
      token
    }
  }
  `

export interface LoginPageProps extends RouteComponentProps {
}

export interface LoginPageState {
  formErrors: any;
  email: string;
  password: string;
  token: string;
  valid: any
}

export default class LoginPage extends React.Component<LoginPageProps, LoginPageState>{
  constructor(props: LoginPageProps) {
    super(props);
    this.state = {
      token: "",
      email: '',
      password: '',
      formErrors: { email: '', password: '' },
      valid: [false, false]
    }
  }

  render() {
    const {
      email,
      password,
    } = this.state;

    return (
      <Wrapper>
        <Mutation
          mutation={LOGIN_OPERATION}
          variables={{
            email,
            password,
          }}
          onCompleted={this.handleLoginSuccess}
        >
          {(mutation: MutationFn<any>, result: MutationResult) => {
            if (result.loading) return <CustomLoader loading={result.loading}></CustomLoader>
            return (
              <>
                <form className="Login" onSubmit={(event) => this.submit(mutation, event)}
                  style={{ textAlign: "center" }}>
                  <Logo src={logo} alt="Logo" />
                  <H1>
                    Bem-vindo(a) à Taqtile!
                  </H1>
                  {result.error &&
                    <ErrorStyled style={{ textAlign: 'center' }}>
                      {"Erro!" + result.error.message}
                    </ErrorStyled>}
                  <SideMarginStyled>
                    <Form type="email" setVariables={this.setVariables}></Form>
                    <Form type="password" setVariables={this.setVariables}></Form>
                  </SideMarginStyled  >
                  <CustomButton type="submit" title="Entrar" enabled=
                    {this.state.valid.every(this.isValid)}/>
                </form>
              </>
            )
          }}
        </Mutation>
      </Wrapper>
    );
  }

  private isValid = (element:boolean, index:number, valid:[]) => {
    return element
  }

  private handleLoginSuccess = (data: any) => {
    this.saveUserData(data.Login.token)
    this.props.history.push('/users');
  }

  private submit = (mutationFn: MutationFn, event: React.FormEvent) => {
    event.preventDefault()
    const {
      email,
      password,
    } = this.state;

    mutationFn({
      variables: {
        email,
        password,
      }
    });

  }

  private saveUserData = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  private setVariables = (value: string, type: string, valid: boolean) => {
    switch (type) {
      case 'email':
        this.setState({ email: value })
        if (valid) this.state.valid[0] = valid
        break;
      case 'password':
        this.setState({ password: value })
        if (valid) this.state.valid[1] = valid
        break;

      default:
        break;
    }
  }
}


