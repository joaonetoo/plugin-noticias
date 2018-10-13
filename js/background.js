// var old_url 
// var current_url
// chrome.tabs.onUpdated.addListener(
//   function(tabId, changeInfo, tab) {
//     if(!current_url){
//       current_url = tab.url
//     }
  
//   }
// );
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if(request.teste != current_url){
//       current_url = request.teste
//       sendResponse({change: true});
//     }
//     sendResponse({change: false});
//   });

