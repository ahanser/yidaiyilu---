<template>
  <div class="container">
    <div class="content">
      <!-- <h2>建设任务</h2> -->
      <div>
        <div>
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            size="mini"
            style="width:200px;float:right;margin-bottom:30px"
          ></el-input>
        </div>

        <tree-table 
        :data="data"
         border 
        node-key="id" 
        expandAll>
          <!-- :eval-args="args" :expand-all="expandAll"  -->
          <el-table-column label="编号" prop="date" width="150" align="center" >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.tagInfo === '1' ? 'primary' : (scope.row.tagInfo === '2'?'success':(scope.row.tagInfo==='3'?'warning':'success'))"
                close-transition
              >{{scope.row.date}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.event }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="stime" label="开始时间" align="center"></el-table-column>
          <el-table-column prop="etime" label="结束时间" align="center"></el-table-column>
          <el-table-column prop="worktime" label="工期(天)" align="center"></el-table-column>
          <el-table-column prop="progress" label="进度(%)" align="center"></el-table-column>
          <el-table-column prop="pop" label="负责人" align="center"></el-table-column>
          <el-table-column label="操作" width="300" align="center">
            <template slot-scope="scope">
              <el-button
              @click="addNode(scope.index, scope.row)"
                size="small"
                round
                class="update"
                v-show="scope.row.tagInfo==2?true:false"
              >修改</el-button>
            </template>
          </el-table-column>
        </tree-table>
        <div class="pagination">
          <el-pagination background layout="prev, pager, next" :total="10"></el-pagination>
        </div>
      </div>
    </div>

 
    <!-- 新增弹出 -->
    <el-dialog title="修改项目任务" :visible.sync="isAdd" width="40%" @close="closeDialog">
      <!-- 内部操作 -->
      <el-form ref="form" label-width="120px">
        <el-form-item label="任务名称：">
          <el-input v-model="str1" disabled></el-input>
        </el-form-item>
         <el-form-item label="工期(天):">
          <el-input value="60"></el-input>
        </el-form-item>
        <el-form-item label="负责人:">
          <el-input value="李欣"></el-input>
        </el-form-item>
        <el-form-item label="进度:">
           <el-select v-model="content" size="mini" style="width:100%" ref="editClose1">
            <el-option v-for="content in contents" :key="content.key" :label="content.label"
                       :value="content.key" :v-model="content.key"
                        ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务说明:">
         <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editSave()" class="add" size="small">保存</el-button>
        <el-button @click="isAdd=false" class="cancel" size="small">取消</el-button>
      </div>
    </el-dialog>
  

  
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import treeTable from "@/components/TreeTable";

export default {
  name: "CustomTreeTableDemo",
  components: { treeTable },
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      isAdd: false,
      isEdit: false, // 修改弹出层
    contents:[
        {
            key:'0',
            label:'0'
        },
        {
            key:'1',
            label:'10%'
        },
        {
            key:'2',
            label:'20%'
        },
        {
            key:'3',
            label:'30%'
        },
        {
            key:'4',
            label:'40%'
        },
        {
            key:'5',
            label:'50%'
        },
        {
            key:'6',
            label:'60%'
        },
        {
            key:'7',
            label:'70%'
        },
        {
            key:'8',
            label:'80%'
        },
         {
            key:'9',
            label:'90%'
        },
        {
            key:'10',
            label:'100%'
        },
        
    ],
    content:'1',
      data: [
        {
          id: 1,
          date: 1,
          event: "一带一路地震监测台网项目",
          tagInfo: "1",
          statused: true,
          stime: "2019-05-01 15:02:01",
          etime: "2019-07-01 15:02:01",
          worktime: "60",
          progress: "40",
          pop: "李欣",
          children: [
            {
              id: 6,
              date: "1-1",
              event: "201901RW_1",
              tagInfo: "2",
              statused: true,
              stime: "2019-05-01 15:02:01",
              etime: "2019-07-01 15:02:01",
              worktime: "60",
              progress: "40",
              pop: "李欣"
            },
            {
              id: 7,
              date: "1-2",
              event: "201901RW_2",
              tagInfo: "2",
              statused: true,
              stime: "2019-05-01 15:02:01",
              etime: "2019-07-01 15:02:01",
              worktime: "60",
              progress: "40",
              pop: "李欣"
            },
            {
              id: 8,
              date: "1-3",
              event: "201901RW_3",
              tagInfo: "2",
              statused: true,
              stime: "2019-05-01 15:02:01",
              etime: "2019-07-01 15:02:01",
              worktime: "60",
              progress: "40",
              pop: "李欣"
            }
          ]
        }
      ]
    };
  },
  methods: {
    closeDialog(){

     this.$refs.editClose1.blur()
    
     
   },
    add() {
      this.outerVisible = true;
    },
    addNode(index, row) {
      this.isAdd = true;
      this.str1 = "";
      this.str1 = row.event;
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
    edit(index, row) {
      (this.isEdit = true), console.log(index);
      console.log(row);
      console.log("-----------------------------");
      this.str1 = "";
      this.str1 = row.event;
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
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    }
  }
};
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
  /deep/.el-input--mini .el-input__inner{
      line-height: 40px;
      height: 40px;
    }
  .update {
    background: #29c7ca;
    color: #fff;
    border-radius: 10px;
  }
  .el-dialog {
    border-radius: 15px;
  }
}
</style>
