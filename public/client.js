USERNAME = ""


document.bgColor = '#FFFFFF';


function login() {
	console.log("linked")
	var req = new XMLHttpRequest()
	req.open("POST", "/login")
	req.onreadystatechange = function () {
		USERNAME = req.responseText
	}
	var user = document.getElementById("user").value
	var pass = document.getElementById("pass").value
	// var user = "tug"
	// var pass = "till"
	// console.log(pass)
	// var data = '{"user":' + user + '}'
	// console.log("data:" + data)
	data = '{ "username":' + user + ',"passwd":' + pass + '}'
	data = JSON.parse(data)
	req.setRequestHeader("Content-type", "application/json")
	req.send(data)
	

}

function logout() {
	console.log("LOGOUT")
	var req = new XMLHttpRequest()
	req.open("GET", "/logout")
	req.send()
}


function start() {
    var coins = parseInt(document.getElementById("coins").innerHTML);
    var bet = parseInt(document.getElementById("bet").value);
    //check if valid bet
    if (bet > coins || bet < 0){
        alert("Invalid bet!")
    }
    else{
        //update displays
        var x = document.getElementById("info");
        x.style.display = "none";
        var y = document.getElementById("buttons");
        y.style.display = "block";
        var z = document.getElementById("game");
        z.style.display = "block";
        // Step 1
        request = new XMLHttpRequest();
        console.log("1 - request object created");
        // Step 2
        var url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
        request.open("GET", url);
        console.log("2 - opened request file");
        // Step 3
        request.onreadystatechange = function() {
            console.log("3 - readystatechange event fired.");
            if (request.readyState == 4 && request.status == 200) {
                // Step 5
                result = request.responseText;
                var deckinfo = JSON.parse(result);
                var id = deckinfo.deck_id;
                window.id = id;
                deal(id);
            }
            else if (request.readyState == 4 && request.status != 200) {
                document.getElementById("data").innerHTML = "Something is wrong!  Check the logs to see where this went off the rails";
            }
            else if (request.readyState == 3) {
                // document.getElementById("data").innerHTML = "Too soon!  Try again";
            }
        }
        // Step 4
        request.send();
        console.log("4 - Request sent");
    }
}


    function deal(id) { 
        request = new XMLHttpRequest();
        request.open("GET", "https://deckofcardsapi.com/api/deck/"+ id +"/draw/?count=3");
        request.onreadystatechange = function() {
            console.log("3 - readystatechange event fired.");
            if (request.readyState == 4 && request.status == 200) {
                // Step 5
                result = request.responseText;
                var gameinfo = JSON.parse(result);
                //DEALER
                var d_arr = [];
                var d_score = 0;
                var dealerpics = "";
                for(var x = 0; x < 1; x++){
                    //for pics
                    dealerpics += "<img src =" + gameinfo.cards[x].image + ">";
                    var score = gameinfo.cards[x].value;
                    //for score
                    if (score == "JACK" || score == "QUEEN" ||score == "KING" || score == "10"){
                        score = 10;
                    }
                    else if (score == "ACE"){
                        score = 11;
                    }
                    else{
                        score = score.charCodeAt(0) - 48;
                    }
                    d_arr.push(score);
                    }
                //calculating score
                for (var x = 0; x < d_arr.length; x++){
                    d_score += d_arr[x];
                }
                //aces case
                if (d_score > 21){
                    window.d_arr[0] = 1;
                    d_score = d_score - 10;
                }
                document.getElementById("dealer").innerHTML = dealerpics;
                document.getElementById("dealerscore").innerHTML = d_score;
                //PLAYER
                var p_score = 0;
                var p_arr = [];
                var playerpics = "";
                for(var x = 1; x < 3; x++){
                    //for pics
                    playerpics += "<img src =" + gameinfo.cards[x].image + ">";
                    var score = gameinfo.cards[x].value;
                    //for score
                    if (score == "JACK" || score == "QUEEN" ||score == "KING" || score == "10"){
                        score = 10;
                    }
                    else if (score == "ACE"){
                        score = 11;
                    }
                    else{
                        score = score.charCodeAt(0) - 48;
                    }
                    p_arr.push(score);
                    }
                //calculating score
                for (var x = 0; x < p_arr.length; x++){
                    p_score += p_arr[x];
                }
                window.p_arr = p_arr;
                window.d_arr = d_arr;
                //aces case
                if (p_score > 21){
                    window.p_arr[0] = 1;
                    p_score = p_score - 10;
                }
                
                document.getElementById("playerscore").innerHTML = p_score;
                document.getElementById("player").innerHTML = playerpics;
            }
        }
        // Step 4
        request.send();
        console.log("4 - Request sent");
    }


function hit(){
    request = new XMLHttpRequest();
    request.open("GET", "https://deckofcardsapi.com/api/deck/"+ window.id +"/draw/?count=1");
    request.onreadystatechange = function() {
        console.log("3 - readystatechange event fired.");
        if (request.readyState == 4 && request.status == 200) {
            // Step 5
            result = request.responseText;
            var gameinfo = JSON.parse(result);
            //picture
            var output = document.getElementById("player").innerHTML;
            output += "<img src =" + gameinfo.cards[0].image + ">";
            document.getElementById("player").innerHTML = output;
            
            //value
            var score = gameinfo.cards[0].value;
            if (score == "JACK" || score == "QUEEN" ||score == "KING" || score == "10"){
                score = 10;
            }
            else if (score == "ACE"){
                score = 11;
            }
            else{
                score = score.charCodeAt(0) - 48;
            }
            window.p_arr.push(score);
            //calculating
            var p_score = 0;
            for (var x = 0; x < window.p_arr.length; x++){
                    p_score += window.p_arr[x];
            }
            document.getElementById("playerscore").innerHTML = p_score;
            
            //losing
            if (p_score > 21){
                //check if aces to fix score over
                for (var x = 0; x < window.p_arr.length; x++){
                    if (window.p_arr[x] == 11){
                        window.p_arr[x] == 1;
                        p_score = p_score - 10;
                        document.getElementById("playerscore").innerHTML = p_score;
                        x = 55;
                    }
                }
                //no aces to change
                if (p_score > 21){
                    lose();
                }
            }
        }
    }
    // Step 4
    request.send();
    console.log("4 - Request sent");
}


function stand(){
    //calculating
    var d_score = parseInt(document.getElementById("dealerscore").innerHTML);
	
    if (d_score < 17){
        request = new XMLHttpRequest();
        request.open("GET", "https://deckofcardsapi.com/api/deck/"+ window.id +"/draw/?count=1");
        request.onreadystatechange = function() {
            console.log("3 - readystatechange event fired.");
            if (request.readyState == 4 && request.status == 200) {
                // Step 5
                result = request.responseText;
                var gameinfo = JSON.parse(result);
                //picture
                var output = document.getElementById("dealer").innerHTML;
                output += "<img src =" + gameinfo.cards[0].image + ">";
                document.getElementById("dealer").innerHTML = output;
                
                //value
                var score = gameinfo.cards[0].value;
                if (score == "JACK" || score == "QUEEN" ||score == "KING" || score == "10"){
                    score = 10;
                }
                else if (score == "ACE"){
                    score = 11;
                }
                else{
                    score = score.charCodeAt(0) - 48;
                }
                window.d_arr.push(score);
                //calculating
                var d_score = 0;
                for (var x = 0; x < window.d_arr.length; x++){
                        d_score += window.d_arr[x];
                    }
                document.getElementById("dealerscore").innerHTML = d_score;
                
                //dealer loses
                if (d_score > 21){
                    //check if aces to fix score over
                    for (var x = 0; x < window.d_arr.length; x++){
                        if (window.d_arr[x] == 11){
                            window.d_arr[x] == 1;
                            d_score = d_score - 10;
                            document.getElementById("dealerscore").innerHTML = d_score;
                            x = 55;
                     
                        }
                    }
                   
                }
                //dealer hits again
                stand();
            }
            
        }
            // Step 4
        request.send();
        console.log("4 - Request sent");
    }
    else{
        check(d_score);
    }
}


function check(d_score){
    var p_score = 0;
        for (var x = 0; x < window.p_arr.length; x++){
                p_score += window.p_arr[x];
        }
	
	if (d_score > 21){
	    win()
	}
	else if (d_score > p_score){
	    lose();
	}
        else if (d_score < p_score){
            win();
        }
        else{
            tie();
        }
}


function lose(){
    //display loss
    setTimeout(function(){
        alert("You lose!")
    }, 1000);
    //update funds
    var coins = parseInt(document.getElementById("coins").innerHTML);
    var bet = parseInt(document.getElementById("bet").value);
    var total = coins - bet;
    document.getElementById("coins").innerHTML = total;
    //change display
    var x = document.getElementById("info");
    x.style.display = "block";
    var y = document.getElementById("buttons");
    y.style.display = "none";
    send_loss(total)
}

function send_loss(curr) {
	var req = new XMLHttpRequest()
	req.open("POST", "/bet_l");
	req.onreadystatechange = function() {
		console.log(req.responseText)
	}
	var data = '{"balance":' + curr + '}'
	// data = JSON.parse(data)
	console.log(data)
	req.setRequestHeader("Content-type", "application/json")
	req.send(data)
}


function win(){
    //display win
    setTimeout(function(){
        alert("You win!")
    }, 1000);
    //update funds
    var coins = parseInt(document.getElementById("coins").innerHTML);
    var bet = parseInt(document.getElementById("bet").value);
    var total = coins + bet;
    document.getElementById("coins").innerHTML = total;
    //change display
    var x = document.getElementById("info");
    x.style.display = "block";
    var y = document.getElementById("buttons");
    y.style.display = "none";
    send_win(total)
}

function send_win(curr) {
	var req = new XMLHttpRequest()
	req.open("POST", "/bet_w");
	req.onreadystatechange = function() {
		console.log(req.responseText)
	}
	var data = '{"balance":' + curr + '}'
	console.log(data)
	req.setRequestHeader("Content-type", "application/json")
	req.send(data)
}


function tie(){
    setTimeout(function(){
        alert("It's a tie!")
    }, 1000);
    //change display
    var x = document.getElementById("info");
    x.style.display = "block";
    var y = document.getElementById("buttons");
    y.style.display = "none";
}


function load(){
    //THIS IS WHERE TO GET INFO STORED FROM THE DATABASE
    // console.log(USERNAME)
    // document.getElementById("user_disp").innerHTML = USERNAME
    // document.getElementById("coins").innerHTML = 1000;
    var z = document.getElementById("game");
    z.style.display = "none";
}


// console.log("Client side running")

// const hit_button = document.getElementById('hit');
// hit_button.addEventListener('click', function(e) {
//   console.log('Hit button was clicked');
//   hit();
// });

// const stand_button = document.getElementById('stand');
// stand_button.addEventListener('click', function(e) {
//   console.log('Stand button was clicked');
//   stand();
// });

// // function login(url, data, callback) {
// //   var req = new XMLHttpRequest();
// //   console.log(data)
// //   req.open("POST", url, true);
// //   req.send(data);
// //   req.onload = function(e) {
// //     if (this.status == 200) { // if the HTTP response code is 200 (OK)
// //     	// console.log(e.responseText)
// //       callback(e.responseJson); // passing the result of the request to the callback function 
// //     }
// //   };
// // }


// // const login_button = document.getElementById('login');
// // login_button.addEventListener('click', function (e) {
// // 	console.log("Login button was clicked");
// // 	// data = JSON.parse('{"testing": "hi", "count":42}')
// // 	// data = '{"testing": "hi", "count":42}'
// // 	data = "wpk235@gmail.com "
// // 	login("/",data, function print_post(text) {
// // 		console.log(text)
// // 	})
// // })



// function load() {
// 	// Step 1
// 	request = new XMLHttpRequest();
// 	console.log("1 - request object created");

// 	// Step 2
// 	var url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

// 	request.open("GET", url);

// 	console.log("2 - opened request file");

// 	// Step 3

// 	request.onreadystatechange = function() {
// 		console.log("3 - readystatechange event fired.");

// 		if (request.readyState == 4 && request.status == 200) {

// 			// Step 5
// 			result = request.responseText;
// 			var deckinfo = JSON.parse(result);
// 			var id = deckinfo.deck_id;
// 			window.id = id;
// 			deal(id);
// 		}
// 		else if (request.readyState == 4 && request.status != 200) {

// 			document.getElementById("data").innerHTML = "Something is wrong!  Check the logs to see where this went off the rails";

// 		}

// 		// else if (request.readyState == 3) {

// 		// 	document.getElementById("data").innerHTML = "Too soon!  Try again";

// 		// }

// 	}
// // Step 4
// 	request.send();
// 	console.log("4 - Request sent");
// }




// 	function deal(id) {	
// 		request = new XMLHttpRequest();
// 		request.open("GET", "https://deckofcardsapi.com/api/deck/"+ id +"/draw/?count=4");
// 		request.onreadystatechange = function() {
// 			console.log("3 - readystatechange event fired.");

// 			if (request.readyState == 4 && request.status == 200) {

// 				// Step 5
// 				result = request.responseText;
// 				var gameinfo = JSON.parse(result);

// 				//DEALER
// 				var d_arr = [];
// 				var d_score = 0;
// 				var dealerpics = "";
// 				for(var x = 0; x < 2; x++){
// 					//for pics
// 					dealerpics += "<img src =" + gameinfo.cards[x].image + ">";

// 					var score = gameinfo.cards[x].value;
// 					//for score
// 					if (score == "JACK" || score == "QUEEN" ||score == "KING" || score == "10"){
// 						score = 10;
// 					}
// 					else if (score == "ACE"){
// 						score = 11;
// 					}
// 					else{
// 						score = score.charCodeAt(0) - 48;
// 					}
// 					d_arr.push(score);
// 					}


// 				//calculating score
// 				for (var x = 0; x < d_arr.length; x++){
// 					d_score += d_arr[x];
// 				}
// 				//aces case
// 				if (d_score > 21){
// 					window.d_arr[0] = 1;
// 					d_score = d_score - 10;
// 				}

// 				document.getElementById("dealer").innerHTML = dealerpics;
// 				document.getElementById("dealerscore").innerHTML = d_score;


// 				//PLAYER
// 				var p_score = 0;
// 				var p_arr = [];
// 				var playerpics = "";
// 				for(var x = 2; x < 4; x++){
// 					//for pics
// 					playerpics += "<img src =" + gameinfo.cards[x].image + ">";

// 					var score = gameinfo.cards[x].value;
// 					//for score
// 					if (score == "JACK" || score == "QUEEN" ||score == "KING" || score == "10"){
// 						score = 10;
// 					}
// 					else if (score == "ACE"){
// 						score = 11;
// 					}
// 					else{
// 						score = score.charCodeAt(0) - 48;
// 					}
// 					p_arr.push(score);
// 					}


// 				//calculating score
// 				for (var x = 0; x < p_arr.length; x++){
// 					p_score += p_arr[x];
// 				}

// 				window.p_arr = p_arr;
// 				window.d_arr = d_arr;

// 				//aces case
// 				if (p_score > 21){
// 					window.p_arr[0] = 1;
// 					p_score = p_score - 10;
// 				}

				
// 				document.getElementById("playerscore").innerHTML = p_score;
// 				document.getElementById("player").innerHTML = playerpics;
// 			}
// 		}

// 		// Step 4
// 		request.send();
// 		console.log("4 - Request sent");
// 	}




// function hit(){
// 	request = new XMLHttpRequest();
// 	request.open("GET", "https://deckofcardsapi.com/api/deck/"+ window.id +"/draw/?count=1");
// 	request.onreadystatechange = function() {
// 		console.log("3 - readystatechange event fired.");

// 		if (request.readyState == 4 && request.status == 200) {

// 			// Step 5
// 			result = request.responseText;
// 			var gameinfo = JSON.parse(result);

// 			//picture
// 			var output = document.getElementById("player").innerHTML;
// 			output += "<img src =" + gameinfo.cards[0].image + ">";
// 			document.getElementById("player").innerHTML = output;
			
// 			//value
// 			var score = gameinfo.cards[0].value;
// 			if (score == "JACK" || score == "QUEEN" ||score == "KING" || score == "10"){
// 				score = 10;
// 			}
// 			else if (score == "ACE"){
// 				score = 11;
// 			}
// 			else{
// 				score = score.charCodeAt(0) - 48;
// 			}
// 			window.p_arr.push(score);

// 			//calculating
// 			var p_score = 0;
// 			for (var x = 0; x < window.p_arr.length; x++){
// 					p_score += window.p_arr[x];
// 			}
// 			document.getElementById("playerscore").innerHTML = p_score;
			
// 			//losing
// 			if (p_score > 21){
// 				//check if aces to fix score over
// 				for (var x = 0; x < window.p_arr.length; x++){
// 					if (window.p_arr[x] == 11){
// 						window.p_arr[x] == 1;
// 						p_score = p_score - 10;
// 						document.getElementById("playerscore").innerHTML = p_score;
// 						x = 55;
// 					}
// 				}
// 				//no aces to change
// 				if (p_score > 21){
// 					lose();
// 				}
// 			}
// 		}

// 	}

// 	// Step 4
// 	request.send();
// 	console.log("4 - Request sent");
// }



// function stand(){
// 	//calculating
// 	var d_score = 0;
// 	for (var x = 0; x < window.d_arr.length; x++){
// 		d_score += window.d_arr[x];
// 	}

// 	if (d_score < 17){
// 		request = new XMLHttpRequest();
// 		request.open("GET", "https://deckofcardsapi.com/api/deck/"+ window.id +"/draw/?count=1");

// 		request.onreadystatechange = function() {
// 			console.log("3 - readystatechange event fired.");

// 			if (request.readyState == 4 && request.status == 200) {

// 				// Step 5
// 				result = request.responseText;
// 				var gameinfo = JSON.parse(result);

// 				//picture
// 				var output = document.getElementById("dealer").innerHTML;
// 				output += "<img src =" + gameinfo.cards[0].image + ">";
// 				document.getElementById("dealer").innerHTML = output;
				
// 				//value
// 				var score = gameinfo.cards[0].value;
// 				if (score == "JACK" || score == "QUEEN" ||score == "KING" || score == "10"){
// 					score = 10;
// 				}
// 				else if (score == "ACE"){
// 					score = 11;
// 				}
// 				else{
// 					score = score.charCodeAt(0) - 48;
// 				}
// 				window.d_arr.push(score);

// 				//calculating
// 				var d_score = 0;
// 				for (var x = 0; x < window.d_arr.length; x++){
// 						d_score += window.d_arr[x];
// 					}
// 				document.getElementById("dealerscore").innerHTML = d_score;
				
// 				//dealer loses
// 				if (d_score > 21){
// 					//check if aces to fix score over
// 					for (var x = 0; x < window.d_arr.length; x++){
// 						if (window.d_arr[x] == 11){
// 							window.d_arr[x] == 1;
// 							d_score = d_score - 10;
// 							document.getElementById("dealerscore").innerHTML = d_score;
// 							x = 55;
// 							stand();
// 						}
// 					}

// 					//no aces to change
// 					if (d_score > 21){
// 						win();
// 					}
// 				}

// 				//dealer hits again
// 				stand();
// 			}
			
// 		}
// 			// Step 4
// 		request.send();
// 		console.log("4 - Request sent");

// 	}
// 	if (d_score >= 17 && d_score <=21){
// 		check(d_score);
// 	}
// }



// function check(d_score){
// 	var p_score = 0;
// 		for (var x = 0; x < window.p_arr.length; x++){
// 				p_score += window.p_arr[x];
// 		}

// 		if (d_score > p_score){
// 			lose();
// 		}
// 		else if (d_score < p_score){
// 			win();
// 		}
// 		else{
// 			tie();
// 		}
// }



// function lose(){
// 	setTimeout(function(){
// 		var again = confirm("You lose! Play again?")
// 		if (again == true){
// 			load();
// 		}
// 	}, 1500);
// }



// function win(){
// 	setTimeout(function(){
// 		var again = confirm("You win! Play again?")
// 		if (again == true){
// 			load();
// 		}
// 	}, 1500);
// }



// function tie(){
// 	setTimeout(function(){
// 		var again = confirm("It's a tie! Play again?")
// 		if (again == true){
// 			load();
// 		}
// 	}, 1500);
// }
