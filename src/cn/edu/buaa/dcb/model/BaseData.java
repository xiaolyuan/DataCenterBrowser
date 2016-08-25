package cn.edu.buaa.dcb.model;

import java.util.List;



public class BaseData {
	public static BaseData getInstanceBaseData() {  
		BaseData single = new BaseData();  
		return single;  
   }
	public String remark;
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
	//附件
	public class FileDataItem extends BaseData{
		public List<String> filePaths;
	}
	//时间
	public class TimeDataItem extends BaseData{
		public String time;
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
	
	//链接
	public class UrlDataItem extends BaseData{
		public List<String> links;
	}
	
	//曲线
	public class CurveDataItem extends BaseData{
		public List<List<String>> table;
	}
	
	//三维模型
	public class D3DataItem extends BaseData{
		public List<String> link;
	}
	
	//二维表i
	public class TableDataItem extends BaseData{
		public List<String> value;
        public String remark3;
	}
	//富文本
	public class RichTextDataItem extends BaseData{
		public List<String> Text;
	}
	//视频
	public class RideoDataItem extends BaseData{
		public List<String> link;
		
	} 
}



