<template>
  <div class="container">
    <div class="content">
      <!-- <h2>参与人员</h2> -->
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
          <el-table-column prop="name" label="姓名" width="120" align="center"></el-table-column>
          <el-table-column prop="username" label="用户名(手机号)" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="department" label="所属单位" align="center"></el-table-column>

          <el-table-column prop="role" label="角色" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="250" align="center">
            <template slot-scope="scope">
              <el-button class="update" size="small" @click="edit()">修改</el-button>
              <el-button class="batchDel" size="small" @click="delConfirm()">删除</el-button>
              <el-button class="del" size="small" @click="resetPass()">重置密码</el-button>
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
    <el-dialog title="新建人员数据" :visible.sync="outerVisible" width="40%">
      <!-- 内部操作 -->
      <el-form ref="form" label-width="140px">
        <el-form-item label="用户名：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="所属单位：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="是否初始化密码：">
          <el-select placeholder="请选择" style="width:100%">
            <el-option v-for="item in choose" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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

    <el-dialog title="修改人员数据" :visible.sync="isEdit
    " width="40%">
      <!-- 内部操作 -->
      <el-form ref="form" label-width="140px">
         <el-form-item label="用户名：">
          <el-input value="18826258535" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：">
          <el-input value="王安"></el-input>
        </el-form-item>
        <el-form-item label="所属单位：">
          <el-input value="北京市地震局"></el-input>
        </el-form-item>
        <el-form-item label="电话：">
          <el-input value="13673090911"></el-input>
        </el-form-item>
        <el-form-item label="角色：">
          <el-input value="法人单位管理员"></el-input>
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
          id: "1",
          name: "是"
        },
        {
          id: "0",
          name: "否"
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
          name: "王安",
          username: "18826258535",
          department:"北京市地震局",
          role:"法人单位领导"
        },
        {
          date: "2",
          name: "李欣",
          username: "13572585967",
          department:"河北省地震局",
          role:"法人单位管理员"
        },
        {
          date: "3",
          name: "鬲常伟",
          username: "18092133874",
          department:"中国地震台网中心",
          role:"建设单位领导"
        },{
          date: "4",
          name: "刘欣瑞",
          username: "18852418516",
          department:"中国地震局第一监测中心",
          role:"建设单位管理员"
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
      this.$confirm("密码将重置为123456！", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "重置成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置"
          });
        });
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


