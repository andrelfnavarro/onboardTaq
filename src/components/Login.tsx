import React, { Component } from 'react';
import "./Login.css";
import { FormErrors } from './FormErrors';

export interface LoginPageProps {
}
  
export interface LoginPageState {
  emailValid: boolean;
  passwordValid: boolean;
  formErrors: any;
  email: string;
  password: string;
  formValid: boolean;
}

export default class LoginPage extends React.Component<LoginPageProps, LoginPageState>{
  constructor (props: LoginPageProps) {
    super(props);
      this.state = {
        email: '',
        password: '',
        formErrors: {email: '', password: ''},
        emailValid: false,
        passwordValid: false,
        formValid: false
      }
  }
    
  private handleUserEmail =  (e: any) => {
      const value = e.target.value;
      this.setState({ email: value }, () => { this.validateField("email", value) });
  }
        
  private handleUserPassword = (e: any) =>{
      const value = e.target.value;
      this.setState({password: value }, () => { this.validateField("password", value)})
  }
    
  private validateField(fieldName:string, value:any) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' inválido!';
        break;
      case 'password':
        passwordValid = value.match (/^((?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,})$/i);
        fieldValidationErrors.password = passwordValid ? '': ' inválida!';
        break;
      default:
        break;
    }

    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
    }
    
  private validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }
    
  private errorClass(error: any) {
    return(error.length === 0 ? '' : 'has-error');
  }


  render(){
      return(
      <form className="Login">
      <h1>
          Bem-vindo(a) à Taqtile!
      </h1>

      <div className="panel panel-default">
        <FormErrors formErrors={this.state.formErrors} />
      </div>

      <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
        <label htmlFor="email">E-mail</label>
        <input type="email" required className="form-control" name="email"
          value={this.state.email}
          onChange={this.handleUserEmail}  />
      </div>

      <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
        <label htmlFor="password">Senha</label>
        <input type="password" className="form-control" name="password"
          value={this.state.password}
          onChange={this.handleUserPassword}  />
      </div>

      <button type="submit" disabled={!this.state.formValid}>Entrar</button>
    </form>
      );
  }
}


    