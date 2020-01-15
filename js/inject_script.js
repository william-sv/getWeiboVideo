function downWeiboVideo(videoUrl) {
  window.postMessage({
    "videoUrl": videoUrl
  },'*');
}