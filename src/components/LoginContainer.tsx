import React from 'react';
import { gql } from 'apollo-boost';

const LOGIN_OPERATION = gql`
mutation LoginOp($email:String!, $password:String!){
  Login(data: { 
    email: $email
    password: $password
  }) {
    user {
      id
      name
    }
    token
  }
}
`