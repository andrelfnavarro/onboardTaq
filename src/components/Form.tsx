import React from 'react';
import { InputStyled, Label } from '../styles/Taqstyles'
import { FormErrors } from './FormErrors';

export interface FormProps {
  type: string;
  setVariables: (value: string, valid: boolean) => (void)
}

export interface FormState {
  formErrors: any;
  content: string;
  valid: boolean;
}

export default class Form extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      content: '',
      valid: true,
      formErrors: { content: '' },
    }
  }

  render() {
    const type = this.props.type;

    return (
      <>
        <div style={{ textAlign: "left" }}>
          <Label>{this.validateField(type, null, true)}</Label>
        </div>
        <InputStyled
          name={type}
          type={type}
          valid={this.state.valid}
          onBlur={this.handleInputBlur}
        />
        <FormErrors formErrors={this.state.formErrors} />
      </>
    )
  }

  private handleInputBlur = (event : any) => {
    this.validateField(this.props.type, event.target.value, false);
  }

  private validateField(fieldName: string, value: any, active?:boolean) {
    let fieldFormErrors = this.state.formErrors;
    let { valid } = this.state;

    switch (fieldName) {
      case 'email':
        if(active) return 'E-mail: '
        valid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldFormErrors.content = valid ? '' : ' inválido!';
        this.props.setVariables(value, valid)
        break;
      case 'name':
      if(active) return 'Nome: '
        valid = value.match(/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)$/i);
        fieldFormErrors.content = valid ? '' : 'inválido!';
        this.props.setVariables(value, valid)
        break;
      case 'password':
      if(active) return 'Senha: '
        valid = value.match(/^((?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,})$/i);
        fieldFormErrors.content = valid ? '' : 'inválido. Deve conter mais de sete caracteres (um número e uma letra).';
        this.props.setVariables(value, valid)
        break;
      case 'cpf':
      if(active) return 'CPF: '
        valid = value.match(/^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/i);
        fieldFormErrors.content = valid ? '' : 'inválido. Deve ser um CPF válido.';
        this.props.setVariables(value, valid)
        break;
      case 'birthDate':
      if(active) return 'Data de nascimento: '
        valid = value.match(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/i);
        fieldFormErrors.content = valid ? '' : 'inválido. Deve ser uma data válida.';
        this.props.setVariables(value, valid)
        break;
      case 'role':
      if(active) return 'Role: '
        valid = value.match(/^(admin)|(user)$/i);
        fieldFormErrors.content = valid ? '' : 'inválido. Deve possuir função válida.';
        this.props.setVariables(value, valid)
        break;
      default:
        break;
    }

    this.setState({
      formErrors: fieldFormErrors,
      valid: valid
    });
  }


}

