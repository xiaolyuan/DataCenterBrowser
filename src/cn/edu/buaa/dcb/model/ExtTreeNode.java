package cn.edu.buaa.dcb.model;

import java.util.ArrayList;
import java.util.List;


public class ExtTreeNode {
	 public String id;
	 public String iconCls;
	 public String cls;
	 public String text;
	 public A_attr a_attr;
	 public List<ExtTreeNode> children;
	 public boolean leaf;
	 public boolean singleClickExpand;
	 public boolean expanded;
	 public class A_attr{
			public String href;	
			public A_attr(String href){
				this.href = href;
			}	
}
	 public ExtTreeNode(String id, String text,String iconCls,String cls) {
		this.id = id;
		this.iconCls=iconCls;
		this.cls=cls;
		this.text = text;
		singleClickExpand = true;
		leaf = true;
		expanded=true;
		this.a_attr = this.new A_attr("#" + this.id + "_target");
	 }
	 
	 public ExtTreeNode(String id, String text) {
			this.id = id;
			this.text = text;
		    singleClickExpand = true;
			leaf = true;
		    expanded=true;
		 }
	 
	 public void Add(ExtTreeNode extTreeNoede){
		 if (children == null)
			 children = new ArrayList<>();
		 children.add(extTreeNoede);
		 leaf = false;
		 expanded=true;
		 if(children.size()<3){
		 expanded=false; 
		 }
		 
	 }

	 }
