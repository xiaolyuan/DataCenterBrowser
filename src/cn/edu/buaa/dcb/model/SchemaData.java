package cn.edu.buaa.dcb.model;

import java.util.List;

public class SchemaData { 
	
	private int schemaId;
	private int id;  
	private int parentId;
	private String name;
	private int type;
    private int childCount;
	private int order;
    private String remark3;
    public String rema;
    
	public SchemaData() {

	}

	public SchemaData(String name, int childCount, String  rema) {
		super();
		this.name = name;
		this.childCount = childCount;
		this.rema = rema;
	}

	public SchemaData( int id, int type,String remark3) {
		this.id = id;
		this.type = type;
		this.remark3=remark3;
	}
 
	public int getSchemaId() {
		return schemaId;
	}
	public void setSchemaId(int schemaId) {
		this.schemaId = schemaId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getParentId() {
		return parentId;
	}
	public void setParentId(int parentId) {
		this.parentId = parentId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getChildCount() {
		return childCount;
	}
	public void setChildCount(int childCount) {
		this.childCount = childCount;
	}
	public int getOrder() {
		return order;
	}
	public void setOrder(int order) {
		this.order = order;
	}
	public String getRemark3() {
		return remark3;
	}
	public void setRemark3(String remark3) {
		this.remark3 = remark3;
	}

    
    
    
}
