<template>
  <v-data-table
    class="px-4"
    :loading="loading" loading-text="加载中..."
    locale="zh-Hans"
    :headers="headers"
    :items="list"
    item-key="cardname"
    v-model="selected"
    @item-selected="onSelect"
    show-select single-select
    hide-default-footer>

    <template v-slot:header.data-table-select>
      <div style="width: 2em">默认</div>
    </template>

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

      <v-dialog v-model="dialog" width="300">
        <v-card>
          <v-card-title class="title" primary-title>确认删除？</v-card-title>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="error" text @click="confirmDelete">确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </template>

    <template v-slot:no-data>
      <span>您暂时没有添加信用卡</span>
    </template>

  </v-data-table>
</template>

<script>
import { getBillingsList, deleteBilling, updateDefault } from './service'
import { userLogout } from '../../common/userservice'
import { hasOwn } from '../../util'

export default {
  name: 'billings-list',
  data: () => ({
    loading: false,
    dialog: false, totDelete: null,
    selected: [],
    list: [],
    headers: [
      {
        text: '信用卡',
        value: 'cardname',
        sortable: false
      },
      {
        text: '操作',
        value: 'action',
        sortable: false,
        align: 'center',
        width: '20%'
      }
    ]
  }),
  methods: {
    goEdit(item) {
      this.$router.push(`/user/billings/update?id=${item.id}`);
    },
    async confirmDelete() {
      let res = await deleteBilling(this.totDelete.id);
      if (hasOwn(res, 'status') && res.stauts === 'error') {
        this.$router.push('/');
      } else {
        const id = this.list.indexOf(this.totDelete);
        const flag = Boolean(this.totDelete.id);
        if (id !== -1) {
          this.list.splice(id, 1);
        }
        if (flag) {
          let mn = -1, newD = null;
          for (let item of this.list) {
            if (mn == -1 || Number(item.id) < mn) {
              newD = item; mn = Number(item.id);
            }
          }
          if (newD) this.selected = [newD];
        }
        this.dialog = false;
      }
    },
    goDelete(item) {
      this.totDelete = item;
      this.dialog = true;
    },
    async onSelect(newV) {
      let res = await updateDefault(newV.item.id);
      if (hasOwn(res, 'status') && res.status === 'error') {
        this.$router.push('/');
      }
    },
    async init() {
      this.loading = true;
      let res = await getBillingsList();
      if (hasOwn(res, 'status') && res.status === 'error') {
        userLogout();
        this.$router.push('/');
      } else {
        this.list = res;
        for (let item of res) {
          if (item.default === 'true') {
            this.selected = [item];
            break;
          }
        }
        this.loading = false;
      }
    }
  },
  created() {
    this.init();
  }
}
</script>

<style>

</style>