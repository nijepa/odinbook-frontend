export default {
  methods: {
    getImgUrl(pic) {
      return require('../assets/' + pic + '.png')
    },
  },
}