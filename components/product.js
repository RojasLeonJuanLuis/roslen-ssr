import React from 'react'
import styled from 'styled-components'

const Hey = styled.img`
  background: red;
  width: 10%;
`


const Product = (props) => {
  return (
    <div>
      <div>
        <Hey src={props.image} alt={props.name} />
      </div>
    </div>
  )
}
export default Product
