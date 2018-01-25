import React, { Component } from 'react'
import Layout from '../containers/layout'
import Product from '../components/product'
import api from '../api'

import { ContainerProducts, SuperContainerProducts } from '../stylesheet/styles'

class Products extends Component {
  state = {
    products: [],
    loading: true,
    page: 1
  }

  async componentWillMount() {
    const products = await api.products.getProducts(this.state.page)
    this.setState({
      products,
      loading: false,
      page: this.state.page + 1
    })

    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    if(this.state.loading) { return null }

    const scrolled = window.scrollY
    const viewportHeight = window.innerHeight
    const fullHeight = document.body.clientHeight

    if (!(scrolled + viewportHeight + 300 >= fullHeight)) {
      return null;
    }

    this.setState({ loading: true }, async () => {
      try {
        const products = await api.products.getProducts(this.state.page)

        this.setState({
          products: this.state.products.concat(products),
          page: this.state.page + 1,
          loading: false,
        })
      }catch(error) {
        console.log(error);
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    return (
      <Layout>
        <div>
          {this.state.loading && (
            <div>Loading...</div>
          )}
          <SuperContainerProducts>
            <ContainerProducts>
              {this.state.products.map(product => {
                return <Product key={product.id} {...product} />
              })}
            </ContainerProducts>
          </SuperContainerProducts>
        </div>
      </Layout>
    )
  }
}

export default Products
