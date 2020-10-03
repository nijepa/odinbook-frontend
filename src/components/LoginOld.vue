<template>
  <div class="hello">
    <!-- <transition name="glide-fade"> -->
      <h1 v-if="type === 'login'" class="login__title">{{ msg }}</h1>
      <h1 v-else class="login__title">Register</h1>
    <!-- </transition> -->
<!--     <transition name="slide-fade">
      <button v-if="type === 'login'" class="facebook">Facebook</button>
    </transition> -->
    <transition name="slide-fade">
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
          <button>Login</button><span>No account?<a class="register__link" @click="changeType('signup')" href="#">Register</a></span>
        </div>
        <p class="err" v-if="getErrors.length != 0">{{ getErrors }}</p>
      </form>
    </transition>
    <transition name="slide-fade">
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
          <button>Register</button><span>Account?<a class="register__link" @click="changeType('login')" href="#">Login</a></span>
        </div>
      </form>
    </transition>
    <!-- <transition name="glide-fade"> -->
      <h1 class="odin">ODINBOOK</h1>
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
      ...mapActions([ 'login', 
                      'signup', 
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
.login__title {
  border-left: 10px solid #2c3e50;
  border-radius: 10px;
  padding: 20px;
  grid-area: 'login__title';
}
.odin {
  font-size: 4em;
  padding: 20px;
  align-self: center;
  text-shadow: 0px 1px 3px rgba(0,0,0,0.88);
  grid-area: 'odin';
}
/* h3 {
  margin: 40px 0 0;
} */
/* a {
  color: #42b983;
} */
.hello {
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: #259de2;
  // grid-template-columns: auto auto;
  grid-template-areas: 'login_title facebook'
                        'form odin';
  grid-gap: 20px;
  padding: 20px;
  border-radius: 20px;
  height: 100vh;
  align-content: center;
}
form {
  border: 2px solid black;
  border-radius: 20px;
  display: grid;
  grid-area: 'form';
  justify-content: center;
  justify-items: left;
  gap: 20px;
  padding: 20px;
  background-color: #e2b625;
  margin: 5px;
}
.form__item {
  display: grid;
  gap: 5px;
  justify-items: left;
}
.form__btn {
  display: grid;
  grid-template-columns: auto auto;
  align-items: end;
  grid-column-gap: 10px;
}
input {
  font-family: 'Londrina Solid', cursive;
  font-size: 1.5em;
  border: 2px solid black;
  border-radius: 5px;
  background-color: #e2b625;
  box-shadow: 0px 4px 2px -1px rgba(0,0,0,0.75);
  transition: all .3s ease-in-out;
}
/* input:hover {
  background-color: whitesmoke;
}
input:focus {
  background-color: whitesmoke;
  border: 2px solid #13608d;
} */
button {
  font-family: 'Londrina Solid', cursive;
  font-size: 1.5em;
  background-color: #e2b625;
  color: var(--black);
  border: 2px solid black;
  border-radius: 15px;
  cursor: pointer;
  padding: 20px;
  box-shadow: 0px 4px 2px -1px rgba(0,0,0,0.75);
  transition: all .3s ease-in-out;
}
.facebook {
  grid-area: 'facebook';
}
button:hover {
  background-color: whitesmoke;
  // text-decoration: underline;
  transform: translate(1px);
}
.register__link {
  font-size: 20px;
  margin-left: 10px;
  color: #13608d;
  text-decoration: none;
}
.register__link:hover {
  color: whitesmoke;
  text-decoration: underline;
}
.err {
  color: var(--red);
}
@media (max-width: 799px) {
  .hello {
    grid-template-areas: 'login_title' 
                        'facebook'
                        'form' 
                        'odin';
  }
}

.flip-enter-active {
  transition: all .8s cubic-bezier(0.55, 0.085, 0.68, 0.53); //ease-in-quad
}

.flip-leave-active {
  transition: all .95s cubic-bezier(0.25, 0.46, 0.45, 0.94); //ease-out-quad
}

.flip-enter, .flip-leave-to {
  transform: scaleY(0) translateZ(0);
  opacity: 0;
}


/* Enter and leave animations can use different */
/* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .8s ease;
  }
/*   .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }  */
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(20px);
    opacity: 0;
  }



  .glide-fade-enter-active {
    transition: all .8s ease;
  }
/*   .glide-fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }  */
  .glide-fade-enter, .glide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateY(20px);
    opacity: 0;
  }
</style>
