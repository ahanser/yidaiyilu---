<template>
  <div class="container">
    <div class="content">
      <!-- <h2>建设项目</h2> -->
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
          <el-table-column prop="date" label="编号" width="70" align="center"></el-table-column>
          <el-table-column prop="projectname" label="项目名称" width="300" align="center"></el-table-column>
          <el-table-column prop="budget" label="预算(万元)" width="260" align="center"></el-table-column>
          <el-table-column prop="remark" label="备注" align="center"></el-table-column>
          <el-table-column label="操作" width="260" align="center">
            <template slot-scope="scope">
              <el-button class="update" size="small" @click="edit()">项目管理</el-button>
              <el-button class="del" size="small" @click="delConfirm()">删除</el-button>
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
    <el-dialog title="新建项目" :visible.sync="outerVisible" width="30%">
      <!-- 内部操作 -->
      <el-form ref="form" label-width="140px">
        <el-form-item label="项目名称：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="预算金额（万元）：">
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

    <el-dialog title="新建过程" :visible.sync="isEdit
    " width="40%">
      <!-- 内部操作 -->
      <el-form ref="form" label-width="80px">
        <el-form-item label="名称：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input></el-input>
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
      outerVisible: false,
      innerVisible: false,
      isEdit: false, // 修改弹出层
      tips: "",
      tableData: [
        {
          date: "1",
          projectname: "一带一路地震监测台网项目",
          budget: "10000",
          remark: ""
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
      this.$router.push({ path: "/manger" });
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
    background: #eb6c5c;
    color: #fff;

    border-radius: 10px;
  }
  .cancel {
    color: #fff;
    color: #999;
    border-radius: 10px;
  }

  .el-dialog {
    border-radius: 15px;
  }
}
</style>
