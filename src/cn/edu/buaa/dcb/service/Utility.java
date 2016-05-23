package cn.edu.buaa.dcb.service;

import java.io.IOException;
import java.util.Date;
import java.util.Properties;

public class Utility {
	/**
	 * 从配置文件读取相应的参数
	 * @param key
	 * @return
	 */
	public static String getParameter(String key) {
		ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
		Properties properties = new Properties();
		try {
			properties.load(classLoader.getResourceAsStream("/parameter.properties"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		String p = properties.getProperty(key);
		return p;
	}
	
	/**
	 * 打印log
	 * @param info
	 */
	public static void Log(String info) {
		Date date = new Date();
	    String str=null;  
	    str=String.format("Time:%s Info:%s", date.toString(), info); 
		System.out.println(str);
	}
}
