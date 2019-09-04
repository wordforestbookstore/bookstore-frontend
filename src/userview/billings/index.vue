<template>
  <v-card class="mt-4">
    <v-card-title>
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    </v-card-title>
    <v-divider></v-divider>
    <router-view ref="content" class="px-4 pb-4"></router-view>
  </v-card>
</template>

<script>
export default {
  name: 'billing-index',
  data: () => ({

  }),
  computed: {
    breadcrumbs() {
      return [
        {
          text: '信用卡列表',
          disabled: false,
          to: '/user/billings',
          exact: true
        },
        {
          text: this.$route.path.indexOf('update') === -1 ? '添加信用卡' : '修改信用卡',
          disabled: false,
          to: this.$route.path.indexOf('update') === -1 ? '/user/billings/add' : this.$route.fullPath
        }
      ];
    }
  },
  mounted() {
    this.$vuetify.goTo(this.$refs.content);
  }
}
</script>

<style>

</style>