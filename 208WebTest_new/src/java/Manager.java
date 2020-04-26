
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.logging.Level;
import java.util.logging.Logger;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author snowyfire
 */
public class Manager extends Visitor{
    public Manager manager;
    
    private int ManagerID;
    private String Email;
    private String Password;
    private boolean Status;
    
    public Manager(int ManagerID,String Email,String Password,boolean Status){
        this.ManagerID=ManagerID;
        this.Email=Email;
        this.Password=Password;
        this.Status=Status;
        
    }
    
    public int getManagerID(){
        return ManagerID;
    }
    
     public String getEmail(){
        return Email;
    }
    
    public String getPassword(){
        return Password;
    }
    
    public boolean getStatus(){
        return Status;
    }
    
    public void logout(){
        setLoginStatus_Manager(manager.getEmail(), "false");
    }
    
   public static String updateCar(String CarID, String make, String model, String price,String registerDate,
           String mileage, String fuelConsumption, String powerType, String note){
        Calendar date = Calendar.getInstance();
        int curyear = date.get(Calendar.YEAR);
        System.out.println("curr  year  ========" + curyear);
        String registYearStr = registerDate.substring(0,4);
        int registYear = Integer.parseInt(registYearStr);
        System.out.println("regist  year  ========" + registYear);
        int differYear = curyear - registYear;
        System.out.println("year difference ===========" + differYear);
        Database.execution_SQL("UPDATE cars.Car SET Brand = '"+make+"' WHERE Car_ID = "+CarID);
        Database.execution_SQL("UPDATE cars.Car SET Model = '"+model+"' WHERE Car_ID = "+CarID);
        Database.execution_SQL("UPDATE cars.Car SET Price = "+price+" WHERE Car_ID = "+CarID);
        Database.execution_SQL("UPDATE cars.Car SET Year = '"+differYear+"' WHERE Car_ID = "+CarID);
        Database.execution_SQL("UPDATE cars.Car SET Register_Date = '"+registerDate+"' WHERE Car_ID = "+CarID);
        Database.execution_SQL("UPDATE cars.Car SET Mileage = "+mileage+" WHERE Car_ID = "+CarID);
        Database.execution_SQL("UPDATE cars.Car SET Fuel_Consumption = '"+fuelConsumption+"' WHERE Car_ID = "+CarID);
        Database.execution_SQL("UPDATE cars.Car SET Power_Type = '"+powerType+"' WHERE Car_ID = "+CarID);
        Database.execution_SQL("UPDATE cars.Car SET Note = '"+note+"' WHERE Car_ID = "+CarID);
        
        return "true";
    }
    
    public static String deleteCar(int CarID){
        Database.execution_SQL("DELETE FROM cars.Car WHERE Car_ID = "+CarID);
        return "true";
    }
    
    public static String updateMember(String MemberID, String mail, String otherName, String firstName, String phone){
        Database.execution_SQL("UPDATE cars.Member SET Email = '"+mail+"' WHERE Member_ID = "+MemberID);
        Database.execution_SQL("UPDATE cars.Member SET LastName = '"+otherName+"; WHERE Member_ID = "+MemberID);
        Database.execution_SQL("UPDATE cars.Member SET FirstName = '"+firstName+"' WHERE Member_ID = "+MemberID);
        Database.execution_SQL("UPDATE cars.Member SET Phone_Number = '"+phone+"' WHERE Member_ID = "+MemberID);
        return "true";
    }
    
    public static String deleteMember(int MemberID){
        Database.execution_SQL("DELETE FROM cars.Member WHERE Member_ID = "+MemberID);
        return "true";
    }
    
    public void ReturnAllCars(){
        Database.getCarList("SELECT * FROM cars.Car");
    }
    
    public void ReturnAllMembers(){
        Database.getMemberList("SELECT * FROM cars.Member");
    }
    
    public static String isPasswordManager(String Email, String password){
        
       try {
            String sql = "SELECT * from cars.Manager where Email = '"+Email+"'";
            ResultSet rs = Database.getResultSet_SQL(sql);
            while(rs.next()){
                String realPassword = rs.getString("Password");
                if(password.endsWith(realPassword)){
                    return "true";
                }else{
                    return "false";
                }
            }
            return "false";
        } catch (SQLException ex) {
            Logger.getLogger(Database.class.getName()).log(Level.SEVERE, null, ex);
            return "false";
        }
    }
    
    public static String isManager(String Email){
        try {
            String sql = "SELECT * from cars.Manager where Email = '"+Email+"'";
            ResultSet rs = Database.getResultSet_SQL(sql);
            if(rs.next()){
                return "true";
            }else{
                return "false";
            }
        } catch (SQLException ex) {
            Logger.getLogger(Manager.class.getName()).log(Level.SEVERE, null, ex);
            return "false";
        }
    }
    
    public static String setLoginStatus_Manager(String Email, String status){
        int statusNum;
        if(status.equalsIgnoreCase("ture")){
            statusNum = 1;
        }else{
            statusNum = 0;
        }
        String sql = "UPDATE cars.Manager SET Status = "+statusNum+" WHERE email = '"+Email+"'";
        Database.execution_SQL(sql);
        return "true";
    }
}
