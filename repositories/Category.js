export default ($axios) => ({
  getCategories() {
    return $axios.$get(`/api/admin/categories`)
  }
})
