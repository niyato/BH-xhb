var urls="192.168.1.153:8081/BflMark/";
//var url="truelove.youjiaoyun.net/";

var dom = document.getElementById("areaActivityContainer");
var myChart = echarts.init(dom);
//园内区域排名
function areaAnalysisOrder(){
    
	var tbody = "";
//	var pageCount = "";
	
	var gradeNum =document.getElementById("activityGrade").value;
	
	var classId =document.getElementById("activityClass").value;
	
	var start =document.getElementById("input1").value;
	
	var end =document.getElementById("input2").value;
	
	var areaType =document.getElementById("areaTypeSelect").value;
	
	var areaClassId=0;
	if(areaType==1){
		areaClassId =document.getElementById("all_class").value;
	}
	
	var areaAngleType =document.getElementById("activityStatus").value;
	
	var order =document.getElementById("areaAngleAngalysis_order").value;
	
	var gardenId=localStorage.getItem('gid');
	
  $.ajax({
	url : "http://"+urls+"areaAngle/areaActivityAnalysisOrder?jsoncallback=?",
	dataType : 'jsonp',//gradeNum:,classId,personId,quality,order
	data : {gardenId:gardenId,gradeNum:gradeNum,classId:classId,start:start,end:end,areaType:areaType,areaClassId:areaClassId,areaAngleType:areaAngleType,order:order},
	jsonp : 'jsoncallback',
	async: false,
	success : function(result) {
		console.log(result);
		
		var resultData = result.areaAngleOrder;  
		
		//列表数据总数
//		var pageCount = result.allCount;
		
		//每页显示数据数
//		var pageSize = resultData.length;
		//alert(pageSize);
		
		//页数
//		var page_Count = result.pageCount;
			
			option = {
				color: ['#3398DB'],
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    legend: {
			        data:resultData.map(function (item) {
								return item.areaName}),
					    width:'160px;',
						height:'150px',
						padding:[100,10,5,700],
						left:'10%',
						top:'-40px'
			    },
			    grid: {	
					  left:'0%',
					  right:'4%',
					  bottom: '3%',
					  containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : resultData.map(function (item) {
								return item.areaName}),
			            name:'区域名称',
			            axisTick: {
			            	show:true,
			                alignWithLabel: true,
			                interval:0
			            },
			            axisLabel:{
			            	show:true
			            },
						nameTextStyle:{
							fontSize:'14'
						}
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            name:'人次',
						nameTextStyle:{
							fontSize:'14'
						}
			        }
			    ],
			    
			    series : {
			    	barGap:'30%',
			    	barWidth:50,
			    	type:'bar',
			    	data : resultData.map(function (item) {
								return item.time}),
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
			    }
			    
			    
			   
			};
			myChart.setOption(option);
		
				  
	},
	error: function (XMLHttpReuqest, textStautus, errothrown) {
		console.log(XMLHttpRequest.status);
		console.log(XMLHttpReuqest.readyState);
		console.log(XMLHttpRequest.responseText);
		console.log(textStautus);
		console.log(errothrown);
	},
	statusCode: {
		404: function() {
			 alert("page not found");
			}
	 }

   });
// if (option && typeof option === "object") {
//		myChart.setOption(option, true);
//	}
};


//  option = null;
//		
//	console.log(option);
//	myChart.setOption(option);