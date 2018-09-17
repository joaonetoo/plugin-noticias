
var url
chrome.tabs.getSelected(null,function(tab) {
    url = tab.url;
});
function website(website){
    if (website == 'globo') {
        return 'images/g1.jpg'
    } else if (website == 'uol') {
        return 'images/uol.jpg'
    } else{
        return 'images/blasting.png'
    }
}
function createCard(titulo,link,image,date){
    var html= '<a class="notice-link" href="'+link+'">' +      
    '<article class="notice">'+
    '<img src="'+image+'" class="notice-hero">'+
    '<div class="notice-text">'+
        '<h4 class="notice-title">'+titulo+'</h4>'+
        '<p class="notice-description">'+date+'</p>'+
    '</div>'+
    '</article>'+
    '</a>'
    return html
}
chrome.runtime.sendMessage({ teste: url}, function(response) {
    if (response.change){
        chrome.storage.sync.set({'news': 'false'}, function() {
            $('.pen-wrapper').remove();
            $("#button_notices").show();
            $('.main').append('<div class="pen-wrapper"></div>');
        });
    }
    var notices
    $(document).ready(function(){ 
        chrome.storage.sync.get('news',function(data){
            notices = data.news
            if (notices == 'false'){
                $( "#button_notices" ).click(function() {
                    $("#button_notices").hide();
                    $( ".main" ).append( '<div class="cssload-container"> </div>');
                    $( ".cssload-container" ).append( '<div class="cssload-whirlpool"></div>');
                        $.ajax({
                            url : "http://206.189.215.95/notices",
                            type : 'get',
                            data : {
                                site : url
                            }
                        })
                        .done(function(msg){
                            notices = msg['url']
                            chrome.storage.sync.set({'news': notices}, function() {
                            });
                            $(".cssload-container").hide();
                            if (notices.length > 0 ){                
                                notices.forEach(value => {
                                    site = website(value[2])
                                    html = createCard(value[0],value[1],site,value[3])
                                    $('.pen-wrapper').append(html);
                                    });
                            }else{
                                $('#notice').append('<p> Não foram encontradas notícias parecidas! </p>' )
                            }
                        })
                        .fail(function(jqXHR, textStatus, msg){
                            $('#test').html(JSON.stringify(msg))
                        }); 
                
            }); 
            }else{
                if (notices.length > 0 ){
                    $("#button_notices").hide();
                    notices.forEach(value => {
                        site = website(value[2])
                        html = createCard(value[0],value[1],site,value[3])  
                        $('.pen-wrapper').append(html);
                    });
                
                }else{
                    $('#notice').append('<p> Não foram encontradas notícias parecidas! </p>' )
                }
            } 
        });
    
    });

  });

