//接收来自 content_scrip 的数据
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.hasOwnProperty('videoUrl')) {
    downUrl = request['videoUrl'];
    chrome.downloads.download({
      url: downUrl,
      conflictAction: 'uniquify',
      saveAs: false
    });
  }
  sendResponse('下载ing...');
});