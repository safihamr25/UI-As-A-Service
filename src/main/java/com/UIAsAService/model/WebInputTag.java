package com.UIAsAService.model;

import java.util.List;

public class WebInputTag {
	private String tag;
	private List<String> options;
	private boolean readOnly;
	
	public WebInputTag() {
		super();
	}
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public List<String> getOptions() {
		return options;
	}
	public void setOptions(List<String> options) {
		this.options = options;
	}
	public boolean isReadOnly() {
		return readOnly;
	}
	public void setReadOnly(boolean readOnly) {
		this.readOnly = readOnly;
	}
}
