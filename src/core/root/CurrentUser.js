import React from 'react'
import { graphql, gql } from 'react-apollo'

const CurrentUser = ({ data }) => {
  if (data.loading || !data.currentUser) {
    return null
  }

  return (
    <div>
      Hello, {data.currentUser.email}. Conversations are:
      <ul>
        {data.conversations.map(conversation => {
          const participants = conversation.participants.map(({ name }) => name).join(', ')
          const lastMessage = conversation.messages.length > 0 ? conversation.messages[0] : null
          return (
            <li index={conversation.id}>
              {lastMessage && new Date(lastMessage.sentAt).toISOString()} {participants}: {lastMessage && lastMessage.body}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default graphql(gql`
  query ConversationList {
    currentUser {
      email
    }
    conversations {
      id,
      participants {
        name
      }
      messages(first: 1) {
        body,
        sentAt
      }
    }
  }
`)(CurrentUser)
