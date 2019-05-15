import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { RouteComponentProps, Link } from 'react-router-dom';
import {CustomLoader} from './Loader'
import {Title, StripedListLine } from '../styles/Taqstyles'
import { CustomButton } from './Button';

const USERS_FETCH = gql`
query UserList{
  Users(limit:100){
    nodes{
      name
      email
      id
    }
  }
}`

export interface UserListPageProps extends RouteComponentProps {
}

export interface UserListPageState {
}


export default class UserListPage extends React.Component<UserListPageProps, UserListPageState> {
  constructor(props: UserListPageProps) {
    super(props);
    this.state = {
      currentPage: 1,
      usersPerPage: 10
    }
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (
      <Query
        query={USERS_FETCH}>{(result: QueryResult) => {
          if (result.loading) return <CustomLoader loading={result.loading}></CustomLoader>
          if (result.error) return <h1>Erro!</h1>
          return (
            <div>
              <Title style={{ textAlign: 'center' }}> Usuários cadastrados</Title>
              <div
                style={{ textAlign: "center" }}>
                <form onSubmit={(event) => this.props.history.push('/adduser')}>
                <CustomButton type="submit" title="Adicionar usuário" enabled />
                </form>
              </div>
              <div >
                <ul>
                  {result.data.Users.nodes.map((value: { name: string; email: string; id: string; }) =>
                    <li key={value.name}>
                      <div style={{ padding: 10, outline: 'solid' }}>
                        <StripedListLine> Nome: {value.name}</StripedListLine>
                        <div>E-mail: {value.email}</div>
                        <StripedListLine>
                          <Link
                            style={{ fontWeight: "bold" }}
                            to=
                            {'/userdetails/' + value.id}
                          >
                            Detalhes
                          </Link>
                        </StripedListLine>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>

          )
        }
        }</Query>

    )
  }

  private handleClick(e: any) {
    this.setState({
      currentPage: Number(e.target.id)
    });
  }
}
