<template>
  <div class="">
    <Nav />
    <transition name="slide-fade">
      <Posts />
    </transition>
    <Footer />
    <top-button />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import Posts from "@/components/Posts.vue";
import TopButton from "@/components/TopButton.vue";

export default {
  name: "Timeline",

  components: {
    Nav,
    Footer,
    Posts,
    TopButton,
  },

  computed: {
    ...mapGetters(["loggedUser", "getSelectedUser"]),
  },

  methods: {
    ...mapActions(["fetchSelectedUser", "loadUserPosts"]),

    noSelectedUser() {
      if (!this.getSelectedUser._id) {
        this.fetchSelectedUser(this.loggedUser);
        this.loadUserPosts(this.loggedUser._id);
      }
    },
  },

  mounted() {
    this.noSelectedUser();
  },
};
</script>
