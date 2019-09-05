<template>
  <div>
    <v-row v-if="list.length > 0">
      <v-col>
        <v-data-table
          locale="zh-Hans"
          :headers="headers"
          :items="list"
          hide-default-footer>

          <template v-slot:item.address="{ item }">
            <span>{{ item.shippingstate }} {{ item.shippingcity }} {{ item.shippingstreet1 }}</span>
          </template>

          <template v-slot:item.action="{ item }">
            <v-btn color="primary" @click="useAddress(item)">使用该地址</v-btn>
          </template>

          <template v-slot:footer>
            <v-divider></v-divider>
          </template>

          <template v-slot:no-data>
            <span>您暂时没有添加地址</span>
          </template>

        </v-data-table>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col>
        <v-form ref="form" v-model="valid">

          <v-text-field v-model="info.shippingname" :rules="rules.shippingname"
            label="* 收件人姓名"></v-text-field>

          <v-row class="mt-0">
            <v-col class="py-0">
              <v-select :items="province" v-model="info.shippingstate"
                label="* 省份"></v-select>
            </v-col>
            <v-col class="py-0">
                <v-select :items="city" v-model="info.shippingcity"
                  :rules="rules.shippingcity"
                  label="* 城市"></v-select>
            </v-col>
            <v-col class="py-0">
              <v-text-field v-model="info.zipcode" :rules="rules.zipcode"
                label="* 邮政编码"></v-text-field>
            </v-col>
          </v-row>

          <v-text-field v-model="info.shippingstreet1" :rules="rules.shippingstreet1"
            label="* 街道地址1"></v-text-field>
          <v-text-field v-model="info.shippingstreet2" :rules="rules.shippingstreet2"
            label="* 街道地址2"></v-text-field>

          <v-btn class="mt-4" color="primary" @click="nextStep">下一步</v-btn>

        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getAddressList } from '../shipping/service'
import { notEmpty, isDigits } from '../../common/rules'
import { CityList } from '../../common/city'
import { hasOwn } from '../../util'

export default {
  name: 'checkout-address',
  data: () => ({
    valid: true,
    province: Object.keys(CityList),
    info: {
      shippingname: '',
      shippingstreet1: '',
      shippingstreet2: '',
      zipcode: '',
      shippingcity: '',
      shippingstate: '河北省'
    },
    rules: {
      shippingname: [notEmpty('收件人姓名')],
      shippingstreet1: [notEmpty('街道地址1')],
      shippingstreet2: [notEmpty('街道地址2')],
      zipcode: [notEmpty('邮政编码'), isDigits('邮政编码')],
      shippingcity: [notEmpty('城市')],
    },
    list: [],
    headers: [
      {
        text: '地址',
        value: 'address',
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
  computed: {
    city() {
      if (CityList[this.info.shippingstate]) {
        return CityList[this.info.shippingstate]
      } else {
        return [];
      }
    }
  },
  watch: {
    info: {
      deep: true,
      handler: function (newV) {
        this.$emit('addressupdate', newV);
      }
    },
  },
  methods: {
    useAddress(item) {
      this.info = item;
    },
    async init() {
      let res = await getAddressList();
      if (hasOwn(res, 'status') && res.status === 'error') {

      } else {
        for (let item of res) {
          if (item.default === 'true') {
            this.info = item; break;
          }
        }
        this.list = res;
      }
    },
    nextStep() {
      if (!this.$refs.form.validate()) return false;
      this.$emit('nextstep', 1);
    },
    checkValid() {
      return this.$refs.form.validate();
    },
    getData() {
      return this.info;
    }
  },
  created() {
    this.init();
  }
}
</script>

<style>

</style>