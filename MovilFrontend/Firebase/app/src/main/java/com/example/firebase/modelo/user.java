package com.example.firebase.modelo;

public class user {
    private boolean success;
    private String token,expiresIn;
    private boolean admin;
    public user(boolean success, String token) {
        this.success = success;
        this.token = token;
    }

    public boolean getSucess() {
        return success;
    }

    public boolean getAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public String getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(String expiresIn) {
        this.expiresIn = expiresIn;
    }

    public void setSucess(boolean sucess) {
        this.success = sucess;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
