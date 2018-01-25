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
      <div className="props">
        <h3>{props.name}</h3>
        <p className="left">{props.description}</p>
      </div>
      <style jsx>{`
        .props {
          width: 90%;
          text-align: left;
          margin: auto;
        }
      `}
      </style>
    </Card>
  )
}
export default Product
