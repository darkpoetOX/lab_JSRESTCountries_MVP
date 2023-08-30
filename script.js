const fetchCountry = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const jsonData = await response.json();
    return jsonData;
}

let allCountriesData = [];

const filterCountries = inputValue => {
    const filteredCountries = allCountriesData.filter(country => {
        const countryNameCommon = country.name.common.toLowerCase();
        return countryNameCommon.includes(inputValue.toLowerCase());
    });
    return filteredCountries;
};

const populateFilteredCountries = filteredCountries => {
    const characterUl = document.querySelector("#countriesList");
    characterUl.innerHTML = ""; // gets rid of all content and elements within <ul> element i.e. the <p>Awaiting API...</p>

    filteredCountries.forEach(country => {
        const CharacterLi = document.createElement("li");
        CharacterLi.textContent = `Name: ${country.name.common}, Population ${country.population}`;
        characterUl.appendChild(CharacterLi);
    });
    
};

const populateCountries = async () => {
    const characterUl = document.querySelector("#countriesList");
    characterUl.innerHTML = ""; // gets rid of all content and elements within <ul> element i.e. the <p>Awaiting API...</p>

    allCountriesData.forEach(country => {
        const CharacterLi = document.createElement("li");
        CharacterLi.textContent = `Name: ${country.name.common}, Population ${country.population}`;
        characterUl.appendChild(CharacterLi);
    });
    
};

const handleSubmission = () => {
    const inputValue = document.querySelector('#userInput').value;
    const filteredCountries = filterCountries(inputValue);
    populateFilteredCountries(filteredCountries);

}


const setUp = async () => {
    allCountriesData = await fetchCountry();
    populateCountries();
}

document.addEventListener('DOMContentLoaded', () => {
    setUp();
    
    const form = document.querySelector("form[action]"); //using action attribute to choose the form
    form.addEventListener("submit", handleSubmission);
    const submissionButton = document.querySelector('#submitButton')
    submissionButton.addEventListener('click', handleSubmission);


});


