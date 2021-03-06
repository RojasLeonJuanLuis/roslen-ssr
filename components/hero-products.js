import React from 'react'

import {
  HeroContainerProducts,
  Title,
  CardFetch
} from '../stylesheet/hero-products'

const HeroProducts = (props) => {
  return (
    <HeroContainerProducts onClick={props.getProductsCleaning}>
      <Title>Productos Roslen</Title>
      <CardFetch>
        <h3>Productos de limpieza</h3>
      </CardFetch>
    </HeroContainerProducts>
  )
}
export default HeroProducts
