import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      business:[],
      searchText:'',
      titleBg:'#f2f2f2',
      showReturnBtn:false,   //是否显示返回按钮
      bgColors:['#afb6c9','#f49b8b','#dec1b9','#b8ded1'],
      iconColors:['#5b709b','#f46c54','#b18882','#66c3a4'],
      selectColors:['#212593','#840403','#b17171','#2e896a']
  },
    getters:{
        filterBusiness: state =>{
            return state.business.filter(b=>b.name.includes(state.searchText))
        }
    },
  mutations: {
      updateBusiness(state,data){
          state.business = data;
      },
      changeSearchText(state,text){
          state.searchText = text
      },
      updateShowReturnBtn(state,flag){
          state.showReturnBtn = flag;
      },
      updateTitleBg(state,color){
          state.titleBg = color;
      }
  },
  actions: {

  }
})
