(function(global){
	var contactBook = function(name,phone){
		return new contactBook.init(name,phone);
	};
	
	contactBook.prototype = {
		data:[
		
		],
		searchResults:[
		
		],
		
		addNewContact:function(name, phone){
			this.data.push({
				name: name,
				phone: phone
			});
			return this;
		},
		
		save:function(){
		},
		
		returnAll:function(){
			return this.data;
		},
		
		displayData:function(){
			this.log(this.data);
			return this;
		},
		
		log:function(data){
			console.log(data);
			return this;
		},
		
		search:function(searchTerm){
			if(this.data.length){
				for(var i=0; i < this.data.length; i++){
					if(this.data[i].name.toLowerCase() == searchTerm.toLowerCase()){
						console.error(this.data[i]);
						this.searchResults.push(this.data[i]);
					}
				}
				return this.searchResults;
			} else {
				console.log("There are no result");
			}
			return this;
		},
		
		lastResults:function(){
			return this.searchResults;
		}
	}
	
	contactBook.init = function(name, phone){
		var self = this;
		if (name || phone){
			self.addNewContact(name || "", phone || "");
		}
	}
	
	contactBook.init.prototype = contactBook.prototype;
	
	global.contactBook = $cb = contactBook;
})(window);

if (!window.contactList){
	window.contactList = $cb();
}

var form = document.getElementById('contact');
form.addEventListener('submit', function(){
	if (!window.contactList){
		window.contactList=$cb(form.person.value,form.phone.value);
	} else {
		contactList.addNewContact(form.person.value,form.phone.value);
	}
	
	form.person.value = '';
	form.phone.value = '';
	
	event.preventDefault();
});

var searchForm = document.getElementById('search');
searchForm.addEventListener('submit', function(){
	var results;
	if (results !== undefined){
		results = null;
	}
	
	if(!window.contactList){
		window.contactList=$cb();
	} else {
		results = contactList.search(searchForm.search.value);
	}

	document.getElementById('results').innerHTML = '';
	if (results.length > 0){
		for (var i= 0; i < results.length; i++){
			document.getElementById('results').innerHTML += '<div class = "contact-item">Name:' + results[i].name + '<br>Phone:' +
					results[i].phone + '</div><hr>';
		}
	} else {
		document.getElementById('results').innerHTML += '<div class = "contact-item"> There are no result for this name</div><hr>';
	}
	
	event.preventDefault();
});

var deleteForm = document.getElementById('delete');
deleteForm.addEventListener('submit', function(){
	var results;
	if (results !==undefined){
		results = null;
	}
	if (!window.contactList){
		window.contactList = $cb();
	} else {
		results = contactList.delete(deleteForm.search.value);
	}
	
	event.preventDefault();
});

document.getElementById('js-show-all').addEventListener('click', function(){
	if(window.contactList){
		document.getElementById('show-panel').innerHTML = '';
		var contacts = contactList.returnAll();
		console.log(contacts);
			if(contacts.length>0){
				for(var i = 0;i<contacts.length;i++){
				document.getElementById('show-panel').innerHTML += '<div class="contact-item">Name: '+contacts[i].name+'<br>Phone: '+contacts[i].phone+'</div><hr>';
				}
			} else {
				document.getElementById('show-panel').innerHTML += '<div class="contact-item">You have no contacts. Why not add  a few?</div><hr>';
			}
  }
  document.getElementById('show-panel').style.display = 'block';
  document.getElementById('search-panel').style.display = 'none';
  document.getElementById('contact-panel').style.display = 'none';
  document.getElementById('delete-panel').style.display = 'none';
    
});

document.getElementById('js-search').addEventListener('click', function(){
	document.getElementById('show-panel').style.display = 'none';
	document.getElementById('search-panel').style.display = 'block';
	document.getElementById('contact-panel').style.display = 'none';
	document.getElementById('delete-panel').style.display = 'none';
});

document.getElementById('js-add-new').addEventListener('click', function(){
	document.getElementById('show-panel').style.display = 'none';
	document.getElementById('search-panel').style.display = 'none';
	document.getElementById('contact-panel').style.display = 'block';
    document.getElementById('delete-panel').style.display = 'none';
});

document.getElementById('js-delete').addEventListener('click', function(){
	document.getElementById('show-panel').style.display = 'none';
	document.getElementById('search-panel').style.display = 'none';
	document.getElementById('contact-panel').style.display = 'none';
	document.getElementById('delete-panel').style.display = 'block'; 
});