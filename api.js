const BASE_URL = 'https://api-roslen-page.herokuapp.com/categories'
const api = {
  products: {
    async getProducts() {
      const response = await fetch(`${BASE_URL}?_page=1`)
      const data = await response.json()
      return data
    }
  }
}
export default api
