'use strict';


/********** GLOBALS******/

let productArray = [];
let votingRounds = 25;

/******** DOM WINDOWS  *******/

let imgContainer = document.getElementById('img-container');

let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('show-results-btn');
//let resultList = document.getElementById('results-container');

//*************CANVAS ELEMENT FOR CHART ************
let ctx = document.getElementById('my-chart');


/******** CONSTRUCTOR FUNCTION *******/
function ProductObj(name, fileExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.votes = 0;
  this.views = 0;
}

let indexArray = [];

/*********HELPER FUNCTIONS *********/
function renderImages() {
  


  while(indexArray.length < 6)
  {
    let randomNum = randomIndex();
    if(!indexArray.includes(randomNum))
    {
      indexArray.push(randomNum);
    }
  }

  console.log(indexArray);
  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();
  // let imgOneIndex = randomIndex();
  // let imgTwoIndex = randomIndex();
  // let imgThreeIndex = randomIndex();

  // //IMAGES HAVE TO BE UNIQUE
  // while (imgTwoIndex === imgOneIndex) {
  //   imgTwoIndex = randomIndex();
  // }
  // while (imgThreeIndex === imgOneIndex || imgThreeIndex === imgTwoIndex) {
  //   imgThreeIndex = randomIndex();
  // }

  imgOne.src = productArray[imgOneIndex].image;
  imgOne.title = productArray[imgOneIndex].name;
  imgOne.alt = `this is an image of ${productArray[imgOneIndex].name}`;
  imgTwo.src = productArray[imgTwoIndex].image;
  imgTwo.title = productArray[imgTwoIndex].name;
  imgTwo.alt = `this is an image of ${productArray[imgTwoIndex].name}`;
  imgThree.src = productArray[imgThreeIndex].image;
  imgThree.title = productArray[imgThreeIndex].name;
  imgThree.alt = `this is an image of ${productArray[imgThreeIndex].name}`;

  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;

}

/*********************RENDER CHART ***********************/


function renderChart() {

  let prodNames = [];
  let prodVotes = [];
  let prodViews = [];

  for(let i = 0; i < productArray.length; i++)
  {
    prodNames.push(productArray[i].name);
    prodVotes.push(productArray[i].votes);
    prodViews.push(productArray[i].views);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: prodNames,
      datasets: [{
        label: '# of Votes',
        data: prodVotes,
        borderWidth: 2,
        backgroundColor: ['blue'],
        borderColor: ['black']
      },
      {
        label: '# of Views',
        data: prodViews,
        borderWidth: 2,
        backgroundColor: ['red'],
        borderColor: ['black']
      },
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  };
  new Chart(ctx, chartObj);
}

function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

function handleImageClick(event) {
  let imgClicked = event.target.title;

  for (let i = 0; i < productArray.length; i++) {
    if (imgClicked === productArray[i].name) {
      productArray[i].votes++;
    }
  }
  votingRounds--;
  renderImages();

  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleImageClick);
  }
}

function handleShowResults() {
  if (votingRounds === 0) {
    renderChart();
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

/******* EXECUTABLE CODE ********/

let sweep = new ProductObj('sweep', 'png');
let bag = new ProductObj('bag');
let banana = new ProductObj('banana');
let bathroom = new ProductObj('bathroom');
let boots = new ProductObj('boots');
let breakfast = new ProductObj('breakfast');
let bubblegum = new ProductObj('bubblegum');
let chair = new ProductObj('chair');
let cthulhu = new ProductObj('cthulhu');
let dogDuck = new ProductObj('dog-duck');
let dragon = new ProductObj('dragon');
let pen = new ProductObj('pen');
let petSweep = new ProductObj('pet-sweep');
let scissors = new ProductObj('scissors');
let shark = new ProductObj('shark');
let tauntaun = new ProductObj('tauntaun');
let unicorn = new ProductObj('unicorn');
let waterCan = new ProductObj('water-can');
let wineGlass = new ProductObj('wine-glass');

productArray.push(sweep, bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, tauntaun, unicorn, waterCan, wineGlass);



imgContainer.addEventListener('click', handleImageClick);
resultsBtn.addEventListener('click', handleShowResults);
renderImages();
