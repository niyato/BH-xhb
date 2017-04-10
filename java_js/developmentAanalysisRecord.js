var url_ceshi="192.168.1.153:8081/BflMark/";
//查询幼儿园所有学生条件信息
function queryStudentInfoByClassId(){

	var gardenId=localStorage.getItem('gid');
	var gradeNum=document.getElementById('activityGrade').value;
	var classId=document.getElementById('activityClass').value;
	

	$.ajax({
		url : "http://"+url_ceshi+"areaAngle/queryStudentInfoByClassId?jsoncallback=?",
		dataType : 'jsonp',
		data : {gardenId:gardenId,gradeNum:gradeNum,classId:classId},
		jsonp : 'jsoncallback',
		async: false,

		success : function(result) {
			console.log(result);

			var studentInfo = result.studentInfo;


			//根据id查找对象，班级
			var obj1=document.getElementById('activityStudent');
			obj1.length=0;
			obj1.add(new Option("请选择学生",parseInt(0)));

			for(var i in studentInfo){

				//添加一个选项
				obj1.add(new Option(studentInfo[i].studentName,studentInfo[i].personId));
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

//查询学生个体记录与分析
function queryStudentDevelopmenRecordAndAnalysisInfo(pageindx){
    //alert(1);
	var tbody = "";
	var pageCount = "";
	var gardenId=localStorage.getItem('gid');

	var gradeNum=document.getElementById("activityGrade").value;
	var classId=document.getElementById("activityClass").value;

	var personId=document.getElementById("activityStudent").value;

	var angleTypeId=document.getElementById("activityStatus").value;
	//alert(angleTypeId);
	var startTime=document.getElementById("input1").value;

	var endTime=document.getElementById("input2").value;
	
	var areaClassId=document.getElementById("area_Class").value;
	var areaType=document.getElementById("areaTypeSelect").value;
	var areaAngleName=document.getElementById("areaAngleName").value;
	
	

	$.ajax({
		//page:pageindx,pageSize:10,
		url : "http://"+url_ceshi+"areaAngle/queryStudentDevelopmenRecordAndAnalysisInfo?jsoncallback=?",
		dataType : 'jsonp',
		data : {gardenId:gardenId,gradeNum:gradeNum,classId:classId,personId:personId,angleTypeId:angleTypeId,start:startTime,end:endTime,
			    areaClassId:areaClassId,areaType:areaType,areaAngleName:areaAngleName,page:pageindx,pageSize:10},
		jsonp : 'jsoncallback',
		async: false,
		success : function(result) {
			console.log(result);
			//var rows="";
			var resultData = result.observeAnalysisInfos;
//			var observeAnalysisInfo=JSON.stringify(observeAnalysisInfos);

//			localStorage.setItem("observeAnalysisInfos",observeAnalysisInfo);
			//列表数据总数
			var pageCount = result.allCount;
//			alert(pageCount);
			//每页显示数据数
			var pageSize = resultData.length;

			
			//页数
			var page_Count = result.pageCount;

			//alert(page_Count);

			$("#tb_doc_m tbody").empty();
			if(pageSize==0){
				$("#selectdata").show();

			}else{
				$("#selectdata").hide();
			}
			
			for(var i in resultData){
				var $a = $("<tr>"+

					"<td>"+resultData[i].areaAngleName+"</td>"+
					"<td>"+resultData[i].studentName+"</td>"+
					"<td style='padding: 0px;border-right: 0px;'>"+resultData[i].aveAmount+"</td>"+

					'<td style="text-align:left; width:150px;padding: 0px;">'+resultData[i].amountCompara+"</td>"+
					'<td style="padding: 0px;border-right: 0px;">'+resultData[i].date+"</td>"+
					'<td style="padding: 0px;border-right: 0px;text-align: left;">'+resultData[i].dateCompara+"</td>"+
					'<td style="padding: 0px;border-right: 0px;text-align: left;"><span style="display:block;margin-left: -40px;">'+resultData[i].time+"</td>"+
					'<td style="padding: 0px;text-align: left;"><button style="display:block;margin-left: -70px;" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModaldata"></button></td>'+
					"<td><button data-toggle='modal' data-target='#myModalvideodata' style='background-color:#fff;'><a>详情</a></button></td>"+
                    "<td><button data-toggle='modal' data-target='#myModalteacherRec' style='background-color:#fff;'><a>详情</a></button></td>"+
					"</tr>" );
//				$a.data('entity', resultData[i]);
				$("#tb_doc_m").append($a);
			}

			//$("#tblist").append(tbody);//添加到table
//			bindingHover();

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

};