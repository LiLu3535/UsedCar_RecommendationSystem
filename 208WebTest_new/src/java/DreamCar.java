
import java.util.Date;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author snowyfire
 */
public class DreamCar {

    private int DreamCarID;
    private int MemberID;
    private String brand;
    private int price;
    private int year;
    private int mileage;
    private String powerType;
    private String model;
    private float fuelCons;

    public DreamCar(int DreamCarID, int MemberID, String brand, int price, int year, int mileage, String powerType,
            String model, float fuelCons) {
        this.DreamCarID = DreamCarID;
        this.MemberID = MemberID;
        this.brand = brand;
        this.price = price;
        this.year = year;
        this.mileage = mileage;
        this.powerType = powerType;
        this.model = model;
        this.fuelCons = fuelCons;
    }

    public int getdreamCarID() {
        return DreamCarID;
    }

    public int getmemberID() {
        return MemberID;
    }

    public String getbrand() {
        return brand;
    }

    public int getprice() {
        return price;
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

    public float getfuelCons() {
        return fuelCons;
    }
}
