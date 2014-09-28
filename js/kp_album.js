$(function () {
	// body...
	getKpapi();
	//alert("1");

	function getKpapi () {
		// body...
		var api_url="http://api.kptaipei.tw/v1/albums/";
		var id;
		$.get(api_url+"?accessToken=kp5413b0a4013273.06245689", function(kp_json) {
			$.each(kp_json.data,function(index,value){
				$(".album_list").append('<li class="album" data-id="'+kp_json.data[index].id+'">'+kp_json.data[index].title+'</li>');
				//     $(".photo").append('<img src="'+kp_json.data[index].thumbnails.small+'">');
				});

			$(".album_list").children("li").first().click();
			console.log($(".album_list").children("li").first());
		});


		$(".album_list").on("click",".album",function(){
			var $album = $(this);
			id = $album.data("id");
			$(".album").removeClass("album_clicked");
			$album.addClass("album_clicked");	
			$(".photo").children("*").remove();
			$(".page_list").children("li").remove();
			$("h2").remove();
			var page_size =  10;
			var page_link = 1;			
			var total_pages;

			//用jquery的get，將相簿API內的資料抓回來，並放到kp_album內
			// do{
			$.get(api_url+id+"?accessToken=kp5413b0a4013273.06245689", function(kp_album){		
				total_pages = Math.ceil(kp_album.pageInfo.totalResults/page_size);
				// $.get(api_url+id+"?accessToken=kp5413b0a4013273.06245689"+)
				//印出相簿內所有的照片
				// $.each(kp_album.data.photos, function(index, value){
				// 	$(".album_photo").append('<li class="col-md-4 photo"><img class="img-rounded img-responsive" src="'+value.images.small+'"></li>')
				// })
			// page+=1;
				// for (page_link = 1; current_page < total_pages; page_link++) {
				// 	$(".album_photo").append('<a class="page_'+page_link+' href="'+api_url+id+'?accessToken=kp5413b0a4013273.06245689&page='+current_page+'&page_size='+page_size+'">'+page_link+'</a>')
				// };
				$(".album_photo").prepend('<h2>'+kp_album.data.set.title+'</h2>');
				for (var page = 0;page <total_pages; page++) {
					// $(".page_list").append('<li class="col-md-1 page_link" href="'+api_url+id+'?accessToken=kp5413b0a4013273.06245689&page='+current_page+'&page_size='+page_size+'">'+page_link+'</li>');
					$(".page_list").append('<li class="col-md-1 page_link" data-page-num="'+page+'">'+page_link+'</li>');
					page_link= page_link+1;
				};
				$(".page_link").first().click();	
			});
			// $(".page_link").click();	 重要!!!!   由於JavaScript具有unblocking的性質，故當for迴圈尚未執行完成時，就會先執行這行，故會發生找不到page_link類別的錯誤
			// $(".album_photo").find(".page_link:first").css("color","red");
		});

		$(".page_list").on("click",".page_link",function(){
			
			$(".photos").children("*").remove();
			$current_page_link = $(this);
			$(".page_link").removeClass("pageLink_clicked");
			$current_page_link.addClass("pageLink_clicked");
			var current_page = $current_page_link.data("page-num");
			var page_size =  10;	
			var total_pages;

			$.get(api_url+id+'?accessToken=kp5413b0a4013273.06245689&page='+current_page+'&page_size='+page_size, function(kp_album){		
				//印出相簿內所有的照片
				$.each(kp_album.data.photos, function(index, value){
					$(".photos").append('<li class="col-md-4 photo"><img class="img-rounded img-responsive" src="'+value.images.small+'"></li>')
				})
			});			
		});
	}
})