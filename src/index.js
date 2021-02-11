
let allDogData = []

const main = () => {
    fetchDogs()
    handleDogFilter()   
}

fetchDogs = () => {
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(dogs => {
        allDogData = dogs
        createSpan(allDogData)
    })
}



createSpan = (dog) => {
    dogs.forEach(dog => {
        
    
    const dogBar = document.querySelector('#dog-bar')
    const span = document.createElement('span')
    span.innerText = dog.name
    span.setAttribute('id', dog.id)
    dogBar.appendChild(span)

    //const span = document.querySelector('span')
    span.addEventListener('click', function(e){
        handleClick(e)
    })
})
    
} 

handleClick = (e) => {
    id = parseInt(e.target.id, 10)
    dog = allDogData.find(dog => dog.id === id)
    const dogInfo = document.querySelector('#dog-info')
    dogInfo.innerHTML = ""

    const image = document.createElement('img')
    image.src = dog.image

    const h2 = document.createElement('h2')
    h2.innerText = `${dog.name}`

    const btn = document.createElement('button')
    btn.innerText = dog.isGood ? "Good Dog!" : "Bad Dog!"
    btn.setAttribute('id', dog.id)

    btn.addEventListener('click', function(e) {
            handleGoodClick(e)
    })
    dogInfo.append(image, h2, btn)
    
}

handleGoodClick = (e) => {
    id = parseInt(e.target.id, 10)
    dog = allDogData.find(dog => dog.id === id)
    
    let dogStatus
    if (dog.isGood){
        dogStatus = false
        e.target.innerText = 'Bad Dog!'
    } else {
        dogStatus = true
        e.target.innerText = 'Good Dog!'
    }

    const newStatus = {
        isGood: dogStatus
    }

    const reqObject = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStatus)
    }
    
    fetch('http://localhost:3000/pups/' + `${id}`, reqObject)
    .then(resp => resp.json())
    .then(newDog => handleClick(e))
}

handleDogFilter = () => {
    const dogFilter = document.querySelector("#good-dog-filter")
    dogFilter.addEventListener('click', function(e) {
        if(e.target.innerText === "Filter good dogs: OFF"){
            e.target.innerText = "Filter good dogs: ON"
            allDogData.reduce
        } else {
            e.target.innerText = "Filter good dogs: OFF" 
        }
    })
   console.log(dogFilter)
}

main()
