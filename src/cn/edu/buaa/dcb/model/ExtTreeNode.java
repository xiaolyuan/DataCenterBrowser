package cn.edu.buaa.dcb.model;

import java.util.ArrayList;
import java.util.List;

public class ExtTreeNode {
	 public String id;
	 public String iconCls;
	 public String cls;
	 public String text;

	 public List<ExtTreeNode> children;
	 public boolean leaf;
	 public boolean singleClickExpand;
	 
	 public ExtTreeNode(String id, String text,String iconCls,String cls) {
		this.id = id;
		this.iconCls=iconCls;
		this.cls=cls;
		this.text = text;
		singleClickExpand = true;
		leaf = true;
	 }
	 
	 public ExtTreeNode(String id, String text) {
			this.id = id;
			this.text = text;
			singleClickExpand = true;
			leaf = true;
		 }
	 
	 public void Add(ExtTreeNode extTreeNoede){
		 if (children == null)
			 children = new ArrayList<>();
		 children.add(extTreeNoede);
		 leaf = false;
	 }
}
