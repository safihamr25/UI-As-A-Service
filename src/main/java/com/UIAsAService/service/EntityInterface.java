package com.UIAsAService.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.UIAsAService.model.EntityRecord;

@Service
public interface EntityInterface {
	
	public List<EntityRecord> getAllData(String entityName);
	
	
	public EntityRecord addRecord(EntityRecord entityRecord);
	
	public void deleteRecord(String id);

}
