var node = document.querySelector('.column-type-search p.js-tweet-text');
var re = /ID：(\w+)/;

for(var i in node.childNodes) {
	var cnode = node.childNodes[i];
	var text = cnode.textContent;
	if(match = re.exec(cnode.textContent)) {
		var pos = re.exec(text).index;
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
		chrome.runtime.sendMessage({title: range.toString(), message: text}, function(){});
		break;
	}
}

