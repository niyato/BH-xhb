//var url_ceshi="192.168.1.153:8081/BflMark/";
var url_ceshi="truelove.youjiaoyun.net/";
//查询学生区角记录
function queryStudentDevelopmenVideoDataInfo(personId,i,pageindx){
	var tbody = "";
	var pageCount = "";
	var gardenId=localStorage.getItem('gid');
	localStorage.setItem("videoPersonId",personId);
//	var gradeNums=document.getElementById("activityGrade").value;
//	var classId=document.getElementById("activityClass").value;
//
//	var studentName=document.getElementById("activityStudent").value;
//
//	var angleTypeId=document.getElementById("activityStatus").value;
	//alert(angleTypeId);
	var startTime=document.getElementById("input1").value;

	var endTime=document.getElementById("input2").value;
	localStorage.setItem("i",i);
//	alert(gardenId);
	$.ajax({

		url : "http://"+url_ceshi+"areaAngle/queryStudentDevelopmenVideoDataInfo?jsoncallback=?",
		dataType : 'jsonp',
		data : {gardenId:gardenId,personId:personId,start:startTime,end:endTime,page:pageindx,pageSize:10},
		jsonp : 'jsoncallback',
		async: false,
		success : function(result) {
			console.log(result);
			//var rows="";
			var resultData = result.studentDevelopmentDayData;

			//列表数据总数
			var pageCount = result.allCount;
			//每页显示数据数
			var pageSize = resultData.studentAreaRecordList.length;

			
			//页数
			var page_Count = result.pageCount;

			$("#tb_doc_video tbody").empty();
//			if(pageSize==0){
//				$("#selectdata_record").show();
//
//			}else{
//				$("#selectdata_record").hide();
//			}
			document.getElementById("class_video").innerHTML=resultData.className;
			document.getElementById("name_video").innerHTML=resultData.studentName;
			document.getElementById("date_video").innerHTML=resultData.startTime+"~"+resultData.endTime;
			for(var i in resultData.studentAreaRecordList){

				
				var areaName=resultData.studentAreaRecordList[i].areaName;
				if(areaName==null){
					areaName='';
				}
				var url="无视频";
				//alert(resultData[i].videoPathList.length);   onclick='onload("+resultData[i].videoPathList+")'
				if(resultData.studentAreaRecordList[i].videoPathList.length !=0){
					url="<a class='video_link' href='#' data-width='640' data-height='360'><img src='Content/css/images/video-10.png' width='20' height='20'></a>";
				}
				var $a = $("<tr>"+

					"<td>"+areaName+"</td>"+
					"<td>"+resultData.studentAreaRecordList[i].startTime+"</td>"+
					"<td>"+resultData.studentAreaRecordList[i].endTime+"</td>"+
					"<td>"+resultData.studentAreaRecordList[i].leaveTime+"分钟"+"</td>"+
					"<td>"+resultData.studentAreaRecordList[i].amount+"</td>"+
					"<td>"
					+url
					+"</td>"+
					"</tr>" );
				$a.data('entity', resultData.studentAreaRecordList[i]);
				$("#tb_doc_video").append($a);
			}

			//$("#tblist").append(tbody);//添加到table
//			bindingHover();
			$("#divpage2").empty();
			if(page_Count<=1){
				$("#divpage2").empty();
			}else{
				if(pageindx < page_Count-1)
				{
					$("#divpage2").pagination(pageCount, {
						callback:pageselectCallback2,
						prev_text: '<< 上一页',
						next_text: '下一页 >>',
						items_per_page: pageSize,
						num_display_entries: 10,
						current_page: pageindx,
						num_edge_entries: 0
					});
				}

			}


			//combine('tblist');

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

function queryStudentDevelopmenObserveDataInfo(personId,i){
	var tbody = "";
	var pageCount = "";
	var gardenId=localStorage.getItem('gid');
//	alert(gardenId);
//	var gradeNums=document.getElementById("activityGrade").value;
//	var classId=document.getElementById("activityClass").value;
//
//	var studentName=document.getElementById("activityStudent").value;
//
//	var angleTypeId=document.getElementById("activityStatus").value;
	//alert(angleTypeId);
	var startTime=document.getElementById("input1").value;

	var endTime=document.getElementById("input2").value;
	localStorage.setItem("i",i);
	$.ajax({

		url : "http://"+url_ceshi+"areaAngle/queryStudentDevelopmenObserveDataInfo?jsoncallback=?",
		dataType : 'jsonp',
		data : {gardenId:gardenId,personId:personId,start:startTime,end:endTime},
		jsonp : 'jsoncallback',
		async: false,
		success : function(result) {
			console.log(result);
			//var rows="";
			var resultData = result.studentDevelopmentDayData;



			$("#tb_doc_teacherRec tbody").empty();
//			if(pageSize==0){
//				$("#selectdata_record").show();
//
//			}else{
//				$("#selectdata_record").hide();
//			}
			document.getElementById("class_observe").innerHTML=resultData.className;
			document.getElementById("name_observe").innerHTML=resultData.studentName;
			document.getElementById("date_observe").innerHTML=resultData.startTime+"~"+resultData.endTime;
			for(var i in resultData.studentInfoObserveList){

				
				var areaName=resultData.studentInfoObserveList[i].areaName;
				if(areaName==null){
					areaName='';
				}
//				var url="无视频";
//				//alert(resultData[i].videoPathList.length);   onclick='onload("+resultData[i].videoPathList+")'
//				if(resultData.studentAreaRecordList[i].videoPathList.length !=0){
//					url="<a class='video_link' href='#' data-width='640' data-height='360'><img src='Content/css/images/video-10.png' width='20' height='20'></a>";
//				}
				var $a = $("<tr>"+

					"<td>"+areaName+"</td>"+
					"<td>"+resultData.studentInfoObserveList[i].observeInput+"</td>"+
					"<td>"+resultData.studentInfoObserveList[i].analysisInput+"</td>"+
					"<td>"+resultData.studentInfoObserveList[i].recordTime+"</td>"+
					"<td>"+resultData.studentInfoObserveList[i].createUserName+"</td>"+
					"<td>"
					+"<a>观察记录</a>"
					+"</td>"+
					"</tr>" );
//				$a.data('entity', resultData.studentInfoObserveList[i]);
				$("#tb_doc_teacherRec").append($a);
			}

			//$("#tblist").append(tbody);//添加到table
			bindingHover();

			if(page_Count<=1){
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


			//combine('tblist');

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