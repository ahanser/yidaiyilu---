
<template>
  <div class="my-table">
    <el-table :data="data" @cell-click="tableDbEdit">
      <my-column v-for="(item,index) in col" :key="index" :col="item"></my-column>
    </el-table>
  </div>
</template>

<script>
import MyColumn from './MyColumn'
//import EditRow from './EditRow.ts'
export default {
  components: {
    MyColumn
  },
  props: {
    col: {
      type: Array
    },
    data: {
      type: Array
    }
  },
  methods: {
    // 双击修改 弹出input
    tableDbEdit(row, column, cell, event) {
      var that = this
      console.log(
        'TCL: tableDbEdit -> row, column, cell, event',
        row,
        column,
        cell,
        event
      )

      if (
        column.property != 'AD_NAME' &&
        column.property != 'total' &&
        row.mark != 0
      ) {
        //判断点击的单元格中有没有input
        if (cell.querySelector('input')) {
          return
        }
        //获取单元格中的div
        var cellDiv = event.target.innerHTML
        //获取单元格中的原始值
        let value_event = event.target.innerText
        //清空单元格中的div
        event.target.innerHTML = ''
        //创建一个input 对象
        let cellInput = document.createElement('input')
        cellInput.setAttribute('class', 'input_sty')
        cellInput.setAttribute('type', 'text')
        cellInput.style.width = '99%'
        cellInput.style.height = '99%'
        cellInput.style.border = 'none'
        //将原始值放入input中
        cellInput.value = value_event
        //将input添加给单元格
        cell.appendChild(cellInput)
        cellInput.focus()
        //当input失去焦点时将input中的值拿出来付给原来div
        cellInput.onblur = function() {
          cell.removeChild(cellInput)
          event.target.innerHTML = cellInput.value
          //执行计算方法
          that.compute(row, column, cellInput.value)
        }
      }
    },
    compute(row, column, v) {
      var that = this
      if (!that.isNumber(v)) {
        return
      }
      //判断当前改变对象，如果是本期拟分配资金,计算所有本期拟分配资金总和，如果是省级或者是市级资金
      var rn //行号
      that.data.forEach(function(value, index, array) {
        if (value == row) {
          rn = index
        }
      })
      console.log('TCL: 行号 -> rn', rn)
      var c = column.property //列号
      console.log('TCL: 列号 -> c', c)
      var cate = c.substring(1, c.length - 2)
      console.log('TCL: 项目类型 -> cate', cate)
      var l = c.charAt(c.length - 1)
      console.log('TCL: 资金类型 -> l', l)
      row[c] = that.isNumber(v) ? Number(v) : ''
      //行汇总
      if (l == '0') {
        if (that.isNumber(v)) {
          row['_' + cate + '_1'] = v * 0.5
          row['_' + cate + '_2'] = v * 0.5
        }
      } else {
        if (!row['_' + cate + '_0']) {
          row['_' + cate + '_0'] =
            (that.isNumber(row['_' + cate + '_1'])
              ? Number(row['_' + cate + '_1'])
              : 0) +
            (that.isNumber(row['_' + cate + '_2'])
              ? Number(row['_' + cate + '_2'])
              : 0)
        }
      }
      var total = 0
      for (let key in row) {
        if (key.substring(c.length - 2) == '_0') {
          total += Number(row[key])
        }
      }
      row['total'] = total
      that.data[rn] = row
      //列汇总
      var map = new Map()
      that.data.forEach(function(value, index, array) {
        if (value.mark == 1) {
          var adc = value.AD_CODE.substring(0, 2) + '0000'
          if (!map.get(adc)) {
            var obj = {}
            obj.AD_CODE = adc
            obj.AD_NAME = value.AD_NAME + '(汇总)'
            obj.mark = 0
            obj.total = 0
            map.set(adc, obj)
          }
          if (map.get(adc)) {
            var obj = map.get(adc)
            for (var key in value) {
              const element = value[key]
              if (that.isNumber(element) && key != 'AD_CODE') {
                obj[key] =
                  (that.isNumber(obj[key]) ? Number(obj[key]) : 0) +
                  Number(element)
              }
            }
            obj.AD_CODE = adc
            obj.mark = 0
            map.set(adc, obj)
          }
          var adc_2 = value.AD_CODE.substring(0, 4) + '00'
          if (!map.get(adc_2)) {
            var obj = {}
            obj.AD_CODE = adc_2
            obj.AD_NAME = value.AD_NAME + '(汇总)'
            obj.mark = 0
            obj.total = 0
            map.set(adc_2, obj)
          }
          if (map.get(adc_2)) {
            var obj = map.get(adc_2)
            for (var key in value) {
              const element = value[key]
              if (that.isNumber(element) && key != 'AD_CODE') {
                obj[key] =
                  (that.isNumber(obj[key]) ? Number(obj[key]) : 0) +
                  Number(element)
              }
            }
            obj.AD_CODE = adc_2
            obj.mark = 0
            map.set(adc_2, obj)
          }
        }
      })
      console.log('TCL: compute -> map', map)
      that.data.forEach(function(value, index, array) {
        if (map.get(value.AD_CODE) && value.mark == 0) {
          value = map.get(value.AD_CODE)
          that.data[index] = value
        }
      })
    },
    isNumber(val) {
      if (val) {
        var regPos = /^\d+(\.\d+)?$/ //非负浮点数
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ //负浮点数
        if (regPos.test(val) || regNeg.test(val)) {
          return true
        } else {
          return false
        }
      } else return false
    }
  }
}
</script>

<style scoped>
</style>
