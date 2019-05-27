<template>
  <div class="container">
    <div class="content">
      <!-- <h2>知识库管理</h2> -->
      <div>
        <div>
         
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
          <el-table-column type="selection" width="45" align="center"></el-table-column>
          <el-table-column label="序号" width="70" align="center">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="120" align="center"></el-table-column>
          <el-table-column prop="name" label="文件名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="creater" label="创建人" align="center"></el-table-column>

          <el-table-column prop="createdate" label="创建时间" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="250" align="center">
            <template slot-scope="scope">
              <el-button class="update" size="small" @click="edit()">查看、下载</el-button>
              <!-- <el-button class="del" size="small" @click="downLoad()"></el-button> -->
              <!-- <el-button class="batchDel" size="small" @click="delConfirm()">删除</el-button> -->
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
    <el-dialog  :visible.sync="outerVisible" width="40%">
      <!-- 内部操作 -->
      <el-form ref="form" label-width="140px">
        <el-form-item label="类型：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="文件上传：">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList3"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addSave()" class="add" size="small">保存</el-button>
        <el-button @click="outerVisible=false" class="cancel" size="small">取消</el-button>
      </div>
    </el-dialog>

    <!-- 修改 -->

      <!-- <el-dialog  :visible.sync="isEdit
      " width="40%">
        <h2 align="center">用户手册</h2>
        <h2 align="left">总经理致词:</h2>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;航天宏图2008年成立以来，在航天部门的有关领导的大力支持和关怀下，经过公司全体员工的共同努力，形成了以卫星遥感
          为核心技术、服务于行业应用的经营模式，同时也积极拓展应急管理、数字城市等业务领域。公司组建了一支来自北京大学、中国科学院等著名科研院校的从事软件研发和遥感应用的专业团队。</br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;公司自主研发了遥感图像处理软件、宏图应急管理平台、宏图SOA服务流程引擎等系列产品，并参与了民政部、气象局、环保部、水利部、
          国家测绘局、国家海洋局等部委的卫星工程地面应用系统的建设，制定了服务于卫星遥感应用的，集咨询、规划设计、继承、软件开发于一体的长期发展攻略。同时，公司作为最早从事卫星领域领域
          标准建设公司之一，是环境卫星工程系列标准规范主要编制单位和宣贯单位。公司也积极参与国家科技支撑计划，提升自身的科研能力。</br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;航天宏图正站在新的发展起点上，朝着成为一流的卫星遥感应用服务商的目标奋力前进。面对持续发展、迅速增长的海内外卫星遥感应用
          服务市场，我们将始终秉承“自觉、自律、自强、自动”的行为准则，以“同心、同德、同力、同行”的价值理念，切实为客户提供优质高效的专业服务，为员工建立和谐创新的成长环境，为股东创造
          持续长远的投资回报。我们将持续创新，不断专研卫星遥感领域的高新技术，不断提升软件质量管理水平，不断拓展卫星遥感的应用行业，全面提高企业的核心竞争力，为国产卫星遥感产业化应用
          做出贡献！

        </p>
      
      </el-dialog> -->

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
//import docxURl from "../../../assets/404_images/qixiang.docx";
import pdf from "@/assets/Git.pdf";

export default {
  data() {
    return {
      fileList3: [], // 上传
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
          date:"1",
          type: "政策法规",
          name: "“一带一路”建设的政策促进与法律完善研究.doc",
          creater: "李欣",
          createdate:"2019-01-16 15:57:03"
        },
        {
          date:"2",
          type: "技术参考",
          name: "中国地震局第二监测中心重大科技成果.doc",
          creater: "李欣",
          createdate:"2019-01-17 14:05:03"
        },
        {
          date:"3",
          type: "通知",
          name: "二测中心2019年度公开招聘工作人员调剂岗位面试公告.doc",
          creater: "李欣",
          createdate:"2019-01-18 16:02:11"
        }
      ]
    };
  },
  methods: {
    add() {
      this.outerVisible = true;
    },
    addSave() {
      this.tips = "上传成功";
      this.outerVisible = false;
      this.innerVisible = true;
    },
    editSave() {
      this.tips = "修改成功";
      this.isEdit = false;
      this.innerVisible = true;
    },
    edit() {
       window.open(pdf)
      // this.isEdit = true;
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
    },
    // 下载
    downLoad() {
      var link = document.createElement("a");
      link.setAttribute("download", "");
      link.href = docs;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
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




