<template>
  <v-card class="mt-4">
    <editor :edit="true" ref="form">
      <v-btn class="mt-3" color="primary" @click="submitForm">提交</v-btn>
    </editor>
  </v-card>
</template>

<script>
import editor from './editor'
import { getUser, editUser } from '../../common/userservice'
import { hasOwn } from '../../util'

export default {
  name: 'user-edit',
  components: {
    editor
  },
  data: () => ({
    user: null
  }),
  methods: {
    async submitForm() {
      let data = this.$refs.form.getData();
      if (!data) return ;

      let res = await editUser(data.currentPassword, data.info);
      if (hasOwn(res, 'status')) {
        this.$refs.form.setAlert(res.message);
      } else {
        this.$refs.form.setAlert('提交成功', 'success');
      }
    }
  },
  mounted() {
    this.user = getUser();
    this.user.password = '';
    this.$refs.form.setInfo(this.user);
  }
}
</script>

<style>

</style>