chrome.tabs.onActivated.addListener(tab=>{
	setTimeout(()=>{
		chrome.tabs.get(tab.tabId, curTabInfo =>{
			try{
				if(curTabInfo.url.startsWith("https://") || curTabInfo.url.startsWith("http://")){
					chrome.tabs.executeScript(null,{file:"./foreground.js"},()=>{console.log("Injected")}) //null means inject into active tab
				}
			}
			catch(e){
				console.log("")
			}
		});
	},1000)
})
