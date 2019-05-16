import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Mutation, MutationFn, MutationResult, } from 'react-apollo';
import { CustomLoader } from './Loader'
import { H1, SideMarginStyled } from '../styles/Taqstyles'
import { CustomButton } from './Button';
import Form from './Form'

const CREATE_OPERATION = gql`
  mutation CreateOp($email:String!, $password:String!, $name:String!, $role:UserRoleType!, $cpf:String!, $birthDate:String!){
    UserCreate(data: {
        email: $email
        password: $password
        name: $name
        role: $role
        cpf: $cpf
        birthDate: $birthDate
    }){
        name
        email
    }
  }
  `

export interface AddUserProps extends RouteComponentProps {
}

export default class AddUser extends React.Component<AddUserProps> {

  private validFields = {
    email: '',
    password: '',
    cpf: '',
    role: '',
    birthDate: '',
    name: ''
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_OPERATION}
        variables={this.validFields}
        onCompleted={this.handleCreateSuccess}
      >
        {(mutation: MutationFn<any>, result: MutationResult) => {
          if (result.loading) return <CustomLoader loading={result.loading}></CustomLoader>
          return (
            <>
              <form className="Login" onSubmit={(event) => this.submit(mutation, event)}>
                <H1>
                  Preencha os dados do novo usuário
                </H1>
                {result.error && <div style={{ textAlign: 'center', color: 'red' }}>
                  {"Erro!" + result.error.message}</div>}
                <SideMarginStyled>
                  <Form type="email" setVariables={this.setEmail}></Form>
                  <Form type="password" setVariables={this.setPassword}></Form>
                  <Form type="name" setVariables={this.setName}></Form>
                  <Form type="role" setVariables={this.setRole}></Form>
                  <Form type="cpf" setVariables={this.setCPF}></Form>
                  <Form type="birthDate" setVariables={this.setBirthDate}></Form>
                </SideMarginStyled>
                <div style={{ textAlign: "center" }}>
                  <CustomButton type="submit" title="Criar" />
                </div>
              </form>
            </>
          )
        }}
      </Mutation>
    );
  }

  private handleCreateSuccess = (data: any) => {
    this.props.history.push('/users');
  }
  private submit = async (mutationFn: MutationFn, event: React.FormEvent) => {
    const isFormValid: boolean = !!this.validFields.email &&
      !!this.validFields.name &&
      !!this.validFields.cpf &&
      !!this.validFields.role &&
      !!this.validFields.birthDate &&
      !!this.validFields.password;

    if (isFormValid) {
      mutationFn({ variables: this.validFields });
    }
  }

  private setEmail = (value:string, valid: boolean) => {
    if (valid) this.validFields.email = value
  }

  private setName = (value:string, valid: boolean) => {
    if (valid) this.validFields.name = value
  }
  private setRole = (value:string, valid: boolean) => {
    if (valid) this.validFields.role = value
  }
  private setCPF = (value:string, valid: boolean) => {
    if (valid) this.validFields.cpf = value
  }
  private setPassword = (value:string, valid: boolean) => {
    if (valid) this.validFields.password = value
  }
  private setBirthDate = (value:string, valid: boolean) => {
    if (valid) this.validFields.birthDate = value
  }
  // private setVariables = (value: string, type: string, valid: boolean) => {
  //   switch (type) {
  //     case 'email':
  //       if (valid) this.validFields.email = value
  //       break;
  //     case 'name':
  //       if (valid) this.validFields.name = value
  //       break;
  //     case 'password':
  //       if (valid) this.validFields.password = value
  //       break;
  //     case 'cpf':
  //       if (valid) this.validFields.cpf = value
  //       break;
  //     case 'birthDate':
  //       if (valid) this.validFields.birthDate = value
  //       break;
  //     case 'role':
  //       if (valid) this.validFields.role = value
  //       break;
  //     default:
  //       break;
  //   }
  // }
}

