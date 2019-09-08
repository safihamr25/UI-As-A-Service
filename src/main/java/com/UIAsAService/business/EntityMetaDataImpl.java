package com.UIAsAService.business;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.UIAsAService.model.EntityMetaData;
import com.UIAsAService.service.EntityMetaInterface;


@Component
public class EntityMetaDataImpl implements  EntityMetaInterface{

	private EntityMetaDataInterface repository;
	
	@Autowired
	public EntityMetaDataImpl(EntityMetaDataInterface repository) {
		super();
		this.repository = repository;
	}
	
	public List<EntityMetaData> getAllData() {
		return repository.findAll();
	}
	
	public List<EntityMetaData> getDataByEntityName(String entityName){
		return repository.getDataByEntityName(entityName);
	}
	
	public EntityMetaData updateEntityMetaData(EntityMetaData entityMetaData) {
		return repository.save(entityMetaData);
	}
	
}

