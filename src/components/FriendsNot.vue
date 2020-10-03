<template>
  <div class="friends">
    <h1>Not Friends</h1>
    <div v-if="!getNotFriends.users" class=""></div>
    <div v-else class="">
      <div v-if="!getNotFriends.users.length" class="">
        <h3>No users</h3>
      </div>
      <div v-else v-for="user in getNotFriends.users" :key="user._id" class="friend">
        <div class="friend__data">
          <h3>{{ user.username }}</h3>
          <a @click="selectUser(user)" class="user__link">{{ user.last_name }}, {{ user.first_name }}</a>
        </div>
        <a @click="addFriend(user._id)" href="#" class="toggle__friend not__friend">Add friend</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'FriendsNot',
    computed: {
      ...mapGetters([ 'loggedUser', 
                      'getNotFriends']),
    },
    methods: {
      ...mapActions([ 'fetchNotFriends', 
                      'loadUserPosts',
                      'requestFriend',
                      'fetchSelectedUser' ]),
      selectUser(selectedUser) {
        this.fetchSelectedUser(selectedUser);
        this.loadUserPosts(selectedUser._id);
        this.$router.push({ name: 'Timeline' });
      },
      addFriend(userId) {
        this.requestFriend({'_id':this.loggedUser._id, 'friend_id': userId});
      }
    },
    created() {
      this.fetchNotFriends(this.loggedUser._id);
    }
  }
</script>

<style>
  .not__friend {
    background-color: var(--green-light);
  }
</style>