window.onload = function() {

	if( sessionStorage.getItem("username") == null ){
	
		var html = '<li><a href="#/login"><span class="glyphicon glyphicon-log-in" aria-hidden="true"></span> Login</a></li>';
		document.getElementById( "userCheck" ).innerHTML = html;
		document.getElementById("testingHeader").style.display = "none";
		document.getElementById("sdsHeader").style.display = "none";
		document.getElementById("cmsHeader").style.display = "none";
	}
	else {
		var user = sessionStorage.getItem("username");
		var html = '<li><a href="#/settings"><span class="glyphicon glyphicon-cog" aria-hidden="true"></span> ' + user + '</a></li>'
		html += '<li><a href="#" onclick="return logout();"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> Logout</a></li>';
		document.getElementById( "userCheck" ).innerHTML = html;

		// Hide headers as appropriate
		var isUser = sessionStorage.getItem("isUser");
		var isAdmin = sessionStorage.getItem("isAdmin");
		var sds = sessionStorage.getItem("sds");
		var testing = sessionStorage.getItem("testing");
		var cmsMxo = sessionStorage.getItem("cms_mxo");
		var cmsFull = sessionStorage.getItem("cms_full");

		// Admin only
		if (isAdmin == null || isAdmin === "false") {
		}

		if(sds == null || sds === "false") {
			document.getElementById("sdsHeader").style.display = "none";
		}

		if(testing == null || testing === "false") {
			document.getElementById("testingHeader").style.display = "none";
		}

		if((cmsFull == null || cmsFull === "false") && (cmsMxo == null || cmsMxo === "false")) {
			document.getElementById("cmsHeader").style.display = "none";
		}

	}
    $(".navbar-nav li a").click(function(event) {
    	$(".navbar-collapse").collapse('hide');
    });
}

function logout() {
	
	sessionStorage.removeItem( "username" );
	sessionStorage.removeItem( "id" );
	sessionStorage.removeItem( "email" );
	sessionStorage.removeItem("isAdmin");
	sessionStorage.removeItem("isUser");
	sessionStorage.removeItem("sds");
	sessionStorage.removeItem("testing");
	sessionStorage.removeItem("cms_mxo");
	sessionStorage.removeItem("cms_full");

	window.location.href = "#/";
	location.reload();
}