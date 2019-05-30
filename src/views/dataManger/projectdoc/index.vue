<template>
  <div class="container">
    <div class="content">
      <el-table
        :data="tableData1"
        border
        style="width: 100%"
        :header-cell-style="{background:'rgb(244,248,249)',color:'#000000'}"
      >
        <el-table-column prop="number" label="序号" align="center" width="100"></el-table-column>
        <el-table-column prop="name" label="项目名称" align="center"></el-table-column>
        <el-table-column prop="pop" label="负责人" align="center" width="200"></el-table-column>
        <el-table-column prop="build" label="建设单位" align="center"></el-table-column>
        <el-table-column prop="name" label="任务名称" align="center">
          <template slot-scope="scope">
            <el-button size="medium" round type="primary" @click="showdoc()" style="margin-right:20px">文档详情</el-button>
            <el-button size="small" round @click="upload()">上传</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新增 -->
    <el-dialog title="文档详情" :visible.sync="isdoc" width="50%" @close="closeDialog">
      <!-- 内部操作 -->
      <el-table
        :data="tableData2"
        border
        style="width: 100%"
        :header-cell-style="{background:'rgb(244,248,249)',color:'#000000'}"
      >
        <el-table-column prop="number" label="序号" align="center" width="100"></el-table-column>
        <el-table-column prop="doc" label="文档名称" align="center"></el-table-column>
        <el-table-column prop="time" label="上传时间" align="center"></el-table-column>
        <el-table-column prop="pop" label="上传人" align="center"></el-table-column>
        <el-table-column prop="name" label="任务名称" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editdoc()" round>编辑</el-button>
            <el-button type="danger" size="small"   @click="delDoc()" round>删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="saveDoc()" class="add" size="small">保存</el-button>
        <el-button @click="isdoc=false;" class="cancel" size="small">取消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="文件修改" :visible.sync="isedit" width="40%" @close="closeDialog">
      <!-- 内部操作 -->
      <el-form ref="form" label-width="100px">
        <el-form-item label="所属任务:">
          <el-select v-model="item" size="mini" style="width:100%" ref="person" disabled>
            <el-option
              v-for="item in tasks"
              :key="item.key"
              :label="item.label"
              :value="item.key"
              :v-model="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件名称:" show-overflow-tooltip>
          <el-input value="防震减灾法.doc" ></el-input>
        </el-form-item>

        <el-form-item label="文件上传">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList3"
          >
            <el-button size="small" round class="uploadButton">选择文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="isedit=false" class="add" size="small">保存</el-button>
        <el-button @click="isedit=false" class="cancel" size="small">取消</el-button>
      </div>
    </el-dialog>
    <!-- 上传 -->
    <el-dialog title="文件上传" :visible.sync="isupload" width="40%" @close="closeDialog">
      <el-form ref="form" label-width="100px">
        <el-form-item label="所属任务:">
          <el-select v-model="item" size="mini" style="width:100%" ref="person">
            <el-option
              v-for="item in tasks"
              :key="item.key"
              :label="item.label"
              :value="item.key"
              :v-model="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="文件名称:">
            <el-input></el-input>
          </el-form-item>
           <el-form-item label="文件上传:">
               <el-upload
              border
              class="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="handleChange"
              :file-list="fileList3"
            >
              <el-button size="small" round style="width:100%">上传</el-button>
            </el-upload>
          </el-form-item>
      </el-form>
       <div slot="footer" class="dialog-footer">
        <el-button @click="isupload=false" class="add" size="small">保存</el-button>
        <el-button @click="isupload=false" class="cancel" size="small">取消</el-button>
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
      fileList3: [],
      isdoc: false,
      isedit: false,
      isupload:false,
      tasks: [
        {
          key: "0",
          label: "201901RW_2"
        },
        {
          key: "1",
          label: "201901RW_1"
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
      item: "1",
      tableData1: [
        {
          number: 1,
          name: "一带一路地震监测台网项目",
          pop: "李欣",
          build: "北京市地震局"
        }
      ],
      tableData2: [
        {
          number: "1",
          doc: "防震减灾法.doc",
          time: "2019-05-12 15:02:01",
          pop: "常伟",
          name: "201901RW_2"
        },
        {
          number: "2",
          doc: "十三五地震科技专项规划.pdf",
          time: "2019-06-01 15:02:01",
          pop: "王安",
          name: "201901RW_1"
        },
        {
          number: "3",
          doc: "中国地震局地震应急预案.doc",
          time: "2019-05-12 15:02:01",
          pop: "李欣",
          name: "201901RW_1"
        },
        {
          number: "4",
          doc: "地震监测管理条例.pdf",
          time: "2019-06-20 15:02:01",
          pop: "常伟",
          name: "201901RW_3"
        }
      ]
    };
  },
  methods: {
    showdoc() {
      this.isdoc = true;
    },
    editdoc() {
      this.isedit = true;
    },
    upload(){
      this.isupload=true;
    },
    saveDoc() {
    
        this.$confirm('是否需要保存？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
            this.isdoc=false;
        })
    },
    delDoc(){
       
         this.$confirm('是否确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    closeDialog(){
      this.$refs.person.blur();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  padding: 25px 35px;
  .content {
    .upload{
      display: inline-block;
      width: 100%;
     
     .el-button {
        width: 100%;
      }
    }
  }
  /deep/.el-upload{
        //  width: 30%;
      }
  // 按钮样式覆盖

  .el-dialog {
    border-radius: 15px;
  }
}
</style>
