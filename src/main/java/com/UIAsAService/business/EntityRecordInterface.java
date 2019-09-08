package com.UIAsAService.business;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.UIAsAService.model.EntityRecord;

public interface EntityRecordInterface extends MongoRepository<EntityRecord,String> {
	
	@Query("{'entityType' : ?0}")
	 List<EntityRecord> getRecordByEntityName(String entityName);
	
}
