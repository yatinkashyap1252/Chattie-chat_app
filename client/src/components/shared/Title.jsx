import React from 'react'
import { Helmet } from "react-helmet-async";

const Title = ({title='Chattie',description='this is the chat app named-chattie'}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' description={description}/>
    </Helmet>
  )
}

export default Title