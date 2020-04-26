/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author snowyfire
 */
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Time;
import java.util.Date;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Database {

    public static Statement stmt;

    public static void databaseStart() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            System.out.println("Success loading Mysql Driver!");
        } catch (Exception e) {
            System.out.print("Error loading Mysql Driver!");
            e.printStackTrace();
        }

        try {
            System.out.println("start connecting");
            Connection connect = DriverManager.getConnection(
                    "jdbc:mysql://193.112.252.81:3306/cars?useUnicode=true&characterEncoding=utf-8&useSSL=false", "root", "123456");
            //URL Connection is:   jdbc:mysql// server address/ database name ，last two parameters are username and password of mysql database. 
            System.out.println("Success connect Mysql server!");  // 193.112.252.81:3306
            stmt = connect.createStatement();

        } catch (Exception e) {
            System.out.print("get data error!");
            e.printStackTrace();
        }

        //pageViewUpdate(12);
        //setLogin("23",false);
        //getPassword("23");
        //getSingleData("select Upload_Time from cars.Car where Car_ID = 1");
        /*int[] w={1,5,2,2,2,3};
        String[] softCon={"null","20000","null","null","null","null"};
        String[] hardCon={"null","18501","null","null","null","null","null","null","null"};
         ArrayList<Car> a = new ArrayList();
             a =  Visitor.softRec(w,  softCon, hardCon);
             //a =  Visitor.hardRec1(hardCon);
             //a =  getCarList("select * from cars.Car where Brand ='jeep'");
             for(int i=0;i<50;i++){
                 System.out.println(a.get(i).getprice());
             }*/
    }

    public static ArrayList getMemberList(String MysqlOrder) {
        ArrayList MemberList = new ArrayList();
        try {
            ResultSet rs = stmt.executeQuery(MysqlOrder);
            while (rs.next()) {
                int MemberID = rs.getInt("Member_ID");
                String Email = rs.getString("Email");
                String Password = rs.getString("Password");
                String Firstname = rs.getString("Firstname");
                String Lastname = rs.getString("Lastname");
                String Phone_Number = rs.getString("Phone_Number");
                boolean Status = rs.getBoolean("Status");
                int DreamCarID = rs.getInt("DreamCar_ID");
                String ViewHistory = rs.getString("ViewHistory");

                Member modelmember = new Member(MemberID, Email, Password, Firstname, Lastname, Phone_Number, Status, DreamCarID, ViewHistory);
                MemberList.add(modelmember);
            }
            return MemberList;
        } catch (SQLException e) {
            System.out.print("get data error!");
            e.printStackTrace();
        }
        return null;
    }

    public static ArrayList getCarList(String MysqlOrder) {
        ArrayList CarList = new ArrayList();
        try {
            ResultSet rs = stmt.executeQuery(MysqlOrder);
            while (rs.next()) {

                int carID = rs.getInt("Car_ID");
                String brand = rs.getString("Brand");
                int price = rs.getInt("Price");
                int sellerID = rs.getInt("Seller_ID");
                int buyerID = rs.getInt("Buyer_ID");
                int year = rs.getInt("Year");
                int mileage = rs.getInt("Mileage");
                String powerType = rs.getString("Power_Type");
                String model = rs.getString("Model");
                String note = rs.getString("Note");
                Time transTime = rs.getTime("Trans_Time");
                float fuelCons = rs.getFloat("Fuel_Consumption");
                Time uploadTime = rs.getTime("Upload_Time");
                Date registerDate = rs.getDate("Register_Date");

                Car modelcar = new Car(carID, brand, price, sellerID, buyerID, year, mileage, powerType, model,
                        note, transTime, fuelCons, uploadTime, registerDate);
                CarList.add(modelcar);
            }
            return CarList;
        } catch (SQLException e) {
            System.out.print("get data error!");
            e.printStackTrace();
        }
        return null;
    }

    public static Car getCar(String MysqlOrder) {
        try {
            Car modelcar;
            ResultSet rs = stmt.executeQuery(MysqlOrder);
            while (rs.next()) {

                int carID = rs.getInt("Car_ID");
                String brand = rs.getString("Brand");
                int price = rs.getInt("Price");
                int sellerID = rs.getInt("Seller_ID");
                int buyerID = rs.getInt("Buyer_ID");
                int year = rs.getInt("Year");
                int mileage = rs.getInt("Mileage");
                String powerType = rs.getString("Power_Type");
                String model = rs.getString("Model");
                String note = rs.getString("Note");
                Time transTime = rs.getTime("Trans_Time");
                float fuelCons = rs.getFloat("Fuel_Consumption");
                Time uploadTime = rs.getTime("Upload_Time");
                Date registerDate = rs.getDate("Register_Date");

                modelcar = new Car(carID, brand, price, sellerID, buyerID, year, mileage, powerType, model,
                        note, transTime, fuelCons, uploadTime, registerDate);
                return modelcar;
            }

        } catch (SQLException e) {
            System.out.print("get data error!");
            e.printStackTrace();
        }

        return null;
    }

    public static String addMember(String memberID, String email, String password, String firstName, String lastName,
            String phone, String status, String dreamCarID, String viewHistory) {
        try {
            String sql = "INSERT INTO cars.Member (Member_ID,Email,Password,Firstname,Lastname,Phone_Number,Status,DreamCar_ID,ViewHistory) VALUES "
                    + "(" + memberID + "+1" + ",'" + email + "','" + password + "','" + firstName + "','" + lastName + "','" + phone + "',0," + dreamCarID + "," + viewHistory + ")";

            stmt.executeUpdate(sql);
            return "true";
        } catch (SQLException ex) {
            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
            return "false";
        }
    }

    public static String addCar(String carID, String brand, String price, String sellerID,
            String buyerID, String age, String mileage, String powerType, String model, String note,
            String transTime, String fuelCons, String updateTime, String registerDate) {
        try {
            String sql = "INSERT INTO cars.Car (Car_ID,Brand,Price,Seller_ID,Buyer_ID,Year,Mileage,Power_Type,Model,Note,Trans_Time,Upload_Time,Register_Date,Fuel_Consumption,Pageview) VALUES "
                    + "(" + carID + "+1"
                    + ",'" + brand
                    + "'," + price
                    + "," + sellerID
                    + "," + buyerID
                    + "," + age
                    + "," + mileage
                    + ",'" + powerType
                    + "','" + model
                    + "','" + note
                    + "'," + transTime
                    + ",'" + updateTime
                    + "','" + registerDate
                    + "','" + fuelCons
                    + "',0)";

            stmt.executeUpdate(sql);
            return "true";
        } catch (SQLException ex) {
            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
            return "false";
        }
    }

    public static void pageViewUpdate(int carID) {
        try {
            stmt.executeUpdate("UPDATE cars.Car SET Pageview = Pageview+1 WHERE Car_ID=" + carID);
        } catch (SQLException ex) {
            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static void execution_SQL(String SQLstatement) {
        try {
            stmt.executeUpdate(SQLstatement);
            System.out.println("status true");
        } catch (SQLException ex) {
            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static String getSingleData_SQL(String MysqlOrder) {
        try {
            ResultSet rs = stmt.executeQuery(MysqlOrder);
            if (rs.next()) {
                return rs.getString(1);
            }
        } catch (SQLException ex) {
            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public static ResultSet getResultSet_SQL(String MysqlOrder) {
        try {
            ResultSet rs = stmt.executeQuery(MysqlOrder);
            return rs;
        } catch (SQLException ex) {
            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public static void addDreamCar(DreamCar dreamcar) {
        try {
            String sql = "insert into cars.DreamCar (DreamCar_ID,Brand,Price,Year,Mileage,Power_Type,Model,Fuel_Consumption) values "
                    + "(" + dreamcar.getdreamCarID()
                    + ",'" + dreamcar.getbrand()
                    + "'," + dreamcar.getprice()
                    + "," + dreamcar.getyear()
                    + "," + dreamcar.getmileage()
                    + ",'" + dreamcar.getpowerType()
                    + "','" + dreamcar.getmodel()
                    + "','" + dreamcar.getfuelCons()
                    + //Upload time\
                    "')";
            stmt.executeUpdate(sql);
            stmt.executeUpdate("UPDATE cars.Member SET DreamCar_ID = " + dreamcar.getdreamCarID() + " WHERE Member_ID = " + dreamcar.getmemberID());
        } catch (SQLException ex) {
            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
