console.log('client side javascript file is loaded');

// fetch('https://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(data); 
//     });
// })






const weatherForm = document.querySelector('form');
const searchValue = document.querySelector('input');    
const messageOne = document.querySelector('#message-1');    
const messageTwo = document.querySelector('#message-2'); 

messageOne.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchValue.value;

    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;    
            }else{
                messageOne.textContent = '';
                // messageTwo.textContent = data.weather;
                // console.log(data.address);
                // console.log(data.weather);
                
                let weatherIconImg = document.createElement('img');
                let locationPara = document.createElement('p');
                let lattitudePara = document.createElement('p');
                let longitudePara = document.createElement('p');
                let tempPara = document.createElement('p');
                let descriptionPara = document.createElement('p');
                let HumidityPara = document.createElement('p');
                let windSpeedPara = document.createElement('p');
                let visibilityPara = document.createElement('p');
                tempPara.textContent = 'Temperature: ' + data.temp + '°C';
                locationPara.textContent = 'Location: ' + data.location;
                lattitudePara.textContent = 'Lattitude: ' + data.lattitude;
                longitudePara.textContent = 'Longitude: ' + data.longitude;
                descriptionPara.textContent = 'Description: ' + data.description;
                weatherIconImg.src = data.icon;
                HumidityPara.textContent = 'Humidity: ' + data.humidity + '%';
                windSpeedPara.textContent = 'Wind Speed: ' + data.windSpeed + 'km/hr';
                visibilityPara.textContent = 'Visibility: ' + data.visibility + 'km';


                messageTwo.append(weatherIconImg);
                messageTwo.append(locationPara);
                messageTwo.append(lattitudePara);
                messageTwo.append(longitudePara);
                messageTwo.append(tempPara);
                messageTwo.append(descriptionPara);
                messageTwo.append(HumidityPara);
                messageTwo.append(windSpeedPara);
                messageTwo.append(visibilityPara);

            }
        });
    })
    // console.log(location);
})