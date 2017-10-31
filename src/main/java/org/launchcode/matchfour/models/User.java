package org.launchcode.matchfour.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class User {

    @Id
    @GeneratedValue
    private int id;

    @NotNull
    @Size(min=3, max=15,  message = "Please enter a username with at least 3 characters")
    private String name;

    @NotNull
    @Size(min=8,  message = "Please enter a password with at least 8 characters")
    private String password;

    private double bestTime;

    public User() {}

    public User(String name) {
        this();
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public double getBestTime() {
        return bestTime;
    }

    public void setBestTime(double bestTime) {
        this.bestTime = bestTime;
    }

    public int getId() {
        return id;
    }

}

