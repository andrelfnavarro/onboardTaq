import { gql } from 'apollo-boost';
import React from 'react';
import { Mutation, MutationFn, MutationResult, } from 'react-apollo';
import { AUTH_TOKEN } from '../constants';
import { FormErrors } from './FormErrors';
import "./Login.css";
import { RouteComponentProps } from 'react-router-dom';
import { css } from '@emotion/core';
import Loader from './Loader'

export const override: any = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    display:block;
    margin: 0 auto;
`;

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
      email: 'admin@taqtile.com',
      password: '1111',
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
            
              <form className="Login" onSubmit={(event) => this.submit(mutation, event)}>
                <h1>
                  Bem-vindo(a) à Taqtile!
              </h1>
                <div className="panel panel-default">
                  <FormErrors formErrors={this.state.formErrors} />
                </div>
                {result.error && <div style={{ textAlign: 'center', color: 'red' }}>{"Erro!" + result.error.message}</div>}

                <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                  <label htmlFor="email">E-mail</label>
                  <input type="email" required className="form-control" name="email"
                    value={this.state.email}
                    onChange={this.handleUserEmail} />
                </div>

                <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                  <label htmlFor="password">Senha</label>
                  <input type="password" className="form-control" name="password"
                    value={this.state.password}
                    onChange={this.handleUserPassword} />
                </div>
                <button type="submit" disabled={!this.state.formValid} >Entrar</button>
              </form>
            </>
          )
        }}
      </Mutation>
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
        fieldValidationErrors.password = passwordValid ? '' : 'inválida. Deve conter mais de 7 caracteres (um número e uma letra)';
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
  private submit = async (mutationFn: MutationFn, event: React.FormEvent) => {
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
    sessionStorage.setItem(AUTH_TOKEN, token)
  }
}


