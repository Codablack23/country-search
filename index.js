{/* <div class="col-12 col-md-4 col-lg-3 p-3">
<div class="country w3-card rounded bg-white">
    <div class="flag-container">
        <img src="" alt="" class="flag-img">
    </div>
    <div class="country-details w-75 m-auto">
        <h4 class="country-name"><b>Germany</b></h4>
        <p><b>Population</b>:14,000</p>
        <p><b>Region</b>:Europe</p>
        <p><b>Capital</b>:Berlin</p>
    </div>
</div>
</div> */}

function generateHTML(country){
    const parent = generateElement({
        type:'div',
        all_class:['col-12','col-md-4','col-lg-3','p-4',],
        id:country.cca3,
        event:{
            type:'click',
            eventFunction(e){
                country_section.classList.toggle('shown')
                country_detail.classList.toggle('shown')
                setCurrentDetails(manipulateCountry(country))
                console.log(country)
               
                             
            }

        },
        all_children:[
            generateElement({
               type:'div',
               all_class:['country','w3-card'],
               id:country.cca2,
               all_children:[
                generateElement({
                type:'div',
                all_class:['flag-container'],
                all_children:[
                    generateElement({
                        type:'img',
                        all_class:['flag-img'],
                        src:country.flags.svg,
                        all_children:[]
                    })
                ]
                }),
                generateElement({
                    type:'div',
                    all_class:['country-details','w-75','m-auto'],
                    all_children:[
                        generateElement({
                            type:'h4',
                            all_class:['country-name'],
                            all_children:[document.createTextNode(`${country.name.common}`)]
                        }),
                        generateElement({
                            type:'p',
                            all_class:[],
                            all_children:[
                                generateElement({
                                    type:'b',
                                    all_class:[],
                                    all_children:[document.createTextNode(`Population:`)]
                                }),
                                document.createTextNode(`${country.population}`)
                            ]
                        }),
                        generateElement({
                            type:'p',
                            all_class:[],
                            all_children:[
                                generateElement({
                                    type:'b',
                                    all_class:[],
                                    all_children:[document.createTextNode(`Region:`)]
                                }),
                                document.createTextNode(`${country.region}`)
                            ]
                        }),
                        generateElement({
                            type:'p',
                            all_class:[],
                            all_children:[
                                generateElement({
                                    type:'b',
                                    all_class:[],
                                    all_children:[document.createTextNode(`Capital:`),
                                    document.createTextNode(`${country.capital?country.capital[0]:""}`)
                                ]
                                }),
                                
                            ]
                        }),

                    ]
                })
               ]
            })
        ]
    })
    return parent
}

const img = document.querySelector('.flag-img')
const countryContainer = document.querySelector('.all-countries-row')
const search = document.querySelector('#search-country')
const region_select = document.querySelector('#select-region')
const themeToggler = document.querySelector('.themeToggler')
const mycomp = document.querySelector('.main-container')
const country_section = document.querySelector('.country-search-area')
const country_detail = document.querySelector('.selected-country-detail')
const backBtn = document.querySelector('.back-btn')

backBtn.addEventListener('click',()=>{
    country_section.classList.toggle('shown')
    country_detail.classList.toggle('shown')
})
const current_country ={
    name:{
        class:"current_country_name",
        value:""
    },
    img:{
        class:"selected-img",
        value:""
    },
    native_name:{
        class:"native-name",
        value:""
    },
    region:{
        class:"region",
        value:""
    },
    sub_region:{
        class:"sub-region",
        value:""
    },
    population:{
        class:"population",
        value:""
    },
    capital:{
        class:"capital",
        value:""
    },
    borders:{
        class:"borders-list",
        value:""
    },
    currencies:{
        class:"currencies",
        value:""
    },
    languages:{
        class:"languages",
        value:""
    },
    domain:{
        class:"top-level-domain",
        value:""
    },
}

function manipulateCountry(country){
    var native_name= []
    var currencies=[]
    var languages = []
     for(key in country.name.nativeName){
         native_name.push(country.name.nativeName[key].common)
     }
     for(key in country.currencies){
         currencies.push(country.currencies[key].name)
     }
     for(key in country.languages){
         languages.push(country.languages[key])
     }
     var new_object = {
         name:country.name.common,
         native_name:native_name.map(native=>`${native} `).toString(),
         region:country.region,
         sub_region:country.subregion,
         img:country.flags.svg,
         population:country.population,
         capital:country.capital?country.capital[0]:"",
         borders:country.borders?country.borders:[],
         currencies:currencies.map(currency=>`${currency} `).toString(),
         languages:languages.map(lang=>`${lang} `).toString(),
         domain:country.tld[0],
     }
     return new_object
}
function setCurrentDetails(user_detail){
    
    for( key in user_detail){
          current_country[key].value = user_detail[key]
    }
    for(key in current_country){
       var  element = document.querySelector(`.${current_country[key].class}`)
        if (current_country[key].class === "selected-img"){
        element.src = current_country[key].value
        }
       if (current_country[key].class === "borders-list"){
         element.innerHTML = ""
         if( current_country[key].value.length > 0){
            current_country[key].value.forEach(border=>{
                element.appendChild(generateElement({
                    type:'button',
                    all_class:['btn','component','w3-card','w3-text-grey'],
                    all_children:[
                        document.createTextNode(border)
                    ],
                    event:{
                       type:'click',
                       eventFunction(e){
                          const new_country = countryArray.find(c=>c.cca3 === border)
                          setCurrentDetails(manipulateCountry(new_country))
                          console.log(new_country)
                       }
                    }
                }))
             })
          }else{
            element.innerHTML = ""
          }
       }else{
        element.innerHTML = current_country[key].value
       }
    }
    
}


var countryArray=[]
var theme = {
    light:{
        background:' hsl(0, 0%, 98%)',
        color:"hsl(200, 15%, 8%)",
        component:'hsl(0, 0%, 100%)'
    },
    dark:{
        background:': hsl(207, 26%, 17%)',
        color:" hsl(0, 0%, 100%)",
        component:'hsl(209, 23%, 22%)'
    }
}
let isLight = true
let currentTheme = theme.light

function toggleTheme(){
    isLight = !isLight
    if(isLight){
      currentTheme = theme.light
    }
    else{
        currentTheme = theme.dark
    }
}

const getCountries = async ()=>{
   
}
const populateCountries = async ()=>{
    const all_countries = await fetch('https://restcountries.com/v3.1/all')
    const countries = await all_countries.json()
    countryArray = countries 
    console.log(countries)
    countryArray.sort((a,b)=>a.name.common.localeCompare(b.name.common)).forEach(country=>{
       countryContainer.appendChild(generateHTML(country))
    })
}
const generateElement=(el)=>{
    const element = document.createElement(el.type)
    if (el.src != undefined){
     element.src = el.src
    }
    if(el.all_class.length > 0){
        el.all_class.forEach(cl => {
           element.classList.add(cl) 
        });
    }
    if(el.id){
        element.id =el.id
    }
    el.all_children.forEach(ch=>{
        element.appendChild(ch)
    })
    if(el.event){
        element.addEventListener(el.event.type,el.event.eventFunction)
    }
    return element
}
window.addEventListener('load',()=>{
    populateCountries()
    styleComponents()
})

const filterCountries= (e)=>{
        countryArray.forEach(c=>{
            let el = document.querySelector(`#${c.cca3}`)
            if(c.name.common.toLowerCase().includes(e.target.value.toLowerCase())){
               el.style.display = 'block'
            }
            else{
                el.style.display = 'none'
            }
           
        })
}
const selectRegion= (e)=>{
  
    countryArray.forEach(c=>{
        let el = document.querySelector(`#${c.cca3}`)
        if (e.target.value == ''){
            el.style.display = 'block'
        }
        else{
            if(c.region.toLowerCase() === e.target.value.toLowerCase()){
                el.style.display = 'block'
             }
             else{
                 el.style.display = 'none'
             }
        }
       
    })
}
search.addEventListener('input',filterCountries)
region_select.addEventListener('change',selectRegion)

const components = document.querySelectorAll('.component')

const styleComponents =()=>{
    mycomp.classList.toggle('light-theme')
    mycomp.classList.toggle('dark-theme')
    components.forEach((comp)=>{
        comp.style.background = currentTheme.component
        comp.style.color = currentTheme.color
    })
    countryArray.forEach(c=>{
        let el = document.querySelector(`#${c.cca2}`)
        el.style.background = currentTheme.component,
        el.style.color = currentTheme.color
    })
}


themeToggler.addEventListener('click',()=>{
    toggleTheme()
    styleComponents()
})



