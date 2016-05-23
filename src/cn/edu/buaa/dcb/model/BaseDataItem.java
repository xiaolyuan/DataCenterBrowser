package cn.edu.buaa.dcb.model;

import java.util.List;

public class BaseDataItem {
	public String attributes;
	public int id;
	public String text;
	public int parentId;
	public List<BaseDataItem> children;
}
