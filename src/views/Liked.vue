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
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import Posts from "@/components/Posts.vue";
import TopButton from "@/components/TopButton.vue";

export default {
  name: "Liked",

  components: {
    Nav,
    Footer,
    Posts,
    TopButton,
  },
};
</script>
