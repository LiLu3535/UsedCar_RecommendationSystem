/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import static java.lang.Integer.parseInt;
import java.util.ArrayList;

/**
 *
 * @author ASUS
 */
public class Frontpage {

    public static ArrayList<Car> getCarByView() {
        ArrayList<Car> car = new ArrayList<>();
        car = Database.getCarList("SELECT * FROM cars.Car ORDER BY Pageview DESC");
        return car;
    }

    public static Car getCarById(int id) {
        Car car = null;
        car = Database.getCar("SELECT * FROM cars.Car WHERE Car_ID = " + String.valueOf(id));
        return car;
    }

    public static int getDreamCarID() {
        int id;

        id = Integer.valueOf(Database.getSingleData_SQL("SELECT MAX(DreamCar_ID) FROM cars.DreamCar"));
        return id + 1;

    }

    public static DreamCar cclDreamCar(int memberID) {
        System.out.println("ccldreamcar");
        String id = Database.getSingleData_SQL("SELECT ViewHistory FROM cars.Member WHERE Member_ID = " + memberID);
        if (id == null) {
            return null;
        }
        String[] ids = id.split("-");
        for (int i = 0; i < ids.length; i++) {
            System.out.println(ids[i]);
            System.out.println("i(ids):" + i);
        }

        ArrayList<Car> historyCar = new ArrayList<>();
        int[] count = new int[50];
        for (int i = 0; i < ids.length; i++) {
            if (ids[i] != null) {
                if (getCarById(parseInt(ids[i])) != null) {
                    historyCar.add(getCarById(parseInt(ids[i])));
                }
                System.out.println("carID:" + parseInt(ids[i]));
            }
            System.out.println("i=" + i + " ids=" + ids[i]);
        }

        for (int i = 0; i < ids.length; i++) {
            count[i] = 1;
        }
        System.out.println("historysize:" + historyCar.size());
        System.out.println("idslength:" + ids.length);
        for (int i = 0; i < historyCar.size(); i++) {
            System.out.println("history=" + historyCar.get(i).getcarID());
        }

        for (int i = 0; i < historyCar.size(); i++) {
            for (int j = i - 1; j >= 0; j--) {
                if (historyCar.get(j).getbrand().equals(historyCar.get(i).getbrand())) {
                    count[i] = count[j] + 1;
                    System.out.println("i=" + i + " j=" + j);
                    break;
                }
            }
        }

        int max1 = 0, max2 = 0, flag1 = -1, flag2 = -1;
        for (int i = 0; i < historyCar.size(); i++) {
            if (count[i] == 0) {
                break;
            }
            if (count[i] >= max1) {
                max1 = count[i];
                flag1 = i;
            }
        }
        for (int i = 0; i < historyCar.size(); i++) {
            if (count[i] == 0) {
                break;
            }
            if (count[i] >= max2 && i != flag1 && !historyCar.get(i).getbrand().equals(historyCar.get(flag1).getbrand())) {
                max2 = count[i];
                flag2 = i;
            }
        }
        String brand1 = "", brand2 = "", brand = "";
        if (flag1 != -1) {
            brand1 = historyCar.get(flag1).getbrand();
        }
        if (flag2 != -1) {
            brand2 = historyCar.get(flag2).getbrand();
        }
        if (!brand1.equals("") && !brand2.equals("")) {
            brand = brand1 + "," + max1 + ";" + brand2 + "," + max2;
        } else if (!brand1.equals("") && brand2.equals("")) {
            brand = brand1 + "," + String.valueOf(max1);
        }
        int price = 0, year = 0, mileage = 0;
        for (int i = 0; i < historyCar.size(); i++) {
            price += historyCar.get(i).getprice();
            year += historyCar.get(i).getyear();
            mileage += historyCar.get(i).getmileage();
        }
        price = price / (historyCar.size());
        year = year / (historyCar.size());
        mileage = mileage / (historyCar.size());
        //powerType
        for (int i = 0; i < historyCar.size(); i++) {
            count[i] = 1;
        }

        for (int i = 0; i < historyCar.size(); i++) {
            for (int j = i - 1; j >= 0; j--) {
                if (historyCar.get(j).getpowerType().equals(historyCar.get(i).getpowerType())) {
                    count[i] = count[j] + 1;
                }
                break;
            }
        }
        int max = 0, flag = -1;
        for (int i = 0; i < historyCar.size(); i++) {
            if (count[i] >= max) {
                max = count[i];
            }
            flag = i;
        }
        String powerType;
        powerType = historyCar.get(flag).getpowerType();
        //model
        for (int i = 0; i < historyCar.size(); i++) {
            count[i] = 1;
        }

        for (int i = 0; i < historyCar.size(); i++) {
            for (int j = i - 1; j >= 0; j--) {
                if (historyCar.get(j).getmodel().equals(historyCar.get(i).getmodel())) {
                    count[i] = count[j] + 1;
                }
                break;
            }
        }
        max = 0;
        flag = -1;
        for (int i = 0; i < historyCar.size(); i++) {
            if (count[i] >= max) {
                max = count[i];
            }
            flag = i;
        }
        String model;
        model = historyCar.get(flag).getmodel();
        //fuelCons
        for (int i = 0; i < historyCar.size(); i++) {
            count[i] = 1;
        }

        for (int i = 0; i < historyCar.size(); i++) {
            for (int j = i - 1; j >= 0; j--) {
                if (historyCar.get(j).getfuelCons() == (historyCar.get(i).getfuelCons()));
                count[i] = count[j] + 1;
                break;
            }
        }
        max = 0;
        flag = -1;
        for (int i = 0; i < historyCar.size(); i++) {
            if (count[i] >= max) {
                max = count[i];
            }
            flag = i;
        }
        float fuelCons;
        fuelCons = historyCar.get(flag).getfuelCons();

        DreamCar dream_car = new DreamCar(getDreamCarID(), memberID, brand, price, year, mileage, powerType, model, fuelCons);
        System.out.println("carID=" + getDreamCarID() + " " + memberID + " " + brand + " " + price + " " + year + " " + mileage + " " + powerType + " " + model + " " + fuelCons);
        Database.addDreamCar(dream_car);
        return dream_car;
    }

    public static ArrayList<Car> front_page(int memberID) {
        System.out.println("frontpage");
        DreamCar dream_car = cclDreamCar(memberID);

        if (dream_car == null) {
            ArrayList<Car> car = new ArrayList<>();
            car = getCarByView();
            return car;
        } else {

            String[] brands = null, brands_left = null, brands_right = null;
            brands = dream_car.getbrand().split(";");
            int length = brands.length;
            if (length == 2) {
                brands_left = brands[0].split(",");
                brands_right = brands[1].split(",");
            } else if (length == 1) {
                brands_left = brands[0].split(",");
            }
            String brand1 = "", brand2 = "";
            int max1 = 0, max2 = 0;
            if (brands_left != null) {
                brand1 = brands_left[0];
                max1 = parseInt(brands_left[1]);
            }
            if (brands_right != null) {
                brand2 = brands_right[0];
                max2 = parseInt(brands_right[1]);
            }

            ArrayList<Car> car_click = new ArrayList<>();
            car_click = getCarByView();
            ArrayList<Car> car_rec = new ArrayList<>();
            ArrayList<Car> car_rec1 = new ArrayList<>();

            String[] softCon = new String[6];
            softCon[0] = brand1;
            softCon[1] = String.valueOf(dream_car.getprice());
            softCon[2] = String.valueOf(dream_car.getyear());
            softCon[3] = String.valueOf(dream_car.getmileage());
            softCon[4] = dream_car.getmodel();
            softCon[5] = String.valueOf(dream_car.getfuelCons());
            String[] star = {"5", "5", "5", "5", "5", "5"};
            String[] hardCon = {"null", "null", "null", "null", "null", "null", "null", "null", "null"};

            ArrayList<Car> car_rec2 = new ArrayList<>();
            if (!brand2.equals("")) {
                softCon[0] = brand2;
                car_rec2 = Visitor.softRec(star, softCon, hardCon);
            }

            softCon[0] = brand1;
            car_rec1 = Visitor.softRec(star, softCon, hardCon);

            int p, q;
            Car index;

            int rec1_index = 0, rec2_index = 0;
            {
                for (p = 1; p <= 30 * max1 / (max1 + max2); p++) {
                    if (rec1_index < car_rec1.size()) {
                        index = car_rec1.get(rec1_index);
                        rec1_index++;
                        if (!car_rec.contains(index)) {
                            car_rec.add(index);
                        } else {
                            p--;
                        }
                    }
                }
                for (q = 1; q <= 30 - p + 1; q++) {
                    if (rec2_index < car_rec2.size()) {
                        index = car_rec2.get(rec2_index);
                        rec2_index++;
                        if (!car_rec.contains(index)) {
                            car_rec.add(index);
                        } else {
                            q--;
                        }
                    }
                }
            }

            ArrayList<Car> carList = new ArrayList<>();
            int i, j;
            Car cur_car;
            int rec_index = 0, click_index = 0;
            {
                for (i = 1; i <= 30; i++) {
                    if (rec_index < car_rec.size()) {
                        cur_car = car_rec.get(rec_index);
                        rec_index++;
                        if (!carList.contains(cur_car)) {
                            carList.add(cur_car);
                        } else {
                            i--;
                        }
                    }
                }

                for (j = 1; j <= 20; j++) {
                    if (click_index < car_click.size()) {
                        cur_car = car_click.get(click_index);
                        click_index++;
                        if (!carList.contains(cur_car)) {
                            carList.add(cur_car);
                        } else {
                            j--;
                        }
                    }
                }
            }

            return carList;
        }

    }

}
