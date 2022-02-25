<template>
  <div class="users">
    <Nav />
    <transition name="slide-fade" mode="out-in">
      <div v-if="!isLoadedFriends" class="">
        <img class="loading__img" src="../assets/images/loading.gif" alt="" />
      </div>
      <div v-else class="">
        <Friends
          :title="`${getSelectedUser.username} 's Friends`"
          :count="getFriends.user.length"
          btnName=""
          :friendsType="getFriends.user"
          :isFriend="true"
        />
      </div>
    </transition>
    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import Friends from "@/components/Friends.vue";

export default {
  name: "Users",

  components: {
    Nav,
    Friends,
    Footer,
  },

  data() {
    return {
      isLoadedFriends: false,
    };
  },

  computed: {
    ...mapGetters(["loggedUser", "getSelectedUser", "getFriends"]),
  },

  methods: {
    ...mapActions(["fetchFriends", "fetchSelectedUser"]),

    async loadFriends() {
      await this.fetchFriends(this.getSelectedUser._id);
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
