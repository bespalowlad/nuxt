<template lang="pug">
  section.container
    input.search-field(v-model="req" @keyup="search" type="search" placeholder="Search...")
    v-btn(text small color="primary")
    div.response
      ul.response__list
        li.response__item(v-for="(i, index) in data" :key="index")
          .response__body
            .response__img
              img(:src="i.image_uris ? i.image_uris.normal : ''" :alt="i.object ? i.object : 'img'")
            .response__content
              .response__name {{ i.name ? i.name : '' }}
              .response__text {{ i.set_name ? i.set_name : '' }}
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data () {
    return {
      req: ''
    }
  },
  computed: {
    ...mapState([
      'data'
    ])
  },
  methods: {
    search () {
      if(this.req.length > 0) {
        let db = this.debounce(this.getData, 3000)
        db()
      }
    },

    getData () {
      console.log('load')
      this.$store.dispatch('getData', this.req)
    },

    debounce (cb, delay) {
      let timerId;
      return (...args) => {
        timerId && clearTimeout(timerId);
        timerId = setTimeout(
          () => {
            cb(...args)
          },
          delay
        );
      }
    },
  //   debounce(cb, interval) {
  //     let timer;
  //     return function debounced() {
  //         clearTimeout(timer);
  //         let args = arguments;
  //         let that = this;
  //         timer = setTimeout(function callOriginalFn() {
  //             cb.apply(that, args);
  //         }, interval);
  //     };
  //  }

    // ...mapActions([
    //   'getData'
    // ]),

  },

  watch: {
    data () {
      console.log('data ', this.data)
    }
  }
}
</script>

<style lang="scss">
  .container {
    min-height: 100vh;
  }

  .search-field {
    margin: 50px auto;
    display: block;
  }

  .response {

    &__item {
      margin: 10px 20px;
      font-size: 16px;
      list-style: none;
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__body {
      display: flex;
      align-items: flex-start;
    }

    &__img {
      margin-right: 20px;

      img {
        height: auto;
        max-width: 150px;
      }
    }

    &__name {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    &__text {
      font-size: 16px;
      font-weight: 500;
    }
  }
</style>

