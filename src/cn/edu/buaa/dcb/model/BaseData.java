package cn.edu.buaa.dcb.model;

import java.util.List;


public class BaseData {
	public static BaseData getInstanceBaseData() {  
		BaseData single = new BaseData();  
		return single;  
   }
	
	public class TitleDataItem extends BaseData{
	}
	
	public class SubtitleDataItem extends BaseData{
	}
    
	//图片
	public class ImageDataItem extends BaseData{
		public int flag;
		public List<String> urls;
		
		public ImageDataItem()
		{
			this.flag = 0;
		}
	}
	
	public class FileDataItem extends BaseData{
		public List<String> filePaths;
	}
	
	//文本
	public class TextDataItem extends BaseData{
		public List<String> text;
	}
	
	//浮点数
	public class FloatDataItem extends BaseData{
		public String unit;
		public String value;
	}
	
	public class RadioDataItem extends BaseData{
		public List<String> filePaths;
	}
	
	public class UrlDataItem extends BaseData{
		public List<String> links;
	}
	
	//曲线
	public class CurveDataItem extends BaseData{
		public List<List<String>> table;
	}
	
	//三维模型
	public class D3DataItem extends BaseData{
		public String link;
	}
	
	public class TableDataItem extends BaseData{
		public String value;
	}
}



