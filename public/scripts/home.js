
/* initializations */
const API_URL = "https://restcountries.com/v3.1";
//document.cookie="light"
///////////////////////////////////////////////////////



/* event handlers */



window.onload = async function(){
   
 let ToDisplay = await loadAllCountries();
 await displayGrid(ToDisplay);
 if (document.cookie=="dark"){
    toggleHeader();
    toggleMainPage();
 }
 
}

document.querySelector('#form-select').addEventListener('change', async function(e) {
    e.preventDefault();
    if (this.value) {
      let theRegion = this.value;
      let ToDisplay;
      if (theRegion == "All") {
         ToDisplay = await loadAllCountries();
    }
    else {
       ToDisplay = await loadByRegion(theRegion);
    }
     await displayGrid(ToDisplay);

    }
  });

document.querySelector('#Search-bar').addEventListener('submit' ,async function(e){
    e.preventDefault();
    let thename = document.querySelector('.Search-text').value;
    let ToDisplay;
    if (thename == "") {
       ToDisplay = await loadAllCountries();
  }
  else {
     ToDisplay = await loadByName(thename);
  }
    await displayGrid(ToDisplay);

})

document.querySelector('#theme-selector').addEventListener('click' , function() {
    toggleHeader();
    toggleMainPage();
    

})



////////////////////////////////////////////////////////



/* functions needed*/

async function loadAllCountries(){
   
    try {
        const results = await axios.get(API_URL + '/all');
        let AllCountries = results.data;
        return AllCountries; 
    } catch (error) {
        console.error('Error:', error);
        return []; 
    }

   
}

async function loadByRegion(theRegion){

    try {
        const results = await axios.get(API_URL+`/region/${theRegion}`);
        let regionalCountries = results.data;
       
        return regionalCountries;
    } catch (error) {
        console.error('Error:', error);
    }
}

 async function loadByName(theName){

    try {
        const results = await axios.get(API_URL + `/name/${theName}`);
        let countryName = results.data;
        
        if (countryName.length > 0) {
            countryName = countryName; 
        } else {
            console.warn('No country found with the name:', theName);
            return []; 
        }
        
        console.log(countryName);
        return countryName; 
    } catch (error) {
        console.error('Error:', error);
        return []; 
}
}



async function displayGrid(countries){
    document.querySelector("#Countries-grid").innerHTML='';
    countries.forEach((country)=>{
        let thecountry = createCountryCard(country);
        document.querySelector("#Countries-grid").appendChild(thecountry);
    })

    
}

function createCountryCard(country){

let theCard = document.querySelector('.country-card').cloneNode(true);
theCard.classList.add("Country-card");
theCard.classList.remove("country-card");

theCard.childNodes[0].setAttribute('src' , country.flags.png)
theCard.childNodes[1].innerText= country.name.common;
theCard.childNodes[2].childNodes[0].innerText=`population:${country.population}`
theCard.childNodes[2].childNodes[1].innerText=`Region:${country.region}`
theCard.childNodes[2].childNodes[2].innerText=`Capital:${country.capital}`
theCard.addEventListener('click' , function(){
    const countryName = this.childNodes[1].innerText;
    window.location.href = `country.html?name=${countryName}`;
})

return theCard;
}

 function toggleHeader(){
    let ModeSelect = document.querySelector('#theme-selector');
    ModeSelect.classList.toggle('dark-mode');
    document.body.classList.toggle('dark-mode');
    document.querySelector('h1').classList.toggle('dark-mode');

    if (ModeSelect.classList.contains('dark-mode')) {
        document.querySelector('#theme-selector img').src= 'public/icons/sun.png';
        document.cookie="dark";
        ModeSelect.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            node.nodeValue = 'Light mode';
        }
    });
        }
        else {
        document.querySelector('#theme-selector img').src= 'public/icons/crescent-moon.png';
        document.cookie="light";
        ModeSelect.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            node.nodeValue = 'Dark mode';
        }
    
    });
    
        }
}


function toggleMainPage(){
   

    document.querySelector('#Search-bar').classList.toggle('dark-mode');
    document.querySelector('select').classList.toggle('dark-mode');
    document.querySelector('.Search-text').classList.toggle('dark-mode');
    document.querySelector('.search-button').classList.toggle('dark-mode');

    document.querySelectorAll('h2').forEach(card => {
        card.classList.toggle('dark-mode');
    });

    document.querySelectorAll('.Country-card').forEach(card => {
        card.classList.toggle('dark-mode');
    });

    document.querySelectorAll('li').forEach(card => {
        card.classList.toggle('dark-mode');
    });
}

///////////////////////////////////////////////////