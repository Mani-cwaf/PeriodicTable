import './style.css'

const elements = [...document.querySelectorAll('.element')] as HTMLElement[];
const cards = [...document.querySelectorAll('.card')] as HTMLElement[];
const body = document.querySelector('html') as HTMLElement;
const infoContainer = document.querySelector('.info-container') as HTMLElement;
const info = document.querySelector('.info') as HTMLElement;
const indicatorsEl = document.querySelector('.indicators') as HTMLElement;
const indicatorsButtonEl = document.querySelector('.indicators-button') as HTMLElement;
const indicators = [...document.querySelectorAll('.indicators span')] as HTMLElement[];

let indicatorIndex = 0
indicators.forEach(element => {
	if (indicatorIndex < 4) {
		element.style.boxShadow = `0 0 0.3rem 0.6rem var(--state-${element.dataset.name})`;
	} else {
		element.style.boxShadow = `0 0 0.3rem 0.6rem var(--type-${element.dataset.name})`;
	}
	indicatorIndex++;
});

let infoChildren = [...info.querySelectorAll('*')] as HTMLElement[];
let extraInfo = [...infoContainer.querySelectorAll('.info-container > p')] as HTMLElement[];

const showInfo = (elementIndex: any) => {
	hideIndicators();
	let element = elements[elementIndex - 1];
	infoContainer.removeAttribute('hidden');
	infoContainer.style.backgroundColor = `var(--type-${element.dataset.type})`;
	infoContainer.style.boxShadow = `0 0 0.5rem 0.5rem black`;

	info.style.backgroundColor = `var(--type-${element.dataset.type})`;
	info.style.boxShadow = `0 0 0.5rem 0.5rem black`;


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


const hideIndicators = () => {
	indicatorsButtonEl.innerHTML = 'Show Indicators';
	indicatorsEl.setAttribute('hidden', '');
}
const showIndicators = () => {
	indicatorsButtonEl.innerHTML = 'Hide Indicators';
	indicatorsEl.removeAttribute('hidden');
}

indicatorsButtonEl.addEventListener('click', () => {
	if (indicatorsEl.hasAttribute('hidden')) {
		showIndicators();
	} else {
		hideIndicators();
	}
});

let i = 0
let j = 0
body.addEventListener('click', () => {
	if (!infoContainer.hasAttribute('hidden')) {
		if (i < 1) {
			i++
		} else {
			hideInfo();
			i = 0;
		}
		j = 0;
	}

	if (clickedIndex != 0 && infoContainer.hasAttribute('hidden')) {
		if (j < 1) {
			j++
		} else {
			elements.forEach(e => {
				e.style.opacity = '1';
				e.style.transform = 'scale(1)';
				e.style.filter = 'brightness(1)';
			})
			cards.forEach(e => {
				e.style.opacity = '1';
				e.style.transform = 'scale(1)';
				e.style.filter = 'brightness(1)';
			})
			clickedIndex = 0;
			clickedIndexType = '';
			j = 0;
		}
	}
})

let index = 1;
let clickedIndex = 0;
let clickedIndexType = '';
elements.forEach(element => {
	let currentIndex = index;
	let currentIndexType = element.dataset.type as string;
	element.classList.add(`element-${index}`);
	element.dataset.index = `${index}`;

	//Color
	element.style.color = `var(--state-${element.dataset.state})`;
	element.style.backgroundColor = `var(--type-${element.dataset.type})`;
	element.style.boxShadow = ` 0 0 2px 2px var(--type-${element.dataset.type})`;

	//click effects
	element.addEventListener('click', () => {
		if (!infoContainer.hasAttribute('hidden')) {
			return
		}
		if (clickedIndex == currentIndex) {
			clickedIndex = 0;
			elements.forEach(e => {
				e.style.opacity = '1';
				e.style.transform = 'scale(1)';
			})
			cards.forEach(e => {
				e.style.opacity = '1';
				e.style.transform = 'scale(1)';
			})
		}

		if (clickedIndexType == currentIndexType) {
			clickedIndexType = '';
			elements[clickedIndex - 1].style.transform = 'scale(1)';
			elements[clickedIndex - 1].style.filter = 'brightness(1)';
			element.style.transform = 'scale(1.25)';
			element.style.filter = 'brightness(1.2)';
			showInfo(clickedIndex);
			clickedIndex = currentIndex;
		} else {
			elements.forEach(e => {
				e.style.opacity = '1';
				e.style.transform = 'scale(1)';
			})
			element.style.transform = 'scale(1.25)';
			element.style.filter = 'brightness(1.2)';
		}

		clickedIndexType = currentIndexType;
		clickedIndex = currentIndex;
		let currentType = element.dataset.type;
		elements.forEach(e => {
			if (e.dataset.type != currentType) {
				e.style.opacity = '0.5';
			}
		})
		cards.forEach(e => {
			e.style.opacity = '0.5';
		})
		element.style.transform = 'scale(1.25)';
		showInfo(clickedIndex);
	});

	element.addEventListener('mouseenter', () => {
		if (!infoContainer.hasAttribute('hidden')) {
			return
		}
		if (clickedIndexType == '') {
			elements.forEach(e => {
				if (e.dataset.index == `${currentIndex}`) {
					e.style.filter = 'brightness(1.2)'
				}
			});
		}
		element.style.transform = 'scale(1.25)';
	});

	element.addEventListener('mouseleave', () => {
		if (!infoContainer.hasAttribute('hidden')) {
			return
		}
		if (clickedIndexType == '') {
			elements.forEach(e => {
				e.style.filter = 'brightness(1)';
			});
		} else {
			elements[clickedIndex - 1].style.filter = 'brightness(1.2)';
		}
		if (clickedIndex != currentIndex) {
			element.style.transform = 'scale(1)';
		}

	});

	index++
});

//Lanthanoids
for (let i = 57; i < 72; i++) {
	const lanthanoid = elements[i - 1];
	lanthanoid.style.gridRow = '8'
	lanthanoid.style.gridColumn = `${(i - 56) + 2}`
	lanthanoid.style.marginTop = '2rem'
}

//Actinoids
for (let i = 89; i < 104; i++) {
	const lanthanoid = elements[i - 1];
	lanthanoid.style.gridRow = '9'
	lanthanoid.style.gridColumn = `${(i - 88) + 2}`
}