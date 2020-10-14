<template>
  <nav>
    <a class="odin">ODINBOOK</a>
    <div class="links">
      <router-link to="/" class="nav__link" 
                    :class="currentRouteName === '/' ? 'nav__link_active' : ''">Home</router-link>
      <router-link to="/users" class="nav__link" 
                    :class="currentRouteName === '/users' ? 'nav__link_active' : ''">Friends</router-link>
      <router-link to="/timeline" class="nav__link" 
                    :class="currentRouteName === '/timeline' ? 'nav__link_active' : ''">Timeline</router-link>
      <router-link to="/profile" class="nav__link profile" 
                    :class="currentRouteName === '/profile' ? 'nav__link_active' : ''">Profile</router-link>
    </div>
    <div class="user__logout">
      &#10022; {{loggedUser.name}} &#10022;
      <a @click="logout(loggedUser)" href="#" class="logout">Log Out</a>
    </div>
  </nav>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'Nav',

    computed: {
      ...mapGetters([ 'loggedUser',
                      'loadingState',
                      'isLogged',
                      'allPosts']),
      currentRouteName() {
        return this.$route.path;
      }
    },

    methods: {
      ...mapActions([ 'fetchUser',
                      'loadPosts',
                      'initialState',
                      'logout' ]),
    },

    created() {
      this.initialState();
    }
  }
</script>

<style scoped >
  nav {
    position: relative;
    z-index: 1;
    background-color: var(--blue);
    border-bottom: 2px solid black;
    box-shadow: 0 2px 2px -1px rgba(0,0,0,0.75);
    display: grid;
    grid-template-columns: repeat(3,auto);
    align-items: center;
    justify-items: center;
  }

  .nav__link {
    font-size: 1.5em;
    color: var(--yellow);
    text-decoration: none;
    margin: 0 1rem;
    border-radius: 15px;
    padding: 10px;
  }

  .nav__link:hover {
    background-color: var(--blue-darkest);
  }

  .nav__link_active {
    background-color: var(--blue-darkest);
  }

  .profile {
    background-color: var(--blue-dark);
  }

  .odin {
    font-size: 2em;
    align-self: left;
    text-shadow: 0px 1px 3px rgba(0,0,0,0.88);
    grid-area: 'odin';
  }

  .logout {
    text-decoration: none;
    color: var(--red);
  }

  .logout:hover {
    color: var(--red-light);
    text-decoration: underline;
  }

  .user__logout {
    margin-top: 1em;
    margin-right: 1em;
    justify-self: flex-end;
  }

  @media (max-width: 760px) {
    nav {
      grid-template-columns: auto;
    }
  }

  @media (max-width: 490px) {
    .links {
      display: grid;
      grid-template-columns: auto;
    }
  }
</style>>
