package com.techverge.server.exceptions;

public class EntityNotFoundException extends RuntimeException{
    public EntityNotFoundException(String errorMessage){
        super(errorMessage);
    }
    public EntityNotFoundException(){
        super();
    }
}
