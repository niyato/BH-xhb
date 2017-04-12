(function () {
    var bhyf = window.bhyf || {};

    $('#logout').on('click', function () {
        localStorage.removeItem('pid');
        localStorage.removeItem('gname');
        localStorage.removeItem('tname');
        localStorage.removeItem('picurl');
        window.location.href = 'login.html';
    });

    window.bhyf = $.extend({}, bhyf, {
        checkLogin: function () {
            var personID = localStorage.getItem('pid');
            var Gname =localStorage.getItem('gname');
            var Tname =localStorage.getItem('tname');
            var imgurl =localStorage.getItem('picurl');
            $('.Ginfo .Gname').attr("title",Gname);
            if (personID){
                $(".fr .Gname").html(Gname);
				
                $(".fr .Tname").html(Tname); 
                if(imgurl != ""){
                    $(".fr img").attr("src", imgurl);
                }else{
                    $(".fr img").attr("src","Content/css/images/raw_1479018045.jpeg");
                }
                $(".fr").removeAttr("hidden");
            }
            else{
                window.location.href = 'login.html';
            }
        }
    });
})();

//体感页面跳转
function switchMSPage(){
    var job=localStorage.getItem('job');
    var personId=localStorage.getItem('pid');
    var gid=localStorage.getItem('gid');
    var username=localStorage.getItem('username');
    window.location.href = "http://sail.youjiaoyun.net/v1/redirect?area=tg&personid="+personId+"&job="+job+"&username="+username;
    //window.location.href = "http://192.168.1.232:10829/v1/redirect?area=tg&personid=1&job=sd";

};

