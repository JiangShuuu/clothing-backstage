
export default ($axios) => ({
  getProducts() {
    console.log(123)
    return $axios.$get(`/api/admin/products`)
  },
})

