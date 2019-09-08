package com.UIAsAService.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.UIAsAService.model.EntityMetaData;

@Service
public interface EntityMetaInterface {
	
	public List<EntityMetaData> getAllData();
	
	public List<EntityMetaData> getDataByEntityName(String entityName);
	
	public EntityMetaData updateEntityMetaData(EntityMetaData entityMetaData);

}
