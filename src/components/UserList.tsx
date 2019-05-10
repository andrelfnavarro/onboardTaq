import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import './UserList.css'
import { RouteComponentProps, Link } from 'react-router-dom';
import Loader from './Loader'

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

export interface UserListPageState{
  list: any[],
}


export default class UserListPage extends React.Component<UserListPageProps, UserListPageState> {
  constructor(props: UserListPageProps) {
    super(props);
    this.state = {
      list: []
    }
  }
  render() {
    return (
      <Query
        query={USERS_FETCH}>{(result: QueryResult) => {
          if (result.loading) return (
              Loader(result.loading)
          )
          if (result.error) return <h1>Erro!</h1>
            // this.state.list = result.data.Users.nodes
          return (

            <div>
              <h1 style={{ textAlign: 'center' }}> Usuários cadastrados</h1>
              <div className='addButtonBox'>
                <form onSubmit={(event) => this.props.history.push('/adduser')}>
                  <button type="submit" className='addButton'>Adicione um usuário</button>
                </form>
              </div>
              <div >
                <ul>
                  {result.data.Users.nodes.map((value: { name: string; email: string; id: string; }) =>
                    <li key={value.name}>
                      <div style={{ padding: 10, outline: 'solid' }}>
                          <div style={{ backgroundColor: '#e6b3ff' }}> Nome: {value.name}</div>
                          <div >E-mail: {value.email}
                            <Link to={'/userdetails/' + value.id}>
                              Details
                            </Link>
                          </div>
                        </div>
\                    </li>
                  )}
                </ul>
              </div>
            </div>

          )
        }
        }</Query>
    )
  }
}