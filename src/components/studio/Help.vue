<template>
     <div class="line-box">
         <div>22321121321132132132</div>
       <v-chart
         ref="myChart"
         autoresize
         :options="orderAnalysis"
       />
     </div>
   </template>
   <script>
   import ECharts from "vue-echarts";
   import "echarts/lib/chart/line";
   import 'echarts/lib/component/tooltip'
   import "echarts/lib/component/markPoint";
   export default {
     props:{
       lineData:{
         type:Object
      }
    },
     data() {
       return {
         activeName: "NEARLY_A_WEEK",
         tabPanes:[
          { label:'近一周', name:'NEARLY_A_WEEK' },
          { label:'近一月', name:'NEARLY_A_MONTH' },
          { label:'近三月', name:'NEARLY_THREE_MONTHS' },
          { label:'近一年', name:'NEARLY_A_YEAR' },
           // { label:'近三年', name:'fifth' },
        ],
         orderAnalysis: {
           title: {
             show: false
          },
           tooltip: {
               trigger: 'axis',
               axisPointer: {
                   type: 'cross'
              },
               backgroundColor: 'rgb(255,255,255)',
               borderWidth: 1,
               borderColor: '#ff8700',
               padding: 10,
               textStyle: {
                   color: '#000'
              }
          },
           grid: {
             x: 40,
             x2: 10,
             y: 30,
             height: 175
          },
           xAxis: {
             type: "category",
             axisLine:{
               lineStyle:{
                 color:'#909399'
              }
            },
             data: [
               "01\n日",
               "02\n一",
               "03\n二",
               "04\n三",
               "05\n四",
               "06\n五",
               "07\n六"
            ],
             splitLine: {
               show: false
            },
             axisTick: {
               show: false
            },
             show: true,
             axisPointer: {
               label: {
                 // 定义提示格式
                 formatter: function (params) {
                   var seriesValue = (params.seriesData[0] || {}).value;
                   let title = params.seriesData[0].name.split('\n')
                   let titleDate = title[0].replace(/^0+/,"")
                   if(title[1]){
                     return `日期: ${titleDate}日,周${title[1]}`
                  }
                   return `日期: ${params.value.replace(/^0+/,"")}`
                }
              }
            }
          },
           yAxis: {
             type: "value",
             splitLine: {
               show: false
            },
             axisTick: {
               show: false
            },
             axisLine:{
               lineStyle:{
                 color:'#909399'
              }
            },
             // nameTextStyle:{
             //   color: '#ff8700'
             // },
             show: true,
             boundaryGap: ["0%", "0%"]
          },
           // dataZoom: {
           //   show: true,
           //   realtime: true,
           //   y: 36,
           //   height: 20,
           //   start: 20,
           //   end: 80
           // },
           series: [
            {
               markPoint: {
                 symbol: "circle",
                 symbolSize: 10,
                 data: [{ type: "max", name: "最大值" }],
                 itemStyle:{
                   normal:{
                     label:{
                       show: true,
                       color:"#ff8700",
                       position:'top'
                    }
                  }
                }
              },
               data: [0, 1, 2, 3, 4, 5, 6],
               type: "line",
               smooth: true,
               showSymbol: true,
               itemStyle: {
                 normal: {
                   borderColor: "#FF8700",
                   color: "#ff8700"
                },
                 emphasis: {}
              }
            }
          ]
        }
      };
    },
     components: {
       "v-chart": ECharts
    },
     methods: {
       chooseTab(tab) {
         this.activeName = tab;
         this.$emit('on-choose',tab);
      },
       toDetail(){
         this.$emit('on-detail')
      }
    },
     watch:{
       lineData: function(newVal, oldVal){
         this.orderAnalysis.xAxis.data = this.lineData.x;
         this.orderAnalysis.series[0].data = this.lineData.y;
      }
    }
  };
   </script>
   <style>
     .line-box {
       border: 1px solid #e9ebf0;
       border-radius: 5px;
       background: #fff;
       min-height: 294px;
       height:100%;
       width:100%;
    }
     .echarts {
       width: 100%;
       height: 500px;
    }
   </style>