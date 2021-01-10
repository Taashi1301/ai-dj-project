sound1="";
sound2="";
sound1status="";
sound2status="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftwrist="";
scorerightwrist="";
function preload(){
sound1=loadSound("music.mp3");
sound2=loadSound("music2.mp3")
}

function setup(){
canvas=createCanvas(300, 300);
canvas.center();
video=createCapture(VIDEO);
video.hide();
posenet=ml5.poseNet(video, modelLoaded);
posenet.on("pose", gotPoses);
}



function modelLoaded(){
    console.log("Model is loaded");
}

function gotPoses(results){
    if (results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;
        console.log("Left wrist X = "+leftWristX);
        console.log("Left wrist Y = "+leftWristY);
        console.log("Right wrist X = "+rightWristX);
        console.log("Right wrist Y = "+rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 300, 300);
    sound1status=sound1.isPlaying();
    sound2status=sound2.isPlaying();
    fill(0,255,0);
    stroke(0,0,255);
    if(scorerightwrist>0.2){
    sound2.stop();
    if(sound1status==false){
        sound1.play();
        document.getElementById("status").innerHTML="Song 1 is playing";
    }
    }
    if(scoreleftwrist>0.2){
        sound1.stop();
        if(sound2status==false){
            sound2.play();
            document.getElementById("status").innerHTML="Song 2 is playing";
        }
        }
    
    }

function play(){
    sound1.play();
}
function stop(){
    sound1.stop();
}