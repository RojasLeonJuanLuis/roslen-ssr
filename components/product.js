import React from 'react'
import {
  Image,
  Card
} from '../stylesheet/styles'

const Product = (props) => {
  return (
    <Card>
      <div>
        <Image src={props.image} alt={props.name} />
      </div>
    </Card>
  )
}
export default Product
