package cn.edu.buaa.dcb.servlet;

import java.io.IOException;
import java.io.OutputStream;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
 * Servlet implementation class FileServlet
 */
@WebServlet("/D3DServlet")
public class D3DServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public D3DServlet() {
        super();
        // TODO Auto-generated constructor stub
    }
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//解决servlet中文乱码
		String fileid=request.getParameter("D3Did");
		//String fileid = new String(request.getParameter("D3Did").getBytes("iso-8859-1"),"utf-8");				
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
		//判断文件后缀名
//		int imgType=fileName.lastIndexOf(".");
//		String imgTypeStr=fileName.substring(imgType);
//		System.out.println(imgTypeStr);
		
		for (int i = 0; i < arrayfileName.length; i++) {
			 //if(imgTypeStr.equals(".txt") ||imgTypeStr.equals(".xlsx")||imgTypeStr.equals(".xlsx")){
			
			String filePath="D:\\cw_upload\\3D\\"+arrayfileName[i];		
		        System.out.println(filePath);
		
		
		// TODO: 根据fileid得到filePath,
		response.reset();
		response.setContentType("application/x-msdownload");
		byte[] result;
		try {
			result = Util.toByteArray(filePath);
			//response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(fileName, "UTF-8"));
//			response.addHeader("Content-Disposition", "attachment;filename="
//					+  encodingFileName(fileName));  
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
