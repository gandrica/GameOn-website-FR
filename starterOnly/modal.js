// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

const closeModalBtn = document.querySelector(".close");
const closeMessageBtn = document.querySelector(".message-close-btn");
const messageBtn = document.querySelector(".message-btn");
const topnav = document.querySelector(".topnav");

const form = document.querySelector("form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const tournoi = document.getElementById("tournoi");
const checkbox1 = document.querySelector("#checkbox1");
const message = document.getElementById("message");

const linkNavigation = document.querySelectorAll(".topnav a");
const firstLink = document.querySelector(".topnav a:first-of-type");
const linkNavigationResponsive = document.querySelector(".topnav a.icon");

function editNav() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav modal-open responsive") {
		x.className = "topnav modal-open";
	} else if (
		x.className === "topnav" ||
		x.className === "topnav modal-open"
	) {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = "block";
	topnav.className = "topnav modal-open";
}

//#1 - Fermer le modal avec le button X
// Close button function
const closeBtn = function () {
	modalbg.style.display = "none";
	topnav.classList.remove("modal-open");
};
//Close button event handler
closeModalBtn.addEventListener("click", closeBtn);

//#2 -Implémenter entrées du formulaire
//Validate form data function

const checkName = function (name) {
	const nameRegex = /^[a-zA-Z]{2,30}$/;
	const isValid = nameRegex.test(name.value + "")
		? formValidation(name)
		: formValidationError(name);
	if (isValid) return true;
	else return false;
};

const checkEmail = function (email) {
	const emailRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	const isValid = emailRegex.test(email.value + "")
		? formValidation(email)
		: formValidationError(email);
	if (isValid) return true;
	else return false;
};

const checkDate = function (dateInput) {
	const isValid = !(dateInput.value === null || dateInput.value === "")
		? formValidation(birthdate)
		: formValidationError(birthdate);
	return isValid;
};

const checkNumber = function (number) {
	const nameRegex = /^-?\d+$/;
	const isValid =
		number.value !== "" && nameRegex.test(+number.value)
			? formValidation(quantity)
			: formValidationError(quantity);
	return isValid;
};

const checkTournoi = function (element) {
	const isValid = element.querySelector('input[type="radio"]:checked')
		? formValidation(element)
		: formValidationError(element);
	return isValid;
};

const checkCheckbox = function (element) {
	const isValid = document.querySelector("#checkbox1:checked")
		? formValidation(element)
		: formValidationError(element);
	return isValid;
};

const createDivError = function (element, text) {
	const divError = document.createElement("div");
	divError.style.color = "red";
	divError.style.display = "inline-block";
	divError.style.margin = "0 0 6px 12px";
	divError.style.fontSize = ".6em";
	divError.classList.add(`error`);
	const divErrorText = document.createTextNode(text);
	divError.appendChild(divErrorText);
	element.appendChild(divError);
};

const formValidation = function (element) {
	element.style.border = "none";
	if (element.id === "tournoi") {
		const divErrorElement = tournoi.querySelector(`.error`);
		if (divErrorElement) {
			divErrorElement.style.display = "none";
		}
		return true;
	} else if (element.id === "checkbox1") {
		const divErrorParent = element.parentNode.querySelector(`.error`);
		const elementSibling = document.querySelector(`#${element.id}+label`);
		if (divErrorParent) {
			divErrorParent.style.display = "none";
			elementSibling.style.border = "none";
		}
		return true;
	} else {
		const divErrorParent = element.parentNode.querySelector(`.error`);
		if (divErrorParent) divErrorParent.style.display = "none";
		return true;
	}
};

const formValidationError = function (element) {
	const elementID = element.id;
	const parentElement = element.parentNode;
	const elementSibling = document.querySelector(`#${elementID}+label`);

	let divError = parentElement.querySelector(".error");
	let divErrorElement = element.querySelector(".error");
	element.style.border = "1px solid red";

	if (divError) {
		divError.style.display = "inline-block";
	} else if (divErrorElement) {
		divErrorElement.style.display = "inline-block";
	} else {
		if (elementID === "first") {
			createDivError(
				parentElement,
				`Veuillez entrer 2 caractères ou plus pour le champ du prénom.`
			);
		} else if (elementID === "last") {
			createDivError(
				parentElement,
				`Veuillez entrer 2 caractères ou plus pour le champ du nom.`
			);
		} else if (elementID === "email") {
			createDivError(parentElement, "L'email n'est pas valide");
		} else if (elementID === "birthdate") {
			createDivError(
				parentElement,
				"Vous devez entrer votre date de naissance."
			);
		} else if (elementID === "quantity") {
			createDivError(parentElement, "Saisissez une valeur numérique.");
		} else if (elementID === "tournoi") {
			element.innerHTML += "</br>";
			createDivError(element, "Vous devez choisir une option.");
		} else if (elementID === "checkbox1") {
			const checkboxError = document.querySelector(`#checkbox-error`);
			createDivError(
				checkboxError,
				"Vous devez vérifier que vous acceptez les termes et conditions."
			);
			elementSibling.style.border = "1px solid red";
		}
	}
	return false;
};

const verifyInputs = function () {
	checkTournoi(tournoi);
	checkCheckbox(checkbox1);
	checkNumber(quantity);
	checkDate(birthdate);
	checkEmail(email);
	checkName(lastName);
	checkName(firstName);

	if (
		checkTournoi(tournoi) &&
		checkCheckbox(checkbox1) &&
		checkNumber(quantity) &&
		checkDate(birthdate) &&
		checkEmail(email) &&
		checkName(lastName) &&
		checkName(firstName)
	) {
		console.log(true);
		return true;
	} else {
		console.log(false);
		return false;
	}
};

form.addEventListener("submit", (e) => {
	e.preventDefault();

	if (verifyInputs()) {
		modalbg.style.display = "none";
		message.style.display = "block";
		form.reset();
	}
});

closeMessageBtn.addEventListener("click", () => {
	message.style.display = "none";
	topnav.classList.remove("modal-open");
});
messageBtn.addEventListener("click", () => {
	message.style.display = "none";
	topnav.classList.remove("modal-open");
});

linkNavigation.forEach((link) => {
	link.addEventListener("click", () => {
		const activeClassLink = document.querySelector(".topnav a.active");
		if (activeClassLink) {
			activeClassLink.classList.remove("active");
		}
		link.classList.add("active");
		const linkNavigationResponsive =
			document.querySelector(".topnav a.icon");
		const navigationResponsive =
			document.querySelector(".topnav.responsive");
		if (navigationResponsive) {
			linkNavigationResponsive.classList.add("active");
		}
	});
});
