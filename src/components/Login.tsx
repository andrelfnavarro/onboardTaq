import { gql } from 'apollo-boost';
import React from 'react';
import { Mutation, MutationFn, MutationResult, } from 'react-apollo';
import { AUTH_TOKEN } from '../constants';
import { FormErrors } from './FormErrors';
import { RouteComponentProps } from 'react-router-dom';
import { css } from '@emotion/core';
import Loader from './Loader'
import { Title, Button, Label, Input, Wrapper, Logo } from '../styles/Taqstyles'
import logo from '../styles/taqtile.png'

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
  emailValid: boolean;
  passwordValid: boolean;
  formErrors: any;
  email: string;
  password: string;
  formValid: boolean;
  token: string;
}

export default class LoginPage extends React.Component<LoginPageProps, LoginPageState>{
  constructor(props: LoginPageProps) {
    super(props);
    this.state = {
      token: "",
      email: '',
      password: '',
      formErrors: { email: '', password: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false
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
            if (result.loading) return (
              Loader(result.loading)
            )
            return (
              <>
                <form className="Login" onSubmit={(event) => this.submit(mutation, event)}
                  style={{ textAlign: "center" }}>
                  <Logo src={logo} alt="Logo" />
                  <Title>
                    Bem-vindo(a) à Taqtile!
                </Title>
                  {result.error &&
                    <div
                      style={{
                        textAlign: 'center',
                        color: 'red'
                      }}>
                      {"Erro!" + result.error.message}</div>}
                  <div style={{ marginLeft: '45.5%', marginRight: '46%' }}>
                    <div
                      style={{ textAlign: "left" }}
                      className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                      <Label htmlFor="email">email: </Label>
                    </div>
                    <div>
                      <Input type="email" required className="form-control" name="email"
                        value={this.state.email}
                        onChange={this.handleUserEmail} />
                    </div>

                    <div
                      style={{ textAlign: "left" }}
                      className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                      <Label htmlFor="password">senha: </Label>
                      </div>
                      <div>
                        <Input type="password" className="form-control" name="password"
                          value={this.state.password}
                          onChange={this.handleUserPassword} />
                      </div>
                  </div>
                  <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                  </div>
                  <Button 
                  type="submit" disabled={!this.state.formValid} >Entrar</Button>
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

  private handleUserEmail = (e: any) => {
    const value = e.target.value;
    this.setState({ email: value }, () => { this.validateField("email", value) });
  }

  private handleUserPassword = (e: any) => {
    const { value } = e.target;
    this.setState({ password: value }, () => { this.validateField("password", value) })
  }

  private validateField(fieldName: string, value: any) {
    let fieldValidationErrors = this.state.formErrors;
    let { emailValid, passwordValid } = this.state;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' inválido!';
        break;
      case 'password':
        passwordValid = value.match(/^((?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,})$/i);
        fieldValidationErrors.password = passwordValid ? '' : 'inválida!';
        break;
      default:
        break;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  private validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
  }

  private errorClass(error: any) {
    return (error.length === 0 ? '' : 'has-error');
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
}


