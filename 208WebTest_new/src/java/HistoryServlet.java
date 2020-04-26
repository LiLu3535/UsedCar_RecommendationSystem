/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author snowyfire
 */
import java.io.IOException;
import java.io.PrintWriter;
import static java.lang.Integer.parseInt;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;
//history xuyao carid memberid

/**
 *
 * @author ASUS
 */
@WebServlet(name = "History", urlPatterns = {"/History"})

public class HistoryServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet ShowBookDetail</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ShowBookDetail at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("history.doget");
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        String[] arrArea = request.getParameter("email").split("[@]");
        String email = arrArea[0];
        ArrayList<Member> mem_list = Database.getMemberList("SELECT * FROM cars.Member WHERE Email = " + email);
        Member viewer = mem_list.get(0);
        int viewerID = viewer.getMemberID();
        String carID = request.getParameter("carID");
        String id;
        id = Database.getSingleData_SQL("SELECT ViewHistory FROM cars.Member WHERE Member_ID = " + viewerID);

        String viewHistory=organizeId(id, carID, viewerID);
        Database.pageViewUpdate(parseInt(carID));
        Database.execution_SQL("UPDATE cars.Member SET ViewHistory='" + viewHistory + "' WHERE Member_ID=" + viewerID);
    }

    public String organizeId(String historyCar, String carID, int viewerID) {

//        Cookie[] cookies = request.getCookies();
//        if (cookies == null) {
//            return id;
//        }
//        Cookie historyCar = null;
//        for (int i = 0; i < cookies.length; i++) {
//            if ("historyCarId".equals(cookies[i].getName())) {
//                historyCar = cookies[i];
//            }
//        }

        System.out.println(carID);
        if (historyCar == null) {
            return carID;
        }
//        String value = historyCar.getValue();
        String[] values = historyCar.split("-");
        LinkedList<String> list = new LinkedList<String>(Arrays.asList(values));

        if (list.size() < 50) {
            if (list.contains(carID)) {
                list.remove(carID);
            }
        } else {
            if (list.contains(carID)) {
                list.remove(carID);
            } else {
                list.removeLast();
            }
        }
        list.addFirst(carID);

        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < list.size(); i++) {
            if (i > 0) {
                sb.append("-");
            }
            sb.append(list.get(i));
        }
        //view++
        
        System.out.println("history:"+sb);
        return sb.toString();
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
