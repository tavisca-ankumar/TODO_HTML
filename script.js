window.onload = function () {
	Showlist();
}

function Showlist() {
	let element = document.getElementById("todo");
	SetClassNameSelected(element);
	OnClickHide();
	document.getElementById("search-container").style.display = "block";
	let html = `<table><tr>`;
	for (let i = 0; i < varAutopopulateData.length; i++) {
		html += `<td id="${i}">${varAutopopulateData[i]}</td>`;
		html += `<td id="btn${i}">
		<button type="button" onclick="EditItemInList(this)" class=${i}>EDIT</button>
		<button type="button" onclick="DeleteItemInList(this)" class=${i}>DELETE</button>
		</td>`;
		html += "</tr><tr>";
	}
	html += "</tr></table>";
	document.getElementById("todo-container").innerHTML = html;
}

function OnClickHide() {
	var menuItemsArray = document.getElementsByClassName("menu-item");
	for (var i = 0; i < menuItemsArray.length; i++) {
		if (menuItemsArray[i].firstChild.className == "selected") {
			console.log(menuItemsArray[i].id);
			document.getElementById(menuItemsArray[i].id + "-container").style.display = "block";
		}
		else {
			document.getElementById(menuItemsArray[i].id + "-container").style.display = "none";
		}
	}
}

function ShowUserDetails() {
	let element = document.getElementById("user");
	SetClassNameSelected(element);
	OnClickHide();
	document.getElementById("search-container").style.display = "none";
	let html = "<h4>Hi I am anoop</h4>";
	document.getElementById("user-container").innerHTML = html;
}

function ShowDeptDetails() {
	SetClassNameSelected(document.getElementById("dept"));
	OnClickHide();
	document.getElementById("search-container").style.display = "none";
	let html = "<h4>Computer Science department</h4>";
	document.getElementById("dept-container").innerHTML = html;
}

function SetClassNameSelected(element) {
	var menuItemsArray = document.getElementsByClassName("menu-item");
	for (var i = 0; i < menuItemsArray.length; i++) {
		if (menuItemsArray[i].firstChild.className == "selected") {
			menuItemsArray[i].firstChild.classList.remove("selected");
		}
	}
	element.firstChild.className = "selected";
}

function AddItemInList(){
	if(!varAutopopulateData.includes(document.getElementById("myInput").value) && document.getElementById("myInput").value!="")
		varAutopopulateData.push(document.getElementById("myInput").value);
	Showlist();
}

function DeleteItemInList(el){
	console.log(el.className);
	varAutopopulateData.splice(Number(el.className),1);
	console.log(varAutopopulateData);
	Showlist();
}

function EditItemInList(el){
	let tableCell = document.getElementById(el.className);
	let tableButton = document.getElementById("btn"+el.className);
	let inputUpdateBtn = document.createElement('button');
	let inputCancelBtn = document.createElement('button');
	inputUpdateBtn.setAttribute('onclick','UpdateList('+el.className+')');
	inputCancelBtn.setAttribute('onclick','CancelUpdate('+el.className+')');
	inputCancelBtn.id = "cancel";
	inputUpdateBtn.id="update";
	inputUpdateBtn.innerHTML = "UPDATE";
	inputCancelBtn.innerHTML = "CANCEL";
	tableButton.innerHTML = '';
	tableButton.appendChild(inputUpdateBtn);
	tableButton.appendChild(inputCancelBtn);
	let input = document.createElement('input');
	input.type = "text";
	input.value = tableCell.textContent;
	input.className = "changeListItem"+el.className;
	tableCell.innerHTML = '';
  	tableCell.appendChild(input);
	  input.focus();
	  console.log(document.getElementsByClassName(input.className));
}

function UpdateList(index){
	let classValue = "changeListItem"+index;
	console.log(classValue);
	let inputText = document.getElementsByClassName(classValue)[0];
	itemListValue = inputText.value;
	if(SearchInList(itemListValue,index)){
		varAutopopulateData[index]= itemListValue;
		let tableCell = document.getElementById(index);
		tableCell.innerHTML='';
		html = `<td id="${index}">${varAutopopulateData[index]}</td>`;
		tableCell.innerHTML=html;
		let buttonCell = document.getElementById("btn"+index);
		buttonCell.innerHTML='';
		html = `<td id="btn${index}">
		<button type="button" onclick="EditItemInList(this)" class=${index}>EDIT</button>
		<button type="button" onclick="DeleteItemInList(this)" class=${index}>DELETE</button>
		</td>`;
		buttonCell.innerHTML=html;	
	}
}

function CancelUpdate(index){
	let classValue = "changeListItem"+index;
	console.log(classValue);
	let tableCell = document.getElementById(index);
	tableCell.innerHTML='';
	html = `<td id="${index}">${varAutopopulateData[index]}</td>`;
	tableCell.innerHTML=html;
	let buttonCell = document.getElementById("btn"+index);
	buttonCell.innerHTML='';
	html = `<td id="btn${index}">
	<button type="button" onclick="EditItemInList(this)" class=${index}>EDIT</button>
	<button type="button" onclick="DeleteItemInList(this)" class=${index}>DELETE</button>
	</td>`;
	buttonCell.innerHTML=html;	
}

function SearchInList(itemListValue,dataIndex){
	for(let index=0;index<varAutopopulateData.length;index++){
		if(varAutopopulateData[index]==itemListValue && index!=Number(dataIndex)){
			return false;
		}
	}
	return true;
}
