

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
class Member extends Visitor {
    public Member member;
    
    private int MemberID;
    private String Email;
    private String Password;
    private String Firstname;
    private String Lastname;
    private String Phone_Number;
    private boolean Status;
    private int DreamCarID;
    private String ViewHistory;
    
    public Member(int MemberID,String Email,String Password,String Firstname,String Lastname,String Phone_Number,boolean Status, int DreamCarID, String ViewHistory){
        this.MemberID=MemberID;
        this.Email=Email;
        this.Password=Password;
        this.Firstname=Firstname;
        this.Lastname=Lastname;
        this.Phone_Number=Phone_Number;
        this.Status=Status;
        this.DreamCarID=DreamCarID;
        this.ViewHistory=ViewHistory;
        
    }
    
    public int getMemberID(){
        return MemberID;
    }
    
    public String getEmail(){
        return Email;
    }
    
    public String getPassword(){
        return Password;
    }
    
    public String getFirstname(){
        return Firstname;
    }
    
    public String getLastname(){
        return Lastname;
    }
    
    public String getPhone_Number(){
        return Phone_Number;
    }
    
    public boolean getStatus(){
        return Status;
    }
    
    public int getDreamCarID(){
        return DreamCarID;
    }
    
    public String getViewHistory(){
        return ViewHistory;
    }
    
    public static String getPassword(String Email){
        return Database.getSingleData_SQL("select Password from cars.Member where Email = '"+Email+"'");
    }
    
    public void transHappened(Car car){
            String sql = "UPDATE cars.Car SET Buyer_ID = "+member.getMemberID()+" WHERE Car_ID = '"+car.getcarID()+"'";
            Database.execution_SQL(sql);
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            sql = "UPDATE cars.Car SET Trans_Time = "+df.format(new Date())+" WHERE Car_ID = '"+car.getcarID()+"'";
            Database.execution_SQL(sql);
    }
    
    public void logout(){
        setLoginStatus_Member(member.getEmail(), "false");
    }
    
    public static String isMember(String Email){
        try {
            String sql = "SELECT * from cars.Member where Email = '"+Email+"'";
            ResultSet rs = Database.getResultSet_SQL(sql);
            if(rs.next()){
                return "true";
            }else{
                return "false";
            }
        } catch (SQLException ex) {
            Logger.getLogger(Member.class.getName()).log(Level.SEVERE, null, ex);
            return "false";
        }
    }
    
    public static String isPasswordMember(String Email, String password){
        
       try {
            String sql = "SELECT * from cars.Member WHERE Email = '"+Email+"'";
            ResultSet rs = Database.getResultSet_SQL(sql);
            while(rs.next()){
                String realPassword = rs.getString("Password");
                if(password.equals(realPassword)){
                    return "true";
                }else{
                    return "false";
                }   
            }
            return "false";
        } catch (SQLException ex) {
            Logger.getLogger(Member.class.getName()).log(Level.SEVERE, null, ex);
            return "false";
        }
    }
    
    public static String setLoginStatus_Member(String Email, String status){
        int statusNum = 0;
        if(status.equalsIgnoreCase("true")){
            statusNum = 1;
        }
        String sql = "UPDATE cars.Member SET Status = "+statusNum+" WHERE Email = '"+Email+"'";
        Database.execution_SQL(sql);
        return "true";
    }
    
    public static String checkEmailDuplication(String Email){
       
        try {
            String sql = "SELECT * from cars.Member where Email = '"+Email+"'";
            ResultSet rs = Database.getResultSet_SQL(sql);
            if(rs.next()){
                return "true";
            }else{
                return "false";
            }
        } catch (SQLException ex) {
            Logger.getLogger(Member.class.getName()).log(Level.SEVERE, null, ex);
            return"true";
        }
    }
}
