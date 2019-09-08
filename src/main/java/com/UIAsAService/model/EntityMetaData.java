package com.UIAsAService.model;

import java.util.List;
import java.util.HashMap;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;


public class EntityMetaData {

	private String entityName;
	private String id;
	
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	private List<Field> Field;
	
	public EntityMetaData() {
		super();
	}
	
	public EntityMetaData(String entityName, List<Field> fields,String id) {
		super();
		this.id = id;
		this.entityName = entityName;
		this.Field = fields;
	}

	public String getEntityName() {
		return entityName;
	}
	public void setEntityName(String entityName) {
		this.entityName = entityName;
	}

	public List<Field> getField() {
		return Field;
	}

	public void setField(List<Field> Field) {
		this.Field = Field;
	}

	@Override
	public String toString() {
		return String.format("Entity [name=%s] Fields: %s", entityName, Field);
	}
}
