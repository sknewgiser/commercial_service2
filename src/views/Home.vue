<template>
    <div class="home">
        <ul class="list list-top">
            <router-link to='/map/1' class="icon bl" tag="li" :style='{"background":bgColors[0]}'><img
                    src="../assets/images/trade.png"><span>商圈</span></router-link>
            <router-link to='/map/3' class="icon bt bl" tag="li" :style='{"background":bgColors[2]}'><img
                    src="../assets/images/shop.png"><span>综合体购物中心</span></router-link>


        </ul>
        <ul class="list list-bottom ">
            <router-link to='/map/4' class="icon" tag="li" :style='{"background":bgColors[3]}'><img
                    src="../assets/images/store.png"><span>便利店</span></router-link>
            <router-link to='/map/2' class="icon bt" tag="li" :style='{"background":bgColors[1]}'><img
                    src="../assets/images/vegetable.png"><span>蔬菜零售终端</span></router-link>

        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [
                    {name: '便利店', id: 4},
                    {name: '商圈', id: 1},
                    {name: '蔬菜零售终端', id: 2},
                    {name: '综合物体购物中心', id: 3}
                ],
                styleStore: {
                    'background-color': '#5bc5d5'
                },
                styleTrade: {
                    'background-color': '#1296db'
                },
                styleVegetable: {
                    'background-color': '#68cf3f'
                },
                styleShop: {
                    'background-color': '#ec8649'
                }

            }
        },
        methods: {},
        computed:{
            bgColors(){
                return this.$store.state.bgColors.map(i => i)
            },

        },
        beforeRouteEnter (to, from, next) {
            next( vm =>{
                vm.$store.commit('updateShowReturnBtn',false)
                vm.$store.commit('updateTitleBg','#f2f2f2')

            });
            // next();
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当守卫执行前，组件实例还没被创建
        }
    }

</script>

<style scoped>
    .home {
        width: 100%;
        height: calc(100% - 40px);
        background: #58baab;
        position: relative;
    }

    .list {
        width: 100%;
        /*height: 140px;*/
    }

    .icon {
        border: 0;
        border-bottom: 1px solid #fff;
        text-align: center;
        height: 1.5rem;
        /*border: 3px solid #060a53;*/
        display: flex; /*设置为flex布局*/
        justify-content: center; /*水平居中*/
        align-items: center;
        position: relative;
    }

    .icon img {
        display: block;
        width: 60px;
        height: 60px;
    }

    .icon span {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: #fff;
        font-size: 15px;
    }



</style>

