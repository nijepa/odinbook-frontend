<template>
  <div class="friends">
    <h1>Friends Request</h1>
    <div v-if="!getRequestFriend.user" class=""></div>
    <div v-else class="">
      <div v-if="!getRequestFriend.user[0].friends.length" class="">
        <h3>No friends requests</h3>
      </div>
      <div v-else v-for="user in getRequestFriend.user[0].friends" :key="user._id" class="friend">
        <div class="friend__data">
          <h3>{{ user.username }}</h3>
          <a @click="selectUser(user)" class="user__link">{{ user.last_name }}, {{ user.first_name }}</a>
        </div>
        <a @click="removeFriend(user._id)" href="#" class="toggle__friend">Abort</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'RequestFriend',
    computed: {
      ...mapGetters([ 'loggedUser', 
                      'getRequestFriend']),
    },
    methods: {
      ...mapActions([ 'fetchRequestedFriends', 
                      'fetchSelectedUser',
                      'loadUserPosts',
                      'abortFriend' ]),
      selectUser(selectedUser) {
        this.fetchSelectedUser(selectedUser);
        this.loadUserPosts(selectedUser._id);
        this.$router.push({ name: 'Timeline' });
      },
      removeFriend(userId) {
        this.abortFriend({'_id':this.loggedUser._id, 'friend_id': userId});
      }
    },
    mounted() {
      this.fetchRequestedFriends(this.loggedUser._id);
    }
  }
</script>

<style>
  .not__friend {
    background-color: var(--green-light);
  }
</style>