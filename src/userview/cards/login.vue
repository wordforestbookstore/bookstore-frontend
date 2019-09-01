<template>
<v-card>
  <v-card-text>
    <v-alert dismissible transition="scale-transition"
      v-model="alert.show"
      :type="alert.type">{{ alert.text }}</v-alert>
    <v-form>
      <v-text-field v-model="username" label="用户名"></v-text-field>
      <v-text-field v-model="password" type="password" label="密码" @keyup.enter="submitForm"></v-text-field>
      <v-btn color="primary" @click="submitForm">登录</v-btn>
    </v-form>
  </v-card-text>
</v-card>
</template>

<script>
import { userLogin } from '../../common/userservice'
import { hasOwn } from '../../util'

export default {
  name: 'login-card',
  data: () => ({
    alert: {
      show: false, type: 'error', text: ''
    },
    username: '', password: ''
  }),
  methods: {
    async submitForm() {
      this.alert.show = false;
      let res = await userLogin(this.username, this.password);
      if (hasOwn(res, 'status')) {
        this.alert.type = 'error';
        this.alert.text = res.message;
        this.alert.show = true;
      } else {
        this.$router.push('/');
      }
    }
  }
}
</script>

<style>

</style>