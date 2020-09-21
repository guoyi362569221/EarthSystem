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
              return  name+':3个';
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
            value: 523,
            name: '工作中',
            label: {
              normal: {
                formatter: '工作中\n' + Math.round(523 / 821 * 100) + '%',
                textStyle: {
                  fontSize: 20,
                  color: '#fff'
                }
              }
            }
          }, {
            value: 298,
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
            data: ['雨量计', '雪厚计', '空气温度计', '风速风向计','光通量计','土壤温度计','土壤湿度计','裂缝位移','孔隙压移传','变化梯度仪','道应变监测仪','动传感监测仪'],
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
            data: [60, 80, 70, 50,60, 80, 70, 50,60, 80, 70, 50],
          },
        ]
      },
    }
  },
  created() {
    this.$$onResize(this.onResize);
  },
  mounted() {
    let $ = this.$_jQuery
    var html = $(".wrap ul").html()
    $(".wrap ul").append(html).append(html).append(html)
    var ls = $(".wrap li").length / 2 + 1
    let i = 0
    setInterval(function () {
      i++
      if (i == ls) {
        i = 1
        $(".wrap ul").css({ marginTop: 0 })
        $(".wrap ul").animate({ marginTop: -'30' * i + 'px' }, 1000)
      }
      $(".wrap ul").animate({ marginTop: -'30' * i + 'px' }, 1000)
    }, 2400);

    this.initMap();
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
          debugger;
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
            debugger;
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
      debugger
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
    }
  },
  activated: function () {
    this.onResize();
  },

  deactivated: function () {

  },
};
