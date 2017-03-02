(function () {
    var bhyf = window.bhyf || {};
    var dom = $('#daily-page');
          
    var gradeS = dom.find('#intensity-daily-grade-selector');
    var classS = dom.find('#intensity-daily-class-selector');
    var studentS = dom.find('#intensity-daily-student-selector');
    var timeS = dom.find('#intensity-daily-time');
    var dailyConfirm = dom.find('#intensity-daily-confirm');
    var container = dom.find('.sport_density');
    var jTime = J(timeS).calendar();
    timeS[0].value = moment(new Date).format('YYYY-MM-DD')

    var grade = null;
    var classes = [];
    var classId = null;
    var students = [];
    var personId = null;

    dailyConfirm.on('click', function () {
        var options = {
            day: jTime.val()
        };
        container.empty();
        // options.day = '2016-12-31';
        if (!personId && !classId && !grade) {
            options.category = 'garden';
            options.gardenId = localStorage['gid'];
            // options.gardenId = 2139;
            return bhyf.sumByLine(container, options);
        }
        if (!personId && !classId && grade) {
            options.category = 'class';
            options.gardenId = localStorage['gid'];
            // options.gardenId = 2139;
            options.gradeNum = grade;
            return bhyf.sumByLine(container, options);
        }
        options.category = 'person';
		options.str = ' 小时';
        if (personId) options.personId = personId;
        if (classId) options.classId = classId;
        // options.classId = 17704;
        bhyf.sumByLine(container, options);
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
        daliyHeader: {
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