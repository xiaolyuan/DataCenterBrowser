/*
	填写内容
	针对ext进行初始化
	@author: Shaohan
*/
var data;
var html = "";
function initwelcome(){
	$.ajaxSetup({
		async : false
	});
	$("#welcome-panel").empty();

	//vid = decodeURIComponent(vid);
	
//	vid = vid.split("_")[0];
	
	var nodeid = getUrlParam("nodeid");
	nodeid = stringToBytes(nodeid);
	$.getJSON("/DataCenterBrowser/ExtData?nodeid=" + nodeid, function(data1){
		data = data1;
	});
	
	if (data == null){
		alert("没有数据");
		return html;
	}	
	Docs.classData.children = data.TreeNode;
	
//	html = "<div xmlns:ext='http://www.extjs.com' class='body-wrap'>" 
	//	html="<div id='docs-table' cellspacing=\"0\">";
	$.each(data.DataItem, function(idx, item){
		html += ExtDataItemProc(item);
	});
	//html+="</div>";
	return html;
	}

function show(){
	var index=1;
$(window).scroll(function(){
	var pa=$(this).scrollTop()+20>=$(document).height()-$(this).height();
	if(index>2){
		$(".body-wrap").append("加载ok");
		$(this).off("scroll");
	}
	if(pa){
		loadData()
	}
});
};
function loadData(){
	index++;
	$.each(data.DataItem, function(idx, item){
		html += ExtDataItemProc(item);
	});
	$.get(html,function(data){
  $(".body-wrap").append(data);
});
}


function RadioClick(obj){
	var tokens = $(obj)[0].name.split("_")
	var ContainerId = tokens[1] + "_plot_container";
	var x = GetXAxis(ContainerId);
	PlotOneContainer(ContainerId, x);
}

function GetXAxis(ContainerId)
{
	var tokens = ContainerId.split("_");
	var tableid = tokens[0] + "_table";	
	var r = 0;
	$.each($("#" + tableid + " thead th input"), function(idx, item){
		 if($(item)[0].checked)
			 r = idx;
	});
	return r;
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
