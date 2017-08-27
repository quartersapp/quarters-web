import React from 'react'
import _ from 'lodash'

const App = props => (
  <h1>{_.times(3, n => `${n}`)}</h1>
)

export default App
