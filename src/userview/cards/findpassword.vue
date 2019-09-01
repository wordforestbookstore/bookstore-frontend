<template>
  <v-card>
    <v-card-text>
      <v-alert dismissible transition="scale-transition"
        v-model="alert.show"
        :type="alert.type">{{ alert.text }}</v-alert>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field style="display: none;"></v-text-field>
        <v-text-field label="邮箱" v-model="email" autofocus
          :rules="emailRules" validate-on-blur @keyup.enter="submitForm"
          hint="您想要找回的账户的注册邮箱。" persistent-hint></v-text-field>
        <v-btn class="mt-3" color="primary" @click="submitForm">找回</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { EmailRules } from '../../common/rules'
import { createRecovery } from '../../common/userservice'
import { hasOwn } from '../../util'

export default {
  name: 'findpassword-card',
  data: () => ({
    valid: true,
    emailRules: EmailRules,
    email: '',
    alert: {
      show: false, text: '', type: 'info'
    }
  }),
  methods: {
    async submitForm() {
      this.alert.show = false;
      if (!this.$refs.form.validate()) return false;
      let res = await createRecovery(this.email);
      if (hasOwn(res, 'status')) {
        this.alert.type = 'error';
        this.alert.text = res.message;
      } else {
        this.alert.type = 'info';
        this.alert.text = '邮件已经发送至您的注册邮箱';
      }
      this.alert.show = true;
    }
  }
}
</script>

<style>

</style>