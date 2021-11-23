const form = document.querySelector('.row.g-3')
const resultContainer = document.querySelector('#resultContainer');

form.addEventListener('submit',async (e) => {
    e.preventDefault();
    resultContainer.innerHTML ='';
    const input = form.elements.searchBox.value;
    const config = {params:{q:input}};
    const res= await axios.get('https://api.tvmaze.com/search/shows',config); 
    resData(res.data)
    console.log(res.data)
    form.elements.searchBox.value='';
})

const resData = (shows) => {
    let containerDiv = document.createElement('div');
    containerDiv.classList.add('container')
    let rowDiv = document.createElement('div')
    rowDiv.classList.add('row');
    resultContainer.append(createHeading());
    for (result of shows) {
        //creating the divs
        let colDiv = document.createElement('div');
        let cardDiv = document.createElement('div');
        //addding classlist to the divs
        colDiv.classList.add('col-sm-2');
        cardDiv.classList.add('card','text-dark','bg-light','border-danger','mb-3');


        //appending the divs in order
        containerDiv.append(rowDiv);
        rowDiv.append(colDiv);
        
        //adding the image
        cardDiv.append(addingImage(result));

        //adding the name:
        cardDiv.append(addingName(result));

        //adding the card element to the column
        colDiv.append(cardDiv);
           


        //adding the container of the body
        
        resultContainer.append(containerDiv) ;
    }
}

//creating a heading for the results:

const createHeading = () => {
    const h1 = document.createElement('h1');
    h1.classList.add('display-6');
    h1.innerText = 'TV SHOWS';
    return h1
}

// Adding the image by passing the resulting individual show results as parameter.
const addingImage = (imgData) =>{
    if (imgData.show.image){
       
        const img = document.createElement('img');
        img.src = imgData.show.image.medium;
        img.classList.add('card-img-top')
        // cardDiv.append(img)
        // return cardDiv
        return img
    } else {
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        const img = document.createElement('p');
        img.innerText= 'NO IMAGE';
        // cardDiv.append(img)
        // return cardDiv
        return img
        
    }
}
   

//adding the name of the shows
const addingName = (nameData) => {
    let cardBody= document.createElement('div');
    let cardTitle = document.createElement('h5');
    cardBody.classList.add('card-body');
    cardTitle.classList.add('card-title');
    cardTitle.innerText = nameData.show.name;
    cardBody.append(cardTitle);
    return cardBody
}