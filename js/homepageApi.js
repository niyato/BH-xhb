// JavaScript Document
var url="truelove.youjiaoyun.net";
//var url="192.168.1.153:8081/BflMark";
function AllSportIntensity(){
	  
            var dom = document.getElementById("sport_intensity_content");
			var myChart = echarts.init(dom);
			var app = {};
			option = null;
			var url="truelove.youjiaoyun.net";
			var fromday = document.getElementById("intensity-daily-time1").value;
			var today = document.getElementById("intensity-daily-time2").value;
			
		   
		   
		   //var txt = $("#sp-intensity-select option:selected").text();

			
			//var url="192.168.1.153:8081/BflMark";
			//$.get('', function (data) {
				
			$.ajax({
				//url : "http://192.168.1.153:8081/BflMark/bflmark/selectSleepInfo?jsoncallback=?",
				url : "http://"+url+"/bflmark/analysisAllGardenMove?jsoncallback=?",
				dataType : 'jsonp',
				data : {fromDay:fromday,toDay:today},
				jsonp : 'jsoncallback',
				async: false,
				success : function(data) {
				    
				//console.log(data);
				myChart.setOption(
				option = {
				tooltip : {
					trigger: 'axis',
					axisPointer : {            // 坐标轴指示器，坐标轴触发有效
						type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					data:['高强度','中强度','低强度'],
					bottom:'0',
					selected:{
						'高强度':true,
						'中强度':true,
						'低强度':true
					}
				},
				calculable : true,
				xAxis : [
					{
						name:'园所',
						type : 'category',
						data : ['钱塘山水幼儿园','浦沿幼儿园','和家园青苑幼儿园']
					}
				],
				yAxis : [
					{
						name:'分钟/人均',
						type : 'value'
					}
				],
				series : [
					{
						name:'高强度',
						type:'bar',
						barWidth : 80,
						itemStyle:{
							normal:{
							   color:'red',
							   opacity:1
							}									
							},
						data:[data.QT.high,data.PY.high,data.QY.high],
						label:{
							normal:{
								show:true,
								position:'top',
								formatter:'',
								textStyle:{
									color:'red',
									fontSize:30
								}
							}
						}
					},
					{
						name:'中强度',
						type:'bar',
						barWidth : 80,
						itemStyle:{
							normal:{
								color:'#f6b26b',
								opacity:1
							}
						},
						data:[data.QT.center,data.PY.center,data.QY.center],
						label:{
							normal:{
								show:true,
								position:'top',
								formatter:'',
								textStyle:{
									color:'red',
									fontSize:30
								}
							}
						}
					},
					{
						name:'低强度',
						type:'bar',
						barWidth : 80,
						itemStyle:{
							normal:{
								color:'#93c47d',
								opacity:1
							}
						},
						data:[data.QT.low,data.PY.low,data.QY.low],
						label:{
							normal:{
								show:true,
								position:'top',
								formatter:'',
								textStyle:{
									color:'red',
									fontSize:30
								}
							}
						}
					}
				]
			}
			);
			console.log(data);
            
			var tSum = 0;
			var i = 1;
			
			//console.log(tSum);
			
			
			
			var Options = $("#sp-intensity-select option:selected").val();
			if(Options == '0'){
				  for (var k in data) {
				     tSum = tSum + data[k].low + data[k].center + data[k].high;
			      }			
				}
			if(Options == '低'){
				debugger;
				for (var k in data) {
				     tSum = tSum + data[k].low;
			      }		
				i=2;	
				option.series[0].itemStyle.normal.opacity = '0';
				option.series[1].itemStyle.normal.opacity = '0';
				
				}
			if(Options == '中'){
				for (var k in data) {
				     tSum = tSum + data[k].center;
			      }		
				i=1;	
				option.series[0].itemStyle.normal.opacity = '0';
				option.series[2].itemStyle.normal.opacity = '0';

				}
			if(Options == '高'){
				for (var k in data) {
				     tSum = tSum + data[k].high;
			      }	
				i=0;
				option.series[1].itemStyle.normal.opacity = '0';
				option.series[2].itemStyle.normal.opacity = '0';

				}
		    if(tSum == 0){
				option.series[i].label.normal.formatter = '暂无数据';
				}
			myChart.setOption(option);	
				}
			});
			
			if (option && typeof option === "object") {
				myChart.setOption(option, true);
			}
	}

function AllSleepAnalysis(){
	  var dom1 = document.getElementById("sleep_avg_content");
	  var dom2 = document.getElementById("sleep_percent_content");
			var myChart1 = echarts.init(dom1);
			var myChart2 = echarts.init(dom2);
			var app = {};
			option = null;
			var url="truelove.youjiaoyun.net";
			var fromday = document.getElementById("sleep-analysis-time1").value;
			var today = document.getElementById("sleep-analysis-time2").value;
			
			
			//var url="192.168.1.153:8081/BflMark";
			//$.get('', function (data) {	
			$.ajax({
				//url : "http://192.168.1.153:8081/BflMark/bflmark/selectSleepInfo?jsoncallback=?",
				url : "http://"+url+"/bflmark/analysisAllGardenSleep?jsoncallback=?",
				dataType : 'jsonp',
				data : {fromDay:fromday,toDay:today},
				jsonp : 'jsoncallback',
				async: false,
				success : function(data) {
				    
				//console.log(data);

				myChart1.setOption(
						option1 = {
						tooltip : {
							trigger: 'axis',
							axisPointer : {            // 坐标轴指示器，坐标轴触发有效
								type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						legend: {
							data:['睡眠少','睡眠正常','睡眠充足'],
							bottom:'0'
						},
						calculable : true,
						xAxis : [
							{
								name:'园所',
								type : 'category',
								data : ['钱塘山水幼儿园','浦沿幼儿园','和家园青苑幼儿园']
							}
						],
						yAxis : [
							{
								name:'平均人数',
								type : 'value'
							}
						],
						series : [
							{
								name:'睡眠少',
								type:'bar',
								barWidth : 80,
								itemStyle:{
									normal:{
										color:'#a4c2f4',
										opacity:1
									}
									},
								data:[data.average.QT.little,data.average.PY.little,data.average.QY.little],
								label:{
							        normal:{
								    show:true,
								    position:'top',
								    formatter:'',
								    textStyle:{
									    color:'red',
									    fontSize:30
								        }
							        }
							    }
							},
							{
								name:'睡眠正常',
								type:'bar',
								barWidth : 80,
								itemStyle:{
									normal:{
										color:'#ffe599',
										opacity:1
									}
								},
								data:[data.average.QT.normal,data.average.PY.normal,data.average.QY.normal],
								label:{
							        normal:{
								    show:true,
								    position:'top',
								    formatter:'',
								    textStyle:{
									    color:'red',
									    fontSize:30
								    }
							    }
						}
							},
							{
								name:'睡眠充足',
								type:'bar',
								barWidth : 80,
								itemStyle:{
									normal:{
										color:'#93c47d',
										opacity:1
									}
								},
								data:[data.average.QT.more,data.average.PY.more,data.average.QY.more],
								label:{
							        normal:{
								    show:true,
								    position:'top',
								    formatter:'',
								    textStyle:{
									    color:'red',
									    fontSize:30
								        }
							        }
							    }
							}
						]
					}
			    );
				
				myChart2.setOption(
						option2 = {
						tooltip : {
							trigger: 'axis',
							axisPointer : {            // 坐标轴指示器，坐标轴触发有效
								type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						legend: {
							data:['睡眠少','睡眠正常','睡眠充足'],
							bottom:'0'
						},
						calculable : true,
						xAxis : [
							{
								name:'园所',
								type : 'category',
								data : ['钱塘山水幼儿园','浦沿幼儿园','和家园青苑幼儿园']
							}
						],
						yAxis : [
							{
								name:'百分比',
								type : 'value',
								axisLabel:{
									formatter:'{value}%'
								}
							}
						],
						series : [
							{
								name:'睡眠少',
								type:'bar',
								barWidth : 80,
								itemStyle:{
									normal:{
										color:'#a4c2f4',
										opacity:1
									}
								},
								data:[data.percent.QT.little,data.percent.PY.little,data.percent.QY.little],
								label:{
							        normal:{
								    show:true,
								    position:'top',
								    formatter:'',
								    textStyle:{
									    color:'red',
									    fontSize:30
								        }
							        }
							    }
							},
							{
								name:'睡眠正常',
								type:'bar',
								barWidth : 80,
								itemStyle:{
									normal:{
										color:'#ffe599',
										opacity:1
									}
								},
								data:[data.percent.QT.normal,data.percent.PY.normal,data.percent.QY.normal],
								label:{
							        normal:{
								    show:true,
								    position:'top',
								    formatter:'',
								    textStyle:{
									    color:'red',
									    fontSize:30
								        }
							        }
							    }
							},
							{
								name:'睡眠充足',
								type:'bar',
								barWidth : 80,
								itemStyle:{
									normal:{
										color:'#93c47d',
										opacity:1
									}
								},
								data:[data.percent.QT.more,data.percent.PY.more,data.percent.QY.more],
								label:{
							        normal:{
								    show:true,
								    position:'top',
								    formatter:'',
								    textStyle:{
									    color:'red',
									    fontSize:30
								        }
							        }
							    }
							}
						]
					}
			    );
			//console.log(option);
			//console.log(data);
			var tSum = 0;
			var i =1;
/*			for (var k in data.average) {
				tSum = tSum + data.average[k].little + data.average[k].normal + data.average[k].more;
			}	*/		
			//console.log(tSum);

			
			var Options1 = $("#sl-analysis-select option:selected").val();
			if(Options1 == '0'){
			   for (var k in data.average) {
				tSum = tSum + data.average[k].little + data.average[k].normal + data.average[k].more;
			    }
				}
			if(Options1 == '少'){
				for (var k in data.average) {
				tSum = tSum + data.average[k].little;
				}
				i=0;
				option1.series[1].itemStyle.normal.opacity = '0';
				option1.series[2].itemStyle.normal.opacity = '0';
				option2.series[1].itemStyle.normal.opacity = '0';
				option2.series[2].itemStyle.normal.opacity = '0';
				}
			if(Options1 == '正常'){
				i=1;
				for (var k in data.average) {
				tSum = tSum + data.average[k].normal;
				}
				option1.series[0].itemStyle.normal.opacity = '0';
				option1.series[2].itemStyle.normal.opacity = '0';
                option2.series[0].itemStyle.normal.opacity = '0';
				option2.series[2].itemStyle.normal.opacity = '0';
				}
			if(Options1 == '多'){
				i=2;
				for (var k in data.average) {
				tSum = tSum + data.average[k].more;
				}
				option1.series[0].itemStyle.normal.opacity = '0';
				option1.series[1].itemStyle.normal.opacity = '0';
                option2.series[0].itemStyle.normal.opacity = '0';
				option2.series[1].itemStyle.normal.opacity = '0';
				}
			
			if(tSum == 0){
				option1.series[i].label.normal.formatter = '暂无数据';
				option2.series[i].label.normal.formatter = '暂无数据';
			   }
			myChart1.setOption(option1);
			myChart2.setOption(option2);
			  }
			});
			if (option && typeof option === "object") {
				myChart1.setOption(option, true);
				myChart2.setOption(option, true);
			}
}


function AllEatingHabits(){
	var dom1 = document.getElementById("diet_avg_content");
	  var dom2 = document.getElementById("diet_percent_content");
			var myChart1 = echarts.init(dom1);
			var myChart2 = echarts.init(dom2);
			var app = {};
			option = null;
			var url="truelove.youjiaoyun.net";
			var fromday = document.getElementById("diet-habits-time1").value;
			var today = document.getElementById("diet-habits-time2").value;
			
			
			//var url="192.168.1.153:8081/BflMark";
			//$.get('', function (data) {
				
			$.ajax({
				//url : "http://192.168.1.153:8081/BflMark/bflmark/selectSleepInfo?jsoncallback=?",
				url : "http://"+url+"/bflmark/analysisAllGardenEat?jsoncallback=?",
				dataType : 'jsonp',
				data : {fromDay:fromday,toDay:today},
				jsonp : 'jsoncallback',
				async: false,
				success : function(data) {
				    
				console.log(data);

				myChart1.setOption(
						option1 = {
						tooltip : {
							trigger: 'axis',
							axisPointer : {            // 坐标轴指示器，坐标轴触发有效
								type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						legend: {
							data:['有待提升','习惯一般','习惯良好'],
							bottom:'0'
						},
						calculable : true,
						xAxis : [
							{
								name:'园所',
								type : 'category',
								data : ['钱塘山水幼儿园','浦沿幼儿园','和家园青苑幼儿园']
							}
						],
						yAxis : [
							{
								name:'平均人数',
								type : 'value'
							}
						],
						series : [
							{
								name:'有待提升',
								type:'bar',
								barWidth : 80,
								itemStyle:{normal:{color:'#666666'}},
								data:[data.average.QT.bad,data.average.PY.bad,data.average.QY.bad],
								label:{
							        normal:{
								    show:true,
								    position:'top',
								    formatter:'',
								    textStyle:{
									    color:'red',
									    fontSize:30
								        }
							        }
							    }
							},
							{
								name:'习惯一般',
								type:'bar',
								barWidth : 80,
								itemStyle:{normal:{color:'#83a4d9'}},
								data:[data.average.QT.normal,data.average.PY.normal,data.average.QY.normal],
								label:{
							        normal:{
								    show:true,
								    position:'top',
								    formatter:'',
								    textStyle:{
									    color:'red',
									    fontSize:30
								        }
							        }
							    }
							},
							{
								name:'习惯良好',
								type:'bar',
								barWidth : 80,
								itemStyle:{normal:{color:'#e3a64b'}},
								data:[data.average.QT.Well,data.average.PY.Well,data.average.QY.Well],
								label:{
							        normal:{
								    show:true,
								    position:'top',
								    formatter:'',
								    textStyle:{
									    color:'red',
									    fontSize:30
								        }
							        }
							    }
							}
						]
					}
			    );
				
				myChart2.setOption(
						option2 = {
						tooltip : {
							trigger: 'axis',
							axisPointer : {            // 坐标轴指示器，坐标轴触发有效
								type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							}
						},
						legend: {
							data:['有待提升','习惯一般','习惯良好'],
							bottom:'0'
						},
						calculable : true,
						xAxis : [
							{
								name:'园所',
								type : 'category',
								data : ['钱塘山水幼儿园','浦沿幼儿园','和家园青苑幼儿园']
							}
						],
						yAxis : [
							{
								name:'百分比',
								type : 'value',
								axisLabel:{
									formatter:'{value}%'
								}
							}
						],
						series : [
							{
								name:'有待提升',
								type:'bar',
								barWidth : 80,
								itemStyle:{normal:{color:'#666666'}},
								data:[data.percent.QT.bad,data.percent.PY.bad,data.percent.QY.bad],
								label:{
							        normal:{
								    show:true,
								    position:'top',
								    formatter:'',
								    textStyle:{
									    color:'red',
									    fontSize:30
								        }
							        }
							    }
							},
							{
								name:'习惯一般',
								type:'bar',
								barWidth : 80,
								itemStyle:{normal:{color:'#83a4d9'}},
								data:[data.percent.QT.normal,data.percent.PY.normal,data.percent.QY.normal],
								label:{
							        normal:{
								    show:true,
								    position:'top',
								    formatter:'',
								    textStyle:{
									    color:'red',
									    fontSize:30
								        }
							        }
							    }
							},
							{
								name:'习惯良好',
								type:'bar',
								barWidth : 80,
								itemStyle:{normal:{color:'#e3a64b'}},
								data:[data.percent.QT.Well,data.percent.PY.Well,data.percent.QY.Well],
								label:{
							        normal:{
								    show:true,
								    position:'top',
								    formatter:'',
								    textStyle:{
									    color:'red',
									    fontSize:30
								        }
							        }
							    }
							}
						]
					}
			    );
				console.log(data);
				var tSum = 0;
				var i = 1;
/* 			    for (var k in data.average) {
				   tSum = tSum + data.average[k].bad + data.average[k].normal + data.average[k].Well;
			    }	 */		
			    
			    
				var Options2 = $("#eating-habits-select option:selected").val();
				
				if(Options2== '0')
				{
				   
			       for (var k in data.average) {
				     tSum = tSum + data.average[k].bad + data.average[k].normal + data.average[k].Well;
			       }			
			    
			       //if(tSum == 0){
				     //option1.series[1].label.normal.formatter = '暂无数据';
				     //option2.series[1].label.normal.formatter = '暂无数据';
				   //}
				}
				if(Options2 == '1'){
			       for (var k in data.average) {
				    tSum = tSum + data.average[k].bad;
			       }
                console.log(tSum);
                i=0;		
				option1.series[1].itemStyle.normal.opacity = '0';
				option1.series[2].itemStyle.normal.opacity = '0';
				option2.series[1].itemStyle.normal.opacity = '0';
				option2.series[2].itemStyle.normal.opacity = '0';
				
				
				}
				if(Options2 == '2'){
					for (var k in data.average) {
				    tSum = tSum + data.average[k].normal;
			       }
				   i=1;
					option1.series[0].itemStyle.normal.opacity = '0';
					option1.series[2].itemStyle.normal.opacity = '0';
	                option2.series[0].itemStyle.normal.opacity = '0';
					option2.series[2].itemStyle.normal.opacity = '0';
					
					}
				if(Options2 == '3'){
					for (var k in data.average) {
				    tSum = tSum + data.average[k].Well;
			       }
				   i=2;
					option1.series[0].itemStyle.normal.opacity = '0';
					option1.series[1].itemStyle.normal.opacity = '0';
	                option2.series[0].itemStyle.normal.opacity = '0';
					option2.series[1].itemStyle.normal.opacity = '0';
					}
					
				if(tSum == 0){
				  
				   option1.series[i].label.normal.formatter = '暂无数据';
				   option2.series[i].label.normal.formatter = '暂无数据';
				  
				} 
				myChart1.setOption(option1);
				myChart2.setOption(option2);
			
			  }
			});
			if (option && typeof option === "object") {
				myChart1.setOption(option, true);
				myChart2.setOption(option, true);
			}
}