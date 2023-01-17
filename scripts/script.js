window.addEventListener('load',init);

let fruitNutritions = {}; //per 100g in gram
let image;
let fruit;
let page_num = 1;
let per_page = 1;

function init(){
    BindEvents();
}

function BindEvents(){
    document.querySelector('#searchButton').addEventListener('click', fruitData);
}


function fruitData(){
    fruit = document.getElementById('searchBox').value;
    if(fruit.length == 0){
        fruit = 'apple';
    }
    const URL = `https://cors-proxy-gy16.onrender.com/https://fruityvice.com/api/fruit/${fruit}`;  
                const promise = fetch(URL); // Async (Non Blocking)
                promise.then(response=>{
                    response.json().then(result=>{
                        //console.log('Data is ', result.nutritions);
                            fruitNutritions = result.nutritions;
                            //console.log(fruitNutritions);
                            if(fruitNutritions){
                                document.querySelector('#card_name').innerText = fruit;
                                for(key in fruitNutritions){
                                    document.getElementById(key).innerText = fruitNutritions[key];
                                }
                                
                                SearchPhotos(fruit);
                            }else{
                                alert("There is some problem! Could you check the spelling or your internet connection...!");
                            }
                            
                              
                    }).catch(err=>{
                        console.log('Invalid JSON... ', err);
                        alert("There is some problem! Could you check the spelling or your internet connection...!");
                    })
                }).catch(err=>{
                    console.log('Network Issue or Server issue ', err);
                    alert("There is some problem! Could you check the spelling or your internet connection...!");
                });
                document.getElementById('searchBox').value = '';
            
}

async function SearchPhotos(fruit){
    const data=await fetch(`https://api.pexels.com/v1/search?query=${fruit}&page=${page_num}&per_page=${per_page}`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: config.apikey, //use the API key
        },
    });
    const response=await data.json();
    //console.log(response.photos[0].src.medium);
    image = response.photos[0].src.medium;
    document.querySelector('#image').src = image;
    console.log(image);
    //display_images(response);
}
