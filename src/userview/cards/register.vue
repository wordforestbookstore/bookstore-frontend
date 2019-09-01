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
        <v-text-field v-model="email" persistent-hint @keyup.enter="submitForm"
          :rules="emailRules" validate-on-blur
          label="邮箱" hint="一个有效的邮箱，所有系统邮件将发送到此邮箱。"></v-text-field>
        <v-btn class="mt-3" color="primary" @click="submitForm">注册</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { UsernameRules, EmailRules } from '../../common/rules'
import { createRegister } from '../../common/userservice'
import { hasOwn } from '../../util'

export default {
  name: 'register-card',
  data: () => ({
    valid: true,
    emailRules: EmailRules, usernameRules: UsernameRules,
    username: '',
    email: '',
    alert: {
      show: false, text: '', type: 'info'
    }
  }),
  methods: {
    async submitForm() {
      this.alert.show = false;
      if (!this.$refs.form.validate()) return false;
      let res = await createRegister({
        username: this.username,
        email: this.email
      });
      if (hasOwn(res, 'status')) {
        this.alert.type = 'error';
        this.alert.text = res.message;
      } else {
        this.alert.type = 'info';
        this.alert.text = '邮件已经发送至您刚刚填写的邮箱，请确认您的邮箱地址和登录信息';
      }
      this.alert.show = true;
    }
  }
}
</script>

<style>

</style>