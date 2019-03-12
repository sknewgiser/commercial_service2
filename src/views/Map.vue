<template>
    <div class="map-container">
        <MapToolbarComponent></MapToolbarComponent>
        <MapCompontnt ref="mapComponent"></MapCompontnt>
        <CellComponent :business="business" @clickBusiness="clickBusiness"></CellComponent>
    </div>
</template>
<script>
    import MapToolbarComponent from "@/components/mapComponents/mapToolbarComponent.vue";
    import MapCompontnt from "@/components/mapComponents/MapCompontnt.vue";
    import CellComponent from "@/components/mapComponents/CellComponent.vue";
    import axios from 'axios';
    export default {
        created: function () {
            this.initData()
        },
        data() {
            return {
                category: 1,
                point:{}
                // business:[]
                // pageIndex: 0,
                // distance:2000,

            };
        },
        methods: {
            clickBusiness(item) {
               this.$refs.mapComponent.showPopup2(item)
            },
            initData(){
                this.category = this.$route.params.category;

                // this.refreshPage(0);
                // axios.get(`http://118.190.78.226:8060/api/poi/list/${this.category}/${this.pageIndex}/${this.distance}`)
                axios.get(`http://118.190.78.226:8060/api/map/${this.category}`)
                    .then((res) => {
                        //将获取到的全部数据存储在vuex中，方便其他组件获取(分页，搜索等功能)
                        this.$store.commit('updateBusiness',res.data)
                        // this.business = res.data
                        // for (let i = 0; i < res.data.length; i++) {
                        //     let r = res.data[i];
                        //     this.addPoi(r);
                        // }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            // refreshPage(pageIndex) {
            //     let self=this;
            //     axios.get(`http://118.190.78.226:8060/api/poi/list/${this.category}/${pageIndex}/${this.distance}`)
            //         .then((res) => {
            //             console.log('轴这了吗')
            //             self.business=res.data;
            //             console.log(self.business)
            //         })
            //         .catch((error) => {
            //             console.log(error)
            //         })
            // }

        },
        computed:{
            business(){
                return this.$store.getters.filterBusiness
            }
        },
        watch: {
            // pageIndex(newVal, oldVal) {
            //     this.refreshPage(newVal);
            // }
        },
        components: {
            MapToolbarComponent,
            MapCompontnt,
            CellComponent
        },
        beforeRouteEnter (to, from, next) {
            next( vm =>{
                vm.$store.commit('updateShowReturnBtn',true)
                // console.log(vm.$store.state.bgColors[to.params.category -1])
                vm.$store.commit('updateTitleBg',vm.$store.state.bgColors[to.params.category -1])
            });
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
        },
        beforeRouteUpdate (to, from, next) {
            this.$router.go(0)            //刷新当前页面，重新渲染地图，获取数据
            next()
            // 在当前路由改变，但是该组件被复用时调用
            // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
            // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
            // 可以访问组件实例 `this`
        },
    };
</script>
<style>
    .map-container{
        height: calc(100% - 0.8rem);
    }
</style>


