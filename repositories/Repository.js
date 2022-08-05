import Products from '~/repositories/Products'
import Categories from '~/repositories/Category'

export default ($axios) => ({
  product: Products($axios),
  category: Categories($axios)
})
