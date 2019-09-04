<template>
  <div ref="forms">
    <v-tabs grow v-model="tab" class="mb-3">
      <v-tab key="register">注册</v-tab>
      <v-tab key="login">登录</v-tab>
      <v-tab key="findpassword">找回密码</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="register">
        <register-card></register-card>
      </v-tab-item>
      <v-tab-item key="login">
        <login-card></login-card>
      </v-tab-item>
      <v-tab-item key="findpassword">
        <findpassword-card></findpassword-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import registerCard from './cards/register'
import loginCard from './cards/login'
import findpasswordCard from './cards/findpassword'

export default {
  name: 'login',
  components: {
    registerCard,
    loginCard,
    findpasswordCard
  },
  data: () => ({
    tab: 1
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