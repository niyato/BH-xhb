var dom = document.getElementById("ard-container");
var myChart = echarts.init(dom);
option = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['绘本阅读区','手工建构区','生活区']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2016/2/10','2016/2/11','2016/2/12','2016/2/13','2016/2/14','2016/2/15','2016/2/16']
    },
    yAxis: {
        type: 'value',
		name:'参与次数'
    },
    series: [
        {
            name:'绘本阅读区',
            type:'line',
            stack: '总量',
            data:[10, 12, 11, 14, 9, 20, 10]
			
        },
        {
            name:'手工建构区',
            type:'line',
            stack: '总量',
            data:[20, 12, 11, 34, 20, 30, 31]
        },
        {
            name:'生活区',
            type:'line',
            stack: '总量',
            data:[15, 23, 20, 15, 19, 33, 41],
			barwidth:10
        },
    ]
};
  myChart.setOption(option);