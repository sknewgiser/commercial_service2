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

module.exports = {
    devServer:{
        proxy:{
            "/api":{
                target:'http://geohey.com',
                ws: false,
                changeOrigin: true,
                pathRewrite:{
                    '/api': `/s/dataviz/config?ak=MjdiNzliMDYxZTY4NGM5MWI5YjNkYzUyYWE1YjRlMjk&configJson=${escape(JSON.stringify(Config_JZ))}`
                }
            }
        }
    }
}