const BASE_URL = 'https://api-roslen-page.herokuapp.com/categories'
const api = {
  products: {
    async getProducts(page = 1) {
      const response = await fetch(`${BASE_URL}?_page=${page}`)
      const data = await response.json()
      return data
    },
    async getCleaningProducts() {
      const response = await fetch(`${BASE_URL}?category=cleaning`)
      const data = await response.json()
      return data
    }
  }
}
export default api
