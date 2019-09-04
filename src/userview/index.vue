<template>
  <div ref="forms">
    <v-tabs grow v-model="tab" class="mb-3">
      <v-tab key="edit" to="/user/edit">编辑信息</v-tab>
      <v-tab key="orders" to="/user/orders">订单</v-tab>
      <v-tab key="billings" to="/user/billings">信用卡</v-tab>
      <v-tab key="shipping" to="/user/shipping">邮寄信息</v-tab>

      <v-tab-item id="/user/edit">
        <router-view v-if="tab === '/user/edit'"></router-view>
      </v-tab-item>
      <v-tab-item id="/user/orders">
        <router-view v-if="tab === '/user/orders'"></router-view>
      </v-tab-item>
      <v-tab-item id="/user/billings">
        <router-view v-if="tab === '/user/billings'"></router-view>
      </v-tab-item>
      <v-tab-item id="/user/shipping">
        <router-view v-if="tab === '/user/shipping'"></router-view>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { getUser, editUser } from '../common/userservice'
import { hasOwn } from '../util'

export default {
  name: 'user-index',
  data: () => ({
    user: null,
    tab: '/user/edit'
  }),
  methods: {

  },
  mounted() {
    this.$vuetify.goTo(this.$refs.forms);
  }
}
</script>

<style>

</style>