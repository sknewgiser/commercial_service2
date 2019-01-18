<template>
  <div class="drap-box">
    <p class="drap-text" @click="dropDownHandleClick">
      附近
      <span v-text="meter + '米'" class="meter"></span>
      <van-icon :name="dropFlag?'arrow-down':'arrow-up'"/>
    </p>
    <ul class="drap-list" :class="{ 'hide-list':dropFlag}">
      <li v-for="(item,index) in data" v-text="item" @click="handleClick(item)" :key="index"></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      dropFlag: true,
      meter: 500
    };
  },
  methods: {
    handleClick(m) {
      this.meter = m;
      this.dropFlag = true;
    },
    dropDownHandleClick(){
        this.dropFlag = !this.dropFlag;
    }
  }
};
</script>

<style scoped>
.drap-box {
  position: relative;
}
.drap-list {
  position: absolute;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 0px 0px rgba(0,0,0,.1);
  border-radius: 4px;
  text-align: center;
  overflow: hidden;
  z-index: 2;
}
.drap-text {
  line-height: 1rem;
  color: #fff;
  padding-left: 10px;
  display: flex;
  align-items: center;
}
.meter {
  margin-left: 5px;
}
.hide-list{
    display: none;
}

</style>