status = "";
objects = [];

function setup() {
    canvas = createCanvas(480,380);
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("input").value
    console.log(object_name)
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 480, 380);

    if (status != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; 1 < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected"
            fill("#FF0000")
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y +15)
            nofill();
            stroke("#FF0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

            if (objects[i].label == object_name) {
                video.stop()
                objectDetector.detect(gotResult)
                document.getElementById("object_status").innerHTML = object_name + "found"
                synth = window.speechSynthesis
                utterThis = new SpeechSynthesisUtterance(object_name + "found")
                synth.speak(utterThis)
            }
            else {
                document.getElementById("object_status").innerHTML = object_name + "not found"
            }
        }
    }
}