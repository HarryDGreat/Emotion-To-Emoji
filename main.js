prediction_1="";
prediction_2="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

Camera=document.getElementById("camera");
Webcam.attach("#camera");

function capturetheimg(){
    Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML="<img id='capturedimage' src='"+data_uri+"'>"
    });
}

console.log("ml5 version:",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The First Prediction Is"+prediction_1;
    speak_data_2="and The Second Prediction Is"+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}


function  output(){
    img=document.getElementById("capturedimage");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("emotionname1").innerHTML=results[0].label;
    document.getElementById("emotionname2").innerHTML=results[1].label;
    prediction_1=results[0].label;
    prediction_2=results[1].label;
    speak();
    if(prediction_1=="happy"){
        document.getElementById("emoji1").innerHTML="&#128522";
    }
    if(prediction_1=="sad"){
        document.getElementById("emoji1").innerHTML="&#128532";
    }
    if(prediction_1=="angry"){
        document.getElementById("emoji1").innerHTML="&#128548";
    }
    if(prediction_2=="happy"){
        document.getElementById("emoji2").innerHTML="&#128522";
    }
    if(prediction_2=="sad"){
        document.getElementById("emoji2").innerHTML="&#128532";
    }
    if(prediction_2=="angry"){
        document.getElementById("emoji2").innerHTML="&#128548";
    }
}
}