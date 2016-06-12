package cn.edu.buaa.dcb.servlet;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;




/**
 * Servlet implementation class FileServlet
 */
@WebServlet("/FileServlet")
public class FileServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FileServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String fileid = request.getParameter("id");
		responseString(response, fileid);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}
	
	public void responseString(HttpServletResponse response, String fileid)  {
		//String fileName = URLEncoder.encode(fileid.substring(1,fileid.length()), "UTF-8");
		//从文件名第二个 开始取
		String fileName=fileid.substring(1,fileid.length());
		String filePath = "D:\\cw_upload\\image\\"+fileName;
		System.out.println(filePath);
		// TODO: 根据fileid得到filePath,
		response.reset();
		// 设置response的Header
		//response.setContentType("application/octet-stream;charset=UTF-8;"); 
		response.setContentType("application/x-cortona");
		byte[] result;
		try {
			result = Util.toByteArray(filePath);
			System.out.println(filePath);
			//response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(fileName, "UTF-8"));
			response.addHeader("Content-Disposition", "attachment;filename="
					+  encodingFileName(fileName));  
			response.addHeader("Content-Length", "" + result.length);
			OutputStream outputStream = null;
			outputStream = response.getOutputStream();
			outputStream.write(result, 0, result.length);
			outputStream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
     
	//解决中文乱码
	public  static String encodingFileName(String fileName) {
		  String returnFileName = ""; 
	      try { 
	            returnFileName = URLEncoder.encode(fileName, "UTF-8"); 
	            returnFileName = StringUtils.replace(returnFileName, "+", "%20"); 
	            if (returnFileName.length() > 150) { 
	                returnFileName = new String(fileName.getBytes("GB2312"), "ISO8859-1"); 
	                returnFileName = StringUtils.replace(returnFileName, " ", "%20"); 	        
	            } 
	        } catch (UnsupportedEncodingException e) { 
	            e.printStackTrace();        
	        } 
	        
	        return returnFileName; 
	        
	}

}
