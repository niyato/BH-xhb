// JavaScript Document
var url="truelove.youjiaoyun.net";
//var url="192.168.1.153:8081/BflMark";

function CurveView(pid,name){
	  	var dom = document.getElementById("sleep-container");
			var myChart = echarts.init(dom);
			//console.log(dom);
			var app = {};
			var option = null;
			//var url="192.168.1.153:8081/BflMark";
			//$.get('', function (data) {
		    var datadate = document.getElementById("J-xl").value;
			//alert(pname);
			console.log(pid);
			$('.modal-header .Pname').html(name.name);
			//alert(pid);		
			$.ajax({
				//url : "http://192.168.1.153:8081/BflMark/bflmark/selectSleepInfo?jsoncallback=?",
				url : "http://"+url+"/bflmark/selectXYarray?jsoncallback=?",
				dataType : 'jsonp',
				data : {recordTime:datadate,personId:pid,type:1},
				jsonp : 'jsoncallback',
				async: false,
				success : function(data) {
				    
					console.log(data);
					option = {
						title: {
							text: ''
						},
						tooltip: {
							trigger: 'axis'
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
							startValue: '12:00'
						}, {
							type: 'inside'
						}],
						visualMap: {
							top: 10,
							right: 10,
							pieces: [{
								gt: 0,
								lte: 65,
								label:'熟睡',
								color: '#096'
							}, {
								gt: 65,
								lte: 200,
								label:'浅睡',
								color: '#ffde33'
							}, {
								gt: 200,
								label:'未睡',
								color: '#ff9933'
							}],
							outOfRange: {
								color: '#999'
							}
						},
						series: {
							name: '睡眠曲线图',
							type: 'line',
							data: data.xyArray.map(function (item) {
								return item.score;
							}),
							markLine: {
								silent: true,
								data: [{
									yAxis: 30
								}, {
									yAxis: 65
								}, {
									yAxis: 200
								}]
							}
						}
					};
					console.log(option);
					myChart.setOption(option);
				}
			});;
			if (option && typeof option === "object") {
				myChart.setOption(option, true);
			}
	}
