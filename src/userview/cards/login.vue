<template>
<v-card>
  <v-card-text>
    <v-alert dismissible transition="scale-transition"
      v-model="alert.show"
      :type="alert.type">{{ alert.text }}</v-alert>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="username" autofocus
        :rules="usernameRules" validate-on-blur
        label="用户名"></v-text-field>
      <v-text-field v-model="password" 
        :rules="passwordRules"  validate-on-blur
        type="password" label="密码" @keyup.enter="submitForm"></v-text-field>
      <v-btn class="mt-3" color="primary" @click="submitForm">登录</v-btn>
    </v-form>
  </v-card-text>
</v-card>
</template>

<script>
import { UsernameRules, PasswordRules } from '../../common/rules'
import { userLogin } from '../../common/userservice'
import { hasOwn } from '../../util'

export default {
  name: 'login-card',
  data: () => ({
    valid: true,
    usernameRules: UsernameRules, passwordRules: PasswordRules,
    alert: {
      show: false, type: 'error', text: ''
    },
    username: '', password: ''
  }),
  methods: {
    async submitForm() {
      this.alert.show = false;
      if (!this.$refs.form.validate()) return false;
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