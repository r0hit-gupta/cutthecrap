javascript: (function () {
    function puturl(url) {
        var content = document.body.innerHTML;
        content += '<div id="msg-bar-container" style="opacity: 1;"><div id="url-msg-bar" onclick="copyURL()"><p>YOUR SHORTENED URL IS : <input id="short-url" value="' + url + '"><br><span id="url-msg">CLICK TO COPY!</span></p></div><div id="msg-bar-close" onclick="removeMsgBar()">X</div></div>';
        document.body.innerHTML = content;
        var script = document.createElement("script");
        script.innerHTML = 'function copyURL() {document.getElementById("short-url").select();document.execCommand("copy");document.getElementById("url-msg").innerHTML = "COPIED!";var bar = document.getElementById("url-msg-bar");bar.style.backgroundColor = "#CDDC39";bar.style.borderColor = "#8bc34a";setTimeout(removeMsgBar, 5000);}function removeMsgBar() {var msgBar = document.getElementById("msg-bar-container");var opacity =msgBar.style.opacity;setInterval(function() {msgBar.style.opacity -= .2;if (msgBar.style.opacity <= 0) {msgBar.remove();}}, 30);}';
        document.head.appendChild(script);
        var style = document.createElement("style");
        style.innerHTML = '#msg-bar-container { position: fixed; top:0; left:0; z-index: 99999999999; box-sizing:border-box; } #url-msg-bar { position: fixed; top: 0; width: 100%; height: 50px; box-sizing: border-box; border-bottom: 3px solid #d4a003; background: #FFC107; cursor: pointer; padding: 0px; } #url-msg-bar:hover { background: #EEB006; color:#000; } #url-msg-bar p { padding: 0px; text-align: center; font-family: sans-serif; font-weight: bold; font-size: 15px; color: #333; margin: 5px; line-height: 20px; } #url-msg-bar p input { width: auto; height: auto; background: none; border: none; font-weight: bold; font-size: 15px; } #url-msg { font-size: 11px; padding: 0; margin: 0; } #msg-bar-close { cursor:pointer; position: fixed; top: 0; right: 0; width: 100px; height: 47px; text-align: center; line-height: 50px; font-family: sans-serif; color: #000; font-weight:bold; } #msg-bar-close:hover { background: #EEB007; }';
        document.head.appendChild(style);
    }
    var thisUrl = encodeURIComponent(location.href);
    var request = new XMLHttpRequest();
    request.open("GET", "https://api-ssl.bitly.com/v3/shorten?access_token=12729931e6fa8db7f9d51ab68b6e0f53336da75a&longUrl=" + thisUrl, true);
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (request.responseText) {
                var res = JSON.parse(request.responseText);
                puturl(res.data.url);
            } else {
                alert("This website does not allow URL Shortening.");
            }
        }
    };
    request.send();
})();
