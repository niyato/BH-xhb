(function () {
    var areas = {
        },
        host = 'http://sail.youjiaoyun.net',
        // host = 'http://192.168.1.232:10829',
        // host = 'http://localhost:10829',
        ajax = function (settings) {
            var query = settings.query,
                path = settings.path,
                server = areas[settings.area],
                url = settings.url;
            delete settings.query;
            delete settings.path;
            delete settings.area;
            delete settings.url;
            if (server && !url) url = server + (path ? '/' + path : '');
            return new Promise(function (resolve, reject) {
                $.ajax($.extend({
                    url: url,
                    data: query,
                    crossDomain: true
                }, settings)).then(function () {
                    resolve.apply(null, arguments);
                }, function () {
                    reject.apply(null, arguments);
                });
            });
        },
        proxy = function(settings) {
            return ajax({
                url: host + '/v1/external',
                query: {
                    payload: JSON.stringify(settings)
                },
                method: settings.Method === 'POST' ? 'POST' : 'GET'
            }).then(function(resp){
                if (!resp || !resp.data || resp.data.ErrorCode !== 0) throw resp;
                return resp;
            });
        };
    window.bhyf = {
        host: host,
        ajax: ajax,
        proxy: proxy,
        checkLogin: function(formData) {
            return proxy({
                Method: 'POST',
                Area: 'api',
                Path: 'CheckLogin',
                FormData: formData
            });
        },
        getGardenListByArea: function(queryParams) {
            return proxy({
                Method: 'GET',
                Area: 'api',
                Path: 'GetGardenListByArea',
                QueryParams: queryParams
            });
        },
        getTagList: function(queryParams) {
            return proxy({
                Method: 'GET',
                Area: 'api',
                Path: 'GetTagList',
                QueryParams: queryParams
            });
        },
        getClassListByGid: function(queryParams) {
            return proxy({
                Method: 'GET',
                Area: 'api',
                Path: 'GetClassListByGid',
                QueryParams: queryParams
            });
        },
        addTag: function(formData) {
            return proxy({
                Method: 'POST',
                Area: 'api',
                Path: 'AddTag',
                FormData: formData
            });
        },
        updateTag: function(formData) {
            return proxy({
                Method: 'POST',
                Area: 'api',
                Path: 'UpdateTag',
                FormData: formData
            });
        },
        updateTagStatus : function(formData) {
            return proxy({
                Method: 'POST',
                Area: 'api',
                Path: 'UpdateTagStatus ',
                FormData: formData
            });
        },
    };
})();