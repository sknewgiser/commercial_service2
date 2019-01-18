<template>
    <div class="map-toolbar">
        <div class="drap-down">
            <!--<DropDownComponent :data="[500,1000,2000,5000]"></DropDownComponent>-->
            <span class="c-active cy">业态:</span><span class="c-name cy" v-text="activeName"></span>
        </div>
        <div class="search">
            <van-search placeholder="搜索关键词" v-model="searchText" background="transparent"/>
        </div>
    </div>
</template>

<script>
    // import DropDownComponent from '@/components/mapComponents/DropDownComponent.vue'
    export default {
        data() {
            return {
                searchText: "",
                activeName:''
            }
        },
        mounted(){
            const category = this.$route.params.category;
            const names = ['商圈','蔬菜零售终端','综合体购物中心','便利店']
            this.activeName = names[category-1];
        },
        methods: {
            searchHandle() {
                this.$store.commit('changeSearchText', this.searchText)
            }
        },
        watch: {
            searchText() {
                this.searchHandle()
            }
        },
        components: {
            // DropDownComponent
        }
    };
</script>

<style scoped>
    .map-toolbar {
        height: 1rem;
        display: flex;
        align-items: center;
        background: rgba(0, 0, 0, .7);
        padding: 0 15px;
    }

    .drap-down {
        /*width: 110px;*/
        margin-right: 5px;
    }

    .search {
        flex: 1;
    }

    .map-toolbar /deep/ .van-field__body {
        height: 100%;
    }

    .map-toolbar /deep/ .van-search .van-cell {
        border-radius: 16px;
    }

    .van-search {
        padding: 7px 0;
    }

    .cy {
        color: #fff;
    }
</style>