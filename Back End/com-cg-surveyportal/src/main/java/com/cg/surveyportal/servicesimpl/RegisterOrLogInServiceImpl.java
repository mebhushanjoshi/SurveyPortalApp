package com.cg.surveyportal.servicesimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cg.surveyportal.entities.RegisterOrLogIn;
import com.cg.surveyportal.entities.UserRoles;
import com.cg.surveyportal.repositories.IRegisterOrLogInRepository;
import com.cg.surveyportal.services.IRegisterOrLogInService;

@Service
public class RegisterOrLogInServiceImpl implements IRegisterOrLogInService {

	@Autowired
	IRegisterOrLogInRepository registerOrLogInRepository;
	
	@SuppressWarnings("null")
	@Override
//	public String register(String userName, String password, String role) {
	public String register(RegisterOrLogIn myUser){
//		RegisterOrLogIn user = registerOrLogInRepository.findById(userName).get();
//		if(user == null)
//		{
//			user.setUserName(userName);
//			user.setPassword(password);
//			
//			if(role.equalsIgnoreCase("surveyor"))
//				user.setRole(UserRoles.SURVEYOR);
//			else if(role.equalsIgnoreCase("participants"))
//				user.setRole(UserRoles.PARTICIPANTS);
//			else
//				return "Invalid role";
//	
//			registerOrLogInRepository.save(user);
//			return "Registration successful";
//		}
//		else
//			return "User aleady exists.";
			
//		RegisterOrLogIn user = new RegisterOrLogIn();
//		user.setUserName(myUser.getUserName());
//		user.setPassword(myUser.getPassword());
//		if(myUser.getRole().toString().equalsIgnoreCase("surveyor"))
//			user.setRole(UserRoles.SURVEYOR);
//		else if(myUser.getRole().toString().equalsIgnoreCase("participant"))
//			user.setRole(UserRoles.PARTICIPANT);
//		else
//			return "Invalid role";
//		
//		registerOrLogInRepository.save(user);
//		
//		return "Registration successful";	
//	}
		
		
//		RegisterOrLogIn user = new RegisterOrLogIn();
//		user.setUserName(userName);
//		user.setPassword(password);
//		if(role.toString().equalsIgnoreCase("surveyor"))
//			user.setRole(UserRoles.SURVEYOR);
//		else if(role.toString().equalsIgnoreCase("participant"))
//			user.setRole(UserRoles.PARTICIPANT);
//		else
//			return "Invalid role";
//		
		registerOrLogInRepository.save(myUser);
		return "Sucesses";
		
//		return "Registration successful";	
	}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		

	@Override
	public String logIn(String userName, String password) {
		RegisterOrLogIn user = registerOrLogInRepository.findById(userName).get();
//		if(user==null)
//			return "Unregistred user.";
		if(password.equals(user.getPassword()))
			return "Log in successfully as a "+user.getRole()+".";
		else
			return "Log in fialed as usename or password did not match.";
	}

}
