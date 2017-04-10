var url_ceshi="192.168.1.153:8081/BflMark/";
//查询观察记录
function queryObserveRecord(){
	var gardenId=localStorage.getItem('gid');
	var gradeNum=document.getElementById('activityGrade').value;
	var classId=document.getElementById("activityClass").value;
    //alert(classId);
	//var studentName=document.getElementById("activityStudent").value;

	var angleTypeId = areaid;
	//alert(angleTypeId);
	var startTime=document.getElementById("input1").value;
    //alert(startTime);
	var endTime=document.getElementById("input2").value;
	
	var content = "";
	$.ajax({
		url:"http://"+url_ceshi+"areaAngle/queryAreaObserveRecordBeforeInfo?jsoncallback=?",
		//url:"http://192.168.1.153:8081/BflMark/areaAngle/queryAreaObserveRecordBeforeInfo?gardenId=745&gradeNum=3&classId=31509&areaAngleId=9&start=2017-03-01&end=2017-03-20",
		dataType:'jsonp',
		data:{gardenId:gardenId,gradeNum:gradeNum,classId:classId,areaAngleId:angleTypeId,start:startTime,end:endTime},
		//data:{gardenId:'745',gradeNum:'3',classId:'31509',areaAngleId:'9',start:'2017-03-01',end:'2017-03-20'},
		async: false,
		success : function(result) {
            var resultdata = result.areaAnglePersons;
			console.log(resultdata);
			var objcname = $('.checkname');
			objcname.empty();
			content+="<input type='checkbox' id='allsel' style='margin-left:20px; margin-right:10px;'><span>全选</span>;"
			for(i= 0;i<resultdata.length;i++){
				content += "<input id='"+resultdata[i].personId+"' class='selname' name='selname' type='checkbox'>"+"<span class='student-name'>"+resultdata[i].studentName+"</span>";
			}
            objcname.append(content);
			//复选框begin  
				$("#allsel").click(function(){  
					//判断checkall的属性checked的值是否是checked。  
					//如果是所有的选项框都打上对号  
					//如果不是，将所有的选项框的对号清空  
					  
					if($("#allsel").prop("checked")==true)  
						{  
						$("input:checkbox").prop("checked",true);  
						}  
					else  
						{  
						$("input:checkbox").prop("checked",false);  
						}    
				});  
				$(".selname").bind({  
					change:function(){  
						 $(".selname").each(function()//遍历每个.checkcell的checkbox  
							  {  
								  if($(this).prop("checked")==false)//如果checkcell取消选中  
									  {
									  $(this).removeAttr("checked");											  
									  $("#allsel").removeAttr("checked");  
									  }else{
										$(this).prop("checked",true);//如果checkcell被选中，页面显示选中  
										$(this).attr("checked","checked");//checked属性值设置为checked 
									  }   
							  });
						var checkedLength=$(".selname[checked='checked']").length;
						var subLength=$(".selname").length;
						if(subLength!=checkedLength){
							$("#allsel").prop("checked",false); 
						}else{
							$("#allsel").prop("checked",true); 
							$("#allsel").attr("checked","checked");
						}
						
					}  
					  
				});      

			//复选框end
			
		
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

function queryAreaObserveRecordAnalysisInfo(){
	var gardenId=localStorage.getItem('gid');
	var gradeNum=document.getElementById('activityGrade').value;
	var classId=document.getElementById("activityClass").value;
	
    //alert(classId);
	//var studentName=document.getElementById("activityStudent").value;
    var startTime=document.getElementById("input1").value;
    //alert(startTime);
	var endTime=document.getElementById("input2").value;
	var areaAngleId = areaid;
//	alert(areaAngleId);
	
	var pidss = new Array();
    //var pids = $("input:checkbox[name='selname']:checked").attr('id');
	var i=0;
	$("input:checkbox[name='selname']:checked").each(function(){
		pidss[i] = $(this).attr('id');
		i = i+1;
	});
	console.log(pidss); 
	var personIds="";
	for (var j=0;j<pidss.length;j++) {
		personIds+=pidss[j];
		if(j!=pidss.length){
			personIds+=",";
		}
	}
	var content1 ="";
    var content2 = "";
    var content3 = "";	
    var content4 = "";
	$.ajax({
		url:"http://"+url_ceshi+"areaAngle/queryAreaObserveRecordAnalysisInfo?jsoncallback=?",
		//url:"http://192.168.1.153:8081/BflMark/areaAngle/queryAreaObserveRecordAnalysisInfo?gardenId=745&gradeNum=3&classId=31509&areaAngleId=9&start=2017-03-01&end=2017-03-20&personIds=924747,924748",
		dataType:'jsonp',
		data:{gardenId:gardenId,gradeNum:gradeNum,classId:classId,start:startTime,end:endTime,personIds:personIds,areaAngleId:areaAngleId},
//		data:{gardenId:'745',gradeNum:'3',classId:'31509',areaAngleId:'9',start:'2017-03-01',end:'2017-03-20',personIds:"924747,924748"},
		async: false,
		success : function(result) {
			var resultdata = result.observeRecordInfo;
            console.log(resultdata);
            $("#content1").empty();
			$("#content2").empty();
			$("#observeAnalyUl").empty();
			$("#analyAdjustUl").empty();
            content1 = "<table width='100%' border='0' cellspacing='0' style='' class='accTabbox' id=''>"+
											"<thead >"+
												"<tr>"+
													"<th scope='col'>学生名称</th>"+
													"<th scope='col'>参与次数</th>"+
													"<th scope='col'>个人平均运动量</th>"+
													"<th scope='col'>与班级平均值比较</th>"+
													"<th scope='col'>个人停留时间</th>"+
													"<th scope='col'>与班级平均值比较</th>"+
												"</tr>"+
											"</thead>"+
											"<tbody >";
            for(var i =0;i<resultdata.observeAnalysisInfos.length;i++){
				
									content1 +=		"<tr>"+
													  "<td>"+resultdata.observeAnalysisInfos[i].studentName+"</td>"+
													  "<td>"+resultdata.observeAnalysisInfos[i].time+"</td>"+
													  "<td>"+resultdata.observeAnalysisInfos[i].aveAmount+"</td>"+
													  "<td>"+resultdata.observeAnalysisInfos[i].amountCompara+"</td>"+
													  "<td>"+resultdata.observeAnalysisInfos[i].date+"</td>"+
													  "<td>"+resultdata.observeAnalysisInfos[i].dateCompara+"</td>"+
												"</tr>";							
											
			}
			content1 +="</tbody>" +   "</table>";
			content2 += "<table width='100%' border='0' cellspacing='0' style='' class='accTabbox' id=''>"+
											"<thead >"+
												"<tr>"+
													"<th scope='col'>学生名称</th>"+
													"<th scope='col'>进入时间</th>"+
													"<th scope='col'>离开时间</th>"+
													"<th scope='col'>停留时长</th>"+
													"<th scope='col'>活动量</th>"+
													"<th scope='col'>操作</th>"+
												"</tr>"+
											"</thead>"+
											"<tbody >";
			var url="";
			//alert(resultData[i].videoPathList.length);   onclick='onload("+resultData[i].videoPathList+")'
			if(resultdata.studentAreaRecord[i].videoPathList.length !=0){
				url="<a class='video_link' href='#' data-width='640' data-height='360'><img src='Content/css/images/video-10.png' width='20' height='20'></a>";
			}else{
				url="无视频";
			}
			for(var i =0;i<resultdata.studentAreaRecord.length;i++){
				
									content2 +=		"<tr>"+
													  "<td>"+resultdata.studentAreaRecord[i].studentName+"</td>"+
													  "<td>"+resultdata.studentAreaRecord[i].startTime+"</td>"+
													  "<td>"+resultdata.studentAreaRecord[i].endTime+"</td>"+
													  "<td>"+resultdata.studentAreaRecord[i].leaveTime+"</td>"+
													  "<td>"+resultdata.studentAreaRecord[i].amount+"</td>"+
													  "<td>"+url+"</td>"+
												"</tr>";								
											
			}
			content2 += "</tbody>"    +"</table>";
			bindingHover();
			
			for(var i =0;i<resultdata.students.length;i++){
				
									content3 +=	"<li>"+
													  "<span style='color:#FF6700;'>"+resultdata.students[i].studentName+"</span><br/>"+
													  "<textarea id="+resultdata.students[i].personId+"observe"+" style='padding:3px 6px; width:648px; height:50px;border:1px solid lightgrey; margin-right:20px;' placeholder='请描述下孩子在活动中的表现，可以在注意力、参与度、情绪态度、同伴交往等维度进行记录'></textarea>"+
												"</li>";	
									content4 +=	"<li>"+
													  "<span style='color:#FF6700;'>"+resultdata.students[i].studentName+"</span><br/>"+
													  "<textarea id="+resultdata.students[i].personId+"adjust"+" style='padding:3px 6px; width:648px; height:50px;border:1px solid lightgrey; margin-right:20px;' placeholder='请描述下孩子在活动中的表现，可以在注意力、参与度、情绪态度、同伴交往等维度进行记录'></textarea>"+
												"</li>";	
											
			}
            $("#content1").append(content1);
			$("#content2").append(content2);
			$("#observeAnalyUl").append(content3);
			$("#analyAdjustUl").append(content4);
            

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

function recordObserveRecordAnalysisInfo(){
	var gardenId=localStorage.getItem('gid');
	var createUserName=localStorage.getItem('tname');
	var createUserId=localStorage.getItem('pid');
	createUserId=parseInt(createUserId);
	var gradeNum=document.getElementById('activityGrade').value;
	var classId=document.getElementById("activityClass").value;
    //alert(classId);
	//var studentName=document.getElementById("activityStudent").value;

	var areaAngleId = areaid;
//	alert(areaAngleId);
	var startTime=document.getElementById("input1").value;
    //alert(startTime);
	var endTime=document.getElementById("input2").value;
	var recordName=document.getElementById("recordName").value;
	var recordGoal=document.getElementById("recordGoal").value;
	var pictureDes=document.getElementById("pictureDes").value;
	
	var studentInfoObserves=new Array();
	var i=0;
	var pidss = new Array();
	$("input:checkbox[name='selname']:checked").each(function(){
		var personId=$(this).attr('id');
		var studentInfo=new Object();
		studentInfo.personId=parseInt(personId);
		studentInfo.observeInput=document.getElementById(personId+"observe").value;
		studentInfo.analysisInput=document.getElementById(personId+"adjust").value;
//		var observeInput=document.getElementById(personId+"observe").value;
//		var analysisInput=document.getElementById(personId+"adjust").value;
		studentInfoObserves.push(studentInfo);
		pidss[i] = $(this).attr('id');
		i = i+1;
	});
	var personIds="";
	for (var j=0;j<pidss.length;j++) {
		personIds+=pidss[j];
		if(j!=pidss.length){
			personIds+=",";
		}
	}
	var picPaths=new Array();
    objxinfopic = $(".xinforpic");
	$(".xinforpic img").each(function(){
	  for(var i=0; i<objxinfopic.length;i++){
		  picPaths[i] = $(this).attr("src");
	  }
	});
	studentInfoObserves=JSON.stringify(studentInfoObserves);
	picPaths=JSON.stringify(picPaths);
//	console.log(studentInfoObserves);
//	console.log(createUserId);
//	console.log(pictureDes);
//	console.log(picPaths);
//	console.log(createUserName);
//	console.log(classId);
//	console.log(gradeNum);
//	console.log(areaAngleId);
//	console.log(recordName);
//	console.log(recordGoal);
//	console.log(pictureDes);
	$.ajax({
		url:"http://"+url_ceshi+"areaAngle/recordObserveRecordAnalysisInfo?jsoncallback=?",
		//url:"http://192.168.1.153:8081/BflMark/areaAngle/queryAreaObserveRecordBeforeInfo?gardenId=745&gradeNum=3&classId=31509&areaAngleId=9&start=2017-03-01&end=2017-03-20",
		dataType:'jsonp',
		data:{gardenId:gardenId,gradeNum:gradeNum,classId:classId,areaAngleId:areaAngleId,start:startTime,end:endTime,
			personIds:personIds,createUserName:createUserName,createUserId:createUserId,recordName:recordName,recordGoal:recordGoal,pictureDes:pictureDes,
		    studentInfoObserve1:studentInfoObserves,picPaths:picPaths},
//		data:{gardenId:'745',gradeNum:'3',classId:'31509',areaAngleId:'9',start:'2017-03-01',end:'2017-03-20',personIds:"924747,924748"},
		async: false,
		success : function(result) {
            var resultdata = result.flag;
			console.log(resultdata);
			if(result.flag=="success"){
				easyDialog.open({
                    container: {
                        content: '插入成功！',
                    },
                    autoClose: 2000,
					callback:function(){
//						   window.location.href = 'areaAngleAngalysis.html';
						}
                });
                return false;

		    }else{
				  easyDialog.open({
					     container:{
							   content:'插入失败！',
							 },
						 autoClose:2000
					  });
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
//查询观察记录名字信息
function queryAreaObserveRecordName(){
	var gardenId=localStorage.getItem('gid');
	var personId=localStorage.getItem('pid');
	var gradeNum=document.getElementById('activityGrade').value;
	var classId=document.getElementById("activityClass").value;
	
    var startTime=document.getElementById("input1").value;
	var endTime=document.getElementById("input2").value;
	var areaAngleId = areaid;
	var areaAngleName = areaname;
	var content1 ="";
//  var content2 = "";
//  var content3 = "";	
//  var content4 = "";
	$.ajax({
		url:"http://"+url_ceshi+"areaAngle/queryAreaObserveRecordName?jsoncallback=?",
		dataType:'jsonp',
		data:{gardenId:gardenId,gradeNum:gradeNum,classId:classId,start:startTime,end:endTime,areaAngleId:areaAngleId},
		async: false,
		success : function(result) {
			var resultdata = result.observeRecordNames;
            console.log(resultdata);
            $("#tb_doc_m tbody").empty();
            if(resultdata.length==0){
				$("#selectdata").show();

			}else{
				$("#selectdata").hide();
			}
            for(var i =0;i<resultdata.length;i++){
									var str="";
									if(personId==resultdata[i].createUserId){
										str="<a href='#' onclick='justHistoryEdit("+resultdata[i].recordId+","+JSON.stringify({areaAngleName: areaAngleName})+")'>编辑</a>&nbsp <a style='color:#2baf2b;'";
									}
									content1 +=		"<tr>"+
													  // "<td><input class='onesel' type='checkbox'></td>"+
													  "<td>"+resultdata[i].gradeName+"</td>"+
													  "<td>"+resultdata[i].className+"</td>"+
													  "<td>"+resultdata[i].recordName+"</td>"+
													  "<td>"+resultdata[i].recordTime+"</td>"+
													  "<td>"+resultdata[i].createUserName+"</td>"+
													  "<td><a href='#' onclick='justHistoryLook("+resultdata[i].recordId+","+JSON.stringify({areaAngleName: areaAngleName})+")'>查看</a>&nbsp "+str
													  +"</td>"
												"</tr>";							
											
			}
			
			$("#tb_doc_m").append(content1);
            

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
function justHistoryEdit(recordId,areaAngleName){
	recordId = recordId;
	areaAngleName = areaAngleName.areaAngleName;
	localStorage.setItem("recordId",recordId);
	localStorage.setItem("areaAngleName",areaAngleName);
	var url = "historyRecordEdit.html";
	window.location.assign(url);
}
function justHistoryLook(recordId,areaAngleName){
	recordId = recordId;
	areaAngleName = areaAngleName.areaAngleName;
	localStorage.setItem("recordId",recordId);
	localStorage.setItem("areaAngleName",areaAngleName);
	var url = "historyRecordLook.html";
	window.location.assign(url);
}
function queryEnteringObserveRecordInfo(){
	var recordId=localStorage.getItem('recordId');
	var content0="";
	var content1 ="";
    var content2 = "";
    var content3 = "";	
    var content4 = "";
	$.ajax({
		url:"http://"+url_ceshi+"areaAngle/queryEnteringObserveRecordInfo?jsoncallback=?",
		//url:"http://192.168.1.153:8081/BflMark/areaAngle/queryAreaObserveRecordAnalysisInfo?gardenId=745&gradeNum=3&classId=31509&areaAngleId=9&start=2017-03-01&end=2017-03-20&personIds=924747,924748",
		dataType:'jsonp',
		data:{recordId:recordId},
		async: false,
		success : function(result) {
			
			var resultdata = result.observeRecordInfo;
            console.log(resultdata);
            document.getElementById("startTime").innerHTML=resultdata.startTime;
            document.getElementById("endTime").innerHTML=resultdata.endTime;
            document.getElementById("gradeName").innerHTML=resultdata.gradeName;
            document.getElementById("className").innerHTML=resultdata.className;
            document.getElementById("recordName").value=resultdata.recordName;
            document.getElementById("recordGoal").value=resultdata.recordGoal;
            
            var studentInfoObserve=resultdata.studentInfoObserve;
            localStorage.setItem("studentInfoObserve",JSON.stringify(studentInfoObserve));
			
			var imgurls = resultdata.picturePaths;
			for(var i=0; i<imgurls.length;i++){
				id+= i;
				$(".img-cont .file").before("<div id='"+id+"' class='xinforpic'><img src='' ><a onclick='delpic(this)' class='delete-btn'></a></div>");
				$("#" + id + " img").attr('src',resultdata.picturePaths[i]);
			}
			
            for (var i =0;i<studentInfoObserve.length;i++) {
            	
            	
            	
            	content0+="&nbsp;"+studentInfoObserve[i].studentName+"&nbsp;";
            	
            	content3 +=	"<li>"+
								  "<span style='color:#FF6700;'>"+studentInfoObserve[i].studentName+"</span><br/>"+
								  "<textarea id="+studentInfoObserve[i].personId+"observe"+" style='padding:3px 6px; width:648px; height:50px;border:1px solid lightgrey; margin-right:20px;' placeholder='请描述下孩子在活动中的表现，可以在注意力、参与度、情绪态度、同伴交往等维度进行记录'>"+studentInfoObserve[i].observeInput+"</textarea>"+
							"</li>";	
				content4 +=	"<li>"+
								  "<span style='color:#FF6700;'>"+studentInfoObserve[i].studentName+"</span><br/>"+
								  "<textarea id="+studentInfoObserve[i].personId+"adjust"+" style='padding:3px 6px; width:648px; height:50px;border:1px solid lightgrey; margin-right:20px;' placeholder='请描述下孩子在活动中的表现，可以在注意力、参与度、情绪态度、同伴交往等维度进行记录'>"+studentInfoObserve[i].analysisInput+"</textarea>"+
							"</li>";
            	
            }
            
            content1 = "<table width='100%' border='0' cellspacing='0' style='' class='accTabbox' id=''>"+
											"<thead >"+
												"<tr>"+
													"<th scope='col'>学生名称</th>"+
													"<th scope='col'>参与次数</th>"+
													"<th scope='col'>个人平均运动量</th>"+
													"<th scope='col'>与班级平均值比较</th>"+
													"<th scope='col'>个人停留时间</th>"+
													"<th scope='col'>与班级平均值比较</th>"+
												"</tr>"+
											"</thead>"+
											"<tbody >";
            for(var i =0;i<resultdata.observeAnalysisInfos.length;i++){
				
									content1 +=		"<tr>"+
													  "<td>"+resultdata.observeAnalysisInfos[i].studentName+"</td>"+
													  "<td>"+resultdata.observeAnalysisInfos[i].time+"</td>"+
													  "<td>"+resultdata.observeAnalysisInfos[i].aveAmount+"</td>"+
													  "<td>"+resultdata.observeAnalysisInfos[i].amountCompara+"</td>"+
													  "<td>"+resultdata.observeAnalysisInfos[i].date+"</td>"+
													  "<td>"+resultdata.observeAnalysisInfos[i].dateCompara+"</td>"+
												"</tr>";							
											
			}
			content1 +="</tbody>" +   "</table>";
			content2 += "<table width='100%' border='0' cellspacing='0' style='' class='accTabbox' id=''>"+
											"<thead >"+
												"<tr>"+
													"<th scope='col'>学生名称</th>"+
													"<th scope='col'>进入时间</th>"+
													"<th scope='col'>离开时间</th>"+
													"<th scope='col'>停留时长</th>"+
													"<th scope='col'>活动量</th>"+
													"<th scope='col'>操作</th>"+
												"</tr>"+
											"</thead>"+
											"<tbody >";
			for(var i =0;i<resultdata.studentAreaRecord.length;i++){
				
									content2 +=		"<tr>"+
													  "<td>"+resultdata.studentAreaRecord[i].studentName+"</td>"+
													  "<td>"+resultdata.studentAreaRecord[i].startTime+"</td>"+
													  "<td>"+resultdata.studentAreaRecord[i].endTime+"</td>"+
													  "<td>"+resultdata.studentAreaRecord[i].leaveTime+"</td>"+
													  "<td>"+resultdata.studentAreaRecord[i].amount+"</td>"+
													  "<td>"+resultdata.studentAreaRecord[i].videoPathList+"</td>"+
												"</tr>";								
											
			}
			content2 += "</tbody>"    +"</table>";
			
			$("#checkname").append(content0);
            $("#content1").append(content1);
			$("#content2").append(content2);
			$("#observeAnalyUl").append(content3);
			$("#analyAdjustUl").append(content4);
            

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

function queryEnteringObserveRecordInfo2(){
	var recordId=localStorage.getItem('recordId');
	var content0="";
	var content1 ="";
    var content2 = "";
    var content3 = "";	
    var content4 = "";
	var id= "img";
	var contentimg = "";
	$.ajax({
		url:"http://"+url_ceshi+"areaAngle/queryEnteringObserveRecordInfo?jsoncallback=?",
		//url:"http://192.168.1.153:8081/BflMark/areaAngle/queryAreaObserveRecordAnalysisInfo?gardenId=745&gradeNum=3&classId=31509&areaAngleId=9&start=2017-03-01&end=2017-03-20&personIds=924747,924748",
		dataType:'jsonp',
		data:{recordId:recordId},
		async: false,
		success : function(result) {
			
			var resultdata = result.observeRecordInfo;
            console.log(resultdata);
            document.getElementById("startTime").innerHTML=resultdata.startTime;
            document.getElementById("endTime").innerHTML=resultdata.endTime;
            document.getElementById("gradeName").innerHTML=resultdata.gradeName;
            document.getElementById("className").innerHTML=resultdata.className;
            document.getElementById("recordName").value=resultdata.recordName;
            document.getElementById("recordGoal").value=resultdata.recordGoal;
            
            var studentInfoObserve=resultdata.studentInfoObserve;
            localStorage.setItem("studentInfoObserve",JSON.stringify(studentInfoObserve));
			
			var imgurls = resultdata.picturePaths;
			for(var i=0; i<imgurls.length;i++){
				id+= i;
				$(".img-cont .file").before("<div id='"+id+"' class='xinforpic'><img src='' ></div>");
				$("#" + id + " img").attr('src',resultdata.picturePaths[i]);
			}
			$(".file").attr("hidden","hidden");
            for (var i =0;i<studentInfoObserve.length;i++) {
            	
            	
            	
            	content0+="&nbsp;"+studentInfoObserve[i].studentName+"&nbsp;";
            	
            	content3 +=	"<li>"+
								  "<span style='color:#FF6700;'>"+studentInfoObserve[i].studentName+"</span><br/>"+
								  "<textarea id="+studentInfoObserve[i].personId+"observe"+" readOnly='true' style='padding:3px 6px; width:648px; height:50px;border:1px solid lightgrey; margin-right:20px;' placeholder='请描述下孩子在活动中的表现，可以在注意力、参与度、情绪态度、同伴交往等维度进行记录'>"+studentInfoObserve[i].observeInput+"</textarea>"+
							"</li>";	
				content4 +=	"<li>"+
								  "<span style='color:#FF6700;'>"+studentInfoObserve[i].studentName+"</span><br/>"+
								  "<textarea id="+studentInfoObserve[i].personId+"adjust"+" readOnly='true' style='padding:3px 6px; width:648px; height:50px;border:1px solid lightgrey; margin-right:20px;' placeholder='请描述下孩子在活动中的表现，可以在注意力、参与度、情绪态度、同伴交往等维度进行记录'>"+studentInfoObserve[i].analysisInput+"</textarea>"+
							"</li>";
            	
            }
            
            content1 = "<table width='100%' border='0' cellspacing='0' style='' class='accTabbox' id=''>"+
											"<thead >"+
												"<tr>"+
													"<th scope='col'>学生名称</th>"+
													"<th scope='col'>参与次数</th>"+
													"<th scope='col'>个人平均运动量</th>"+
													"<th scope='col'>与班级平均值比较</th>"+
													"<th scope='col'>个人停留时间</th>"+
													"<th scope='col'>与班级平均值比较</th>"+
												"</tr>"+
											"</thead>"+
											"<tbody >";
            for(var i =0;i<resultdata.observeAnalysisInfos.length;i++){
				
									content1 +=		"<tr>"+
													  "<td>"+resultdata.observeAnalysisInfos[i].studentName+"</td>"+
													  "<td>"+resultdata.observeAnalysisInfos[i].time+"</td>"+
													  "<td>"+resultdata.observeAnalysisInfos[i].aveAmount+"</td>"+
													  "<td>"+resultdata.observeAnalysisInfos[i].amountCompara+"</td>"+
													  "<td>"+resultdata.observeAnalysisInfos[i].date+"</td>"+
													  "<td>"+resultdata.observeAnalysisInfos[i].dateCompara+"</td>"+
												"</tr>";							
											
			}
			content1 +="</tbody>" +   "</table>";
			content2 += "<table width='100%' border='0' cellspacing='0' style='' class='accTabbox' id=''>"+
											"<thead >"+
												"<tr>"+
													"<th scope='col'>学生名称</th>"+
													"<th scope='col'>进入时间</th>"+
													"<th scope='col'>离开时间</th>"+
													"<th scope='col'>停留时长</th>"+
													"<th scope='col'>活动量</th>"+
													"<th scope='col'>操作</th>"+
												"</tr>"+
											"</thead>"+
											"<tbody >";
			for(var i =0;i<resultdata.studentAreaRecord.length;i++){
				
									content2 +=		"<tr>"+
													  "<td>"+resultdata.studentAreaRecord[i].studentName+"</td>"+
													  "<td>"+resultdata.studentAreaRecord[i].startTime+"</td>"+
													  "<td>"+resultdata.studentAreaRecord[i].endTime+"</td>"+
													  "<td>"+resultdata.studentAreaRecord[i].leaveTime+"</td>"+
													  "<td>"+resultdata.studentAreaRecord[i].amount+"</td>"+
													  "<td>"+resultdata.studentAreaRecord[i].videoPathList+"</td>"+
												"</tr>";								
											
			}
			content2 += "</tbody>"    +"</table>";
			
			$("#checkname").append(content0);
            $("#content1").append(content1);
			$("#content2").append(content2);
			$("#observeAnalyUl").append(content3);
			$("#analyAdjustUl").append(content4);
            

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

function updateEnteringObserveRecordInfo(){
	var studentInfoObserve=localStorage.getItem('studentInfoObserve');
	console.log(studentInfoObserve);
	var recordId=localStorage.getItem('recordId');
//	alert(recordId);
	

	var recordName=document.getElementById("recordName").value;
	var recordGoal=document.getElementById("recordGoal").value;
	var pictureDes=document.getElementById("pictureDes").value;
	
	var studentInfoObserves=new Array();
	var studentInfoObserve=JSON.parse(studentInfoObserve);
	console.log(studentInfoObserve);
//	var i=0;
	for(var i=0;i<studentInfoObserve.length;i++){
		var personId=studentInfoObserve[i].personId;
//		alert(personId);
		var studentInfo=new Object();
		studentInfo.personId=parseInt(personId);
		studentInfo.studentName=studentInfoObserve[i].studentName;
		console.log(studentInfo.studentName);
		studentInfo.observeInput=document.getElementById(personId+"observe").value;
		studentInfo.analysisInput=document.getElementById(personId+"adjust").value;
		studentInfoObserves.push(studentInfo);
		
	}
	
	var picPaths=new Array();
    objxinfopic = $(".xinforpic");
	$(".xinforpic img").each(function(){
	  for(var i=0; i<objxinfopic.length;i++){
		  picPaths[i] = $(this).attr("src");
	  }
	});
	studentInfoObserves=JSON.stringify(studentInfoObserves);
	picPaths=JSON.stringify(picPaths);
	
	$.ajax({
		url:"http://"+url_ceshi+"areaAngle/updateEnteringObserveRecordInfo?jsoncallback=?",
		dataType:'jsonp',
		data:{recordName:recordName,recordGoal:recordGoal,pictureDes:pictureDes,recordId:recordId,
		    studentInfoObserve1:studentInfoObserves,picPaths:picPaths},
		async: false,
		success : function(result) {
            var resultdata = result.flag;
			console.log(resultdata);
			if(result.flag=="success"){
				easyDialog.open({
                    container: {
                        content: '更新成功！',
                    },
                    autoClose: 2000,
					callback:function(){
//						   window.location.href = 'areaAngleAngalysis.html';
						}
                });
                return false;

		    }else{
				  easyDialog.open({
					     container:{
							   content:'更新失败！',
							 },
						 autoClose:2000
					  });
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
