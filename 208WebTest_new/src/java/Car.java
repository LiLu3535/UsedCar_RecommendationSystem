/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.sql.Time;
import java.util.Date;

/**
 *
 * @author LuLi1
 */
class Car {

    public Car car;

    private int carID;
    private String brand;
    private int price;
    private int sellerID;
    private int buyerID;
    private int year;
    private int mileage;
    private String powerType;
    private String model;
    private String note;
    private Time transTime;
    private float fuelCons;
    private Time updateTime;
    private Date registerDate;

    public Car(int carID, String brand, int price, int sellerID, int buyerID, int year, int mileage, String powerType,
            String model, String note, Time transTime, float fuelCons, Time updateTime, Date registerDate) {
        this.carID = carID;
        this.brand = brand;
        this.price = price;
        this.sellerID = sellerID;
        this.buyerID = buyerID;
        this.year = year;
        this.mileage = mileage;
        this.powerType = powerType;
        this.model = model;
        this.note = note;
        this.transTime = transTime;
        this.fuelCons = fuelCons;
        this.updateTime = updateTime;
        this.registerDate = registerDate;
    }

    public int getcarID() {
        return carID;
    }

    public String getbrand() {
        return brand;
    }

    public int getprice() {
        return price;
    }

    public int getsellerID() {
        return sellerID;
    }

    public int getbuyerID() {
        return buyerID;
    }

    public int getyear() {
        return year;
    }

    public int getmileage() {
        return mileage;
    }

    public String getpowerType() {
        return powerType;
    }

    public String getmodel() {
        return model;
    }

    public String getnote() {
        return note;
    }

    public Time gettransTime() {
        return transTime;
    }

    public float getfuelCons() {
        return fuelCons;
    }

    public Date getregisterDate() {
        return registerDate;
    }

    public Time getupdateTime() {
        return updateTime;
    }
}
