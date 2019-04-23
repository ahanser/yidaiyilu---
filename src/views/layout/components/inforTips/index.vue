<template>
    <div>

           <div v-if="isshow" style="position:fixed ;  width:50%;height:800px; background:#ffff;z-index:3000;  top: 50%;
              left: 50%;
              transform: translate(-50%, -50%); box-shadow: 1px 1px 5px #888888; padding:20px; border-radius:10px;">
              
                <i class="el-icon-circle-close-outline" style="float:right; cursor:pointer;position:absolute;right:4px;top:4px;"  @click="close()"></i>


                <!-- 内容 -->
              <div class="content">
               <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#1E90FF',color:'#000000'}">
                    <el-table-column prop="date" label="序号" width="80" align="center"></el-table-column>
                    <el-table-column prop="unit" label="建设单位"  align="center"></el-table-column>
                    <el-table-column prop="system" label="建设系统" align="center"></el-table-column>
                    <el-table-column prop="content" label="建设内容" align="center"></el-table-column>
                    <el-table-column prop="name" label="任务名称" align="center"></el-table-column>
                    <el-table-column prop="process" label="建设过程" align="center"></el-table-column>
                    <el-table-column prop="budget" label="总预算（万元）" width="80" align="center"></el-table-column>
                    <el-table-column prop="cost" label="已花费（万元）" width="80" align="center"></el-table-column>
                    <el-table-column prop="isRead" label="是否已读" align="center"></el-table-column>
        </el-table>

         <el-table :data="tableData2" border style="width: 100%;margin-top:50px" :header-cell-style="{background:'#1E90FF',color:'#000000'}">
                    <el-table-column prop="date" label="序号" width="80" align="center"></el-table-column>
                    <el-table-column prop="number" label="建设任务编号"  align="center"></el-table-column>
                    <el-table-column prop="remark" label="任务备注名" align="center"></el-table-column>
                    <el-table-column prop="isRead" label="是否审批" align="center"></el-table-column>
        </el-table>
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
          system: "路基探测监测系统",
          content:"台阵",
          name:"海淀台",
          process:"堪选",
          budget:"220",
          cost:"230",
          isRead:"未读"
        },
         {
          date: "2",
          unit: "河北省地震局",
          system: "海域探测监测系统",
          content:"海域固定",
          name:"唐山台",
          process:"征地",
          budget:"150",
          cost:"200",
          isRead:"未读"
        },
         {
          date: "3",
          unit: "山西省地震局",
          system: "路基探测监测系统",
          content:"综合台",
          name:"太原台",
          process:"土建",
          budget:"320",
          cost:"500",
          isRead:"已读"
        },
         {
          date: "4",
          unit: "北京市地震局",
          system: "路基探测监测系统",
          content:"科学台阵",
          name:"朝阳台",
          process:"设备购置",
          budget:"98",
          cost:"100",
          isRead:"已读"
        }
      ],
       tableData2: [
        {
          date: "1",
          number: "LJ-TZ-北京-1",
          remark: "海淀台",
          isRead:"未审批"
        },
         {
           date: "2",
          number: "LJ-TZ-北京-2",
          remark: "昌平台",
          isRead:"未审批"
        },
         {
          date: "3",
          number: "LJ-TZ-北京-3",
          remark: "朝阳台",
          isRead:"已审批"
        },
         {
           date: "4",
          number: "LJ-TZ-北京-4",
          remark: "房山台",
          isRead:"已审批"
        },
         {
           date: "5",
          number: "LJ-TZ-北京-5",
          remark: "通州台",
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
       }
   }
};
</script>
  
