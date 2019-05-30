<template>
  <div class="container">
    <div class="content">
      <!-- <h2>建设任务</h2> -->

      <div class="title">
        <span>重要程度：</span>
        <el-select
          v-model="content"
          size="mini"
          style="width:20%;height:40px;line-height:40px"
          ref="editClose1"
        >
          <el-option
            v-for="content in contents"
            :key="content.key"
            :label="content.label"
            :value="content.key"
            :v-model="content.key"
          ></el-option>
        </el-select>
        <span>项目名称：</span>
        <el-input style="width:20%;height:40px"></el-input>
        <span>建设单位：</span>
        <el-select v-model="unit" style="width:20%" ref="editClose" placeholder="请输入单位">
          <el-option v-for="unit in units" :key="unit.key" :label="unit.label" :value="unit.key"></el-option>
        </el-select>
      </div>
      <el-table :data="tableData" border style="width: 100%;">
        <el-table-column prop="number" label="序号" width="180" align="center"></el-table-column>
        <el-table-column prop="system" label="项目名称" width="250" align="center"></el-table-column>
        <el-table-column prop="important" label="重要程度" align="center"></el-table-column>
        <el-table-column prop="alldays" label="总工期(天)" align="center"></el-table-column>
        <el-table-column prop="prveday" label="已执行天数(天)" align="center"></el-table-column>
        <el-table-column prop="nextday" label="未执行天数(天)" align="center"></el-table-column>
        <el-table-column prop="overday" label="超期多少天" align="center"></el-table-column>
        <el-table-column prop="haschange" label="已完成（%）" align="center"></el-table-column>
        <el-table-column prop="dontchange" label="未完成（%）" align="center"></el-table-column>
        <el-table-column prop="build" label="建设单位" align="center"></el-table-column>
        <el-table-column prop="status" label="项目状态" align="center"></el-table-column>
        <el-table-column prop="allbudget" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="info" size="small" @click="edit()" round>查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      contents: [
        {
          key: "0",
          label: "一级"
        },
        {
          key: "1",
          label: "二级"
        },
        {
          key: "2",
          label: "三级"
        }
      ],
      content: "0",
      tableData: [
        {
          number: "1",
          system: "一带一路地震监测台网项目",
          important: "一级",
          alldays: "90",
          prveday: "54",
          nextday: "36",
          overday: "0",
          haschange: "30",
          dontchang: "70",
          build: "北京市地震局",
          status: "正在进行",
          dontchange: "0"
        }
      ],
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
      unit: "0"
    };
  },
  methods: {
    edit() {
      this.$router.push({ path: "/overview" });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  padding: 25px 35px;
  .content {
    // f8f9fa
    .title {
      margin: 0 auto 30px;
      width: 70%;
      span {
        display: inline-block;
        margin-left: 3%;
      }
    }
    /deep/.el-input--mini .el-input__inner {
      line-height: 40px;
      height: 40px;
    }
  }
}
</style>
