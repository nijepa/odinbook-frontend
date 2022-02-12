<template>
  <div class="user">
    <Nav />
    <transition name="bounce">
      <Profile />
    </transition>
    <Footer />
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";
import Profile from "@/components/Profile.vue";

export default {
  name: "Home",

  components: {
    Nav,
    Profile,
    Footer,
  },
};
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
