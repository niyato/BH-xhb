(function () {
    var bhyf = window.bhyf || {};
    var dom = $('#daily-page');

    var gid = localStorage['gid'];
    var gardeNames = ['托班', '小班', '中班', '大班'];
          
    var graphContainer = '<div style="width: 1000px;height:300px;"></div>';     
    var pageString = '<div id="daily-pagination" class="flickr" style="text-align:right"></div>';

    var gradeS = dom.find('#daily-grade-selector');
    var classS = dom.find('#daily-class-selector');
    var studentS = dom.find('#daily-student-selector');
    var timeS = dom.find('#daily-time');
    var dailyConfirm = dom.find('#daily-confirm');
    var dailyBox = dom.find('#daily-box');
    var jTime = J(timeS).calendar();
    timeS[0].value = moment(new Date).format('YYYY-MM-DD')

    var grade = null;
    var classes = [];
    var classId = null;
    var students = [];
    var personId = null;

    var pageIndex = 0;

    var getPageOption =  function () {
        return  {
            callback: function (i) {
                pageIndex = i;
                turnToPage();
            },
            prev_text: '<< 上一页',
            next_text: '下一页 >>',
            items_per_page: 3,
            num_display_entries: 10,
            current_page: pageIndex,
            num_edge_entries: 0
        };
    }

    var turnToPage = function() {
        dailyBox.empty();

        if (!personId && !classId && !grade) {
            var gardes = _(classes.map(function (c) {
                return c.gradenum;
            })).uniq().filter(function(g) { return _([1, 2, 3, 4]).contains(g)}).sort();
            gardes.forEach(function(gn) {
                var graph = $(graphContainer);
                dailyBox.append(graph);

                var options = {
                    date: jTime.val()
                };
                options.gardenId = localStorage['gid'];

                options.title = gardeNames[gn - 1];
                options.grade = gn;
                bhyf.dailyGroup(graph[0], options);
            });
            return;
        }
        if (!personId && !classId && grade) {
            var cs = classes.filter(function (c) {
                return c.gradenum == parseInt(grade);
            });
			if (cs.length < 1) {
				dailyBox.append('<span style="font-size:18px;">暂无数据</span>')
			}
			
			cs.forEach(function (c) {
                var graph = $(graphContainer);
                dailyBox.append(graph);

                var options = {
                    date: jTime.val()
                };
                options.gardenId = localStorage['gid'];

                options.title = c.classname;
                options.classid = c.classid;

                bhyf.dailyGroup(graph[0], options);
            });
            return;
        }

        var people = [];
        if (personId) {
            var p = students.filter(function(s) {return s.PersonID == personId;})[0]
            if (p) people.push(p);
        }
        else {
            people = students.slice(3 * pageIndex, 3 * (pageIndex + 1));
        }
        if (people.length < 1 || !jTime.val()) return;
        people.forEach(function (s) {
            var graph = $(graphContainer);
            dailyBox.append(graph);
            bhyf.dailyPersonal(
                graph[0],
                s.PersonID,
                jTime.val(),
                s.SName
            );
        });
        if (personId) return;
        var $page = $(pageString);
        dailyBox.append($page);
        $page.pagination(students.length, getPageOption());
    };

    dailyConfirm.on('click', function () {
        pageIndex = 0;
        turnToPage();
    });

    var fillSelector = function(sel, list, prepend) {
        sel.empty();
        list.forEach(function(i) {
            sel.append('<option value="' + i[0] + '">' + i[1] + '</option>');
        });
        sel.prepend('<option value="0">' + prepend + '</option>');
        sel.val('0');
    };

    var fillClassS = function () {
        var cs = classes;
        if (grade) {
            cs = classes.filter(function (c) {
                return c.gradenum == parseInt(grade);
            });
        }
        fillSelector(classS, cs.map(function(c) {
            return [c.classid, c.classname];
        }), '全部班级');
    };

    var fillStudentS = function () {
        fillSelector(studentS, students.map(function(s) {
            return [s.PersonID, s.SName];
        }), '全部学生');
    };

    gradeS.on('change', function () {
        grade = parseInt($(this).val());
        classId = null;
        personId = null;
        students = [];
        fillClassS();
        fillStudentS();
    });

    classS.on('change', function () {
        classId = parseInt($(this).val());
        personId = null;
        if (!classId) {
            students = [];
            return fillStudentS();
        }
        bhyf.proxy({
            Method: 'GET',
            Area: 'api',
            Path: 'GetStudentList',
            QueryParams: {
                classId: classId
            }
        }).then(function(res) {
            students = res.data.mobileitemstudents;
            fillStudentS();
        });
    });

    studentS.on('change', function () {
        personId = parseInt($(this).val());
    });

    window.bhyf = $.extend({}, bhyf, {
        daliyPage: {
            init: function () {
                gid = localStorage['gid'];
                bhyf.proxy({
                    Method: 'GET',
                    Area: 'api',
                    Path: 'GetClassListByGid',
                    QueryParams: {
                        gid: gid
                    }
                }).then(function(res) {
                    classes = _.sortBy(res.data.classlist, 'classid');
                    fillClassS();
                });
            }
        }
    });
})();