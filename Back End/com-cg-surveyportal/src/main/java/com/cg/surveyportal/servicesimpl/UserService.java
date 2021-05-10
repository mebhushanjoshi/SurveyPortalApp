package com.cg.surveyportal.servicesimpl;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cg.surveyportal.entities.RegisterOrLogIn;
import com.cg.surveyportal.repositories.IRegisterOrLogInRepository;

@Service
public class UserService implements UserDetailsService {

	private final static Logger log = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	private IRegisterOrLogInRepository registerOrLogInRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info("loadUserByUsername");
		System.out.println("My print"+username);
	    RegisterOrLogIn user = this.registerOrLogInRepository.findByUserName(username); //"MonsWill"
	  
	    
	    if(user == null )
	    	throw new UsernameNotFoundException("User not Found");
		return new CustomUserDetials(user);
	}

//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		log.info("loadUserByUsername");
//		return new User("user@deloitte.com", "password", new ArrayList<>());
//	}
}