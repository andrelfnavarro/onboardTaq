import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import Loader from './Loader'
import { Button, Title, StripedListLine } from '../styles/Taqstyles'


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
              <Title> Dados de {user.name}</Title>
              <div >
                <div style={{ padding: 10, outline: 'solid' }} >
                  <StripedListLine> Nome: {user.name}</StripedListLine>
                  <div>E-mail: {user.email}</div>
                  <StripedListLine>Role: {user.role}</StripedListLine>
                  <div>ID: {user.id}</div>
                  <StripedListLine>CPF: {user.cpf}</StripedListLine>
                  <div>Data de nascimento: {(user.birthDate)}</div>
                </div>
              </div>
              <div>
                <form
                  style={{ textAlign: "center" }}
                  onSubmit={(event) => this.props.history.push('/users')}>
                  <Button type="submit">Voltar</Button>
                </form>
              </div>
            </div>
          )
        }
        }</Query>
    )
  }
}