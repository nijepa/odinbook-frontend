<template>
<transition name="slide-fade">
  <div class="friends">
    <h1>{{ title }}</h1>
    <div v-if="!friendsType" class=""><img class="loading__img" src="../assets/loading.gif" alt=""></div>
    <div v-else class="">
      <div v-if="!friendsType.length" class="">
        <h3>No friends</h3>
      </div>
      <transition-group name="slide-fade" mode="out-in">
        <div v-for="user in friendsType" :key="user._id" class="friend">
          <div class="friend__data">
            <h3>{{ user.username }}</h3>
            <a @click="selectUser(user)" class="user__link">{{ user.last_name }}, {{ user.first_name }}</a>
          </div>
          <a @click="toggleBtns(btnName, user._id)" href="#" :class="btnName == 'Un-friend' || btnName == 'Abort' ? 'btn__type1' : 'btn__type2'" class="toggle__friend">{{ btnName }}</a>
        </div>
      </transition-group>
    </div>
  </div>
</transition>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Friends',
    props: {
      title: {
        type: String
      },
      btnName: {
        type: String
      },
      friendsType: {
        type: Array
      }
    }, 
    computed: {
      ...mapGetters([ 'loggedUser',
                      'getUserPosts', 
                      'getFriends']),
    },
    methods: {
      ...mapActions([ 'unFriend',
                      'requestFriend',
                      'abortFriend',
                      'acceptFriend',
                      'fetchSelectedUser',
                      'loadUserPosts' ]),
      removeFriend(userId) {
        this.unFriend({'_id':this.loggedUser._id, 'friend_id': userId});
      },
      addFriend(userId) {
        this.requestFriend({'_id':this.loggedUser._id, 'friend_id': userId});
      },
      accFriend(userId) {
        this.acceptFriend({'_id':this.loggedUser._id, 'friend_id': userId});
      },
      aboFriend(userId) {
        this.abortFriend({'_id':this.loggedUser._id, 'friend_id': userId});
      },
      toggleBtns(btnName, user) {
        if (btnName == 'Un-friend') {
          this.removeFriend(user);
        } else if (btnName == 'Add friend') {
          this.addFriend(user);
        } else if (btnName == 'Accept') {
          this.accFriend(user);
        } else if (btnName == 'Abort') {
          this.aboFriend(user);
        }
      },
      selectUser(selectedUser) {
        this.fetchSelectedUser(selectedUser);
        this.loadUserPosts(selectedUser._id);
        this.$router.push({ name: 'Timeline' });
      },
    },
    created() {
      //this.fetchFriends(this.loggedUser._id);
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
  .btn__type1 {
    background-color: var(--red-light);
  }
  .btn__type2 {
    background-color: var(--green-light);
  }
  
</style>