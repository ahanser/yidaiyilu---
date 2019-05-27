<template>
  <div class="container">
    <div class="content">
      <!-- <h2>参与角色</h2> -->
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

        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="编号" width="100" align="center"></el-table-column>
          <el-table-column prop="name" label="角色名称" width="250" align="center"></el-table-column>

          <el-table-column label="备注" align="center"></el-table-column>
          <el-table-column label="操作" width="260" align="center">
            <template slot-scope="scope">
              <el-button size="small" class="authority" @click="showAuth()">菜单权限</el-button>
              <el-button class="update" size="small" @click="edit()">修改</el-button>
              <el-button class="del2" size="small" @click="delConfirm()">删除</el-button>
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
    <el-dialog title="新建角色" :visible.sync="outerVisible" width="40%">
      <!-- 内部操作 -->

      <el-form ref="form" label-width="100px">
        <el-form-item label="角色名称：">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="备注：">
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addSave()" class="add" size="small">保存</el-button>
        <el-button @click="outerVisible=false" class="cancel" size="small">取消</el-button>
      </div>
    </el-dialog>

    <!-- 修改 -->

    <el-dialog title="修改角色名称" :visible.sync="isEdit
    " width="40%">
      <!-- 内部操作 -->
      <el-form ref="form" label-width="100px">
        <el-form-item label="角色名称：">
          <el-input value="法人单位领导"></el-input>
        </el-form-item>

        <el-form-item label="备注：">
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editSave()" class="add" size="small">保存</el-button>
        <el-button @click="isEdit=false" class="cancel" size="small">取消</el-button>
      </div>
    </el-dialog>

    <!-- 权限展示模态框 -->
    <el-dialog title="菜单权限" :visible.sync="isAuth" width="25%" :before-close="handleClose">
      <el-tree :data="data2" show-checkbox node-key="id"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="authSave()" class="add" size="small">保存</el-button>
        <el-button @click="isAuth=false" class="cancel" size="small">取消</el-button>
      </span>
    </el-dialog>
    <!-- 提示模态框 -->
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
      outerVisible: false,
      innerVisible: false,
      isEdit: false, // 修改弹出层
      isAuth: false,
      tips: "",
      tableData: [
        {
          date: "1",
          name: "法人单位领导",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2",
          name: "法人单位管理员",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "3",
          name: "建设单位领导",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "4",
          name: "建设单位管理员",
          address: "上海市普陀区金沙江路 1519 弄"
        }
      ],
      data2: [
        {
          id: 1,
          label: "项目管理",
          children: [
            {
              id: 6,
              label: "建设任务"
            },
            {
              id: 7,
              label: "建设过程"
            },
            {
              id: 8,
              label: "建设项目"
            }
               ]
        },
        {
          id: 2,
          label: "业务管理",
          children: [
            {
              id: 9,
              label: "业务管理"
            }
          ]
        },
        {
          id: 3,
          label: "统计管理",
          children: [
            {
              id: 10,
              label: "财务明细统计"
            },
            {
              id: 11,
              label: "分项目进度统计"
            }
          ]
        },
         {
          id: 4,
          label: "资料管理",
          children: [
            {
              id: 12,
              label: "知识库管理"
            },
            {
              id: 13,
              label: "合同管理"
            }
           
          ]
        },
         {
          id: 5,
          label: "权限管理",
          children: [
            {
              id: 14,
              label: "参与单位"
            },
            {
              id: 15,
              label: "参与人员"
            },
              {
              id: 16,
              label: "参与角色"
            }
           
          ]
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
    showAuth() {
      this.isAuth = true;
    },
    authSave() {
      this.tips = "权限修改成功";
      this.isAuth = false;
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
  .del2 {
    background: #eb6c5c;
    color: #fff;

    border-radius: 10px;
  }
  .cancel {
    color: #fff;
    color: #999;
    border-radius: 10px;
  }
  .authority {
    background: #5a89f4;
    color: #fff;

    border-radius: 10px;
  }

  .el-dialog {
    border-radius: 15px;
  }
}
</style>
