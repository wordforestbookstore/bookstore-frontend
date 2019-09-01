<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card tile>
          <v-card-title>购买需知</v-card-title>
          <v-divider></v-divider>

          <v-list-item two-line v-for="item in shop">
            <v-list-item-content>
              <v-list-item-title class="title">Q: {{ item[0] }}</v-list-item-title>
              <v-list-item-subtitle class="body-1">
                <span class="title text--black">A: </span>
                {{ item[1] }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>邮寄需知</v-card-title>
          <v-divider></v-divider>

          <v-card-text class="body-1">
            辞林书店因可以为您提供具有竞争力的运费而感到自豪。我们所有的货物都经过严密而专业的包装，以确保您的货物在运输途中的安全。
          </v-card-text>
          <v-list-item two-line v-for="item in ship">
            <v-list-item-content>
              <v-list-item-title class="title">Q: {{ item[0] }}</v-list-item-title>
              <v-list-item-subtitle class="body-1">
                <span class="title text--black">A: </span>
                {{ item[1] }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'faq',
  data: () => ({
    shop: [
      [
        '如何下订单？', 
        '您需要先注册一个账号，然后您就可以使用您的账号来下订单。',
      ],
      [
        '如何注册账号？',
        '点击右上角的登录按钮，然后点击注册，填写注册信息。'
      ],
      [
        '下单后，处理订单并将货物送达需要多久？',
        '无论选择何种送货方式，订单处理都需要1-3个工作日(周一至周五)。发货后，您会在2-10个工作日内收到货物，请注意，2天和隔夜服务指工作日(周一至周五)。'
      ],
      [
        '所有商品都保证库存嘛？',
        '我们会经常更新网站以反映缺货情况，但是，并不能保证您订购的商品在处理订单时仍有库存，若没有，您将收到通知。'
      ],
      [
        '为什么我无法选择我想要的尺寸和颜色？',
        '如果您无法选择特定的尺寸或颜色，通常意味着商品缺货。请在2-3周后再次检查您想要的尺寸或颜色是否有货。'
      ],
      [
        '我在网站上找不到想要的商品，是否有并未在网站上列出的商品？',
        '我们上架的商品是当前可查看和订购的商品。在UVM书店和Catamount书店有更多商品可供选择。当您在伯灵顿地区时，建议使用我们的商店。'
      ],
      [
        '如何检查订单状态？',
        '如果您已经在UVM书店创建了账户，请单击“我的账户”并使用电子邮件和密码登录。您可以查看您所有订单的状态，也可以拨打1.800.331.7305与我们联系，提供您的姓名、订单号，即可检查订单状态。我们的办公时间是美国东部时间周一至周五上午八点至下午四点半。'
      ],
      [
        '如何取消或修改订单？',
        '您可以拨打1.999.999.9999联系我们，提供您的姓名、订单号，即可取消订单或修改订单。我们的办公时间是美国东部时间周一至周五上午八点至下午四点半。我们会尽力取消或修改您的订单，但如果订单已被处理或货物已被装运，我们将无法取消订单。'
      ]
    ],
    ship: [
      [
        '一份订单需要多少运费？',
        '运费取决于所订购商品的总金额和选择的运输方式。有些商品需要额外收费，如大型盒子或框架需要19.99美元，粘连盒子需要1.00美元。密西西比河以东的货物和密西西比河以西的45.00美元的座椅和摇杆价格为35.00美元。'
      ],
      [
        '提供哪些送货方式？',
        '我们提供 UPS，FedEx，US mail。'
      ],
      [
        '货物需多久送达？',
        '一般7-10个工作日内会收到货物，在8月和1月期间，送货时间可能会更长。'
      ]
    ]
  }),
}
</script>

<style>

</style>