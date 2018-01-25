import React, { Component } from 'react'
import Layout from '../containers/layout'
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
        Products
      </Layout>
    )
  }
}

export default Products
