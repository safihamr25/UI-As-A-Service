package com.UIAsAService.business;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.UIAsAService.model.EntityMetaData;
import com.UIAsAService.model.EntityRecord;
import com.UIAsAService.model.Login;
import com.UIAsAService.service.EntityInterface;
import com.UIAsAService.service.EntityMetaInterface;
import com.UIAsAService.service.LoginInterface;

import org.apache.log4j.Logger;


@RestController
public class UIAsAServiceController{
	
	@Autowired
	private EntityMetaInterface metaservice;
	
	@Autowired
	private EntityInterface entityservice;
	
	@Autowired
	private LoginInterface logininterface;
	
	private static final Logger logger = Logger.getLogger(UIAsAServiceController.class);
	@RequestMapping("/getEntityMetaData")
	public List<EntityMetaData> getAllEntityMetaData(){
		String info ="Fetching Entity Meta data from EntityMetaData";
		logger.info(info);
		return metaservice.getAllData();
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/getEntityMetaData/{entityName}")
	public List<EntityMetaData> getDataByEntityName(@PathVariable String entityName) {
		String info ="Fetching Entity Meta data by Name for:"+entityName;
		logger.info(info);
		return metaservice.getDataByEntityName(entityName);
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/updateEntityMetaData")
	public EntityMetaData updateEntityMetaData(@RequestBody EntityMetaData entityMetaData) {
		String info ="Updating entity meta data"+entityMetaData.toString();
		logger.info(info);
		return metaservice.updateEntityMetaData(entityMetaData);
	}
	
	@RequestMapping("/getEntityRecord/{entityName}")
	public List<EntityRecord> getAllEntityRecord(@PathVariable String entityName){
		String info ="Fetching Entity Records from " + entityName;
		logger.info(info);
		return entityservice.getAllData(entityName);
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/EntityRecord")
	public EntityRecord addEntityRecord(@RequestBody EntityRecord entityRecord) {
		String info="Adding entity record"+entityRecord.toString();
		logger.info(info);
		return entityservice.addRecord(entityRecord);
	}
	
	@RequestMapping("/deleteEntityRecord/{id}")
	public void deleteEntityRecord(@PathVariable String id){
		String info ="Deleting Entity Record"+id;
		logger.info(info);
		entityservice.deleteRecord(id);
	}
	
	@RequestMapping(method=RequestMethod.POST,value= "/login")
	public Login login(@RequestBody Login login){
		String info ="Logging the user in with UserId "+ login.getUserid();
		logger.info(info);
		return logininterface.finduser(login);	
		
	}
	
	
}
