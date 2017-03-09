var dom = document.getElementById("areaActivityContainer");
var myChart = echarts.init(dom);
    option = null;
		option = {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:['（小班）手工建构区角','（小1班）绘本阅读区角','（小2班）生活区','（小3班）数学区','（小4班）科学区'],
		    width:'160px;',
				height:'150px',
				padding:[100,10,5,700,]
    },
    grid: {	
    	  left:'5%',
    	  right:'30%',
        bottom: '5%',
        containLabel: false
    },
    xAxis : [
        {
            type : 'category',
            data : [],
            name:'区域名称'
        }
    ],
    yAxis : [
        {
            type : 'value',
            name:'人次'
        }
    ],
    
    series : [
        {
            name:'（小班）手工建构区角',
            type:'bar',
            barWidth:50,
            barGap:'100%',
            data:[52],
            itemStyle:{
            	   normal:{
            	   	   color:'#ffa726'
            	   	}
            	},
            lable:{
            	normal:{
            		  show:true,
            		  position:['50%', '50%']
            		}
            	}
        },
        {
            name:'（小1班）绘本阅读区角',
            type:'bar',
            barWidth:50,
            barGap:'100%',
            data:[46],
            itemStyle:{
            	   normal:{
            	   	   color:'#ff7043'
            	   	}
            	}
        },
        {
            name:'（小2班）生活区',
            type:'bar',
            barWidth:50,
            barGap:'100%',
            data:[32],
            itemStyle:{
            	   normal:{
            	   	   color:'#2baf2b'
            	   	}
            	}
        },
        {
            name:'（小3班）数学区',
            type:'bar',
            barWidth:50,
            barGap:'100%',
            data:[20],
            itemStyle:{
            	   normal:{
            	   	   color:'#ff6091'
            	   	}
            	}
        },{
            name:'（小4班）科学区',
            type:'bar',
            barWidth:50,
            barGap:'100%',
            data:[10],
            itemStyle:{
            	   normal:{
            	   	   color:'#738ffe'
            	   	}
            	}
        }
        
    ]
};
	console.log(option);
	myChart.setOption(option);