<template>
  <div>
    <el-button type="success" icon="el-icon-check" circle @click="save"></el-button>
    <my-table :col="col" :data="data"></my-table>
  </div>
</template>


<script>
import axios from 'axios'
import MyTable from './MyTable'
export default {
  components: {
    MyTable
  },
  data() {
    return {
      col: [],
      data: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      var that = this
      axios
        .get(
          'http://192.168.5.50:8080/api/fundManage/fundDecomp/getFundAdjustInfo?fundYear='
        )
        .then(function(res) {
          that.col = res.data.result.tableHeader
          that.data = res.data.result.tableData
        })
    },
    save() {
      var that = this
      axios
       .request({
          url: 'http://192.168.5.50:8080/api/fundManage/fundDecomp/saveFundAdjust',
          method: 'post',
          data: that.data
        })
        .then(function(res) {
         console.log("TCL: save -> res", res)
         
        })
    }
  }
}
</script>
<style>
</style>