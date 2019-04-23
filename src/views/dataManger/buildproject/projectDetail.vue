<template>
  <div class="container">
    <div class="content">
      <h2>
        <i class="el-icon-back" style="cursor:pointer" @click="backHome()"></i> 项目名称：一带一路
      </h2>
      <div>
        <el-table :data="tableData" border style="width: 80%">
          <el-table-column prop="number" label="任务编号" width="100" align="center"></el-table-column>
          <el-table-column prop="system" label="任务所属系统" width="180" align="center"></el-table-column>
          <el-table-column prop="content" label="建设内容" align="center"></el-table-column>
          <el-table-column prop="process" label="任务过程" align="center"></el-table-column>
          <el-table-column prop="taskstatus" label="任务状态" align="center"></el-table-column>
          <el-table-column prop="quantity" label="建设数量" align="center"></el-table-column>
          <el-table-column prop="allbudget" label="任务总预算（万元）" align="center"></el-table-column>
        </el-table>
      </div>

      <div>
        <h2>任务建设详情</h2>

        <el-table :data="tableData2" border style="width: 80%">
          <el-table-column prop="process" label="任务过程" width="180" align="center"></el-table-column>
          <el-table-column prop="budget" label="预算金额（万元）" width="180" align="center"></el-table-column>
          <el-table-column prop="process2" label="任务过程" align="center"></el-table-column>
          <el-table-column prop="budget2" label="预算金额（万元）" align="center"></el-table-column>
          <el-table-column prop="process3" label="任务过程" align="center"></el-table-column>
          <el-table-column prop="budget3" label="预算金额（万元）" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      tableData: [
        {
          number: "201901RW_1",
          system: "路基探测监测系统",
          content:"综合台",
          process:"征地",
          taskstatus:"进行中",
          quantity:"26",
          allbudget:"12725.16"
        }
      ],
       tableData2: [
        {
          process:"堪选",
          budget:"1114",
          process2:"征地",
          budget2:"4",
          process3:"土建",
          budget3:"22"
        },
         {
          process:"改造",
          budget:"43",
          process2:"试运行",
          budget2:"1801",
          process3:"工程设计费",
          budget3:"6277"
        },
         {
          process:"前期工程咨询费",
          budget:"248",
          process2:"工程监理费",
          budget2:"356",
          process3:"节能影响评估费",
          budget3:"67"
        },
         {
          process:"管理费",
          budget:"4",
          process2:"安全测评",
          budget2:"30",
          process3:"建设工程费",
          budget3:"7630"
        },
         {
          process:"培训费",
          budget:"1208",
          process2:"基本预备费",
          budget2:"8380",
          process3:"建设其他费",
          budget3:"403"
        },
        {
          process:"验收",
          budget:"65",
          process2:"设备购置",
          budget2:"11",
          process3:"仪器架设",
          budget3:"20"
        }
      ]
    };
  },
  methods: {
    backHome() {
      this.$router.push({ path: "/manger" });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" >
.container {
  .table {
    width: 100%;
    border-radius: 20px;

    span {
      display: block;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 13px;
    }
    tr {
      td:first-of-type {
        background: #f2f4f7;
      }
      td {
        border: 0.1px solid #ccc;
        input {
          height: 40px;
          line-height: 40px;
          width: 100%;
          border: none;
          outline: none;
        }
        textarea {
          height: 80px;
          line-height: 40px;
          width: 100%;
          border: none;
          outline: none;
          resize: none;
        }
      }
    }
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
