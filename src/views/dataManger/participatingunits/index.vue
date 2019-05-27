<template>
  <div class="container">
    <div class="content">
      <!-- <h2>参与单位</h2> -->
      <div>
        <div>
          <el-button class="add" @click="add()">新建</el-button>
          <el-button class="batchDel" @click="batchDel()">批量删除</el-button>
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            size="mini"
            style="width:200px;float:right"
          ></el-input>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="70" align="center">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="单位名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="所在地" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="leading" label="负责人" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="telephone" label="联系电话" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="mobilephone" label="手机号" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button class="update" size="small" @click="edit(scope.$index, scope.row)">修改</el-button>
              <el-button class="batchDel" size="small" @click="delConfirm()">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination background layout="prev, pager, next" :total="1"></el-pagination>
        </div>
      </div>
    </div>

    <!-- 新增弹出层样式
    -->
    <el-dialog title="新建单位" :visible.sync="outerVisible" width="40%" @close='closeDialog'>
      <!-- 内部操作 -->
      <el-form ref="form" label-width="100px">
        <el-form-item label="单位名称：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="所在地：">
          <el-cascader
          
            clearable
            style="width:100%"
            placeholder="请选择所在地"
            :options="options"
            ref="selectiond"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="负责人：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addSave()" class="add" size="small">保存</el-button>
        <el-button @click="outerVisible=false" class="cancel" size="small">取消</el-button>
      </div>
    </el-dialog>

    <!-- 修改 -->

    <el-dialog title="修改单位" :visible.sync="isEdit
    " width="40%">
      <!-- 内部操作 -->
      <el-form ref="form" label-width="100px">
        <el-form-item label="单位名称：">
          <el-input v-model="name1"></el-input>
        </el-form-item>
        <el-form-item label="所在地：">
          <el-input  v-model="address1"></el-input>
        </el-form-item>
        <el-form-item label="负责人：">
          <el-input  v-model="leading1"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input  v-model="telephone1"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="mobilephone1"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editSave()" class="add" size="small">保存</el-button>
        <el-button @click="isEdit=false" class="cancel" size="small">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog width="30%" title="温馨提示" :visible.sync="innerVisible">
      <div class="info">
        <span style="color:#fc6c5d">
          <i class="el-icon-info"></i>
          {{ tips}}
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="add" size="small" @click="innerVisible = false">确定</el-button>
        <el-button class="cancel" size="small" @click="innerVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      multipleSelection: [],
      options: [
        {
          value: 'zhinan',
          label: '河北省',
          children: [
            {
              value: 'shejiyuanze',
              label: '石家庄',
              children: [
                {
                  value: 'yizhi',
                  label: '城镇'
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '陕西省',
          children: [
            {
              value: 'basic',
              label: '西安市',
              children: [
                {
                  value: 'layout',
                  label: '雁塔区'
                },
                {
                  value: 'color',
                  label: '长安区'
                }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '山西省',
          children: [
            {
              value: 'axure',
              label: '运城市'
            }
          ]
        }
      ],
      outerVisible: false,
      innerVisible: false,
      isEdit: false, // 修改弹出层
      tips: '',
      name1: '',
      address1: '',
      leading1: '',
      telephone1: '',
      mobilephone1: '',
      tableData: [
        {
          date: '1',
          name: '北京地震局',
          address: '北京',
          leading: '常伟',
          telephone: '010-82608491',
          mobilephone: '13585748596'
        },
        {
          date: '2',
          name: '重庆地震局',
          address: '北京',
          leading: '刘梓瑞',
          telephone: '022-28354131',
          mobilephone: '18852411236'
        },
        {
          date: '3',
          name: '河北省地震局',
          address: '河北',
          leading: '李瑞',
          telephone: '0311-85888842',
          mobilephone: '18945446766'
        },
        {
          date: '4',
          name: '山西省地震局',
          address: '山西',
          leading: '罗凡',
          telephone: '0351-2027132',
          mobilephone: '13321216363'
        },
        {
          date: '5',
          name: '内蒙古自治区地震局',
          address: '内蒙古',
          leading: '王瑞萍',
          telephone: '0451-87654321',
          mobilephone: '15544115522'
        },
        {
          date: '6',
          name: '中国地震局地震研究院',
          address: '北京',
          leading: '李欣',
          telephone: '010-62009003',
          mobilephone: '13485748877'
        },
        {
          date: '7',
          name: '中国地震局地震研究院',
          address: '北京',
          leading: '王安',
          telephone: '010-59959440',
          mobilephone: '13955668899'
        },
        {
          date: '8',
          name: '中国地震局地球物理勘探中心',
          address: '北京',
          leading: '栾凯凯',
          telephone: '0371-63750298',
          mobilephone: '18852526655'
        },
        {
          date: '9',
          name: '中国地震局第一监测中心',
          address: '北京',
          leading: '刘欣瑞',
          telephone: '010-12232323',
          mobilephone: '18926912901'
        },
        {
          date: '10',
          name: '中国地震局第二监测中心',
          address: '北京',
          leading: '朱大念',
          telephone: '010-23231212',
          mobilephone: '13685457874'
        }
      ]
    }
  },
  methods: {
    closeDialog(){
      this.$refs.selectiond.click()
    },
    add() {
      this.outerVisible = true
    },
    addSave() {
      this.tips = '添加成功'
      this.outerVisible = false
      this.innerVisible = true
    },
    editSave() {
      this.tips = '修改成功'
      this.isEdit = false
      this.innerVisible = true
    },
    edit(index,row) {
      this.isEdit = true
      this.name1= '',
      this.address1= '',
      this.leading1= '',
      this.telephone1= '',
      this.mobilephone1= '',
      this.name1=row.name;
      this.address1=row.address
      this.leading1=row.leading
      this.telephone1=row.telephone
      this.mobilephone1=row.mobilephone
    },
    delConfirm() {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 批量删除
    batchDel() {
      if (this.multipleSelection.length == 0) {
        this.tips = '请选择'

        this.innerVisible = true
      } else {
        this.tips = '批量删除成功！'

        this.innerVisible = true
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.container {
  padding: 25px 35px;
  .content {
    // f8f9fa
    .el-table {
      font-size: 13px;
    }
    .el-table thead {
      background: #f4f8f9;
    }
    box-shadow: 3px 4px 5px #f8f9fa;
    min-height: 300px;
    background: #fff;
    border-radius: 8px;
    padding: 30px;
    h2 {
      font-size: 16px;
      color: #000;
      font-weight: normal;
    }
    .pagination {
      text-align: right;
      padding: 30px;
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #29c7ca;
      }
    }
  }

  // 按钮样式覆盖

  .add {
    background: #29c7ca;
    color: #fff;
    margin-bottom: 30px;
    padding: 10px 20px;
    border-radius: 10px;
  }
  .update {
    background: #29c7ca;
    color: #fff;

    border-radius: 10px;
  }
  .del {
    background: #eb6c5c;
    color: #fff;

    border-radius: 10px;
  }
  .cancel {
    color: #fff;
    color: #999;
    border-radius: 10px;
  }
  .batchDel {
    background: #eb6c5c;
    color: #fff;

    border-radius: 10px;
  }
  .el-dialog {
    border-radius: 15px;
  }
}
</style>
