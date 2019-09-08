package com.UIAsAService.business;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.UIAsAService.model.EntityMetaData;
import com.UIAsAService.model.EntityRecord;
import com.UIAsAService.service.EntityInterface;

@Component
public class EntityRecordImpl implements EntityInterface{

private EntityRecordInterface repository;
	
	@Autowired
	public EntityRecordImpl(EntityRecordInterface repository) {
		super();
		this.repository = repository;
	}
	
	public List<EntityRecord> getAllData(String entityName) {
//		System.out.println(repository.getRecordByEntityName(entityName).toString());
		return repository.getRecordByEntityName(entityName);
	}
	
	public EntityRecord addRecord(EntityRecord entityRecord) {
		return repository.save(entityRecord);
	}
	
	public void deleteRecord(String id) {
		System.out.println("Deleteing Record of id "+id);
		repository.deleteById(id);
	}
}
