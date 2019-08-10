
(function(){
    //粒子背景效果元素绑定、配置及生成
    particleground(document.getElementById('particle'), {
        dotColor: 'rgba(255,255,255,0.15)',
        lineColor: 'rgba(255,255,255,0.15)',
        particleRadius: 5,
    });
    //重新加载关键js文件，更新天气信息
    function reloadJs(jsId, jsUrl) {
        var js = document.getElementById(jsId);
        if (js) js.parentNode.removeChild(js);
        var scriptElem = document.createElement('script');
        scriptElem.src = jsUrl;
        scriptElem.id = jsId;
        document.getElementsByTagName('head')[0].appendChild(scriptElem);
    }
    //点击城市名称刷新天气信息
    var row1 = document.getElementsByClassName('row1')[0];
    row1.addEventListener('click', function () {
        var container = document.getElementsByClassName('container')[0];
        reloadJs('mainJs', './js/main.js');
    })
})();