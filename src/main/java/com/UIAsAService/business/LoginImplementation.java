package com.UIAsAService.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.UIAsAService.model.EntityMetaData;
import com.UIAsAService.model.Login;
import com.UIAsAService.service.LoginInterface;

@Component
public class LoginImplementation implements LoginInterface{
	
	private UserRepository userrepository;
	
	@Autowired
	public LoginImplementation(UserRepository userrepository) {
		super();
		this.userrepository = userrepository;
	}
	

	@Override
	public Login finduser(Login login) {
		
		
		return userrepository.findUser(login.getUserid(),login.getPassword());
	}
	
	
}
