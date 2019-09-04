<template>
  <v-card class="mt-4">
    <v-card-title>
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
    </v-card-title>
    <v-divider></v-divider>
    <router-view class="px-4 pb-4"></router-view>
  </v-card>
</template>

<script>
export default {
  name: 'shipping-index',
  data: () => ({
    breadcrumbs: [
      {
        text: '地址列表',
        disabled: false,
        to: '/user/shipping',
        exact: true
      },
      {
        text: '添加地址',
        disabled: false,
        to: '/user/shipping/add'
      }
    ]
  }),
}
</script>

<style>

</style>