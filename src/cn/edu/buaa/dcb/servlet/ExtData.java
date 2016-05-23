package cn.edu.buaa.dcb.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.edu.buaa.dcb.model.BaseData;
import cn.edu.buaa.dcb.model.BaseData.FloatDataItem;
import cn.edu.buaa.dcb.model.DataItem;
import cn.edu.buaa.dcb.model.ExtTreeNode;
import cn.edu.buaa.dcb.service.DataItemService;

import com.google.gson.Gson;

/**
 * Servlet implementation class ExtData
 */
@WebServlet("/ExtData")
public class ExtData extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ExtData() {
        super();
    }

	/**
	 * 通过传入的参数-nodeid，获得treenode和dataitems
	 * 返回的为一个HashMap的形式 <"TreeNode":List<ExtTreeNode>, "DataItem": List<DataItem>>
	 * 
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String nodeid = request.getParameter("nodeid");
		
		nodeid = Util.byte2str(nodeid);
		
		DataItemService dataItemService = new DataItemService();
		
		HashMap<String, Object> result = dataItemService.getDataItem(nodeid);

		Gson gson = new Gson();
		responseString(response, gson.toJson(result));
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}
	
	public void responseString(HttpServletResponse response, String json){
		response.setCharacterEncoding("UTF-8");
		response.setHeader("content-type","text/html;charset=UTF-8");
		try {
			response.getWriter().write(json);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
