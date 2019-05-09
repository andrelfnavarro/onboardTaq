import React from 'react';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { ClipLoader } from 'react-spinners';


const USERS_FETCH = gql`
query UserList{
  Users{
    nodes{
      name
      email
    }
  }
}`

export default class UserListPage extends React.Component {

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