<template>
  <div id="Te1">
    <table width="1140" border="0" cellspacing="0" cellpadding="0" align="center" v-if="Te_tabs.select==1">
      <tr>
        <!-- <td><img src="http://www.i-rlx.info/images/index_02.jpg" 　border="0" usemap="#Map2" /></td> -->
              <td v-for="(item,index) in Te_tabs.icon" :key="index" >
                <img :src="item.imgurl" :border="Te_tabs.options.border" class="ac" :usemap="Te_tabs.options.usemap" />
              </td>
      </tr>
    </table>
    <table  width="1140" border="0"  cellspacing="0" cellpadding="0" align="center" v-else>
      <tr>
        <td v-for="(item,index) in Te_tabs.icon" :key="index"><img :src="item.imgurl" /></td>
      </tr>
    </table>
     
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
      Te_tabs:{
          default:()=>{},
          type:Object
      }
  },
  components: {},
  create() {},
  mounted() {},
  methoods: {
  },
};
</script>
<style scoped>
 .ac{
   border-collapse: separate;
    border-spacing: 2px;
 }
</style>

