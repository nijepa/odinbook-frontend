<template>
  <div class="hello">
    <!-- <transition name="glide-fade"> -->
      <h1  class="login__title">Login</h1>

    <!-- </transition> -->
<!--     <transition name="slide-fade">
      <button v-if="type === 'login'" class="facebook">Facebook</button>
    </transition> -->

      <form v-if="type === 'login'" @submit.prevent="login(loginInput)" method="post">
        <div class="form__item">
          <label for="email">E-mail</label>
          <input @focus="clearErrors" v-model="loginInput.email" type="email" name="email" id="email" required>
        </div>
        <div class="form__item">
          <label for="password">Password</label>
          <input @focus="clearErrors" v-model="loginInput.password" type="password" name="password" id="password" required>
        </div>
        <div class="form__btn">
          <button>Login</button><span>No account?<a class="register__link" @click="signType('signup')" href="#">Register</a></span>
        </div>
        <p class="err" v-if="getErrors.length != 0">{{ getErrors }}</p>
      </form>

    <!-- <transition name="glide-fade"> -->
      <!-- <h1 class="odin">ODINBOOK</h1> -->
    <!-- </transition> -->
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Login',
    props: {
      msg: String
    },
    data() {
      return {
        type: 'login',
        loginInput: {
          email: '',
          password: ''
        },
        user: {}
      }
    },
    computed: {
      ...mapGetters([ 'getInputType', 
                      'loggedUser', 
                      'getErrors' ]),
    },
    methods: {
      ...mapActions([ 'login', 
                      'signType',
                      'clearErrors' ]),
      changeType(type) {
        this.$emit('sign-type', type);
        this.type = type;
      },
      setInput() {
        this.clearErrors;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">

</style>
