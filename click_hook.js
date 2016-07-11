var cl = function(ev){
  var re = /ID：(\w+)/;
  var ree = /ID: (\w+)/;
  if(ev.target.nodeName.toLowerCase() == "p" && ev.target.classList.contains('tweet-text')) {
    for(var i in ev.target.childNodes) {
      var cnode = ev.target.childNodes[i];
      var text = cnode.textContent;
	  //en
      if(match = ree.exec(cnode.textContent)) {
        var pos = ree.exec(text).index;
        var messageTitle = text.substring(text.lastIndexOf("Lv")).trim();
		var st = pos+4;
        var ed = st+9;
        var range = document.createRange();
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
	  //jp
      if(match = re.exec(cnode.textContent)) {
        var pos = re.exec(text).index;
        var messageTitle = text.substring(text.lastIndexOf("Lv")).trim();
		var st = pos+3;
        var ed = st+8;
        var range = document.createRange();
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
