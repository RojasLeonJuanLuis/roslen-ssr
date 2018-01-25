import React from 'react'
import {
  Image,
  Card
} from '../stylesheet/styles'

const Product = (props) => {
  return (
    <Card>
      <div className="container-image">
        <Image src={props.image} alt={props.name} />
      </div>
      <div className="props">
        <h3>{props.name}</h3>
        <p className="left">{props.description}</p>
      </div>
      <style jsx>{`
        .container-image {
          border-bottom: 1px solid rgb(246,246,246);
        }
        .props {
          width: 90%;
          text-align: left;
          margin: auto;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          bottom: 0;
          margin-bottom: 0;
          padding-bottom: 0;
        }
      `}
      </style>
    </Card>
  )
}
export default Product
