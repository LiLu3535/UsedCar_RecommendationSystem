/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author ASUS
 */
public class MemberServlet extends HttpServlet {

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
            out.println("<title>Servlet MemberServlet</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet MemberServlet at " + request.getContextPath() + "</h1>");
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
        processRequest(request, response);
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
        if (request.getParameter("method").equals("setLoginStatusMember")) {
            // get parameters
            String email = request.getParameter("email");
            String status = request.getParameter("status");
            String result = Member.setLoginStatus_Member(email, status);
            //return result
            response.getWriter().print(result);

        } else if (request.getParameter("method").equals("isPasswordMember")) {
            // get parameters
            String email = request.getParameter("email");
            String password = request.getParameter("password");
            String result = Member.isPasswordMember(email, password);

            //return result
            response.getWriter().print(result);

        } else if (request.getParameter("method").equals("isMember")) {
            // get parameters
            String email = request.getParameter("email");
            String result = Member.isMember(email);

            //return result
            response.getWriter().print(result);

        } else if (request.getParameter("method").equals("checkEmailDuplication")) {
            // get parameters
            String email = request.getParameter("email");
            String result = Member.checkEmailDuplication(email);
            System.out.println(email);
            response.getWriter().print(result);

        } else if (request.getParameter("method").equals("addMember")) {
            // get parameters
            String memberID = Database.getSingleData_SQL("SELECT MAX(Member_ID) FROM cars.Member");
            String email = request.getParameter("email");
            String password = request.getParameter("password");
            String firstName = request.getParameter("firstName");
            String lastName = request.getParameter("lastName");
            String phone = request.getParameter("phone");
            String status = request.getParameter("status");
            String dreamCarID = null;
            String viewHistory = null;
            String result = Database.addMember(memberID, email, password, firstName, lastName, phone, status, dreamCarID, viewHistory);

            //return result
            response.getWriter().print(result);

        } else if (request.getParameter("method").equals("showStartTransWindow")) {
            String id = request.getParameter("sellerID");
            ArrayList<Member> list = Database.getMemberList("SELECT * FROM cars.Member WHERE Member_ID = " + id);
            Member seller = list.get(0);
            String firstName = seller.getFirstname();
            String lastName = seller.getLastname();
            String phone = seller.getPhone_Number();
            String result = firstName + ";" + lastName + ";" + phone;
            response.getWriter().print(result);
        } else if (request.getParameter("method").equals("confirmStartTrans")) {
            String buyer_email = request.getParameter("newBuyer_email");
            String carID = request.getParameter("carID");

            ArrayList<Member> mem_list = Database.getMemberList("SELECT * FROM cars.Member WHERE Email = '" + buyer_email + "'");
            Member buyer = mem_list.get(0);
            Car car = Database.getCar("SELECT * FROM cars.Car WHERE Car_ID = " + carID);
            buyer.transHappened(car);

            response.getWriter().print("true");
        } else if (request.getParameter("method").equals("submitPersonalInfo")) {
            String email = request.getParameter("email");
            String phone = request.getParameter("phone");

            ArrayList<Member> mem_list = Database.getMemberList("SELECT * FROM cars.Member WHERE Email = '" + email + "'");
            Member member = mem_list.get(0);
            String truePhone = member.getPhone_Number();
            if (phone.equals(truePhone)) {
                response.getWriter().print("true");
            } else {
                response.getWriter().print("false");
            }
        } else if (request.getParameter("method").equals("submitNewPass")) {
            String email = request.getParameter("email");
            String newPassword = request.getParameter("newPass");

            Database.execution_SQL("UPDATE cars.Member SET Password = " + newPassword + " WHERE Email = '" + email + "'");

        }
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
