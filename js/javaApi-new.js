//var url="truelove.youjiaoyun.net";
var url="192.168.1.153:8081/BflMark";


//查询睡眠信息
function onchangeSleepDate(){
	//alert(1);
	var current=document.getElementById("J-xl").value;
	//alert(current);
	initData(0,current,1);
};

//查询运动信息
function onchangeMoveDate(){
	//alert(1);
	var current=document.getElementById("J-x1_move").value;
	//alert(current);
	initData_move(0,current);
};

//查询餐饮，体操，异常信息
function onchangeSignDate(type){
	//alert(1);
	var current=document.getElementById("J-x1_Sign").value;
	//alert(current);
	initData_Sign(0,current,type);
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
			
			
			document.getElementById("J-xl").value=date;
			document.getElementById("timeSec").innerHTML=result.timeDes;
			for(var i in resultData){

				//alert(result.gameRecord[i].endTime);
				var sleepTime=resultData[i].sleepTime;
				var averageTime=resultData[i].averageTime;
				
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
				$("#tblist").append("<tr>"+             
								"<td>"+resultData[i].className+"</td>"+
								"<td>"+resultData[i].name+"</td>"+
								"<td>"+time1+"</td>"+
								"<td>"+
								time
								+"</td>"+
							   "<td>"+resultData[i].quality+"</td>"+
							   "<td>"+"<button class='btn btn-primary btn-lg' data-toggle='modal' data-target='#myModal'></button>"+"</td>"+
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
function initData_move(pageindx,date){
    var type=4;
	var tbody = "";
	var pageCount = "";
	
	var sleepGrade =document.getElementById("sleepGrade").value;
	
	var sleepClass =document.getElementById("sleepClass").value;
	
	var sleepPersonId =document.getElementById("sleepPersonId").value;
	
	var sleepStatus =document.getElementById("sleepStatus").value;
	
	
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
			
			
			document.getElementById("J-xl").value=date;
			document.getElementById("timeSec").innerHTML=result.timeDes;
			for(var i in resultData){

				//alert(result.gameRecord[i].endTime);
				var heavyTime=resultData[i].heavyTime;
				var centerTime=resultData[i].centerTime;
				var lowTime=resultData[i].lowTime;
				
				
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
				
				$("#tblist").append("<tr>"+             
								"<td>"+resultData[i].className+"</td>"+
								"<td>"+resultData[i].name+"</td>"+
								"<td>"+time+"</td>"+
								"<td>"+time1+"</td>"+
								"<td>"+time2+"</td>"+
								
							   "<td>"+resultData[i].quality+"</td>"+
							   "<td>"+"<button class='btn btn-primary btn-lg' data-toggle='modal' data-target='#myModal'></button>"+"</td>"+
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



//餐饮，体操，异常请求
function initData_Sign(pageindx,date,type){
    
	var tbody = "";
	var pageCount = "";
	
	var sleepGrade =document.getElementById("sleepGrade").value;
	
	var sleepClass =document.getElementById("sleepClass").value;
	
	var sleepPersonId =document.getElementById("sleepPersonId").value;
	
	var sleepStatus =document.getElementById("sleepStatus").value;
	
	
	var gardenId=localStorage.getItem('gid');

	var status1="";
	var status2="";
	var status3="";
	if(type==3){
		status1="安静";
		status2="适中";
		status3="活泼";
	}
	if(type==4){
		status1="正常";
		status2="需要留意";
		status3="特别关注";

	}
	if(type==5){
		status1="习惯良好";
		status2="习惯一般";
		status3="习惯较差";

	}
	//alert(gardenId);
	//121.40.124.253:58093/BflMark
  $.ajax({
	//url : "http://192.168.1.153:8081/BflMark/bflmark/selectSleepInfo?jsoncallback=?",
	url : "http://"+url+"/bflmark/selectSleepInfo?jsoncallback=?",
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
			
			
			document.getElementById("J-xl").value=date;
			document.getElementById("timeSec").innerHTML=result.timeDes;
			for(var i in resultData){
				var sign=resultData[i].exceptNum;
				var signName="";
				if(type==3){
					if(sign==1){
						signName=status1;
					}
					if(sign==2){
						signName=status2;
					}
					if(sign==3){
						signName=status3;
					}
					
					$("#tblist").append("<tr>"+             
								"<td>"+resultData[i].className+"</td>"+
								"<td>"+resultData[i].name+"</td>"+
								"<td>"+signName+"</td>"+
							   
								"</tr>" );
					}
					
				if(type==4){
					if(sign==1){
						signName=status1;
					}
					if(sign==2){
						signName=status2;
					}
					if(sign==3){
						signName=status3;
					}
					$("#tblist").append("<tr>"+             
								"<td>"+resultData[i].className+"</td>"+
								"<td>"+resultData[i].name+"</td>"+
								"<td>"+signName+"</td>"+
							   
								"</tr>" );
					}

				if(type==5){
					if(sign>=1&sign<=5){
						signName=status1;
					}
					if(sign>=6&sign<=8){
						signName=status2;
					}
					if(sign>=9&sign<=10){
						signName=status3;
					}
					$("#tblist").append("<tr>"+             
								"<td>"+resultData[i].className+"</td>"+
								"<td>"+resultData[i].name+"</td>"+
								"<td>"+sign+粒米+"</td>"+
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