$(function () {
    // body...
    getKpapi();
    //alert("1");

    function getKpapi () {
        // body...
        var api_url="http://api.kptaipei.tw/v1/albums/?accessToken=kp5413b0a4013273.06245689";
        $.getJSON(api_url, function(kp_json) {
            // alert(kp_json.data[0].thumbnails.small);
            $.each(kp_json.data,function(index,value){
                    $(".photo").append('<img src="'+kp_json.data[index].thumbnails.small+'">');
                });
        });
    }
})