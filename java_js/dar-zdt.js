//var urls="192.168.1.153:8081/BflMark/";
var urls="truelove.youjiaoyun.net/";

	
	
		function DARDayData(pid,i){
			var gardenId=localStorage.getItem('gid');
			var dom = document.getElementById("ard-container");
			var myChart = echarts.init(dom);
			var tbody ="";
			//var gradeNum =document.getElementById("activityGrade").value;
			
			//var classId =document.getElementById("activityClass").value;
			
			var start =document.getElementById("input1").value;
			
			var end =document.getElementById("input2").value;
			
			//var areaType =document.getElementById("areaTypeSelect").value;

			localStorage.setItem("i",i);
			
//			alert(gardenId);
			$.ajax({
				//url : "http://192.168.1.153:8081/BflMark/bflmark/selectSleepInfo?jsoncallback=?",
				url : "http://"+urls+"areaAngle/queryStudentDevelopmenDayDataInfo?jsoncallback=?",
				dataType : 'jsonp',
				data : {gardenId:gardenId,personId:pid,start:start,end:end},
				jsonp : 'jsoncallback',
				async: false,
				success : function(data) {
					var classname = data.studentDevelopmentDayData.className;
					var start = data.studentDevelopmentDayData.startTime;
					var end = data.studentDevelopmentDayData.endTime;
					var name=data.studentDevelopmentDayData.studentName;
					//alert(end);
			        $("#ardclassname").html(classname);
			        $("#ardstrattime").html(start);
			        $("#ardendtime").html(end);
			        $('.ardstudentname').html(name);
				    var seriArray=new Array();
				    var studentArrayList=data.studentDevelopmentDayData.studentArrayList;
				    
				    for(var i=0;i<studentArrayList.length;i++){
				    	var seriInfo=new Object();
				    	seriInfo.name=studentArrayList[i].areaAngleName;
				    	seriInfo.type='line';
				    	seriInfo.stack='总量';
				    	seriInfo.data=studentArrayList[i].yArray;
				    	seriArray.push(seriInfo);
				    }
				    
				console.log(data);
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
					        data: data.studentDevelopmentDayData.xArray
					    },
					    yAxis: {
					        type: 'value',
							name:'参与次数'
					    },
					    series: seriArray
					};
				console.log(option);
				myChart.setOption(option);
				}
			});
			
}
