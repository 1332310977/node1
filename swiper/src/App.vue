<template>
  <div></div>
</template>

<script>
import axios from 'axios'
export default {
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

