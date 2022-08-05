import createRepository from '~/repositories/Repository'

export default ({ $axios }, inject) => {
  inject('rpos', createRepository($axios))
}
