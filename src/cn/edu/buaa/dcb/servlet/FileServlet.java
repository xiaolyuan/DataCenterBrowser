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
	
	public void responseString(HttpServletResponse response, String fileid){
		String fileName = "test";
		String filePath = "/Users/hsh/Downloads/123.jpg";
		// TODO: 根据fileid得到filePath,我这儿为了方便写死了 
		
		response.reset();
		// 设置response的Header
		response.setContentType("application/x-cortona");

		byte[] result;
		try {
			result = Util.toByteArray(filePath);
			response.addHeader("Content-Disposition", "attachment;filename="
					+ fileName);
			response.addHeader("Content-Length", "" + result.length);
			OutputStream outputStream = null;
			outputStream = response.getOutputStream();
			outputStream.write(result, 0, result.length);
			outputStream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
