<template>
  <div id="container1">
    <div class="content">
      {{width}}
      <el-row>
        <el-col :span="10">
          <div class="item">
            <div class="header">系统进度</div>
            <div>
              <div id="main" style="height:300px;"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="item">
            <!-- <div class="header">
              <span>各系统建设情况</span>
              <el-select placeholder="请选择" size="mini" style="float:right">
                <el-option></el-option>
              </el-select>
            </div> -->
            <div>
              <div class="title">
                <div>
                  <span>台阵</span>
                  <span>23</span>
                </div>
                <div>
                  <span>综合台</span>
                  <span>5</span>
                </div>
                <div>
                  <span>科学台阵</span>
                  <span>51</span>
                </div>
                <div>
                  <span>地磁</span>
                  <span>51</span>
                </div>
                <div>
                  <span>重力</span>
                  <span>12</span>
                </div>
              </div>
              <div id="main1" style="height:300px;"></div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14">
          <div class="item">
            <div class="header">台站类占比</div>
            <div>
              <div id="main2" style="height:350px;"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="item">
            <div class="header">
              <span>各任务完成度(单位：万元)</span>
              <el-select v-model="item" placeholder="请选择" size="mini" style="float:right">
                 <el-option v-for="item in list" :key="item.key" :label="item.label"
                       :value="item.key"></el-option>
              </el-select>
            </div>
            <div>
              <div id="main3" style="height:300px;"></div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import resize from "./../mixins/resize.js";
export default {
  mixins: [resize],
  mounted() {
    this.init();
    this.init2();
    this.init3();
    this.init4();
  },
  computed: {},
  watch: {},
  data() {
    return {
      chart: null,
      chart1: null,
      chart2: null,
      chart3: null,
       list:[{
         key:'0',
        label:'综合台'
      },{
         key:'1',
        label:'科学台阵'
      },{
         key:'2',
        label:'地磁'
      },{
         key:'3',
        label:'重力'
      },{
         key:'4',
        label:'陆域机动探测'
      },{
         key:'5',
        label:'海域固定'
      },{
         key:'6',
        label:'岛礁台'
      },{
         key:'7',
        label:'深井台'
      },{
         key:'8',
        label:'科考船'
      },{
         key:'9',
        label:'数据传输系统'
      },{
         key:'10',
        label:'信息处理与服务系统'
      },{
         key:'11',
        label:'运行管理保障系统'
      }
      ],
      item:'0'
    };
  },
  methods: {
    // 总预算完成度
    init() {
      this.chart = echarts.init(document.getElementById("main"));

      //初始化数据
      var category = [
        "路基检测系统",
        "海域检测系统",
        "数据传输系统",
        "信息管理系统",
        "运行检测系统"
      ];
      var barData = [3100, 2142, 1218, 581, 431];

      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        color: ["#35b8be", "#889cff", "#ccc", "#000", "#fff"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#939aab", //左边线的颜色
              width: "2" //坐标线的宽度
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: "category",
          data: category,
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#939aab", //左边线的颜色
              width: "2" //坐标线的宽度
            }
          },
          axisTick: {
            show: false
          },
          offset: 10,
          nameTextStyle: {
            fontSize: 15
          }
        },
        series: [
          {
            name: "已使用/总预算",
            type: "bar",
            data: barData,
            barWidth: 14,
            barGap: 10,
            smooth: true,
            label: {
              normal: {
                show: true,
                position: "right",
                offset: [5, -2],
                textStyle: {
                  color: "#F68300",
                  fontSize: 13
                }
              }
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 7
              },
              normal: {
                barBorderRadius: 7,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: "#3977E6" },
                  { offset: 1, color: "#37BBF8" }
                ])
              }
            }
          }
        ]
      };
      this.chart.setOption(option);
    },
    // 分系统完成度
    init2() {
      this.chart1 = echarts.init(document.getElementById("main1"));

      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: ["#ff6997", "#4abcfb", "#7a8abe"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#939aab", //左边线的颜色
              width: "2" //坐标线的宽度
            }
          }
        },
        yAxis: {
          type: "category",
          data: ["重力", "地磁", "科学台阵", "综合台", "台阵"],
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#939aab", //左边线的颜色
              width: "2" //坐标线的宽度
            }
          }
        },
        series: [
          {
            name: "已完成",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            lineStyle: {
              normal: {
                color: "#ff6997"
              }
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 7
              }
            },
            data: [320, 302, 301, 400, 500]
          },
          {
            name: "建设中",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            lineStyle: {
              normal: {
                color: "#4abcfb"
              }
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 7
              }
            },
            data: [120, 132, 101, 700, 800]
          },
          {
            name: "未完成",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            lineStyle: {
              normal: {
                color: "#7a8abe"
              }
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 7
              }
            },
            data: [220, 182, 191, 800, 600]
          }
        ]
      };
      this.chart1.setOption(option);
    },
    init3() {
      this.chart2 = echarts.init(document.getElementById("main2"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["山洞", "地面", "浅井", "井下"],
          textStyle: {
            fontSize: 14, //字体大小
            color: "#939aab" //字体颜色
          },
          icon: "arrow"
        },
        series: [
          {
            name: "占比率",
            type: "pie",
            radius: "55%",

            data: [
              { value: 335, name: "山洞" },
              { value: 310, name: "地面" },
              { value: 234, name: "浅井" },
              { value: 135, name: "井下" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      // 绘制图表
      this.chart2.setOption(option);
    },
    init4() {
      this.chart3 = echarts.init(document.getElementById("main3"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        series: [
          {
            name: "占比模式",
            type: "pie",

            roseType: "area",
            data: [
              { value: 300, name: "验收" },
              { value: 400, name: "试运行" },
              { value: 405, name: "仪器假设" },
              { value:350, name: "设备购置" },
              { value: 400, name: "征地" },
              { value: 315, name: "土建" },
              { value: 300, name: "改造" },
              { value: 400, name: "堪选" }
            ]
          }
        ]
      };

      // 绘制图表
      this.chart3.setOption(option);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" >
#container1 {
  padding: 25px 35px;
  .content {
    background: rgb(36, 44, 68);
    height: auto;
    border-radius: 10px;
  }
  .item {
    height: 400px;
    background: #14192f;
    margin: 15px;
    border-radius: 10px;
    .header {
      height: 40px;
      line-height: 40px;
      border-radius: 10px;
      background: #1f2640;
      z-index: 200;
      color: #939aab;
      font-size: 13px;
      padding: 0 15px;
    }
    .title {
      font-size: 12px;
      color: #939aab;
      div {
        display: inline-block;
        width: 19.5%;

        text-align: center;
        span {
          display: block;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>

