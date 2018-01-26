import React, { Component } from 'react'
import Layout from '../containers/layout'
import Product from '../components/product'
import Loading from '../components/shared/loading'
import HeroProducts from '../components/hero-products'

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
      page: this.state.page + 1,
      all: true
    })

    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    if(this.state.all) {
      if(this.state.loading) return null
      if(this.state.page > 5) {
        return null
        this.setState({
          loading: false
        })
      }

      const scrolled = window.scrollY
      const viewportHeight = window.innerHeight
      const fullHeight = document.body.clientHeight

      if (!(scrolled + viewportHeight + 350 >= fullHeight)) {
        return null;
      }

      this.setState({ loading: true }, async () => {
        const products = await api.products.getProducts(this.state.page)

        this.setState({
          products: this.state.products.concat(products),
          page: this.state.page + 1,
          loading: false,
        })
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleFetchCleaning = async () => {
    const cleaningProducts = await api.products.getCleaningProducts()
    this.setState({
      products: cleaningProducts,
      loading: false,
      all: false
    })
  }

  render() {
    return (
      <Layout>
        <div>
          <HeroProducts getProductsCleaning={this.handleFetchCleaning} />
          <SuperContainerProducts>
            <ContainerProducts>
              {this.state.products.map(product => {
                return <Product key={product.id} {...product} />
              })}
            </ContainerProducts>
          </SuperContainerProducts>
          {this.state.loading && (
            <Loading />
          )}
        </div>
      </Layout>
    )
  }
}

export default Products
