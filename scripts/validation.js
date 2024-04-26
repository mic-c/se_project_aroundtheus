// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(
  formElementElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    "#${inputElement.id}-error"
  );
  inputElement.classList.add("options.inputErrorClass");
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

function hideInputError(
  formElementElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    "#${inputElement.id}-error"
  );
  inputElement.classList.remove("options.inputErrorClass");
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(errorClass);
}

function checkInputValidity(formElementElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    return showInputError(formElementElement, inputElement, options);
  }

  hideInputError(formElementElement, inputElement, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass }
) {
  if (hasInvalidInput(inputElements)) {
    submitButton.class.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }

  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const inputElements = [...formElement.querySelectorAll("inputSelector")];
  const submitButton = formElement.querySelector(".modal__button");

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElementElement, inputElement, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll("options.formSelector")];
  formElements.forEach((formElement) => {
    console.log(formElement);
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
