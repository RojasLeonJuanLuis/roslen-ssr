import React from 'react'

const Product = (props) => {
  return (
    <div>
      <div>
        <img style={{width: '20%'}} src={props.image} alt={props.name} />
      </div>
    </div>
  )
}
export default Product
