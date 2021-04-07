<template>
    <router-view/>
</template>

<script>
import axios from 'axios'
export default {
  created(){
      const params = `#version=v3.3&appId=saddadsd&status=true&cookie=true&xfbml=true&autoLogAppEvents=true`;
      (function (d, s, id) {
      // Load the SDK asynchronously
      var js;
      var fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/zh_TW/sdk.js" + params;
      fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
  },
   mounted(){
      //  axios.post('http://127.0.0.1:7001/SendBuff','arraybuffer').then(res=>{
      //           const buf = new Buffer.from(res.data.data, 'binary')
      //           // 再输入到 Blob 生成文件
      //           let blob = new Blob([buf], {type: 'application/doc'});
      //           let a = document.createElement('a')
      //           // 指定生成的文件名
      //           a.download = res.data.name
      //           a.href = URL.createObjectURL(blob)
      //           document.body.appendChild(a)
      //           a.click()
      //           document.body.removeChild(a)

      //  })
   }
}
</script>

