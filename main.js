song = "";
leftWristy = 0;
leftWristx = 0;
rightWristy = 0;
rightWristx = 0;
scorerightWrist = 0;
scoreleftWrist = 0;
image = "";
function preload(){
    song = loadSound("rec.m4a");
    image = "rakhi.jpg"
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on("pose",gotPoses);
}
function draw(){
    image(video,0,0,600,500);   
    fill('#ff0000');
    stroke('#000000');
    console.log("scoreleftWrist" + scoreleftWrist);
    if(scoreleftWrist > 0.2){
        circle(leftWristx,leftWristy,25);
        innumberleftWristy = Number(leftWristy);
        removedecimalnumber = floor(innumberleftWristy);
        console.log(removedecimalnumber + "decimalnumber"); 
        volume = removedecimalnumber/500;
        console.log(volume + "volume")
        console.log(volume);
        //document.getElementById("volume1").innerHTML = volume;
        song.setVolume(volume);
    }
    if(scorerightWrist > 0.2){
        image();
    }
}
function modelLoaded(){
    console.log("modelLoaded");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
        leftWristx = results[0].pose.leftWrist.x;
        console.log(scoreleftWrist)
        leftWristy = results[0].pose.leftWrist.y;

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
    }
    
}
function play(){
    song.play();
    song.rate(1);
    song.setVolume(1);
}