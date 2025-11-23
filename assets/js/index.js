function calculateAge() {
  const dayInput = Number(document.querySelector('.date-input--day .date-input__field').value);
  const monthInput = Number(document.querySelector('.date-input--month .date-input__field').value);
  const yearInput = Number(document.querySelector('.date-input--year .date-input__field').value);
  
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