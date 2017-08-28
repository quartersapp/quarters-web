import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const CurrentUser = ({ data }) => {
  if (data.loading) {
    return null
  }

  return (
    <div>
      Hello, {data.currentUser.email}
    </div>
  )
}

export default graphql(gql`
  query CurrentUser { currentUser { email } }
`)(CurrentUser)
