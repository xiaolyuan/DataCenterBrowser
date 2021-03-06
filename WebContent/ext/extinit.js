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
	var html = "<div xmlns:ext='http://www.extjs.com' class='body-wrap' id='data-"+dataItem.id+"'>" 
//		+"<div  cellspacing=\"0\" class=\"member-table\">";
	 html += "<div class=\"config-row \" id= 'docs-" 
		+ dataItem.id + "'>"
	switch(dataItem.type){ 
		case "TitleDataItem":  
			html += "<span><em style='color:blue;'>"+ dataItem.title+"</em>";
    	break; 
	    case "SubtitleDataItem":
	    	if (dataItem.parents == null)
	    		dataItem.parents = []
	    	html += 
	    		"<span class=\"micon-blue\"><a href=\"#expand\" class=\"exi\">&nbsp;</a></span>"
		    	+ "<span class=\"sig\" style=\"color:blue;\"><a id=\"Ext.grid.GridPanel-columnLines\"></a>"
	    		+getParents(dataItem.parents) + dataItem.title
				+ " ";
	    	break; 
	    	//图片
	    case "ImageDataItem":
	    	html += "<span><em>"+ dataItem.title+"</em>:";
	    	html += ImageDataItemProc(dataItem.id, dataItem.data);
	    	break;
	    	//附件
	    case "FileDataItem":
	    	html += "<span><em>"+ dataItem.title+"</em>:";
	    	html += FileDataItemProc(dataItem.id, dataItem.data);    	
	    	break;
	    	//文本
	    case "TextDataItem":
	    	html += "<span><em>"+ dataItem.title+"</em>:";
	    	html += TextDataItemProc(dataItem.id, dataItem.data, dataItem.remark);
	    	break;
	    	//浮点数
	    case "FloatDataItem":
	    	html += "<span><em>"+ dataItem.title+"</em>:&nbsp;&nbsp;&nbsp;";
	    	html+=dataItem.remark;
	    	html += FloatDataItemProc(dataItem.id, dataItem.data, dataItem.remark); 	
	    	break;
	    	//时间
	    case"TimeDataItem":
	    	html += "<span><em>"+ dataItem.title+"</em>:&nbsp;&nbsp;&nbsp;";
	    	html += TimeDataItemProc(dataItem.id, dataItem.data);
	    	break;
	    case "RadioDataItem":
	    	//html += RadioDataItemProc(dataItem.id, dataItem.data);
	    	break;
	    	//视频
	    case "RideoDataItem":
	    	html += "<span><em>"+ dataItem.title+"</em>:";
	    	html +=RideoDataItemProc(dataItem.id,dataItem.data);
	    	break;
	    	//链接
	    case "UrlDataItem":
	    	html += "<span><em>"+ dataItem.title+"</em>:";
	    	html += UrlDataItemProc(dataItem.id, dataItem.data);
	    	break;
	    	//曲线
	    case "CurveDataItem":
	    	//html += CurveDataItemProc(dataItem.id, dataItem.data);
	    	break;
	    	//三维模型
	    case "D3DataItem":
	    	html += "<span><em>"+ dataItem.title+"</em>:";
	    	html += D3DataItemProc(dataItem.id, dataItem.data);
	    	break;
	    	//富文本
	    case "RichTextDataItem":
	    	html += "<span><em>"+ dataItem.title+"</em>:";
	    	html +=RichTextDataItemProc(dataItem.id,dataItem.data); 
	    	break;
	    	//二维表
	    case "TableDataItem":
	    	html += "<span><span style=\"color: blue; cursor:pointer;\" onclick='PlotAgain(\""+dataItem.id+"\")'>添加图表</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>"+ dataItem.title+"</em>:";
	    	html += TableDataItemProc(dataItem.id, dataItem.data);	
	    	break;	
	    default:
	    	break;
	}
	html += "</span></div></div>";
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
		 //<script id='editorA' style='left:0;top:30%; z-index:100;' type='text/plain'>
		remarkHtml= "<span id='file_"+id+"' class='aaspan'>&nbsp;&nbsp;&nbsp;&nbsp;<span class='span'>" +
		"(备注:" +items+")</span></span>";
	}
	//remarks="<script id='editorA' type='text/plain' style=''>"+data.remark+"</script>";
	//alert(remarks);
	
	 RemarkList(remarkHtml,remarks);
	html=remarkHtml;
	//html+="<script id='editorA' style='display:none;' type='text/plain'>"+remarks+"</script>";
	$.each(data.filePaths, function(idx, item){
		var filePath=item.split(";");
		for (var i = 1; i < filePath.length; i++) {
		html += "<p class='lineheight'><a  href='FilenewServlet?id="+filePath[i]+"'>"
		     +filePath[i]+"</a></p>";
		}
	});	
	return html;
}
function filea(){	
	//position: absolute;
//	$(".aaspan").click(function(){
//		$("#editorA").attr("style", 'padding:10px;position:relative;width:200px');
//		$("#editorA").attr("z-index",9999);
//		
//	});

		/*var uea = UE.getEditor('editorA', {	
			toolbars: [],
		    autoHeightEnabled: false,
		    scaleEnabled:true,
		    elementPathEnabled:false, //左下角显示元素路径
		    autoFloatEnabled: false,
		    initialFrameWidth:750, //初始化编辑器宽度,默认1000
		    initialFrameHeight:400, //初始化编辑器高度,默认320
		    wordCount:false, //是否开启字数统计
		});	*/
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
		remarkHtml= "<span id='rideo_"+id+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span class='span'>" +
		"(备注:" +items+")</span></span>";
	}
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
				autoPlay:false,//是否自动播放
				autoBuffering:true//是否开启缓冲	
			}, plugins: {
					 fontColor: '#ffffff',
					  backgroundColor: '#aedaff', //背景颜色
				}
		});
	}			
}
//文本
function TextDataItemProc(id, data, remark){
	var html="";
	var remarkHtml = "";
	var remarks="";
	if (data.remark != null && data.remark != ""){
		 remarkLength(data.remark);
		 items = cleanRemark(rema);
			remarks=data.remark;
		remarkHtml= "<span id='textData_"+id+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span class='span'>" +
		"(备注:" +items+")</span></span>";
		}
	//备注
	 RemarkList(remarkHtml,remarks);
	//文本
	$.each(data.text, function(idx, item){
		text=item;
		html+="<span class='lineheight' id='text_" + id+ "'>"+text+""+remarkHtml+"</span>";
	});
  	return html;	
}
//图片
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
			remarkHtml= "<span id='image_"+id+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span class='span'>" +
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
			html+="<img id='img_"+imageid+"' data-original='FileServlet?imageid="+items[i]+"' class='vode'  src='FileServlet?imageid="+items[i]+"'/ >";   	
			}
		});	
	    return html;
	}
} 
//调用图片弹出层控件
function showImage(){
	var idx = 0;
	for (idx = 1; idx <=imageid; idx++) {
		var viewer = new Viewer(document.getElementById('img_'+idx));		
	}	
}
//时间
function TimeDataItemProc(id,data){
	var html = "";
	var remarkHtml = "";
	var remarks="";
	 if (data.remark != null && data.remark != ""){
		 remarkLength(data.remark);
		 items = cleanRemark(rema);
		 remarks=data.remark;
		 remarkHtml= "<span id='Time_"+id+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span class='span'>" +
				"(备注:" +items+")</span></span>";	
			}
	 RemarkList(remarkHtml,remarks);
	 html+= "<span  class=\"float\"><span>"+data.time+""+remarkHtml+"</span></span>"+"<br/>";
	 return html;
}
//浮点数
function FloatDataItemProc(id, data){
	var html = "";
	var remarkHtml = "";
		var remarks="";
	 if (data.remark != null && data.remark != ""){
		 remarkLength(data.remark);
		   items=cleanRemark(rema);	
		   remarks=data.remark;
		   remarkHtml= "<span id='float_"+id+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span class='span'>" +
				"(备注:" +items+")</span></span>";
			}
	 RemarkList(remarkHtml,remarks);
	 html+= "<span  class=\"float\"><span >"+data.value+"</span>"+data.unit+"</span>"+remarkHtml+"<br/>";
	 return html;
}
//三维模型
function D3DataItemProc(id, data){
var html="";
var remarks="";
var remarkHtml="";
	 if (data.remark != null && data.remark != ""){
		 remarkLength(data.remark);
			items=cleanRemark(rema);
			remarks=data.remark;
			remarkHtml= "<span id='D3D_"+id+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span class='span'>" +
				"(备注:" +items+")</span></span>";	
			}
	 RemarkList(remarkHtml,remarks);
 html=remarkHtml+"<br/><br/>";

$.each(data.link, function(idx, item){
	//按';'循环截取
	var items=new Array();
	items=item.split(";");	
	for (var i = 1; i <items.length; i++) {		 
		  html += "<div id='3D_"+i+"' class='marginleft'>"
		  		//+ "<embed  src=\"\D3DServlet?D3Did="+items[i]+"\" width=\"80%\" height=\"400\" "
				//+" type=\"application/x-cortona\" vrml_background_color=\"#f7f7f9\">"
		  		+ "<iframe src=\"" + "/DataCenterBrowser/vrml.html#" + items[i] + "\" width=\"98%\" height=\"400\" frameborder=\"no\" border=\"0\" scrolling=\"no\"></iframe>"
				+ "</div>";		
	}
});
		return html;
}	
//富文本
var  RichText=0;
function RichTextDataItemProc(id,data){
	var html="";
	var remarks="";
	var remarkHtml="";
	 if (data.remark != null && data.remark != ""){
		 remarkLength(data.remark);
			items=cleanRemark(rema);
			remarks=data.remark;
		 remarkHtml= "<span id='rich_"+id+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span class='span'>" +
				"(备注:" +items+")</span></span>";
			}
	    RemarkList(remarkHtml,remarks);//relative
	    //</script>
    
    //html+="<span>"+editor.getPlainTxt()+"</span>";
     html=remarkHtml+'<div id="fu"><span class="marginleft" id="Rdiv" >'
   	+data.Text+'<ol id="oid" class="Link_Class">'
    	+'</ol><span id="imaID" class="image_Class"></span></span><div>';      
   $("#Rdiv").html(data.Text); 
    RichText+=1;
	return html;
}
//操作富文本实例链接和图片链接
var arr = new Array();
var id;
function Rdiv(){	
	$('.image_link').mouseenter(function(){
		id=$(this).attr('id');	
		if(arr[id]!=id){	
			arr[id]=id;	
	  ImageLink(id);
	  showImage();
		}
		//cursor:not-allowed;pointer-events: none;
		 $(".image_link").css("cursor","not-allowed");
    $(".imageclass_link_"+id+"").css("display","block");
	$("#imaID").css("display","block");
	$("ol").css("display","none");
	});
	$(".case_link").mouseenter(function(){
		id=$(this).attr('id');	
		if(arr[id]!=id){
			arr[id]=id;	
		showLink(id);	
		}
		var rel=$(this).attr("rel");
		rels=rel.split(",");
	if(rels.length!=1){
		$("ol").css("display","block");
		$("#Rid_"+id+"").css("display","block");
	}else{
	$("#Rid_"+id+"").css("display","none");
	$("#imaID").css("display","none");
	}
	});
	$("ol").mouseover(function(){
		//showLink();
		$(".imageclass_link_"+id+"").css("display","none");
		$("#Rid_"+id+"").css("display","block");
	});
	$("ol").mouseleave(function(){
		$("#Rid_"+id+"").css("display","none");
		$("ol").css("display","none");
		$(".imageclass_link_"+id+"").css("display","none");	
	});
	$("#imaID").mouseleave(function(){
		$(".imageclass_link_"+id+"").css("display","none");
		$("#Rid_"+id+"").css("display","none");
		$("#imaID").css("display","none");
	});
	$(".case_link").mouseleave(function(){
		$(".imageclass_link_"+id+"").css("display","none");

	});
}
//获取实例链接
function showLink(id){
		 var item=$('#'+id).attr("rel");	
		 var items=new Array();
			items=item.split(",");
			if(items.length==1){
				$("ol").css("display","none");
				$('.linksclass').css("display","none");
			}
				for (var i = 0; i < items.length; i++) {
					html="<div class='linksclass' id='Rid_"+id+"'><a href='http://123.57.52.25:8080/DataCenterBrowser/ie.html?nodeid=case/id/"+items[i]+"'>"+items[i]+"</a></div>";
					$('#'+id).attr("href","http://123.57.52.25:8080/DataCenterBrowser/ie.html?nodeid=case/id/"+items[0]+"");
					$(html).appendTo("ol");										
					}}
//获取图片链接
function ImageLink(id){
		 var itema=$('#'+id).attr('rel');
		 var items=new Array();
			itemss=itema.split(",");
				for (var i = 0; i < itemss.length; i++) {
					imageid+=1;		
					html="<img  id='img_"+imageid+"' data-original='FileServlet?imageid="+itemss[i]+"' class='imageclass_link_"+id+"' style='width:285px;height:200px;margin-left:30px; border:1px solid #BFD4DA;margin-bottom:20px;float:left;'  src='FileServlet?imageid="+itemss[i]+"'/ >";		
//					$('#'+id).attr("href","javascript:void(0);");
//					$('#'+id).attr("onclick",")");
					$(html).appendTo("#imaID");
				}}
//链接
function UrlDataItemProc(id, data){
	var html="";
	if (data.remark != null && data.remark != "")
	html = "&nbsp&nbsp&nbsp&nbsp<span style=''>(备注：" + data.remark + ")</span>";
	$.each(data.links, function(idx, item){
		var items=new Array();
		items=item.split(",");
		for (var i = 0; i < items.length; i++) {
			html += "<p class='lineheight'><a href='http://123.57.52.25:8080/DataCenterBrowser/ie.html?nodeid=case/id/"+items[i]+"'>"+items[i]+"</a></p>";
		}
		
	});
  	return html;
}
//二维表
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
		 remarkHtml= "<span id='TableData_"+id+"'>&nbsp;&nbsp;&nbsp;&nbsp;<span class='span'>" +
				"(备注:" +items+")</span></span>";	
		// remarkColor(remarkHtml);
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
		t = item + " ->"
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
			  skin: 'layui-layer-lan', //加上边框
			 // skin: 'layui-layer-rim',
		      area: ['600px', '600px'], //宽高
		      icon:0, //图标
			// area:'auto',
			//  shadeClose: true,
			 // locked : false,
			 // border : [10 , 0.3 , '#000', true],
			//  offset : ['0' , '60%','200px'],	
		      moveType:1,
			  shade:0,
			  maxmin: true,
			  moveOut: true,
			  //<div id='editorAA' type='text/plain'>"+remarks
			  content:'<div id="fu">'+remarks+'</div>',
			});
	 });
	 $(document).on('mouseenter','#'+$(remarkHtml).attr('id'),function(){
		 $('#'+$(remarkHtml).attr('id')).css("color","red").css("text-decoration","underline");
		 $('#'+$(remarkHtml).attr('id')).mouseleave(function(){
			 $('#'+$(remarkHtml).attr('id')).css("color","").css("text-decoration",""); 
		 });
	 });
}
//替换备注中的<p></p>标签（换行）
function cleanRemark(remark)
{
	return remark.replace(/<p>/g,"").replace(/<\/p>/g,"").replace(/<br>/g,"");
}
/*
 * 点击之后添加一个新图表
 * */
var plotid = 0;

function PlotAgain(id){
	id = id.split("_")[0]
	var ContainerId = id + "_target_plot_container";
	var x = GetXAxis(ContainerId);
	var data = GetPlotData(ContainerId, x);
	if (data.length == 0)
		return;
	var newid = ContainerId + plotid ;
	$("#" + id + "_plot").append("<div class=\"tab-pane fade\" id=\""+ newid +"\"></div>");
	plotid += 1;
	$('#' + newid).highcharts({
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
