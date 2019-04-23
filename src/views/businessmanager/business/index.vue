<template>
  <div class="map">
    <div id="basicBusinss"></div>

    <div class="map11" v-if="!showMenu">
      <div class="lengedItem">
        <img src="@/assets/images/4.png" alt>
        <span>路基探测监测系统</span>
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
          <el-select v-model="value" placeholder="请项目">
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
          <el-button type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="type" label="序号" width="80"></el-table-column>
        <el-table-column prop="note" label="建设任务编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="任务备注名" show-overflow-tooltip></el-table-column>

        <el-table-column prop="jd" label="经度" show-overflow-tooltip></el-table-column>
        <el-table-column prop="wd" label="纬度" show-overflow-tooltip></el-table-column>
        <el-table-column prop="height" label="海拔(米)" show-overflow-tooltip></el-table-column>
        <el-table-column label="进度状态修改">
          <template slot-scope="scope">
            <el-select v-model="scope.row.state" placeholder="请选择" size="mini">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="财务明细" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="primary" size="mini">显示财务明细</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="primary" size="mini">上传</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagin">
        <el-row>
          <el-col :span="12">
            <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
          </el-col>
          <el-col :span="8">
            &nbsp; &nbsp; &nbsp;
            <el-button type="primary" size="mini" @click="save()">保存</el-button>
            <el-button type="primary" size="mini" @click="modify()">修改</el-button>
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
  },
  data() {
    return {
      showMenu: true,
      options1: [
        {
          value: '1',
          label: '土建，改造'
        },
        {
          value: '2',
          label: '双堪选'
        },
        {
          value: '3',
          label: '征地'
        },
        {
          value: '4',
          label: '试运行'
        }
      ],
      options: [
        {
          value: '选项1',
          label: '数据传输项目'
        },
        {
          value: '选项2',
          label: '运行管理保障项目'
        },
        {
          value: '选项3',
          label: '信息处理与服务'
        }
      ],

      value: '',
      map: null,
      view: null,
      tableData: [
        {
          type: '1',
          note: 'ut-zw',
          name: '海淀区',
          jd: '232.32323',
          wd: '34343.234343',
          height: '23.3',
          state: '1'
        },
        {
          type: '2',
          note: 'ut-11',
          name: '雁塔区',
          jd: '232.32323',
          wd: '333.234343',
          height: '43.3',
          state: '3'
        },
        {
          type: '3',
          note: 'ut-22',
          name: '房山区',
          jd: '32.32323',
          wd: '33.234343',
          height: '43.3',
          state: '4'
        },
        {
          type: '4',
          note: 'ut-32',
          name: '密云区',
          jd: '32.32323',
          wd: '33.234343',
          height: '43.3',
          state: '3'
        },
        {
          type: '5',
          note: 'ut-62',
          name: '邢台区',
          jd: '42.32323',
          wd: '93.234343',
          height: '43.3',
          state: '3'
        }
      ]
    }
  },
  methods: {
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
              center: [109.71511, 38.09042],
              zoom: 5,
              maxZoom: 9, //最大空间等级
              minZoom: 5 //最小空间等级
            })
            view.on('click', function(e) {
              console.log(e.mapPoint)
            })

            var poinArray = [
              [
                109.97,
                39.73,
                '鄂尔多斯',
                pngOne,
                '鄂尔多斯地震局',
                '综合性',
                '勘察',
                '未进行',

                '23',
                '13433'
              ],
              [
                116.35,
                39.88,
                '北京',
                pngTwo,
                '北京地震局',
                '综合性',
                '征地',
                '未进行',
                '39',
                '13433'
              ],
              [
                116.27,
                39.81,
                '保定',
                pngThree,
                '保定地震局',
                '综合性',
                '建设',
                '未进行',
                '49',
                '13433'
              ],
              [
                112.5935279687474,
                37.903413624250305,
                '太原市',
                pngFouer,
                '太原地震局',
                '综合性',
                '征地',
                '已完成',
                '12',
                '13333'
              ],
              [
                114.48976860545325,
                38.04198261737943,
                '石家庄市',
                pngFive,
                '石家庄地震局',
                '综合性',
                '征地',
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
  .el-input--mini .el-input__inner {
    height: 28px;
    line-height: 28px;
    background: transparent;
    color: #fff;
    background: rgb(51, 50, 50);
    opacity: 0.8;
  }

  .el-form-item--mini .el-form-item__label {
    line-height: 28px;
    color: #fff;
  }
  .el-table th,
  .el-table tr {
    background-color: rgb(51, 50, 50) !important;

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
    height: 80%;
    background: rgb(51, 50, 50);
    left: 50%;
    top: 100px;
    transform: translateX(-50%);
    opacity: 0.7;
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
</style>