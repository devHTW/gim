var searchtype;
var page = 1;

//Erstellt den API-Request-Anteil für den Head-Bereich:
function ApiCaller(searchtype,page){
	if (window.location.search.substring(12)!="")
		var searchtype = window.location.search.substring(12);
	else{
		var searchtype = "berlin";
	}
	var s= document.createElement("script");
	s.type="text/javascript";
	s.src="https://api.flickr.com/services/rest/?format=json&sort=random&method=flickr.photos.search&tags="+searchtype+"&per_page=20&page="+page+"&tag_mode=all&api_key=6202031574e5d7c896dd4711b2611cc5"
	document.getElementsByTagName('head')[0].appendChild(s);
}
//Erstellt den API-Request-Anteil für den Head-Bereich:
function Nav(navpoint){
	if(navpoint == "next"){
		DeleteApiCaller();
		DeletePhotosContainer();
		page =page+1;
		CreatePhotoContainer();
		ApiCaller(searchtype,page);
	}
	if(navpoint =="prev"){
		if(page>1){
			DeleteApiCaller();
			DeletePhotosContainer();
			page = page-1;
			CreatePhotoContainer();
			ApiCaller(searchtype,page);
		}
	}
}

function searchText(prm){
	DeleteApiCaller();
	DeletePhotosContainer();
	CreatePhotoContainer();
	ApiCaller(prm,1);
}


function CreatePhotoContainer(){
	var parent = document.getElementById("wrapper");
	var photosContainer = document.createElement("div")
    photosContainer.id= "photos";
    parent.appendChild(photosContainer);
}

function getLocation(){
	if(window.location.search.substring(12)!="")
		var	location =window.location.search.substring(12);
	else
		var location ="berlin";
	return location;
}

function CreateSearchContainer(){
	var searchcon = document.createElement("div");
	searchcon.id="searchfor";
	searchcon.innerHTML ='search tag: '+getLocation();
	var photos = document.getElementById("photos");
	photos.appendChild(searchcon);
}
function DeletePhotosContainer(){

	var parent = document.getElementById("wrapper");
    while(parent.hasChildNodes()){
     	parent.removeChild(parent.firstChild);
    }

}

function DeleteApiCaller(){
	var ApiCaller = document.getElementsByTagName("script")[2];
	if(ApiCaller!=null)
		ApiCaller.parentNode.removeChild(ApiCaller);
}
