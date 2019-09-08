$('#fieldForm').submit(function() {
    $('#myModal').modal('hide');
    return false;
});
function hideAndShow(obj){
		$('.custom-card .card-body').hide().removeClass("card-highlight");
		$('.card-header').removeClass("card-highlight").removeClass("card-header-color");
		$($(obj).children('.card-body')).show().addClass("card-highlight");
		$($(obj).children('.card-header')).show().addClass("card-highlight").addClass("card-header-color");
//		$(obj).addClass("card-highlight");
		console.log("calledd");
	}

var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope,$http) {
  $scope.inputFieldDataTypes = ["varchar","char","numeric","email","soeid"];
  $scope.cardshow = false;
  $scope.entityRecords = [{"entityName":"customer",
	 "records":[{"branch":"adyar","baseno":"12563","availability":"4"},
		 		{"branch":"idayar","baseno":"123363","availability":"14"}] 
  }];

  $scope.loginShow = true;
  $scope.getNumber = function(value){
	  return parseInt(value);
  }
  
  
  
  
  $scope.nameClick = function(){
	  $scope.entityMetaDataForm = false;
	  $scope.showForm = false;
  }
 
  
  $scope.signIn = function(){
	  
	  let data = {};
	  data.userid = $scope.userid;
	  data.password = $scope.password;
	  
	  console.log(data);
	 
	  $http.post("/login",data)
	  .then(function(response) {
		  console.log(response);
		  
		  if(response.data.userid==data.userid){
			  $scope.loginShow = false;
		  }else{
			  swal("Incorrect Credentials", "Please Re Enter them", "error");
		  }
		  $scope.userid = "";
		  $scope.password = "";
		
	  }, function(response) {
		  console.log(response);
		  $scope.userid = "";
		  $scope.password = "";
		  swal("Server Error", "Please Re Enter them", "error");
	  });  
  }
  
  
  $scope.fetchEntity = function(){
	  $scope.entityNames = [];
	  $scope.showForm = false;
//	  $scope.entityMetaDataForm = false;
	  $http.get("/getEntityMetaData")
	  .then(function(response) {
		  angular.forEach(response.data, function(value, key){
		      $scope.entityNames.push(value.entityName);
		   });
	  }, function(response) {
		  
		  swal("Server Error", "Please Reload Page and try Again", "error");
	  });
  }  
  
  $scope.showForm = false;
  $scope.entityMetaData = [];
  $scope.model = {};
  $scope.temp = {};
  $scope.temp['id']="";
  $scope.temp['entityName']="";
  $scope.getEntityMetaData = function(entityName){
	  $scope.model.entityData = {};
	  $scope.showForm = !$scope.showForm;
//	  $scope.entityMetaDataForm = false;
	  $scope.isUpdate = false;
	  let url = "/getEntityMetaData/" + entityName; 
	  $http.get(url)
	  .then(function(response) {
		  $scope.entityMetaData = [];
		  angular.forEach(response.data, function(value, key){
			  $scope.temp['id']= value.id;
			  console.log("temp id"+$scope.temp['id']);
			  $scope.temp['entityName']=entityName;
			  console.log("temp name"+$scope.temp['entityName']);
			  angular.forEach(value.field,function(v,k){
				  $scope.entityMetaData.push(v);
			  });
		   });
	  }, function(response) {
		  swal("Server Error", "Please Reload Page and try Again", "error");
	  });
  }
  
  $scope.commonFields = ['entityType','version','makerID','makerdt','checkerID','checkerdt'];
  $scope.saveEntityRecord = function(entityName){
	  let data = {};
	  data.jsonDocument = {};
//	  console.log($scope.model.entityData);
	  let url = "/EntityRecord";
	  $scope.model.entityData['entityType'] = entityName;
	  let tempData = $scope.model.entityData;
	  angular.forEach(tempData,function(v,k){
//		 console.log("k :"+k+"v: "+v);
		 if($scope.commonFields.indexOf(k)> -1){
			 data[k]=v;
		 }
		 else{
			 data.jsonDocument[k]=v;
		 }
	  });
//	  console.log(data);
	  $http.post(url,data)
	  .then(function(response) {
		  swal("Success","Data Inserted Succesfully","success");
//		  console.log(response.data);
		  
		  $scope.showForm = !$scope.showForm;
		  $scope.model.entityData = {};
		  $scope.getEntityRecords(entityName);
	  }, function(response) {
		  console.log(response);
		  swal("Server Error", "Please Reload Page and try Again", "error");
	  });
  }
  
  $scope.isUpdate = false;
  
  $scope.updateRecord = function(index){
	  $scope.model.entityData = Object.assign({},$scope.entityRecords[index]);
	  console.log($scope.data);
	  $scope.showForm = true;
	  $scope.isUpdate = true;
  }
  
  $scope.showField = function(index){
	  $scope.showField[index] = !$scope.showField[index];
  }
  
  $scope.outerFields = ['id','entityName'];
  
  $scope.newMetaData = {};
  $scope.newMetaData.field = [];
  $scope.updateEntityMetaData = function(id,entityName){
	 
	  let data ={};
	  data.field = [];
	  angular.forEach($scope.entityMetaData,function(v,k){
		
		  let rowData = {};
		  angular.forEach(v,function(val,key){
			  console.log("key"+key+"val "+val);
			  let json = {};
			  json[key]=val;
			  rowData[key]=val;
		  });
		  data.field.push(rowData);
	  });
	  
	  
	  data.id = $scope.temp['id'];
	  data.entityName = $scope.temp['entityName'];
	  console.log(data);
	  $scope.new = Object.assign({},data);
	  let url = "/updateEntityMetaData"; 
	  $http.post(url,data)
	  .then(function(response) {	  
		  swal("Success", "Data Updated Succesfully", "success");
		  $scope.entityMetaDataForm = !$scope.entityMetaDataForm;
		  $scope.getEntityRecords("customer");
		  $scope.showForm = false;
		  console.log(showForm);
		  
	  }, function(response) {
		  swal("Server Error", "Please Reload Page and try Again", "error");
	  });
  }
  
  $scope.updateField = function(){
	 let data ={};
	  data.field = [];
	  angular.forEach($scope.entityMetaData,function(v,k){
		  let rowData = {};
		  angular.forEach(v,function(val,key){
			  let json = {};
			  json[key]=val;
			  rowData[key]=val;
		  });
		  data.field.push(rowData);
	  });
	  
	  data.id = $scope.temp['id'];
	  data.entityName = $scope.temp['entityName'];
	 data.field.push($scope.model.newField);
	 angular.forEach(data,function(v,k){
	 });
	 let url = "/updateEntityMetaData"; 
	  $http.post(url,data)
	  .then(function(response) {
		  swal("Success", "Fields Updated Succesfully","success");

		  $scope.getEntityRecords("customer");
		  
	  }, function(response) {
		  swal("Server Error", "Please Reload Page and try Again", "error");
	  });
	 
  }
  
  $scope.deleteField = function(index){
		 let data ={};
		  data.field = [];
		  angular.forEach($scope.entityMetaData,function(v,k){
			  let rowData = {};
			 
			  if(!(angular.equals(v,$scope.entityMetaData[index]))){
			  angular.forEach(v,function(val,key){
					  let json = {};
					  json[key]=val;
					  rowData[key]=val;
					  
			  });
			  }
			  data.field.push(rowData);
		  });
		  
		  console.log($scope.temp);
		  data.id = $scope.temp['id'];
		  data.entityName = $scope.temp['entityName'];
//		 data.field.push($scope.model.newField);
		 angular.forEach(data,function(v,k){
			 angular.forEach(v,function(val,key){
				console.log(" k"+k+"v "+v); 
			 });
		 });
		 let url = "/updateEntityMetaData"; 
		  $http.post(url,data)
		  .then(function(response) {
			  console.log(response.data);
			  
//			  $scope.entityMetaDataForm = !$scope.entityMetaDataForm;
//			  $scope.showForm = !$scope.showForm;
			  $scope.getEntityRecords("customer");
			  
		  }, function(response) {
			  console.log(response);
		  });
  }
  $scope.deleteRecord = function(id,entityName){
	  let flag = confirm("Do you want to delete the record ? "+id);
	  if(!flag){
		  return;
	  }
	  let url = "/deleteEntityRecord/"+id; 
	  $http.get(url)
	  .then(function(response) {
		  console.log(response.data);
		  swal("Success", "Data Deleted Succesfully","success");
		  $scope.getEntityRecords(entityName);
	  }, function(response) {
		  swal("Server Error", "Please Reload Page and try Again", "error");
	  });
  }
  $scope.entityRecords = [];
  $scope.entityMetaData = [];
  $scope.entityName = "";
  
  $scope.getEntityRecords = function(entityName){
	  $scope.entityRecords = [];
	  $scope.entityMetaData = [];
	  $scope.entityName = entityName;
	  $scope.entityMetaDataForm = false;
	  let url = "/getEntityMetaData/" + entityName; 
	  $http.get(url)
	  .then(function(response) {
		  

		  angular.forEach(response.data, function(value, key){
			  angular.forEach(value.field,function(v,k){
				  $scope.entityMetaData.push(v);
			  });
		   });
		 
		  
		  url = "/getEntityRecord/" + entityName; 
		  $http.get(url)
		  .then(function(response) {
			  angular.forEach(response.data, function(value, key){
				  temp = {};
				  console.log("k :"+key+"v :"+value);
				angular.forEach(value,function(val,key){
					 if(key != "jsonDocument"){
						 temp[key]=val;
					 }
					 else{
						 angular.forEach(val,function(v,k){
							 temp[k]=v;
						 })
					 }
				  });
				$scope.entityRecords.push(temp);
			   });
		  }, function(response) {
			 
		  });
	  }, function(response) {
		  swal("Server Error", "Please Reload Page and try Again", "error");
	  });
	 
  }
  
  $scope.getEntityRecords("customer");
  
  $scope.entityMetaDataForm = false;
  
  $scope.showEntityMetaDataForm = function(entityName){
	  $scope.entityMetaDataForm = true;
	  $scope.getEntityMetaData(entityName);
  }
  
  $scope.dataValidation = function(field){

	  let option = field.type;
	  if($scope.model.entityData[field.name] != "" ){
	  switch(option){
	  case "varchar":
		  $scope.varcharValidation(field);
		  break;
	  case "char":
		  $scope.varcharValidation(field);
		  break;
	  case "int":
		  $scope.varcharValidation(field);
		  break;
	  case "numeric":
		  $scope.numericValidation(field);
		  break;
	  case "bit":
		  $scope.bitValidation(field);
		  break;
	  case "soeid":
		  $scope.soeidValidation(field);
		  break;
	  case "date":
		  $scope.dateValidation(field);
		  break;
	  case "email":
		  $scope.emailValidation(field);
		  break;
	  }
	  }
  }
  $scope.message = {};
  $scope.varcharValidation = function(field){
	  var value = $scope.model.entityData[field.name].toString();
	  if(value.length >  field.length){
		  $scope.message[field.name]="Number of characters should not exceed "+ field.length;
	  }
	  else{
		  $scope.message[field.name]="";
	  }
  }
  
  
  $scope.numericValidation = function(field){
	  let reg = "^(\\d{1,"+String(field.length)+"}(?:[\.]\\d{0,"+String(field.precision)+"})?)$";
	  let regex = new RegExp(reg);
	  if(!regex.test($scope.model.entityData[field.name])){
		  $scope.message[field.name]="Can enter a value of length "+field.length+" and precision of "+field.precision; 
	  }
	  else{
		  $scope.message[field.name]="";
	  }
  }
  
  $scope.bitValidation = function(field){
	  if($scope.model.entityData[field.name]== '0' || $scope.model.entityData[field.name]== '1'){
		  $scope.message[field.name]="";
	  }
	  else{
		  $scope.message[field.name]="Please enter a bit value ( 0 or 1 )";
	  }
  }
  
  $scope.soeidValidation = function(field){
	  let regex = /^[a-zA-Z]{2}\d{5}$/
	  if(!regex.test($scope.model.entityData[field.name])){
		  $scope.message[field.name]="Please enter a valid SOEID";
	  }
	  else{
		  $scope.message[field.name]="";
	  }
  }
  
  $scope.dateValidation = function(field){
	  let regex = /^\d{4}\-\d{2}\-\d{2}[ ]\d{2}:\d{2}:\d{2}\.\d{1}$/
	  if(!regex.test($scope.model.entityData[field.name])){
		  $scope.message[field.name]="Please enter a valid date";
	  }
	  else{
		  $scope.message[field.name]="";
	  }
  }
  
  $scope.emailValidation = function(field){
	  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
		  if(!regex.test($scope.model.entityData[field.name])){
			  $scope.message[field.name]="Please enter a valid email id";
		  }
		  else{
			  $scope.message[field.name]="";
		  }		
  }
  
  
  
  
});