function PlotOneContainer(ContainerId, x){
	var data = GetPlotData(ContainerId, x);
	if (data.length == 0)
		return;
	$('#' + ContainerId).highcharts({
		exporting:{
			buttons:{
				contextButton:{
					menuItems:[{
						text: '全选',
						onclick: function(){
							for(i = 0; i < this.series.length; i ++){
								this.series[i].setVisible(true);
							}
						}
					},
					{
						text: '全部取消',
						onclick: function(){
							for(i = 0; i < this.series.length; i ++){
								this.series[i].setVisible(false);
							}
						}
					},{
						separator: true
					}]
					.concat(Highcharts.getOptions().exporting.buttons.contextButton.menuItems)
				}
			},
			chartOptions:{
				plotOptions:{
					series:{
						dataLabels:{
							enabled: false
						}
					}
				}
			},
			scale: 3,
			fallbackToExportServer: false		
		},
		title: {
			text : ""
		},
	    xAxis: {
	    },
	    yAxis: {
	        plotLines: [{
	            value: 0,
	            width: 1,
	            color: '#808080'
	        }]
	    },
	    legend: {
	        layout: 'vertical',
	        align: 'right',
	        verticalAlign: 'middle',
	        borderWidth: 0
	    },
	    series:  data
	});
}

function PlotContainer(){
	$.each($(".plot_container"), function(idx, item){
		var ContainerId = $(item)[0].id;
		PlotOneContainer(ContainerId, 0);
	});
}

function GetPlotData(ContainerId, xaxis){
	var data = new Array();
	var tokens = ContainerId.split("_")
	var tableid = tokens[0] + "_table";
	var num = 0;
	var x_group = new Array();
	$.each($("#" + tableid + " tbody tr"), function(idx, item){
		var tds = $(item).children("td");
		num = tds.length;
		$.each(tds, function(i, tem){
			if ($(tem).text() != "")
			{
				if (i == xaxis){
					x_group.push(parseFloat($(tem).text()));
				}
			}
		});
	});
	
	for (var j=0; j<num ;j++)
	{
		if (j==xaxis)
			continue;
		var subdata = new Array();
		$.each($("#" + tableid + " tbody tr"), function(idx, item){
			var tds = $(item).children("td");
			num = tds.length;
			$.each(tds, function(i, tem){
				if ($(tem).text() != "")
				{
					if (i == j){
						subdata.push([x_group[idx], parseFloat($(tem).text())]);
					}
				}
			});
		});
		var name = "";
		$.each($("#" + tableid + " thead th span"), function(idx, item){
			if (idx == j)
				name = $(item).text();
		});
		data.push({
			name : name,
			data: subdata,
			visible: false
		});
	}
	return data;
}
function ExtDataItemProc(dataItem)
{
	
	//var html = getLittletitle(dataItem.id, dataItem.title);
	var html = "<tr class=\"config-row \" id= 'docs-" 
		+ dataItem.id + "'>"
		//alert(dataItem.id);
	switch(dataItem.type){ 
		case "TitleDataItem":    
			html += 
				"<td class=\"micon-blue\"><a href=\"#expand\" class=\"exi\">&nbsp;</a></td>"
		    	+ "<td class=\"sig\" style=\"color:blue;\"><a id=\"Ext.grid.GridPanel-columnLines\"></a>"
				+ dataItem.title
				+ " ";
    	break; 
	    case "SubtitleDataItem":
	    	if (dataItem.parents == null)
	    		dataItem.parents = []
	    	html += 
	    		"<td class=\"micon-blue\"><a href=\"#expand\" class=\"exi\">&nbsp;</a></td>"
		    	+ "<td class=\"sig\" style=\"color:blue;\"><a id=\"Ext.grid.GridPanel-columnLines\"></a>"
	    		+ getParents(dataItem.parents) + dataItem.title
				+ " ";
	    	break; 
	    	//图片
	    case "ImageDataItem":
	    	html += 
	    		"<td class=\"micon\"><a href=\"#expand\" class=\"exi\">&nbsp;</a></td>"
	    		+ "<td class=\"sig\"><a id=\"Ext.grid.GridPanel-columnLines\"></a>"
				+ dataItem.title
				+ " : ";
	    	html += ImageDataItemProc(dataItem.id, dataItem.data);
	    	break;
	    	//附件
	    case "FileDataItem":
	    	html += 
	    		"<td class=\"micon\"><a href=\"#expand\" class=\"exi\">&nbsp;</a></td>"
	    		+ "<td class=\"sig\"><a id=\"Ext.grid.GridPanel-columnLines\"></a>"
				+ dataItem.title
				+ " : ";
	    	html += FileDataItemProc(dataItem.id, dataItem.data);
	    	
	    	break;
	    	//文本
	    case "TextDataItem":
	    	html += 
	    		"<td class=\"micon\"><a href=\"#expand\" class=\"exi\">&nbsp;</a></td>"
	    		+ "<td class=\"sig\"><a id=\"Ext.grid.GridPanel-columnLines\"></a>"
				+ dataItem.title
				+ " : ";
	    	html += TextDataItemProc(dataItem.id, dataItem.data, dataItem.remark);
	    	break;
	    	//浮点数
	    case "FloatDataItem":
	    	html += 
	    		"<td class=\"micon\"><a href=\"#expand\" class=\"exi\">&nbsp;</a></td>"
	    		+ "<td class=\"sig\"><a id=\"Ext.grid.GridPanel-columnLines\"></a>"
				+ dataItem.title
				+ " : ";
	    	html+=dataItem.remark;
	    	html += FloatDataItemProc(dataItem.id, dataItem.data, dataItem.remark);
	    	break;
	    case"TimeDataItem":
	    	html += 
	    		"<td class=\"micon\"><a href=\"#expand\" class=\"exi\">&nbsp;</a></td>"
	    		+ "<td class=\"sig\"><a id=\"Ext.grid.GridPanel-columnLines\"></a>"
				+ dataItem.title
				+ " : ";
	    	html += TimeDataItemProc(dataItem.id, dataItem.data);
	    	break;
	    case "RadioDataItem":
	    	//html += RadioDataItemProc(dataItem.id, dataItem.data);
	    	break;
	    	//视频
	    case "RideoDataItem":
	    	html += 
	    		"<td class=\"micon\"><a href=\"#expand\" class=\"exi\">&nbsp;</a></td>"
	    		+ "<td class=\"sig\"><a id=\"Ext.grid.GridPanel-columnLines\"></a>"
				+ dataItem.title
				+ " : ";
	    	html +=RideoDataItemProc(dataItem.id,dataItem.data);
	    	break;
	    	//链接
	    case "UrlDataItem":
	    	html += 
	    		"<td class=\"micon\"><a href=\"#expand\" class=\"exi\">&nbsp;</a></td>"
	    		+ "<td class=\"sig\"><a id=\"Ext.grid.GridPanel-columnLines\"></a>"
				+ dataItem.title
				+ " : ";
	    	html += UrlDataItemProc(dataItem.id, dataItem.data);
	    	break;
	    	//曲线
	    case "CurveDataItem":
	    	//html += CurveDataItemProc(dataItem.id, dataItem.data);
	    	break;
	    	//三维模型
	    case "D3DataItem":
	    	html += 
	    		"<td class=\"micon\"><a href=\"#expand\" class=\"exi\">&nbsp;</a></td>"
	    		+ "<td class=\"sig\"><a id=\"Ext.grid.GridPanel-columnLines\"></a>"
				+ dataItem.title
				+ " : ";  	
	    	html += D3DataItemProc(dataItem.id, dataItem.data);
	    	break;
	    	//富文本
	    case "RichTextDataItem":
	    	html += 
	    		"<td class=\"micon\"><a href=\"#expand\" class=\"exi\">&nbsp;</a></td>"
	    		+ "<td class=\"sig\"><a id=\"Ext.grid.GridPanel-columnLines\"></a>"
				+ dataItem.title
				+ " : ";
	    	
	    	 html +=RichTextDataItemProc(dataItem.id,dataItem.data); 
	    	break;
	    	//二维表
	    case "TableDataItem":
	    	html += 
	    		"<td class=\"micon\"><a href=\"#expand\" class=\"exi\">&nbsp;</a></td>"
	    		+ "<td class=\"sig\"><a id=\"Ext.grid.GridPanel-columnLines\"></a>"
				+ dataItem.title
				+ " : ";
	    	html += TableDataItemProc(dataItem.id, dataItem.data);	
	    	break;	
	    default:
	    	break;
	}
	html += "</td></tr>";
	return html;
}
function getTitle(id, title){
	return "<h1 id=\""+id+"\"><span>"+title+"</span></h1>";
}

function getSubtitle(id, title){
	return "<h2 id=\""+id+"\">"+title+"</h2>";
}

function getLittletitle(id, title){
	return "<h3 id=\""+id+"\">"+title+"</h3>";
}

function ImageSilde(){
	$.each($(".imgslides"), function(idx, item){
		$(item).slidesjs({
		      width: 940,
		      height: 528
		      //navigation: false
	    });
	});
}

function CurveDataItemProc(id, data)
{
	var tableid = id + "_table";
	var plotid = id + "_plot";
	var thead = "<tr>";
	$.each(data.table[0], function(idx, item){
		thead += "<th><span>"+item
		+"</span>" 
		+"<label>" 
		+"<input onclick='RadioClick(this)' type=\"radio\" class='table_radio' name=\"radio_"+tableid+"\"> X轴</label>"
		+"</th>";
	});
	thead += "</tr>";
	
	var tbody = "";
	$.each(data.table, function(idx, item){
		if (idx != 0){
			tbody += "<tr>";
			$.each(item, function(i, tem){
				tbody += "<td>"+tem+"</td>";
			});
			tbody += "</tr>";
		}
	});
	
	var html = 
		"<ul class=\"nav nav-tabs\">"
		+"   <li class=\"active\">"
		+"      <a href=\"#"+tableid+"\" data-toggle=\"tab\">"
		+"         数据"
		+"      </a>"
		+"   </li>"
		+"   <li><a href=\"#"+plotid+"\" data-toggle=\"tab\">曲线</a></li>"
		+"</ul>"
		+"<div  class=\"tab-content\">"
		+"   <div class=\"tab-pane fade in active\" id=\""+tableid+"\">"
		+"      <table class=\"table table-bordered\">"
		+"          <thead>"
		+ thead
		+"          </thead>"
		+"          <tbody>"
		+ tbody
		+"          </tbody>"
		+"        </table>"
		+"   </div>"
		+"   <div class=\"tab-pane fade\" id=\""+plotid+"\">"
		+"        <div id=\""+plotid+"_container\" class='plot_container' style=\"min-width:1000px; height:400px\"></div>   "
		+"   </div>"
		+"</div>";
	//min-width:700px;
	return html;
}
//附件
function FileDataItemProc(id, data){
	var html = "";
	var remarkHtml="";
	var remarks="";
	if (data.remark != null && data.remark != ""){
		 remarkLength(data.remark);
		 items = cleanRemark(rema);
		 remarks=data.remark;
		remarkHtml= "<span id='file_"+id+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span style='white-space:nowrap;text-decoration:underline'>" +
		"(备注:" +items+")</span></span>";	}
	 RemarkList(remarkHtml,remarks);
	html=remarkHtml;
	$.each(data.filePaths, function(idx, item){
		var filePath=item.split(";");
		for (var i = 1; i < filePath.length; i++) {
		html += "<p style='line-height:1.7;'><span ' class=\"glyphicon glyphicon-file\" aria-hidden=\"true\"></span><a href='FilenewServlet?id="+filePath[i]+"'>"
		     +filePath[i]+"</a></p>";
		}
	});
	
	return html;
}


var player_num = 0;
//視頻
function RideoDataItemProc(id,data){
	var html="";
	var remarkHtml="";
	var  remarks="";
	if (data.remark != null && data.remark != ""){
		 remarkLength(data.remark);
		 items = cleanRemark(rema);
		 remarks=data.remark;
		remarkHtml= "<span id='rideo_"+id+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span style='white-space:nowrap;text-decoration:underline'>" +
		"(备注:" +items+")</span></span>";	}
	 RemarkList(remarkHtml,remarks);
	html=remarkHtml+"<br/><br/>";
	$.each(data.link,function(idx,item){
		var link=item.split(";");
		for (var i = 1; i < link.length; i++) {
			player_num += 1;
			html+="<p style='width: 900px;display:block;word-break: break-all;word-wrap: break-word;'><a class='a_video' href='VideoServlet?id="+link[i]+"'" +
					" style='display:block;width:267;height:200px;margin-left:20px;margin-bottom:20px; float:left;'" +
					"id='player_"+ player_num +"'></a></p>";	
		}		
	});
	
	//备注
       return html;
}
//调用播放容器player
function playAllVideo(){
	var idx = 0;
	for(idx=1; idx <= player_num; idx ++){
		flowplayer('player_' + idx, 'js/flowplayer/flowplayer-3.2.18.swf',{
			clip:{
				autoPlay:false,}, plugins: {
					 fontColor: '#ffffff',
					  backgroundColor: '#aedaff', //背景颜色
				}
			
		});
	}			
}

function TextDataItemProc(id, data, remark){
	var html="";
	var remarkHtml = "";
	var remarks="";
	if (data.remark != null && data.remark != ""){
		 remarkLength(data.remark);
		 items = cleanRemark(rema);
			remarks=data.remark;
		remarkHtml= "<span id='textData_"+id+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span style='white-space:nowrap;text-decoration:underline'>" +
		"(备注:" +items+")</span></span>";	}
	//备注
	 RemarkList(remarkHtml,remarks);
	//文本
	$.each(data.text, function(idx, item){
		text=item.length;
		if(text>40)
			text=item.substring(0,41)+"....";
		else
			text=item;
		html+="<span style= 'border:1px; solid #BFD4DA;margin-bottom:30px;line-height:1.7' id='text_" + id+ "'>"+text+"</span>"+remarkHtml+"";
		$(document).on('click','#'+$(html).attr("id"),function(){
			 layer.open({
				  type: 1,
				  closeBtn:1,
				  title: ['文本', 'font-size:28px;'],
				  skin: 'layui-layer-rim', //加上边框
				  offset : ['0' , '60%','200px'],
				  area: ['420px', '240px'], //宽高
				  shadeClose: true,
				  content: item,
				});
		 });
	});
  	return html;	
}
//实现鼠标滑动放大缩小
function bigimg(i)
{
	var zoom = parseInt(i.style.zoom,10)||100;
	zoom += event.wheelDelta / 12;
	if(zoom > 0 )
	i.style.zoom=zoom+'%';
	return false;
}

var imageid=0;
function ImageDataItemProc(id,data){
	var html="";
	if (data.flag == 1){
		var html="";
		var remarkHtml = "";
		var remarks="";
		if (data.remark != null && data.remark != ""){
			 remarkLength(data.remark);
           remarks=data.remark;
			items = cleanRemark(rema);
			remarkHtml= "<span id='image_"+id+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span style=';white-space:nowrap;text-decoration:underline'>" +
			"(备注:" +items+")</span></span>";	
		}
		RemarkList(remarkHtml,remarks);
		
		$.each(data.urls, function(idx, item){
			//按';'循环截取
			var items=new Array();
			items=item.split(";");	
			html=remarkHtml+"<br/><br/>";
			for (var i = 1; i < items.length; i++) {
				imageid+=1;
				//<div id='sid_"+i+"' style='margin-left:20px;'>  <div id='div_pop_"+i+"' style='display:none;'>
				html+="<img id='img_"+imageid+"' data-original='FileServlet?imageid="+items[i]+"' src='FileServlet?imageid="+items[i]+"' " +
						"style='border:1px; solid #BFD4DA;width:285px;height:200px;margin-left:20px;" +
						"float:left;margin-bottom:20px;'/ >";   
			
			}
		});	
	    return html;
	}
} 
//调用图片弹出层控件
function showImage(){
	var idx = 0;
	for (idx = 1; idx <=imageid ; idx++) {
		var viewer = new Viewer(document.getElementById('img_'+idx));	
	}
		
}
function TimeDataItemProc(id,data){
	var html = "";
	var remarkHtml = "";
	var rema="";
	var remarks="";
	 if (data.remark != null && data.remark != ""){
		 remarkLength(data.remark);
		 items = cleanRemark(rema);
		 remarks=data.remark;
			 rema= "<span id='Time_"+id+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span style='white-space:nowrap;text-decoration:underline'>" +
				"(备注:" +items+")</span></span>";	
			}
	 html+= "<span  class=\"float\"><span style='white-space:nowrap;weith:80px;'>"+data.time+""+rema+"</span></span>"+"<br/>";	
	 RemarkList(rema,remarks);
	 
	 return html;
}
function FloatDataItemProc(id, data){
	var html = "";
	var remarkHtml = "";
	var rema=""
		var remarks="";
	 if (data.remark != null && data.remark != ""){
		 remarkLength(data.remark);
		   items=cleanRemark(data.remark);	
		   remarks=data.remark;
			 rema= "<span id='float_"+id+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span style='white-space:nowrap;text-decoration:underline'>" +
				"(备注:" +items+")</span></span>";	
			}
	 RemarkList(rema,remarks);
	 html+= "<span  class=\"float\"><span style='white-space:nowrap;weith:80px;'>"+data.value+""+rema+"</span>"+data.unit+"</span>"+"<br/>";	
	
	 
	 return html;
}

function D3DataItemProc(id, data){
var html="";
var remarks="";
var remarkHtml="";
	 if (data.remark != null && data.remark != ""){
		 remarkLength(data.remark);
			items=cleanRemark(rema);
			remarks=data.remark;
			remarkHtml= "<span id='D3D_"+id+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span style='white-space:nowrap;text-decoration:underline'>" +
				"(备注:" +items+")</span></span>";	
			}
	 RemarkList(remarkHtml,remarks);
 html=remarkHtml+"<br/><br/>";

$.each(data.link, function(idx, item){
	//按';'循环截取
	var items=new Array();
	items=item.split(";");	
	for (var i = 1; i <items.length; i++) {	
		 html += "<div id='3D_"+i+"' style='margin-bottom:20px;margin-left:20px'>"
			+ "<embed src=\"\D3DServlet?D3Did="+items[i]+"\" width=\"80%\" height=\"400\" "
			+" type=\"application/x-cortona\" "
			+"   ></div>";	
	}
	// vrml_background_color=\"#f7f7f9\" vrml_dashboard=\"true\"     contextmenu=\"true\" vrml_splashscreen=\"false\"  pluginspage=\"http://www.cortona3d.com/cortona\"
});
		return html;
}	
function RichTextDataItemProc(id,data){
	var html="";
	var remarks="";
	var remarkHtml="";
	 if (data.remark != null && data.remark != ""){
//		 remalength=data.remark;
//		 if(remalength>30)
//			 rema=data.remark.substring(0,30)+"....";
//		 else
//		 rema=data.remark;
		 remarkLength(data.remark);
			items=cleanRemark(rema);
			remarks=data.remark;
		 remarkHtml= "<span id='float_"+id+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span style='white-space:nowrap;text-decoration:underline'>" +
				"(备注:" +items+")</span></span>";	
			}
	    RemarkList(remarkHtml,remarks);
    html+=remarkHtml+"<br/><br/><div style='margin-left:20px;border:1px; solid #BFD4DA;'>"
    	+""+data.Text
    	+"</div>";
	return html;
}
//备注的公共方法
function remarkLength(remarkData){
	 remalength=remarkData.length;
	 if(remalength>42)
		 rema=remarkData.substring(0,42)+"....";
	 else
	 rema=remarkData;
}
//备注弹出框的公共方法
function RemarkList(remarkHtml,remarks){
	$(document).on('click','#'+$(remarkHtml).attr("id"),function(){
		 layer.open({
			  type: 1,
			  closeBtn:1,
			  title: ['备注', 'font-size:18px;'],
			  skin: 'layui-layer-rim', //加上边框
			  area: ['420px', '240px'], //宽高
			  shadeClose: true,
			  border : [10 , 0.3 , 'red', true],
			  offset : ['0' , '60%','200px'],
			  content: remarks,
			});
	 });
}
//链接
function UrlDataItemProc(id, data){
	var html="";
	if (data.remark != null && data.remark != "")
	html = "&nbsp&nbsp&nbsp&nbsp<span style=''>(备注：" + data.remark + ")</span>";
	 html += "<a href='http://www.baidu.com'>www.baidu.com</a>";
//	$.each(data.links, function(idx, item){
//		html += "<p><a>"+item+"</a></p>";
//	});
  	return html;
}
function TableDataItemProc(id, data){
	var tableid = id + "_table";
	var plotid = id + "_plot";
	var remarkHtml="";
	var html="";
	var remarks="";
	 if (data.remark != null && data.remark != ""){
		 remarkLength(data.remark);
			items=cleanRemark(rema);
			//alert(items)
			remarks=data.remark;
		 remarkHtml= "<span id='TableData_"+id+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span style='white-space:nowrap;text-decoration:underline'>" +
				"(备注:" +items+")</span></span>";	
			}
	 RemarkList(remarkHtml,remarks)
	 html+=remarkHtml+"</br></br>";
	var thead = "<tr>";
       var items="";
       items=data.remark3.split(";");
		for (var i = 0; i <items.length; i++) {	
		thead += "<th><span>"+items[i]
		+"</span>" 
		+"<label style='margin-left: 2px;'>" 
		+"<input onclick='RadioClick(this)' type=\"radio\" class='table_radio' name=\"radio_"+tableid+"\"> X轴</label>"
		+"</th>";
		}
	thead += "</tr>";
	
	var tbody = "";
	
	$.each(data.value, function(idx, item){	
		a=item.split("#");
		$.each(a,function(idxs,items){
			var t = "";
			if(idxs>10)
			t = "style=\"display: none;\"";		
			b=items.split(";");
			tbody += "<tr " + t + ">";
		$.each(b,function(idx,itemsData){
			tbody += "<td>"+itemsData+"</td>";
		});
		});
//		for (var i = 0; i <a.length; i++) {
//			b = a[i].split(";");
//			if (ad>= 10)
//			t = "style=\"display: none;\"";	
//			tbody+="<tr"+t+">";	
//			
//		for (var j = 0; j < b.length; j++) {
//			tbody += "<td>"+b[j]+"</td>";
//			//alert(b.length);
//		}
//		}
		tbody += "</tr>";
	});
	
	html += ""
		+"   <div class=\"tab-pane fade in active\" id=\""+tableid+"\">"
		+"      <table class=\"member-table\"> " 
		+"          <thead>"
		+ thead
		+"          </thead>"
		+"          <tbody>"
		+ tbody
		+"          </tbody>"
		+"        </table>"
		+"   </div>"
		+"<div>"
		+"<span class=\"x-menu-text\" style=\"cursor:pointer; float: right;\" onclick='showmore(this)' id=\""+ tableid + "_btn\">"
		+"显示更多...</span>"
		+"</div>"
		+"   <div class=\"tab-pane fade\" id=\""+plotid+"\">"
		+"        <div id=\""+plotid+"_container\" class='plot_container' style=\"min-width:700px;\"></div>   "
		+"   </div>"
		+"</div>";
	return html;
}

function getParents(list)
{
	var t = "";
	$.each(list, function(idx, item){
		t = item + " -> "
	});
	return t;
}

function showmore(obj){
	var tableid = obj.id.split("_")[0] + "_table";
	if ($(obj).text() == "显示更多..."){
		$.each($("#"+tableid + " tbody tr"), function(idx, item){
			$(item).show();
		});
		$(obj).text("收起");
	}
	else{
		$(obj).text("显示更多...");
		$.each($("#"+tableid + " tbody tr"), function(idx, item){
			if (idx >= 10)
				$(item).hide();
		});
	}
}

//clean the remark
function cleanRemark(remark)
{
	return remark.replace(/<p>/g,"").replace(/<\/p>/g,"").replace(/<br>/g,"");
}
