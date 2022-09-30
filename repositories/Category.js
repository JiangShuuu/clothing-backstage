export default ($axios) => ({
  getCategories() {
    return $axios.$get(`/admin/categories`)
  }
})
