import React from "react"
import { Query } from "react-apollo";
import gql from "graphql-tag"

const ExchangeRates=()=>(
  <Query query={gql`
  mutation{
    signIn(signIn:"1",password:"1"){
      token
    }
  }
  `}>
{({ loading, error, data }: any) => {
  console.log(data)
  return <div>123</div>
}}
  </Query>
)