import Vue from 'vue'

export default (Vue) => {
  Vue.filter('filterLen', char => {
    if (char && char.length > 10 && typeof char === 'string') {
      return char.substr(0, 10) + '...'
    } else {
      return char || ''
    }
  })

}
