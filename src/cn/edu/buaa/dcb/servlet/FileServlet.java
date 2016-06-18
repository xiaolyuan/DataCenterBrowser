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
		//request.setCharacterEncoding("UTF-8");
		//String fileid = request.getParameter("id");
		String fileid = new String(request.getParameter("id").getBytes("iso-8859-1"),"utf-8");
		responseString(response, fileid);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}
	
	public void responseString(HttpServletResponse response, String fileid)  {
		//String filePaths =null;
		//从文件名第二个 开始取
		//String fileName=fileid.substring(1,fileid.length());
		String fileName=fileid;
		//按照";"进行分割，并循环显示
		String [] arrayfileName=fileName.split(";");
		/*获取文件格式
		int imgType=fileName.lastIndexOf(".");
		String imgTypeStr=fileName.substring(imgType);
		System.out.println(imgTypeStr);*/
		
		
		 //String fPath="D:\\cw_upload\\file\\";	
		for (int i = 0; i < arrayfileName.length; i++) {
			//if(imgTypeStr.equals(".jpg")||imgTypeStr.equals(".bmp")||imgTypeStr.equals(".gif")||imgTypeStr.equals(".jpeg")||imgTypeStr.equals(".png")||imgTypeStr.equals(".swf")){
			String	filePath="D:\\cw_upload\\image\\"+arrayfileName[i];
//			}else if(imgTypeStr.equals(".txt") ||imgTypeStr.equals(".xlsx")){
				//filePath="D:\\cw_upload\\file\\"+arrayfileName[i];	
          //String filePath = "D:\\cw_upload\\image\\"+arrayfileName[i];
			//String filePath1=fPath+arrayfileName[i];
			//filePath=imagePath+arrayfileName[i];
		
         // filePath="D:\\cw_upload\\file\\"+arrayfileName[i];
         // System.out.println(filePath+"ad");
		
		System.out.println(filePath);
		
		// TODO: 根据fileid得到filePath,
		response.reset();
		// 设置response的Header
		//response.setContentType("application/octet-stream;charset=UTF-8;"); 
		//response.setContentType("application/x-cortona");
		response.setContentType("application/x-msdownload");
		byte[] result;
		try {
			result = Util.toByteArray(filePath); 
//			response.addHeader("Content-Disposition", "attachment;filename="
//					+ fileName);
//			response.addHeader("Content-Length", "" + result.length);
			response.addHeader("Content-Disposition", "attachment;filename="
					+new String(fileName.getBytes("gb2312"),"ISO8859-1"));
			response.addHeader("Content-Length", "" + Long.toString(result.length));
			OutputStream outputStream = null;
			outputStream = response.getOutputStream();
			outputStream.write(result, 0, result.length);
			outputStream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		}}
	}
     
	//解决中文乱码
//	public  static String encodingFileName(String fileName) {
//		  String returnFileName = ""; 
//	      try { 
//	            returnFileName = URLEncoder.encode(fileName, "UTF-8"); 
//	            returnFileName = StringUtils.replace(returnFileName, "+", "%20"); 
//	            if (returnFileName.length() > 150) { 
//	                returnFileName = new String(fileName.getBytes("GB2312"), "ISO8859-1"); 
//	                returnFileName = StringUtils.replace(returnFileName, " ", "%20"); 	        
//	            } 
//	        } catch (UnsupportedEncodingException e) { 
//	            e.printStackTrace();        
//	        } 
//	        
//	        return returnFileName; 
//	        
//	}

