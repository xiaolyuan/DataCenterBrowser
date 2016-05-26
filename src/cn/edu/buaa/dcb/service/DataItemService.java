package cn.edu.buaa.dcb.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.google.gson.Gson;

import cn.edu.buaa.dcb.dataservice.HttpClientUtils;
import cn.edu.buaa.dcb.model.BaseData;
import cn.edu.buaa.dcb.model.BaseData.TextDataItem;
import cn.edu.buaa.dcb.model.BaseDataItem;
import cn.edu.buaa.dcb.model.DataItem;
import cn.edu.buaa.dcb.model.BaseData.D3DataItem;
import cn.edu.buaa.dcb.model.BaseData.FloatDataItem;
import cn.edu.buaa.dcb.model.BaseData.ImageDataItem;

public class DataItemService {
	
	HttpClientUtils httpClientUtils = new HttpClientUtils();
	
	String charset = "utf8";
	
	Gson gson = new Gson();
	/**
	 * 
	 * @param nodeid
	 * @return
	 */
	public HashMap<String, Object> getDataItem(String nodeid){
		
		//TODO: 以后根据nodeid进行拼接url
		String url = Utility.getParameter("db_url") + nodeid.replace("|", "&") + "?action=get";
//		String url = "http://202.112.140.210/CooperateWeb/case/name/数据库分类1&数据库1/case/name/实例分类1&实例1";
		
		String jsonString = httpClientUtils.getDoGetURL(url, charset);
		
		BaseDataItem[] baseDataItems = gson.fromJson(jsonString, BaseDataItem[].class); 
		
		List<DataItem> dataItems = new ArrayList<DataItem>();
		
		generateDataItem(dataItems, baseDataItems);
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("TreeNode", baseDataItems);
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
				DataItem dataItem = new DataItem(baseDataItem.text, String.valueOf(baseDataItem.id), "", floatdataItem);
				dataItems.add(dataItem);
			}
			else if (baseDataItem.attributes.equals("文本"))
			{
				TextDataItem textDataItem =  BaseData.getInstanceBaseData().new TextDataItem();
				List<String> strings = new ArrayList<String>();
				strings.add(baseDataItem.data_value);
				textDataItem.text = strings;
				DataItem dataItem = new DataItem(baseDataItem.text, String.valueOf(baseDataItem.id), "", textDataItem);
				dataItems.add(dataItem);
			}else if(baseDataItem.attributes.equals("图片")){
				
				ImageDataItem imageDataItem=BaseData.getInstanceBaseData().new ImageDataItem();
				List<String> strings =new ArrayList<String>(); 
				strings.add(baseDataItem.data_value);
				imageDataItem.urls=strings;
				DataItem dataItem=new DataItem(baseDataItem.text, String.valueOf(baseDataItem.id), "", imageDataItem);
			     dataItems.add(dataItem);		
			}else if(baseDataItem.attributes.equals("三维模型")){
				D3DataItem d3DataItem=BaseData.getInstanceBaseData().new D3DataItem();
				DataItem dataitem=new DataItem(baseDataItem.text, String.valueOf(baseDataItem.id),"",d3DataItem);
				dataItems.add(dataitem);
			}
			if (baseDataItem.children.length > 0){
				generateDataItem(dataItems, baseDataItem.children);
			}
		}
	}
}
