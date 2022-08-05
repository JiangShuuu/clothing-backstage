import Products from '~/repositories/Products'

export default ($axios) => ({
  product: Products($axios),
})
