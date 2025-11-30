document
  .querySelector(".calculate-divider__button")
  .addEventListener("click", calculateAge);

function calculateAge(event) {
  event.preventDefault()

  const dayField = document.querySelector('.date-input--day .date-input__field');
  const monthField = document.querySelector('.date-input--month .date-input__field');
  const yearField = document.querySelector('.date-input--year .date-input__field');
  
  const inputs = [dayField, monthField, yearField];
  const labels = document.querySelectorAll('.date-input__label');
  const errorMessages = document.querySelectorAll('.error-message');
  
  let hasError = false;
  
  inputs.forEach((input, index) => {
      input.classList.remove("input-error");
      labels[index].classList.remove("label-error");
      errorMessages[index].textContent = "";
      errorMessages[index].classList.remove("visible");
  });

  inputs.forEach((input, index) => {
    if(input.value.trim() === "") {
      errorMessages[index].textContent = "This field is required";
      errorMessages[index].classList.add("visible");
      input.classList.add("input-error");
      labels[index].classList.add("label-error");
      hasError = true;
    }
  });

  if (hasError) return;

  const day = Number(dayField.value);
  const month = Number(monthField.value);
  const year = Number(yearField.value);

  const currentYear = new Date().getFullYear();

  if (month < 1 || month > 12) {
    errorMessages[1].textContent = "Must be a valid month";
    errorMessages[1].classList.add("visible");
    monthField.classList.add("input-error");
    labels[1].classList.add("label-error");
    hasError = true;
  }

  if (day < 1 || day > 31) {
    errorMessages[0].textContent = "Must be a valid day";
    errorMessages[0].classList.add("visible");
    dayField.classList.add("input-error");
    labels[0].classList.add("label-error");
    hasError = true;
  }

  if (year > currentYear) {
    errorMessages[2].textContent = "Must be in the past";
    errorMessages[2].classList.add("visible");
    yearField.classList.add("input-error");
    labels[2].classList.add("label-error");
    hasError = true;
  }

  if (hasError) return;

  const testDate = new Date(year, month - 1, day);
  
  if (
    testDate.getFullYear() !== year ||
    testDate.getMonth() !== month - 1 ||
    testDate.getDate() !== day
  ) {
    errorMessages[0].textContent = "Must be a valid date";
    errorMessages[0].classList.add("visible");
    
    inputs.forEach((input, index) => {
      input.classList.add("input-error");
      labels[index].classList.add("label-error");
    });
    return;
  }
  
  const today = new Date();

  if (testDate > today) {
    errorMessages[2].textContent = "Must be in the past";
    errorMessages[2].classList.add("visible");
    yearField.classList.add("input-error");
    labels[2].classList.add("label-error");
    return;
  }

  let years = today.getFullYear() - year;
  let months = today.getMonth() - (month - 1);
  let days = today.getDate() - day;
 
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += lastMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  document.querySelector('.results__items--years .results__value').textContent = years;
  document.querySelector('.results__items--months .results__value').textContent = months;
  document.querySelector('.results__items--days .results__value').textContent = days;
}