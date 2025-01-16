import React from 'react'
import Title from '../components/shared/Title'
import AppLayout from '../components/layout/AppLayout'

const About = () => {
  return (
    <>
      <Title />
      <div>About</div>
    </>
  )
}

export default AppLayout()(About)