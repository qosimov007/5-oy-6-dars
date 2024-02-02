const name = document.getElementById('name');
const img = document.getElementById('img');
const prise = document.getElementById('prise');
const year = document.getElementById('year');
const turi = document.getElementById('turi');
const color = document.getElementById('color');
const button = document.getElementById('button');
const izoh = document.getElementById('izoh');
const form = document.getElementById('form');
const dataWrapper= document.getElementById('data-wrapper');


    function isValidUrl(string) {
        try {
          new URL(string);
          return true;
        } catch (err) {
          return false;
        }
      }



function validate(name, prise, year, color, izoh) {
    if (!name.value) {
        alert('nomini kiritish shart');
        name.focus();
        return false;
    }

    if (name.value.trim().length < 3) {
        alert('nomi kamida 4 ta belgidan iborat bolishi  shart');
        name.focus();
        return false;
    }

    if (!prise.value) {
        alert('narxini kiritish shart');
        prise.focus();
        return false;
    }


    if (!img.value) {
        alert('rasm kiritish shart');
        img.focus();
        return false;
    }

if(!isValidUrl(img.value)){
    alert('rasm notogri kiritildi ');
    img.focus();
    return false;
}

    if (isNaN(Number(prise.value))) {
        alert('narxi raqamda kiritish shart');
        prise.focus();
        return false;
    }

    if (!year.value) {
        alert('yilini kiritish shart');
        year.focus();
        return false;
    }

    if (!color.value) {
        alert('rangini kiritish shart');
        color.focus();
        return false;
    }

    return true;
}



function getDate(){
    let data = [];

    if(localStorage.getItem('cars')){
        data= JSON.parse(localStorage.getItem('cars'))
    }

    return data;
}

button && button.addEventListener('click', function (e) {
    e.preventDefault();
    if (validate(name, prise, year, color, izoh)) {
        let car= {
            name: name.value,
            prise:prise.value,
            year:year.value,
            color:color.value,
            img:img.value,
            izoh:izoh.value,
            status:'active',
            id: Date.now()
        }

        let data =getDate();
        data.push(car);
        localStorage.setItem('cars', JSON.stringify(data));

        form.reset();
    } else {
        console.log('validatsadan otmadi');
    }


});


function createCard(car){
    return `
    <div class="data-wrapper ">
    <div class="border row mb-5 mt-5 ">
   <div class="col-2 p-3 ">
    <img   width="200" height="200" src="${car.img}" alt="">
   </div>
   <div class="col-10 ml-215">
    <div class="wrapper d-flex justify-content-between">
      <h3 class="fs-3">${car.name}</h3>
      <button class="btn btn-info text-white">batafsil</button>
    </div>
    <h4>${car.prise}</h4>
    <h5 >${car.color}</h5>
    <h5 >${car.year}</h5>
    <h5 >Chevrolet</h5>
    <h5 >
    <p> ${car.izoh}</p>
    </h5>

   </div>
    </div>
  </div>
    `
}

document.addEventListener("DOMContentLoaded", function(){
    let cars = getDate();
    cars.length && cars.forEach(car => {
        let card=createCard(car);
        dataWrapper.innerHTML += card;
    });
})