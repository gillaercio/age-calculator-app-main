function calculateAge(event) {
  event.preventDefault()

  const dayField = document.querySelector('.date-input--day .date-input__field');
  const monthField = document.querySelector('.date-input--month .date-input__field');
  const yearField = document.querySelector('.date-input--year .date-input__field');
  
  const inputs = [dayField, monthField, yearField];
  const errorMessages = document.querySelectorAll('.error-message');
  
  let hasError = false;
  
  inputs.forEach((input, index) => {
    const message = errorMessages[index];
    const label = input.parentElement.querySelector('.date-input__label');
  
    if(input.value.trim() === "") {
      message.textContent = "This field is required";
      // message.style.display = "block";
      message.classList.add("visible");
      
      input.classList.add("input-error");
      label.classList.add("label-error");
      hasError = true;
    } else {
      message.textContent = "";
      // message.style.display = "none";
      message.classList.remove("visible");

      input.classList.remove("input-error");
      label.classList.remove("label-error");
    }
  });

  if (hasError) return;

  const dayInput = Number(dayField.value);
  const monthInput = Number(monthField.value);
  const yearInput = Number(yearField.value);
  
  const dayResult = document.querySelector('.results__items--days .results__value');
  const monthResult = document.querySelector('.results__items--months .results__value');
  const yearResult = document.querySelector('.results__items--years .results__value');

  const today = new Date();
  const birth = new Date(yearInput, monthInput - 1, dayInput);

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
 
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += lastMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  yearResult.textContent = years;
  monthResult.textContent = months;
  dayResult.textContent = days;
}