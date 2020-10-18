<template>

  <div class="user__profile">
    <transition name="fall">

      <div v-if="getSelectedUser._id && this.getSelectedUser._id !== this.loggedUser._id"
            class="user__profile_selected" v-on:load="onAppeared" v-show="appeared">
        <div class="profile__group personal__data">
          <div class="">
          <!-- <span class="info__label">Picture : </span> -->
          <p>
            <img :src="signupInput.picture || require('../assets/nopic' + Math.floor(Math.random() * 5) + '.png')" 
                class="info__img">
          </p>
          </div>
          <div class="">
            <div class="">
              <span class="info__label">Username : </span>
              <p class="info__input">{{ signupInput.username }}</p>
            </div>
            <div class="">
              <span class="info__label">E-mail : </span>
              <p class="info__input">{{ signupInput.email }}</p>
            </div>
            <div class="">
              <span class="info__label">First name : </span>
              <p class="info__input">{{ signupInput.first_name }}</p>
            </div>
            <div class="">
              <span class="info__label">Last name : </span
              ><p class="info__input">{{ signupInput.last_name }}</p>
            </div>
          </div>
        </div>
        
        <div class="profile__group">
          <div class="">
            <span class="info__label">About : </span>
            <p class="info__input" v-html="signupInput.user_about"></p>
          </div>
          <div class="">
            <span class="info__label">Friends : </span>
            <a @click="selectFriends(signupInput)" class="info__friends">
              <p class="info__input"> {{nrOfFriends(signupInput.friends)}}</p>
            </a>
        </div>
        </div>
        
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
          <ckeditor :editor="editor" v-model="signupInput.user_about" 
                    :config="{ placeholder:'pls enter content'}"
                    @focus="clearErrors" name="about" >
          </ckeditor>
<!--           <textarea @focus="clearErrors" v-model="signupInput.user_about"
                    name="about" id="about" rows="5" cols="30"></textarea> -->
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
  import CKEditor from '@ckeditor/ckeditor5-vue';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

  export default {

    name: 'Profile',

    components: {
        ckeditor:CKEditor.component
    },

    data() {
      return {
        editor: ClassicEditor,
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
      
      selectFriends(selectedUser) {
        this.fetchSelectedUser(selectedUser);
        this.$router.push({ name: 'UsersFriends' });
      },

      nrOfFriends(friends) {
        return friends.filter((v) => (v.status === 1)).length;
      },
      
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
    /* background-color: var(--yellow); */
    background-image: linear-gradient(to top,var(--orange) 5%, white);
    border-radius: 20px;
    padding: 1rem;
    margin: .5rem;
    box-shadow: 0px 5px 4px 0px rgba(0,0,0,0.75);
    text-align: left;
    /* display: grid; */
    grid-template-columns: auto auto;
    align-items: center;
    justify-items: center;
    grid-column-gap: 1em;
  }

  .profile__group {
    display: grid;
    grid-template-columns: 3fr 1fr;
    align-items: center;
    justify-items: center;
  }

  .personal__data {
    grid-template-columns: 1fr 3fr;
  }

  .info__input {
    font-size: 1.3em;
    justify-self: left;
    align-self: baseline;
    margin: .3em;
  }

  .info__input .info__label {
    font-size: .8em;
  }

  .info__label {
    color: var(--blue-dark);
    font-style: italic;
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

  .info__friends {
    cursor: pointer;
    justify-self: left;
    color: var(--blue);
    align-self: baseline;
    font-size: 2em;
  }

  .info__friends:hover {
    color: black;
    text-decoration: underline;
  }

  .fall-enter, .fall-leave-to {
    transform: translateY(-150px);
    opacity: 0;
  }
</style>
