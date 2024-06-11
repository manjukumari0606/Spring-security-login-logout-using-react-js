package com.ex.service;

public class LoginMesage {
    private String message;
    private boolean success;

    public LoginMesage(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    // Getters and setters
    // (You can generate them using your IDE or manually)

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
