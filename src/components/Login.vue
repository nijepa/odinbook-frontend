<template>
  <div class="hello">
    <h1 class="login__title">Login</h1>

    <div class="cont">
      <form v-if="type === 'login'" @submit.prevent="login(loginInput)" method="post">
        <div class="form__item">
          <label for="email">E-mail</label>
          <input @focus="clearErrors" v-model="loginInput.email" 
                  type="email" name="email" id="email" required>
        </div>
        <div class="form__item">
          <label for="password">Password</label>
          <input @focus="clearErrors" v-model="loginInput.password" 
                  type="password" name="password" id="password" >
        </div>
        <div class="form__btn">
          <button>Login</button>
          <span>No account?
            <a class="register__link" @click="signType('signup')" href="#">Register</a>
          </span>
        </div>
        <p class="err" v-if="getErrors.length != 0">{{ getErrors }}</p>
        <hr>
      </form>

      <div class="fb__info">
        <p class="option_title">Or Log In With :</p>

        <facebook-login class="button facebook__style"
                        :appId=FB_ID
                        @login="onLogin"
                        @logout="onLogout"
                        @get-initial-status="getUserData"
                        @sdk-loaded="sdkLoaded">
        </facebook-login>

        <GoogleLogin class="google__btn" 
                      :params="params" 
                      :renderParams="renderParams" 
                      :onSuccess="onSuccess" 
                      :onFailure="onFailure">
        </GoogleLogin>

        <div v-if="isConnected" class="information">
          <h1>User Info</h1>
          <div class="well">
            <div class="list-item">
              <img :src="userSocial.picture" class="user__img">
            </div>
            <div class="list-item">
              <i>{{ userSocial.name }}</i>
            </div>
            <div class="list-item">
              <i>{{ userSocial.email }}</i>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import facebookLogin from 'facebook-login-vuejs';
  import GoogleLogin from 'vue-google-login';

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
        user: {},
        userSocial: {
          name: '',
          email: '',
          personalID: '',
          picture: '',
          first_name: '',
          last_name: '',
          location: '',
          gender: '',
          birthday: '',
          isSocial: true
        },
        isConnected: false,
        FB: undefined,
        FB_ID: process.env.VUE_APP_FACEBOOK_ID,
        params: {
            client_id: process.env.VUE_APP_GOOGLE_ID
        },
        // only needed if you want to render the button with the google ui
        renderParams: {
            width: 230,
            height: 35,
            longtitle: true,
            //theme: 'dark'
        }
      }
    },

    components: {
      facebookLogin, GoogleLogin
    },

    computed: {
      ...mapGetters([ 'getInputType', 
                      'loggedUser', 
                      'getErrors',
                      'isLogged' ]),
    },

    methods: {
      ...mapActions([ 'login', 
                      'logout',
                      'signType',
                      'clearErrors' ]),
      changeType(type) {
        this.$emit('sign-type', type);
        this.type = type;
      },
      setInput() {
        this.clearErrors;
      },
      getUserData() {
        this.FB.api('/me', 'GET', { fields: 'id, name, email, first_name, last_name, location, hometown, gender, birthday, picture' },
          user => {
            this.userSocial.personalID = user.id;
            this.userSocial.email = user.email;
            this.userSocial.name = user.name;
            this.userSocial.picture = user.picture.data.url;
            this.userSocial.first_name = user.first_name;
            this.userSocial.last_name = user.last_name;
            this.userSocial.gender = user.gender;
            this.userSocial.location = user.location;
            this.userSocial.birthday = user.hometown;
          }
        )
      },
      sdkLoaded(payload) {
        this.isConnected = payload.isConnected
        this.FB = payload.FB
        if (this.isConnected) this.getUserData()
      },
      onLogin() {
        this.isConnected = true
        this.getUserData()
        this.login(this.userSocial)
      },
      onLogout() {
        this.isConnected = false;
        this.logout(this.loggedUser)
      },
      onSuccess(googleUser) {
        // This only gets the user information: id, name, imageUrl and email
        const user = googleUser.getBasicProfile();
        this.userSocial.email = user.Wt;
        this.userSocial.name = user.Ad;
        this.userSocial.picture = user.JJ;
        this.userSocial.first_name = user.dV;
        this.userSocial.last_name = user.fT;
        this.login(this.userSocial)
      },
      onFailure() {
        console.log('o');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cont {
    border: 2px solid black;
    border-radius: 20px;
    display: grid;
    justify-content: center;
    justify-items: left;
    background-color: #e2b625;
  }

  form {
    border: none;
    margin: 0;
  }

  .fb__info {
    padding: 1em;
  }

  .google__btn {
    padding: 0;
    font-family: 'Londrina Solid', cursive !important;
    font-size: 1.5em !important;
    text-decoration-color: black !important;
    color:black !important;
    box-shadow: 0px 4px 2px -1px rgba(0,0,0,0.75);
    transition: all .3s ease-in-out;
    margin: 1em;
  }

  .google__btn:hover {
    text-decoration: underline;
    transform: translate(1px);
  }

  .user__img {
    width: 50px;
    height: 50px;
  }

  hr {
    width: 70%;
    margin-bottom: 2px;
  }

  .option_title {
    justify-self: center;
    font-size: 20px;
    color: #13608d;
    text-decoration: none;
    margin-top: 0;
  }

  .button {
    background-image: none;
    color: black !important;
  }
  
  .button:hover {
    text-decoration: none;
    background-image: none;
  }
</style>
