package cn.edu.buaa.dcb.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.google.gson.Gson;

import cn.edu.buaa.dcb.dataservice.HttpClientUtils;
import cn.edu.buaa.dcb.model.BaseData;
import cn.edu.buaa.dcb.model.BaseDataItem;
import cn.edu.buaa.dcb.model.DataItem;
import cn.edu.buaa.dcb.model.BaseData.FloatDataItem;

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
		String url = "http://202.112.140.210/CooperateWeb/case/name/数据库分类1&数据库1/case/name/实例分类1&实例1?action=get";
		
		String jsonString = httpClientUtils.getDoGetURL(url, charset);
		
		BaseDataItem[] baseDataItems = gson.fromJson(jsonString, BaseDataItem[].class); 
		
		List<DataItem> dataItems = new ArrayList<DataItem>();
		
		BaseData baseData = BaseData.getInstanceBaseData().new TitleDataItem();
		DataItem dataItem = new DataItem("test", "id1", "123", baseData);
		
		FloatDataItem floatDataItem =  BaseData.getInstanceBaseData().new FloatDataItem();
		floatDataItem.unit = "N";
		floatDataItem.value = String.valueOf(100);
		
		DataItem dataItem1 = new DataItem("test- text", "id2", "123", floatDataItem);
		
		dataItems.add(dataItem);
		dataItems.add(dataItem1);
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("TreeNode", baseDataItems);
		result.put("DataItem", dataItems);
		
		return result;
	}
}
