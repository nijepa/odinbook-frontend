<template>
  <div class="friends">
    <h1>Friends Invitation</h1>
    <div v-if="!getFriendInvitation.user" class=""></div>
    <div v-else class="">
      <div v-if="!getFriendInvitation.user[0].friends.length" class="">
        <h3>No friends invitations</h3>
      </div>
      <div v-else v-for="user in getFriendInvitation.user[0].friends" :key="user._id" class="friend">
        <div class="friend__data">
          <h3>{{ user.username }}</h3>
          <a @click="selectUser(user)" class="user__link">{{ user.last_name }}, {{ user.first_name }}</a>
        </div>
        <a @click="addFriend(user._id)" href="#" class="toggle__friend not__friend">Accept</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'FriendInvitation',
    computed: {
      ...mapGetters([ 'loggedUser', 
                      'getFriendInvitation']),
    },
    methods: {
      ...mapActions([ 'fetchFriendsInvitations', 
                      'fetchSelectedUser',
                      'loadUserPosts',
                      'acceptFriend' ]),
      selectUser(selectedUser) {
        this.fetchSelectedUser(selectedUser);
        this.loadUserPosts(selectedUser._id);
        this.$router.push({ name: 'Timeline' });
      },
      addFriend(userId) {
        this.acceptFriend({'_id':this.loggedUser._id, 'friend_id': userId});
      }
    },
    mounted() {
      this.fetchFriendsInvitations(this.loggedUser._id);
    }
  }
</script>

<style>
  .not__friend {
    background-color: var(--green-light);
  }
</style>