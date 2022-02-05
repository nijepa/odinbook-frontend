<template>
  <div class="posts-fav">
    <div class="">
      <h1>Most Liked</h1>
      <hr />
    </div>
    <div v-for="fav in getFavPosts" :key="fav._id" class="fav">
      <div class="fav__wrapper" @click="handleClick(fav._id)">
        <p>{{ fav.title }}</p>
        <img
          :src="fav.img_url ? fav.img_url : defaultPic"
          alt=""
          class="fav__img"
        />
        <h3>{{ fav.likes.length }}</h3>
        <img class="fav__like" :src="getImgUrl('liked')" alt="" />
        <p>{{ fav.user.first_name }}</p>
        <p>{{ fav.createdAt | shortDate }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import loadImage from "../mixins/loadImage";
export default {
  name: "Favorites",

  mixins: [loadImage],

  filters: {
    shortDate: function (value) {
      if (value) {
        return moment(String(value)).format("MMM Do YY");
      }
    },
  },

  data() {
    return {
      defaultPic:
        "https://images.pexels.com/photos/3028961/pexels-photo-3028961.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    };
  },

  computed: {
    ...mapGetters(["getFavPosts"]),
  },

  methods: {
    ...mapActions(["loadAllPosts"]),
    onAppeared() {
      this.appeared = true;
    },

    handleClick(id) {
      this.$emit("post-clicked", id);
    },
  },

  async mounted() {
    await this.loadAllPosts();
  },
};
</script>

<style>
.posts-fav {
  justify-self: end;
  display: grid;
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 20px;
  /* background-color: var(--yellow); */
  box-shadow: 7px 0px 6px -7px rgba(0, 0, 0, 0.75);
  align-content: start;
  align-self: baseline;
}
.fav__wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: space-between;
  justify-items: center;
}
.fav {
  padding: 0.5em;
  cursor: pointer;
  border-radius: 15px;
}
.fav__img {
  width: 70px;
  border-radius: 1em;
}
.fav__like {
  height: 25px;
}
.fav:nth-child(even) {
  /* background-color: #ffc64b; */
  background-color: #56aee0;
}
.fav:hover {
  background-color: var(--orange);
  transform: scale(1.05);
  transition: all 0.4s ease-in-out;
  color: #1f1700;
  box-shadow: 0px 5px 4px 0px rgba(0, 0, 0, 0.75);
}
</style>
