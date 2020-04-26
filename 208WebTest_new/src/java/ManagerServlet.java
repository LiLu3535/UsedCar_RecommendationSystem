/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author ASUS
 */
public class ManagerServlet extends HttpServlet {

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
            out.println("<title>Servlet ManagerServlet</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ManagerServlet at " + request.getContextPath() + "</h1>");
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
        this.doPost(request, response);
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
        if (request.getParameter("method").equals("setLoginStatusManager")) {
            // get parameters
            String email = request.getParameter("email");
            String status = request.getParameter("status");
            String result = Manager.setLoginStatus_Manager(email, status);

            //return result
            response.getWriter().print(result);

        } else if (request.getParameter("method").equals("isPasswordManager")) {
            // get parameters
            String email = request.getParameter("email");
            String password = request.getParameter("password");
            String result = Manager.isPasswordManager(email, password);

            //return result
            response.getWriter().print(result);

        } else if (request.getParameter("method").equals("isManager")) {
            // get parameters
            String email = request.getParameter("email");
            String result = Manager.isManager(email);

            //return result
            response.getWriter().print(result);
        } else if (request.getParameter("method").equals("getCarList")) {
            ArrayList<Car> carList = Database.getCarList("SELECT * FROM cars.Car");
            String result = "";
            for (int i = 0; i < carList.size(); i++) {
                Car car = carList.get(i);
                int carID = car.getcarID();
                String model = car.getmodel();
                String brand = car.getbrand();
                int price = car.getprice();
                int sellerID = car.getsellerID();
                int year = car.getyear();
                int mileage = car.getmileage();
                String power = car.getpowerType();
                String note = car.getnote();
                float fuelCons = car.getfuelCons();
                Date registerDate = car.getregisterDate();

                if (brand.equals("audi")) {
                    brand = "Audi";
                } else if (brand.equals("volkswagen")) {
                    brand = "Volkswagen";
                } else if (brand.equals("skoda")) {
                    brand = "Skoda";
                } else if (brand.equals("jeep")) {
                    brand = "Jeep";
                } else if (brand.equals("mazda")) {
                    brand = "Mazda";
                } else if (brand.equals("honda")) {
                    brand = "Honda";
                } else if (brand.equals("ford")) {
                    brand = "Ford";
                } else if (brand.equals("volvo")) {
                    brand = "Volvo";
                } else if (brand.equals("mercedes_benz")) {
                    brand = "Mercedes Benz";
                } else if (brand.equals("bmw")) {
                    brand = "BMW";
                } else if (brand.equals("land_rover")) {
                    brand = "Land Rover";
                } else if (brand.equals("porsche")) {
                    brand = "Porsche";
                }

                result += carID + "," + model + "," + brand + "," + price + "," + sellerID + "," + year + ","
                        + mileage + "," + power + "," + note + "," + fuelCons + "," + registerDate + ";";
            }
            response.getWriter().print(result);

        } else if (request.getParameter("method").equals("getMemberList")) {
            ArrayList<Member> memberList = Database.getMemberList("SELECT * FROM cars.Member");
            String result = "";
            for (int i = 0; i < memberList.size(); i++) {
                Member member = memberList.get(i);
                int MemberID = member.getMemberID();
                String email = member.getEmail();
                String firstName = member.getFirstname();
                String lastName = member.getLastname();
                String phone = member.getPhone_Number();

                result += MemberID + "," + email + "," + firstName + "," + lastName + "," + phone + ";";
            }

            response.getWriter().print(result);

        } else if (request.getParameter("method").equals("deleteCar")) {

            int carID = Integer.parseInt(request.getParameter("carID"));
            String result = Manager.deleteCar(carID);
            response.getWriter().print(result);

        } else if (request.getParameter("method").equals("deleteMember")) {
            //get memberID
            String memberID = request.getParameter("memberID");
            int memberID_int = Integer.parseInt(memberID);
            String result = Manager.deleteMember(memberID_int);

            ArrayList<Member> updataMember = Database.getMemberList("SELECT * FROM cars.Member");
            for (int i = 0; i < updataMember.size(); i++) {
                Member member = updataMember.get(i);
                if (memberID.equals(member.getMemberID())) {
                    System.out.println("delete fail");
                }
            }
            response.getWriter().print(result);

        } else if (request.getParameter("method").equals("updateMember")) {
            String mail = request.getParameter("email");
            String otherName = request.getParameter("otherName");
            String fristName = request.getParameter("lastName");
            String phone = request.getParameter("phone");

            String MemberID = request.getParameter("memberID");
            String result = Manager.updateMember(MemberID, mail, otherName, fristName, phone);
            response.getWriter().write(result);

        } else if (request.getParameter("method").equals("updateCar")) {
            String make = request.getParameter("make");
            String model = request.getParameter("model");
            String price = request.getParameter("price");
            String year = request.getParameter("year");
            String mileage = request.getParameter("mileage");
            String fuelConsumption = request.getParameter("fuelCons");
            String powerType = request.getParameter("powerType");
            String note = request.getParameter("note");

            String carID = request.getParameter("carID");
            String result = Manager.updateCar(carID, make, model, price, year,
                    mileage, fuelConsumption, powerType, note);
            response.getWriter().write(result);
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
