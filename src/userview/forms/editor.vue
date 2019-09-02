<template>
  <v-container>
    <v-alert dismissible transition="scale-transition"
      v-model="alert.show"
      :type="alert.type">{{ alert.text }}</v-alert>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col>
          <v-text-field v-model="info.firstName" label="姓"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="info.lastName" label="名"></v-text-field>
        </v-col>
      </v-row>

      <v-text-field v-model="info.username" 
        required  :readonly="!edit"
        label="用户名"></v-text-field>

      <v-text-field required :rules="passwordRules_" validate-on-blur
        v-model="currentPassword" type="password" label="* 原密码"></v-text-field>

      <v-text-field required :readonly="!edit" validate-on-blur
        v-model="info.email" label="邮箱"></v-text-field>

      <v-text-field
        required :rules="passwordRules" validate-on-blur
        v-model="info.password" type="password" label="新的密码"></v-text-field>

      <v-text-field
        required :rules="[checkPassword, ...passwordRules]" validate-on-blur
        v-model="password2" type="password" label="确认密码"></v-text-field>

      <slot></slot>
    </v-form>
  </v-container>
</template>

<script>
import { PasswordRules, PasswordRules2 } from '../../common/rules'

export default {
  name: 'info-editor',
  data: () => ({
    alert: {
      show: false, type: 'error', text: ''
    },
    passwordRules_: PasswordRules,
    valid: true,
    currentPassword: '',
    password2: '',
    info: {
      firstName: '', lastName: '',
      username: '', email: '',
      password: ''
    },
  }),
  computed: {
    passwordRules() {
      if (this.edit) return PasswordRules2;
      else return PasswordRules;
    }
  },
  methods: {
    getData() {
      this.alert.show = false;
      if (!this.$refs.form.validate()) return false;
      return {
        currentPassword: this.currentPassword,
        info: this.info
      }
    },
    setAlert(message, type = 'error') {
      this.alert.type = type;
      this.alert.text = message;
      this.alert.show = true;
    },
    setInfo(obj) {
      this.info = obj;
    },
    checkPassword() {
      if (this.password2 !== this.info.password) {
        return '确认密码和新的密码不一致';
      } else {
        return true;
      }
    }
  },
  props: [
    'edit'
  ]
}
</script>

<style>

</style>