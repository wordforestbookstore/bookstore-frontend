<template>
  <v-container>
    <editor :edit="false" ref="form">
      <v-btn class="mt-3" color="primary" @click="submitForm">提交</v-btn>
    </editor>
  </v-container>
</template>

<script>
import api from '../common/apiservice'
import { userRegister } from '../common/userservice'
import { hasOwn } from '../util'
import editor from './forms/editor'

export default {
  name: 'newuser',
  components: {
    editor
  },
  data: () => ({
    type: 'register'
  }),
  methods: {
    async submitForm() {
      let data = this.$refs.form.getData();
      if (!data) return ;
      
      let res;
      if (this.type === 'register') {
        res = await userRegister(this.$route.query.token, data.currentPassword, data.info);
      } else if (this.type === 'recovery') {
        res = await userRegister(this.$route.query.token, data.currentPassword, data.info, '/recovery');
      }

      if (hasOwn(res, 'status')) {
        this.$refs.form.setAlert(res.message);
      } else {
        this.$router.push('/');
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (hasOwn(to.query, 'token')) {
      api.get(`/newUser/${to.query.token}`)
        .then(({ data }) => { 
          next(vm => {
            if (data[to.query.token] === 'recovery') {
              vm.type = 'recovery';
              document.title = '找回密码 - 辞林书店';
            } else {
              vm.type = 'register';
              document.title = '新用户注册 - 辞林书店';
            }
            vm.$refs.form.setInfo({
              firstName: data.firstname ? data.firstname : '', 
              lastName: data.lastname ? data.lastname : '',
              username: data.username, 
              email: data.email,
              password: '', 
            });
          });
        })
        .catch(() => { next('/'); });
    } else {
      next('/');
    }
  },
}
</script>

<style>

</style>