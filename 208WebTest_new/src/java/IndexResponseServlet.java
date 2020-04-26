
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

/**
 * @author 201448412
 */
public class IndexResponseServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ArrayList<Car> cars;
        if (request.getParameter("method").equals("getCar_list")) {
            String email = request.getParameter("email");
            ArrayList<Member> mem_list = Database.getMemberList("SELECT * FROM cars.Member WHERE Email = '" + email + "'");
            if (email.equals("") || mem_list.isEmpty()) {
                cars = Frontpage.getCarByView();
            } else {

                Member member = mem_list.get(0);
                int id = member.getMemberID();
                cars = Frontpage.front_page(id);
            }
            String result = "";
            for (int i = 0; i < cars.size(); i++) {
                Car car = cars.get(i);

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

                result += carID + "," + model + "," + brand + "," + price + "," + sellerID + "," + year + ","
                        + mileage + "," + power + "," + note + "," + fuelCons + "," + registerDate + ";";

            }
            response.getWriter().print(result);
        } else if (request.getParameter("method").equals("recResultUpload")) {

            String[] hard = new String[9];

            hard[0] = request.getParameter("hard_make");
            hard[1] = request.getParameter("hard_minPrice");
            hard[2] = request.getParameter("hard_maxPrice");//2
            hard[3] = request.getParameter("hard_minYear");
            hard[4] = request.getParameter("hard_maxYear");//4
            hard[5] = request.getParameter("hard_mileage");
            hard[6] = request.getParameter("hard_power");
            hard[7] = request.getParameter("hard_model");
            hard[8] = request.getParameter("hard_fuelCons");

            if ("Mercedes-Benz".equals(hard[0])) {
                hard[0] = "mercedes_benz";
            }
            if ("Land Rover".equals(hard[0])) {
                hard[0] = "land_rover";
            }

            String[] soft = new String[6];
            soft[0] = request.getParameter("softMake");
            soft[1] = request.getParameter("softPrice");
            soft[2] = request.getParameter("softYear");
            soft[3] = request.getParameter("softMileage");
            soft[4] = request.getParameter("softModel");
            soft[5] = request.getParameter("softFuelConsumption");

            if ("Mercedes-Benz".equals(soft[0])) {
                soft[0] = "mercedes_benz";
            }
            if ("Land Rover".equals(soft[0])) {
                soft[0] = "land_rover";
            }

            String[] star = new String[6];
            star[0] = request.getParameter("star1");
            star[1] = request.getParameter("star2");
            star[2] = request.getParameter("star3");
            star[3] = request.getParameter("star4");
            star[4] = request.getParameter("star5");
            star[5] = request.getParameter("star6");

            ArrayList<Car> recResult = Visitor.softRec(star, soft, hard);

            String result = "";
            for (int i = 0; i < recResult.size(); i++) {
                Car car = recResult.get(i);
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

                result += carID + "," + model + "," + brand + "," + price + "," + sellerID + "," + year + ","
                        + mileage + "," + power + "," + note + "," + fuelCons + "," + registerDate + ";";
            }

            response.getWriter().print(result);
        }

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
