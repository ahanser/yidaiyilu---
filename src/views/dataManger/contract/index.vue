<template>
  <div class="container">
    <div class="content">
      <div>
        <div>
          <el-button class="add" @click="add()">上传</el-button>
          <el-button class="batchDel" @click="batchDel()">批量删除</el-button>
           <el-select v-model="unit" style="width:100%" ref="editClose" class="searchKey" v-if="users=='常伟'?false:(users=='刘瑞'?false:true)">
            <el-option v-for="unit in units" :key="unit.key" :label="unit.label"
                       :value="unit.key"></el-option>
          </el-select>
           <el-select v-model="item" style="width:100%" ref="editClose1" class="searchKey">
            <el-option v-for="item in list" :key="item.key" :label="item.label"
                       :value="item.key"></el-option>
          </el-select>
           
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
          <el-table-column prop="unit" label="所属单位" width="120" align="center"></el-table-column>
          <el-table-column prop="system" label="建设系统" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="number" label="建设任务编号" align="center"></el-table-column>

          <el-table-column prop="name" label="合同名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="creater" label="创建人" align="center"></el-table-column>
          <el-table-column prop="createdate" label="创建时间" align="center"></el-table-column>
          <el-table-column label="操作" width="250" align="center">
            <template slot-scope="scope">
              <el-button class="update" size="small" @click="edit()">查看、下载</el-button>
               <!-- <el-button class="del" size="small" @click="downLoad()">下载</el-button> -->
              <el-button class="batchDel" size="small" @click="delConfirm()">删除</el-button>
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
    <el-dialog  :visible.sync="outerVisible" width="40%" @close='closeDialog'>
      <!-- 内部操作 -->
      <el-form ref="form" label-width="140px">
        <!-- <el-form-item label="类型：">
          <el-input></el-input>
        </el-form-item> -->
       
        <el-form-item label="任务建设单位：">
          
          <el-select v-model="unit" style="width:100%" ref="editClose">
            <el-option v-for="unit in units" :key="unit.key" :label="unit.label"
                       :value="unit.key"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="项目所属系统：">
          <el-select v-model="item" style="width:100%" ref="editClose1">
            <el-option v-for="item in list" :key="item.key" :label="item.label"
                       :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="建设任务编号：">
          
          <el-select v-model="build" style="width:100%" ref="editClose">
            <el-option v-for="build in builds" :key="build.key" :label="build.label"
                       :value="build.key"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="文件上传：">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList3"
          >
            <el-button size="small" type="primary">点击上传</el-button>
             <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
         <!-- <el-form-item label="建设任务编号：">
          <el-input placeholder="请输入编号"></el-input>
        </el-form-item> -->
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addSave()" class="add" size="small">保存</el-button>
        <el-button @click="outerVisible=false" class="cancel" size="small">取消</el-button>
      </div>
    </el-dialog>

    <!-- 修改 -->

    <el-dialog  :visible.sync="isEdit
    " width="40%">
 
      <h1 align="center">征地合同</h1>
      <h2 align="center">土地征用合同书</h2>
      <p>
        甲方:<hr width="70%"></br>
        证件号:<hr width="70%"></br>
        地址:<hr width="70%"></br>
        乙方:<hr width="70%"></br>
        证件号:<hr width="70%"></br>
        地址:<hr width="70%"></br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;经甲乙双方充分协商，乙方是（&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;）村村民，统一甲方公司一
        次性征用村集体土地，根据《农村土地承包法》、《合同法》及相关政策的规定，现就征用土地相关事项达成协议，特定立本合同，
        以资双方共同遵守执行。</br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一、本合同所指耕地、林地为乙方向（&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;）村委承包的土地，
        乙方系该区域承包证所登记的承包人，面积、位置地点以承包面积为准。</br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二、乙方必须配合甲方测量好所征土地的面积，若乙方有特殊原因不、
        能到场的可委托家庭其他成员或亲友代办（须书面的授权委托书）。若、有其他人对该地提出权力要求，甲方有权要求乙方赔偿所造成的
        损失,否则视为违约，按违约处理。土地详细信息为: </br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;四至界线:该地块位于（&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;）(附照片)，东至
        （&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;），西至（&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;）,南至
        （&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;），北至（&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;）


      </p>
      
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
//import docxURl from "../../../assets/404_images/qixiang.docx";
import docs from "@/assets/404_images/404.png";

export default {
  data() {
    return {
      fileList3: [], // 上传
      units:[{
        key:'0',
        label:'北京市地震局'
      },
      {
        key:'1',
        label:'天津市地震局'
      },
      {
        key:'2',
        label:'河北省地震局'
      },
      {
        key:'3',
        label:'山西省地震局'
      },{
        key:'4',
        label:'内蒙古自治区地震局'
      },{
        key:'5',
        label:'中国地震局地质研究院'
      },
      {
        key:'6',
        label:'中国地震台网中心'
      },
      {
        key:'7',
        label:'中国地震局地球物理勘探中心'
      },
      {
        key:'8',
        label:'中国地震局第一监测中心'
      },
      {
        key:'9',
        label:'中国地震局第二监测中心'
      }
      ],
      unit:'0',
       list:[{
         key:'0',
        label:'陆基探测监测系统'
      },{
         key:'1',
        label:'海域探测监测系统'
      },{
         key:'2',
        label:'数据传输系统'
      },{
         key:'3',
        label:'信息处理与服务系统'
      },{
         key:'4',
        label:'运行管理保障系统'
      }
      ],
      item:'0',
      builds:[{
            key:'0',
        label:'LJ-TZ-北京-1'
        },{
            key:'1',
        label:'LJ-TZ-北京-2'
        },{
            key:'2',
        label:'LJ-TZ-北京-3'
        },{
            key:'3',
        label:'LJ-TZ-北京-4'
        },{
            key:'4',
        label:'LJ-TZ-北京-5'
        }
      ],
      build:'0',
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
          unit: "北京市地震局",
          system: "陆基探测监测系统",
          number:"LJ-TZ-北京-1",
          name:"征地合同.doc",
          creater:"刘瑞",
          createdate:"2019-01-16 12:10:11"
        },
        {
          date: "2",
          unit: "北京市地震局",
          system: "陆基探测监测系统",
          number:"LJ-TZ-北京-1",
          name:"土建合同.doc",
          creater:"刘瑞",
          createdate:"2019-01-17 11:10:12"
        },
        {
          date: "3",
          unit: "北京市地震局",
          system: "陆基探测监测系统",
          number:"LJ-TZ-北京-1",
          name:"堪地合同.doc",
          creater:"刘瑞",
          createdate:"2019-01-18 12:10:11"
        },
        {
          date: "4",
          unit: "北京市地震局",
          system: "陆基探测监测系统",
          number:"LJ-TZ-北京-1",
          name:"验收合同.doc",
          creater:"刘瑞",
          createdate:"2019-01-16 12:10:11"
        }
      ]
    };
  },
   computed: {
     users() {
      let user = JSON.parse(window.sessionStorage.getItem('userInfor')).username
      return user
    },
 
  },
  methods: {
    closeDialog(){
     this.$refs.editClose.blur()
     this.$refs.editClose1.blur()
     this.$refs.editClose2.blur()
     this.$refs['from'].resetFields();
     
   },
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
      this.isEdit = true;
    },
    delConfirm() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
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
    .searchKey{
      width: 15%!important;
      margin-left: 30px;
    }
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




