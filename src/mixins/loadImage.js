export default {
  methods: {
    getImgUrl(pic) {
      return require('../assets/images/' + pic + '.png')
    },
  },
}