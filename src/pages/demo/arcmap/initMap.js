import esriLoader from 'esri-loader'

// 使用单例模式(饿汉式)来创建地图
//   1. 私有构造函数 => 不允许通过 new 来创造对象 (ES6里做不到)
//   2. 私有静态属性 => 存储单例
//   3. 共有静态方法 => 用于生成单例
class TMap {
    constructor() {
        this.map = null
        this.mapView = null
        this.modules = null
        this.ready = false
        this.init()
    }
    // 3. 共有静态方法
    static getInstance() {
        if (!this.instantce) {  // 在 es6 的 static 修饰的静态方法内, this 指向类本身
            this.instantce = new TMap() // 静态属性（可惜不私有，外部可读可写）
        }
        return this.instantce
    }
    init() {
        esriLoader.loadModules([
            'esri/Map',
            'esri/views/MapView', 
            'esri/layers/FeatureLayer',
            'esri/layers/GraphicsLayer',
            'esri/widgets/BasemapToggle',
            'esri/widgets/BasemapGallery',
            'esri/widgets/Locate'])
        .then(([Map, MapView,
                FeatureLayer, GraphicsLayer, 
                BasemapToggle, BasemapGallery, 
                Locate]) => {
            // 创建地图
            this.map = new Map({
                basemap: 'topo-vector'
            })
            this.mapView = new MapView({
                container: document.getElementById('mapContainer'),
                map: this.map,
                // center: [-118.80500, 34.02700],
                center: [119.572, 31.244],
                zoom: 6
            })
            // 并将已加载的类（Map, MapView等）挂到对象实例上
            this.modules = {
                Map, MapView,
                FeatureLayer, GraphicsLayer, 
                BasemapToggle, BasemapGallery,
                Locate
            }
            this.ready = true
        })
    }
    static destroy() {
        this.instantce = null
    }
}
// 2. 静态属性 => 存储单例
TMap.getInstance()

export default TMap