//var url_ceshi="192.168.1.153:8081/BflMark/";
var url_ceshi="truelove.youjiaoyun.net/";
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
			
			
			var data=JSON.stringify(resultData);
			localStorage.setItem("data",data);
			for(var i in resultData){
				var pid = resultData[i].personId;
				var pname = resultData[i].studentName;
				//alert(pname);
				var amountCompara = parseInt(resultData[i].amountCompara);
			    var dateCompara = parseInt(resultData[i].dateCompara);
				if(amountCompara > 0){
					amountCompara = '高于' + amountCompara + '%';
					console.log(amountCompara);
					//$('.amC').css({"color":"#44DE44"});
				}else if(amountCompara < 0){
					amountCompara = '低于' + Math.abs(amountCompara) + '%';
					console.log(amountCompara);
					//$('.amC').css({"color":"#FE3A33"});
				}else if(amountCompara == 0){
					amountCompara = '持平';
					//$('.amC').css({"color":"#089BFF"});
				}
				
				if(dateCompara > 0){
					dateCompara = '高于' + dateCompara + '%';
					console.log(dateCompara);
					//$('.Dc').css({"color":"#00D200"});
				}else if(dateCompara < 0){
					dateCompara = '低于' + Math.abs(dateCompara) + '%';
					console.log(dateCompara);
					//$('.Dc').css({"color":"#FE3A33"});
				}else if(dateCompara==0){
					dateCompara = '持平';
					//$('.Dc').css({"color":"#089BFF"});
				}
				
				var $a = $("<tr>"+

					"<td>"+resultData[i].areaAngleName+"</td>"+
					"<td>"+resultData[i].studentName+"</td>"+
					"<td style='padding: 0px;border-right: 0px;'>"+resultData[i].aveAmount+"</td>"+

					'<td style="padding: 0px;">'+'<span class="amC">'+amountCompara+'</span>'+"</td>"+
					'<td style="padding: 0px;border-right: 0px;">'+resultData[i].date+"</td>"+
					'<td style="padding: 0px;border-right: 0px;text-align: center;">'+'<span class= "Dc">'+dateCompara+'</span>'+"</td>"+
					'<td style="padding: 0px;border-right: 0px;text-align: center;"><span">'+resultData[i].time+"</td>"+
					"<td style='padding: 0px;text-align: center;'><button style='' class='btn btn-primary btn-lg' data-toggle='modal' data-target='#myModaldata' onclick='DARDayData("+pid+","+i+")'></button></td>"+
					"<td><button data-toggle='modal' data-target='#myModalvideodata' style='background-color:#fff;' onclick='queryStudentDevelopmenVideoDataInfo("+resultData[i].personId+","+i+",0)'><a>详情</a></button></td>"+
                    "<td><button data-toggle='modal' data-target='#myModalteacherRec' style='background-color:#fff;' onclick='queryStudentDevelopmenObserveDataInfo("+resultData[i].personId+","+i+")'><a>详情</a></button></td>"+
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

            combine();
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

function switchs(type,a){
	var resultData=localStorage.getItem("data");
//	resultData=JSON.parse(resultData);
//  var data=JSON.parse(localStorage.job);
    
    resultData=JSON.parse(resultData);
    console.log(resultData);
	var size=resultData.length;
	//alert(size);
	var i=localStorage.getItem("i");
	var n=parseInt(i)+parseInt(a);
	if(n<0){
		return;
	}
	if(n>size-1){
		return;
	}
	//alert(n);
	var personId=JSON.parse(resultData[n].personId);
	//alert(personId);
	if(type==1){
		DARDayData(personId,n);
	}
	if(type==2){
		queryStudentDevelopmenVideoDataInfo(personId,n,0);
	}
	if(type==3){
		queryStudentDevelopmenObserveDataInfo(personId,n);
	}
}
