const accessKey = "pAsBUL1YHc0XAxo5SnVR33_hkYtnw9o1MTlwoy0xYUM"

// first import all the important element 
const formEl  = document.querySelector("form")
const inputEl = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-button")

let inputData =" "
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    
    const response = await fetch(url)  //fetch the url
    const data = await response.json()  // convert into json file

    const results = data.results  //display the data in the form of image

    if(page ===1){  
        searchResults.innerHTML="" //if the page is one display on the page nothing (made  use of inner HTML)
    }

    results.map((result)=>{
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add("search-result")
        const image = document.createElement("img")
        image.src= result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html
        imageLink.target ="_blank"
        imageLink.textContent = result.alt_description

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)
    });
    page++
    if(page>1){
        showMore.style.display = "block"
    }
}

// form element

formEl.addEventListener("submit" ,(event)=>{
    event.preventDefault()
    page=1;
    searchImages()

})
showMore.addEventListener("click" ,(event)=>{
   
    searchImages()

})