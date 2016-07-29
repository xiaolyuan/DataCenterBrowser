package cn.edu.buaa.dcb.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import cn.edu.buaa.dcb.dataservice.HttpClientUtils;
import cn.edu.buaa.dcb.model.BaseData;
import cn.edu.buaa.dcb.model.BaseData.TextDataItem;
import cn.edu.buaa.dcb.model.BaseData.TimeDataItem;
import cn.edu.buaa.dcb.model.BaseData.UrlDataItem;
import cn.edu.buaa.dcb.model.BaseDataItem;
import cn.edu.buaa.dcb.model.DataItem;
import cn.edu.buaa.dcb.model.BaseData.D3DataItem;
import cn.edu.buaa.dcb.model.BaseData.FileDataItem;
import cn.edu.buaa.dcb.model.BaseData.FloatDataItem;
import cn.edu.buaa.dcb.model.BaseData.ImageDataItem;
import cn.edu.buaa.dcb.model.BaseData.RichTextDataItem;
import cn.edu.buaa.dcb.model.BaseData.RideoDataItem;
import cn.edu.buaa.dcb.model.BaseData.TableDataItem;
import cn.edu.buaa.dcb.model.ExtTreeNode;
import cn.edu.buaa.dcb.model.SchemaData;
public class DataItemService {
	HttpClientUtils httpClientUtils = new HttpClientUtils();
	String charset = "utf8";
	Gson gson = new Gson();
	public HashMap<String, Object> getDataItem(String nodeid){
		//TODO: 通过nodeid判断是数据库还是实例。如果是实例，保持不变，如果是数据库，获取数据库下面的实例。
		if (nodeid != null) // 如果nodeid是实例
			return this.getDataItemByIns(nodeid);
		else
		{
			//TODO 如果数据库，获取实例nodeid，（list）。在拼接	
			return null;
		}
	}
	/**
	 * 
	 * @param nodeid
	 * @return
	 */
	public HashMap<String, Object> getDataItemByIns(String nodeid){
		//TODO: 以后根据nodeid进行拼接url	
		String url = Utility.getParameter("db_url") + nodeid.replace("|", "&")+ "?action=get";
//		String url = "http://202.112.140.210/CooperateWeb/case/name/数据库分类1&数据库1/case/name/实例分类1&实例1";
		System.out.println(url);
		String jsonString = httpClientUtils.getDoGetURL(url, charset);	
		BaseDataItem[] baseDataItems = gson.fromJson(jsonString, BaseDataItem[].class); 
		for (BaseDataItem baseDataItem : baseDataItems) {
			if(baseDataItem.type==6){	
				
		int adminId=baseDataItem.id;
		String url1 = Utility.getParameter("db_url")+"case/id/"+adminId+"?action=get";
		System.out.println(url1);
		String j=httpClientUtils.getDoGetURL(url1, charset);
		System.out.println(j);
		//new TypeToken<List<SchemaData>>(){}.getType()
			BaseDataItem[] ba=gson.fromJson(j,BaseDataItem[].class);
			List<DataItem> dataItems = new ArrayList<DataItem>();
			generateDataItem(dataItems,  ba);	
			List<ExtTreeNode> extTreeNodes = generateExtTreeNode(ba);	
			HashMap<String, Object> result = new HashMap<String, Object>();
			result.put("TreeNode", extTreeNodes);
			result.put("DataItem", dataItems);	
			return result;	
		}}
		List<DataItem> dataItems = new ArrayList<DataItem>();
		generateDataItem(dataItems, baseDataItems);	
		List<ExtTreeNode> extTreeNodes = generateExtTreeNode(baseDataItems);	
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("TreeNode", extTreeNodes);
		result.put("DataItem", dataItems);	
		return result;	
	}
	private void generateDataItem(List<DataItem> dataItems, BaseDataItem[] baseDataItems) {	   
		for (BaseDataItem baseDataItem : baseDataItems) {
			if (baseDataItem.attributes.equals("分类"))
			{
				BaseData baseData = BaseData.getInstanceBaseData().new TitleDataItem();
				DataItem dataItem = new DataItem(baseDataItem.text, String.valueOf(baseDataItem.id), "", baseData);
				dataItems.add(dataItem);
			}
			else if (baseDataItem.attributes.equals("浮点数"))
			{
				FloatDataItem floatdataItem =  BaseData.getInstanceBaseData().new FloatDataItem();
				floatdataItem.unit = "";
				floatdataItem.value = baseDataItem.data_value;
				floatdataItem.remark=baseDataItem.remark_hidden;
				DataItem dataItem = new DataItem(baseDataItem.text, String.valueOf(baseDataItem.id), "", floatdataItem);
				dataItems.add(dataItem);
			}
			else if(baseDataItem.attributes.equals("时间")){
				TimeDataItem timeDataItem=BaseData.getInstanceBaseData().new TimeDataItem();
				timeDataItem.time=baseDataItem.data_value;
				timeDataItem.remark=baseDataItem.remark_hidden;
				DataItem dataItem=new DataItem(baseDataItem.text,String.valueOf(baseDataItem.id),"",timeDataItem);
				dataItems.add(dataItem);
			}
			else if (baseDataItem.attributes.equals("文本"))
			{
				TextDataItem textDataItem =  BaseData.getInstanceBaseData().new TextDataItem();
				List<String> strings = new ArrayList<String>();
				strings.add(baseDataItem.value_hidden);
				textDataItem.remark=baseDataItem.remark_hidden;
				textDataItem.text = strings;
				DataItem dataItem = new DataItem(baseDataItem.text, String.valueOf(baseDataItem.id), "", textDataItem);
				dataItems.add(dataItem);
			}else if(baseDataItem.attributes.equals("链接")){
				UrlDataItem urlDataItem=BaseData.getInstanceBaseData().new UrlDataItem();
				List<String> strings= new ArrayList<>();
				strings.add(baseDataItem.data_value);
				urlDataItem.remark=baseDataItem.remark_hidden;
				urlDataItem.links=strings;
				DataItem dataItem=new DataItem(baseDataItem.text, String.valueOf(baseDataItem.id), "", urlDataItem);
				dataItems.add(dataItem);
			}else if(baseDataItem.attributes.equals("附件")){
				FileDataItem fileDataItem=BaseData.getInstanceBaseData().new FileDataItem();
				List<String> strings=new ArrayList<>();
				//for (int i = 0; i < baseDataItems.length; i++) {
				strings.add(baseDataItem.value_hidden);
				fileDataItem.remark=baseDataItem.remark_hidden;
				fileDataItem.filePaths=strings;
				DataItem dataItem=new DataItem(baseDataItem.text, String.valueOf(baseDataItem.id), "", fileDataItem);
				 dataItems.add(dataItem);
			}
			else if(baseDataItem.attributes.equals("图片")){
				ImageDataItem imageDataItem=BaseData.getInstanceBaseData().new ImageDataItem();
				List<String> strings =new ArrayList<String>(); 
				strings.add(baseDataItem.value_hidden);
				imageDataItem.remark=baseDataItem.remark_hidden;
				//strings.add(baseDataItem.remark_hidden);
				imageDataItem.flag=1;
				imageDataItem.urls=strings;
				DataItem dataItem=new DataItem(baseDataItem.text, String.valueOf(baseDataItem.id), "", imageDataItem);
			    dataItems.add(dataItem);	
			}else if(baseDataItem.attributes.equals("三维模型")){
				D3DataItem d3DataItem=BaseData.getInstanceBaseData().new D3DataItem();
				List<String> strings=new ArrayList<String>();
				strings.add(baseDataItem.value_hidden);
				d3DataItem.remark=baseDataItem.remark_hidden;
				d3DataItem.link=strings;
				DataItem dataitem=new DataItem(baseDataItem.text, String.valueOf(baseDataItem.id),"",d3DataItem);
				dataItems.add(dataitem);
			}else if(baseDataItem.attributes.equals("视频")){
				RideoDataItem rideoDataItem=BaseData.getInstanceBaseData().new RideoDataItem();
				List<String> strings=new ArrayList<>();
				strings.add(baseDataItem.value_hidden);
				rideoDataItem.remark=baseDataItem.remark_hidden;
				rideoDataItem.link=strings;
				DataItem dataitem=new DataItem(baseDataItem.text, String.valueOf(baseDataItem.id),"",rideoDataItem);
				dataItems.add(dataitem);
			}
			else if(baseDataItem.attributes.equals("富文本")){
				RichTextDataItem richTextDataItem=BaseData.getInstanceBaseData().new RichTextDataItem();	
				List<String> strings= new ArrayList<>();
				strings.add(baseDataItem.value_hidden);
				richTextDataItem.remark=baseDataItem.remark_hidden;
				richTextDataItem.Text=strings;
				DataItem dataitem=new DataItem(baseDataItem.text, String.valueOf(baseDataItem.id), "", richTextDataItem);
				dataItems.add(dataitem);
			}else if(baseDataItem.attributes.equals("二维表")){
				TableDataItem tableDataItem=BaseData.getInstanceBaseData().new TableDataItem();
				List<String> strings= new ArrayList<>();
				strings.add(baseDataItem.value_hidden);
				tableDataItem.remark=baseDataItem.remark_hidden;
				
				int field=baseDataItem.id;
				String urls = Utility.getParameter("db_url") +"field/"+ field+ "?action=get";
				String jsonStrings = httpClientUtils.getDoGetURL(urls, charset);
				System.out.println(jsonStrings);
				List<SchemaData> da=gson.fromJson(jsonStrings,new TypeToken<List<SchemaData>>(){}.getType());
		        for (SchemaData a : da) {
		 		    String dataSS=a.getRemark3();
		 		     Map<String, Object> map=new HashMap<>();
				        map.put("data", dataSS);
				        tableDataItem.remark3=dataSS;
				}
		   
		       
				tableDataItem.value=strings;	
				DataItem dataitem=new DataItem(baseDataItem.text, String.valueOf(baseDataItem.id), "", tableDataItem);
				dataItems.add(dataitem);
			}
			if (baseDataItem.children.size() > 0){
				BaseDataItem[] temp = new BaseDataItem[baseDataItem.children.size()];
				generateDataItem(dataItems, baseDataItem.children.toArray(temp));
			}
		}
	}
	
	private List<ExtTreeNode> generateExtTreeNode(BaseDataItem[] baseDataItems){
		List<ExtTreeNode> extTreeNodes = new ArrayList<ExtTreeNode>();
		for (BaseDataItem baseDataItem : baseDataItems) {
			ExtTreeNode extTreeNode = new ExtTreeNode(String.valueOf(baseDataItem.id), baseDataItem.text);
			if (baseDataItem.children.size() > 0){
				BaseDataItem[] temp = new BaseDataItem[baseDataItem.children.size()];
				List<ExtTreeNode> tempNodes =  generateExtTreeNode(baseDataItem.children.toArray(temp));
				for (ExtTreeNode extTreeNode2 : tempNodes) {
					extTreeNode.Add(extTreeNode2);
			}
				}
			extTreeNodes.add(extTreeNode);
		}
		return extTreeNodes;
	}
}
