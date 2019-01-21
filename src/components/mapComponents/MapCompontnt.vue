<template>
    <div class="map-box">
        <div class="map-tool">
            <div class="zoom-in zoom" v-on:click="zoomIn()">
                <div class="zoom-in-icon"></div>
            </div>
            <div class="zoom-out zoom" v-on:click="zoomOut()">
                <div class="zoom-out-icon">

                </div>
            </div>
        </div>
        <div class="map-position">
            <div class="map-position-bg"></div>
        </div>
        <div class="map-basemap">
            <van-icon name="bars" size="24px" />
        </div>
        <div id="map">

        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import 'geohey-javascript-sdk/dist/lib/g.css'    // 样式
    import G from 'geohey-javascript-sdk'
    import 'geohey-javascript-sdk/dist/lib/g-canvas.min.js'        // canvas模块
    import 'geohey-javascript-sdk/dist/lib/g-cluster.min.js'    // 样式

    const LOCATION_RES = 16.777314267822266;
    export default {

        mounted: function () {
            this.map = new G.Map('map', {
                wrap: false,
                continuouslyZoom: false, //是否允许无极缩放
                recordStatus: false, //是否在浏览器历史中记录每一次更新的状态
                hideLogo: true,
                initStatus: {
                    center: [12968114.338130439, 4829957.679657917],
                    res: 152.8740565703125,
                    rotate: 0 //旋转角度
                }
            });
            let tileLayer = new G.Layer.Tile('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                cluster: ['a', 'b', 'c']
            });
            tileLayer.addTo(this.map);


            // 聚类
            // this.graphicLayer = new G.Layer.Graphic();
            // this.graphicLayer.addTo(this.map);
            // this.graphicLayer.bringToTop();
            // this.graphicLayer.addListener('graphicClicked', this.onGraphicClicked);


            // this.clusterLayer = new G.Layer.Cluster({
            //     clusterClickable: true,
            //     pointClickable: true,
            //     breakValues: [3, 5, 10]
            // });
            // this.clusterLayer.addTo(this.map);
            // this.clusterLayer.addListener('clusterClicked', this.onClusterClicked);		
            // this.map.redraw();


            // 边界
            const AK = 'MjdiNzliMDYxZTY4NGM5MWI5YjNkYzUyYWE1YjRlMjk';
            var SITE_CLUSTER = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'];
            const Config_JZ = [
                {
                    "dataUid": "b303de501aec11e9a1f44f7f7e34dd86",
                    "dataType": "private",
                    "vizConfig": {
                        "type": "polygon-simple",
                        "labelField": null,
                        "labelColor": "#000000",
                        "labelFont": "Microsoft YaHei Regular",
                        "labelSize": 12,
                        "labelDx": 0,
                        "labelDy": 0,
                        "labelHaloColor": "#fff",
                        "labelAllowOverlap": false,
                        "labelPlacement": "point",
                        "blendingMode": "src-over",
                        "fillColor": "#ffffff",
                        "fillOpacity": 0,
                        "outlineColor": "#9b9b9b",
                        "outlineOpacity": 0.6,
                        "outlineWidth": 1
                    }
                },
                {
                    "dataUid": "45feeed01aec11e99305859116f02652",
                    "dataType": "private",
                    "vizConfig": {
                        "type": "polygon-simple",
                        "labelField": null,
                        "labelColor": "#000000",
                        "labelFont": "Microsoft YaHei Regular",
                        "labelSize": 12,
                        "labelDx": 0,
                        "labelDy": 0,
                        "labelHaloColor": "#fff",
                        "labelAllowOverlap": false,
                        "labelPlacement": "point",
                        "blendingMode": "src-over",
                        "fillColor": "#7030a0",
                        "fillOpacity": 0,
                        "outlineColor": "#4c4c4c",
                        "outlineOpacity": 1,
                        "outlineWidth": 1
                    }
                }
            ];
            axios.get('http://geohey.com/s/dataviz/config?ak=MjdiNzliMDYxZTY4NGM5MWI5YjNkYzUyYWE1YjRlMjk&configJson=' + escape(JSON.stringify(Config_JZ)))
                .then(res => {
                    const url = "http://geohey.com/s/dataviz/" + res.data.data.vizId
                        + '/{z}/{x}/{y}.png?ak=' + AK + '&retina=@2x&useCache=false';
                    let LinesCacheLayer = new G.Layer.Tile(url, {
                        crossOrigin: '',
                        cluster: SITE_CLUSTER
                    });
                    LinesCacheLayer.addTo(this.map);
                    this.graphicLayer.bringToTop();
                })
                .catch(err => {
                    console.log(err)
                })

        },
        created: function () {
            //获取当前的category
            // console.log(this.$route.params.category)
            this.category = this.$route.params.category;
        },

        methods: {
            addPoi: function (r) {
                let webmercator = G.Proj.WebMercator.project(r.lon, r.lat);
                let g = new G.Graphic.Point([webmercator[0], webmercator[1]], r, {
                    shape: 'circle',
                    size: [5, 5],
                    offset: [0, 0],
                    fillColor: '#5b709b',
                    clickable: true
                });
                g.addTo(this.graphicLayer, r.id, true);
                // this.clusterLayer.addPoint(g);
            },
            onGraphicClicked(e) {
                let g = e.graphic;
                let anchorPoint = g.geom;
                this.zoomToLocation(anchorPoint);
                let contenthtml = this.getPopupHtml(g.attrs);
                this.map.showPopup(anchorPoint, contenthtml);
            },
            getPopupHtml(obj) {
                const category = this.$route.params.category;
                let html = '';
                this.showAttrs[category - 1].forEach(key => {
                    html += `<p> <span>${key[0]}:</span><span>${obj[key[1]]}</span></p>`
                })
                console.log(obj)
                console.log(html)
                // let html = '<table class="tab_list_bd"><tbody>' +
                //     '<tr"><td  style="white-space:nowrap">' + obj.name + '</td></tr>' +
                //     '</tbody></table>';


                return html;
            },
            zoomIn() {
                if (this.map) {
                    this.map.zoomIn();
                }
            },
            zoomOut() {
                if (this.map) {
                    this.map.zoomOut();
                }
            },
            showPopup(item) {
                //1、从graphiclayer图层中获取graphic
                let g = this.graphicLayer.get(item.id);
                //显示popup
                let anchorPoint = g.geom;
                this.zoomToLocation(anchorPoint);
                let contenthtml = this.getPopupHtml(g.attrs);
                this.map.showPopup(anchorPoint, contenthtml);
            },
            zoomToLocation(location) {
                if (location) {
                    let newLocation = [location[0], location[1] - 1000];
                    this.map.zoomRes(newLocation, LOCATION_RES);
                    this.map.update();
                }
            }

        },
        computed: {
            business() {
                return this.$store.state.business
            }
        },
        watch: {
            business(newVal, oldVal) {
                if (newVal.length > 0) {
                    for (let i = 0; i < newVal.length; i++) {
                        let r = newVal[i];
                        this.addPoi(r);
                    }
                }
            }
        },
        data: function () {
            return {
                map: null,
                graphicLayer: null,
                category: 1,
                pageIndex: 0,
                distance: 2000,
                showAttrs: [           //'商圈','蔬菜零售终端','综合体购物中心','便利店'
                    [['名称', 'name'], ['类别', 'ctype']],
                    [['名称', 'name'], ['类别', 'ctype']],
                    [['名称', 'name'], ['类别', 'ctype']],
                    [['名称', 'name'], ['类别', 'ctype']]
                ]
            };
        }
    }

</script>

<style scoped lang="scss">
    $iconWidth: 36px;
    $iconHeight: 36px;
    $borderRadius:4px;
    $boxShadow:0 0 5px rgba(0, 0, 0, .2);
    #map {
        background: #233;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
    .map-box {
        position: relative;
        height: calc(100% - 1rem);
        overflow: hidden;
    }
    .map-tool {
        position: absolute;
        left: 10px;
        top: 0;
        z-index: 1;

    }
    .zoom {
        background: #fff;
        width: 36px;
        height: 36px;
        box-shadow: $boxShadow;
        cursor: pointer;
        overflow: hidden;
        margin-top: 10px;
        border-radius: $borderRadius;
    }
    .zoom-in-icon, .zoom-out-icon {
        background-image: url("../../assets/images/mapZoom2x.png");
        width: 10px;
        height: 10px;
        margin: 12px auto;
        background-size: cover;
    }
    .zoom-in-icon {
        background-position: 0 0;
    }
    .zoom-out-icon {
        background-position: -10px 2px;
    }
    .map-box /deep/ .g-popup-content-wrapper {
        width: 42.5vw;
    }
    .map-box /deep/ .van-pagination__item, .map-box /deep/ .van-pagination__page-desc {
        height: 0.8rem;
        line-height: 0.8rem;
    }
    .map-position {
        position: absolute;
        left: 10px;
        bottom: 60px;
        width: $iconWidth;
        height: $iconHeight;
        z-index: 1;
        border-radius: $borderRadius;
        box-shadow: $boxShadow;
        background-color: #fff;
    }
    .map-position-bg {
        background-image: url("../../assets/images/map-icons.png"); /*  图片宽高比   1 ： 3   */
        background-position: 0 0;
        background-size: 26px 78px;
        background-repeat: no-repeat;
        width: 26px;
        height: 26px;
        margin: 5px auto;
    }
    .map-basemap {
        position: absolute;
        right: 10px;
        bottom: 60px;
        z-index: 1;
        background: #fff;
        width: $iconWidth;
        height: $iconHeight;
        border-radius: $borderRadius;
        box-shadow: $boxShadow;
        text-align: center;
        padding: 6px 0;
        box-sizing: border-box;
    }
</style>