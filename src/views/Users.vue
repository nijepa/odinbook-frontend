<template>
  <div class="users">
    <Nav />
    <!-- <h3>{{ friendsCount }}</h3> -->
    <transition name="slide-fade" mode="out-in">
      <div v-if="!isLoadedFriends" class="">
        <img class="loading__img" src="../assets/images/loading.gif" alt="" />
      </div>
      <div v-else class="friends__lists">
        <Friends
          title="Friends Request"
          :count="getRequestFriend.user.length"
          btnName="Abort"
          :friendsType="getRequestFriend.user"
        />
        <Friends
          title="Friends Invitation"
          :count="getFriendInvitation.user.length"
          btnName="Accept"
          :friendsType="getFriendInvitation.user"
        />
        <Friends
          title="Friends"
          :count="getFriends.user.length"
          btnName="Un-friend"
          :friendsType="getFriends.user"
          :isFriend="false"
        />
        <Friends
          title="Not Friends"
          :count="getNotFriends.users.length"
          btnName="Add friend"
          :friendsType="getNotFriends.users"
        />
      </div>
    </transition>
    <Footer />
    <top-button />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import Friends from "@/components/Friends.vue";
import TopButton from "@/components/TopButton.vue";

export default {
  name: "Users",

  components: {
    Nav,
    Friends,
    Footer,
    TopButton,
  },

  data() {
    return {
      isLoadedFriends: false,
    };
  },

  computed: {
    ...mapGetters([
      "loggedUser",
      "getFriends",
      "getNotFriends",
      "getFriendInvitation",
      "getRequestFriend",
    ]),
    friendsCount() {
      return this.getNotFriends?.users?.length + this.getFriendInvitation?.user?.length + this.getFriends?.user?.length + this.getRequestFriend?.user?.length
    }
  },

  methods: {
    ...mapActions([
      "fetchFriends",
      "fetchNotFriends",
      "fetchRequestedFriends",
      "fetchFriendsInvitations",
      "unFriend",
      "requestFriend",
      "abortFriend",
      "acceptFriend",
      "fetchSelectedUser",
    ]),

    async loadFriends() {
      await this.fetchFriends(this.loggedUser._id);
      await this.fetchNotFriends(this.loggedUser._id);
      await this.fetchRequestedFriends(this.loggedUser._id);
      await this.fetchFriendsInvitations(this.loggedUser._id);
      this.isLoadedFriends = true;
    },
  },

  created() {
    this.loadFriends();
  },
};
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
