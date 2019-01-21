<template>
    <div class="cell" style="bottom:0">
        <p class="btn-icom" @click="cellHandleClick">
            <van-icon :name="isOpen?'arrow-up':'arrow-down'" />
        </p>
        <div v-show="pageBusiness.length>0">
            <ul class="pageBusiness-items">
                <li v-for="(item,index) in pageBusiness" class="cell-item" :key="item.id"
                    @click="businessHandleClick(item)">
                    <!--<span class="cell-item-index" v-text="index+1"></span>-->
                    <div class="cell-item-name" >
                        <p  class="business-name"><span v-text="item.name"></span><span v-text="item.ctype" class="ctype"></span></p>
                        <p v-text="item.address" class="business-address"></p>
                    </div>
                    <span class="cell-item-route"></span>
                    <span class="cell-item-go">到这去</span>
                    <!-- <span class="cell-item-distance" v-text="'距离'+ item.distance + '米'"></span> -->
                </li>
            </ul>
            <van-pagination
                    v-model="currentPage"
                    :total-items="business.length"
                    :items-per-page="itemsPerPage"
                    force-ellipses
                    mode="simple"
            />
        </div>
        <div v-show="pageBusiness.length<=0" class="nodata-tip">
            <div class="nodata-tip-vertical">
                <van-icon name="fail" size="1rem"/>
                <p class="nodata-tip-p">当前暂无数据</p>
            </div>
        </div>
        <div class="c-name">清华同衡技术创新中心&nbsp;&nbsp; &nbsp;  </div>
    </div>
</template>

<script>
    export default {
        props: ['business'],
        data() {
            return {
                isOpen: false,
                currentPage: 1,  //当前页码
                itemsPerPage: 5,  //每页显示数量

            };
        },
        methods: {
            cellHandleClick() {
                this.isOpen = !this.isOpen;
                const height = this.$el.offsetHeight - 25;
                let timer;
                if (this.isOpen) {
                    //执行关闭
                    timer = setInterval(() => {
                        if (parseInt(this.$el.style.bottom) * -1 > height) {
                            clearInterval(timer);
                            this.$el.style.bottom = - height + 'px';
                        } else {
                            this.$el.style.bottom = parseInt(this.$el.style.bottom) - 10 + "px";
                        }
                    }, 10);
                } else {
                    //执行打开
                    timer = setInterval(() => {
                        if (parseInt(this.$el.style.bottom) > 0) {
                            clearInterval(timer);
                            this.$el.style.bottom = 0;
                        } else {
                            this.$el.style.bottom = parseInt(this.$el.style.bottom) + 10 + "px";
                        }
                    }, 10);
                }
            },
            businessHandleClick(item) {
                this.$emit('clickBusiness', item)
            }
        },
        computed: {
            pageBusiness() {
                const start = (this.currentPage - 1) * this.itemsPerPage;//取数据的开始索引
                return this.business.slice(start, start + this.itemsPerPage)
            }
        }
    };
</script>

<style scoped lang="scss">
    .cell {
        width: 100%;
        position: absolute;
        bottom: 0;
        z-index: 2;
        &-item {
            height: 0.8rem;
            border-bottom: 1px solid rgba(170, 170, 170, 0.7);
            display: flex;
            padding: 0 20px;
            box-sizing: border-box;
        }
    }

    .cell-item-name {
        flex: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }
    .cell-item-route{
        width: 0.2rem;
        height: 0.2rem;
        background-image: url("../../assets/images/arrow.png");
        background-size: cover;
        margin: 0.3rem 0;
    }
    .cell-item-distance {
        flex: 1;
    }

    .cell-item-index {
        width: 1rem;
        text-align: center;
    }
    .cell-item-go{
        font-size: 12px;
        line-height: 0.8rem;
    }
    .btn-icom {
        text-align: center;
        background: #fff;
    }

    .cell /deep/ .van-pagination__page-desc {
        background: #eee !important;
    }

    .nodata-tip {
        height: 4.8rem;
        background: #eee;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        &-p {
            color: #aaa;
        }
    }

    .cell /deep/ .van-pagination__item--disabled {
        opacity: 1;
        background: #fff;
        color: #ccc;
    }
    .cell /deep/ .van-pagination__item,.cell /deep/ .van-pagination__page-desc{
        line-height: 0.8rem;
        height: 0.8rem;
    }
    .pageBusiness-items{
        height: 4rem;
        background: #fff;
    }
    .business-name{
        height: 0.5rem;
        font-family: 'YouYuan,SimHei ';
        font-weight: 900;
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
    }
    .business-address{
        height: 0.3rem;
        font-size: 12px;
        line-height: 0.3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .ctype{
        background: rgba(0,0,0,.7);
        color: #fff;
        font-size: 12px;
        padding: 2px 5px;
        border-radius: 5px;
        margin-left: 5px;
    }
    .c-name{
        position: absolute;
        top: -25px;
        width: 100%;
        background: rgba(255,255,255,.5);
        text-align: right;
    }


</style>