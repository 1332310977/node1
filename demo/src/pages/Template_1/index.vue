<template>
  <div id="Te1 main" :style="{ 'background-image': 'url(' + Main_backimg + ') no-repeat' }">
    <tel-table :Te_tabs="Te_tabs1"></tel-table>
    <tel-table :Te_tabs="Te_tabs2"></tel-table>
    <table width="1140" border="0" cellspacing="0"  cellpadding="0" align="center">
      <tr>
        <td v-for="(item,index) in Te_tabs3.icon" :key="index">
           <a :href="item.href" @mouseout="MM_swapImgRestore(index,delut+item.imgurl,delut+item.hoveimg)" @mouseover="MM_swapImage(index,delut+item.imgurl,delut+item.hoveimg)">
             <img :src="delut+item.imgurl" name="Image7" border="0" id="Image7"/>
           </a>
        </td>
      </tr>
    </table>


    <components :is="item.name" v-for="(item,index) in Tabsle" :key="index"></components>

   

    <table width="1140" border="0" cellspacing="0" cellpadding="0" align="center">
      <tbody><tr>
        <td><img src="http://www.i-rlx.info/images/index_34.jpg"></td>
      <td><img src="http://www.i-rlx.info/images/index_35_01.jpg" border="0" usemap="#Map4"></td>
      <td class="foot" valign="top" align="left">
        <div style="margin:60px 10px 0 10px;">
          <a href="index.html">トップページ</a>　|　
          <a href="system.html">料金システム</a>　|　
          <a href="/duty/staff">セラピスト</a>　|
          <a href="info.html">店内風景</a>　|
          <a href="access.html">アクセス</a>　|　
          <a href="recruit.html">求人情報</a>　|
        </div>
        <img src="http://www.i-rlx.info/images/index_35_02.jpg" border="0" usemap="#Map4">
      </td>
      <td><img src="http://www.i-rlx.info/images/index_36.jpg"></td>
      </tr>
      
    </tbody></table>







    <map name="Map" id="Map">
    <area shape="rect" coords="113,21,178,39" href="index.html" />
    <area shape="rect" coords="219,22,312,42" href="/duty/staff" />
    <area shape="rect" coords="357,22,434,44" href="system.html" />
    <area shape="rect" coords="477,20,556,41" href="info.html" />
    <area shape="rect" coords="591,20,673,43" href="access.html" />
    <area shape="rect" coords="716,23,797,43" href="recruit.html" />
    <area shape="rect" coords="256,66,571,111" href="tel:03-3981-5166" />
    </map>
    <map name="Map2" id="Map2"><area shape="rect" coords="675,62,980,119" href="tel:03-3981-5166" />
    </map>
    <map name="Map3" id="Map3"><area shape="rect" coords="23,242,173,257" href="http://www.i-rlx.info/i/" target="_blank" />
    </map>
    <map name="Map4" id="Map4">
    <area shape="rect" coords="244,171,522,210" href="tel:03-3981-5166" />
    </map>
    <map name="Map5" id="Map5"><area shape="rect" coords="3,1,385,233" href="http://i-rlx.info/s/" />
    </map>

  </div>
</template>

<script>










import TelTable from "@/components/Template1/Te_table/index.vue";
import com1 from '@/components/Template1/Tecom1/index.vue'
export default {
  data() {
    return {
      delut:'http://www.i-rlx.info/',
      Main_backimg: "http://www.i-rlx.info/images/bg.jpg",
      Tabsle:[
        {name:'com1'},
        {name:''},
      ],
      Te_tabs1: {
        select: 1,
        options: {
            border: 0,
          usemap: "#Map2",
     
        },
        icon: [
          { imgurl: "http://www.i-rlx.info/images/index_01.jpg" },
          { imgurl: "http://www.i-rlx.info/images/index_02.jpg" },
          { imgurl: "http://www.i-rlx.info/images/index_03.jpg" },
        ],
      },
      Te_tabs2: {
        select: 2,
        options: {
         border: "",
          usemap: "",
        },
        icon: [
          { imgurl: "http://www.i-rlx.info/images/index_04.jpg" },
          { imgurl: "http://www.i-rlx.info/images/03.jpg" },
          { imgurl: "http://www.i-rlx.info/images/index_06.jpg" },
        ],
      },
      Te_tabs3: {
        icon: [
          { imgurl: "images/index_08.jpg",hoveimg:'images/index1_08.jpg'},
          { imgurl: "images/index_09.jpg",hoveimg:'images/index1_09.jpg'},
          { imgurl: "images/index_10.jpg",hoveimg:'images/index1_10.jpg'},
          { imgurl: "images/index_11.jpg",hoveimg:'images/index1_11.jpg'},
          { imgurl: "images/index_12.jpg",hoveimg:'images/index1_12.jpg'},
          { imgurl: "images/index_13.jpg",hoveimg:'images/index1_13.jpg'},
        ],
      },
    };
  },
  props: {},
  components: {
    TelTable: TelTable,
    com1:com1
  },
  create() {},
  mounted() {},
  methods: {
    MM_swapImgRestore(index,defalut_img,hove_img){
      let A = this.Te_tabs3.icon[index].hoveimg
      let B = this.Te_tabs3.icon[index].imgurl
      this.Te_tabs3.icon[index].imgurl = A
      this.Te_tabs3.icon[index].hoveimg = B
    },
    MM_swapImage(index,defalut_img,hove_img){
      let A = this.Te_tabs3.icon[index].hoveimg
      let B = this.Te_tabs3.icon[index].imgurl
      this.Te_tabs3.icon[index].imgurl = A
      this.Te_tabs3.icon[index].hoveimg = B

    }
  },
};
</script>
<style lang="css">
@import "./css/com.css";
</style> 
