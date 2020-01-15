document.onreadystatechange = function () {
  if (document.readyState == 'complete') {
    console.log('background');
    let targetNode = document.getElementsByClassName('WB_feed WB_feed_v3 WB_feed_v4');
    injectCustomJs('js/inject_script.js');
    if (targetNode.length > 0) {
      targetNode = targetNode[0];
      targetNode.childNodes.forEach(ele => {
        if (ele.nodeType == 1 && (ele.getElementsByClassName('WB_video  S_bg1 WB_video_mini WB_video_h5_v2').length > 0 || ele.getElementsByClassName('WB_video  S_bg1 WB_video_mini WB_video_a WB_video_h5_v2').length > 0 || ele.getElementsByClassName('WB_video S_bg2 WB_video_mini WB_video_a WB_video_h5_v2').length > 0)) {
          if (ele.getElementsByClassName('down_button_class').length == 0) {
            setDownButton(ele);
          }
        }
      });
      let config = {
        attributes: true,
        childList: true,
        subtree: false
      };
      const mutationCallback = (mutationsList) => {
        for (let mutation of mutationsList) {
          let type = mutation.type;
          switch (type) {
            case "childList":
              targetNode.childNodes.forEach(ele => { 
                if (ele.nodeType == 1 && (ele.getElementsByClassName('WB_video  S_bg1 WB_video_mini WB_video_h5_v2').length > 0 || ele.getElementsByClassName('WB_video  S_bg1 WB_video_mini WB_video_a WB_video_h5_v2').length > 0 || ele.getElementsByClassName('WB_video S_bg2 WB_video_mini WB_video_a WB_video_h5_v2').length > 0)) {
                  if (ele.getElementsByClassName('down_button_class').length == 0) {
                    setDownButton(ele);
                  }
                }
              });
              break;
            case "attributes":
              targetNode.childNodes.forEach(ele => {
                if (ele.nodeType == 1 && (ele.getElementsByClassName('WB_video  S_bg1 WB_video_mini WB_video_h5_v2').length > 0 || ele.getElementsByClassName('WB_video  S_bg1 WB_video_mini WB_video_a WB_video_h5_v2').length > 0 || ele.getElementsByClassName('WB_video S_bg2 WB_video_mini WB_video_a WB_video_h5_v2').length > 0)) {
                  if (ele.getElementsByClassName('down_button_class').length == 0) {
                    setDownButton(ele);
                  }
                }
              });
              break;
            default:
              break;
          }
        }
      };
      let observer = new MutationObserver(mutationCallback);
      observer.observe(targetNode, config);
      // observer.disconnect();
    } 
  }
}

// 接收来自inject_script的数据
window.addEventListener('message', function (e) {
  let data = e.data;
  if (data.hasOwnProperty('videoUrl')) {
    let msg = {
      "videoUrl": data['videoUrl']
    }
    chrome.runtime.sendMessage(msg, function (response) {
      console.log('sendMessage ' + response);
    }); 
  }
}, false);

function setDownButton(ele) {
  let parentNode = ele.getElementsByClassName('WB_video  S_bg1 WB_video_mini WB_video_h5_v2').length > 0 ? ele.getElementsByClassName('WB_video  S_bg1 WB_video_mini WB_video_h5_v2')[0] : ele.getElementsByClassName('WB_video  S_bg1 WB_video_mini WB_video_a WB_video_h5_v2').length > 0 ? ele.getElementsByClassName('WB_video  S_bg1 WB_video_mini WB_video_a WB_video_h5_v2')[0] : ele.getElementsByClassName('WB_video S_bg2 WB_video_mini WB_video_a WB_video_h5_v2').length > 0 ? ele.getElementsByClassName('WB_video S_bg2 WB_video_mini WB_video_a WB_video_h5_v2')[0] : '';
  if (parentNode != '' && parentNode.getElementsByClassName('down_button_class').length == 0) {
    let downButton = document.createElement('button');
    let videoNode = ele.getElementsByClassName('wbv-tech')
    if (videoNode.length > 0) {
      let videoUrl = videoNode[0]['src'];
      downButton.setAttribute('style', 'position: absolute;right: 0;');
      downButton.setAttribute('class', 'down_button_class');
      downButton.setAttribute('id', 'down_button_' + (new Date()).getTime());
      downButton.setAttribute('onclick', 'downWeiboVideo("' + videoUrl + '")');
      // downButton.setAttribute('data', '"' + videoUrl + '"')
      downButton.innerText = '下载';
      parentNode.appendChild(downButton);
    }
  }
}



//向页面注入inject_script
function injectCustomJs(jsPath) {
  jsPath = jsPath || 'js/inject_script.js';
  var temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript');
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = function () {
    this.parentNode.removeChild(this);
  };
  document.head.appendChild(temp);
}