function addPanel(){
	var p2 = new Ext.Panel({
		id : 'docs-data',
        title: "数据列表11",
        html : initwelcome(),
        autoScroll: true
	});
	
	return [p2]
//	return [addPuxi()]
	//Ext.get('welcome-panel').add(p);
}


function getTitle(){
	$.ajaxSetup({
		async : false
	});
	var cid = getUrlParam('cid');
	cid = decodeURIComponent(cid);
	cid = cid.split("_")[0];
	
	var id = getUrlParam('id');
	var version = getUrlParam('version');
	var user = getUrlParam('user');
	var pwd = getUrlParam('pwd');
	
	var uid = getUrlParam('uid');
	var sid = getUrlParam('sid');
	
	var items = new Array();
	//update the abstraction
	var value = "数据展示";
		
//	$.getJSON("/imweb/MainModel?arg=abs&id=" + id + "&version=" + version
//			+ "&user=" + user + "&pwd=" + pwd + "&uid=" + uid, function(data){
//		$.each(data, function(idx, item){
//			if (item.name=="名称")
//				value = item.value;
//		});		
//	});
	return value;
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = encodeURI(window.location.search).substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

function stringToBytes ( str ) {
	//Google Closure library, convert to/from UTF-8 and byte arrays
	//just copy some codes to covert UTF-8 to byte arrays
	    var out = [], p = 0;
	   for (var i = 0; i < str.length; i++) {
	     var c = str.charCodeAt(i);
	     if (c < 128) {
	       out[p++] = c;
	     } else if (c < 2048) {
	       out[p++] = (c >> 6) | 192;
	       out[p++] = (c & 63) | 128;
	     } else {
	       out[p++] = (c >> 12) | 224;
	       out[p++] = ((c >> 6) & 63) | 128;
	       out[p++] = (c & 63) | 128;
	     }
	   }
	   //return out;

	var hex_str=""
	   for(var i=0;i<out.length;i++){
	     var num_10=out[i]
	     var hex_one=num_10.toString(16);
	     if (hex_one.length==1){
	         hex_one='0'+hex_one;
	     }
	     hex_str+=hex_one
	}
 return hex_str;
}