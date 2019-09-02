<template>
  <div>
    <v-tabs grow v-model="tab" class="mb-3">
      <v-tab key="edit">编辑个人信息</v-tab>
      <v-tab key="orders">订单</v-tab>
      <v-tab key="billing">信用卡</v-tab>
      <v-tab key="shipping">邮寄信息</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item key="edit">
        <editor :edit="true" ref="form">
          <v-btn class="mt-3" color="primary" @click="submitForm">提交</v-btn>
        </editor>
      </v-tab-item>
      <v-tab-item key="orders">

      </v-tab-item>
      <v-tab-item key="billing">

      </v-tab-item>
      <v-tab-item key="shipping">

      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { getUser, editUser } from '../common/userservice'
import editor from './forms/editor'
import { hasOwn } from '../util'

export default {
  name: 'user-index',
  data: () => ({
    user: null,
    tab: 0
  }),
  components: {
    editor
  },
  methods: {
    async submitForm() {
      let data = this.$refs.form.getData();
      if (!data) return ;

      let res = await editUser(data.currentPassword, data.info);
      if (hasOwn(res, 'status')) {
        this.$refs.form.setAlert(res.message);
      } else {
        this.$refs.form.setAlert('提交成功', 'info');
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