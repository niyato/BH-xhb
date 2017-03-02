(function () {
    var bhyf = window.bhyf || {};
    var host = bhyf.host,
        lines = [1400, 700, 0];
    var fetchPiece = function(personId, from, to) {
        return $.ajax({
            url: host + '/v1/pieces',
            data: {
                personId: personId,
                from: from,
                to: to
            }
        }).then(function (res) {
            return res.map(function (item) {
                item.startTime = new Date(item.startTime);
                item.endTime = new Date(item.endTime);
                return item;
            });
        });
    };

    var fetchSumByLine = function(options) {
        return $.ajax({
            url: host + '/v1/pieces/invoke/sumbyline',
            data: options
        }).then(function(res){
			return res.map(function(r){
				r.graph.high = Math.ceil(parseFloat(r.graph.high) * 60);
				r.graph.middle = Math.ceil(parseFloat(r.graph.middle) * 60);
				r.graph.low = Math.ceil(parseFloat(r.graph.low) * 60);
				return r;
			});
		});
    };

    var fetchStatAverage = function(options) {
        return $.ajax({
            url: host + '/v1/stats/average',
            data: options
        }).then(function (res) {
            return res.data.filter(function(item) {
                item.span = new Date(item.span);
                return item;
            });
        });
    };

    var getDailyOptions = function (title, items) {
        return {
                title: {
                    text: title
                },
                dataZoom: [
                    {
                        type: 'slider',
                        xAxisIndex: [0],
                    },
                    {
                        type: 'slider',
                        yAxisIndex: [0],
                    },
                    {
                        type: 'inside',
                        xAxisIndex: [0],
                    },
                ],
                tooltip: {},
                xAxis: { 
                    name: '时间' ,
                    type: 'time',
                    axisLabel: {
                        formatter: function (v, i) {
                            return moment(v).format('HH:mm:ss');
                        }
                    }
                },
                yAxis: { 
                    name: '运动量' ,
                    type: 'value' 
                },
                series: [{
                    name: '运动量',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: function (item) {
                                if (item.data[1] <= lines[1]) return '#9ccc65';
                                if (item.data[1] <= lines[0]) return '#ffa726';
                                return '#ff7043';
                            }
                        }
                    },
                    data: items
                }]
            };
    }

    var dailyPersonal = function(dom, personId, day, personName) {
        var chart = echarts.init(dom);
        chart.showLoading();
        var to = moment(day).add(1, 'days').format('YYYY-MM-DD');
        return fetchPiece(personId, day, to).then(function(res) {
            var minTime = new Date(_(res.map(function (item) { return item.startTime; })).min() - 0);
            var maxTime = new Date(_(res.map(function (item) { return item.endTime; })).max() - 0);
            var items = res.map(function (item) {
                var time = new Date(((item.startTime - 0) + (item.endTime - 0)) / 2);
                return [time, item.amount];
            });

            var option = getDailyOptions(personName, items);
            option.xAxis.min = minTime;
            option.xAxis.max = maxTime;

            chart.setOption(option);
            chart.hideLoading();
        });
    };

    var dailyGroup = function(dom, options) {
        var chart = echarts.init(dom);
        chart.showLoading();
        fetchStatAverage(options).then(function(res) {
            var minTime = new Date(_(res.map(function (item) { return item.span; })).min() - 75000);
            var maxTime = new Date(_(res.map(function (item) { return item.span; })).max() - 0 + 75000);
            var items = res.map(function (item) {
                return [item.span, item.avg];
            });

            var option = getDailyOptions(options.title, items);
            option.xAxis.min = minTime;
            option.xAxis.max = maxTime;
            chart.setOption(option);
            console.log(minTime, maxTime);
            chart.hideLoading();
        });
    };

    var sumByLine = function(dom, options) {
        return fetchSumByLine(options).then(function(res) {
            if (res.length < 1) {
				$('#daily-page').find('.sport_density').append('<span style="font-size:18px;">暂无数据</span>')
				return;
			}
			console.log(res);
			//运动强度，年级排序
			res = _(res).sortBy(function(r) { return -r.id; });
            var graph = $('<div style="width:1050px;height:' + (res.length * 30 + 120) + 'px;"></div>')
            dom.append(graph);
            var chart = echarts.init(graph[0]);
            var yData = res.map(function (r) { return r.name; });
            var option = {
                tooltip: {},
                grid: [
                    {x: '5%', y: '20%', width: '20%', height: '60%'},
                    {x: '37%', y: '20%', width: '20%', height: '60%'},
                    {x: '69%', y: '20%', width: '20%', height: '60%'}
                ],
                legend: {
                    top: '5%',
                    data: ['高运动量', '中运动量', '低运动量']
                },
                xAxis: [{ 
                    type: 'value',
                    gridIndex: 0,
                    show: false
                }, { 
                    type: 'value', 
                    gridIndex: 1,
                    show: false
                }, { 
                    type: 'value', 
                    gridIndex: 2,
                    show: false
                }],
                yAxis: [{ 
                    type: 'category',
                    gridIndex: 0,
                    data: yData,
                    axisTick: {
                        show: false
                    }
                }, { 
                    type: 'category',
                    gridIndex: 1,
                    data: yData,
                    axisTick: {
                        show: false
                    }
                }, { 
                    type: 'category',
                    gridIndex: 2,
                    data: yData,
                    axisTick: {
                        show: false
                    }
                }],
                series: [{
                    name: '高运动量',
                    type: 'bar',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    data: res.map(function(i) { return [i.graph.high, i.name]; }),
                    itemStyle: {
                        normal: {
                            color:  '#ff7043'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: function(v) { return v.data[0] + (options.str ? options.str : ' 分钟/人均'); }
                        }
                    }
                }, {
                    name: '中运动量',
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: res.map(function(i) { return [i.graph.middle, i.name]; }),
                    itemStyle: {
                        normal: {
                            color:  '#ffa726',
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: function(v) { return v.data[0] + (options.str ? options.str : ' 分钟/人均'); }
                        }
                    }
                }, {
                    name: '低运动量',
                    type: 'bar',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    data: res.map(function(i) { return [i.graph.low, i.name]; }),
                    itemStyle: {
                        normal: {
                            color:  '#9ccc65'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: function(v) { return v.data[0] + (options.str ? options.str : ' 分钟/人均'); }
                        }
                    }
                }]
            };

            chart.setOption(option);
        });
    };

    var graph = {
        dailyPersonal: dailyPersonal,
        sumByLine: sumByLine,
        dailyGroup: dailyGroup
    };

    window.bhyf = $.extend({}, bhyf, graph);
})();