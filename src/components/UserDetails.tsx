import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult, QueryProps, OperationVariables } from 'react-apollo';
import './UserList.css'
import { RouteComponentProps } from 'react-router-dom';
import Loader from './Loader'

const USER_DATA = gql`
query UserDetails($id:Int!){
    User(id:$id){
      name
      id
      birthDate
      cpf
      role
      email
      
    }
  }
  `


export interface UserDetailsProps {
  id: string;
}
export default class UserDetailsPage extends React.Component<RouteComponentProps<UserDetailsProps>> {
  render() {
    return (
      <Query
        query={USER_DATA}
        variables={{
          id: this.props.match.params.id
        }}>{(result: QueryResult) => {
          if (result.loading) return (
            Loader(result.loading)
          )
          if (result.error) return <h1>{"Erro!" + result.error.message}</h1>
          let user = result.data.User
          return (
            <div>
              <h1 style={{ textAlign: 'center' }}> Dados de {user.name}</h1>
              <div >
                <div style={{ padding: 10, outline: 'solid' }} >
                  <div style={{ backgroundColor: '#e6b3ff' }}> Nome: {user.name}</div>
                  <div>E-mail: {user.email}</div>
                  <div style={{ backgroundColor: '#e6b3ff' }}>Role: {user.role}</div>
                  <div>ID: {user.id}</div>
                  <div style={{ backgroundColor: '#e6b3ff' }}>CPF: {user.cpf}</div>
                  <div>Data de nascimento: {user.birthDate}</div>
                </div>
              </div>
              <div>
                <form onSubmit={(event) => this.props.history.push('/users')}>
                  <button type="submit" className='addButton'>Voltar</button>
                </form>
              </div>
            </div>
          )
        }
      }</Query>
    )
  }
}