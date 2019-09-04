<template>
  <v-container class="mx-4">
    <v-form ref="form" v-model="valid">

      <v-text-field
        label="* 姓名"></v-text-field>
      <v-text-field
        label="* 地址"></v-text-field>  

      <v-row class="mt-0">
        <v-col class="py-0">
          <v-text-field
            label="* 城市"></v-text-field>
        </v-col>
        <v-col class="py-0">
          <v-text-field
            label="* 地区"></v-text-field>
        </v-col>
        <v-col class="py-0">
          <v-text-field
            label="* 邮政编码"></v-text-field>
        </v-col>
      </v-row>

      <v-btn color="primary" @click="submitForm">保存</v-btn>

    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'shipping-add',
  data: () => ({
    valid: true
  }),
  methods: {
    submitForm() {
      if (!this.$refs.form.validate()) return false;

    }
  }
}
</script>

<style>

</style>