package com.cg.surveyportal.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cg.surveyportal.configs.JwtUtil;
import com.cg.surveyportal.entities.AppUser;
import com.cg.surveyportal.entities.JwtResponse;
import com.cg.surveyportal.entities.RegisterOrLogIn;
import com.cg.surveyportal.entities.Topic;
import com.cg.surveyportal.exceptions.SurveyorNotFoundException;
import com.cg.surveyportal.services.IRegisterOrLogInService;
import com.cg.surveyportal.servicesimpl.UserService;



//@CrossOrigin(origins = "http://localhost:4201")

@RestController
@CrossOrigin
public class UserController {

	private final Logger log = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
	private UserService userDetailsService;

	// test method, delete afterwards

	//@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/hello")
	public String hello() {
		log.info("hello");
		return "Hello";
	}

	@PostMapping("/register")
	private void registerUser(@RequestBody RegisterOrLogIn myUser)
	{
		registerOrLogInService.register(myUser);
	}
	
	@PostMapping("/login") // 1
//	public String login(@RequestBody RegisterOrLogIn myUser) {
	public ResponseEntity<?> login(@RequestBody RegisterOrLogIn myUser)  {
		log.info("login");
		String uname = myUser.getUserName();
		String pw = myUser.getPassword();
		System.out.println(uname+"/"+pw);
		if (myUser.getUserName().equals(userDetailsService.loadUserByUsername(myUser.getUserName()).getUsername())
				&& myUser.getPassword().equals(userDetailsService.loadUserByUsername(myUser.getUserName()).getPassword())) {
			log.info("user authenticated");
			//return jwtTokenUtil.generateToken(userDetailsService.loadUserByUsername(myUser.getUserName()));
			//return new ResponseEntity<String>(jwtTokenUtil.generateToken(userDetailsService.loadUserByUsername(myUser.getUserName())), HttpStatus.OK);
			String token =jwtTokenUtil.generateToken(userDetailsService.loadUserByUsername(myUser.getUserName()));
			return ResponseEntity.ok(new JwtResponse(token));
		} else {
			//return "thisIsNotTheValidToken";
			String token ="thisIsNotTheValidToken";
			return ResponseEntity.ok(new JwtResponse(token));
		}

	}
	
	/*****************************************************************************************************************************/
	@Autowired
	IRegisterOrLogInService registerOrLogInService;
	
//	@PostMapping("/register/{userName}/{password}/{role}")
//	private String registerUser(@PathVariable("userName") String userName, @PathVariable("password") String password, @PathVariable("role") String role)
//	{
//		return registerOrLogInService.register(userName, password, role);
//	}
//	
//	@GetMapping("/LogIn/{userName}/{password}")
//	private String logIn(@PathVariable("userName") String userName, @PathVariable("password") String password)
//	{
//		//return registerOrLogInService.logIn(userName, password);
//		if (userName.equals(userDetailsService.loadUserByUsername(userName).getUsername())
//				&& password.equals(userDetailsService.loadUserByUsername(userName).getPassword())) {
//			log.info("user authenticated");
//			return jwtTokenUtil.generateToken(userDetailsService.loadUserByUsername(userName));
//		} else {
//			return "thisIsNotTheValidToken";
//		}
//		
//	}
}