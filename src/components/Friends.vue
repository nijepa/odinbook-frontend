<template>
  <transition name="fall">
    <div class="friends" v-on:load="onAppeared" v-show="appeared">
      <div class="">
        <h1>{{ title }} <span class="friends_count">{{ count }}</span></h1>
        <hr />
      </div>

      <div v-if="!friendsType" class="">
        <img class="loading__img" src="../assets/images/loading.gif" alt="" />
      </div>

      <div v-else class="">
        <div v-if="!friendsType.length" class="">
          <h3>No friends</h3>
        </div>

        <transition-group name="slide-fade" mode="out-in">
          <div v-for="user in friendsType" :key="user._id" class="friend">
            <a @click="selectUser(user)" class="friend__img">
              <img
                :src="
                  user.picture ||
                  require('../assets/images/nopic' +
                    Math.floor(Math.random() * 5) +
                    '.png')
                "
                class="friend__img"
              />
            </a>
            <a @click="selectUser(user)" class="u__name">
              <h3 class="u__name">
                {{ user.username }}
              </h3>
            </a>
            <a @click="selectFriends(user)" class="u__friends">
              <p>Friends ({{ nrOfFriends(user.friends) }})</p>
            </a>
            <a @click="selectUser(user)" class="user__link">
              {{ user.last_name }}, {{ user.first_name }}
            </a>
            <a
              @click="toggleBtns(btnName, user._id)"
              href="#"
              v-if="btnName"
              :class="
                btnName === 'Un-friend' || btnName === 'Abort'
                  ? 'btn__type1'
                  : 'btn__type2'
              "
              class="toggle__friend"
            >
              {{ btnName }}
            </a>
          </div>
        </transition-group>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Friends",

  data() {
    return {
      friendsNr: 0,
      appeared: false,
    };
  },

  props: {
    title: {
      type: String,
    },
    count: {
      type: Number,
    },
    btnName: {
      type: String,
    },
    friendsType: {
      type: Array,
    },
    isFriend: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters(["loggedUser", "getUserPosts", "getFriends"]),
  },

  methods: {
    ...mapActions([
      "unFriend",
      "requestFriend",
      "abortFriend",
      "acceptFriend",
      "fetchSelectedUser",
      "loadUserPosts",
      "fetchFriends",
    ]),

    removeFriend(userId) {
      this.unFriend({ _id: this.loggedUser._id, friend_id: userId });
    },

    addFriend(userId) {
      this.requestFriend({ _id: this.loggedUser._id, friend_id: userId });
    },

    accFriend(userId) {
      this.acceptFriend({ _id: this.loggedUser._id, friend_id: userId });
    },

    aboFriend(userId) {
      this.abortFriend({ _id: this.loggedUser._id, friend_id: userId });
    },

    toggleBtns(btnName, user) {
      if (btnName === "Un-friend") {
        this.removeFriend(user);
      } else if (btnName === "Add friend") {
        this.addFriend(user);
      } else if (btnName === "Accept") {
        this.accFriend(user);
      } else if (btnName === "Abort") {
        this.aboFriend(user);
      }
    },

    selectUser(selectedUser) {
      this.fetchSelectedUser(selectedUser);
      this.loadUserPosts(selectedUser._id);
      this.$router.push({ name: "Timeline" });
    },

    selectFriends(selectedUser) {
      this.fetchSelectedUser(selectedUser);
      if (this.isFriend) {
        this.fetchFriends(selectedUser._id);
      } else {
        this.$router.push({ name: "UsersFriends" });
      }
    },

    nrOfFriends(friends) {
      return friends.filter((v) => v.status === 1).length;
    },

    onAppeared() {
      this.appeared = true;
    },
  },

  mounted() {
    this.onAppeared();
  },
};
</script>

<style>
.friends {
  display: grid;
  align-items: center;
  justify-content: stretch;
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 15px;
  background-color: var(--yellow);
  align-content: baseline;
  align-self: baseline;
  box-shadow: -7px 0px 6px -7px rgba(0, 0, 0, 0.75);
  /* justify-self: start; */
}

.friend {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0.5em;
  grid-row-gap: 0px;
  align-items: center;
  justify-content: space-between;
  align-content: center;
  padding: 0.5em;
}

.friend:nth-child(even) {
  background-color: #ffc64b;
  /* background-color: #56aee0; */
  border-radius: 15px;
}

.friend__data {
  display: grid;
  justify-items: left;
  grid-template-columns: auto auto;
  grid-column-gap: 0.5em;
}

.friend__img {
  grid-area: 1 / 1 / 3 / 2;
  width: 40px;
  height: 40px;
  border-radius: 17px;
  cursor: pointer;
}

.friend__img:hover {
  transform: scale(1.1);
}

.friend__text {
  text-align: left;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 1em;
  grid-row-gap: 0px;
  align-items: center;
}

.toggle__friend {
  background-color: var(--red-light);
  font-size: 0.8rem;
  color: #2c3e50;
  text-decoration: none;
  border: 2px solid black;
  border-radius: 10px;
  padding: 0.3rem;
  box-shadow: 0px 4px 2px -1px rgba(0, 0, 0, 0.75);
  transition: all 0.3s ease-in-out;
  grid-area: 1 / 4 / 3 / 5;
  justify-self: right;
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

.friends_count {
  border-radius: .5em;
  margin-left: .5em;
  padding: 0 .2em;
  background-color: #ffc64b;
  font-size: .8em;
}

.u__name {
  grid-area: 1 / 2 / 2 / 3;
  cursor: pointer;
}

.u__friends {
  grid-area: 1 / 3 / 3 / 4;
  cursor: pointer;
  justify-self: right;
}

.user__link {
  cursor: pointer;
  grid-area: 2 / 2 / 3 / 3;
}

.user__link:hover,
.u__name:hover,
.u__friends:hover {
  color: black;
  text-decoration: underline;
}

.btn__type1 {
  background-color: var(--red-light);
}

.btn__type2 {
  background-color: var(--green-light);
}
@media (max-width: 1024px) {
  .u__friends {
    /* display: none; */
  }
  .btn__type1 {
    /* display: none; */
  }
}
</style>
