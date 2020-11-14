function scrollTo(id) {
  $('html,body').animate({
    scrollTop: $('#'+id).offset().top
  },'slow');
}

var videos = document.getElementsByTagName("video");

function autoPlayAvailable() {
    for(var i = 0; i < videos.length; i++) {
        var video = videos[i];
        video.play();
        video.autoPlaySupported = !video.paused
        if (video.autoPlaySupported) {
            video.currentTime = 0;
        }
    }
}

function checkScroll() {
    var fraction = 0.5; // Play when 80% of the player is visible.

    for(var i = 0; i < videos.length; i++) {

        var video = videos[i];

        var x = video.offsetLeft, y = video.offsetTop, w = video.offsetWidth, h = video.offsetHeight, r = x + w, //right
            b = y + h, //bottom
            visibleX, visibleY, visible;

            visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
            visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));

            visible = visibleX * visibleY / (w * h);
        
            if (!video.autoPlaySupported) {
                continue;
            }

            if (visible > fraction) {
                video.play();
            } else if (visible == 0) {
                video.currentTime = 0;
                video.pause();
            } else {
                video.pause();
            }
    }

}

window.addEventListener('DOMContentLoaded', autoPlayAvailable, false);
window.addEventListener('scroll', checkScroll, false);
window.addEventListener('resize', checkScroll, false);
