<template>
  <div class="container">
    <div class="content">
      <!-- <h2>建设任务</h2> -->

      <h2>
        <el-button
          type="primary"
          size="medium"
          @click="backHome()"
          style="margin-right:20px"
          round
        >返回</el-button>
      </h2>
      <h3>项目详情:</h3>
      <el-table :data="tableData" border style="width: 100%;">
        <el-table-column prop="system" label="项目名称" align="center"></el-table-column>
        <el-table-column prop="important" label="项目级别" align="center"></el-table-column>
        <el-table-column prop="alldays" label="子任务数" align="center"></el-table-column>
        <el-table-column prop="prveday" label="开始时间" align="center"></el-table-column>
        <el-table-column prop="nextday" label="结束时间" align="center"></el-table-column>
        <el-table-column prop="build" label="建设单位" align="center"></el-table-column>
        <el-table-column prop="status" label="项目状态" align="center"></el-table-column>
      </el-table>
      <h3>进度详情:</h3>
      <div class="progress">
        <el-row>
          <el-col :span="2">
            <span>时间进度：</span>
          </el-col>
          <el-col :span="14">
            <el-progress :text-inside="true" :stroke-width="30" :percentage="60"></el-progress>
          </el-col>
          <el-col :span="8" style="line-height:30px;padding-left:20px">
            <span style="margin:20px 0">总工期：90天 已执行：54天 剩余天数：36天 超期天数：0天</span>
          </el-col>
        </el-row>
      </div>

      <el-row>
        <el-col :span="2">
          <span>项目进度：</span>
        </el-col>
        <el-col :span="14">
          <el-progress :text-inside="true" :stroke-width="30" :percentage="30" status="success"></el-progress>
        </el-col>
        <el-col :span="8" style="line-height:30px;padding-left:20px">
          <span style="margin:20px 0">已完成：30% 未完成：70%</span>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" style="width:100%;padding:20px">
        <el-tab-pane label="项目介绍" name="first">
          <div class="paragraph">
            <h2>一带一路地震监测平台</h2>
            <p>地震监测是指在地震发生前后，对地震前兆异常和地震活动的监视、测量。目前地震监测主要有几种划分方法，一种是专业和群众之分，指专业的地震台阵和一些群测点，前者主要用监测仪器，如水位仪、地震仪、地磁波测量仪等，用来测量地震微观前兆信息；后者则主要靠浅水井、水温、动植物活动异常等手段，来观察地震前的宏观异常现象。</p>
            <p>4月19日，在“壮丽70年-奋斗新时代”媒体记者赴北京国家地球观象台主题采访活动中，中国地震局地球物理研究所副所长李丽研究员与记者分享了中国围绕“一带一路”开展地震监测和环境地震台网援助情况。</p>
            <p>李丽介绍，“一带一路”沿线国家正好处在欧亚地震带上，也饱受地震的威胁，在这样的背景下，我们伟沿线国家提供地震台网援助，一方面满足他们的需求，另一方面也为“一带一路”重大基础设施和重大工程的实施从地震安全方面提供重要保障。</p>
            <p>她告诉红星新闻，由于“一带一路”沿线国家经济发展水平参差不齐，并不是每个沿线国家都有足够的地震科研和监测的能力，但是由于处在地震带上，遭遇到地震，所以有些国家主动提出跟中国合作，提升他们的地震监测水平。</p>
            <p>李丽说，截至目前，中国已在“一带一路”沿线巴基斯坦、阿尔及利亚等6个国家建成39个地震台，还有尼泊尔、肯尼亚2个国家12个地震台正在建设。预计到2019年底，将在沿线8个国家建成超过50个地震台。</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目进度" name="second">
          <tree-table :data="data" border expandAll>
            <el-table-column label="任务名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.event }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="worktime" label="工期(天)" align="center"></el-table-column>
            <el-table-column prop="stime" label="开始时间" align="center"></el-table-column>
            <el-table-column prop="etime" label="结束时间" align="center"></el-table-column>
            <el-table-column prop="progress" label="进度(%)" align="center"></el-table-column>
            <el-table-column prop="step" label="任务阶段" align="center"></el-table-column>
            <el-table-column prop="update" label="更新日期" align="center"></el-table-column>
            <el-table-column prop="pop" label="负责人" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="200">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  type="primary"
                  round
                  v-show="scope.row.tagInfo==2?true:false"
                >修改</el-button>
                <el-button
                  size="small"
                  type="danger"
                  round
                  v-show="scope.row.tagInfo==2?true:false"
                >删除</el-button>
              </template>
            </el-table-column>
          </tree-table>
        </el-tab-pane>
        <el-tab-pane label="项目日志" name="third">
          <el-table :data="tabletask" border style="width: 100%;">
            <el-table-column prop="data" label="序号" align="center" width="150"></el-table-column>
            <el-table-column prop="name" label="任务名称" align="center" width="300"></el-table-column>
            <el-table-column prop="journal" label="操作日志" align="center"></el-table-column>
            <el-table-column prop="pop" label="操作人" align="center" width="150"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="项目文档" name="fourth">
          <el-table :data="tabletask1" border style="width: 100%;">
            <el-table-column prop="date" label="序号" align="center" width="100"></el-table-column>
            <el-table-column prop="name" label="任务名称" align="center"></el-table-column>
            <el-table-column prop="time" label="上传时间" align="center"></el-table-column>
            <el-table-column prop="pop" label="上传人" align="center"></el-table-column>
            <el-table-column prop="doc" label="文档" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button round size="small" type="primary" @click="down()">查看，下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="项目预算" name="fifth">
          <tree-table :data="tabletask2" border node-key="id" :expanded-keys="1">
            <el-table-column label="任务名称" align="center">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.tagInfo === '1' ? 'primary' : (scope.row.tagInfo === '2'?'success':(scope.row.tagInfo==='3'?'warning':(scope.row.tagInfo==='4'?'danger':'warning')))"
                  close-transition
                >{{scope.row.event}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="all" label="资金总预算（万元）" align="center"></el-table-column>
            <el-table-column prop="cost" label="已使用（万元）" align="center"></el-table-column>
            <el-table-column prop="surplus" label="剩余（万元）" align="center"></el-table-column>
          </tree-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import treeTable from "@/components/TreeTable";
import pdf from "@/assets/Git.pdf";
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
      content: "1",
      tableData: [
        {
          number: "1",
          system: "一带一路地震监测台网项目",
          important: "一级",
          alldays: "3",
          prveday: "2019-04-01 15:02:01",
          nextday: "2019-07-01 15:02:01",
          build: "北京市地震局",
          status: "正在进行"
        }
      ],
      data: [
        {
          id: 1,
          date: 1,
          event: "台阵建设",
          tagInfo: "1",
          stime: "",
          etime: "",
          pop: "",
          children: [
            {
              id: 6,
              event: "台阵1",
              tagInfo: "2",
              stime: "2019-05-01 15:02:01 ",
              etime: "2019-07-01 15:02:01",
              step: "征地",
              update: "2019-05-11 15:02:01",
              pop: "李欣",
              progress: "20",
              worktime: "30"
            },
            {
              id: 7,
              event: "台阵2",
              tagInfo: "2",
              stime: "2019-05-01 15:02:01",
              etime: "2019-07-01 15:02:01",
              step: "勘选",
              update: "2019-05-29 15:02:01",
              pop: "王安",
              progress: "45",
              worktime: "15"
            },
            {
              id: 8,
              event: "台阵3",
              tagInfo: "2",
              stime: "2019-05-01 15:02:01",
              etime: "2019-07-01 15:02:01",
              step: "设备购置",
              update: "2019-06-11 15:02:01",
              pop: "常伟",
              progress: "10",
              worktime: "35"
            },
            {
              id: 8,
              event: "台阵4",
              tagInfo: "2",
              stime: "2019-05-01 15:02:01",
              etime: "2019-07-01 15:02:01",
              step: "设备购置",
              update: "2019-06-01 15:02:01",
              pop: "刘瑞",
              progress: "15",
              worktime: "10"
            }
          ]
        }
      ],
      tabletask: [
        {
          data: 1,
          journal: "2019年6月20日将该项目的进度由27%改为30%",
          name: "201901RW_1",
          pop: "李欣"
        },
        {
          data: 2,
          journal: "2019年6月1日将该项目的进度由25%改为27%",
          name: "201901RW_2",
          pop: "王安"
        },
        {
          data: 3,
          journal: "2019年5月 5日将该项目的进度由20%改为25%",
          name: "201901RW_3",
          pop: "常伟"
        },
        {
          data: 4,
          journal: "2019年4月25日将该项目的进度由12%改为20%",
          name: "201901RW_4",
          pop: "刘瑞"
        }
      ],
      tabletask1: [
        {
          date: "1",
          name: "201901RW_1",
          time: "2019-05-11 15:02:01",
          pop: "李欣",
          doc: "一带一路安全报告.word"
        },
        {
          date: "2",
          name: "201901RW_2",
          time: "2019-06-02 15:02:01",
          pop: "王安",
          doc: "地震监测平台.word"
        },
        {
          date: "3",
          name: "201901RW_3",
          time: "2019-05-31 15:02:01",
          pop: "常伟",
          doc: "地震发布知识.pdf"
        },
        {
          date: "4",
          name: "201901RW_4",
          time: "2019-06-20 15:02:01",
          pop: "刘瑞",
          doc: "一带一路相关政策.word"
        }
      ],
      tabletask2: [
        {
          id: 1,
          event: "陆基探测检测系统",
          tagInfo: "1",
          all: "70",
          cost: "50",
          surplus: "20",
          children: [
            {
              id: 6,
              event: "小孔径台阵",
              tagInfo: "2",
              all: "70",
              cost: "50",
              surplus: "20",
              children: [
                {
                  event: "地震台阵",
                  tagInfo: "3",
                  all: "70",
                  cost: "50",
                  surplus: "20",
                  children: [
                    {
                      event: "海淀台",
                      tagInfo: "4",
                      all: "0",
                      cost: "0",
                      surplus: "0"
                    },
                    {
                      event: "朝阳台",
                      tagInfo: "4",
                      all: "0",
                      cost: "0",
                      surplus: "0"
                    },
                    {
                      event: "昌平台",
                      tagInfo: "4",
                      all: "0",
                      cost: "0",
                      surplus: "0"
                    },
                    {
                      event: "顺义台",
                      tagInfo: "4",
                      all: "0",
                      cost: "0",
                      surplus: "0"
                    },
                    {
                      event: "大兴台",
                      tagInfo: "4",
                      all: "0",
                      cost: "0",
                      surplus: "0"
                    }
                  ]
                },
                {
                  event: "火山次声台阵",
                  tagInfo: "3",
                  all: "70",
                  cost: "50",
                  surplus: "20"
                }
              ]
            },
            {
              event: "综合台",
              tagInfo: "2",
              all: "70",
              cost: "50",
              surplus: "20"
            },
            {
              event: "科学台阵",
              tagInfo: "2",
              all: "70",
              cost: "50",
              surplus: "20"
            },
            {
              event: "重力台",
              tagInfo: "2",
              all: "70",
              cost: "50",
              surplus: "20"
            },
            {
              event: "地磁台",
              tagInfo: "2",
              all: "70",
              cost: "50",
              surplus: "20"
            },
            {
              event: "激动车组",
              tagInfo: "2",
              all: "70",
              cost: "50",
              surplus: "20"
            }
          ]
        },{
          event: "海域探测检测系统",
          tagInfo: "1",
          all: "70",
          cost: "50",
          surplus: "20",
        },{
           event: "数据传输系统",
          tagInfo: "1",
          all: "70",
          cost: "50",
          surplus: "20",
        },{
            event: "信息处理与服务系统",
          tagInfo: "1",
          all: "70",
          cost: "50",
          surplus: "20",
        },{
          event: "运行管理保障系统",
          tagInfo: "1",
          all: "70",
          cost: "50",
          surplus: "20",
        }
        
      ],

      activeName: "first"
    };
  },
  methods: {
    edit() {
      this.$router.push({ path: "/overview" });
    },
    backHome() {
      this.$router.push({ path: "/projectoverview" });
    },
    down() {
      window.open(pdf);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  padding: 25px 35px;
  .content {
    // f8f9fa
    .el-tab-pane {
      padding: 0 30px;
    }
    .title {
      margin: 0 auto 30px;
      width: 70%;
      span {
        display: inline-block;
        margin-left: 30px;
      }
    }
    .progress {
      margin-bottom: 30px;
    }
    h3 {
      margin-bottom: 50px;
    }
    .paragraph {
      p {
        text-indent: 2em;
        margin-bottom: 30px;
      }
      h2 {
        text-align: center;
        font-size: 25px;
        font-weight: 700;
      }
    }
    /deep/.el-tabs__item {
      width: 62%;
      text-align: center;
      margin-top: 30px;
      font-size: 20px;
    }
    /deep/.el-tabs__content {
      margin-top: 20px;
    }
  }
}
</style>
