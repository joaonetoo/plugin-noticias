var url
chrome.tabs.getSelected(null,function(tab) {
    url = tab.url;
});

var notices
$(document).ready(function(){
    chrome.tabs.onUpdated.addListener(function() {
        chrome.storage.sync.set({'news': 'false'}, function() {
            $('#notice').remove();
            $("#button_notices").show();
            $('.main').append('<div id=notice></div>');

        });
        }
    );    
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
                            $('#notice').append('<ul> </ul>');                
                            notices.forEach(value => {
                                $('#notice ul').append(
                                    $('<li>').append(
                                        $('<a>').attr('href',value[1]).append(
                                            value[0]
                                        )
                                    )
                                )
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
                $('#notice').append('<ul> </ul>');                
                notices.forEach(value => {
                    $('#notice ul').append(
                        $('<li>').append(
                            $('<a>').attr('href',value[1]).append(
                                value[0]
                            )
                        )
                    )
                });

            
            }else{
                $('#notice').append('<p> Não foram encontradas notícias parecidas! </p>' )
            }
        } 
    });
   

});

