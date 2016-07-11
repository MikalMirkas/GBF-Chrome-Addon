var cl = function(ev){
  var jpid = /ID：([A-z0-9]{8})/;
  var enid = /ID: ([A-z0-9]{8})/;
  var valid = false;
  if(ev.target.nodeName.toLowerCase() == "p" && ev.target.classList.contains('tweet-text')) {
    for(var i in ev.target.childNodes) {
      var cnode = ev.target.childNodes[i];
      var text = cnode.textContent;
      if(match = enid.exec(cnode.textContent)) {//English Handler
		valid = true;
		var pos = enid.exec(text).index;
        var messageTitle = text.substring(text.lastIndexOf("Lv")).trim();
		var st = pos+4;
        var ed = st+9;
        var range = document.createRange();
      }
      if(match = jpid.exec(cnode.textContent)) {//Japanese Handler
		valid = true;
        var pos = jpid.exec(text).index;
        var messageTitle = text.substring(text.lastIndexOf("Lv")).trim();
		var st = pos+3;
        var ed = st+8;
        var range = document.createRange();
      }
		if(valid = true) {
		range.setStart(cnode,st);
        range.setEnd(cnode,ed);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        chrome.runtime.sendMessage({data: "data"});

        var success = document.execCommand('copy');  
        chrome.runtime.sendMessage({title: messageTitle, message: "ID: " + range.toString()}, function(){});
        ev.stopPropagation();
        ev.preventDefault();
        return false;
		}
    }
  }
}
document.addEventListener('click', cl);
