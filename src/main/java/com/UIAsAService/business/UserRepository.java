package com.UIAsAService.business;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.UIAsAService.model.EntityMetaData;
import com.UIAsAService.model.Login;

@Transactional
public interface UserRepository extends MongoRepository<Login,Object> {
		
	@Query("{'userid' : ?0, 'password' : ?1}")
	public Login findUser(String userid, String password);

}
