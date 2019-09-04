<template>
  <v-data-table
    :loading="loading" loading-text="加载中..."
    locale="zh-Hans"
    :headers="headers"
    :items="list"
    v-model="selected"
    item-key="title"
    show-select single-select
    hide-default-footer>

    <template v-slot:item.action="{ item }">
      <v-btn icon class="mr-2" @click="goEdit(item)">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn icon @click.stop="goDelete(item)">
        <v-icon>delete</v-icon>
      </v-btn>
    </template>

    <template v-slot:footer>
      <v-divider></v-divider>
    </template>

    <template v-slot:no-data>
      <span>您暂时没有添加地址</span>
    </template>

  </v-data-table>
</template>

<script>
export default {
  name: 'shipping-list',
  data: () => ({
    loading: false,
    selected: [],
    headers: [
      {
        text: '地址',
        value: 'title',
        sortable: false
      },
      {
        text: '操作',
        value: 'action',
        sortable: false
      }
    ],
    list: [],
  }),
  methods: {
    goEdit() {

    },
    goDelete() {

    },
    init() {

    }
  },
  created() {

  }
}
</script>

<style>

</style>