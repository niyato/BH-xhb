var url="truelove.youjiaoyun.net";
//var url="192.168.1.153:8081/BflMark";


//查询睡眠信息
function onchangeSleepDate(){
	//alert(1);
	var current=document.getElementById("J-xl").value;
	//alert(current);
	initData_sleep(0,current);
};

//查询运动信息
function onchangeActivityDate(){
	//alert(1);
	var current=document.getElementById("J-xl_activity").value;
	//alert(current);
	initData_activity(0,current);
};

//查询餐饮信息
function onchangeDietDate(type){
	//alert(1);
	var current=document.getElementById("J-xl-diet").value;
	//alert(current);
	initData_Sign(0,current,type);
};

//查询体操
function onchangeGymDate(type){
	//alert(1);
	var current=document.getElementById("J-xl-gym").value;
	//alert(current);
	initData_Sign(0,current,type);
};

//查询异常
function onchangeAbnormalDate(type){
	//alert(1);
	var current=document.getElementById("J-xl-abnormal").value;
	//alert(current);
	initData_Sign(0,current,type);
};

//安全考勤
function onchangeAttendanceDate(){
	//alert(1);
	var current=document.getElementById("J-xl-attendance-start").value;
	//alert(current);
	initData_Attendance(0,current);
};

//睡眠请求
function initData_sleep(pageindx,date){
    var type=1;
	var tbody = "";
	var pageCount = "";
	
	var sleepGrade =document.getElementById("sleepGrade").value;
	
	var sleepClass =document.getElementById("sleepClass").value;
	
	var sleepPersonId =document.getElementById("sleepPersonId").value;
	
	var sleepStatus =document.getElementById("sleepStatus").value;
	
	
	var gardenId=localStorage.getItem('gid');
	//alert(gardenId);
	//alert(gardenId);
	//121.40.124.253:58093/BflMark
  $.ajax({
	//url : "http://192.168.1.153:8081/BflMark/bflmark/selectSleepInfo?jsoncallback=?",
	url : "http://"+url+"/bflmark/selectSleepInfo?jsoncallback=?",
	dataType : 'jsonp',//gradeNum:,classId,personId,quality,order
	data : {pageNo:pageindx,pageSize:10,day:date,gardenId:gardenId,gradeNum:sleepGrade,classId:sleepClass,personId:sleepPersonId,quality:sleepStatus,type:type},
	jsonp : 'jsoncallback',
	async: false,
	success : function(result) {
		console.log(result);
		
		var resultData = result.sleepInfo;

		
		//列表数据总数
		var pageCount = result.allCount;
		
		//每页显示数据数
		var pageSize = resultData.length;
		//alert(pageSize);
		
		//页数
		var page_Count = result.pageCount;
			
			$("#tblist tbody").empty();
			
			if(pageCount==0){
				   $("#selectdata").removeAttr("hidden");
				   $("#divpage").empty();
				}else{
					    $("#selectdata").attr("hidden","hidden");
					}
			
			document.getElementById("J-xl").value=date;
			document.getElementById("timeSec").innerHTML=result.timeDes;
			for(var i in resultData){

				//alert(result.gameRecord[i].endTime);
				var sleepTime=resultData[i].sleepTime;
				var averageTime=resultData[i].averageTime;
				//var pname = $('#myModal .modal-header .modal-title .Pname').html();
				
				//alert(resultData[i].personId);
		        //localStorage.setItem("personid",resultData[i].personId);
				var pid = resultData[i].personId;
				//alert(pname);
				var minute;
				var hear;
				var time;
				
				
				
				var minute1;
				var hear1;
				var time1;
				
				if(sleepTime>=60){
					minute1=sleepTime%60;
					hear1=parseInt(sleepTime/60);
					time1=hear1+"时"+minute1+"分";
				}else{
					minute1=sleepTime;
					time1=minute1+"分";
				}

				if(averageTime>=60){
					minute=averageTime%60;
					hear=parseInt(averageTime/60);
					time=hear+"时"+minute+"分";
				}else{
					minute=averageTime;
					time=minute+"分";
				}
				
				var Pname = resultData[i].name;
				//alert(pname.html());
				$("#tblist").append("<tr>"+             
								"<td>"+resultData[i].className+"</td>"+
								"<td>"+resultData[i].name+"</td>"+
								"<td>"+time1+"</td>"+
								"<td>"+
								time
								+"</td>"+
							   "<td>"+resultData[i].quality+"</td>"+
							   "<td>"+"<button class='btn btn-primary btn-lg' data-toggle='modal' data-target='#myModal' onclick='CurveView("+pid+","+JSON.stringify({name: Pname})+")'></button>"+"</td>"+
								"</tr>" );
			 	
			}
	           
	
		  
		 if(page_Count==1){
				$("#divpage").empty();
			  }else{
				if(pageindx < page_Count-1)
				{
					$("#divpage").pagination(pageCount, {
						callback:pageselectCallback,
						prev_text: '<< 上一页',
						next_text: '下一页 >>',
						items_per_page: pageSize,
						num_display_entries: 10,
						current_page: pageindx,
						num_edge_entries: 0
				  });
				}

			  }
		
				  
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

//运动请求
//体育活动请求
function initData_activity(pageindx,date){
    var type=4;
	var tbody = "";
	var pageCount = "";
	
	var sleepGrade =document.getElementById("activityGrade").value;
	
	var sleepClass =document.getElementById("activityClass").value;
	
	var sleepPersonId =document.getElementById("activityPersonId").value;
	
	var sleepStatus =document.getElementById("activityStatus").value;
	
	
	var gardenId=localStorage.getItem('gid');
	//alert(gardenId);
	//121.40.124.253:58093/BflMark
  $.ajax({
	//url : "http://192.168.1.153:8081/BflMark/bflmark/selectSleepInfo?jsoncallback=?",
	url : "http://"+url+"/bflmark/selectSleepInfo?jsoncallback=?",
	dataType : 'jsonp',//gradeNum:,classId,personId,quality,order
	data : {pageNo:pageindx,pageSize:10,day:date,gardenId:gardenId,gradeNum:sleepGrade,classId:sleepClass,personId:sleepPersonId,quality:sleepStatus,type:type},
	jsonp : 'jsoncallback',
	async: false,
	success : function(result) {
		console.log(result);
		
		var resultData = result.sleepInfo;  
		
		//列表数据总数
		var pageCount = result.allCount;
		
		//每页显示数据数
		var pageSize = resultData.length;
		//alert(pageSize);
		
		//页数
		var page_Count = result.pageCount;
			
			$("#tblist tbody").empty();
			
			
			document.getElementById("J-xl_activity").value=date;
			document.getElementById("timeSec-activity").innerHTML=result.timeDes;
			
			if(pageCount==0){
				   $("#selectdata").removeAttr("hidden");
				   $("#divpage").empty();
				}else{
					    $("#selectdata").attr("hidden","hidden");
					}
					
			for(var i in resultData){

				//alert(result.gameRecord[i].endTime);
				var heavyTime=resultData[i].heavyTime;
				var centerTime=resultData[i].centerTime;
				var lowTime=resultData[i].lowTime;
				var gradeNo = resultData[i].gradeNum;
				var pid = resultData[i].personId;
				
				var minute;
				var hear;
				var time;
				
				if(heavyTime>=60){
					minute=heavyTime%60;
					hear=parseInt(heavyTime/60);
					time=hear+"时"+minute+"分";
				}else{
					minute=heavyTime;
					time=minute+"分";
				}


				var minute1;
				var hear1;
				var time1;
				
				if(centerTime>=60){
					minute1=centerTime%60;
					hear1=parseInt(centerTime/60);
					time1=hear1+"时"+minute1+"分";
				}else{
					minute1=centerTime;
					time1=minute1+"分";
				}
				
				var minute2;
				var hear2;
				var time2;
				
				if(lowTime>=60){
					minute2=lowTime%60;
					hear2=parseInt(lowTime/60);
					time2=hear2+"时"+minute2+"分";
				}else{
					minute2=lowTime;
					time2=minute2+"分";
				}
				
				var gradeName = "";
				if(gradeNo==1)
				{
					gradeName = '托班';
				}
				if(gradeNo==2)
				{
					gradeName = '小班';
				}
				if(gradeNo==3)
				{
					gradeName = '中班';
				}
				if(gradeNo==4)
				{
					gradeName = '大班';
				}
				var pname = resultData[i].name;
				$("#tblist").append("<tr>"+
				                "<td>"+gradeName+"</td>"+             
								"<td>"+resultData[i].className+"</td>"+
								"<td>"+resultData[i].name+"</td>"+
								"<td>"+time+"</td>"+
								"<td>"+time1+"</td>"+
								"<td>"+time2+"</td>"+
							   "<td>"+resultData[i].quality+"</td>"+
							   "<td>"+"<button class='btn btn-primary btn-lg' data-toggle='modal' data-target='#myModal2' onclick='ZztuView("+pid+","+JSON.stringify({name: pname})+")'></button>"+"</td>"+
								"</tr>" );
			}
	
	
		  
		 if(page_Count==1){
				$("#divpage").empty();
			  }else{
				if(pageindx < page_Count-1)
				{
					$("#divpage").pagination(pageCount, {
						callback:pageselectCallback,
						prev_text: '<< 上一页',
						next_text: '下一页 >>',
						items_per_page: pageSize,
						num_display_entries: 10,
						current_page: pageindx,
						num_edge_entries: 0
				  });
				}

			  }
				
				
			
		
				  
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



//餐饮，体操，异常请求
function initData_Sign(pageindx,date,type){
    
	var tbody = "";
	var pageCount = "";
	
	var sleepGrade;
	
	var sleepClass ;
	
	var sleepPersonId ;
	
	var sleepStatus ;
	
	
	var gardenId=localStorage.getItem('gid');

	var status1="";
	var status2="";
	var status3="";
	if(type==3){
		sleepGrade =document.getElementById("gymGrade").value;
		sleepClass =document.getElementById("gymClass").value;
		sleepPersonId =document.getElementById("gymPersonId").value;
		sleepStatus =document.getElementById("gymStatus").value;
		status1="安静";
		status2="适中";
		status3="活泼";
	}
	if(type==4){
		sleepGrade =document.getElementById("abnormalGrade").value;
		sleepClass =document.getElementById("abnormalClass").value;
		sleepPersonId =document.getElementById("abnormalPersonId").value;
		sleepStatus =document.getElementById("abnormalStatus").value;
		status1="正常";
		status2="需要留意";
		status3="特别关注";

	}
	if(type==5){
		sleepGrade =document.getElementById("dietGrade").value;
		sleepClass =document.getElementById("dietClass").value;
		sleepPersonId =document.getElementById("dietPersonId").value;
		sleepStatus =document.getElementById("dietStatus").value;
		status1="习惯良好";
		status2="习惯一般";
		status3="习惯较差";

	}
	//alert(gardenId);
	//121.40.124.253:58093/BflMark
  $.ajax({
	//url : "http://192.168.1.153:8081/BflMark/bflmark/selectSleepInfo?jsoncallback=?",
	url : "http://"+url+"/bflmark/queryStatusNum?jsoncallback=?",
	dataType : 'jsonp',//gradeNum:,classId,personId,quality,order
	data : {pageNo:pageindx,pageSize:10,day:date,gardenId:gardenId,gradeNum:sleepGrade,classId:sleepClass,personId:sleepPersonId,signType:sleepStatus,type:type},
	jsonp : 'jsoncallback',
	async: false,
	success : function(result) {
		console.log(result);
		
		var resultData = result.sleepInfo;  
		
		//列表数据总数
		var pageCount = result.allCount;
		
		//每页显示数据数
		var pageSize = resultData.length;
		//alert(pageSize);
		
		//页数
		var page_Count = result.pageCount;
			
			$("#tblist tbody").empty();
			
			if(pageCount==0){
				   $("#selectdata").removeAttr("hidden");
				   $("#divpage").empty();
				}else{
					    $("#selectdata").attr("hidden","hidden");
					}
			
			for(var i in resultData){
				var gradeNo= resultData[i].gradeNum;
				
				//区分年级名称
				function diffgrade(){	
				 if(gradeNo==1)
				 {
					gradeName = '托班';
				 }
				 if(gradeNo==2)
				 {
					gradeName = '小班';
				 }
				 if(gradeNo==3)
				 {
					gradeName = '中班';
				 }
				 if(gradeNo==4)
				 {
					gradeName = '大班';
				 }
				}
				
				var sign=resultData[i].exceptNum;
				var signName="";
				var gradeName = "";
				if(type==3){
					document.getElementById("J-xl-gym").value=date;
			        document.getElementById("timeSec-gym").innerHTML=result.timeDes;
					if(sign==1){
						signName=status1;
					}
					if(sign==2){
						signName=status2;
					}
					if(sign==3){
						signName=status3;
					}
					diffgrade();
					$("#tblist").append("<tr>"+
                                "<td>"+gradeName+"</td>"+					
								"<td>"+resultData[i].className+"</td>"+
								"<td>"+resultData[i].name+"</td>"+
								"<td>"+signName+"</td>"+
							   
								"</tr>" );
					}
					
				if(type==4){
					document.getElementById("J-xl-abnormal").value=date;
					if(sign==1){
						signName=status1;
					}
					if(sign==2){
						signName=status2;
					}
					if(sign==3){
						signName=status3;
					}
					diffgrade();
					$("#tblist").append("<tr>"+
                                "<td>"+gradeName+"</td>"+					
								"<td>"+resultData[i].className+"</td>"+
								"<td>"+resultData[i].name+"</td>"+
								"<td>"+signName+"</td>"+
							   
								"</tr>" );
					}

				if(type==5){
					document.getElementById("J-xl-diet").value=date;
			        document.getElementById("timeSec-diet").innerHTML=result.timeDes;
					if(sign>=1&sign<=5){
						signName=status1;
					}
					if(sign>=6&sign<=8){
						signName=status2;
					}
					if(sign>=9&sign<=10){
						signName=status3;
					}
					diffgrade();
					$("#tblist").append("<tr>"+
					            "<td>"+gradeName+"</td>"+             
								"<td>"+resultData[i].className+"</td>"+
								"<td>"+resultData[i].name+"</td>"+
								"<td>"+sign+"粒米"+"</td>"+
								"<td>"+signName+"</td>"+
								
								"</tr>" );
					}	
			}
				

				
	
	
		  
		 if(page_Count==1){
				$("#divpage").empty();
			  }else{
				if(pageindx < page_Count-1)
				{
					$("#divpage").pagination(pageCount, {
						callback:pageselectCallback,
						prev_text: '<< 上一页',
						next_text: '下一页 >>',
						items_per_page: pageSize,
						num_display_entries: 10,
						current_page: pageindx,
						num_edge_entries: 0
				  });
				}

			  }
		
				  
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

//入离园请求
function initData_Attendance(pageindx,date){
    
	var tbody = "";
	var pageCount = "";
	
	var sleepGrade =document.getElementById("attendanceGrade").value;
	
	var sleepClass =document.getElementById("attendanceClass").value;
	
	var sleepPersonId =document.getElementById("attendancePersonId").value;
	
	//var sleepStatus =document.getElementById("sleepStatus").value;
	
	
	var gardenId=localStorage.getItem('gid');
	
	//121.40.124.253:58093/BflMark
  $.ajax({
	//url : "http://192.168.1.153:8081/BflMark/bflmark/selectSleepInfo?jsoncallback=?",
	url : "http://"+url+"/bflmark/queryInLeaveInfo?jsoncallback=?",
	dataType : 'jsonp',//gradeNum:,classId,personId,quality,order
	data : {pageNo:pageindx,pageSize:10,day:date,gardenId:gardenId,gradeNum:sleepGrade,classId:sleepClass,personId:sleepPersonId},
	jsonp : 'jsoncallback',
	async: false,
	success : function(result) {
		console.log(result);
		
		var resultData = result.sleepInfo;  
		
		//列表数据总数
		var pageCount = result.allCount;
		
		//每页显示数据数
		var pageSize = resultData.length;
		//alert(pageSize);
		
		
		
		//页数
		var page_Count = result.pageCount;
			
		$("#tblist tbody").empty();
		
		if(pageCount==0){
				   $("#selectdata").removeAttr("hidden");
				   $("#divpage").empty();
				}else{
					    $("#selectdata").attr("hidden","hidden");
					}
		
		document.getElementById("J-xl-attendance-start").value=date;
        
		
		for(var i in resultData){
			  picurl = resultData[i].url;
			  psname = resultData[i].name;
			  imgurl="";
			  if(picurl=='--'){
				imgurl=picurl;
			  }else{
				imgurl="<button class='btn btn-primary btn-lg' data-toggle='modal' data-target='#myModal1' onclick='setpic("+JSON.stringify({url: picurl})+","+JSON.stringify({name: psname})+")'></button>";
			  }
				$("#tblist").append("<tr>"+ 			
								"<td>"+resultData[i].className+"</td>"+
								"<td>"+resultData[i].name+"</td>"+
								"<td>"+resultData[i].inTime+"</td>"+
								"<td>"+resultData[i].leaveTime+"</td>"+
								
								"<td>"+imgurl+"</td>"+
								
								"</tr>" );
				
		}
	 

		if(page_Count==1){
                $("#divpage").empty();
            }else{
                if(pageindx < page_Count-1)
                {
                    $("#divpage").pagination(pageCount, {
                        callback:pageselectCallback,
                        prev_text: '<< 上一页',
                        next_text: '下一页 >>',
                        items_per_page: pageSize,
                        num_display_entries: 10,
                        current_page: pageindx,
                        num_edge_entries: 0
                    });
                }
               }


	
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
