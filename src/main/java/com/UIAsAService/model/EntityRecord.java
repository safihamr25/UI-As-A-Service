package com.UIAsAService.model;

import java.util.Date;
import java.util.Map;

import org.springframework.data.annotation.Id;

public class EntityRecord {
	
	private String id;
	private String entityType;
	private int version;
	private String makerID;
	private String makerdt;
	private String checkerID;
	private String checkerdt;
	private Map<String,String> jsonDocument;
	
	
	public EntityRecord() {
		super();
	}

	public EntityRecord(String id,String entityType, int version, String makerID, String makerDate, String checkerID,
			String checkerDate, Map<String, String> jsonDocument) {
		super();
		this.id = id;
		this.entityType = entityType;
		this.version = version;
		this.makerID = makerID;
		this.makerdt = makerDate;
		this.checkerID = checkerID;
		this.checkerdt = checkerDate;
		this.jsonDocument = jsonDocument;
	}

	public String getEntityType() {
		return entityType;
	}

	public void setEntityType(String entityType) {
		this.entityType = entityType;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public String getMakerID() {
		return makerID;
	}

	public void setMakerID(String makerID) {
		this.makerID = makerID;
	}

	public String getMakerdt() {
		return makerdt;
	}

	public void setMakerdt(String makerdt) {
		this.makerdt = makerdt;
	}

	public String getCheckerID() {
		return checkerID;
	}

	public void setCheckerID(String checkerID) {
		this.checkerID = checkerID;
	}

	public String getCheckerdt() {
		return checkerdt;
	}

	public void setCheckerdt(String checkerdt) {
		this.checkerdt = checkerdt;
	}

	public Map<String, String> getJsonDocument() {
		return jsonDocument;
	}

	public void setJsonDocument(Map<String, String> jsonDocument) {
		this.jsonDocument = jsonDocument;
		this.id=this.jsonDocument.get("branch")+"_"+this.jsonDocument.get("baseno");
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return String.format("%s %s %d %s %s %s %s %s",id,entityType,version,makerID,makerdt,checkerID,checkerdt,jsonDocument.toString());
	}
}
