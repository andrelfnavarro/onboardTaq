import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { Mutation, MutationFn, MutationResult, } from 'react-apollo';
import { CustomLoader } from './Loader'
import { Title } from '../styles/Taqstyles'
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

export interface AddUserState {
  email: string;
  password: string;
  role: string;
  name: string;
  cpf: string;
  birthDate: string;
  valid:any
}

export default class AddUser extends React.Component<AddUserProps, AddUserState> {

  constructor(props: AddUserProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      cpf: '',
      role: '',
      birthDate: '',
      name: '',
      valid : [false,false,false,false,false,false]
    }
  }

  render() {
    const {
      email,
      name,
      password,
      role,
      cpf,
      birthDate
    } = this.state;
    return (
      <Mutation
        mutation={CREATE_OPERATION}
        variables={{
          email,
          name,
          password,
          role,
          cpf,
          birthDate
        }}
        onCompleted={this.handleCreateSuccess}
      >
        {(mutation: MutationFn<any>, result: MutationResult) => {
          if (result.loading) return <CustomLoader loading={result.loading}></CustomLoader>
          return (
            <>
              <form className="Login" onSubmit={(event) => this.submit(mutation, event)}>
                <Title>
                  Preencha os dados do novo usuário
                </Title>
                {result.error && <div style={{ textAlign: 'center', color: 'red' }}>
                  {"Erro!" + result.error.message}</div>}

                <div style={{ marginLeft: '45.5%', marginRight: '46%' }}>
                  <div>
                    <Form type="email" setFieldValue={this.setFieldValue}></Form>
                  </div>
                  <div>
                    <Form type="password" setFieldValue={this.setFieldValue}></Form>
                  </div>
                  <div>
                    <Form type="name" setFieldValue={this.setFieldValue}></Form>
                  </div>
                  <div>
                    <Form type="role" setFieldValue={this.setFieldValue}></Form>
                  </div>
                  <div>
                    <Form type="cpf" setFieldValue={this.setFieldValue}></Form>
                  </div>
                  <div>
                    <Form type="birthDate" setFieldValue={this.setFieldValue}></Form>
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <CustomButton type="submit" title="Criar" enabled =
                  {this.state.valid[0] &&
                    this.state.valid[1] &&
                    this.state.valid[2] &&
                    this.state.valid[3] &&
                    this.state.valid[4] &&
                    this.state.valid[5]
                  } />
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
    event.preventDefault()
    const {
      email,
      name,
      password,
      role,
      cpf,
      birthDate
    } = this.state;

    mutationFn({
      variables: {
        email,
        password,
        name,
        role,
        cpf,
        birthDate
      }
    });

  }

  private setFieldValue = (value: string, type: string, valid:boolean) => {
    switch (type) {
      case 'email':
        this.setState({ email: value })
        if(valid) this.state.valid[0] = valid
        break;
      case 'name':
        this.setState({ name: value })
        if(valid) this.state.valid[1] = valid
        break;
      case 'password':
        this.setState({ password: value })
        if(valid) this.state.valid[2] = valid
        break;
      case 'cpf':
        this.setState({ cpf: value })
        if(valid) this.state.valid[3] = valid
        break;
      case 'birthDate':
        this.setState({ birthDate: value })
        if(valid) this.state.valid[4] = valid
        break;
      case 'role':
        this.setState({ role: value })
        if(valid) this.state.valid[5] = valid
        break;
      default:
        break;
    }
  }

}

