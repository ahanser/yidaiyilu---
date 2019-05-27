<template>
  <div id="container1">
    <div class="content">
      {{width}}
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
             <div class="header">
            <span> 总预算完成度</span>
             </div>
            <div>
              <div id="main" style="height:300px;"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="item">
            <div class="header">
              <span>分系统完成度</span>
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
            <div class="header">各工作阶段完成度</div>
            <div>
              <div id="main2" style="height:300px;"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="item">
            <div class="header">
              <span>各任务完成度</span>
          <!-- (万元) -->
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
      let that = this;

      let option = {
        tooltip: {
          formatter: "{a} {b} : {c}%"
        },
        grid: {
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true
        },
        title: {
          //show: true, //默认为true，可以省略
          text: "总预算:10000万元",
          textStyle: {
            color: "#fff",
            //fontStyle: "oblique",
            fontWeight: "400",
            fontFamily: "sans-serif",
            fontSize: "14"
          },
          subtext: "已使用:5300万元",
          x: "right"
        },
        
        series: [
          {
            name: "",
            type: "gauge",
    
            detail: { formatter: "{value}%" }, //仪表盘显示数据
            radius : '100%',
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
              {  name: "总额度",
                value: 53,
              
                textStyle:{
                 color: "#fff"
                  }
                },
              
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
        "小孔径台阵",
        "综合台",
        "科学台阵",
        "重力台",
        "地磁台",
        '机动车组'
      ];
      var barData = [116, 21, 72, 98, 43,50];
      var costData=[1000,580,300,750,620,862];
      var prveData=[1160,121,216,735,266,431];
      
      var option = {
        
        tooltip: {
          trigger: "axis",
          //formatter: "{a} <br/>{b}: {c}%<br/>",
          
         formatter: function (params,ticket,callback) {
           //if(params.dataIndex)
            console.log(params[0].dataIndex)
                var res = params[0].name;
            if(params[0].dataIndex==0){
                var res = params[0].name;
                for (var i = 0, l = params.length; i < l; i++) {
                res += '<br/>' + params[i].seriesName + ' : ' + params[i].value+'%'+'<br/>'+'预算花费:'+costData[0]+'万元'+'<br/>'+'实际花费:'+prveData[0]+'万元'
                }          
            }else if(params[0].dataIndex==1){
              //var res = params[0].name;
                for (var i = 0, l = params.length; i < l; i++) {
                res += '<br/>' + params[i].seriesName + ' : ' + params[i].value+'%'+'<br/>'+'预算花费:'+costData[1]+'万元'+'<br/>'+'实际花费:'+prveData[1]+'万元'
                }    
            }
            else if(params[0].dataIndex==2){
              //var res = params[0].name;
                for (var i = 0, l = params.length; i < l; i++) {
                res += '<br/>' + params[i].seriesName + ' : ' + params[i].value+'%'+'<br/>'+'预算花费:'+costData[2]+'万元'+'<br/>'+'实际花费:'+prveData[2]+'万元'
                }    
            }
            else if(params[0].dataIndex==3){
              //var res = params[0].name;
                for (var i = 0, l = params.length; i < l; i++) {
                res += '<br/>' + params[i].seriesName + ' : ' + params[i].value+'%'+'<br/>'+'预算花费:'+costData[3]+'万元'+'<br/>'+'实际花费:'+prveData[3]+'万元'
                }    
            }
            else if(params[0].dataIndex==4){
              //var res = params[0].name;
                for (var i = 0, l = params.length; i < l; i++) {
                res += '<br/>' + params[i].seriesName + ' : ' + params[i].value+'%'+'<br/>'+'预算花费:'+costData[4]+'万元'+'<br/>'+'实际花费:'+prveData[4]+'万元'
                }    
            }
            else if(params[0].dataIndex==5){
              //var res = params[0].name;
                for (var i = 0, l = params.length; i < l; i++) {
                res += '<br/>' + params[i].seriesName + ' : ' + params[i].value+'%'+'<br/>'+'预算花费:'+costData[5]+'万元'+'<br/>'+'实际花费:'+prveData[5]+'万元'
                }    
            }
           
                 return res;
           
        },

          axisPointer:{
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
          },
            axisLabel: {
                formatter: '{value} %'
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
            name: "实际花费占比率",
            type: "bar",
            data:barData,
            barWidth: '60%',
            barGap: 10,
            smooth: true,
            label: {
              normal: {
                show: true,
                position: "right",
                offset: [5, -2],
                textStyle: {
                color: "#F68300",
                fontSize: 13,
                },
              
              }
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 7
              },
              normal: {
               barBorderRadius: 7,
                // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                //   { offset: 0, color: "#3977E6" },
                //   { offset: 1, color: "#37BBF8" }
                // ])
                  color: function (params) {
                           var index_num = params.value;
                           for (var z = 0; z < 5; z++) {
                               if (index_num > 100) {
                                   return '#FF3030';
                               }
                               else {
                                   return '#37BBF8';
                               }
                           }
                           
                        
                       }
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
              "勘选",
              "征（租）地",
              "前期工作咨询",
              "节能影响评估",
              "工程设计",
              "土建",
              "设备购置",
              "仪器架设"
            ],
            axisLabel: { 
              interval:0,//横轴信息全部显示 
            },  
          },
           
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
          data: ["陆基探测系统", "海域探测检测系统", "数据传输系统", "信息传输系统", "运行保障系统"],
          x: "right", 
          y: "top", 
          icon: "circle",
          textStyle: { color: "#939aab" },
          color: ["#33b6be", "#899cfb"],
        calculable: true,
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
            name: "陆基探测系统",
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
 .header {
      height: 40px;
      line-height: 40px;
      border-radius: 10px;
      background: #1f2640;
      z-index: 200;
      color: #939aab;
      font-size: 13px;
      padding: 0 15px;
      input{
        background-color: rgb(14, 19,40);
        color: #ccc;
        margin-left: 5px;
        border: 1px solid rgb(54,202,207);
        &:hover{
            border: 1px solid rgb(54,202,207)!important;
        }
      }
    
    }
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
      input{
        background-color: rgb(14, 19,40);
        color: #ccc;
        margin-left: 5px;
           border: 1px solid rgb(54,202,207)
      }
    
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

