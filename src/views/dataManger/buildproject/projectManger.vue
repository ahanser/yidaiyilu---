<template>
  <div class="container">
    <div class="content">
      <h2>
        <i class="el-icon-back" style="cursor:pointer" @click="backHome()"></i> 项目名称：一带一路
      </h2>
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
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column label="序号" width="70" align="center">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="number" label="任务编号" width="120" align="center"></el-table-column>
          <el-table-column prop="system" label="任务所属系统" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="content" label="建设内容" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="process" label="建设过程" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="taskstatus" label="任务状态" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="quantity" label="建设数量" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="allbudget" label="任务总预算(万元)" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" align="center" width="230">
            <template slot-scope="scope">
              <el-button class="update" size="small" @click="edit()">详情</el-button>
              <el-button class="del" size="small" @click="manger()">管理</el-button>
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
    <el-dialog title="新建分项目" :visible.sync="outerVisible" width="50%">
      <!-- 内部操作 -->
      <el-form ref="form" label-width="120px">
        <el-form-item label="项目所属系统：">
          <el-select v-model="item" style="width:100%">
            <el-option v-for="item in list" :key="item.key" :label="item.label"
                       :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务建设内容：">
          <el-select v-model="content" size="mini" style="width:100%">
            <el-option v-for="content in contents" :key="content.key" :label="content.label"
                       :value="content.key"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label>
          <el-checkbox>3×3台阵</el-checkbox>
          <el-input style="width:80px;"></el-input>个
        </el-form-item>
        <el-form-item label>
          <el-checkbox>5×5台阵</el-checkbox>
          <el-input style="width:80px;"></el-input>个
        </el-form-item>
        <el-form-item label="任务建设数目：">
          <el-input value="5"></el-input>
        </el-form-item>
        <el-form-item label="任务建设单位：">
          <el-select v-model="unit" style="width:100%">
            <el-option v-for="unit in units" :key="unit.key" :label="unit.label"
                       :value="unit.key"></el-option>
          </el-select>
        </el-form-item>
      
      </el-form>
      <div style="height:150px;overflow-y:scroll">
        <el-form size="mini" label-width="120px">
          <el-form-item label="任务过程：">
            <el-checkbox>堪选</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
            <el-button
              icon="el-icon-edit"
              type="text"
              style="margin-left:30px"
              @click="explan()"
            >补充说明</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox>土建</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
            <el-button
              icon="el-icon-edit"
              type="text"
              style="margin-left:30px"
              @click="explan()"
            >补充说明</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox>试运行</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
            <el-button
              icon="el-icon-edit"
              type="text"
              style="margin-left:30px"
              @click="explan()"
            >补充说明</el-button>
          </el-form-item>

          <el-form-item>
            <el-checkbox>前期工作咨询费</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
            <el-button
              icon="el-icon-edit"
              type="text"
              style="margin-left:30px"
              @click="explan()"
            >补充说明</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox>节能影响评估费</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
            <el-button
              icon="el-icon-edit"
              type="text"
              style="margin-left:30px"
              @click="explan()"
            >补充说明</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox>安全测评</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
            <el-button
              icon="el-icon-edit"
              type="text"
              style="margin-left:30px"
              @click="explan()"
            >补充说明</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox>培训费</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
            <el-button
              icon="el-icon-edit"
              type="text"
              style="margin-left:30px"
              @click="explan()"
            >补充说明</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox>建设其他费</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
            <el-button
              icon="el-icon-edit"
              type="text"
              style="margin-left:30px"
              @click="explan()"
            >补充说明</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox>设备购置费(必选)</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
            <el-button
              icon="el-icon-edit"
              type="text"
              style="margin-left:30px"
              @click="explan()"
            >补充说明</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox>征地</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
            <el-button
              icon="el-icon-edit"
              type="text"
              style="margin-left:30px"
              @click="explan()"
            >补充说明</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox>改造</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
            <el-button
              icon="el-icon-edit"
              type="text"
              style="margin-left:30px"
              @click="explan()"
            >补充说明</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox>工程设计费</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
            <el-button
              icon="el-icon-edit"
              type="text"
              style="margin-left:30px"
              @click="explan()"
            >补充说明</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox>工程监理费</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
            <el-button
              icon="el-icon-edit"
              type="text"
              style="margin-left:30px"
              @click="explan()"
            >补充说明</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox>管理费</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
            <el-button
              icon="el-icon-edit"
              type="text"
              style="margin-left:30px"
              @click="explan()"
            >补充说明</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox>建设工程费</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
            <el-button
              icon="el-icon-edit"
              type="text"
              style="margin-left:30px"
              @click="explan()"
            >补充说明</el-button>
          </el-form-item>

          <el-form-item>
            <el-checkbox>基本预备费</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
            <el-button
              icon="el-icon-edit"
              type="text"
              style="margin-left:30px"
              @click="explan()"
            >补充说明</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox>验收(必选)</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
            <el-button icon="el-icon-edit" type="text" style="margin-left:30px">补充说明</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox>仪器架设(必选)</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
            <el-button icon="el-icon-edit" type="text" style="margin-left:30px">补充说明</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSave()" class="add" size="small">保存</el-button>
        <el-button @click="outerVisible=false" class="cancel" size="small">取消</el-button>
      </div>
    </el-dialog>

    <!-- 修改 -->

    <el-dialog title="修改任务" :visible.sync="isEdit
    " width="40%">
      <!-- 内部操作 -->
      <el-form ref="form" label-width="120px">
        <el-form-item label="分项目系统：">
          <el-input disabled placeholder="路基勘测系统"></el-input>
        </el-form-item>
        <el-form-item label="任务建设内容：">
          <span>综合台</span>
        </el-form-item>
        <el-form-item label="任务建设数目：">
          <span>26台</span>
        </el-form-item>
        <el-form-item label="任务建设单位：">
          <el-select v-model="unit" placeholder="请选择" style="width:100%">
            <el-option v-for="unit in units" :key="unit.key" :label="unit.label"
                       :value="unit.key"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div>
        <el-button
          size="small"
          style="float:right; margin-bottom:30px;"
          class="update"
          @click="newSubtasks()"
        >新建子任务</el-button>
        <el-table :data="tableData1" border style="width: 100%">
          <el-table-column prop="number" label="任务建设编号"></el-table-column>
          <el-table-column prop="name" label="任务名称"></el-table-column>
          <el-table-column prop="remark" label="备注名"></el-table-column>
          <el-table-column prop="process" label="建设进度"></el-table-column>
          <el-table-column prop="transform" label="转移至">
            <template scope="scope">
              <el-select v-model="unit" placeholder="请选择" style="width:100%">
             <el-option v-for="unit in units" :key="unit.key" :label="unit.label"
                       :value="unit.key"></el-option>
          </el-select>
            </template>
          </el-table-column>
          <el-table-column label="转移">
            <template scope="scope">
             <el-button @click="definite()" class="definite" size="small">确定转移</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div>
        <h5>操作日志:</h5>
        <el-input type="textarea" style="width:100%" v-model="input">
        </el-input>
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
          {{ tips}}
        </span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="add" size="small" @click="innerVisible = false">确定</el-button>
        <el-button class="cancel" size="small" @click="innerVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 补充说明 -->
    <el-dialog title="补充说明" :visible.sync="isExplan" width="40%" :before-close="handleClose">
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
    <el-dialog title="新增子任务" :visible.sync="isSubtask" width="30%" :before-close="handleClose">
      <el-form ref="form" label-width="120px">
        <el-form-item label="任务所属系统：">
          <el-select style="width:100%" placeholder="请选择">
            <el-option>路基探测系统</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="建设内容：">
          <el-select size="mini" style="width:100%" placeholder="请选择">
            <el-option>台阵</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务建设数目：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="任务建设单位：">
          <el-select style="width:100%" placeholder="请选择">
            <el-option>国际地震局</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注名:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="目前过程:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="建设数目:">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div style="height:150px;overflow-y:scroll">
        <el-form size="mini" label-width="120px">
          <el-form-item label="任务过程：">
            <el-checkbox>堪选</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
          </el-form-item>
          <el-form-item>
            <el-checkbox>土建</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
          </el-form-item>
          <el-form-item>
            <el-checkbox>试运行</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
          </el-form-item>

          <el-form-item>
            <el-checkbox>前期工作咨询费</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
          </el-form-item>
          <el-form-item>
            <el-checkbox>节能影响评估费</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
          </el-form-item>
          <el-form-item>
            <el-checkbox>安全测评</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
          </el-form-item>
          <el-form-item>
            <el-checkbox>培训费</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
          </el-form-item>
          <el-form-item>
            <el-checkbox>建设其他费</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
          </el-form-item>
          <el-form-item>
            <el-checkbox>设备购置费(必选)</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
          </el-form-item>
          <el-form-item>
            <el-checkbox>征地</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
          </el-form-item>
          <el-form-item>
            <el-checkbox>改造</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
          </el-form-item>
          <el-form-item>
            <el-checkbox>工程设计费</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
          </el-form-item>
          <el-form-item>
            <el-checkbox>工程监理费</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
          </el-form-item>
          <el-form-item>
            <el-checkbox>管理费</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
          </el-form-item>
          <el-form-item>
            <el-checkbox>建设工程费</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
          </el-form-item>

          <el-form-item>
            <el-checkbox>基本预备费</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
          </el-form-item>
          <el-form-item>
            <el-checkbox>验收(必选)</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
          </el-form-item>
          <el-form-item>
            <el-checkbox>仪器架设(必选)</el-checkbox>
            <el-input style="width:100px;margin-right:30px;" placeholder="预算金额"></el-input>万元
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      input:'2019年1月16日201901RW_1进行了转移操作，转移至天津市地震局。法人单位领导王瑞萍操作',
      isSubtask: false, // 新建子任务状态
      tableData1: [],
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
      outerVisible: false,
      innerVisible: false,
      isEdit: false, // 修改弹出层
      tips: "",
      tableData: [
        {
          date: "1",
          number:"201901RW_1",
          system: "路基探测监测系统",
          content: "综合台",
          process:"征地",
          taskstatus:"进行中",
          quantity:"26",
          allbudget:"12725.16"
        },
        {
          date: "2",
          number:"201901RW_2",
          system: "路基探测监测系统",
          content: "重力",
          process:"堪选",
          taskstatus:"进行中",
          quantity:"1",
          allbudget:"534.76"
        },
        {
          date: "3",
          number:"201901RW_3",
          system: "海域探测监测系统",
          content: "海域固定",
          process:"土建",
          taskstatus:"进行中",
          quantity:"20",
          allbudget:"3235.77"
        },{
          date: "4",
          number:"201901RW_4",
          system: "海域探测监测系统",
          content: "深井台",
          process:"设备购置",
          taskstatus:"进行中",
          quantity:"1",
          allbudget:"3478.52"
        }
      ],
      tableData1:[{
          number:"201901RW_1",
          name:"综合台",
          remark:"海淀台",
          process:"堪选、土建"
      },
      {
          number:"201901RW_1",
          name:"综合台",
          remark:"朝阳台",
          process:"征地、土建"
      },
      {
          number:"201901RW_1",
          name:"综合台",
          remark:"昌平台",
          process:"前期工作咨询、工程设计"
      },
      {
          number:"201901RW_1",
          name:"综合台",
          remark:"顺义台",
          process:"节能影响评估"
      },
      {
          number:"201901RW_1",
          name:"综合台",
          remark:"大兴台",
          process:"仪器架构"
      }
      ],
       list:[{
         key:'0',
        label:'路基探测监测系统'
      }
      ],
      item:'0',
      contents:[{
        key:'0',
        label:'台阵'
      },
      {
        key:'1',
        label:'综合台'
      },
      {
        key:'2',
        label:'科学台阵'
      },
      {
        key:'3',
        label:'地磁'
      },{
        key:'4',
        label:'重力'
      },{
        key:'5',
        label:'陆域机动探测'
      }
      ],
      content:'0',
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
      unit:'0'
    };
  },
  methods: {
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
    definite(){
      this.tips = "转移成功";
      this.isEdit = false;
      this.innerVisible = true;
    },
    edit() {
      this.$router.push({ path: "/constructionDeatils" });
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
