//var urls="192.168.1.153:8081/BflMark/";
var urls="truelove.youjiaoyun.net/";

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
			
			var strName="";
			if(order==1){
				strName="人次";
			}else if(order==2){
				strName="人数";
			}else if(order==3){
				strName="人均停留时长";
			}else{
				strName="人均活动量";
			}
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
						padding:[100,10,5,10],
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
			            name:'区域'+'\n'+'名称',
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
			            name:strName,
						nameTextStyle:{
							fontSize:'14'
						}
			        }
			    ],
			    dataZoom: [
					{
						show: true,
						start: 0,
						end: 100
					},
					{
						type: 'inside',
						start: 0,
						end: 100
					},
					{
						show: true,
						yAxisIndex: 0,
						filterMode: 'empty',
						width: 30,
						height: '80%',
						showDataShadow: false,
						left: '93%'
					}
				],
			    series : {
			    	barGap:'50%',
			    	barWidth:50,
			    	type:'bar',
			    	data : resultData.map(function (item) {
								return item.num}),
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

};



//园内区域汇总分析
function areaAnalysisCollect(){

	var areaType =document.getElementById("collect_areaTypeSelect").value;
	
	var areaClassId=0;
	if(areaType==1){
		areaClassId =document.getElementById("all_class_2").value;
	}
	
	var areaAngleType =document.getElementById("activityStatus_2").value;
	
	
	localStorage.setItem("areaType",areaType);
	var gardenId=localStorage.getItem('gid');
	
	var content1 ="";
	var content2 ="";
  $.ajax({
	url : "http://"+urls+"areaAngle/areaActivityAnalysisCollect?jsoncallback=?",
	dataType : 'jsonp',
	data : {gardenId:gardenId,areaType:areaType,areaClassId:areaClassId,areaAngleType:areaAngleType},
	jsonp : 'jsoncallback',
	async: false,
	success : function(result) {
		console.log(result);
		var resultData = result.areaAngleCollect;
		//alert(resultData.length);
		$("#areaAngle_list").empty();
		//alert(resultData.length);
		if(resultData.length==0){
			var span_noData=$("<div style='margin:0 auto;text-align: -webkit-center;'><span   style='font-size:18px;text-align:center;'>没有满足条件的数据</span></div>");
			$("#span_noData").css("text-align:center");
			$("#areaAngle_list").append(span_noData);
		}
		
		var contentleft=$("<div class='content-left' style=' width:500px; margin-left:50px; float:left;'></div>");
		var contentright=$("<div class='content-right' style=' width:500px; margin-left:50px; float:left;'></div>");
		$("#areaAngle_list").append(contentleft);
	    $("#areaAngle_list").append(contentright);
		

		var titleName;
		
		for (var i = 0; i < resultData.length; i++) {
			var timeSectionRecords=resultData[i].timeSectionRecords;
			var areaName=resultData[i].areaName;
			var areaType=resultData[i].areaType;
			var areaid = resultData[i].areaId;
			if(areaType==1){
				titleName=resultData[i].areaTypeName+resultData[i].className;
			}else{
				titleName=resultData[i].areaTypeName+resultData[i].commonArea;
			}
			
            if(i % 2 ==0){
				var tb1 = "";
				for (var j = 0; j < timeSectionRecords.length; j++) {
					tb1 += "<tbody>"+
									  "<tr>"+
									    "<td>"+timeSectionRecords[j].dateDes+"</td>"+
										"<td>"+timeSectionRecords[j].personTime+"</td>"+
										"<td>"+timeSectionRecords[j].personNum+"</td>"+
										"<td>"+timeSectionRecords[j].aveTime+"</td>"+
										"<td>"+timeSectionRecords[j].amount+"</td>"+
									  "</tr>"+
									"</tbody>";
				}
				content1 +="<div class='title-right' style='float:left; width:316px;'>"
							+"<p style='font-weight: bold;font-style: normal; color:black; float:left;font-size:18px;'>"+areaName+"</p><span style='float:left;color:#B4BEC7;'>（"+titleName+"）</span>"
							+"</div>" + "<div class='bg' style='width:500px;'><table width='500px' border='0' cellspacing='0' style='box-shadow: 5px 5px 10px #E3EEF6;' class='area-left' id=''>"+
									"<thead style='border:1px solid lightgrey; background-color:#F5FCFF; color:black;font-weight: bold;'>"+
										"<tr id='' >"+
											"<th scope='col'>时间</th>"+
											"<th scope='col'>人数</th>"+
											"<th scope='col'>人次</th>"+
											"<th scope='col'>人均停留时长</th>"+
											"<th scope='col'>人均活动量</th>"+
										"</tr>"+
									"</thead>"+
									tb1 +
								"</table>"+
							"</div>"+"<div class='observe-btn' style=' width:130px; height:30px; background-color:#089BFF; text-align:center; line-height:28px; margin-left:40px; margin-bottom:30px; margin-top:20px; float:left;'>"+
							 "<a style=' display:block; width:118px; height:28px; color:#FFF; cursor:pointer;' onclick='jumpObserveRecord("+areaid+","+JSON.stringify({name: areaName})+")'>观察记录</a>"+
								"</div>"+
								"<div class='history-btn' style=' width:130px; height:30px; background-color:#00D200; text-align:center; line-height:28px; margin-left:50px; margin-bottom:30px; margin-top:20px; float:left;'>"+
								   "<a style=' display:block; width:118px; height:28px; color:#FFF; cursor:pointer;' href='historyRecord.html'>往期记录</a>"+
								"</div>";
				
			}else{
					var tb2 = "";
					for (var j = 0; j < timeSectionRecords.length; j++) {
						tb2 += "<tbody>"+
										  "<tr>"+
											"<td>"+timeSectionRecords[j].dateDes+"</td>"+
											"<td>"+timeSectionRecords[j].personTime+"</td>"+
											"<td>"+timeSectionRecords[j].personNum+"</td>"+
											"<td>"+timeSectionRecords[j].aveTime+"</td>"+
											"<td>"+timeSectionRecords[j].amount+"</td>"+
										  "</tr>"+
										"</tbody>";
					}
					content2 +="<div class='title-right' style='float:left; width:316px;'>"
							+"<p style='font-weight: bold;font-style: normal; color:black; float:left;font-size:18px;'>"+areaName+"</p><span style='float:left;color:#B4BEC7;'>（"+titleName+"）</span>"
							+"</div>" + "<div class='bg' style='width:500px;'><table width='500px' border='0' cellspacing='0' style='box-shadow: 5px 5px 10px #E3EEF6;' class='area-left' id=''>"+
									"<thead style='border:1px solid lightgrey; background-color:#F5FCFF; color:black;font-weight: bold;'>"+
										"<tr id='' >"+
											"<th scope='col'>时间</th>"+
											"<th scope='col'>人数</th>"+
											"<th scope='col'>人次</th>"+
											"<th scope='col'>人均停留时长</th>"+
											"<th scope='col'>人均活动量</th>"+
										"</tr>"+
									"</thead>"+
									tb2 +
								"</table>"+
							"</div>"+"<div class='observe-btn' style=' width:130px; height:30px; background-color:#089BFF; text-align:center; line-height:28px; margin-left:40px; margin-bottom:30px; margin-top:20px; float:left;'>"+
							 "<a style=' display:block; width:118px; height:28px; color:#FFF; cursor:pointer;' onclick='jumpObserveRecord("+areaid+","+JSON.stringify({name: areaName})+")'>观察记录</a>"+
								"</div>"+
								"<div class='history-btn' style=' width:130px; height:30px; background-color:#00D200; text-align:center; line-height:28px; margin-left:50px; margin-bottom:30px; margin-top:20px; float:left;'>"+
								   "<a style=' display:block; width:118px; height:28px; color:#FFF; cursor:pointer;' href='historyRecord.html'>往期记录</a>"+
								"</div>";
			}
			
						
	    }
        $("#areaAngle_list .content-left").append(content1);	
        $("#areaAngle_list .content-right").append(content2);
	    
		
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
}

function jumpObserveRecord(areaid,name){
	aid = areaid;
	aname = name.name;
	localStorage.setItem("areaid",aid);
	localStorage.setItem("areaname",aname);
	var url = "observeRecord.html";
	window.location.assign(url);
	//alert(name.name);
	//var gardenId=localStorage.getItem('areaid');
}