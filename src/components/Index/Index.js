import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

export default {
  name: "Index",
  components: {},
  data: function () {
    return {
      map: null,
      layerArray: [],
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

      checkedLayers: [1, 2],

      treeData: [{
        id: 1,
        label: 'GNNS监测站点',
        children: [{
          id: 4,
          label: 'GNNS监测站点1',
          children: []
        },
        {
          id: 5,
          label: 'GNNS监测站点2',
          children: []
        },
        {
          id: 6,
          label: 'GNNS监测站点3',
          children: []
        },{
          id: 7,
          label: 'GNNS监测站点4',
          children: []
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  created() {
    this.$$onResize(this.onResize);

    this.$nextTick(() => {
      this.initMap();
    });
  },
  mounted() {

  },
  watch: {
  },
  methods: {
    /*
        * 地图的初始化
        */
    initMap() {
      let that = this;

      // var url0 = "http://192.168.3.121/imgServer/{z}/{x}/{y}.png";
      // var url_zj0 = "http://localhost/imgServer_ZJ/{z}/{x}/{y}.png";
      // var url = "https://t3.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=fb1bfb9e06cd7681813a42f4c934e1ea";
      // var url_zj = "https://t5.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=fb1bfb9e06cd7681813a42f4c934e1ea";
      //初始化 地图，这个view要设置到离线地图的范围，不然什么都没有
      this.map = L.map("mapDiv", {
        center: [45.793442, 126.53924],
        crs: L.CRS.EPSG3857, //要使用的坐标参考系统，默认的坐标参考系,互联网地图主流坐标系
        //crs: L.CRS.EPSG4326, //WGS 84坐标系，GPS默认坐标系
        // minZoom: 1,
        zoom: 15,
        attributionControl: false,
        zoomControl:false
      });

      if (that.checkedLayers && that.checkedLayers.length > 0) {
        for (let i = 0; i < that.mapOptions.length; i++) {
          for (let j = 0; j < that.checkedLayers.length; j++) {
            if (that.mapOptions[i].id === that.checkedLayers[j]) {
              debugger
              switch (that.mapOptions[i].type) {
                case "tdt":
                  var layer = L.tileLayer(that.mapOptions[i].url, {
                    maxZoom: 21,
                    minZoom: 5,
                    id: that.mapOptions[i].layerId,
                    zIndex: that.mapOptions[i].zIndex
                  });
                  that.map.addLayer(layer);
                  that.layerArray.push(layer);

                  break;
                case "MapServer":
                  // var dynamicLayer = esri.dynamicMapLayer({
                  //   id: that.mapOptions[i].layerId,
                  //   url: that.mapOptions[i].url,
                  //   f: 'json',
                  //   zIndex: that.mapOptions[i].zIndex
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

            // use event
      var mypop = L.popup();
      this.map.on('click', function(e) {
        var content = '你临幸了这个点：<br>';
        content += e.latlng.toString();
        mypop.setLatLng(e.latlng)
            .setContent(content)
            .openOn(that.map);
      });


  //     var normalMapm = L.tileLayer('http://t3.tianditu.com/vec_c/wmts?layer=vec&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=ca9c419b9135b2179d0ff37413bba8b7', {
  //           maxZoom: 18,
  //           minZoom: 5,
  //           zoomOffset: 1
  //       })
  //       var normalMapa = L.tileLayer('http://t0.tianditu.gov.cn/cva_c/wmts?layer=cva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=ca9c419b9135b2179d0ff37413bba8b7', {
  //           maxZoom: 18,
  //           minZoom: 5,
  //           zoomOffset: 1
  //       })
 
  //       var imgMapm = L.tileLayer('http://t0.tianditu.gov.cn/img_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=ca9c419b9135b2179d0ff37413bba8b7', {
  //           maxZoom: 18,
  //           minZoom: 5,
  //           zoomOffset: 1
  //       })
  //       var imgMapa = L.tileLayer('http://t0.tianditu.gov.cn/cia_c/wmts?layer=cia&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=ca9c419b9135b2179d0ff37413bba8b7', {
  //           maxZoom: 18,
  //           minZoom: 5,
  //           zoomOffset: 1
  //       })
  //  var normalMap = L.layerGroup([normalMapm, normalMapa]),
  //           imgMap = L.layerGroup([imgMapm, imgMapa]);
  //       var baseLayers = { "行政": normalMap ,"卫星":imgMap};
 
  //       var overlayLayers = {
  //       }
 
  //       var map = L.map("mapDiv", {
  //           crs: L.CRS.EPSG4326,
  //           center: [27.335483, 103.785457],
  //           zoom: 5,
  //           layers: [imgMap],
  //           zoomControl: false
  //       });
  //       L.control.layers(baseLayers, overlayLayers).addTo(map);
  //       L.control.zoom({
  //           zoomInTitle: '放大',
  //           zoomOutTitle: '缩小'
  //       }).addTo(map);
    },
    onResize() {
    },
  },
  activated: function () {
    this.onResize();
  },

  deactivated: function () {

  },
};
