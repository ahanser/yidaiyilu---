<template>
  <div class="container">
    <div class="content">
      <div class="title">
        <span>项目名称：</span>
        <el-input style="width:20%;height:40px"></el-input>
        <span>预算(万元)：</span>
        <el-input style="width:20%;height:40px"></el-input>
        <el-button class="search" type="primary" size="medium">查询</el-button>
      </div>

      <tree-table :data="data" border  expandAll>
        <!-- :eval-args="args" :expand-all="expandAll"  -->
        <el-table-column label="序号" prop="date" width="150" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tagInfo === '1' ? 'primary' : (scope.row.tagInfo === '2'?'success':(scope.row.tagInfo==='3'?'warning':'success'))"
              close-transition
            >{{scope.row.date}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.event }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="prve" label="预算(万元)" align="center"></el-table-column>
        <el-table-column prop="cost" label="实际使用(万元)" align="center"></el-table-column>
        <el-table-column prop="surplus" label="剩余资金(万元)" align="center"></el-table-column>
        <el-table-column prop="balance" label="结余率(%)" align="center"></el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="capital()"
              size="small"
              round
              v-show="scope.row.tagInfo==2?true:false"
            >资金分配</el-button>
            <el-button type="warning" @click="info()" v-show="scope.row.tagInfo==2?true:false"  size="small" round>详情</el-button>
          </template>
        </el-table-column>
      </tree-table>
    </div>

    <!-- 资金分配 -->
    <el-dialog title="修改项目任务" :visible.sync="isCapital" width="45%" @close="closeDialog">
      <!-- 内部操作 -->
      <el-form ref="form" label-width="150px">
        <el-form-item label="项目所属系统:">
          <el-select v-model="item" ref="editClose2" style="width:100%">
            <el-option
              v-for="item in list"
              :key="item.key"
              :label="item.label"
              :value="item.key"
              style="width:100%"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务编号:">
          <el-select v-model="content" size="mini" ref="editClose1" style="width:100%">
            <el-option
              v-for="content in contents"
              :key="content.key"
              :label="content.label"
              :value="content.key"
              :v-model="content.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="总预算剩余（万元):">
          <el-input></el-input>
        </el-form-item>

        <div style="height:200px;overflow-y:scroll">
          <el-form size="mini" label-width="120px">
            <el-form-item label="任务过程：">
              <el-checkbox v-model="checked">勘选</el-checkbox>
              <el-input style="width:100px;margin-right:30px;" value="1114"></el-input>万元
              <el-button
                icon="el-icon-edit"
                type="text"
                style="margin-left:30px"
                @click="explan()"
              >补充说明</el-button>
            </el-form-item>
            <el-form-item>
              <el-checkbox>征（租）地</el-checkbox>
              <el-input style="width:100px;margin-right:30px;" value="4"></el-input>万元
              <el-button
                icon="el-icon-edit"
                type="text"
                style="margin-left:30px"
                @click="explan()"
              >补充说明</el-button>
            </el-form-item>
            <el-form-item>
              <el-checkbox>前期工作咨询</el-checkbox>
              <el-input style="width:100px;margin-right:30px;" value="248"></el-input>万元
              <el-button
                icon="el-icon-edit"
                type="text"
                style="margin-left:30px"
                @click="explan()"
              >补充说明</el-button>
            </el-form-item>

            <el-form-item>
              <el-checkbox>节能影响评估</el-checkbox>
              <el-input style="width:100px;margin-right:30px;" value="67"></el-input>万元
              <el-button
                icon="el-icon-edit"
                type="text"
                style="margin-left:30px"
                @click="explan()"
              >补充说明</el-button>
            </el-form-item>
            <el-form-item>
              <el-checkbox>工程设计</el-checkbox>
              <el-input style="width:100px;margin-right:30px;" value="6277"></el-input>万元
              <el-button
                icon="el-icon-edit"
                type="text"
                style="margin-left:30px"
                @click="explan()"
              >补充说明</el-button>
            </el-form-item>
            <el-form-item>
              <el-checkbox>土建</el-checkbox>
              <el-input style="width:100px;margin-right:30px;" value="22"></el-input>万元
              <el-button
                icon="el-icon-edit"
                type="text"
                style="margin-left:30px"
                @click="explan()"
              >补充说明</el-button>
            </el-form-item>
            <el-form-item>
              <el-checkbox>设备购置</el-checkbox>
              <el-input style="width:100px;margin-right:30px;" value="11"></el-input>万元
              <el-button
                icon="el-icon-edit"
                type="text"
                style="margin-left:30px"
                @click="explan()"
              >补充说明</el-button>
            </el-form-item>
            <el-form-item>
              <el-checkbox>仪器架设</el-checkbox>
              <el-input style="width:100px;margin-right:30px;" value="20"></el-input>万元
              <el-button
                icon="el-icon-edit"
                type="text"
                style="margin-left:30px"
                @click="explan()"
              >补充说明</el-button>
            </el-form-item>
            <el-form-item>
              <el-checkbox>试运行</el-checkbox>
              <el-input style="width:100px;margin-right:30px;" value="1801"></el-input>万元
              <el-button
                icon="el-icon-edit"
                type="text"
                style="margin-left:30px"
                @click="explan()"
              >补充说明</el-button>
            </el-form-item>
            <el-form-item>
              <el-checkbox>验收</el-checkbox>
              <el-input style="width:100px;margin-right:30px;" value="65"></el-input>万元
              <el-button
                icon="el-icon-edit"
                type="text"
                style="margin-left:30px"
                @click="explan()"
              >补充说明</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 补充说明 -->
        <el-dialog title="补充说明" :visible.sync="isExplan" width="40%"  :append-to-body='true'>
          <table class="table" cellspacing="0" style="border-radius:10px;">
            <tbody>
              <tr>
                <td>
                  <span>说明</span>
                </td>
                <td>
                  <input type="text">
                </td>
              </tr>
              <tr>
                <td>
                  <span>目标</span>
                </td>
                <td>
                  <input type="text">
                </td>
              </tr>
              <tr>
                <td>
                  <span>前提条件</span>
                </td>
                <td>
                  <input type="text">
                </td>
              </tr>

              <tr>
                <td>
                  <span>制约影响</span>
                </td>
                <td>
                  <input type="text">
                </td>
              </tr>
              <tr>
                <td>
                  <span>参与方</span>
                </td>
                <td>
                  <textarea rows="3" cols="20"></textarea>
                </td>
              </tr>
              <tr>
                <td>
                  <span>子任务</span>
                </td>
                <td>
                  <input type="text">
                </td>
              </tr>
              <tr>
                <td>
                  <span>阶段划分</span>
                </td>
                <td>
                  <input type="text">
                </td>
              </tr>
              <tr>
                <td>
                  <span>过程</span>
                </td>
                <td>
                  <input type="text">
                </td>
              </tr>
              <tr>
                <td>
                  <span>交付</span>
                </td>
                <td>
                  <input type="text">
                </td>
              </tr>
            </tbody>
          </table>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="add" size="small" @click="isExplan=false">保存</el-button>
            <el-button class="cancel" size="small" @click="isExplan=false">取消</el-button>
          </span>
        </el-dialog>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isCapital=false" class="add" size="small">保存</el-button>
        <el-button @click="isCapital=false" class="cancel" size="small">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import treeTable from "@/components/TreeTable";
import { debug } from "util";

export default {
  name: "CustomTreeTableDemo",
  components: { treeTable },
  data() {
    return {
      isCapital: false,
      isExplan: false,
      isEdit: false, // 修改弹出层
      contents: [
        {
          key: "0",
          label: "201901RW_1"
        },
        {
          key: "1",
          label: "201901RW_2"
        },
        {
          key: "2",
          label: "201901RW_3"
        },
        {
          key: "3",
          label: "201901RW_4"
        }
      ],
      content: "1",
      data: [
        {
          id: 1,
          date: 1,
          event: "一带一路地震监测台网项目",
          tagInfo: "1",
          prve: "330000",
          cost: "110000",
          surplus: "220000",
          balance: "",
          children: [
            {
              id: 6,
              date: "1-1",
              event: "201901RW_1",
              prve: "12725.16",
              cost: "9900",
              surplus: "2826.16",
              balance: "22.21",
              tagInfo: "2"
            },
            {
              id: 7,
              date: "1-2",
              event: "201901RW_2",
              tagInfo: "2",
              prve: "547.36",
              cost: "324",
              surplus: "223.36",
              balance: "40.81"
            },
            {
              id: 8,
              date: "1-3",
              event: "201901RW_3",
              tagInfo: "2",
              statused: true,
              prve: "3235.77",
              cost: "0",
              surplus: "3235.77",
              balance: "100"
            },
            {
              id: 8,
              date: "1-3",
              event: "201901RW_3",
              tagInfo: "2",
              statused: true,
              prve: "0",
              cost: "0",
              surplus: "0",
              balance: "0"
            }
          ]
        }
      ],
      list: [
        {
          key: "0",
          label: "陆基探测监测系统"
        },
        {
          key: "1",
          label: "海域探测监测系统"
        },
        {
          key: "2",
          label: "数据传输系统"
        },
        {
          key: "3",
          label: "信息处理与服务系统"
        },
        {
          key: "4",
          label: "运行管理保障系统"
        }
      ],
      item: "0"
    };
  },
  methods: {
    closeDialog() {
      this.$refs.editClose1.blur();
      this.$refs.editClose2.blur();
    },
    capital() {
      this.isCapital = true;
    },
    explan() {
      this.isExplan = true;
    },
    info(){
         this.$router.push({ path: "/constructionDeatils" });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  padding: 25px 35px;
  .content {
    .title {
      margin: 0 auto 30px;
      width: 70%;
      span {
        display: inline-block;
        margin-left: 30px;
      }
    }
    .search {
      margin-left: 100px;
      display: inline-block;
      text-align: center;
      span {
        margin: 0;
      }
    }
  }
}
.v-modal {
  display: none;
  background: transparent !important;
}
.table tr td {
  border: 1px solid #ccc !important;
  display: table-cell;
  vertical-align: inherit;
  padding: 0;
  input {
    height: 40px;
    line-height: 40px;
    width: 100%;
    outline: none;
  }
}
.table {
  width: 100%;
  border-radius: 20px;
  margin-top: 1px;
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
</style>
