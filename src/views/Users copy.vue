<template>
  <div class="users">
    <Nav />
    <div class="friends__lists">
      <transition name="slide-fade">
      <friend-request />
      </transition>
      <friend-invitation />
      <Friends />
      <friends-not />
    </div>
    <Footer />
  </div>
</template>

<script>
  import Nav from '@/components/Nav.vue';
  import Footer from '@/components/Footer.vue';
  import Friends from '@/components/Friends.vue';
  import FriendsNot from '@/components/FriendsNot.vue';
  import FriendRequest from '@/components/FriendRequest.vue';
  import FriendInvitation from '@/components/FriendInvitation.vue';

  export default {
  name: 'Users',
  components: {
    Nav, Friends, FriendsNot, Footer, FriendRequest, FriendInvitation
  },
    
  }
</script>

<style>
  .friends__lists {
    display: grid;
    grid-template-columns: auto auto;
    background-color: var(--blue);
  }
  @media (max-width: 810px) {
    .friends__lists {
      grid-template-columns: auto;
    }
  }
</style>