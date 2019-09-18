<template lang="pug">
  section.container
    input.search-field(v-model="req" @input="search" type="search" placeholder="Search...")
    div.response
      ul.response__list
        li.response__item(v-for="(i, index) in data" :key="index") {{i.artist}}
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
      if(this.req !== '') {
        this.debounce(this.getData, 500)
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
              console.log('cb ', cb)
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
      console.log('this data', this.data)
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
    }
  }
</style>

