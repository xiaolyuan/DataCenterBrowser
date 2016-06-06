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
	var tableid = tokens[0] + "_" + tokens[1] + "_table";
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
	    	+"<td class=\"sig\"><a id=\"Ext.grid.GridPanel-columnLines\"></a>"
			+ dataItem.title
			+ " : ";
	    	html += ImageDataItemProc(dataItem.id, dataItem.data);
	    	break;
	    	//附件
	    case "FileDataItem":
	    	html += 
	    		"<td class=\"micon\"><a href=\"#expand\" class=\"exi\">&nbsp;</a></td>"	
	    	+"<td class=\"sig\"><a id=\"Ext.grid.GridPanel-columnLines\"></a>"
			+ dataItem.title
			+ " : ";
	    	//html += FileDataItemProc(dataItem.id, dataItem.data);
	    	break;
	    	//文本
	    case "TextDataItem":
	    	html += 
	    		"<td class=\"micon\"><a href=\"#expand\" class=\"exi\">&nbsp;</a></td>"	
	    	+"<td class=\"sig\"><a id=\"Ext.grid.GridPanel-columnLines\"></a>"
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
	    	html += FloatDataItemProc(dataItem.id, dataItem.data, dataItem.remark);
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
	    	//html +=RideoDataItemProc(dataItem.id,dataItem.data);
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
	    	//html +=RichTextDataItemProc(dataItem.id,dataItem.data);
	    	break;
	    	//二维表
	    case "TableDataItem":
	    	html += 
	    		"<td class=\"micon\"><a href=\"#expand\" class=\"exi\">&nbsp;</a></td>"
	    		+ "<td class=\"sig\"><a id=\"Ext.grid.GridPanel-columnLines\"></a>"
				+ dataItem.title
				+ " : ";
//	    	if (dataItem.remark != null && dataItem.remark != "")
//	    		html += "&nbsp&nbsp&nbsp&nbsp(备注："+ dataItem.remark +")"; 
//	    	html += "<div class=\"mdesc\">";
//	    	//\\html += TableDataItemProc(dataItem.id, dataItem.data);
//	    	html += "</div>";
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

function FileDataItemProc(id, data){
	var html = "";
	$.each(data.filePaths, function(idx, item){
		html += "<p><span class=\"glyphicon glyphicon-file\" aria-hidden=\"true\"></span><a>"
			+item+"</a></p>";
	});
  	return html;
}

function TextDataItemProc(id, data, remark){
	var html = "<span><a href='ima/File.html'>文本</a></span>";
	var remarkHtml = "";
	if (remark != null && remark != "")
		remarkHtml = "&nbsp&nbsp&nbsp&nbsp(备注：" + remark +  ")";
	$.each(data.text, function(idx, item){
		html += "<span>"+item+"</span>";
	});
	html += remarkHtml;
  	return html;
}

function ImageDataItemProc(id,data){
// 	html="<div><span>"+data.urls+"</span></div>";
//	return html;
	if (data.flag == 1){
		var html = "<div class='imgslides'>";
		$.each(data.urls, function(idx, item){
			html += "<img src=\"\DataItem?arg=file&file="+item+"\">";
			
		});
	    return html;
	}
	else{
		var html = "<div class='imgslides'>";
		$.each(data.urls, function(idx, item){
			html += "<img src=\""+item+"\">";
		});
	    return html;
	}

}
function FloatDataItemProc(id, data, remark){
	var html = "";
	var remarkHtml = "";
	if (remark != null && remark != "")
		remarkHtml = "&nbsp&nbsp&nbsp&nbsp(备注：" + remark +  ")";
	html = "<span class=\"float\"><span>"+data.value+"</span>"+data.unit+"</span>" + remarkHtml;
	return html;
}
function D3DataItemProc(id, data){
	var html="";
	 html="<span><a href='ima/10681608_155715005320_2[1].jpg'>三维模型</a></span>";
//	var html = "<div style='text-align: center;'>"
//		+ "<embed src=\"\DataItem?arg=file&file="+data.link+"\" width=\"80%\" height=\"400\" "
//		+" type=\"application/x-cortona\"   pluginspage=\"http://www.cortona3d.com/cortona\"   vrml_splashscreen=\"false\" "
//		+" vrml_dashboard=\"false\"   vrml_background_color=\"#f7f7f9\"   contextmenu=\"false\" ></div>"
  	return html;
}
function RichTextDataItemProc(id,data){
	var html="";
    html="<div class='sid' style='border:1px solid #BFD4DA;background-image:url(ima/9209405_150035420154_2[1].jpg)'>"
    	+"<table><tr>"+data.Text
    	+"</tr></table></div>";
   
	return html;
}
//链接
function UrlDataItemProc(id, data){
	var html = "<a href='http://www.baidu.com'>www.baidu.com</a>";
//	$.each(data.links, function(idx, item){
//		html += "<p><a>"+item+"</a></p>";
//	});
  	return html;
}
function TableDataItemProc(id, data){
	data = $.parseJSON(data.value)
	var tableid = id + "_table";
	var plotid = id + "_plot";
	var thead = "<tr>";
	$.each(data.header, function(idx, item){
		thead += "<th><span>"+item
		+"</span>" 
		+"<label style='margin-left: 5px;'>" 
		+"<input onclick='RadioClick(this)' type=\"radio\" class='table_radio' name=\"radio_"+tableid+"\"> X轴</label>"
		+"</th>";
	});
	thead += "</tr>";
	
	var tbody = "";
	$.each(data.body, function(idx, item){
		var t = "";
		if (idx >= 10)
			t = "style=\"display: none;\"";
		tbody += "<tr " + t + ">";
		$.each(item, function(i, tem){
			tbody += "<td>"+tem+"</td>";
		});
		tbody += "</tr>";
	});
	
	var html = ""
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
	//min-width:700px;
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
	var tableid = obj.id.split("_")[0] + "_target_table";
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
