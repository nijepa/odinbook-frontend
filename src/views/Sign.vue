<template>
  <div class="">
    <h1 class="odin">ODINBOOK</h1>
    <transition name="slide-fade" mode="out-in">
      <Login v-if="getInputType === 'login'" />
      <Signup v-else />
    </transition>
  </div>
</template>

<script>
  import Login from '@/components/Login.vue';
  import Signup from '@/components/Signup.vue';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Sign',

    components: {
      Login, Signup
    },

    computed: {
      ...mapGetters([ 'getInputType' ]),
    }
  }
</script>

<style >
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
    text-shadow: 0 1px 3px rgba(0,0,0,0.88);
    margin-left: 2.1em;
  }

  .hello {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-areas: 'login_title facebook'
                          'form odin';
    grid-gap: 20px;
    padding: 20px;
    border-radius: 20px;
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

  input:hover {
    background-color: whitesmoke;
  }

  input:focus {
    background-color: whitesmoke;
    border: 2px solid #13608d;
  }

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

  button:hover {
    background-color: whitesmoke;
    text-decoration: underline;
    transform: translate(1px);
  }

  .facebook {
    grid-area: 'facebook';
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
    .odin {
      margin-left: 0;
    }
  }


  .flip-enter-active {
    transition: all .8s cubic-bezier(0.55, 0.085, 0.68, 0.53); /*//ease-in-quad*/
  }

  .flip-leave-active {
    transition: all .95s cubic-bezier(0.25, 0.46, 0.45, 0.94); /*/ease-out-quad*/
  }

  .flip-enter, .flip-leave-to {
    transform: scaleY(0) translateZ(0);
    opacity: 0;
  }


  .slide-fade-enter-active {
    transition: all .8s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }


  .glide-fade-enter-active {
    transition: all .8s ease;
  }

  .glide-fade-enter, .glide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
</style>
