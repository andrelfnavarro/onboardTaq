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
  token: string;
}

export default class LoginPage extends React.Component<LoginPageProps, LoginPageState>{
  private validFields = {
    email: '',
    password: ''
  }
  constructor(props: LoginPageProps) {
    super(props);
    this.state = {
      token: "",
    }
  }
  render() {
    const {
      email,
      password,
    } = this.validFields;

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
                    <Form type="email" setVariables={this.setEmail}></Form>
                    <Form type="password" setVariables={this.setPassword}></Form>
                  </SideMarginStyled>
                  <CustomButton type="submit" title="Entrar"/>
                </form>
              </>
            )
          }}
        </Mutation>
      </Wrapper>
    );
  }

  private handleLoginSuccess = (data: any) => {
    this.saveUserData(data.Login.token)
    this.props.history.push('/users');
  }

  private submit = async (mutationFn: MutationFn, event: React.FormEvent) => {
    const isFormValid: boolean = !!this.validFields.email &&
      !!this.validFields.password;
    if (isFormValid) {
      mutationFn({ variables: this.validFields });
    }
  }

  private saveUserData = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  private setEmail = (value:string, valid: boolean) => {
    if (valid) this.validFields.email = value
  }

  private setPassword = (value:string, valid: boolean) => {
    if (valid) this.validFields.password = value
  }
}


