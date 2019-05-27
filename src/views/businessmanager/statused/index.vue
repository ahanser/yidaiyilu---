<template>
  <div class="container">
    <!-- 详情 -->
    <el-dialog title="文件详情" :visible.sync="outerVisible" width="50%" @close='closeselect'>
    <el-table :data="tableData1" border style="width: 100%">
                    <el-table-column prop="date" label="序号" width="80" align="center"></el-table-column>
                    <el-table-column prop="name" label="文件名称"  align="center"></el-table-column>
                    <el-table-column prop="size" label="文件大小"  align="center"></el-table-column>
                     <el-table-column label="操作" width="250" align="center" ref="options">
                        <template slot-scope="scope">
                          <el-button class="update" size="small" @click="down(scope.$index, scope.row)"> {{ scope.row.down}} </el-button>
                        </template>
                      </el-table-column>
    </el-table>
   

      
  </el-dialog>
    <div class="content">
      <el-table :data="tableData2" border style="width: 100%;margin-top:50px" :header-cell-style="{background:'rgb(236,245,255)',color:'#000000'}">
                    <el-table-column prop="date" label="序号" width="80" align="center"></el-table-column>
                    <el-table-column prop="number" label="建设任务编号"  align="center"></el-table-column>
                    <el-table-column prop="nametask" label="任务名称"  align="center"></el-table-column>
                    <el-table-column prop="remark" label="任务备注名" align="center"></el-table-column>
                    <el-table-column prop="expected" label="预算(万元)" align="center"></el-table-column>
                    <el-table-column prop="cost" label="花费(万元)" align="center"></el-table-column>
                    <el-table-column prop="modify" label="进度状态" align="center"></el-table-column>
                    <el-table-column prop="person" label="提交人" align="center"></el-table-column>
                    <el-table-column prop="time" label="提交时间" align="center"></el-table-column>
                    <el-table-column label="操作" width="250" align="center" ref="options">
                        <template slot-scope="scope">
                          <span>{{ scope.row.str}}</span>
                          <el-button class="update" size="small" @click="add(scope.$index, scope.row)" v-show="scope.row.statused"> {{ scope.row.agree}} </el-button>
                          <el-button class="batchDel" size="small" @click="delConfirm(scope.$index, scope.row)" v-if="scope.row.statused"> {{ scope.row.cancel}} </el-button>
                          <el-button class="edit" size="small" @click="moreInfo(scope.$index, scope.row)" v-if="scope.row.statused"> {{ scope.row.edit}} </el-button>
                        </template>
                      </el-table-column>
                   
                    <!-- :disabled="scope.row.agreeDisable"  -->
        </el-table>
  
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import $ from 'jquery';
import pdf from "@/assets/Git.pdf";
export default {
  data() {
  
    return {
      outerVisible:false,
      tableData1:[
        {
          date: "1",
          name:'征地合同1.doc',
          size:'50kb',
          down:'查看,下载'
        },
         {
          date: "2",
          name:'征地合同2.doc',
          size:'50kb',
          down:'查看,下载'
        },
         {
          date: "3",
          name:'征地合同3.doc',
          size:'50kb',
          down:'查看,下载'
        },
         {
          date: "4",
          name:'征地合同4.doc',
          size:'50kb',
          down:'查看,下载'
        },
         {
          date: "5",
          name:'征地合同5.doc',
          size:'50kb',
          down:'查看,下载'
        }
      ],
          tableData2: [
        {
          date: "1",
          nametask:'小孔径台阵--地震台阵',
          number: "LJ-TZ-北京-1",
          remark: "海淀区",
          isRead:"未通过",
          expected:'2000',
          cost:'1500',
          modify:'勘选→征（租）地',
          person:"刘瑞",
          time:"2019-05-10 20:05:10",
          agree:'同意',
          agreeDisable:false,
          cancel:"驳回",
          statused:true,
          str:"",
          edit:"详情"
  
        },
         {
           date: "2",
          number: "LJ-TZ-北京-2",
           nametask:'小孔径台阵--地震台阵',
          remark: "朝阳区",
          isRead:"未审批",
          expected:'2000',
          cost:'1500',
          modify:'征（租）地→前期工作咨询',
          person:"刘瑞",
          time:"2019-05-10  20:05:10",
          str:'',
          agree:'同意',
          agreeDisable:false,
          cancel:"驳回",
          statused:true,
           edit:"详情"
        },
         {
          date: "3",
          number: "LJ-TZ-北京-3",
           nametask:'小孔径台阵--地震台阵',
          remark: "东城区",
          isRead:"已审批",
          expected:'2000',
          cost:'1500',
          modify:'前期工作咨询→节能影响评估',
          person:"刘瑞",
          time:"2019-05-10  20:05:10",
          str:'',
          agree:'同意',
          agreeDisable:false,
          cancel:"驳回",
          statused:true,
          str:"",
           edit:"详情"
  
               
        },
         {
           date: "4",
          number: "LJ-TZ-北京-4",
           nametask:'小孔径台阵--地震台阵',
          remark: "西城区",
          isRead:"已审批",
          expected:'2000',
          cost:'1500',
          modify:'节能影响评估→工程设计',
          person:"刘瑞",
          time:"2019-05-10  20:05:10",
          str:'',
          agree:'同意',
          agreeDisable:false,
          cancel:"驳回",
          statused:true,  
           edit:"详情" 
        },
         {
          date: "5",
          number: "LJ-TZ-北京-5",
           nametask:'小孔径台阵--地震台阵',
          remark: "丰台区",
          isRead:"已审批",
          expected:'2000',
          cost:'1500',
          modify:'工程设计→土建',
          person:"刘瑞",
          time:"2019-05-10  20:05:10",
          str:'',
          agree:'同意',
          agreeDisable:false,
          cancel:"驳回",
          statused:true,
           edit:"详情"
        }
      ]
    }
 },
 methods:{
   down(){
      window.open(pdf)
   },
   moreInfo(){
     this.outerVisible=true;
   },
     add(index, row){
        this.$confirm('确认通过吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '已审批',
          })
        let data=this.tableData2
        for(var i=0;i<data.length;i++){
            if(index==i){
              data[i].str ='已通过';
              data[i].statused =false
            }
        }
          //this.$refs.options.setAttribute("prop","isRead") 
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      
     },
      delConfirm(index, row) {
        this.$prompt('请输入你驳回的理由', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S{6,}/,
          inputErrorMessage: '请输入内容切不少于6个字'
        }).then(({ value }) =>{
          this.$message({
            type: 'success',
            message: '驳回成功'
          });
            let data=this.tableData2
          for(var i=0;i<data.length;i++){
            if(index==i){
              data[i].str ='未通过';
              data[i].statused =false
            }
        }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      }
 }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.edit{
      border-radius: 10px;
      background-color: #1E90FF;
      color: #fff;
      &:hover{
        background-color:#1E90FF;
        color: #fff;
      }
    }
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
  .definite {
    background: #29c7ca;
    color: #fff;
    margin-bottom:0px;
    padding: 10px 20px;
    border-radius: 10px;
  }
  .update {
    background: #29c7ca;
    color: #fff;

    border-radius: 10px;
  }
  .del {
    background: #f5af50!important;
    color: #fff;
    border-radius: 10px;
  }
  .cancel {
    color: #fff;
    color: #999;
    border-radius: 10px;
  }
  .batchDel {
    background: #eb6c5c!important;
    color: #fff;
    border-radius: 10px;
  }
  .el-dialog {
    border-radius: 15px;
  }
 
}


</style>
