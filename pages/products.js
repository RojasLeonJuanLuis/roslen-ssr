import React from 'react'
import Layout from '../containers/layout'
import api from '../api'

class Products extends React.Component {
  async componentDidMount() {
    const response = await api.products.getProducts()
    console.log(response);
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
