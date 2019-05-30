<template>
  <div id="container1">
    <div class="content">
      <!-- {{width}} -->
      <el-row>

         <div class="header">
             
              <el-select  v-model="item" placeholder="请选择" size="mini" style="float:right;margin-left:10px">
                       <el-option v-for="item in list" :key="item.key" :label="item.label"
                       :value="item.key"></el-option>
              </el-select>
              <el-select  v-model="child" placeholder="请选择" size="mini" style="float:right;" v-if="users=='常伟'?false:(users=='刘瑞'?false:true)">
                       <el-option v-for="child in tableData" :key="child.key" :label="child.label"
                       :value="child.key"></el-option>
              </el-select>
            </div>
      </el-row>
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
            <div class="header">
              <span>各系统建设情况</span>
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
            <div class="header">台站类占比</div>
            <div>
              <div id="main2" style="height:350px;"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="item">
            <div class="header">
              <span>各任务完成度</span>
      
            </div>
            <div>
              <div id="main3" style="height:300px; color:white"></div>
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
  computed: {
     users() {
      let user = JSON.parse(window.sessionStorage.getItem('userInfor')).username
      return user
    },
  },
  watch: {},
  data() {
    return {
      chart: null,
      chart1: null,
      chart2: null,
      chart3: null,
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
      tableData:[
        {
          key: "0",
          label: "北京地震局"
        },
        {
          key: "1",
          label: "重庆地震局"
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
          label: "中国地震局地震研究院"
        },
         {
          key: "6",
          label: "中国地震局地球物理勘探中心"
        },
         {
          key: "7",
          label: "中国地震局第一监测中心"
        }
      ],
      child:"0"
 
    };
  },
  methods: {
    // 总预算完成度
    init() {
      this.chart = echarts.init(document.getElementById("main"));

      //初始化数据
      var category = [
       "陆基探测监测系统",
        "海域探测监测系统",
        "数据传输系统",
        "信息处理与服务系统",
        "运行管理保障系统"
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
          //formatter: "{a} <br/>{b} : {c}%",
        //   formatter: function (params,ticket,callback) {
          
        //       var res = params[0].name;
        //       console.log("TCL:  params[0].name;",  params[0])
        //     // if(params[0].dataIndex==0){
        //     //     //var res = params[0].name;
        //     //     for (var i = 0, l = params.length; i < l; i++) {
        //     //     res += '<br/>' + params[i].seriesName + ' : ' + params[i].value+'%'+'<br/>'+'预算花费:'+costData[0]+'万元'+'<br/>'+'实际花费:'+prveData[0]+'万元'
        //     //     }          
        //     // }
           
        //          return res;
           
        // },
          axisPointer: {
          //坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: ["#ff6997", "#4abcfb", "#7a8abe",'#00FFFF','#00BFFF','#FF8247','#FF3030','#FA8072',"#8C8C8C","#00C5CD"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
         legend: {
              
        data:[{name:'勘选',
        textStyle:{color:"white"}
        },{name:'征（租）地', textStyle:{color:"white"}},{name:'前期工作咨询',textStyle:{color:"white"}},
        {name:'节能影响评估',textStyle:{color:"white"}},{name:'工程设计',textStyle:{color:"white"}},{name:'土建',textStyle:{color:"white"}},
        {name:'设备购置',textStyle:{color:"white"}},{name:'仪器架设',textStyle:{color:"white"}},
        {name:'试运行',textStyle:{color:"white"}},{name:'验收',textStyle:{color:"white"}}]
          },
        xAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#939aab", //左边线的颜色
              width: "2" //坐标线的宽度
            },
         
            
          },
           axisLabel: {
                formatter: '{value} %'
            }
        },
        yAxis: {
          type: "category",
          data: ["机动车组(12)","重力台(12)", "地磁台(51)", "科学台阵(51)", "综合台(5)", "小孔径台阵(23)"],
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
            name: "勘选",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside",
                  formatter:'{c}%'     
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
          
            data: [5, 10, 12, 9, 8,13]
          },
           {
            name: "征（租）地",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter:'{c}%'         
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
            data: [15, 10 ,8, 11, 12, 15]
          },
          {
            name: "前期工作咨询",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside",
                  formatter:'{c}%'     
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
            data: [12 ,13, 6, 11, 7, 10]
          },
          {
            name: "节能影响评估",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside",
                  formatter:'{c}%'     
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
            data: [8, 7, 14, 9, 13, 10]
          },
          {
            name: "工程设计",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside",
                  formatter:'{c}%'     
              }
            },
            lineStyle: {
              normal: {
                color: "#9400D3"
              }
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 7
              }
            },
            data: [7 ,4, 7, 5, 14, 15]
          },
          {
            name: "土建",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside",
                  formatter:'{c}%'     
              }
            },
            lineStyle: {
              normal: {
                color: "#F0FFFF"
              }
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 7
              }
            },
            data: [13,16, 13, 15, 6 ,13]
          },
          {
            name: "设备购置",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside",
                  formatter:'{c}%'     
              }
            },
            lineStyle: {
              normal: {
                color: "#40E0D0"
              }
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 7
              }
            },
            data: [8 ,10 ,10 ,16 ,4 ,10]
          },
         
          {
            name: "仪器架设",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside",
                  formatter:'{c}%'     
              }
            },
            lineStyle: {
              normal: {
                color: "#FFFACD"
              }
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 7
              }
            },
            data: [12, 10, 10, 4 ,16, 5]
          },
          {
            name: "试运行",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside",
                  formatter:'{c}%'     
              }
            },
            lineStyle: {
              normal: {
                color: "#D2691E"
              }
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 7
              }
            },
            data: [16 ,12 ,9 ,11 ,15 ,5]
          },
          {
            name: "验收",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside",
                  formatter:'{c}%'     
              }
            },
            lineStyle: {
              normal: {
                color: "#B22222"
              }
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 7
              }
            },
            data: [4 ,8, 11, 9, 5, 4]
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
              { value: 305, name: "验收" },
              { value: 220, name: "试运行" },
              { value: 500, name: "仪器架设" },
              { value: 100, name: "设备购置" },
              { value: 205, name: "土建" },
              { value: 50, name: "工程设计" },
              { value: 100, name: "节能影响评估" },
              { value: 315, name: "前期工作咨" },
              { value: 300, name: "征（租）地" },
              { value: 200, name: "勘选" }
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
     
      font-size: 13px;
      padding: 0 15px;
    }
    .title {
      font-size: 12px;
      
      div {
         margin-top: 10px;
        display: inline-block;
        width: 15.5%!important;
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

