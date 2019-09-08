package com.UIAsAService.model;

public class Field {
  private String name;
  private String type;
  private String length;
  private String precision;
  private WebInputTag WebInputTag;
  private String label;
  private boolean mandatory;
  private String defaultValue;
	public Field() {
		super();
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getLength() {
		return length;
	}
	public void setLength(String length) {
		this.length = length;
	}
	public String getPrecision() {
		return precision;
	}
	public void setPrecision(String precision) {
		this.precision = precision;
	}
	public WebInputTag getWebInputTag() {
		return WebInputTag;
	}
	public void setWebInputTag(WebInputTag webInputTag) {
		WebInputTag = webInputTag;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public boolean isMandatory() {
		return mandatory;
	}
	public void setMandatory(boolean mandatory) {
		this.mandatory = mandatory;
	}
	public String getDefaultValue() {
		return defaultValue;
	}
	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}
	
  
}
