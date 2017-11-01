document.addEventListener('DOMContentLoaded', function(){

	var data = [];

	function getElem(id){
		return document.getElementById(id);
	}

	function delInData(id){
		data.forEach(function(e,i,a){
			if(e.id==id){
				a.splice(i,1);
			}
		});
		chrome.storage.local.set({'data':data});
	}

	function updateUI(){
		getElem("ct").innerHTML = "";
		data.forEach(function(o){
			getElem("ct").innerHTML += "<div class='n fnt'><img class='mo fr x' src='x.png' id='" + o.id + "' title='Delete'></img>" + o.txt + "</div>";
		});
		data.forEach(function(o){
			getElem(o.id).addEventListener('click', function(e){
				delInData(e.target.id);
				e.target.parentElement.remove();
				getElem("ip").focus();
			});
		});
	}

	chrome.storage.local.get("data", function(resp){
		if(resp.data!=undefined){
			data = resp.data;
			updateUI();
		}
		document.addEventListener('keydown', function(e){
			if(e.keyCode==226) {
				e.preventDefault();
				return;
			}
			if(e.keyCode==13){
				if(getElem("ip").value=="") return;
				e.preventDefault();
				var o = {
					id : Date.now(),
					txt : getElem("ip").value
				}
				data.unshift(o);
				chrome.storage.local.set({'data':data});
				getElem("ip").value = "";
				updateUI();
			}
		});
	});

	getElem("ip").focus();

});
