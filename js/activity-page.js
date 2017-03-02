// JavaScript Document
(function () {
    var xhb = window.xhb || {};
    var dom = $('#activityCondition');

    var gradeS = dom.find('#activityGrade');
    var classS = dom.find('#activityClass');
    var studentS = dom.find('#activityPersonId');
   // var timeS = dom.find('#daily-time');
   // var dailyConfirm = dom.find('#daily-confirm');
    //var jTime = J(timeS).calendar();

    var grade = null;
    var classes = [];
    var classId = null;
    var students = [];
    var personId = null;

    var fillSelector = function(sel, list, prepend) {
        sel.empty();
        list.forEach(function(i) {
            sel.prepend('<option value="' + i[0] + '">' + i[1] + '</option>');
        });
        sel.prepend('<option value="0">' + prepend + '</option>');
        sel.val('0');
    };

    var fillClassS = function () {
        var cs = classes;
        if(grade && grade !='0'){
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
        grade = $(this).val();
        students = [];
        fillClassS();
        fillStudentS();
    });

    classS.on('change', function () {
        classId = $(this).val();
		if(classId=='0'){
		   students=[];
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

	window.xhb = $.extend({}, {
        page: {
            init: function (gid) {
				gid = gid || localStorage['gid'];
                bhyf.proxy({
                    Method: 'GET',
                    Area: 'api',
                    Path: 'GetClassListByGid',
                    QueryParams: {
                        gid: gid
                    }
                }).then(function(res) {
                    classes = res.data.classlist;
                    fillClassS();
                });
            }
        }
    });
	
	//xhb.page.init();
   
})();