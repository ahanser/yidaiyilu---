<template>
  <div class="map">
    <!-- 编辑操作 -->
  <el-dialog title="状态信息" :visible.sync="outerVisible" width="30%" @close='closeselect'>
      <el-form ref="form" label-width="100px">
        <el-form-item label="建设任务编号" show-overflow-tooltip>
          <el-input value="LJ-TZ-北京-1" disabled></el-input>
        </el-form-item>
        <el-form-item label="任务名称" show-overflow-tooltip>
          <el-input value="小孔径台阵--地震台阵" disabled></el-input>
        </el-form-item> 
        <el-form-item label="任务备注名">
          <el-input value="海淀区"></el-input>
        </el-form-item>
        <el-form-item label="经度">
          <el-input  value="116.564095"></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input  value="40.07943"></el-input>
        </el-form-item>
          <el-form-item label="文件上传">
           <el-upload  
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList3">
              <el-button size="small" round class="uploadButton">上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="补充说明">
          <el-input value="123.3"></el-input>
        </el-form-item>
         <el-form-item label="进度状态修改">
           <el-select v-model="content" size="mini" style="width:100%" ref="person">
            <el-option v-for="content in contents" :key="content.key" :label="content.label"
                       :value="content.key" :v-model="content.key"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible=false"  class="add" size="small">提交</el-button>
        <el-button @click="outerVisible=false" class="cancel" size="small">取消</el-button>
      </div>
  </el-dialog>
    <!-- 财务明细 -->
  <el-dialog :visible.sync="financialDetails" width="50%" title="任务编号">
            
         <el-table :data="tableData2" border style="width: 100%;margin-top:0px" :header-cell-style="{background:'#BFEFFF',color:'#000000'}"
         :cell-style="{background:'white',color:'#000000'}"
        @cell-mouse-enter="handleMouseEnter"
        class="tableHover"
         >
                    <el-table-column prop="date" label="序号" width="80" align="center">
                         
                    </el-table-column>
                    <el-table-column prop="number" label="建设任务编号" width="150"  align="center" >
                    </el-table-column>
                    <el-table-column prop="status" label="进度"  width="150" align="center" ></el-table-column>
                    <el-table-column prop="expected" label="预算(万元)" width="100"  align="center"></el-table-column>
                    <el-table-column prop="cost" label="实际金额(万元)" width="120"  align="center"></el-table-column>
                    <el-table-column prop="rate" label="使用率"  align="center" width="100"></el-table-column>
                    <el-table-column prop="keep" label="结余率"  align="center" width="100"></el-table-column>
                    <el-table-column prop="time" label="同步时间" align="center" width="230"></el-table-column>
                    
        </el-table>

        <div class="pagin">
        <el-row>
          <el-col :span="12">
            <el-pagination background layout="prev, pager, next" :total="1"></el-pagination>
          </el-col>
         
        </el-row>
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
    <div id="basicBusinss"></div>

    <div class="map11" v-if="!showMenu">
      <div class="lengedItem">
        <img src="@/assets/images/4.png" alt>
        <span>陆基探测监测系统</span>
      </div>

      <div class="lengedItem">
        <img src="@/assets/images/3.png" alt>
        <span>海域探测监测系统</span>
      </div>

      <div class="lengedItem">
        <img src="@/assets/images/2.png" alt>
        <span>数据传输系统</span>
      </div>
      <div class="lengedItem">
        <img src="@/assets/images/1.png" alt>
        <span>信息处理与服务系统</span>
      </div>
      <div class="lengedItem">
        <img src="@/assets/images/5.png" alt>
        <span>运行管理保障系统</span>
      </div>
    </div>
    <div class="Projectselection" v-if="showMenu">
      <el-form ref="form" label-width="100px" size="mini">
        <el-form-item label="项目名称：">
          <el-select v-model="value" placeholder="陆基探测监测系统" style="color:black">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="content" v-if="showMenu">
      <el-form label-width="100px" size="mini">
        <el-form-item>
          <el-input style="width:200px;"></el-input>
          <el-button type="primary" class="add">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="type" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="number" label="建设任务编号" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="note" label="任务名称" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="name" label="任务备注名" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="jd" label="经度" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="wd" label="纬度" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column  prop="station" label="进度状态修改" show-overflow-tooltip align="center">
        </el-table-column>
         <el-table-column prop="height" label="补充说明" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showInfo()" class="add">补充说明</el-button>
          </template>
        </el-table-column>
        <el-table-column label="财务明细" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="showMoney()" class="add">显示财务明细</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip align="center" v-if="users=='刘瑞'?true:(users=='admin'?true:false)">
          <template slot-scope="scope">
           
             <el-button type="primary" size="mini" @click="add(scope.$index, scope.row)" class="add">编辑</el-button>
            
            <!-- <input type="file" name="file" class="el-upload__input" value="上传"> -->
      
          </template>
        </el-table-column>
      
      </el-table>
      <div class="pagin">
        <el-row>
          <el-col :span="12">
            <el-pagination background layout="prev, pager, next" :total="1"></el-pagination>
          </el-col>
         
        </el-row>
      </div>
    </div>
    <i
      class="el-icon-menu"
      @click="tabmenu()"
      style="position:absolute; top:100px;left:17px; z-index:3000;font-size:30px;color:#fff;cursor:pointer"
    ></i>
  </div>
</template>
<script>
import esriLoader from 'esri-loader'
import pngOne from '@/assets/images/1.png'
import pngTwo from '@/assets/images/2.png'
import pngThree from '@/assets/images/3.png'
import pngFouer from '@/assets/images/4.png'
import pngFive from '@/assets/images/5.png'
export default {
  mounted() {
    this.init()
    

  //去除hover效果
  setTimeout(function () {

    const obj = document.getElementsByClassName("el-table--enable-row-hover")[0];

    let clz = obj.getAttribute("class");

    clz = clz.replace("el-table--enable-row-hover","");

    obj.setAttribute("class",clz);

  },1)

  },
  data() {
    return {
         fileList3: [], // 上传
       tableData2: [
        {
          date: "1",
          number: "LJ-TZ-北京-1",
          remark: "海淀区",
          status:"勘选",
          expected:1114,    
          cost:1114,   
          rate:"100%",      
          time:"2019-01-16 16:58:03",
          keep:'0%'
        },
         {
          date: "2",
          number: "LJ-TZ-北京-1",
          status:"征（租）地",
          expected:5,    
          cost:10,   
          rate:"200%",      
          time:"2019-01-16 16:58:03",
          keep:'-100%'
        },
         {
          date: "3",
          number: "LJ-TZ-北京-1",
          status:"前期工作咨询",
          expected:248,    
          cost:272,   
          rate:"110%",      
          time:"2019-01-16 16:58:03",
          keep:'-10%'      
        },
         {
          date: "4",
          number: "LJ-TZ-北京-1",
          status:"节能影响评估",
          expected:67,    
          cost:87,   
          rate:"130%",      
          time:"2019-01-16 16:58:03",
          keep:'-30%'      
        }, {
          date: "5",
          number: "LJ-TZ-北京-1",
          status:"工程设计",
          expected:6277,    
          cost:5800,   
          rate:"92%",      
          time:"2019-01-16 16:58:03",
          keep:'8%'       
        },
        {
          date: "6",
          number: "LJ-TZ-北京-1",
          status:"土建",
          expected:22,    
          cost:0,   
          rate:"0%",      
          time:"2019-01-16 16:58:03",
          keep:'0%'       
        },
        {
          date: "7",
          number: "LJ-TZ-北京-1",
          status:"设备购置",
          expected:11,    
          cost:0,   
          rate:"0%",      
          time:"2019-01-16 16:58:03",
          keep:'0%'       
        },
       
       {
          date: "8",
          number: "LJ-TZ-北京-1",
          status:"仪器架设",
          expected:20,    
          cost:0,   
          rate:"0%",      
          time:"2019-01-16 16:58:03",
          keep:'0%'       
        },
       
       {
          date: "9",
          number: "LJ-TZ-北京-1",
          status:"试运行",
          expected:1801,    
          cost:0,   
          rate:"0%",      
          time:"2019-01-16 16:58:03",
          keep:'0%'       
        },
       
       {
          date: "10",
          number: "LJ-TZ-北京-1",
          status:"验收",
          expected:65,    
          cost:0,   
          rate:"0%",      
          time:"2019-01-16 16:58:03",
          keep:'0%'       
        },
       
       
      ],
      financialDetails:false,
      outerVisible: false,
      showMenu: true,
      isExplan:false,
        contents:[{
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
      content:'0',
      options1: [
        {
          value: '1',
          label: '勘选 '
        },
        {
          value: '2',
          label: '征（租）地'
        },
        {
          value: '3',
          label: '前期工作咨询'
        },
        {
          value: '4',
          label: '节能影响评估'
        }
      ],
      options: [
        {
          value: '选项1',
          label: '陆基探测监测系统'
        },
        {
          value: '选项2',
          label: '海域探测监测系统'
        },
        {
          value: '选项3',
          label: '数据传输系统'
        },
         {
          value: '选项4',
          label: '信息处理与服务系统'
        },
         {
          value: '选项5',
          label: '运行管理保障系统'
        }
      ],

      value: '',
      map: null,
      view: null,
      tableData: [
        {
          type: '1',
          note: '小孔径台阵--地震台阵',
          name: '海淀区',
          jd: '116.564095',
          wd: '40.07943',
          height: '123.3',
          state: '1',
          station:"勘选",
          number: "LJ-TZ-北京-1",
        },
        {
          type: '2',
          note: '小孔径台阵--地震台阵',
          name: '朝阳区',
          jd: '116.608939',
          wd: '39.954769',
          height: '143.3',
          state: '3',
           station:"征（租）地",
           number: "LJ-TZ-北京-2",
        },
        {
          type: '3',
          note: '小孔径台阵--地震台阵',
          name: '东城区',
          jd: '116.46291',
          wd: '39.809484',
          height: '143.3',
          state: '4',
           station:"前期工作咨询",
           number: "LJ-TZ-北京-3",
        },
        {
          type: '4',
          note: '小孔径台阵--地震台阵',
          name: '西城区',
          jd: '116.170853',
          wd: '39.717192',
          height: '143.3',
          state: '3',
           station:"节能影响评估",
           number: "LJ-TZ-北京-4",
        },
        {
          type: '5',
          note: '小孔径台阵--地震台阵',
          name: '丰台区',
          jd: '116.098414',
          wd: '39.91405',
          height: '143.3',
          state: '3',
           station:"工程设计",
           number: "LJ-TZ-北京-5",
        }
      ]
    }
  },
  computed:{
     users() {
      let user = JSON.parse(window.sessionStorage.getItem('userInfor')).username
      return user
    },
  },
  methods: {
       closeselect(){
        this.$refs.person.blur();
        this.$refs.closePass.blur()
    },
     handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
     add() {
      this.outerVisible = true
    },
    showMoney(){
      this.financialDetails = true
    },
    showInfo(){
     this.isExplan = true
    },
    init() {
      const options = {
        url: 'https://js.arcgis.com/4.11/'
      }
      esriLoader
        .loadModules(
          [
            'esri/Map',
            'esri/config',
            'esri/request',
            'esri/Color',

            'esri/views/MapView',
            'esri/widgets/LayerList',
            'esri/layers/BaseTileLayer',
            'esri/Graphic',
            'esri/widgets/Search',
            'esri/widgets/Legend',

            'dojo/domReady!'
          ],
          options
        )
        .then(
          ([
            Map,
            esriConfig,
            esriRequest,
            Color,
            MapView,
            LayerList,
            BaseTileLayer,
            Graphic,
            Search,
            Legend
          ]) => {
            // Custom tile layer class code
            // Create a subclass of BaseTileLayer
            // *******************************************************

            var TintLayer = BaseTileLayer.createSubclass({
              properties: {
                urlTemplate: null,
                tint: {
                  value: null,
                  type: Color
                }
              },

              // generate the tile url for a given level, row and column
              getTileUrl: function(level, row, col) {
                return this.urlTemplate
                  .replace('{z}', level)
                  .replace('{x}', col)
                  .replace('{y}', row)
              },

              // This method fetches tiles for the specified level and size.
              // Override this method to process the data returned from the server.
              fetchTile: function(level, row, col) {
                // call getTileUrl() method to construct the URL to tiles
                // for a given level, row and col provided by the LayerView
                var url = this.getTileUrl(level, row, col)

                // request for tiles based on the generated url
                // set allowImageDataAccess to true to allow
                // cross-domain access to create WebGL textures for 3D.
                return esriRequest(url, {
                  responseType: 'image',
                  allowImageDataAccess: true
                }).then(
                  function(response) {
                    // when esri request resolves successfully
                    // get the image from the response
                    var image = response.data
                    var width = this.tileInfo.size[0]
                    var height = this.tileInfo.size[0]

                    // create a canvas with 2D rendering context
                    var canvas = document.createElement('canvas')
                    var context = canvas.getContext('2d')
                    canvas.width = width
                    canvas.height = height

                    // Draw the blended image onto the canvas.
                    context.drawImage(image, 0, 0, width, height)

                    return canvas
                  }.bind(this)
                )
              }
            })

            // *******************************************************
            // Start of JavaScript application
            // *******************************************************

            // Add stamen url to the list of servers known to support CORS specification.
            esriConfig.request.corsEnabledServers.push('http://www.google.cn/')

            // Create a new instance of the TintLayer and set its properties
            var stamenTileLayer = new TintLayer({
              urlTemplate:
                'http://www.google.cn/maps/vt/lyrs=y@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil',
              tint: new Color('#004FBB'),
              title: 'Google Map'
            })

            // add the new instance of the custom tile layer the map
            var map = new Map({
              // basemap: "streets"
              layers: [stamenTileLayer]
            })

            // create a new scene view and add the map

            var view = new MapView({
              map: map, // References a Map instance
              container: 'basicBusinss', // References the ID of a DOM element
              center: [116.412318,39.912279],
              zoom: 10,
              maxZoom: 12, //最大空间等级
              minZoom: 5 //最小空间等级
            })
            view.on('click', function(e) {
              console.log(e.mapPoint)
            })

            var poinArray = [
              [
                116.564095,
                40.07943,
                '北京',
                pngFouer,
                '北京地震局',
                '小孔径台阵--地震台阵',
                '勘察',
                '未进行',
                '23',
                '13433'
              ],
              [
                116.608939,
                39.954769,
                '北京',
                pngFouer,
                '北京地震局',
                '小孔径台阵--地震台阵',
                '征（租）地',
                '未进行',
                '39',
                '13433'
              ],
              [
                116.46291,
                39.809484,
                '北京',
                pngFouer,
                '北京地震局',
                '小孔径台阵--地震台阵',
                '前期工作咨询',
                '未进行',
                '49',
                '13433'
              ],
              [
                116.170853,
               39.717192,
                '北京',
                pngFouer,
                '北京地震局',
                '小孔径台阵--地震台阵',
                '节能影响评估',
                '已完成',
                '12',
                '13333'
              ],
              [
               116.098414,
                39.91405,
                '北京',
                pngFouer,
                '北京地震局',
                '小孔径台阵--地震台阵',
                '工程设计',
                '进行中',
                '19',
                '4330'
              ]
            ]

            // First create a point geometry (this is the location of the Titanic)
            /* var point = {
              type: 'point', // autocasts as new Point()
              longitude: 109.97,
              latitude: 39.73
            }*/
            var markerSymbol = {
              type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
              color: [226, 119, 40],
              outline: {
                // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 2
              }
            }
            var symbol
            var point
            var pointGraphic
            for (var i = 0; i < poinArray.length; i++) {
              symbol = {
                type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                url: poinArray[i][3],
                width: '30px',
                height: '30px'
              }

              point = {
                type: 'point', // autocasts as new Point()
                longitude: poinArray[i][0],
                latitude: poinArray[i][1]
              }

              pointGraphic = new Graphic({
                geometry: point,
                symbol: symbol,
                attributes: lineAtt,
                popupTemplate: {
                  // autocasts as new PopupTemplate()
                  title: '{Name}',
                  content:
                    '<p>所属单位:' +
                    poinArray[i][4] +
                    '</p>' +
                    '<p>建设内容:' +
                    poinArray[i][5] +
                    '</p>' +
                    '<p>建设过程:' +
                    poinArray[i][6] +
                    '</p>' +
                    '<p>任务状态:' +
                    poinArray[i][7] +
                    '</p>'
                  // '<p>建设数量:' +
                  // poinArray[i][8] +
                  // '</p>' +
                  // '<p>任务总预算( 万元):' +
                  // poinArray[i][9] +
                  // '</p>'
                }
              })
              view.graphics.addMany([
                pointGraphic
                //   polylineGraphic,
                //   polygonGraphic
              ])
            }

            // Create a symbol for drawing the point

            var lineAtt = {
              Name: '鄂尔多斯'
            }
            // Create a graphic and add the geometry and symbol to it

            /****************************
             * Create a polyline graphic
             ****************************/

            // Create a symbol for drawing the line

            // Create an object for storing attributes related to the line

            /*******************************************
             * Create a new graphic and add the geometry,
             * symbol, and attributes to it. You may also
             * add a simple PopupTemplate to the graphic.
             * This allows users to view the graphic's
             * attributes when it is clicked.
          
            /***************************
             * Create a polygon graphic
             ***************************/

            // Add the graphics to the view's graphics layer

            var search = new Search({
              view: view
            })

            view.ui.add(search, 'top-right')
          },
          reason => {
            console.log(reason)
          }
        )
    },
    tabmenu() {
      this.showMenu = !this.showMenu
    },
    save() {
      this.$message('保存成功！')
    },
    modify() {
      this.$message('修改成功！')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" >

 

@import url('https://js.arcgis.com/4.11/esri/css/main.css');

.add,
.cancel{
      border-radius:10px;
    }
.updata1{
   border-radius:10px;
//    position: absolute;
//    bottom: 25px;
//    left: 20px;
 }
.Projectselection{
//  .el-input--mini .el-input__inner {
//     height: 28px;
//     line-height: 28px;
//     background: transparent;
//     color: black!important;
//     background: rgb(51, 50, 50);
//     opacity: 0.8;
//   }
}
.uploadButton
{
  width: 500px;

}
  .table {
    
    width: 100%;
    border-radius: 20px;
    margin-top:1px; 
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
.table tr td {
    border: 1px solid #ccc!important;

    display: table-cell;
    vertical-align: inherit;
 
    padding: 0;
    input{
      height: 40px;
    line-height: 40px;
    width: 100%;
 
    outline: none;
    }
}
.map {
  .el-table {
    border: none !important;
    font-size: 13px;
  }
  .Projectselection {
    padding: 30px;
    color: #fff;
    position: absolute;

    z-index: 2000;
    width: 80%;
    height: 50px;

    left: 50%;
    top: 30px;
    transform: translateX(-50%);
  }
 

  .el-form-item--mini .el-form-item__label {
    line-height: 28px;
    color: #fff;
  }
  .el-table th,
  .el-table tr {
    background-color: rgb(51, 50, 50) ;
    color: #fff;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid #000;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: transparent !important;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: transparent !important;
  }
    
  .pagin {
    margin: 30px;
  }
  .content {
    padding: 30px;
    color: #fff;
    position: absolute;
    border-radius: 10px;
    z-index: 2000;
    width: 90%;
    height: 55%;
    background: rgb(51, 50, 50);
    left: 50%;
    top: 100px;
    transform: translateX(-50%);
    opacity: 0.8;
  }
}

#basicBusinss {
  position: absolute;
  width: 100%;
  height: 100%;
}

.map11 {
  position: absolute;
  border-radius: 5px;
  left: 50px;
  z-index: 2000;
  right: 2px;
  bottom: 50px;
  width: 210px;
  height: 300px;
  background: rgb(51, 50, 50);
  opacity: 0.7;
  .lengedItem {
    height: 50px;
    line-height: 50px;
    padding: 5px;

    span {
      color: #fff;
      height: 50px;
      line-height: 50px;
      display: inline-block;
      margin-left: 10px;
      font-size: 13px;
    }
    img {
      height: 25px;
      line-height: 30px;
      position: relative;
      top: 5px;
      margin-left: 10px;
     
    }
  }
}
.tableHover{    
  tr{
    background-color:#ffffff !important;
    td{background-color:transparent !important} 
  }
  
}

</style>