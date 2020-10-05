import 'echarts';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

import hljJsonData from '../../assets/geojson/hlj.json';
import hhsJsonData from '../../assets/geojson/hhs.json';
import ahqJsonData from '../../assets/geojson/ahq.json';

export default {
  components: {},
  data: function () {
    return {
      hljJsonData: hljJsonData,
      hhsJsonData: hhsJsonData,
      ahqJsonData: ahqJsonData,
      mapOptions: [
        {
          id: 1,
          label: "天地图影像",
          icon: "fa fa-tumblr-square",
          type: "tdt",
          layerId: "tdt_yx",
          url: "https://t3.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=ca9c419b9135b2179d0ff37413bba8b7",
          zIndex: 0
        }, {
          id: 2,
          label: "天地图影像注记",
          icon: "fa fa-tumblr",
          type: "tdt",
          layerId: "tdt_yx_zj",
          url: "https://t3.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=ca9c419b9135b2179d0ff37413bba8b7",
          zIndex: 1
        }, {
          id: 3,
          label: "天地图矢量",
          icon: "fa fa-tumblr-square",
          type: "tdt",
          layerId: "tdt_sl",
          url: "https://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=ca9c419b9135b2179d0ff37413bba8b7",
          zIndex: 2
        }, {
          id: 4,
          label: "天地图矢量注记",
          icon: "fa fa-tumblr",
          type: "tdt",
          layerId: "tdt_sl_zj",
          url: "https://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=ca9c419b9135b2179d0ff37413bba8b7",
          zIndex: 3
        }
      ],
      localInfoObj: {
        locate: "爱辉区",
        location: {
          label: "定位",
          locate: [
            {
              label: "黑龙江省",
              type: "hlj",
              value: [
                [
                  53.561771,
                  135.086930
                ],
                [
                  43.423382,
                  121.173450
                ]
              ]
            },
            {
              label: "黑河市",
              type: "hhs",
              value: [
                [
                  51.001979,
                  129.529445
                ],
                [
                  47.584645,
                  124.741513
                ]
              ]
            },
            {
              label: "爱辉区",
              type: "ahq",
              value: [
                [
                  50.985058,
                  127.671230
                ],
                [
                  49.411932,
                  125.830960
                ]
              ]
            }
          ]
        }
      },
      zoom: 0,
      currBounds: [],
      currType: null,
      showType_popover: false, // 弹出框的关闭
      map: null,
      layerArray: [],
      checkedLayers: [1, 2],
      chart1Options: {
        color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6",],
        legend: {
          bottom: '5',
          x: 'center',
          textStyle: {
            color: '#ffffff',

          },
          data: ['工作中', '异常',],
          formatter: function (name) {
            return name + ' ：0个';
          }
        },
        tooltip: {
          trigger: 'item',
          show: true
        },
        calculable: false,
        series: [{

          type: 'pie',
          radius: ['40%', '70%'],
          color: '#62b62f',
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [{
            value: 0,
            name: '工作中',
            label: {
              normal: {
                formatter: '工作中\n' + Math.round(0 * 100) + '%',
                textStyle: {
                  fontSize: 20,
                  color: '#fff'
                }
              }
            }
          }, {
            value: 0,
            name: '异常',
            label: {
              normal: {
                formatter: function () {
                  return ''
                },
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(255,255,255,.2)'
              },
              emphasis: {
                color: '#fff'
              }
            },
          }]
        }]
      },
      chart2Options: {

        color: ['#87cefa'],
        grid: {
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b}:{c}个"
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: ['雨量计', '雪厚计', '空气温度计', '风速风向计', '光通量计', '土壤温度计', '土壤湿度计', '裂缝位移', '孔隙压移传', '变化梯度仪', '道应变监测仪', '动传感监测仪'],
            axisLine: {
              lineStyle: {
                color: '#87cefa'
              },
            },
            axisLabel: {
              interval: 0,
              rotate: 40,

              textStyle: {
                color: '#fff',
                fontSize: 13
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#87cefa'
              },
            },
            splitLine: {
              "show": false
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              },
              formatter: function (value) {
                return value + "个"
              },
            },
          }
        ],
        series: [
          {
            type: 'bar',
            barWidth: 15,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ]
      },
      staticInfo: {
        ggzs: 0,
        jcdzs: 0,
        sblxzs: 0,
        sbzts: 0,
        lscjsj: 0,
        jrcjsj: 0
      },
      warningInfo: {
        yesterday: {
          "蓝色": 0,
          "黄色": 0,
          "橙色": 0,
          "红色": 0,
          total: 0
        },
        today: {
          "蓝色": 0,
          "黄色": 0,
          "橙色": 0,
          "红色": 0,
          total: 0
        },
      },
      "monitorJCZData": [
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              105.728999,
              33.125539
            ]
          },
          "properties": {
            "name": "水位计",
            "unit": "Kpa",
            "warnType": true,
            "children": [
              {
                "number": "28BAC5A50800002B",
                "name": "ZK5-1.5M",
                "calc": true,
                "calcObj": {
                  "type": "dxsw",
                  "initValue": 81.4,
                  "height": 1.5
                }
              },
              {
                "number": "28154FA508000025",
                "name": "ZK4-2M",
                "calc": true,
                "calcObj": {
                  "type": "dxsw",
                  "initValue": 81.4,
                  "height": 2
                }
              },
              {
                "number": "283DEC450B0000E2",
                "name": "ZK3-14M-N",
                "calc": true,
                "calcObj": {
                  "type": "dxsw",
                  "initValue": 81.4,
                  "height": 14
                }
              },
              {
                "number": "286BC1890A0000EA",
                "name": "ZK3-16M",
                "calc": true,
                "calcObj": {
                  "type": "dxsw",
                  "initValue": 81.4,
                  "height": 16
                }
              },
              {
                "number": "288274A60800006D",
                "name": "ZK2-18M",
                "calc": true,
                "calcObj": {
                  "type": "dxsw",
                  "initValue": 81.4,
                  "height": 18
                }
              },
              {
                "number": "28F762A508000076",
                "name": "ZK1-20M",
                "calc": true,
                "calcObj": {
                  "type": "dxsw",
                  "initValue": 81.4,
                  "height": 20
                }
              }
            ]
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              105.728559,
              33.12332
            ]
          },
          "properties": {
            "name": "电子测斜仪",
            "unit": "无量纲",
            "warnType": true,
            "children": [
              {
                "number": "28F9DD68080000E1",
                "name": "ZK1-S-13M",
                "calc": true,
                "calcObj": {
                  "type": "cxy",
                  "initValue": -2.91,
                  "height": 10000
                },
                "calcSL": true
              },
              {
                "number": "28AB966808000038",
                "name": "ZK1-S-16M",
                "calc": true,
                "calcObj": {
                  "type": "cxy",
                  "initValue": -1.04,
                  "height": 7000
                },
                "calcSL": true
              },
              {
                "number": "283E2368080000FF",
                "name": "ZK1-S-19M",
                "calc": true,
                "calcObj": {
                  "type": "cxy",
                  "initValue": -1.96,
                  "height": 4000
                },
                "calcSL": true
              }
            ]
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              105.731574,
              33.122412
            ]
          },
          "properties": {
            "name": "滑坡位移计",
            "unit": "mm",
            "children": [
              {
                "number": "28E836FB090000E5",
                "name": "HP01"
              }
            ]
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              105.73401,
              33.123814
            ]
          },
          "properties": {
            "name": "雨量计",
            "unit": "mm",
            "children": [
              {
                "number": "28F49100B4040087",
                "name": "01",
                "queryType": "MonitorYLSJDataQuery"
              }
            ]
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              105.730995,
              33.12358
            ]
          },
          "properties": {
            "name": "土壤温湿度(W-TJ7)",
            "unit": "%",
            "ico": "ylz",
            "children": [
              {
                "number": "288E19770A00002C",
                "name": "W-TJ7-0.8m"
              },
              {
                "number": "28B2E2B70A000053",
                "name": "W-TJ7-0.5m"
              },
              {
                "number": "287FDE780A000080",
                "name": "W-TJ7-1.1m"
              },
              {
                "number": "2803E6B80A0000E6",
                "name": "W-TJ7-0.1m"
              },
              {
                "number": "28B218770A000071",
                "name": "W-TJ7-0.3m"
              }
            ]
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              105.732411,
              33.125386
            ]
          },
          "properties": {
            "name": "激光测距仪",
            "unit": "mm",
            "ico": "ylz",
            "children": [
              {
                "number": "28F47206FE0400D7",
                "name": "JGCJY"
              }
            ]
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              105.730255,
              33.124613
            ]
          },
          "properties": {
            "name": "土壤温湿度(W-TJ6)",
            "unit": "%",
            "ico": "ylz",
            "children": [
              {
                "number": "28155DB70A0000AA",
                "name": "W-TJ6-0.8m"
              },
              {
                "number": "28B01BB80A0000F2",
                "name": "W-TJ6-0.35m"
              },
              {
                "number": "28B7C5B70A000011",
                "name": "W-TJ6-0.1m"
              },
              {
                "number": "2853CEB70A000094",
                "name": "W-TJ6-1.1m"
              },
              {
                "number": "287FCAB70A000040",
                "name": "W-TJ6-0.5m"
              }
            ]
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              105.733162,
              33.125036
            ]
          },
          "properties": {
            "name": "冻胀计",
            "unit": "mm",
            "ico": "ylz",
            "children": [
              {
                "number": "286CDF890A0000B1",
                "name": "DZ-TJ6-0.7m"
              }
            ]
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              105.730362,
              33.123167
            ]
          },
          "properties": {
            "name": "土压力计(TJ6)",
            "unit": "Kpa",
            "ico": "ylz",
            "children": [
              {
                "number": "2882C3B60A000407",
                "name": "TJ6-1.1m"
              },
              {
                "number": "2882C3B60A000406",
                "name": "TJ6-0.5m"
              },
              {
                "number": "2882C3B60A000403",
                "name": "TJ6-0.8m"
              },
              {
                "number": "2882C3B60A000402",
                "name": "TJ6-0.3m"
              }
            ]
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              105.72945,
              33.122439
            ]
          },
          "properties": {
            "name": "土压力计(TJ7)",
            "unit": "Kpa",
            "ico": "ylz",
            "children": [
              {
                "number": "2882C3B60A000408",
                "name": "TJ7-0.8m"
              },
              {
                "number": "2882C3B60A000405",
                "name": "TJ7-1.1m"
              },
              {
                "number": "2882C3B60A000404",
                "name": "TJ7-0.3m"
              },
              {
                "number": "2882C3B60A000401",
                "name": "TJ7-0.5m"
              }
            ]
          }
        }
      ]
    }
  },
  created() {
    this.$$onResize(this.onResize);
  },
  mounted() {
    // let $ = this.$_jQuery
    // var html = $(".wrap ul").html()
    // $(".wrap ul").append(html).append(html).append(html)
    // var ls = $(".wrap li").length / 2 + 1
    // let i = 0
    // setInterval(function () {
    //   i++
    //   if (i == ls) {
    //     i = 1
    //     $(".wrap ul").css({ marginTop: 0 })
    //     $(".wrap ul").animate({ marginTop: -'30' * i + 'px' }, 1000)
    //   }
    //   $(".wrap ul").animate({ marginTop: -'30' * i + 'px' }, 1000)
    // }, 2400);

    this.$nextTick(() => {
      this.initMap();
      this.queryMain();
    });
  },
  watch: {
  },
  methods: {
    onResize() {
      if (this.$refs && this.$refs.chart1) {
        this.$refs.chart1.resize();
      }
      if (this.$refs && this.$refs.chart2) {
        this.$refs.chart2.resize();
      }

      /*这里动态计算div的宽高去实现完全自适应*/
      this.$nextTick(() => {
        if (this.map && this.map.invalidateSize) {
          this.map.invalidateSize();
          if (this.currBounds.length > 0) {
            this.map.fitBounds(this.currBounds);
          }
        }
      });
      // setTimeout(() => {
      //   this.$nextTick(() => {

      //   });
      // }, 300);
    },

    /*
    * 地图的初始化
    */
    initMap() {
      let $ = this.$_jQuery
      let that = this;
      //初始化 地图，这个view要设置到离线地图的范围，不然什么都没有
      this.map = L.map("mapDIV", {
        // center: [45.793442, 126.53924],
        crs: L.CRS.EPSG3857, //要使用的坐标参考系统，默认的坐标参考系,互联网地图主流坐标系
        //crs: L.CRS.EPSG4326, //WGS 84坐标系，GPS默认坐标系
        // minZoom: 1,
        zoom: 15,
        attributionControl: false,
        zoomControl: true
      });

      if (that.checkedLayers && that.checkedLayers.length > 0) {
        for (let i = 0; i < that.mapOptions.length; i++) {
          for (let j = 0; j < that.checkedLayers.length; j++) {
            if (that.mapOptions[i].id === that.checkedLayers[j]) {
              switch (that.mapOptions[i].type) {
                case "tdt":
                  var layer = L.tileLayer(that.mapOptions[i].url, {
                    maxZoom: 21,
                    id: that.mapOptions[i].layerId,
                    zIndex: that.mapOptions[i].zIndex
                  });
                  that.map.addLayer(layer);
                  that.layerArray.push(layer);
                  break;
                case "MapServer":
                  // var dynamicLayer = esri.dynamicMapLayer({
                  //     id:that.mapOptions[i].layerId,
                  //     url:that.mapOptions[i].url,
                  //     f:'json',
                  //     zIndex:that.mapOptions[i].zIndex
                  // });
                  // this.map.addLayer(dynamicLayer);
                  // that.layerArray.push(dynamicLayer);
                  break;
                case "tile":
                  var layerTile = L.tileLayer(that.mapOptions[i].url, {
                    maxZoom: 21,
                    id: that.mapOptions[i].layerId,
                    zIndex: that.mapOptions[i].zIndex
                  });
                  that.map.addLayer(layerTile);
                  that.layerArray.push(layerTile);
                  break;
              }
            }
          }
        }
      }
      this.borderLayer = L.layerGroup().addTo(this.map);
      let localInfo = that.getLocalInfo();
      if (localInfo) {
        this.map.fitBounds(localInfo['value']);
        this._drawBorderLayer(localInfo['type']);
      }
      that.markInfos = [];
      var markerLayer = new L.LayerGroup();
      L.geoJson(this.monitorJCZData, {
        pointToLayer: function (feature) {
          let children = feature.properties.children;
          let unit = feature.properties.unit;
          var name = feature.properties.name;
          that.markInfos = that.markInfos.concat(children);
          let tabStr = "";
          for (let i = 0; i < children.length; i++) {
            if (i == 0) {
              tabStr += '<div attr-number=' + children[i]["number"] + ' attr-name=' + name + ' attr-unit=' + unit + ' class="popuCustomerPanelTabItem popuCustomerPanelTabItemChecked">' + children[i]["name"] + '</div>';
            } else {
              tabStr += '<div attr-number=' + children[i]["number"] + ' attr-name=' + name + ' attr-unit=' + unit + ' class="popuCustomerPanelTabItem">' + children[i]["name"] + '</div>';
            }

          }

          var ico = feature.properties.ico;
          var iconPath = require("./assets/images/clz.png");
          if (ico) {
            iconPath = require("./assets/images/" + ico + ".png");
          }
          let myIcon = L.icon({
            iconUrl: iconPath,
            shadowUrl: require('./assets/images/shadow.png'),
            iconSize: [18, 25],
            iconAnchor: [7, 25],
            popupAnchor: [1, -20],
            shadowSize: [25, 25]
          });
          var marker = L.marker(L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]), { icon: myIcon, title: name });
          var content = '<div class="popuCustomerPanel">' +
            '<div class="popuCustomerPanelTitle">' + name + '</div>' +
            '<div class="popuCustomerPanelTab">' +
            tabStr +
            '</div>' +
            '<div class="popuCustomerPanelContent" id="markerPop_Panels' + name + '"></div>' +
            '</div>';
          marker.bindPopup(content, {});
          marker.on('click', function () {
            setTimeout(() => {
              // this.$nextTick(() => {
              //     let name = $(".popuCustomerPanelTabItem").eq(0).attr("attr-name");
              //     let unit = $(".popuCustomerPanelTabItem").eq(0).attr("attr-unit");
              //     that.markerPopuFun(children[0],name,unit);
              // });
              let name = $(".popuCustomerPanelTabItem").eq(0).attr("attr-name");
              let unit = $(".popuCustomerPanelTabItem").eq(0).attr("attr-unit");
              let number = $(".popuCustomerPanelTabItem").eq(0).attr("attr-number");

              //that.markerPopuFun(children[0],name,unit);
              for (let i = 0; i < that.markInfos.length; i++) {
                if (that.markInfos[i]["number"] === number) {
                  that.markerPopuFun(that.markInfos[i], name, unit);
                  break;
                }
              }
            }, 300);

          })
          markerLayer.addLayer(marker);
        }
      });
      this.map.addLayer(markerLayer);

      $("body").on("click", ".popuCustomerPanelTabItem", function () {
        // let obj = $(".popuCustomerPanelTabItem").attr("attr-index");//.attr-index
        $(".popuCustomerPanelTabItem").removeClass("popuCustomerPanelTabItemChecked");
        let index = $(".popuCustomerPanelTabItem").index(this);//.attr-index
        $(".popuCustomerPanelTabItem").eq(index).addClass("popuCustomerPanelTabItemChecked");
        let name = $(".popuCustomerPanelTabItem").eq(index).attr("attr-name");
        let unit = $(".popuCustomerPanelTabItem").eq(index).attr("attr-unit");
        let number = $(".popuCustomerPanelTabItem").eq(index).attr("attr-number");

        for (let i = 0; i < that.markInfos.length; i++) {
          if (that.markInfos[i]["number"] === number) {
            that.markerPopuFun(that.markInfos[i], name, unit);
            break;
          }
        }
      })
    },

    _drawBorderLayer(type) {
      if (this.map) {
        let borderJsonData = null;
        if (this.borderLayer && type) {
          this.borderLayer.clearLayers();
          borderJsonData = this[type + "JsonData"].features;

          L.geoJSON(borderJsonData, {
            style: function () {
              return {
                color: '#BCAE18',
                fillOpacity: 0,
                weight: 5
              };
            }
          }).addTo(this.borderLayer);

          L.geoJSON(borderJsonData, {
            style: function () {
              return {
                color: '#1D9004',
                fillOpacity: 0,
                weight: 1
              };
            }
          }).addTo(this.borderLayer);
        }

      }
    },

    /*
    * 切换区域
    */
    onLocationChange(bound) {
      if (bound) {
        this.currBounds = bound.value;
        this.currType = bound.type;
        this.localInfoObj.locate = bound["label"]
        if (this.map) {
          this.map.fitBounds(this.currBounds);
          this._drawBorderLayer(this.currType);
        }
      }

    },

    getLocalInfo() {
      let that = this;
      let obj = null;
      if (that.localInfoObj) {
        let locate = that.localInfoObj.locate;
        for (let i = 0; i < that.localInfoObj.location.locate.length; i++) {
          let label = that.localInfoObj.location.locate[i]['label'];
          if (locate === label) {
            obj = that.localInfoObj.location.locate[i];
            break;
          }
        }
      }
      return obj;
    },

    onLayerChange(data) {
      let that = this;
      if (data) {
        let id = data['id'];
        let layerId = data['layerId'];
        let url = data['url'];
        let layerzIndex = data['zIndex'];
        let type = data['type'];
        let isChecked = false;
        if (that.checkedLayers.length > 0) {
          for (let i = 0; i < that.checkedLayers.length; i++) {
            if (id === that.checkedLayers[i]) {
              isChecked = true;
              break;
            }
          }
        }
        switch (type) {
          case "tdt":
            if (isChecked) {
              let layer = L.tileLayer(url, {
                maxZoom: 21,
                id: layerId,
                zIndex: layerzIndex
              });
              that.map.addLayer(layer);
              that.layerArray.push(layer);
            } else {
              if (that.layerArray && that.layerArray.length > 0) {
                for (let i = 0; i < that.layerArray.length; i++) {
                  if (that.layerArray[i]["options"].id === layerId) {
                    that.map.removeLayer(that.layerArray[i]);
                    that.layerArray.splice(i, 1);
                  }
                }
              }
            }
            break;
          case "MapServer":
            if (isChecked) {
              // let dynamicLayer = esri.dynamicMapLayer({
              //             id:layerId,
              //             url:url,
              //             f:'json',
              //             zIndex:layerzIndex
              //         });
              // that.map.addLayer(dynamicLayer);
              // that.layerArray.push(dynamicLayer);
              // // dynamicLayer.setOpacity(0.5);
            } else {
              if (that.layerArray && that.layerArray.length > 0) {
                for (let i = 0; i < that.layerArray.length; i++) {
                  if (that.layerArray[i]["options"].id === layerId) {
                    that.map.removeLayer(that.layerArray[i]);
                    that.layerArray.splice(i, 1);
                  }
                }
              }
            }
            break;
          case "tile":
            if (isChecked) {
              let layerTile = L.tileLayer(url, {
                maxZoom: 21,
                id: layerId,
                zIndex: layerzIndex
              });
              that.map.addLayer(layerTile);
              that.layerArray.push(layerTile);
            } else {
              if (that.layerArray && that.layerArray.length > 0) {
                for (let i = 0; i < that.layerArray.length; i++) {
                  if (that.layerArray[i]["options"].id === layerId) {
                    that.map.removeLayer(that.layerArray[i]);
                    that.layerArray.splice(i, 1);
                  }
                }
              }
            }
            break;
        }
      }
    },

    queryMain() {
      let that = this;
      //查询设备类型总数和设备总台数
      that.$$SbCount({
        data: {},
        fn: function (data) {
          if (data) {
            that.staticInfo.sblxzs = data['lxCount'];
            that.staticInfo.sbzts = data['sbCount'];
          }
        },
        errFun: function () {
          that.staticInfo.sblxzs = 0;
          that.staticInfo.sbzts = 0;
        }
      });
      //历史采集数据和今日采集数据
      that.$$DataCount({
        data: {},
        fn: function (data) {
          if (data) {
            that.staticInfo.lscjsj = data['allCount'];
            that.staticInfo.jrcjsj = data['todayCount'];
          }
        },
        errFun: function () {
          that.staticInfo.lscjsj = 0;
          that.staticInfo.jrcjsj = 0;
        }
      });
      //仪器状态统计
      that.$$StatusCount({
        fn: function (data) {
          if (data) {
            // that.staticInfo.sblxzs = data['lxCount'];
            // that.staticInfo.sbzts = data['sbCount'];
            let ycCount = data['ycCount'];
            let zcCount = data['zcCount'];
            that.chart1Options = {
              color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6",],
              legend: {
                bottom: '5',
                x: 'center',
                textStyle: {
                  color: '#ffffff',

                },
                data: ['工作中', '异常',],
                formatter: function (name) {
                  if (name === '工作中') {
                    return name + '：' + zcCount + '个';
                  } else if (name === '异常') {
                    return name + '：' + ycCount + '个';
                  }
                }
              },
              tooltip: {
                trigger: 'item',
                show: true
              },
              calculable: false,
              series: [{

                type: 'pie',
                radius: ['40%', '70%'],
                color: '#62b62f',
                label: {
                  normal: {
                    position: 'center'
                  }
                },
                data: [{
                  value: zcCount,
                  name: '工作中',
                  label: {
                    normal: {
                      formatter: '工作中\n' + Math.round((zcCount + ycCount) === 0 ? 0 : (zcCount / (zcCount + ycCount) * 100)) + '%',
                      textStyle: {
                        fontSize: 20,
                        color: '#fff'
                      }
                    }
                  }
                }, {
                  value: ycCount,
                  name: '异常',
                  label: {
                    normal: {
                      formatter: function () {
                        return ''
                      },
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: 'rgba(255,255,255,.2)'
                    },
                    emphasis: {
                      color: '#fff'
                    }
                  },
                }]
              }]
            }
          } else {
            that.chart1Options = {
              color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6",],
              legend: {
                bottom: '5',
                x: 'center',
                textStyle: {
                  color: '#ffffff',

                },
                data: ['工作中', '异常',],
                formatter: function (name) {
                  return name + ' ：0个';
                }
              },
              tooltip: {
                trigger: 'item',
                show: true
              },
              calculable: false,
              series: [{

                type: 'pie',
                radius: ['40%', '70%'],
                color: '#62b62f',
                label: {
                  normal: {
                    position: 'center'
                  }
                },
                data: [{
                  value: 0,
                  name: '工作中',
                  label: {
                    normal: {
                      formatter: '工作中\n' + Math.round(0 * 100) + '%',
                      textStyle: {
                        fontSize: 20,
                        color: '#fff'
                      }
                    }
                  }
                }, {
                  value: 0,
                  name: '异常',
                  label: {
                    normal: {
                      formatter: function () {
                        return ''
                      },
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: 'rgba(255,255,255,.2)'
                    },
                    emphasis: {
                      color: '#fff'
                    }
                  },
                }]
              }]
            }
          }
        },
        errFun: function () {
          that.chart1Options = {
            color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6",],
            legend: {
              bottom: '5',
              x: 'center',
              textStyle: {
                color: '#ffffff',

              },
              data: ['工作中', '异常',],
              formatter: function (name) {
                return name + ' ：0个';
              }
            },
            tooltip: {
              trigger: 'item',
              show: true
            },
            calculable: false,
            series: [{

              type: 'pie',
              radius: ['40%', '70%'],
              color: '#62b62f',
              label: {
                normal: {
                  position: 'center'
                }
              },
              data: [{
                value: 0,
                name: '工作中',
                label: {
                  normal: {
                    formatter: '工作中\n' + Math.round(0 * 100) + '%',
                    textStyle: {
                      fontSize: 20,
                      color: '#fff'
                    }
                  }
                }
              }, {
                value: 0,
                name: '异常',
                label: {
                  normal: {
                    formatter: function () {
                      return ''
                    },
                  }
                },
                itemStyle: {
                  normal: {
                    color: 'rgba(255,255,255,.2)'
                  },
                  emphasis: {
                    color: '#fff'
                  }
                },
              }]
            }]
          }
        }
      });
      //设备类型统计
      that.$$SbTypeCountStatistic({
        data: {},
        fn: function (data) {
          if (data) {
            let keys = [];
            let values = [];
            for (let key in data) {
              keys.push(key);
              values.push(data[key]);
            }
            that.chart2Options = {
              color: ['#87cefa'],
              grid: {
                left: '2%',
                right: '2%',
                bottom: '2%',
                containLabel: true
              },
              tooltip: {
                trigger: 'item',
                formatter: "{b}:{c}个"
              },
              calculable: true,
              xAxis: [
                {
                  type: 'category',
                  data: keys,
                  axisLine: {
                    lineStyle: {
                      color: '#87cefa'
                    },
                  },
                  axisLabel: {
                    interval: 0,
                    rotate: 40,

                    textStyle: {
                      color: '#fff',
                      fontSize: 12
                    }
                  }
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  axisLine: {
                    lineStyle: {
                      color: '#87cefa'
                    },
                  },
                  splitLine: {
                    "show": false
                  },
                  axisLabel: {
                    textStyle: {
                      color: '#fff'
                    },
                    formatter: function (value) {
                      return value + "个"
                    },
                  },
                }
              ],
              series: [
                {
                  type: 'bar',
                  barWidth: 15,
                  data: values
                },
              ]
            }
          } else {
            that.chart2Options = {
              color: ['#87cefa'],
              grid: {
                left: '2%',
                right: '2%',
                bottom: '2%',
                containLabel: true
              },
              tooltip: {
                trigger: 'item',
                formatter: "{b}:{c}个"
              },
              calculable: true,
              xAxis: [
                {
                  type: 'category',
                  data: ['雨量计', '雪厚计', '空气温度计', '风速风向计', '光通量计', '土壤温度计', '土壤湿度计', '裂缝位移', '孔隙压移传', '变化梯度仪', '道应变监测仪', '动传感监测仪'],
                  axisLine: {
                    lineStyle: {
                      color: '#87cefa'
                    },
                  },
                  axisLabel: {
                    interval: 0,
                    rotate: 40,

                    textStyle: {
                      color: '#fff',
                      fontSize: 13
                    }
                  }
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  axisLine: {
                    lineStyle: {
                      color: '#87cefa'
                    },
                  },
                  splitLine: {
                    "show": false
                  },
                  axisLabel: {
                    textStyle: {
                      color: '#fff'
                    },
                    formatter: function (value) {
                      return value + "个"
                    },
                  },
                }
              ],
              series: [
                {
                  type: 'bar',
                  barWidth: 15,
                  data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                },
              ]
            }
          }
        },
        errFun: function () {
          that.chart2Options = {
            color: ['#87cefa'],
            grid: {
              left: '2%',
              right: '2%',
              bottom: '2%',
              containLabel: true
            },
            tooltip: {
              trigger: 'item',
              formatter: "{b}:{c}个"
            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
                data: ['雨量计', '雪厚计', '空气温度计', '风速风向计', '光通量计', '土壤温度计', '土壤湿度计', '裂缝位移', '孔隙压移传', '变化梯度仪', '道应变监测仪', '动传感监测仪'],
                axisLine: {
                  lineStyle: {
                    color: '#87cefa'
                  },
                },
                axisLabel: {
                  interval: 0,
                  rotate: 40,

                  textStyle: {
                    color: '#fff',
                    fontSize: 13
                  }
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                axisLine: {
                  lineStyle: {
                    color: '#87cefa'
                  },
                },
                splitLine: {
                  "show": false
                },
                axisLabel: {
                  textStyle: {
                    color: '#fff'
                  },
                  formatter: function (value) {
                    return value + "个"
                  },
                },
              }
            ],
            series: [
              {
                type: 'bar',
                barWidth: 15,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              },
            ]
          }
        }
      });
      //报警信息统计
      that.$$WarningCount({
        data: {},
        fn: function (data) {
          if (data) {
            that.warningInfo = data;
          } else {
            that.warningInfo = {
              yesterday: {
                "蓝色": 0,
                "黄色": 0,
                "橙色": 0,
                "红色": 0,
                total: 0
              },
              today: {
                "蓝色": 0,
                "黄色": 0,
                "橙色": 0,
                "红色": 0,
                total: 0
              },
            }
          }
        },
        errFun: function () {
          that.warningInfo = {
            yesterday: {
              "蓝色": 0,
              "黄色": 0,
              "橙色": 0,
              "红色": 0,
              total: 0
            },
            today: {
              "蓝色": 0,
              "黄色": 0,
              "橙色": 0,
              "红色": 0,
              total: 0
            },
          }
        }
      });
    }
  },
  activated: function () {
    this.onResize();
  },

  deactivated: function () {

  },
};
