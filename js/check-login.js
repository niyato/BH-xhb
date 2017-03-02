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