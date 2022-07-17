let loc=document.getElementById("location");
let tempicon=document.getElementById("temp-icon");
let tempvalue=document.getElementById("temp-value");
let climate=document.getElementById("climate");
let iconfile;
const searchInput=document.getElementById("search-input");
const searchButton=document.getElementById("search-button");

searchButton.addEventListener('click',(e)=>{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';
});
const getWeather=async(city)=>{
    try{
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b8d2a67edabb3a500efb343e47d774ce`,

        {mode:'cors'}
        );
        
        const weatherData=await response.json();
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        loc.textContent=name;
        climate.textContent=main;
        tempvalue.textContent=Math.round(feels_like-273);
        if(id<=232 && id>=200){
            tempicon.src="./img/thunderstorm.png"
        }
        else  if(id<=321 && id>=300){
            tempicon.src="./img/drizzle.png"
        }
        else if(id<=531&& id>=500){
            tempicon.src="./img/rain.png"
        }
        else  if(id<=622 && id>=600){
            tempicon.src="./img/snow.png"
        }
        else  if(id<=781 && id>=701){
            tempicon.src="./img/haze.png"
        }
        else if(id==800){
            tempicon.src="./img/clear.png"
        }
        else if(id<=804 && id>=800){
            tempicon.src="./img/clouds.png"
        }

    }
    catch(error){
        alert("City not found");
    }

};

window.addEventListener('load',()=>{
    let long;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position);
            long=position.coords.longitude;
            lat=position.coords.latitude;
            const api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b8d2a67edabb3a500efb343e47d774ce`
            fetch(api).then((response)=>{
                return response.json();
            })
            .then(data=>{
                const{name}=data;
                const{feels_like}=data.main;
                const{id,main}=data.weather[0];

                loc.textContent=name;
                climate.textContent=main;
                tempvalue.textContent=Math.round(feels_like-273);
                console.log(data);
                if(id<=232 && id>=200){
                    tempicon.src="./img/thunderstorm.png"
                }
                else  if(id<=321 && id>=300){
                    tempicon.src="./img/drizzle.png"
                }
                else if(id<=531&& id>=500){
                    tempicon.src="./img/rain.png"
                }
                else  if(id<=622 && id>=600){
                    tempicon.src="./img/snow.png"
                }
                else  if(id<=781 && id>=701){
                    tempicon.src="./img/haze.png"
                }
                else if(id==800){
                    tempicon.src="./img/clear.png"
                }
                else if(id<=804 && id>=800){
                    tempicon.src="./img/clouds.png"
                }
            })
    
        });
    }
    else{
        alert("Geolocation is not supported by this browser.");
    }
});
