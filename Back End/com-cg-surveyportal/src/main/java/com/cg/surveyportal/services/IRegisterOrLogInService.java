package com.cg.surveyportal.services;

import com.cg.surveyportal.entities.RegisterOrLogIn;

public interface IRegisterOrLogInService {

//	String register(String userName, String password, String role);
	String logIn(String userName, String password);
	public String register(RegisterOrLogIn myUser);
}
