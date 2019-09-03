<template>
  <v-container>
    <v-row>
      <v-col offset-md="2" md="8" sm="12" offset-sm="0">
        <v-img src="../assets/hours.png"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'info',
  data: () => ({

  }),
  created() {
    document.title = '实体店信息 - 辞林书店';
  }
}
</script>

<style>

</style>