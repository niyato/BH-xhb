// JavaScript Document
var url="truelove.youjiaoyun.net";
//var url="192.168.1.153:8081/BflMark";
function ZztuView(pid,name){
	  
            var dom = document.getElementById("activity-container");
			var myChart = echarts.init(dom);
			var app = {};
			option = null;
			//var url="192.168.1.153:8081/BflMark";
			//$.get('', function (data) {
			var datadate = document.getElementById("J-xl_activity").value;
			//alert(datadate);
			$('.modal-title span').html(name.name);
			//debugger;
			$.ajax({
				//url : "http://192.168.1.153:8081/BflMark/bflmark/selectSleepInfo?jsoncallback=?",
				url : "http://"+url+"/bflmark/selectXYarray?jsoncallback=?",
				dataType : 'jsonp',
				data : {recordTime:datadate,personId:pid,type:4},
				jsonp : 'jsoncallback',
				async: false,
				success : function(data) {
				    
					console.log(data);
				option = {
					title: {
						text: ''
					},
					xAxis: {
						data: data.xyArray.map(function (item) {
							return item.step;
						})
					},
					yAxis: {
						splitLine: {
							show: false
						}
					},
					dataZoom: [{
						startValue: ''
					}, {
						type: 'inside'
					}],
					visualMap: {
						top: 10,
						right: 10,
						pieces: [{
							gt: 0,
							lte: 700,
							label:'低强度',
							color: '#096'
						}, {
							gt: 700,
							lte: 1400,
							label:'中强度',
							color: '#ffde33'
						}, {
							gt: 1400,
							label:'高强度',
							color: '#ff9933'
						}
						],
						outOfRange: {
							color: '#999'
						}
					},
					series: {
						name: '体育活动柱状图',
						type: 'bar',
						data: data.xyArray.map(function (item) {
							return item.score;
						}),
						markLine: {
							silent: true,
							data: [{
								yAxis: 700
							}, {
								yAxis: 1400
							}]
						}
					}
				};
				console.log(option);
				myChart.setOption(option);
				}
			});
			if (option && typeof option === "object") {
				myChart.setOption(option, true);
			}
	}
