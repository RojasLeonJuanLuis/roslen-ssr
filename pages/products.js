import React, { Component } from 'react'
import Layout from '../containers/layout'
import Product from '../components/product'
import api from '../api'

class Products extends Component {
  state = {
    products: []
  }

  async componentWillMount() {
    const products = await api.products.getProducts()
    this.setState({
      products
    })
  }

  render() {
    return (
      <Layout>
        <div>
          {this.state.products.map(product => {
            return <Product key={product.id} {...product} />
          })}
        </div>
      </Layout>
    )
  }
}

export default Products
