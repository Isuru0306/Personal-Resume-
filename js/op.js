/* Credits: 
 * https://www.developphp.com/video/JavaScript/Circular-Progress-Loader-Canvas-JavaScript-Programming-Tutorial
 */

(function() {
	
	var Progress = function( element ) {
		
		this.context = element.getContext( "2d" );
		this.refElement = element.parentNode;
		this.loaded = 0;
		this.start = 0.72;
		this.width = this.context.canvas.width;
		this.height = this.context.canvas.height;
		this.total = parseInt( this.refElement.dataset.percent, 10 );
		this.timer = null;
		
		this.diff = 0;
		
		this.init();	
	};
	
	Progress.prototype = {
		init: function() {
			var self = this;
			self.timer = setInterval(function() {
				self.run();	
			}, 25);
		},
		run: function() {
			var self = this;
			
			self.diff = ( ( self.loaded / 100 ) * Math.PI * 2 * 10 ).toFixed( 2 );	
			self.context.clearRect( 0, 0, self.width, self.height );
			self.context.lineWidth = 10;
			self.context.fillStyle ="rgb(8, 241, 105)";
			self.context.strokeStyle = "rgb(136, 12, 207)";
			self.context.textAlign = "center";
			
			self.context.fillText( self.loaded + "%", self.width * .5, self.height * .5 + 2, self.width );
			self.context.beginPath();
			self.context.arc( 35, 35, 30, self.start, self.diff / 10 + self.start, false );
			self.context.stroke();
			
			if( self.loaded >= self.total ) {
				clearInterval( self.timer );
			}
			
			self.loaded++;
		}
	};
	
	var CircularSkillBar = function( elements ) {
		this.bars = document.querySelectorAll( elements );
		if( this.bars.length > 0 ) {
			this.init();
		}	
	};
	
	CircularSkillBar.prototype = {
		init: function() {
			this.tick = 30;
			this.progress();
			
		},
		progress: function() {
			var self = this;
			var index = 0;
			var firstCanvas = self.bars[0].querySelector( "canvas" );
			var firstProg = new Progress( firstCanvas );
			
			
			
			var timer = setInterval(function() {
				index++;
					
				var canvas = self.bars[index].querySelector( "canvas" );
				var prog = new Progress( canvas );
				
				if( index == self.bars.length ) {
						clearInterval( timer );
				} 
				
			}, self.tick * 100);
				
		}
	};
	
	document.addEventListener( "DOMContentLoaded", function() {
		var circularBars = new CircularSkillBar( "#bars .bar" );
	});
	
})();


function formValidation(){

	var answer ="";
	var fname = document.forms["regForm"]["fname"].value;
	var lname = document.forms["regForm"]["lname"].value;
	var idnumber = document.forms["regForm"]["idnumber"].value;
	var email = document.forms["regForm"]["email"].value;
	var gender = document.forms["regForm"]["gender"].value;
	var password = document.forms["regForm"]["password"].value;
	var Confirm = document.forms["regForm"]["Confirm"].value;

	if(fname == "" || lname == ""){
		answer = "first name or last name must be filled out";
	}else{

		if(idnumber == ""){
			answer = "Please insert ID number";
		}else{
			if(email == ""){
				answer = "E-mail is required";
			}else{

				if(gender == ""){
					answer = "gender is required";
				}else{
					if(password == "" || Confirm == ""){
						answer = "password required"
					}
					if(password.length<8){
						answer = "paasword must be include 8 characters";
					}
					if(password != Confirm){
						answer = "doesn't match confirm password";
					}
				}
			}
		}

	}
	document.getElementById("formError").innerHTML = answer;
	return false;
}


function loginFormValidation(){

	let answer ="";
	let email = document.forms["loginForm"]["email"].value;
	let password = document.forms["loginForm"]["password"].value;
	if(email == ""){
		answer = "please enter your email address";
		// console.log(answer);
	}else{
		if(password == ""){
			answer = "please enter password";
			// console.log(answer);
		}
	}
	document.getElementById("loginformError").innerHTML = answer;
	return false;
}