
export default ($axios) => ({
  getProducts() {
    return $axios.$get(`/api/admin/products`)
  },
  postProduct(formData) {
    return $axios.$post(`/api/admin/product`, formData)
  },
  putProduct(id, formData) {
    return $axios.$put(`/api/admin/product/${id}`, formData)
  },
  deleteProduct(id) {
    return $axios.$delete(`/api/admin/product/${id}`)
  }
})

