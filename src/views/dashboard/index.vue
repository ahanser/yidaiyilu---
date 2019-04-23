<template>
  <div class="container">
    <div class="content">
      <!-- <h2>建设任务</h2> -->
      <div>
        <div>
          <el-button class="add" @click="add()">新建</el-button>
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            size="mini"
            style="width:200px;float:right"
          ></el-input>
        </div>

        <!-- <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="编号" width="70" align="center"></el-table-column>
          <el-table-column prop="address" label="名称" align="center"></el-table-column>

          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button class="update" size="small" @click="edit(scope.$index, scope.row)">修改</el-button>
              <el-button class="batchDel" size="small" @click="delConfirm()">删除</el-button>
            </template>
          </el-table-column>
        </el-table>-->
        <tree-table :data="data" :eval-args="args" :expand-all="expandAll" border>
          <el-table-column label="编号" prop="date"></el-table-column>
          <el-table-column label="名称">
            <template slot-scope="scope">
              <span>{{ scope.row.event }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button class="update" size="small" @click="edit(scope.$index, scope.row)">修改</el-button>
              <el-button class="batchDel" size="small" @click="delConfirm()">删除</el-button>
            </template>
          </el-table-column>
        </tree-table>
        <div class="pagination">
          <el-pagination background layout="prev, pager, next" :total="10"></el-pagination>
        </div>
      </div>
    </div>

    <!-- 新建 弹出层样式
    -->
    <el-dialog title="新建任务" :visible.sync="outerVisible" width="40%">
      <!-- 内部操作 -->
      <el-form ref="form" label-width="80px">
        <el-form-item label="名称：">
          <el-input></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addSave()" class="add" size="small">保存</el-button>
        <el-button @click="outerVisible=false" class="cancel" size="small">取消</el-button>
      </div>
    </el-dialog>

    <!-- 修改弹出样式 -->

    <el-dialog title="修改任务" :visible.sync="isEdit" width="40%">
      <!-- 内部操作 -->
      <el-form ref="form" label-width="80px">
        <el-form-item label="名称：">
          <el-input value="路基探测监测系统"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editSave()" class="add" size="small">保存</el-button>
        <el-button @click="isEdit=false" class="cancel" size="small">取消</el-button>
      </div>
    </el-dialog>

    <!-- 操作提示 -->
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
import treeTable from '@/components/TreeTable'

export default {
  name: 'CustomTreeTableDemo',
  components: { treeTable },
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      isEdit: false, // 修改弹出层
      tips: '',
      editForm: '',
      data: [
        {
          id: 1,
          date: 1,
          event: '路基探测监测系统',
          comment: '无',
          children: [
            {
              id: 6,
              date: '1-1',
              event: '台阵',
              timeLine: 10,
              comment: '无',
              children: [
                {
                  id: 12,
                  date: '1-1-1',
                  event: '3×3台阵',
                  timeLine: 10,
                  comment: '无'
                },
                {
                  id: 13,
                  date: '1-1-2',
                  event: '5×5台阵',
                  timeLine: 10,
                  comment: '无'
                }
              ]
            },
            {
              id: 7,
              date: '1-2',
              event: '综合台',
              timeLine: 10,
              comment: '无'
            },
            {
              id: 8,
              date: '1-3',
              event: '科学台阵',
              timeLine: 10,
              comment: '无'
            },
            {
              id: 9,
              date: '1-4',
              event: '地磁',
              timeLine: 10,
              comment: '无'
            },
            {
              id: 10,
              date: '1-5',
              event: '重力',
              timeLine: 10,
              comment: '无'
            },
            {
              id: 11,
              date: '1-6',
              event: '陆域机动探测',
              timeLine: 10,
              comment: '无'
            }
          ]
        },
        {
          id: 2,
          date: 2,
          event: '海域探测监测系统',
          comment: '无'
        },
        {
          id: 3,
          date: 3,
          event: '数据传输系统',
          comment: '无'
        },
        {
          id: 4,
          date: 4,
          event: '信息处理与服务系统',
          comment: '无'
        },
        {
          id: 5,
          date: 5,
          event: '运行管理保障系统',
          comment: '无'
        }
      ],
      tableData: [
        {
          date: '1',
          name: '王小虎',
          address: '路基探测监测系统'
        },
        {
          date: '2',
          name: '王小虎',
          address: '海域探测监测系统'
        },
        {
          date: '3',
          name: '王小虎',
          address: '数据传输系统'
        },
        {
          date: '4',
          name: '王小虎',
          address: '信息处理与服务系统'
        },
        {
          date: '5',
          name: '王小虎',
          address: '运行管理保障系统'
        }
      ]
    }
  },
  methods: {
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
    edit(index, row) {
      this.isEdit = true
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.container {
  .info {
    color: #fc6c5d;
  }

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
    background: #f5af50;
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
