// alert("done");
var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];
var level=0;


$(document).keydown(function(){
    $("#level-title").text("Level "+level);
    if (level==0) {
        setTimeout(nextSequence(),100)  
    }   
})

$(".btn").on("click",function (event){
    if (level!=0) {
        
        
        var userChosenColour = event.target.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);

        var result=checkAnswer(userClickedPattern.length-1);
        if (result==1) {
            if (userClickedPattern.length==gamePattern.length) {
                setTimeout(nextSequence,1000);
                userClickedPattern=[];
            }
        }
    }
})






function nextSequence(){
    var randomNumber=Math.floor(Math.random()*4); 
    var randomChosenColour=buttonColours[randomNumber];
    $("#"+randomChosenColour).fadeOut(100).fadeIn();
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    level++;
    $("#level-title").text("Level "+level);
}

function playSound(name) {
    var sound=new Audio("./sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColour) {

    //////////////////////////////////////////////////////
    //
    // add or remove class to the clicked element
    //
    // $(".btn").on("click", function (event) {
    //     event.target.classList.add("pressed");
    //     setTimeout(function(){
    //         event.target.classList.remove("pressed");
    //     },100)
    // })
    ///////////////////////////////////////////////////////

    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
        },100)

}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel]==gamePattern[currentLevel]) {
        console.log("success");
        return "1";
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game over, Press Any Key to Restart");
        level=0;
        gamePattern=[];
        userClickedPattern=[];
        return "0";
    }
}