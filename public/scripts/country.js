

// const darkHeader = require('./home.js')
// const loadByName = require('./home.js')

/* initializations */
const API_URL = "https://restcountries.com/v3.1";
///////////////////////////////////////////////////////

/* event handlers */
document.querySelector('#theme-selector').addEventListener('click' , function() {
    toggleHeader();
    ThemeCountryInfo();
})


   window.onload = async function (){
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get('name');
    let countrySelected = await loadByName(countryName);
    await displayInfo(countrySelected);
    if (document.cookie=="dark"){
        toggleHeader();
        ThemeCountryInfo();
     }
   }
   
   document.querySelector("#back-button").addEventListener('click' , ()=>{
    redirectToRoot();
   })

   /*functions*/


   function ThemeCountryInfo ()
   {
    let ModeSelect = document.querySelector('#theme-selector');
    document.querySelector('h2').classList.toggle('dark-mode');
    document.querySelector('#back-button').classList.toggle('dark-mode');
    document.querySelector('p').classList.toggle('dark-mode')
    

    document.querySelectorAll('li').forEach(list => {
        list.classList.toggle('dark-mode');
    })
     
    document.querySelectorAll('.border-countries').forEach(country => {
        country.classList.toggle('dark-mode');
    })

    if (ModeSelect.classList.contains('dark-mode')) {
    document.querySelector('#back-button img').src = 'public/icons/left-arrow-Dark-mode.png';
    document.cookie="dark";
    }
    else {
    document.querySelector('#back-button img').src = 'public/icons/left-arrow.png';
    document.cookie="light";
    } 
    }
     
    async function displayInfo(country){
        document.querySelector(".the-flag").setAttribute('src' , country.flags.png);
        document.querySelector("h2").innerText= country.name.common;
        document.querySelectorAll("li")[0].innerHTML = `Native Name: ${country.name.nativeName ? Object.values(country.name.nativeName)[0].common: 'No currencies available'}`
        document.querySelectorAll("li")[1].innerHTML = `Population: ${country.population}`
        document.querySelectorAll("li")[2].innerHTML = `Region: ${country.region}`
        document.querySelectorAll("li")[3].innerHTML = `Sub Region: ${country.subregion}`
        document.querySelectorAll("li")[4].innerHTML = `Captial: ${country.capital}`
        document.querySelectorAll('li')[5].innerHTML = `Top Level Domain: ${country.tld}`
        document.querySelectorAll("li")[6].innerHTML = `Currency: ${country.currencies ? Object.values(country.currencies)[0].name : 'No currencies available'}`
        document.querySelectorAll("li")[7].innerHTML = `Languages: ${country.languages ? Object.values(country.languages).join(', ') : 'No languages available'}`

        const AllCountries = await loadAllCountries();
        let Borders = FindBoarders(country.borders , AllCountries );
        if (Borders == "no Border countries")
        {
            let theBorders = document.querySelector(".Border-Countries").cloneNode(true);
            theBorders.classList.add("border-countries");
            theBorders.classList.remove("Border-Countries");

            theBorders.innerText =Borders;

            document.querySelector(".Borders").appendChild(theBorders);

        } else {
            Borders.forEach((border)=>{
                let theBorders = document.querySelector(".Border-Countries").cloneNode(true);
                theBorders.classList.add("border-countries");
               // theBorders.classList.remove("Border-countries");   not executed

                theBorders.innerText = border;

            document.querySelector(".Borders").appendChild(theBorders);


            })
        
        }

    }
    
    function redirectToRoot() {
        window.location.href = "index.html";
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
            
            //console.log(countryName);
            return countryName[0]; 
        } catch (error) {
            console.error('Error:', error);
            return []; 
    }
    }

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

    function toggleHeader(){
        let ModeSelect = document.querySelector('#theme-selector');
        ModeSelect.classList.toggle('dark-mode');
        document.body.classList.toggle('dark-mode');
        document.querySelector('h1').classList.toggle('dark-mode');
    
        if (ModeSelect.classList.contains('dark-mode')) {
            document.querySelector('#theme-selector img').src= 'public/icons/sun.png';
            ModeSelect.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.nodeValue = 'Light mode';
            }
        });
            }
            else {
            document.querySelector('#theme-selector img').src= 'public/icons/crescent-moon.png';
            ModeSelect.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.nodeValue = 'Dark mode';
            }
        
        });
        
            }
    }

    function FindBoarders(BorderCodes ,CountriesFullData){
  
        let BoarderCountries=[];
         if (BorderCodes) {
         for (let i = 0 ; i < BorderCodes.length ; i++) {
          const country = CountriesFullData.find(country => country.cca3 === BorderCodes[i]);
          BoarderCountries.push(country.name.common);
         }
         
        return BoarderCountries;
         }
         else {
          return "no Border countries";
         }
      }
    