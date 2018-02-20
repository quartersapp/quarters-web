import React from 'react'
import css from './style.scss'
import NavDrawerButton from './NavDrawerButton'

const Container = ({ children }) => (
  <div>
    <header className={css.header}>
      <NavDrawerButton onClick={() => {}} />
    </header>
    {children}
  </div>
)

export default Container
