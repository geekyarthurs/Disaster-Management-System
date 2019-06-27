$(document).ready(function () {

    function refresh(){
        
        $.get("http://localhost:9000/all",function(data){
            console.log(data.status);
                if(data.status){
                   
                    $(".status").empty();
                    $(".status").append(`<i class="material-icons" style="color: green; font-weight:bold">done</i>`);
                   
                    
                }else{
                    if(data.problemName){
                        $(".status").empty();
                        $(".status").append(data.problemName);
                    }
                   
                    $(".status").css("color","red");
                }
        });

        var people = [];
        $.get("http://localhost:9000/missingPeople",function(data){
            $(".missingPerson").empty();
            data.forEach(data => {
                people.push(`<li><h5>${data.name} - ${data.Location}</h5></li>`);
            });

            $(".missingPerson").append(...people);
        })

    }    

    setInterval(refresh,4000);

    $("#alert-button").on("click",function(){

        $(".status").empty();
        // console.log("Clicked");
        var msg = $(".alertname").val();
        console.log(msg);
        $(".status").append(msg);
        $(".status").css("color","red");
        
        $.get("http://localhost:9000/off?problem=" + msg ,function(data){
            console.log(data);
        });
    });

    $(".resetButton").on("click",function(){
        $(".status").empty();
        $(".status").append(`<i class="material-icons" style="color: green; font-weight:bold">done</i>`);
       
        $.get("http://localhost:9000/on" ,function(data){
            console.log(data);
        });
    });

});