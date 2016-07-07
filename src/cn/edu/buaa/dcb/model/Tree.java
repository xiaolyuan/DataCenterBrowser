package cn.edu.buaa.dcb.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import cn.edu.buaa.dcb.dataservice.HttpClientUtils;
import cn.edu.buaa.dcb.service.Utility;

public class Tree {

public static void main(String[] args) {
	Gson gson=new Gson();
	//[{"schemaId":138,"id":1610,"name":"二维表1","type":10,"parentId":1,"order":4,"remark3":"a;b;c;d"}]
	String jsonStrings="[{'schemaId':138,'id':1610,'name':'二维表','type':10,'oracle':4,'remark3':'a;b;c;d'}]";
	List<SchemaData> da=gson.fromJson(jsonStrings,new TypeToken<List<SchemaData>>(){}.getType());
//for (SchemaData schemaData : da) {
//	//SchemaData schemaData=gson.fromJson(jsonStrings, SchemaData.class);
//	System.out.println(schemaData.getName());
//	System.out.println(schemaData.getSchemaId());
//	System.out.println(schemaData.getRemark3());
//	String schemaRe=schemaData.getRemark3(); 
//	String [] ad=schemaRe.split(";");
//	for (String a : ad) {
//		System.out.println(a);
//	}
//}
	
	
	
//    SchemaData ss=new SchemaData("嘻嘻",10,"哈哈");
//    SchemaData ss1=new SchemaData("看看",34,"品牌");
//    SchemaData ss2=new SchemaData(34,667, null);
//    List<SchemaData> sche=new ArrayList<>();
//    sche.add(ss);
//    sche.add(ss1);
//    sche.add(ss2);
//	String toj=gson.toJson(sche);
//	System.out.println(toj);
//	List<SchemaData> s=gson.fromJson(toj, new TypeToken<List<SchemaData>>(){}.getType());
//    for (SchemaData schemaData : s) {
//		System.out.println(schemaData.getName());
//	}
//
//    Map<String,Object> map = new HashMap<String,Object>();
//    map.put("key1", "value1");
//    map.put("key2", "value2");
//    Map<String,Object> map2 = new HashMap<String,Object>();
//    map2.put("key1", 1);
//    map2.put("key2", 2);
//    List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
//    list.add(map);
//    list.add(map2);
//    Gson gson1 =  new Gson();
//    String jsonString = gson1.toJson(list);
//    System.out.println("json字符串:"+jsonString);
//    //解析json字符串
//    List<Map<String,Object>> list2 = gson1.fromJson(jsonString, new TypeToken<List<Map<String,Object>>>(){}.getType());
//               for (Map<String, Object> map3 : list2) {
//				System.out.println(map3);
//			}

}
}
