<template>
  <div class="container">
    <div class="content">
      <!-- <h2>建设过程</h2> -->
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
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="序号" width="70" align="center">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="过程名称" width="120" align="center"></el-table-column>
          <el-table-column prop="sort" label="排序" show-overflow-tooltip width="100" align="center"></el-table-column>
          <el-table-column prop="remark" label="备注" align="center"></el-table-column>
          <el-table-column label="操作" width="250" align="center">
            <template slot-scope="scope">
              <el-button class="update" size="small" @click="edit()">修改</el-button>
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
    <el-dialog title="新建过程" :visible.sync="outerVisible" width="40%">
      <!-- 内部操作 -->
      <el-form ref="form" label-width="140px">
        <el-form-item label="过程名称：">
          <el-select placeholder="请选择" style="width:100%">
            <el-option v-for="item in choose" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input></el-input>
        </el-form-item>
        <!-- <el-form-item label="是否初始化密码：">
          <el-select placeholder="请选择" style="width:100%">
            <el-option v-for="item in choose" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addSave()" class="add" size="small">保存</el-button>
        <el-button @click="outerVisible=false" class="cancel" size="small">取消</el-button>
      </div>
    </el-dialog>

    <!-- 修改 -->

    <el-dialog title="修改建设过程" :visible.sync="isEdit
    " width="40%">
      <!-- 内部操作 -->
      <el-form ref="form" label-width="140px">
        <el-form-item label="过程名称：">
          <el-input value="堪选"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input value="1"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input></el-input>
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      choose: [
        {
          id: "0",
          name: "堪选"
        },
        {
          id: "1",
          name: "征地"
        },
        {
          id: "2",
          name: "土建"
        },
        {
          id: "3",
          name: "试运行"
        },
        {
          id: "4",
          name: "验收"
        },
        {
          id: "5",
          name: "设备购置"
        },
        {
          id: "6",
          name: "仪器架设"
        },
        {
          id: "7",
          name: "前期工作咨询"
        },
        {
          id: "8",
          name: "工程设计"
        },
        {
          id: "9",
          name: "节能影响评估"
        },
        {
          id: "10",
          name: "工程监理"
        },
        {
          id: "11",
          name: "安全测评"
        },
        {
          id: "12",
          name: "项目管理"
        },
        {
          id: "13",
          name: "项目培训"
        },
        {
          id: "14",
          name: "建设工程"
        },
        {
          id: "15",
          name: "项目其他建设"
        },
        {
          id: "16",
          name: "项目基本预备"
        }
      ],
      multipleSelection: [],
      options: [
        {
          value: "zhinan",
          label: "河北省",
          children: [
            {
              value: "shejiyuanze",
              label: "石家庄",
              children: [
                {
                  value: "yizhi",
                  label: "城镇"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "陕西省",
          children: [
            {
              value: "basic",
              label: "西安市",
              children: [
                {
                  value: "layout",
                  label: "雁塔区"
                },
                {
                  value: "color",
                  label: "长安区"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "山西省",
          children: [
            {
              value: "axure",
              label: "运城市"
            }
          ]
        }
      ],
      outerVisible: false,
      innerVisible: false,
      isEdit: false, // 修改弹出层
      tips: "",
      tableData: [
        {
          date: "1",
          name: "堪选",
          sort: "1",
          remark:""
        },
        {
          date: "2",
          name: "征地",
          sort: "2",
          remark:""
        },
        {
          date: "3",
          name: "土建",
          sort: "3",
          remark:""
        },
        {
          date: "4",
          name: "试运行",
          sort: "4",
          remark:""
        },
        {
          date: "5",
          name: "验收",
          sort: "5",
          remark:""
        },
        {
          date: "6",
          name: "设备购置",
          sort: "6",
          remark:""
        },
        {
          date: "7",
          name: "仪器架设",
          sort: "7",
          remark:""
        },
        {
          date: "8",
          name: "前期工作咨询",
          sort: "8",
          remark:""
        },
        {
          date: "9",
          name: "工程设计",
          sort: "9",
          remark:""
        },
        {
          date: "10",
          name: "节能影响评估",
          sort: "10",
          remark:""
        }
      ]
    };
  },
  methods: {
    add() {
      this.outerVisible = true;
    },
    addSave() {
      this.tips = "添加成功";
      this.outerVisible = false;
      this.innerVisible = true;
    },
    editSave() {
      this.tips = "修改成功";
      this.isEdit = false;
      this.innerVisible = true;
    },
    edit() {
      this.isEdit = true;
    },
    delConfirm() {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 批量删除
    batchDel() {
      if (this.multipleSelection.length == 0) {
        this.tips = "请选择！";

        this.innerVisible = true;
      } else {
        this.tips = "批量删除成功！";

        this.innerVisible = true;
      }
    },
    //重置密码
    resetPass() {
      this.tips = "密码重置成功！";

      this.innerVisible = true;
    }
  }
};
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


