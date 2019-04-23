<template>
  <div id="container1">
    <div class="content">
      {{width}}
      <el-row>
        <el-col :span="10">
          <div class="item">
            <div class="header">总预算完成度(万元)</div>
            <div>
              <div id="main" style="height:300px;"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="item">
            <div class="header">
              <span>分系统完成度(单位:万元)</span>
            </div>
            <div>
              <div id="main1" style="height:300px;"></div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14">
          <div class="item">
            <div class="header">各工作阶段完成度(单位：万元)</div>
            <div>
              <div id="main2" style="height:300px;"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="item">
            <div class="header">
              <span>各任务完成度(单位：万元)</span>
              <el-select  v-model="item" placeholder="请选择" size="mini" style="float:right">
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
      list: [
        {
          key: "0",
          label: "路基探测监测系统"
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
      item: "0"
    };
  },
  methods: {
    // 总预算完成度
    init() {
      this.chart = echarts.init(document.getElementById("main"));
      let that = this;

      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        grid: {
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true
        },
        title: {
          show: true, //默认为true，可以省略
          text: "总预算:3300万元",
          textStyle: {
            color: "#939aab",
            fontStyle: "oblique",
            fontWeight: "400",
            fontFamily: "sans-serif",
            fontSize: "14"
          },

          subtext: "已使用:2200万元",
          x: "right"
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" }, //仪表盘显示数据
            axisLine: {
              //仪表盘轴线样式
              lineStyle: {
                width: 20
              }
            },
            splitLine: {
              //分割线样式
              length: 20
            },
            data: [
              {
                value: 92,
                name: "总额度",
                
              }
            ],

            markPoint: {
              symbol: "circle",
              symbolSize: 5,
              data: [
                //跟你的仪表盘的中心位置对应上，颜色可以和画板底色一样
                { x: "center", y: "center", itemStyle: { color: "#FFF" } }
              ]
            }
          }
        ]
      };
      // let option = {
      //   tooltip: {
      //     formatter: "{a} <br/>{b} : {c}%"
      //   },
      // grid: {
      //     left: "3%",
      //     right: "4%",
      //     bottom: "3%",
      //     containLabel: true
      //   },
      //   title: {
      //     show: true, //默认为true，可以省略
      //     text: "总预算:3300万元",
      //     textStyle: {
      //       color: "#939aab",
      //       fontStyle: "oblique",
      //       fontWeight: "400",
      //       fontFamily: "sans-serif",
      //       fontSize: "14"
      //     },

      //     subtext: "已使用:2200万元",
      //     x: "right"
      //   },
      //   series: [
      //     {
      //       name: "业务指标",
      //       type: "gauge",
      //       detail: { formatter: "{value}%" },
      //       data: [{ value: 50, name: "完成率" }]
      //     }
      //   ]
      // };

      this.chart.setOption(option);
    },
    // 分系统完成度
    init2() {
      this.chart1 = echarts.init(document.getElementById("main1"));

      //初始化数据
      var category = [
        "路基检测系统",
        "海域检测系统",
        "数据传输系统",
        "信息管理系统",
        "运行检测系统"
      ];
      var barData = [310, 2142, 1218, 581, 4310];

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
      this.chart1.setOption(option);
    },
    init3() {
      this.chart2 = echarts.init(document.getElementById("main2"));
      let option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["总预算", "已使用"],
          x: "right", // 'center' | 'left' | {number},

          y: "top", // 'center' | 'bottom' | {number}
          textStyle: { color: "#939aab" }
        },
        color: ["#33b6be", "#899cfb"],
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#939aab", //左边线的颜色
                width: "2" //坐标线的宽度
              }
            },
            data: [
              "堪选",
              "征地",
              "土建",
              "改造",
              "设备购置",
              "仪器架设",
              "试运行",
              "验收"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#939aab", //左边线的颜色
                width: "2" //坐标线的宽度
              }
            }
          }
        ],
        series: [
          {
            name: "总预算",
            type: "bar",
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2],
            itemStyle: {
              //通常情况下：
              normal: {
                color: "#33b6be"
              }
            }
          },
          {
            name: "已使用",
            type: "bar",
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6],
            itemStyle: {
              //通常情况下：
              normal: {
                color: "#899cfb"
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
          trigger: "axis"
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
          icon: "circle",
          textStyle: { color: "#939aab" }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#939aab", //左边线的颜色
              width: "2" //坐标线的宽度
            }
          },
          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"]
        },
        yAxis: {
          type: "value",
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
            name: "路基探测系统",
            type: "line",
            stack: "总量",
            smooth: true,
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "海域探测检测系统",
            type: "line",
            stack: "总量",
            smooth: true,
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "数据传输系统",
            type: "line",
            stack: "总量",
            smooth: true,
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "信息传输系统",
            type: "line",
            stack: "总量",
            smooth: true,
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "运行保障系统",
            type: "line",
            stack: "总量",
            smooth: true,
            data: [820, 932, 901, 934, 1290, 1330, 1320]
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

