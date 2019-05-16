import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import { CustomLoader } from './Loader'
import { H1, StripedListLine } from '../styles/Taqstyles'
import { CustomButton } from './Button';


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
          if (result.loading) return <CustomLoader loading={result.loading}></CustomLoader>
          if (result.error) return <h1>{"Erro!" + result.error.message}</h1>
          let user = result.data.User
          return (
            <div>
              <H1> Dados de {user.name}</H1>
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
                  <CustomButton type="submit" title="Voltar"/>
                </form>
              </div>
            </div>
          )
        }
        }</Query>
    )
  }
}
