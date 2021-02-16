<template>
  <div class="">
    <div class="scroll">
      <img @click="animateToTop()" 
            class="scrolimg" 
            src="../assets/images/top1.png">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TopButton',

    methods: {
      animateToTop() {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      } 
    },

    mounted() {
      document.addEventListener('scroll',()=>{
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if(scrollTop > 100) document.querySelector('.scroll').style.display = "block";
        else document.querySelector('.scroll').style.display = "none"
      })
    }
  }
</script>
