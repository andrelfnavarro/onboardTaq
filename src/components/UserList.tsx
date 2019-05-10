import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { ClipLoader } from 'react-spinners';
import './UserList.css'
import { RouteComponentProps } from 'react-router-dom';



const USERS_FETCH = gql`
query UserList{
  Users(limit:100){
    nodes{
      name
      email
    }
  }
}`

export interface UserListPageProps extends RouteComponentProps {
}

export default class UserListPage extends React.Component<UserListPageProps> {
  constructor(props: UserListPageProps) {
    super(props);
    this.state = {
      
    }
  }
  render() {
    return (
      <Query
        query={USERS_FETCH}>{(result: QueryResult) => {
          if (result.loading) return (
            <div className='sweet-loading' style={{ textAlign: 'center', display: 'block' }}>
              <ClipLoader
                sizeUnit={"px"}
                size={150}
                color={'#e6b3ff'}
                loading={result.loading}
              />
            </div>
          )
          if (result.error) return <h1>Erro!</h1>
          let list = result.data.Users.nodes
          return (

            <div>
              <h1 style={{ textAlign: 'center' }}> Usuários cadastrados</h1>
              <div className = 'addButtonBox'>
              <form onSubmit={(event) => this.props.history.push('/adduser')}> 
                <button type="submit" className='addButton'>Adicione um usuário</button>
                </form>
              </div>
              <div >
                <ul>
                  {Object.keys(list).map((i) =>
                    <li key={list[i].name}>
                      <div style={{ padding: 10 }}>
                        <div style={{ outline: 'solid' }}>
                          <div style={{ backgroundColor: '#e6b3ff' }}> Nome: {list[i].name}</div>
                          <div>email: {list[i].email}</div>
                        </div>
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
}