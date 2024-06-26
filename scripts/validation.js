const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) => {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.add(errorClass);
};

const hideInputError = (
  formElement,
  inputElement,
  { errorClass, inputErrorClass }
) => {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.remove(inputErrorClass);
  errorMessageElement.classList.remove(errorClass);
  errorMessageElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      options
    );
  } else {
    hideInputError(formElement, inputElement, options);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const disableSubmitButton = (submitButton, { inactiveButtonClass }) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
};

const enableSubmitButton = (button, { inactiveButtonClass }) => {
  button.classList.remove(inactiveButtonClass);
  button.disabled = false;
};

const toggleButtonState = (
  inputElements,
  submitButton,
  inactiveButtonClass
) => {
  if (hasInvalidInput(inputElements)) {
    disableSubmitButton(submitButton, inactiveButtonClass);
  } else {
    enableSubmitButton(submitButton, inactiveButtonClass);
  }
};

function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(options.submitButtonSelector);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
