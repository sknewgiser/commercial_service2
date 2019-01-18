<template>
    <div id="app">
        <mt-header title="朝阳区生活服务设施" :style="{'background': titleBg}">
            <router-link to="/" slot="left" v-if="showReturnBtn">
                <mt-button icon="back" @click="handleClose">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right" @click="toggleSideBar"  v-if="showReturnBtn"></mt-button>
        </mt-header>
        <div class="drap-route" v-show="showSideBar">
            <ul>
                <li>
                    <router-link to="/map/1">
                        <p class="drap-route-p"><img
                                src="./assets/images/trade.png"><span class="drap-route-name">商圈</span></p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/map/3">
                        <p class="drap-route-p"><img
                                src="./assets/images/shop.png"><span class="drap-route-name">综合体购物中心</span></p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/map/4">
                        <p class="drap-route-p"><img
                                src="./assets/images/store.png"><span class="drap-route-name">便利店</span></p>
                    </router-link>
                </li>

                <li>
                    <router-link to="/map/2">
                        <p class="drap-route-p"><img
                                src="./assets/images/vegetable.png"><span class="drap-route-name-end">蔬菜零售终端</span></p>
                    </router-link>
                </li>

            </ul>
        </div>
        <router-view/>
        <div id="footer"  v-show="!showReturnBtn">
            <img class="logo" src="./assets/images/ICT_LOGO.png" alt="">
            <p>清华同衡技术创新中心</p>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'App',
        data() {
            return {
                showSideBar:false
            }
        },
        mounted() {
            // 解决唤起键盘时，数据列表定位问题
            const height = document.documentElement.offsetHeight || document.body.offsetHeight;
            document.getElementsByTagName('body')[0].style.height = height + 'px';
        },
        methods: {
            handleClose() {
                this.showSideBar = false;
                // alert(1)
            },
            toggleSideBar() {
                this.showSideBar = !this.showSideBar;
            }
        },
        computed: {
            showReturnBtn() {
                return this.$store.state.showReturnBtn;
            },
            titleBg(){
                return this.$store.state.titleBg
            }
        }
    }
</script>

<style lang="scss">
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    html {
        overflow: hidden;
    }

    body {
        position: relative;
    }

    ul {
        padding: 0;
        margin: 0;
    }

    li {
        list-style-type: none;
    }

    #app {
        width: 100%;
        height: 100%;
    }

    a {
        text-decoration: none;
    }

    .mint-header {
        color: #333 !important;
        height: 0.8rem !important;
    }
    #app /deep/ .mint-header-title{
        font-weight: bold;
        font-size: 15px;
    }
    .drap-route {
        position: absolute;
        right: 0px;
        top: 0.8rem;
        z-index: 3;
        white-space: nowrap;
        background: rgba(0, 0, 0, .7);
        border-radius: 4px;

        >ul>li{
            padding: 5px 0 5px 10px;
        }
        &-p {
            color: #fff;
            >img{
                width: 20px;
                vertical-align: middle;
                margin-right: 5px;
            }
        }
        &-name{
            display: inline-block;
            width: 110px;
            border-bottom: 1px solid #fff;
            padding-bottom: 2px;
        }
        &-name-end{
            border-bottom: 0;
        }
    }
    #footer{
        text-align: center;
        position: fixed;
        bottom: 10px;
        width: 100%;
        color: #fff;
        font-size: 16px;
        
    }
    .logo{
        width: 0.5rem;
        margin-right: 10px;

    }


</style>
