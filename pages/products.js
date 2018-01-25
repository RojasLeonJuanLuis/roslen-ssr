import React, { Component } from 'react'
import Layout from '../containers/layout'
import Product from '../components/product'
import api from '../api'

import { ContainerProducts } from '../stylesheet/styles'

class Products extends Component {
  state = {
    products: [],
    loading: false
  }

  async componentWillMount() {
    const products = await api.products.getProducts()
    this.setState({
      products,
      loading: true
    })
  }

  render() {
    return (
      <Layout>
        <div>
          {!this.state.loading && (
            <div>Loading...</div>
          )}
          <ContainerProducts>
            {this.state.products.map(product => {
              return <Product key={product.id} {...product} />
            })}
          </ContainerProducts>
        </div>
      </Layout>
    )
  }
}

export default Products
