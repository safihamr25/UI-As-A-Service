package com.UIAsAService.business;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.UIAsAService.model.EntityMetaData;


public interface EntityMetaDataInterface extends MongoRepository<EntityMetaData,Object> {
    
	 @Query("{'entityName' : ?0}")
	 public List<EntityMetaData> getDataByEntityName(String entityName);
}