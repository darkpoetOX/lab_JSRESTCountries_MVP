const fetchCountry = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const jsonData = await response.json();
    return jsonData;
}

let allCountriesData = [];

const filterCountries = searchValue => {
    const filteredCountries = allCountriesData.filter(country => {
        const countryNameCommon = country.name.common.toLowerCase();
        return countryNameCommon.includes(searchValue.toLowerCase());
    });
    return filteredCountries;
};

const clearList = () => {
    const characterUl = document.querySelector("#countriesList");
    characterUl.innerHTML = "";
};

// const populateFilteredCountries = filteredCountries => {
//     const characterUl = document.querySelector("#countriesList");
//     characterUl.innerHTML = ""; // gets rid of all content and elements within <ul> element i.e. the <p>Awaiting API...</p>

//     filteredCountries.forEach(country => {
//         const CharacterLi = document.createElement("li");
//         CharacterLi.textContent = `Name: ${country.name.common}, Population ${country.population}`;
//         characterUl.appendChild(CharacterLi);
//     });
// }

const populateCountries = countries => {
    const characterUl = document.querySelector("#countriesList");

    countries.forEach(country => {
        const CharacterLi = document.createElement("li");
        CharacterLi.textContent = `Name: ${country.name.common}, Population ${country.population}`;
        characterUl.appendChild(CharacterLi);
    });
    
};
// const populateCountries = async () => {
//     const characterUl = document.querySelector("#countriesList");
//     characterUl.innerHTML = ""; // gets rid of all content and elements within <ul> element i.e. the <p>Awaiting API...</p>

//     allCountriesData.forEach(country => {
//         const CharacterLi = document.createElement("li");
//         CharacterLi.textContent = `Name: ${country.name.common}, Population ${country.population}`;
//         characterUl.appendChild(CharacterLi);
//     });
    
// };

const handleSubmission = event => {
    event.preventDefault(); // prevents page from reloading with each submission
    const inputValue = document.querySelector('#userInput').value;
    const filteredCountries = filterCountries(inputValue);
    clearList();
    populateCountries(filteredCountries);

}


const setUp = async () => {
    allCountriesData = await fetchCountry();
    clearList();
    populateCountries(allCountriesData); // have all countries to start with on page
}

document.addEventListener('DOMContentLoaded', () => {
    setUp();
    
    const form = document.querySelector("form[action]"); //using action attribute to choose the form
    form.addEventListener("submit", handleSubmission);
    
    const submissionButton = document.querySelector('#submitButton')
    submissionButton.addEventListener('click', handleSubmission);


});


