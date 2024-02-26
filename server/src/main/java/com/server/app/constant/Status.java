package com.server.app.constant;

public enum Status {
    SUCCESS(0),
    FAIL(1);

    private final int value;

    Status(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
