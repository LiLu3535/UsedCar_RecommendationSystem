/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;

/**
 *
 * @author LuLi1
 */
public class Visitor {

    public static ArrayList<Car> hardRec(String[] hardCon) {
        String brand = hardCon[0];
        String priceMin = hardCon[1];
        String priceMax = hardCon[2];
        String yearMin = hardCon[3];
        String yearMax = hardCon[4];
        String mileage_atLeast = hardCon[5];
        String powerType = hardCon[6];
        String model = hardCon[7];
        String fuelConsuption_atLeast = hardCon[8];

        String brand_SQL = null;
        String price_SQL = null;
        String year_SQL = null;
        String mileage_SQL = null;
        String powerType_SQL = null;
        String model_SQL = null;
        String fuelConsuption_SQL = null;
        String and_SQL = " AND ";
        String NULL = "null";

        String Sql = "SELECT * FROM cars.Car WHERE ";
        String HalfSql = "";

        if (!brand.equals(NULL)) {
            brand_SQL = "Brand = '" + brand + "'";
        }

        if (!priceMin.equals(NULL) || !priceMax.equals(NULL)) {
            if (!priceMin.equals(NULL)) {
                price_SQL = "Price > " + priceMin;
            }
            if (!priceMax.equals(NULL)) {
                if (!priceMin.equals(NULL)) {
                    price_SQL = price_SQL + and_SQL + "Price < " + priceMax;
                } else {
                    price_SQL = "Price < " + priceMax;
                }
            }
        }

        if (!yearMin.equals(NULL) || !yearMax.equals(NULL)) {
            if (!yearMin.equals(NULL)) {
                year_SQL = "Year > " + yearMin;
            }
            if (!yearMax.equals(NULL)) {
                if (!yearMin.equals(NULL)) {
                    year_SQL = year_SQL + and_SQL + "Year < " + yearMax;
                } else {
                    year_SQL = "Year < " + yearMax;
                }
            }
        }

        if (!mileage_atLeast.equals(NULL)) {
            mileage_SQL = "Mileage > " + mileage_atLeast;
        }

        if (!powerType.equals(NULL)) {
            powerType_SQL = " Power_Type = '" + powerType + "'";
        }

        if (!model.equals(NULL)) {
            model_SQL = " Model = '" + model + "'";
        }

        if (!fuelConsuption_atLeast.equals(NULL)) {
            fuelConsuption_SQL = " Fuel_Consumption > " + fuelConsuption_atLeast;
        }

        if (brand_SQL != null) {
            if (!HalfSql.equals("")) {
                HalfSql = HalfSql + and_SQL + brand_SQL;
            }
            if (HalfSql.equals("")) {
                HalfSql = HalfSql + brand_SQL;
            }
        }

        if (price_SQL != null) {
            if (!HalfSql.equals("")) {
                HalfSql = HalfSql + and_SQL + price_SQL;
            }
            if (HalfSql.equals("")) {
                HalfSql = HalfSql + price_SQL;
            }
        }

        if (year_SQL != null) {
            if (!HalfSql.equals("")) {
                HalfSql = HalfSql + and_SQL + year_SQL;
            }
            if (HalfSql.equals("")) {
                HalfSql = HalfSql + year_SQL;
            }
        }

        if (mileage_SQL != null) {
            if (!HalfSql.equals("")) {
                HalfSql = HalfSql + and_SQL + mileage_SQL;
            }
            if (HalfSql.equals("")) {
                HalfSql = HalfSql + mileage_SQL;
            }
        }

        if (powerType_SQL != null) {
            if (!HalfSql.equals("")) {
                HalfSql = HalfSql + and_SQL + powerType_SQL;
            }
            if (HalfSql.equals("")) {
                HalfSql = HalfSql + powerType_SQL;
            }
        }

        if (model_SQL != null) {
            if (!HalfSql.equals("")) {
                HalfSql = HalfSql + and_SQL + model_SQL;
            }
            if (HalfSql.equals("")) {
                HalfSql = HalfSql + model_SQL;
            }
        }

        if (fuelConsuption_SQL != null) {
            if (!HalfSql.equals("")) {
                HalfSql = HalfSql + and_SQL + fuelConsuption_SQL;
            }
            if (HalfSql.equals("")) {
                HalfSql = HalfSql + fuelConsuption_SQL;
            }
        }

        ArrayList<Car> hard_carList = new ArrayList<>();

        if (!HalfSql.equals("")) {
            Sql = Sql + HalfSql;
            System.out.println(Sql);
            hard_carList = Database.getCarList(Sql);
        }

        System.out.println(Sql);

        return hard_carList;
    }

    public static ArrayList<Car> softRec(String[] star, String[] softCon, String[] hardCon) {
        System.out.println("soft");

        int[] w = new int[star.length];
        for (int i = 0; i < star.length; i++) {
            if (star[i] == null) {
                w[i] = 0;
            } else {
                w[i] = Integer.valueOf(star[i]);
            }
        }
        //The total number of the star we get from users.

        DecimalFormat dF = new DecimalFormat("0.00");
        ArrayList<Car> allCars = Database.getCarList("SELECT * FROM cars.Car");
        int totalw = 0;
        for (int k = 0; k < w.length; k++) {
            totalw = totalw + w[k];
        }
        //--------------------------------------------------------

        //Get the car list from hard recommendation.
        ArrayList<Car> carfromHard = new ArrayList<>();
        carfromHard = hardRec(hardCon);

        int length = 0;
        //Get the number of car in the database
        int maxID = Integer.valueOf(Database.getSingleData_SQL("SELECT MAX(Car_ID) FROM cars.Car"));

        //Initialize a array to save the id and the score of every car.
        float[][] candidate = new float[maxID][2];

        if (totalw == 0) {
            return carfromHard;
        }

        float max_fuel = Float.valueOf(Database.getSingleData_SQL("SELECT MAX(Fuel_Consumption) FROM cars.Car"));
        float min_fuelCons = Float.valueOf(Database.getSingleData_SQL("SELECT MIN(Fuel_Consumption) FROM cars.Car"));
        float max_price = Float.valueOf(Database.getSingleData_SQL("SELECT MAX(Price) FROM cars.Car"));
        float min_price = Float.valueOf(Database.getSingleData_SQL("SELECT MIN(Price) FROM cars.Car"));
        float max_year = Float.valueOf(Database.getSingleData_SQL("SELECT MAX(Year) FROM cars.Car"));
        float min_year = Float.valueOf(Database.getSingleData_SQL("SELECT MIN(Year) FROM cars.Car"));
        float max_mile = Float.valueOf(Database.getSingleData_SQL("SELECT MAX(Mileage) FROM cars.Car"));
        float min_mile = Float.valueOf(Database.getSingleData_SQL("SELECT MIN(Mileage) FROM cars.Car"));
        for (int m = 0; m < allCars.size(); m++) {
            int id = allCars.get(m).getcarID();
            Car car = allCars.get(m);
            if (car != null && car.getbuyerID() == 0) {
                float score = 0;
                float score1 = 0;
                if (carfromHard != null) {
                    for (int i = 0; i < carfromHard.size(); i++) {
                        if (carfromHard.get(i).getcarID() == id) {
                            score1 += 1;
                        }
                    }
                    if (score1 == 0) {                                          //score1==0代表着这辆车不在硬搜中,意味着不应该出现在软搜结果中
                        score1 = 1000;
                    }
                }
                //Get one car from database.

                //brand and model
                if (!softCon[0].equalsIgnoreCase("NULL")) {
                    float weight1 = Float.valueOf(dF.format((float) w[0] / totalw));

                    String[] lowerLevel = {"volkswagen", "skoda", "jeep", "mazda"};
                    String[] middleLevel = {"audi", "honda", "ford", "volvo"};
                    String[] higherLevel = {"mercedes_benz", "bmw", "landrover", "porsche"};

                    float distance1 = 0;
                    if (Arrays.asList(lowerLevel).contains(car.getbrand())) {
                        if (Arrays.asList(lowerLevel).contains(softCon[0])) {
                            distance1 = (float) 0.3;
                            for (int i = 0; i < lowerLevel.length; i++) {
                                if (lowerLevel[i].equalsIgnoreCase(softCon[0])) {
                                    distance1 = (float) (distance1 + 0.03);
                                } else {
                                    distance1 = (float) (distance1 + 0.07);
                                }
                            }
                        } else {
                            distance1 = (float) 0.7;
                        }
                    } else if (Arrays.asList(middleLevel).contains(car.getbrand())) {
                        if (Arrays.asList(middleLevel).contains(softCon[0])) {
                            distance1 = (float) 0.3;
                            for (int i = 0; i < middleLevel.length; i++) {
                                if (middleLevel[i].equalsIgnoreCase(softCon[0])) {
                                    distance1 = (float) (distance1 + 0.03);
                                } else {
                                    distance1 = (float) (distance1 + 0.07);
                                }
                            }
                        } else {
                            distance1 = (float) 0.7;
                        }
                    } else {
                        if (Arrays.asList(higherLevel).contains(softCon[0])) {
                            distance1 = (float) 0.3;
                            for (int i = 0; i < higherLevel.length; i++) {
                                if (higherLevel[i].equalsIgnoreCase(softCon[0])) {
                                    distance1 = (float) (distance1 + 0.03);
                                } else {
                                    distance1 = (float) (distance1 + 0.07);
                                }
                            }
                        } else {
                            distance1 = (float) 0.7;
                        }
                    }
                    score = score + weight1 * distance1 * 1000000;
                    //model
                    if (!softCon[4].equalsIgnoreCase("NULL")) {
                        float weight5 = Float.valueOf(dF.format((float) w[4] / totalw));
                        if (!softCon[4].equalsIgnoreCase(car.getmodel())) {
                            score = score + weight5 * 1 * 1000000;
                        }
                    }
                }

                //price
                if (!softCon[1].equalsIgnoreCase("NULL")) {
                    float weight2 = Float.valueOf(dF.format((float) w[1] / totalw));
                    float distance2 = Math.abs((car.getprice() - Float.parseFloat(softCon[1])) / (max_price - min_price));
                    score = score + weight2 * distance2 * 1000000;
                }

                //year
                if (!softCon[2].equalsIgnoreCase("NULL")) {
                    float weight3 = Float.valueOf(dF.format((float) w[2] / totalw));
                    float distance3 = 0;
                    if (Integer.valueOf(softCon[2]) <= car.getyear()) {
                        distance3 = (float) ((Math.abs((car.getyear() - Float.valueOf(softCon[2])) / (max_year - min_year))) * 0.25);
                    } else {
                        distance3 = (float) ((Math.abs((car.getyear() - Float.valueOf(softCon[2])) / (max_year - min_year))) * 0.75);
                    }
                    score = score + weight3 * distance3 * 1000000;
                }

                //milage
                if (!softCon[3].equalsIgnoreCase("NULL")) {
                    float weight4 = Float.valueOf(dF.format((float) w[3] / totalw));
                    float distance4 = Math.abs((car.getmileage() - Float.parseFloat(softCon[3])) / (max_mile - min_mile));
                    score = score + weight4 * distance4 * 1000000;
                }

                //fuelConsuption
                if (!softCon[5].equalsIgnoreCase("NULL")) {
                    float weight6 = Float.valueOf(dF.format((float) w[5] / totalw));
                    float distance6 = Math.abs((car.getfuelCons() - Float.parseFloat(softCon[5])) / (max_fuel - min_fuelCons));
                    score = score + weight6 * distance6 * 1000000;

                }

                candidate[length][0] = id;
                candidate[length][1] = score + score1;
                length++;

            }
        }

        ArrayList<Car> soft_carList = new ArrayList<Car>();
        for (int i = 0; i < 50; i++) {
            float largest = candidate[0][1];
            int IDindex = 0;
            for (int k = 0; k < length; k++) {      //find min car id of which car's distance is min currently
                if (largest > candidate[k][1]) {
                    largest = candidate[k][1];
                    IDindex = k;

                }
            }
            for (int idx = 0; idx < allCars.size(); idx++) {
                if (allCars.get(idx).getcarID() == candidate[IDindex][0]) {
                    Car car = allCars.get(idx);
                    soft_carList.add(car);
                }

            }

            candidate[IDindex][1] = Float.MAX_VALUE;
        }
        return soft_carList;
    }
}
