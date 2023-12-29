const refs = {
  form: document.querySelector("form"),
  checkbox: document.querySelector(".toggle-checkbox"),
  hourlyTitle: document.querySelector(".hourly-title"),
  monthTitle: document.querySelector(".month-title"),
  info: document.querySelector(".info"),
  rate: document.querySelector(".rate"),
  age: document.querySelector(".age"),
  ageItem: document.querySelector(".age-item"),
  hoursItem: document.querySelector(".hours-item"),
  hours50Item: document.querySelector(".hours-50-item"),
  amountHours: document.querySelector(".amount-hours"),
  amount50: document.querySelector(".amount-50"),
  amount100: document.querySelector(".amount-100"),
  vacations: document.querySelector(".vacations"),
  l4: document.querySelector(".l4"),
  submitBtn: document.querySelector(".send-btn"),
  clearBtn: document.querySelector(".clear-btn"),
  titleBrutto: document.querySelector(".salary-brutto"),
  titleNetto: document.querySelector(".salary-netto"),
  bonus: document.querySelector(".bonus"),
  inputs: document.querySelectorAll('input[type="number"'),
  results: document.querySelector(".result"),
  closeSalaryBtn: document.querySelector(".close-salary-btn"),
};

refs.info.addEventListener("input", maxedLengthInput);

function maxedLengthInput(e) {
  if (e.target.tagName !== "INPUT") {
    return;
  }
  refs.inputs.forEach((input) => {
    if (input.value.length > 5) {
      input.value = input.value.slice(0, 5);
    }
  });
}

refs.checkbox.addEventListener("change", checkRateType);

function checkRateType() {
  if (refs.checkbox.checked) {
    refs.hourlyTitle.style.color = "rgb(156, 156, 156)";
    refs.hourlyTitle.style.backgroundColor = "white";
    refs.hourlyTitle.style.border = "1px solid rgb(156, 156, 156)";
    refs.monthTitle.style.color = "white";
    refs.monthTitle.style.backgroundColor = "#38a8d4";
    refs.monthTitle.style.border = "none";
  } else {
    refs.hourlyTitle.style.color = "white";
    refs.hourlyTitle.style.backgroundColor = "#38a8d4";
    refs.hourlyTitle.style.border = "none";
    refs.monthTitle.style.color = "rgb(156, 156, 156)";
    refs.monthTitle.style.backgroundColor = "white";
    refs.monthTitle.style.border = "1px solid rgb(156, 156, 156)";
  }
}

refs.submitBtn.addEventListener("click", sumSalary);

function sumSalary() {
  let brutto;
  let netto;
  let fifth;
  let hundred;
  let urlop;
  let chorobowe;
  let clear;
  let tax;
  let rateClear = 0;

  if (refs.age.value < 26) {
    tax = 0.7853;
  } else if (refs.age.value >= 26) {
    tax = 0.7321;
  }

  if (!refs.checkbox.checked) {
    clear = refs.rate.value * refs.amountHours.value;

    if (!refs.amount50.value) {
      fifth = 0;
    } else {
      fifth = refs.rate.value * refs.amount50.value * 1.5;
    }
    if (!refs.amount100.value) {
      hundred = 0;
    } else {
      hundred = refs.rate.value * refs.amount100.value * 2;
    }
    if (!refs.vacations.value) {
      urlop = 0;
    } else {
      urlop = refs.rate.value * refs.vacations.value * 1.1 * 8;
    }
    if (!refs.l4.value) {
      chorobowe = 0;
    } else {
      chorobowe = refs.rate.value * refs.l4.value * 0.8 * 8;
    }
  } else {
    clear = Number(refs.rate.value);

    if (refs.amountHours.value) {
      rateClear = refs.rate.value / refs.amountHours.value;

      if (!refs.amount50.value) {
        fifth = 0;
      } else {
        fifth = rateClear * refs.amount50.value * 1.5;
      }
      if (!refs.amount100.value) {
        hundred = 0;
      } else {
        hundred = rateClear * refs.amount100.value * 2;
      }
      if (!refs.vacations.value) {
        urlop = 0;
      } else {
        urlop = rateClear * refs.vacations.value * 1.1 * 8;
      }
      if (!refs.l4.value) {
        chorobowe = 0;
      } else {
        chorobowe = rateClear * refs.l4.value * 0.8 * 8;
      }
    } else if (!refs.amountHours.value) {
      fifth = 0;
      hundred = 0;
      urlop = 0;
      chorobowe = 0;
    }
  }
  brutto =
    clear + fifth + hundred + urlop + chorobowe + Number(refs.bonus.value);
  netto = brutto * tax;
  refs.titleBrutto.textContent = brutto.toFixed(2);
  refs.titleNetto.textContent = netto.toFixed(2);
  refs.results.classList.add("show-result");
}

refs.closeSalaryBtn.addEventListener("click", hideResults);
refs.clearBtn.addEventListener("click", clearForm);

function hideResults() {
  refs.results.classList.remove("show-result");
}

function clearForm() {
  refs.form.reset();
}
