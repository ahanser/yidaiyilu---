<template>
  <div class="container">
    <div class="content">
      <!-- <h2>
        <el-button
          type="primary"
          size="medium"
          @click="backHome()"
          style="margin-right:20px"
          round
        >返回</el-button>项目名称：一带一路
      </h2> -->
      <div>
        <div>
          <el-button class="add" @click="add()">新建分项目</el-button>
          <el-button class="batchDel" @click="batchDel()">批量删除</el-button>
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
          @selection-change="handleSelectionChange"
          border
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="50" align="center">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="number" label="任务编号" width="120" align="center"></el-table-column>
          <el-table-column prop="system" label="任务所属系统" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="content" label="建设内容" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="process" label="建设过程" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="taskstatus" label="任务状态" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="quantity" label="建设数量" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="allbudget" label="任务总预算(万元)" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" align="center" width="330">
            <template slot-scope="scope">
              <el-button class="update" size="small" @click="edit()">项目管理</el-button>
              <el-button class="del" size="small" @click="manger()">编辑</el-button>
              <el-button class="batchDel" size="small" @click="delConfirm()">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination background layout="prev, pager, next" :total="1"></el-pagination>
        </div>
      </div>
    </div>

    <!-- 任务详情弹出层 -->
    <el-dialog title="任务详情" :visible.sync="taskVisible" width="60%" @close="closeDialog">
      <el-form ref="form" label-width="120px">
        <el-form-item label="分项目系统" prop="list.item">
          <el-input value="陆基探测检测系统" disabled></el-input>
        </el-form-item>
        <el-form-item label="任务建设内容：" prop="contents.content">
          <el-input value="综合台" disabled></el-input>
        </el-form-item>
        <el-form-item label="任务建设数目：">
          <el-input value="26台"></el-input>
        </el-form-item>
        <el-form-item label="任务建设单位：">
          <el-select v-model="unit" style="width:100%" ref="editClose" placeholder="请输入单位">
            <el-option v-for="unit in units" :key="unit.key" :label="unit.label" :value="unit.key"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="projectInfo">
          <el-button
            size="small"
            style="float:right; margin-bottom:30px;"
            class="update"
            @click="addSubtasks()"
          >新建</el-button>
          <div class="updateShow">
          <el-button
            size="medium"
            style="float:right; margin-right:25px;margin-bottom:30px"
            class="update"
            @click="showTable"
            :icon="iconType"
          ></el-button>
        </div>
        </el-form-item>
        
        <!-- 下拉菜单 -->
        <div style="width: 100%" v-if="tableInfo">
          <el-table :data="tableData1" border style="width: 100%">
            <el-table-column prop="number" label="任务建设编号" align="center"></el-table-column>
            <el-table-column label="任务名称" width="200" prop="name" align="center">
              <template slot-scope="scope" style="border:none">
                <el-input v-model="scope.row.name" class="borderNone"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="备注名" width="100" prop="remark" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" class="borderNone"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="建设进度" prop="process" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.process" class="borderNone"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="转移至" align="center">
              <template slot-scope="scope">
                <el-select v-model="unit1" placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="unit1 in units1"
                    :key="unit1.key"
                    :label="unit1.label"
                    :value="unit1.key"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="转移" align="center">
              <template slot-scope="scope">
                <el-button @click="definite()" class="definite" size="small">确定转移</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div>
            <h5>操作日志:</h5>
            <el-input type="textarea" style="width:100%" v-model="input"></el-input>
          </div>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="taskVisible=false" class="add" size="small">保存</el-button>
        <el-button @click="taskVisible=false" class="cancel" size="small">取消</el-button>
      </div>
    </el-dialog>
    <!-- 详请子任务 -->
    <el-dialog :visible.sync="isaddsub" width="40%" @close="closeDialog" title="新建子任务">
      <el-form ref="form" label-width="120px">
        <el-form-item label="任务所属系统：" prop="list.item">
          <el-input value="陆基探测检测系统" disabled></el-input>
        </el-form-item>
        <el-form-item label="建设内容：" prop="list.item">
          <el-input value="台阵" disabled></el-input>
        </el-form-item>
        <el-form-item label="参与单位：" prop="list.item">
          <el-input value="北京" disabled></el-input>
        </el-form-item>
        <el-form-item label="任务建设编号：" prop="list.item">
          <el-input value="北京-GH305"></el-input>
        </el-form-item>
        <el-form-item label="备注名：" prop="list.item">
          <el-input value="BJ1"></el-input>
        </el-form-item>
        <el-form-item label="目前过程：" prop="list.item">
          <el-input value="征地"></el-input>
        </el-form-item>
        <el-form-item label="建设数目：" prop="list.item">
          <el-input value="5"></el-input>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isaddsub=false" class="add" size="small">保存</el-button>
        <el-button @click="isaddsub=false" class="cancel" size="small">取消</el-button>
      </div>
    </el-dialog>

    <!-- 新建分项目 -->
    <el-dialog
      title="新建分项目"
      :visible.sync="outerVisible"
      width="50%"
      @close="closeDialog"
      v-if="outerVisible"
    >
      <div class="double">
        <el-form ref="form" label-width="120px">
          <el-form-item label="项目所属系统：" prop="list.item">
            <el-select v-model="item" style="width:100%" ref="editClose2">
              <el-option v-for="item in list" :key="item.key" :label="item.label" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
       

          <el-form-item label="任务建设数目：">
            <el-input placeholder="请输入数目"></el-input>
          </el-form-item>
          <el-form-item label="任务建设单位：">
            <el-select v-model="unit" style="width:100%" ref="editClose" placeholder="请输入单位">
              <el-option
                v-for="unit in units"
                :key="unit.key"
                :label="unit.label"
                :value="unit.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目级别：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="项目状态：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="工期：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="时间范围：" class="timeSelect">
            <el-date-picker
              align="right"
              type="date"
              @change="smallEndTime"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              placeholder="选择开始日期"
              v-model="startTime"
            ></el-date-picker>
            <span style="margin: 0 20px">至</span>
            <el-date-picker
              align="right"
              type="date"
              @change="bigStartTime"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              placeholder="选择结束日期"
              v-model="endTime"
            ></el-date-picker>
          </el-form-item>

          <el-form-item class="projectInfo" label="项目简介:">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item class="projectInfo" label="分项目详情:">
            <el-button
              size="small"
              style="float:right; margin-bottom:30px;"
              class="update"
              @click="newSubtasks()"
            >新建子任务</el-button>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="handleChange"
              :file-list="fileList3"
            >
              <el-button size="small" class="update">模板导入</el-button>
            </el-upload>
          
          </el-form-item>
            <el-table
              :data="tableData3"
              style="width: 100%"
              :header-cell-style="{height:'30px',color:'#000000'}"
              border
            >
              <el-table-column prop="name" label="任务名称" align="center"></el-table-column>
              <el-table-column prop="stime" label="开始时间" align="center"></el-table-column>
              <el-table-column prop="etime" label="结束时间" align="center"></el-table-column>
              <el-table-column prop="worktime" label="工期" align="center"></el-table-column>
              <el-table-column prop="pop" label="相关负责人" align="center"></el-table-column>
              <el-table-column prop="type" label="项目类型" align="center"></el-table-column>
            </el-table>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSave()" class="add" size="small">保存</el-button>
        <el-button @click="outerVisible=false" class="cancel" size="small">取消</el-button>
      </div>
    </el-dialog>

    <!-- 编辑 -->

    <el-dialog title="编辑任务" :visible.sync="isEdit" width="55%" @close="closeDialog" v-if="isEdit">
      <!-- 内部操作 -->
      <div class="double">
        <el-form ref="form" label-width="120px">
          <el-form-item label="分项目系统：" prop="陆基勘测系统">
            <el-input disabled value="陆基勘测系统"></el-input>
          </el-form-item>
          <el-form-item label="任务建设内容：" prop="content">
            <el-select v-model="content" size="mini" style="width:100%" ref="editClose1">
              <el-option
                v-for="content in contents"
                :key="content.key"
                :label="content.label"
                :value="content.key"
                :v-model="content.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务建设数目：">
            <el-input value="5"></el-input>
          </el-form-item>
          <el-form-item label="任务建设单位：">
            <el-select
              v-model="unit2"
              placeholder="请选择"
              style="width:100%"
              clearable
              ref="editClose"
            >
              <el-option
                v-for="unit2 in units2"
                :key="unit2.key"
                :label="unit2.label"
                :value="unit2.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目级别：">
            <el-input value="一级"></el-input>
          </el-form-item>
          <el-form-item label="项目状态：">
            <el-input value="正在进行"></el-input>
          </el-form-item>
          <el-form-item label="工期：">
            <el-input value="60天"></el-input>
          </el-form-item>
          <el-form-item label="时间范围：" class="timeSelect">
            <el-date-picker
              align="right"
              type="date"
              @change="smallEndTime"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              placeholder="选择开始日期"
              v-model="startTime"
            ></el-date-picker>
            <span style="margin: 0 20px">至</span>
            <el-date-picker
              align="right"
              type="date"
              @change="bigStartTime"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              placeholder="选择结束日期"
              v-model="endTime"
            ></el-date-picker>
          </el-form-item>

          <el-form-item class="projectInfo" label="项目简介:">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item class="projectInfo" label="分项目详情:">
            <el-button
              size="small"
              style="float:right; margin-bottom:30px;"
              class="update"
              @click="newSubtasks()"
            >新建子任务</el-button>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="handleChange"
              :file-list="fileList3"
            >
              <el-button size="small" class="update">模板导入</el-button>
            </el-upload>
            <el-table
              :data="tableData4"
              style="width: 100%"
              :header-cell-style="{height:'30px',color:'#000000'}"
              border
            >
              <el-table-column prop="name" label="任务名称" align="center"></el-table-column>
              <el-table-column prop="stime" label="开始时间" align="center"></el-table-column>
              <el-table-column prop="etime" label="结束时间" align="center"></el-table-column>
              <el-table-column prop="worktime" label="工期" align="center"></el-table-column>
              <el-table-column prop="pop" label="相关负责人" align="center"></el-table-column>
              <el-table-column prop="type" label="项目类型" align="center"></el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editSave()" class="add" size="small">保存</el-button>
        <el-button @click="isEdit=false" class="cancel" size="small">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog width="30%" title="温馨提示" :visible.sync="innerVisible">
      <div class="info">
        <span style="color:#fc6c5d">
          <i class="el-icon-info"></i>
          {{tips}}
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="add" size="small" @click="innerVisible = false">确定</el-button>
        <el-button class="cancel" size="small" @click="innerVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 补充说明 -->
    <el-dialog title="补充说明" :visible.sync="isExplan" width="40%">
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

    <!-- 新建子任务弹出层 -->
    <el-dialog title="新增子任务" :visible.sync="isSubtask" width="45%" @close="closeDialog">
      <el-form ref="form" label-width="120px">
        <el-form-item label="建设过程：">
          <el-select v-model="build" size="mini" style="width:100%" ref="editClose5">
              <el-option
                v-for="build in builds"
                :key="build.key"
                :label="build.label"
                :value="build.key"
                :v-model="build.key"
              ></el-option>
            </el-select>
        </el-form-item>
          <el-form-item label="建设内容：" prop="contents.content">
            <el-select v-model="content" size="mini" style="width:100%" ref="editClose1">
              <el-option
                v-for="content in contents"
                :key="content.key"
                :label="content.label"
                :value="content.key"
                :v-model="content.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="子台阵：" v-if="content=='0'">
            <el-radio-group v-model="radio3" size="small">
              <el-radio-button label="地震台阵"></el-radio-button>
              <el-radio-button label="火山次声台"></el-radio-button>
            </el-radio-group>
          </el-form-item>
        <el-form-item label="工期：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="相关负责人：">
          <el-input></el-input>
        </el-form-item>

        <el-form-item label="时间范围：" class="timeSelect">
          <el-date-picker
            align="right"
            type="date"
            @change="smallEndTime"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            placeholder="选择开始日期"
            v-model="startTime"
          ></el-date-picker>
          <span style="margin: 0 20px">至</span>
          <el-date-picker
            align="right"
            type="date"
            @change="bigStartTime"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            placeholder="选择结束日期"
            v-model="endTime"
          ></el-date-picker>
        </el-form-item>

        <!-- <el-form-item label v-if="content=='0'">
          <el-radio-group v-model="radio2" size="small">
            <el-radio-button label="项目阶段"></el-radio-button>
            <el-radio-button label="项目任务"></el-radio-button>
          </el-radio-group>
          <div v-show="radio2=='项目任务'?true:false">
            <span>父节点名称：</span>
            <el-input></el-input>
          </div>
        </el-form-item> -->
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isSubtask = false">取 消</el-button>
        <el-button type="primary" @click="isSubtask = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import $ from "jquery";
import locale from "element-ui/lib/locale/lang/en";
export default {
  data() {
    return {
      input:
        "2019年1月16日进行了转移操作，转移至天津市地震局。法人单位领导王瑞萍操作",
      isSubtask: false, // 新建子任务状态
      tableData1: [],
      taskVisible: false, //任务详情默认
      tableInfo: false,
      isaddsub: false,
      radio: "1",
      Flag: true,
      checked: true,
      radio3: "地震台阵", //默认选中的单选
      radio2: "",
      isExplan: false, //  补充说明显示状态
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
      pickerOptions: {},
      startTime: "",
      endTime: "",
      iconType: "el-icon-arrow-down",
      tzShow: true, //台阵的显隐
      outerVisible: false,
      innerVisible: false,
      isEdit: false, // 修改弹出层
      tips: "",
      tableData3: [
        {
         name: "201901RW_1",
          stime: "2019-05-01 15:02:01",
          etime: "2019-07-01 15:02:01",
          pop: "李欣",
          type: "项目任务",
          worktime: "60天"
        },
        {
        name: "201901RW_1",
          stime: "2019-05-01 15:02:01",
          etime: "2019-07-01 15:02:01",
          pop: "李欣",
          type: "项目任务",
          worktime: "60天"
        }
      ],
      tableData4: [
        {
          name: "201901RW_1",
          stime: "2019-05-01 15:02:01",
          etime: "2019-07-01 15:02:01",
          pop: "李欣",
          type: "项目任务",
          worktime: "60天"
        },
        {
          name: "201901RW_2",
          stime: "2019-05-01 15:02:01",
          etime: "2019-07-01 15:02:01",
          pop: "李欣",
          type: "项目任务",
          worktime: "60天"
        }
      ],
      taskData: [
        {
          process: "勘选",
          budget: "1114",
          process2: "征（租）地",
          budget2: "4",
          process3: "前期工作咨询",
          budget3: "248"
        },
        {
          process: "节能影响评估",
          budget: "67",
          process2: "工程设计",
          budget2: "6277",
          process3: "土建",
          budget3: "22"
        },
        {
          process: "设备购置",
          budget: "11",
          process2: "仪器架设",
          budget2: "20",
          process3: "试运行",
          budget3: "1801"
        },
        {
          process: "验收",
          budget: "65"
        }
      ],
      tableData: [
        {
          date: "1",
          number: "201901RW_1",
          system: "陆基探测监测系统",
          content: "小孔径台阵 --地震台阵",
          process: "勘选",
          taskstatus: "进行中",
          quantity: "5",
          allbudget: "9629"
        }
      ],
      tableData1: [
        {
          number: "201901RW_1",
          name: "小孔径台阵 --地震台阵",
          remark: "海淀区",
          process: "勘选",
          statused: "editClose3"
        },
        {
          number: "201901RW_1",
          name: "小孔径台阵 --地震台阵",
          remark: "朝阳区",
          process: "征（租）地",
          statused: "editClose31"
        },
        {
          number: "201901RW_1",
          name: "小孔径台阵 --地震台阵",
          remark: "东城区",
          process: "前期工作咨询",
          statused: "editClose32"
        },
        {
          number: "201901RW_1",
          name: "小孔径台阵 --地震台阵",
          remark: "西城区",
          process: "节能影响评估",
          statused: "editClose33"
        },
        {
          number: "201901RW_1",
          name: "小孔径台阵 --地震台阵",
          remark: "丰台区",
          process: "工程设计",
          statused: "editClose34"
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
      item: "0",
      contents: [
        {
          key: "0",
          label: "小孔径台阵"
        },
        {
          key: "1",
          label: "综合台"
        },
        {
          key: "2",
          label: "科学台阵"
        },
        {
          key: "3",
          label: "重力台"
        },
        {
          key: "4",
          label: "地磁台"
        },
        {
          key: "5",
          label: "机动车组"
        }
      ],
      content: "0",
      units: [
        {
          key: "0",
          label: "北京市地震局"
        },
        {
          key: "1",
          label: "天津市地震局"
        },
        {
          key: "2",
          label: "河北省地震局"
        },
        {
          key: "3",
          label: "山西省地震局"
        },
        {
          key: "4",
          label: "内蒙古自治区地震局"
        },
        {
          key: "5",
          label: "中国地震局地质研究院"
        },
        {
          key: "6",
          label: "中国地震台网中心"
        },
        {
          key: "7",
          label: "中国地震局地球物理勘探中心"
        },
        {
          key: "8",
          label: "中国地震局第一监测中心"
        },
        {
          key: "9",
          label: "中国地震局第二监测中心"
        }
      ],
      unit: "请选择单位",
      units1: [
        {
          key: "0",
          label: "北京市地震局"
        },
        {
          key: "1",
          label: "天津市地震局"
        },
        {
          key: "2",
          label: "河北省地震局"
        },
        {
          key: "3",
          label: "山西省地震局"
        },
        {
          key: "4",
          label: "内蒙古自治区地震局"
        },
        {
          key: "5",
          label: "中国地震局地质研究院"
        },
        {
          key: "6",
          label: "中国地震台网中心"
        },
        {
          key: "7",
          label: "中国地震局地球物理勘探中心"
        },
        {
          key: "8",
          label: "中国地震局第一监测中心"
        },
        {
          key: "9",
          label: "中国地震局第二监测中心"
        }
      ],
      unit1: "0",
      units2: [
        {
          key: "0",
          label: "北京市地震局"
        },
        {
          key: "1",
          label: "天津市地震局"
        },
        {
          key: "2",
          label: "河北省地震局"
        },
        {
          key: "3",
          label: "山西省地震局"
        },
        {
          key: "4",
          label: "内蒙古自治区地震局"
        },
        {
          key: "5",
          label: "中国地震局地质研究院"
        },
        {
          key: "6",
          label: "中国地震台网中心"
        },
        {
          key: "7",
          label: "中国地震局地球物理勘探中心"
        },
        {
          key: "8",
          label: "中国地震局第一监测中心"
        },
        {
          key: "9",
          label: "中国地震局第二监测中心"
        }
      ],
      unit2: "0",
      builds:[{
        key:'0',
        label:'勘选'
      },
      {
        key:'1',
        label:'征（租）地'
      },
      {
        key:'2',
        label:'前期工作咨询'
      },
      {
        key:'3',
        label:'节能影响评估'
      },{
        key:'4',
        label:'工程设计'
      },{
        key:'5',
        label:'土建'
      }
      ],
      build:'0',
    };
  },

  created() {
    this.getTime();
  },
  methods: {
    addSubtasks() {
      this.isaddsub = true;
    },
    getTime() {
      let date = new Date();
      let y = date.getFullYear();
      let yy = date.getFullYear() - 1; //上一年的时间
      let m = date.getMonth() + 1;
      let d = date.getDate();
      let time = y + "-0" + m + "-" + d; //当前的时间
      let time1 = yy + "-0" + m + "-" + d; //上一年的时间
      this.endTime = time;
      this.startTime = time1;
    },
    showTable() {
      this.tableInfo = !this.tableInfo;
      if (this.iconType == "el-icon-arrow-down") {
        this.iconType = "el-icon-arrow-up";
        return;
      }
      if ((this.iconType = "el-icon-arrow-up")) {
        this.iconType = "el-icon-arrow-down";
      }
    },
    closeDialog() {
      this.$refs.editClose.blur();
      this.$refs.editClose1.blur();
      this.$refs.editClose2.blur();
      this.$refs.editClose5.blur();
      this.$refs["from"].resetFields();
    },
    backHome() {
      this.$router.push({ path: "/construction" });
    },
    // 新建子任务
    newSubtasks() {
      this.isSubtask = true;
    },
    //管理
    manger() {
      this.isEdit = true;
    },
    explan() {
      this.isExplan = true;
    },
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
    definite() {
      this.tips = "转移成功";
      this.isEdit = false;
      this.innerVisible = true;
    },
    edit() {
      //this.$router.push({ path: "/constructionDeatils" });
      this.taskVisible = true;
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
    }
    // closeOutside(){
    //   console.log('22222222222222222222222222222222222');
    //   // document.getElementsByClassName("el-select-dropdown")[2].hidden = true
    // }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.updateShow {
  overflow: hidden;
}

.borderNone {
  input {
    border: 0px;
    outline: none;
  }
}
.container {
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
    margin-bottom: 0px;
    padding: 10px 20px;
    border-radius: 10px;
  }
  .update {
    background: #29c7ca;
    color: #fff;
    //font-size: 15px;
    border-radius: 10px;
  }
  .del {
    background: #f5af50 !important;
    color: #fff;
    border-radius: 10px;
  }
  .cancel {
    color: #fff;
    color: #999;
    border-radius: 10px;
  }
  .batchDel {
    background: #eb6c5c !important;
    color: #fff;
    border-radius: 10px;
  }
  .el-dialog {
    border-radius: 15px;
  }
}
.container .table tr td {
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
#sex {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  border-radius: 10px;
  margin-left: 40px;
  outline: none;
  appearance: none;
  .focc {
    height: 20px;
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari 和 Chrome */
    appearance: none;
    outline: none;
    &:hover {
      color: #ffffff;
      background-color: #ffffff;
      outline: none;
      border: 0;
    }
  }
}
.double {
  .el-form {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    .el-form-item {
      width: 50%;
    }
    .timeSelect,
    .projectInfo {
      width: 100%;
    }
    /deep/.el-input__inner {
      line-height: 40px;
      height: 40px;
    }
  }
}
/deep/.el-input--mini .el-input__inner{
  line-height: 40px;
  height: 40px;
}
</style>
