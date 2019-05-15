import React from 'react';
import { InputStyled, Label } from '../styles/Taqstyles'
import { FormErrors } from './FormErrors';

export interface FormProps {
  type: string;
  setVariables: (value: string, type: string, valid: boolean) => (void)
}

export interface FormState {
  formErrors: any;
  content: string;
  valid: boolean;
}

export default class Form extends React.Component<FormProps, FormState> {
  // private validator: (value: string) => boolean;
  // private label: string;
  // private caption: string;

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
          <Label>{this.decideLabel(type)}</Label>
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

  private decideLabel = (type: string) => {
    let labelString: string = '';
    switch (type) {
      case 'email':
        labelString = "E-mail: "
        break;
      case 'name':
        labelString = "Nome: "
        break;
      case 'password':
        labelString = "Senha: "
        break;
      case 'cpf':
        labelString = "CPF: "
        break;
      case 'birthDate':
        labelString = "Data de nascimento: "
        break;
      case 'role':
        labelString = "Role: "
        break;
      default:
        break;
    }
    return labelString;
  }

  private handleInputBlur = (event : any) => {
    this.validateField(this.props.type, event.target.value);
  }

  private validateField(fieldName: string, value: any) {
    let fieldFormErrors = this.state.formErrors;
    let { valid } = this.state;

    switch (fieldName) {
      case 'email':
        valid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldFormErrors.content = valid ? '' : ' inválido!';
        this.props.setVariables(value, this.props.type, valid)
        break;
      case 'name':
        valid = value.match(/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)$/i);
        fieldFormErrors.content = valid ? '' : 'inválido.';
        this.props.setVariables(value, this.props.type, valid)
        break;
      case 'password':
        valid = value.match(/^((?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,})$/i);
        fieldFormErrors.content = valid ? '' : 'inválido. Deve conter mais de sete caracteres (um número e uma letra).';
        this.props.setVariables(value, this.props.type, valid)
        break;
      case 'cpf':
        valid = value.match(/^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/i);
        fieldFormErrors.content = valid ? '' : 'inválido. Deve ser um CPF válido.';
        this.props.setVariables(value, this.props.type, valid)
        break;
      case 'birthDate':
        valid = value.match(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/i);
        fieldFormErrors.content = valid ? '' : 'inválido. Deve ser uma data válida.';
        this.props.setVariables(value, this.props.type, valid)
        break;
      case 'role':
        valid = value.match(/^(admin)|(user)$/i);
        fieldFormErrors.content = valid ? '' : 'inválido. Deve possuir função válida.';
        this.props.setVariables(value, this.props.type, valid)
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

