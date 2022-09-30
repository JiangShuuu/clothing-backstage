export default ($axios) => ({
  getProducts() {
    return $axios.$get(`/admin/products`)
  },
  postProduct(formData) {
    return $axios.$post(`/admin/product`, formData)
  },
  putProduct(id, formData) {
    return $axios.$put(`/admin/product/${id}`, formData)
  },
  deleteProduct(id) {
    return $axios.$delete(`/admin/product/${id}`)
  }
})

