$(function () {

	var kp_server = "http://api.kptaipei.tw/v1/category/";

	$.get(kp_server+"?accessToken=kp5413b0a4013273.06245689",function(kp_article_api){
		$.each(kp_article_api.data,function(index,value){
			$(".artricle_list").append('<li data-id="'+value.id+'">'+value.name+'</li>')
		});
	});
});