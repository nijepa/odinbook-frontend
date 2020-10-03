<template>
  <div class="friends">
    <h1>Friends</h1>
    <div v-if="!getFriends.user" class=""><img class="loading__img" src="../assets/loading.gif" alt=""></div>
    <div v-else class="">
      <div v-if="!getFriends.user[0].friends.length" class="">
        <h3>No friends</h3>
      </div>
      <div v-for="user in getFriends.user[0].friends" :key="user._id" class="friend">
        <div class="friend__data">
          <h3>{{ user.username }}</h3>
          <a @click="selectUser(user)" class="user__link">{{ user.last_name }}, {{ user.first_name }}</a>
        </div>
        <a @click="removeFriend(user._id)" href="#" class="toggle__friend">Un-friend</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Friends',
    computed: {
      ...mapGetters([ 'loggedUser',
                      'getUserPosts', 
                      'getFriends']),
    },
    methods: {
      ...mapActions([ 'fetchFriends', 
                      'unFriend',
                      'loadUserPosts',
                      'fetchSelectedUser' ]),
      removeFriend(userId) {
        this.unFriend({'_id':this.loggedUser._id, 'friend_id': userId});
      },
      selectUser(selectedUser) {
        this.fetchSelectedUser(selectedUser);
        this.loadUserPosts(selectedUser._id);
        this.$router.push({ name: 'Timeline' });
      },
    },
    created() {
      this.fetchFriends(this.loggedUser._id);
    }
  }
</script>

<style>
  .friends {
    display: grid;
    /* align-content: center; */
    align-items: center;
    justify-content: center;
    padding: 1rem;
    margin: 1rem;
    /* border: 2px solid black; */
    border-radius: 15px;
    background-color: var(--yellow);
    align-content: baseline;
    align-self: baseline;
    box-shadow: 0px 5px 4px 0px rgba(0,0,0,0.75);
  }
  .friend {
    display: flex;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: space-between;
    align-content: center;
    grid-gap: 2em;
    padding: 1em;
    border-top: 1px solid black;
  }
  .friend__data {
    display: grid;
    justify-items: left;
  }
  .toggle__friend {
    background-color: var(--red-light);
    font-size: .8rem;
    color: #2c3e50;
    text-decoration: none;
    border: 2px solid black;
    border-radius: 10px;
    padding: .3rem;
    box-shadow: 0px 4px 2px -1px rgba(0,0,0,0.75);
    transition: all .3s ease-in-out;
  }
  .toggle__friend:hover {
    color: black;
    background-color: whitesmoke;
    text-decoration: underline;
    transform: translate(1px);
  }
  .loading__img {
    width: 100px;
    height: auto;
  }
  .user__link {
    cursor: pointer;
  }
  .user__link:hover {
    color: black;
    text-decoration: underline;
  }
  
</style>