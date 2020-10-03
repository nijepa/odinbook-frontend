<template>
  <div class="users">
    <Nav />
    <div v-if="!isLoadedFriends" class=""><img class="loading__img" src="../assets/loading.gif" alt=""></div>
    <transition v-else name="slide-fade">
    <div class="friends__lists">
      <Friends title='Friends Request' btnName='Abort' :friendsType='getRequestFriend.user[0].friends' />
      <Friends title='Friends Invitation' btnName='Accept' :friendsType='getFriendInvitation.user[0].friends' />
      <Friends title='Friends' btnName='Un-friend' :friendsType='getFriends.user[0].friends' />
      <Friends title='Not Friends' btnName='Add friend' :friendsType='getNotFriends.users' />
    </div>
    </transition>
    <Footer />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Nav from '@/components/Nav.vue';
  import Footer from '@/components/Footer.vue';
  import Friends from '@/components/Friends.vue';

  export default {
    name: 'Users',
    components: {
      Nav, Friends, Footer
    },
    data() {
      return {
        isLoadedFriends: false
      }
    },
    computed: {
      ...mapGetters([ 'loggedUser', 
                      'getFriends',
                      'getNotFriends',
                      'getFriendInvitation',
                      'getRequestFriend']),
    },
    methods: {
      ...mapActions([ 'fetchFriends', 
                      'fetchNotFriends',
                      'fetchRequestedFriends',
                      'fetchFriendsInvitations', 
                      'unFriend', 
                      'requestFriend',
                      'abortFriend',
                      'acceptFriend',
                      'fetchSelectedUser' ]),
      async loadFriends() {
        await this.fetchFriends(this.loggedUser._id);
        await this.fetchNotFriends(this.loggedUser._id);
        await this.fetchRequestedFriends(this.loggedUser._id);
        await this.fetchFriendsInvitations(this.loggedUser._id);
      }
    },
    created() {
      this.loadFriends();
      this.isLoadedFriends = true;
    }
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