<template>

  <div class="user__profile">
    <transition name="fall">

      <div v-if="getSelectedUser._id && this.getSelectedUser._id !== this.loggedUser._id"
            class="user__profile_selected" v-on:load="onAppeared" v-show="appeared">
        <span class="info__label">Picture : </span>
        <img :src="signupInput.picture || require('../assets/nopic' + Math.floor(Math.random() * 5) + '.png')" 
              class="info__img">
        <span class="info__label">Username : </span>
        <p class="info__input">{{ signupInput.username }}</p>
        <span class="info__label">First name : </span>
        <p class="info__input">{{ signupInput.first_name }}</p>
        <span class="info__label">Last name : </span
        ><p class="info__input">{{ signupInput.last_name }}</p>
        <span class="info__label">E-mail : </span>
        <p class="info__input">{{ signupInput.email }}</p>
        <span class="info__label">About : </span>
        <p class="info__input">{{ signupInput.user_about }}</p>
        <span class="info__label">Friends : </span>
        <p class="info__input">{{ signupInput.friends.length || '' }}</p>
      </div>

      <form v-else @submit.prevent="userUpdate(signupInput)" action=""
            v-on:load="onAppeared" v-show="appeared">
        <div class="form__item">
          <img :src="signupInput.picture || require('../assets/nopic' + Math.floor(Math.random() * 5) + '.png')" 
                class="info__img">
        </div>
        <div class="form__item">
          <label for="username">User name</label>
          <input @focus="clearErrors" v-model="signupInput.username"
                  type="text" name="username" id="username" required>
        </div>
        <div class="form__item">
          <label for="first_name">First name</label>
          <input @focus="clearErrors" v-model="signupInput.first_name"
                  type="text" name="first_name" id="first_name">
        </div>
        <div class="form__item">
          <label for="last_name">First name</label>
          <input @focus="clearErrors" v-model="signupInput.last_name"
                  type="text" name="last_name" id="last_name">
        </div>
        <div class="form__item">
          <label for="email">E-mail</label>
          <input @focus="clearErrors" v-model="signupInput.email"
                  type="email" name="email" id="email">
        </div>
        <div class="form__item">
          <label for="password">Password</label>
          <input @focus="clearErrors" v-model="signupInput.password"
                  type="password" name="password" id="password">
        </div>
        <div class="form__item">
          <label for="about">About</label>
          <textarea @focus="clearErrors" v-model="signupInput.user_about"
                    name="about" id="about" rows="5" cols="30"></textarea>
        </div>
        <div class="form__btn">
          <button type="submit">Save</button>
        </div>
      </form>

    </transition>
  </div>

</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {

    name: 'Profile',

    data() {
      return {
        signupInput: {
          _id: '',
          email: '',
          password: '',
          username: '',
          first_name: '',
          last_name: '',
          user_about: '',
          picture: ''
        },
        user: {},
        appeared: false
      }
    },

    computed: {
      ...mapGetters([ 'loggedUser',
                      'getSelectedUser',
                      'getErrors' ]),
    },

    methods: {
      ...mapActions([ 'signup',
                      'fetchSelectedUser',
                      'userUpdate',
                      'clearErrors' ]),
      onAppeared() {
        this.appeared = true;
      }
    },

    created() {
      if (this.getSelectedUser._id && this.getSelectedUser._id !== this.loggedUser._id) {
        this.signupInput = this.getSelectedUser;
      } else {
        this.signupInput = this.loggedUser;
      }
    },

    mounted() {
      this.onAppeared();
    }
  }
</script>

<style>
  .user__profile {
    display: grid;
    justify-content: center;
    justify-items: left;
  }

  .user__profile_selected {
    background-color: var(--yellow);
    border-radius: 20px;
    padding: 1rem;
    margin: .5rem;
    box-shadow: 0px 5px 4px 0px rgba(0,0,0,0.75);
    text-align: left;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    justify-items: center;
    grid-column-gap: 1em;
  }

  .info__input {
    font-size: 1.5em;
    justify-self: left;
  }

  .info__input .info__label {
    font-size: .8em;
  }

  .info__label {
    justify-self: right;
  }

  .fall-enter-active {
    transition: all 1s ease;
  }

  .info__img {
    justify-self: left;
    width: 50px;
    height: 50px;
    border-radius: 10px;
  }

  .fall-enter, .fall-leave-to {
    transform: translateY(-150px);
    opacity: 0;
  }
</style>
