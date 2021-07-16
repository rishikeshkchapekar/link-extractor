window.onload = e =>{
	var labels = [];
	var urls = [];
	var pageTitle = "";
	var mainDiv = document.getElementById("mainDiv")
	var copyUrls = document.getElementById("copyLinks")
	
	copyUrls.innerText = "Copy All Links"

	mainDiv.innerHTML = null
	chrome.storage.local.get(["labels","urls","pageTitle"],(value)=>{
		labels=value.labels
		urls=value.urls
		pageTitle=value.pageTitle
		var raw = document.getElementById('rawText')
		var heading = document.getElementById('heading')
		heading.innerText = `This page: ${pageTitle}`
		for(var i=0;i<labels.length;i++){
			var textBox = document.createElement("a")
			var labelBox = document.createElement("h4")
			
			textBox.classList.add("linkText")
			
			labelBox.innerText = `${labels[i]}:`
			textBox.innerText = `${urls[i]}`
			textBox.target = "_blank"
			textBox.href = urls[i]
			
			mainDiv.appendChild(labelBox)
			mainDiv.appendChild(textBox)

			raw.innerText+=`${urls[i]} `
			raw.value+=`${urls[i]} `
		}
	});

	copyUrls.addEventListener("click",e=>{
		var textArea = document.getElementById("rawText");
		var elem = document.createElement('textarea');
		elem.value = textArea.value;
		document.body.appendChild(elem)

		elem.select();
		document.execCommand('copy');

		document.body.removeChild(elem)

		copyUrls.innerText = "Links Copied!"
	})
}
