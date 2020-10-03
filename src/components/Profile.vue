<template>
  <div class="user__profile">
    <div v-if="getSelectedUser._id && this.getSelectedUser._id != this.loggedUser._id" class="user__profile_selected">
      <span class="info__label">First name : </span><p class="info__input">{{ signupInput.first_name }}</p>
      <span class="info__label">Last name : </span><p class="info__input">{{ signupInput.last_name }}</p>
      <span class="info__label">E-mail : </span><p class="info__input">{{ signupInput.email }}</p>
      <span class="info__label">About : </span><p class="info__input">{{ signupInput.user_about }}</p>
    </div>
    <form v-else @submit.prevent="userUpdate(signupInput)" action="">
      <div class="form__item">
        <label for="username">User name</label>
        <input @focus="clearErrors" v-model="signupInput.username" type="text" name="first_name" id="first_name" required>
      </div>
      <div class="form__item">
        <label for="first_name">First name</label>
        <input @focus="clearErrors" v-model="signupInput.first_name" type="text" name="first_name" id="first_name">
      </div>
      <div class="form__item">
        <label for="last_name">First name</label>
        <input @focus="clearErrors" v-model="signupInput.last_name" type="text" name="last_name" id="last_name">
      </div>
      <div class="form__item">
        <label for="email">E-mail</label>
        <input @focus="clearErrors" v-model="signupInput.email" type="email" name="email" id="email">
      </div>
      <div class="form__item">
        <label for="password">Password</label>
        <input @focus="clearErrors" v-model="signupInput.password" type="password" name="password" id="password">
      </div>
      <div class="form__item">
        <label for="about">About</label>
        <textarea @focus="clearErrors" v-model="signupInput.user_about" name="about" id="about" rows="5" cols="30"></textarea>
      </div>
      <div class="form__btn">
        <button type="submit">Save</button>
      </div>
    </form>
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
          user_about: ''
        },
        user: {}
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
    },
    created() {
      if (this.getSelectedUser._id && this.getSelectedUser._id != this.loggedUser._id) {
        this.signupInput = this.getSelectedUser;
      } else {
        this.signupInput = this.loggedUser;
      }
    }
  }
</script>

<style>
  .user__profile {
    display: grid;
    /* gap: 2em; */
    justify-content: center;
    justify-items: left;
    /* background-color: var(--yellow); */
    /* padding: 2em; */
  }
  .user__profile_selected {
    background-color: var(--yellow);
    /* border: 2px solid black; */
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
</style>