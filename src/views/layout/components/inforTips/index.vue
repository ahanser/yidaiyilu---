<template>
    <div class="show">

           <div v-if="isshow" style="position:fixed ;  width:60%;height:500px; background:#ffff;z-index:3000;  top: 50%;
              left: 50%;
              transform: translate(-50%, -50%); box-shadow: 1px 1px 5px #888888; padding:20px; border-radius:10px;">
              
                <i class="el-icon-circle-close-outline" style="float:right; cursor:pointer;position:absolute;right:4px;top:4px;"  @click="close()"></i>


                <!-- 内容 -->
              <div class="content">
                <!-- <h3 style="margin-top:10px">消息</h3>
         <el-table :data="tableData2" border style="width: 100%" :header-cell-style="{background:'rgb(244,248,249)',color:'#000000'}">
                    <el-table-column prop="date" label="序号" width="80" align="center"></el-table-column>
                    <el-table-column prop="number" label="建设任务编号"  align="center"></el-table-column>
                    <el-table-column prop="remark" label="任务备注名" align="center"></el-table-column>
                    <el-table-column prop="isRead" label="是否审批" align="center">
                      <template slot-scope="scope">
                        <div :class="scope.row.isRead=='未审批'? 'one' :''"> {{ scope.row.isRead}}</div>
                      </template>
                    </el-table-column>
        </el-table> -->
                <h3>审批流程</h3>
               <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'rgb(244,248,249)',color:'#000000'}">
                    <el-table-column prop="date" label="序号" width="50" align="center"></el-table-column>
                    <el-table-column prop="unit" label="建设单位" width="150" align="center"></el-table-column>
                    <el-table-column prop="system" label="建设系统" align="center"></el-table-column>
                    <el-table-column prop="content" label="建设内容" width="200"  align="center"></el-table-column>
                    <el-table-column prop="name" label="任务名称" align="center"></el-table-column>
                    <el-table-column prop="process" label="建设过程" align="center" width="210"></el-table-column>
                    <!-- <el-table-column prop="budget" label="总预算（万元）" width="120" align="center"></el-table-column>
                    <el-table-column prop="cost" label="已花费（万元）" width="120" align="center"></el-table-column> -->
                    <!-- <el-table-column prop="isRead" label="是否已读" align="center" >
                      <template slot-scope="scope">
                        <div :class="scope.row.isRead=='未读'?'one' :''"> {{ scope.row.isRead}}</div>
                      </template>
                    </el-table-column> -->
        </el-table>
          <el-button type="info" plain class="moreInfo" @click="moreInfo()">更多信息</el-button>
        
                 </div> 
              </div>
    </div>
</template>
  <script>
export default {
    data(){
     return{
        tableData: [
        {
          date: "1",
          unit: "北京市地震局",
          system: "陆基探测监测系统",
          content:"小孔径台阵--地震台阵",
          name:"海淀区",
          process:"勘选→征（租）地",
          budget:"220",
          cost:"230",
          isRead:"未读"
        },
         {
          date: "2",
          unit: "北京市地震局",
          system: "海域探测监测系统",
          content:"小孔径台阵--地震台阵",
          name:"朝阳区",
          process:"征（租）地→前期工作咨询",
          budget:"150",
          cost:"200",
          isRead:"未读"
        },
         {
          date: "3",
          unit: "北京市地震局",
          system: "陆基探测监测系统",
          content:"小孔径台阵--地震台阵",
          name:"东城区",
          process:"前期工作咨询→节能影响评估",
          budget:"320",
          cost:"500",
          isRead:"已读"
        },
         {
          date: "4",
          unit: "北京市地震局",
          system: "陆基探测监测系统",
          content:"小孔径台阵--地震台阵",
          name:"西城区",
          process:"节能影响评估→工程设计",
          budget:"98",
          cost:"100",
          isRead:"已读"
        }
      ],
       tableData2: [
        {
          date: "1",
          number: "LJ-TZ-北京-1",
          remark: "海淀区",
          isRead:"未审批"
        },
         {
           date: "2",
          number: "LJ-TZ-北京-2",
          remark: "朝阳区",
          isRead:"未审批"
        },
         {
          date: "3",
          number: "LJ-TZ-北京-3",
          remark: "东城区",
          isRead:"已审批"
        },
         {
           date: "4",
          number: "LJ-TZ-北京-4",
          remark: "西城区",
          isRead:"已审批"
        },
         {
           date: "5",
          number: "LJ-TZ-北京-5",
          remark: "丰台区",
          isRead:"已审批"
        }
      ]
     };
    },
   computed:{
       isshow(){
           return this.$store.state.app.tips
       }
   },
   methods:{
       close(){
          this.$store.state.app.tips  =false 
       },
       moreInfo(){
            this.$router.push({ path: "/statused"});
              this.$store.state.app.tips  =false;
       }
       
   }
};
</script>

<style rel="stylesheet/scss" lang="scss" >
.show{
  .one{
    color: rgb(91, 193, 253);
    cursor: pointer;
  }
  .table2{
    margin-top: 30px;
  }
  .moreInfo{
      position: absolute;
      top: 380px;
      right: 25px;
      z-index: 9999999999;
  }
  h3{
    margin: 30px 0;
  }
}
  
</style>

  
