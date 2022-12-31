<template>
  <div>
    <input
      :value="data"
      type="file"
      name="photo"
      multiple
      accept="image/*"
      @change="changeFileInput"
    >
  </div>
</template>

<script>
  export default {
    name: 'TestLoadImg',
    data() {
      return {
        data: '',
      };
    },
    computed: {

    },
    watch: {
      data(newValue, oldValue) {
        console.log(newValue, oldValue);
      },

    },
    methods: {
      changeFileInput(event) {
        console.log(event.target.files[0]);
      },
    },
  };
</script>

<style scoped>

</style>
