import React from 'react'
import { graphql, gql } from 'react-apollo'

const CurrentUser = ({ data }) => {
  if (data.loading || !data.currentUser) {
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
