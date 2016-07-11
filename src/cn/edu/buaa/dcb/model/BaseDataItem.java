package cn.edu.buaa.dcb.model;

import java.util.List;

public class BaseDataItem {
	public String attributes;
	public int id;
	public int type;
	public String text;
	public int parentId;
	public boolean isLeaf;
	public String data_value;
//	public String iconCls;
	public String value_hidden;
	public String remark_hidden;
	public List<BaseDataItem> children;
	public BaseDataItem(int id, String text,String attributes) {
		this.id=id;
		this.text=text;
		this.attributes=attributes;
	}
}
