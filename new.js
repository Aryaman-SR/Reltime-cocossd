img="";
status="";
object=[];



function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();

    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();

    o_d=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}

function modelLoaded()
{
    console.log('Model is Loaded');
    status=true;
    

}

function gotresult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        object=results;

    }
}

function draw()
{
    image(video,0,0,380,380);
    if(status !="")
    {
        o_d.detect(video,gotresult);
        for(i=0;i<object.length;i++)
        {
            r= random(255);
            g= random(255);
            b= random(255);
          document.getElementById("status").innerHTML="Status : Objects Detected";

          percent=floor(object[i].confidence*100);
          fill(r,g,b);
          text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
          noFill();
          stroke(r,g,b);
          rect(object[i].x,object[i].y,object[i].width,object[i].height);
          document.getElementById("NOO").innerHTML="Number of Objects are:"+object.length;
        }
    }
   

}