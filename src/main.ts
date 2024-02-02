import './style.css'

const elements = [...document.querySelectorAll('.element')] as HTMLElement[];
const cards = [...document.querySelectorAll('.card')] as HTMLElement[];
const html = document.querySelector('html') as HTMLElement;
const container = document.querySelector('.full-container') as HTMLElement;

const infoContainer = document.querySelector('.info-container') as HTMLElement;
const info = document.querySelector('.info') as HTMLElement;

const indicatorsContainer = document.querySelector('.indicators') as HTMLElement;
const indicators = [...document.querySelectorAll('.indicators span')] as HTMLElement[];
const indicatorsButton = document.querySelector('.indicators-button') as HTMLElement;

// Prevent conventional scrolling
container.addEventListener("mousewheel", (e) => {
	e.preventDefault();
	e.stopPropagation();
}, false);
container.addEventListener("DOMMouseScroll", (e) => {
	e.preventDefault();
	e.stopPropagation();
}, false);

document.body.onmousedown = function(e) { if (e.button === 1) return false; }

// Scroll down to indicators when indicator button is clicked
indicatorsButton.addEventListener('click', () => {
	indicatorsContainer.scrollIntoView()
})

indicators.forEach((indicator) => {
	// add box shadow to indicators, based on state for the first 4, and category for the rest 
	if (indicator.classList.contains('state-indicator')) {
		indicator.style.boxShadow = `0 0 calc(0.5 * var(--scale)) calc(0.75 * var(--scale)) var(--state-${indicator.dataset.name})`;
	} else {
		indicator.style.boxShadow = `0 0 calc(0.5 * var(--scale)) calc(0.75 * var(--scale)) var(--type-${indicator.dataset.name})`;
		indicator.addEventListener('click', () => {
			html.scroll(0, 0);
			setTimeout(() => {
				highlightCategory(indicator.dataset.name as string);
			}, 1);
		});
	}
});

const infoChildren = [...info.querySelectorAll('*')] as HTMLElement[];
const extraInfo = [...infoContainer.querySelectorAll('.info-container > p')] as HTMLElement[];

const showInfo = (elementIndex: any) => {
	let element = elements[elementIndex];
	infoContainer.removeAttribute('hidden');
	infoContainer.style.backgroundColor = `var(--type-${element.dataset.type})`;
	infoContainer.style.boxShadow = `0 0 calc(0.5 * var(--scale)) calc(0.5 * var(--scale)) black`;

	info.style.backgroundColor = `var(--type-${element.dataset.type})`;
	info.style.boxShadow = `0 0 calc(0.5 * var(--scale)) calc(0.5 * var(--scale)) black`;


	infoChildren[0].innerHTML = elementIndex;
	infoChildren[1].innerHTML = element.innerHTML;
	infoChildren[2].innerHTML = element.dataset.name as string;
	infoChildren[3].innerHTML = element.dataset.weight as string;
	let state = document.querySelector(`.indicators span[data-name='${element.dataset.state}']`) as HTMLElement
	let type = document.querySelector(`.indicators span[data-name='${element.dataset.type}']`) as HTMLElement
	extraInfo[0].innerHTML = `State: ${state.innerHTML}`
	extraInfo[1].innerHTML = `Category: ${type.innerHTML}`
}

const hideInfo = () => {
	infoContainer.setAttribute('hidden', '');

	infoContainer.style.backgroundColor = ``;
	infoContainer.style.boxShadow = ``;

	info.style.backgroundColor = ``;
	info.style.boxShadow = ``;
	infoChildren[0].innerHTML = '';
	infoChildren[1].innerHTML = '';
	infoChildren[2].innerHTML = '';
	infoChildren[3].innerHTML = '';

	extraInfo[0].innerHTML = '';
	extraInfo[1].innerHTML = '';
}

const resetEls = (array: HTMLElement[]) => {
	array.forEach(e => {
		e.style.opacity = '1';
		e.style.transform = 'scale(1)';
		e.style.filter = 'brightness(1)';
	})
}

const highlightCategory = (currentType: string) => {
			//Highlight all elements
			resetEls(elements);
			//If an element is not of the same category as the one selected, unhighlight it
			elements.forEach(e => {
				if (e.dataset.type != currentType) {
					e.style.opacity = '0.5';
				}
			})
			cards.forEach(e => {
				if (e.dataset.type != currentType) {
					e.style.opacity = '0.5';
				}
			})
}

let i = 0
let j = 0
html.addEventListener('click', () => {
	if (!infoContainer.hasAttribute('hidden')) {
		if (i < 1) {
			i++
		} else {
			hideInfo();
			i = 0;
		}
		j = 0;
	}

	if (infoContainer.hasAttribute('hidden')) {
		if (j < 1 && clickedIndex != -1) {
			j++
		} else {
			resetEls(elements);
			resetEls(cards);
			clickedIndex = -1;
			clickedIndexType = '';
			j = 0;
		}
	}
})

let clickedIndex = -1;
let clickedIndexType = '';
elements.forEach((element, index) => {
	let currentIndexType = element.dataset.type as string;
	element.classList.add(`element-${index + 1}`);
	element.dataset.index = `${index + 1}`;

	//Color
	element.style.color = `var(--state-${element.dataset.state})`;
	element.style.backgroundColor = `var(--type-${element.dataset.type})`;
	element.style.boxShadow = ` 0 0 2px 2px var(--type-${element.dataset.type})`;

	//click effects
	element.addEventListener('click', () => {
		if (!infoContainer.hasAttribute('hidden')) {
			return
		}
		if (clickedIndex == index) {
			clickedIndex = -1;
			resetEls(elements);
			resetEls(cards);
		}

		if (clickedIndexType == currentIndexType) {
			clickedIndexType = '';
			elements[clickedIndex].style.transform = 'scale(1)';
			elements[clickedIndex].style.filter = 'brightness(1)';
			showInfo(clickedIndex);
			clickedIndex = index;

		} else {
			//If the category of element being selected is not already selected by another element, change the category highlighted

			let currentType = element.dataset.type as string;
			highlightCategory(currentType);

			if (clickedIndex != -1) {
				elements[clickedIndex].style.transform = 'scale(1)';
				elements[clickedIndex].style.filter = 'brightness(1)';
			}
		}

		element.style.transform = 'scale(1.25)';
		element.style.filter = 'brightness(1.2)';

		clickedIndexType = currentIndexType;
		clickedIndex = index;

		// unhighlights lanthanoid and actinoid cards
		cards.forEach(e => {
			e.style.opacity = '0.5';
		})

		//Opens info panel
		showInfo(clickedIndex);
	});

	element.addEventListener('mouseenter', () => {
		// enlarge hovered element
		element.style.transform = 'scale(1.25)';
		// If no element is selected, highlight hovered element
		if (clickedIndexType == '') {
			elements.forEach(e => {
				if (e.dataset.index == `${index + 1}`) {
					e.style.filter = 'brightness(1.2)'
				}
			});
		}
	});

	element.addEventListener('mouseleave', () => {
		// When element is no longer hovered, reset brightness
		element.style.filter = 'brightness(1)';

		// If any element is selected, keep it highlighted
		if (clickedIndexType != '') {
			elements[clickedIndex].style.filter = 'brightness(1.2)';
		}

		// Reset size of all elements except the selected one
		if (clickedIndex != index) {
			element.style.transform = 'scale(1)';
		}

	});
});

//Lanthanoids
for (let i = 57; i < 72; i++) {
	const lanthanoid = elements[i - 1];
	lanthanoid.style.gridRow = '8'
	lanthanoid.style.gridColumn = `${(i - 56) + 2}`
	lanthanoid.style.marginTop = 'calc(2 * var(--scale))'
}

//Actinoids
for (let i = 89; i < 104; i++) {
	const lanthanoid = elements[i - 1];
	lanthanoid.style.gridRow = '9'
	lanthanoid.style.gridColumn = `${(i - 88) + 2}`
}