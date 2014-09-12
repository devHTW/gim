ApiCaller(searchtype,page);
function jsonFlickrApi(response) {
 	if (response.stat != "ok"){
		return;
 	}
	window.onload = loadpicsetc();

	function loadpicsetc(){
		if (PageMax(response.photos)>0) {
			CreateSearchContainer();
			for (var i=0; i < response.photos.photo.length; i++) {
				photo = response.photos.photo[i];

				//Bau das Grundgerüst auf für die Bilder:
					var images = document.createElement("div");
					images.id="pic"+[i]; //pic div id erzeugen mit jeweiligen i-wert der Schleife
					images.className="image";
					var photosContainer =document.getElementById("photos");
					photosContainer.appendChild(images);
					var url = pictureMedium(photo);

					// URL einbinden und bild anpassen
					var photosContainer = document.getElementById("pic"+[i]);
					var source = linkURL(photo);
					var url = pictureMedium(photo);
					var img = document.createElement("img");
					img.setAttribute("src",url);
					img.setAttribute("alt",source);
					img.onclick = showImage;
					img.style.width = "300px";
					img.style.height = "auto";
					var photosContainer = document.getElementById("pic"+[i]);
					photosContainer.appendChild(img);	

				
				//Create Share links 
					var directlink = linkURL(photo);
					document.getElementById("img");
					share = document.createElement('div'); 
					share.setAttribute('class', 'share'); 
	 				share.innerHTML ='<span class="front">Share @:</span> <span class="facebook"><a href="http://www.facebook.com/sharer.php?u='+(directlink)+'" target="_blank">Facebook</a></span> / <span class="twitter"><a href="https://twitter.com/share?url='+(directlink)+'&via=brezelfest&hashtags=brezelfest" target="_blank">Twitter</a></span> / <span class="flickr"><a href="'+(directlink)+'" target="_blank">Flickr</a></span></span> ';
					photosContainer.appendChild(share);	

				
			}
			//Add Navigation to theend.. :)
			for(var j=0; j < 1; j++){
					var nav = document.createElement("div");
					nav.id="theend";
					var wrapper = document.getElementById("wrapper");
					wrapper.appendChild(nav);

					if(currentPage(response.photos)>1){
						var spanprev = document.createElement("span");
						spanprev.className="button";
						var spanpreva = document.createElement("a");
						spanpreva.href ="javascript:Nav('prev')";
						spanpreva.innerHTML="&#8592;";
						spanprev.appendChild(spanpreva);
						nav.appendChild(spanprev);

					}

					if(currentPage(response.photos)<PageMax(response.photos)){
						var spannext = document.createElement("span");
						spannext.className="button";
						var spannexta = document.createElement("a");
						spannexta.href ="javascript:Nav('next')";
						spannexta.innerHTML="&#8594;";
						spannext.appendChild(spannexta);
						nav.appendChild(spannext);

					}
					
			}		

		}else{
			//error
			var images = document.createElement("div");
			images.id="pic"+9000;
			images.className="image";
			images.innerHTML ='<b>nothing found.</b> <br/> how about another tag? ';
			var photosContainer =document.getElementById("photos");
			photosContainer.appendChild(images);

			var fakebottom =document.createElement("div");
			fakebottom.id="theend";
			var wrapper = document.getElementById("wrapper");
			wrapper.appendChild(fakebottom);
		}

	}
	

	//Lightbox
	function showImage(event){
	var target = event.target;
	var source = target.getAttribute("alt");
	var url = target.getAttribute("src");
	var image = document.createElement("img");
	image.setAttribute("src", url);

	var photosContainer = document.createElement("div");
	var imageBox = document.createElement("div");
	imageBox.id="imageBox";

	photosContainer.appendChild(imageBox)
	var sharebox = document.createElement("div");
	sharebox.className ="share";
	sharebox.innerHTML ='<span class="front">Share @:</span> <span class="facebook"><a href="http://www.facebook.com/sharer.php?u='+(source)+'" target="_blank">Facebook</a></span> / <span class="twitter"><a href="https://twitter.com/share?url='+(source)+'&via=brezelfest&hashtags=brezelfest" target="_blank">Twitter</a></span> / <span class="flickr"><a href="'+(source)+'" target="_blank">Flickr</a></span></span>';

	//Create ImageBox
	imageBox.appendChild(image);
	imageBox.appendChild(sharebox);
	photosContainer.setAttribute("class", "image-container")
	target.parentNode.appendChild(photosContainer);
	
	//Beim Klicken auf das Bild schließt die Lightbox
	image.onclick = function(event){
		event.currentTarget.parentNode.removeChild(event.currentTarget);
		photosContainer.parentNode.removeChild(photosContainer);
		return false;
	}
	return false;
	}		
	
	// Die URL des Fotos (Thumbnail):	
	function pictureThumb(photo) {
	 	return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
	 	photo.id + "_" + photo.secret + "_" + "s.jpg";				
	}

	// Die URL des Fotos (Mittel):	
	function pictureMedium(photo) {
	 	return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
	 	photo.id + "_" + photo.secret + "_" + "z.jpg";				
	}

	// Die URL des Fotos (Groß):		
	function pictureLarge(photo) {
	 	return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
	 	photo.id + "_" + photo.secret + "_" + "b.jpg";				
	}
	
	// Die URL zur entsprechenden Seite bei Flickr:
	function linkURL(photo) {	
	 	return "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
	}

	function PageMax(photos) {	
	 	return photos.pages;
	}

	function currentPage(photos){
		return photos.page;
	}

}
