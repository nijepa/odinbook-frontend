<template>
  <div class="hello">
    <!-- <transition name="glide-fade"> -->
    <h1 class="login__title">Register</h1>


      <form v-if="type === 'signup'" @submit.prevent="signup(signupInput)" method="post">
        <div class="form__item">
          <label for="username">User name</label>
          <input @focus="clearErrors" v-model="signupInput.username" type="text" name="first_name" id="first_name" required>
        </div>
        <div class="form__item">
          <label for="first_name">First name</label>
          <input @focus="clearErrors" v-model="signupInput.first_name" type="text" name="first_name" id="first_name" required>
        </div>
        <div class="form__item">
          <label for="last_name">First name</label>
          <input @focus="clearErrors" v-model="signupInput.last_name" type="text" name="last_name" id="last_name" required>
        </div>
        <div class="form__item">
          <label for="email">E-mail</label>
          <input @focus="clearErrors" v-model="signupInput.email" type="email" name="email" id="email" required>
        </div>
        <div class="form__item">
          <label for="password">Password</label>
          <input @focus="clearErrors" v-model="signupInput.password" type="password" name="password" id="password" required>
        </div>
        <div class="form__btn">
          <button>Register</button><span>Account?<a class="register__link" @click="signType('login')" href="#">Login</a></span>
        </div>
      </form>
    <!-- <transition name="glide-fade"> -->
      <!-- <h1 class="odin">ODINBOOK</h1> -->
    <!-- </transition> -->
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Signup',
    props: {
      msg: String
    },
    data() {
      return {
        type: 'signup',
        signupInput: {
          email: '',
          password: '',
          username: '',
          first_name: '',
          last_name: ''
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
      ...mapActions([ 'signup', 
                      'signType',
                      'clearErrors' ]),
      changeType(type) {
        this.type = type;
      },
      setInput() {
        this.clearErrors;
      }
    },
  /*   created() {
      if(this.$route.query.type) {
        this.type = this.$route.query.type;
      }
    } */
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">

</style>
