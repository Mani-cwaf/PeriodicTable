import './style.css'

const elements = [...document.querySelectorAll('.element')] as HTMLElement[];
const cards = [...document.querySelectorAll('.card')] as HTMLElement[];
const body = document.querySelector('html') as HTMLElement;
const info = document.querySelector('.info') as HTMLElement;
const indicators = [...document.querySelectorAll('.indicators span')] as HTMLElement[];

let indicatorIndex = 0
indicators.forEach(element => {
	if (indicatorIndex < 4) {
		element.style.boxShadow = `0 0 2.5px 5px var(--state-${element.dataset.name})`;
	} else {
		element.style.boxShadow = `0 0 4px 8px var(--type-${element.dataset.name})`;
	}
	indicatorIndex++;
});

let children = [...info.querySelectorAll('*')] as HTMLElement[];
const showInfo = (elementIndex: any) => {
	let element = elements[elementIndex - 1];
	info.removeAttribute('hidden');
	info.style.backgroundColor = `var(--type-${element.dataset.type})`;
	children[0].innerHTML = elementIndex;
	children[1].innerHTML = element.innerHTML;
	children[2].innerHTML = element.dataset.name as string;
	children[3].innerHTML = element.dataset.weight as string;
}

let i = 0
let j = 0
body.addEventListener('click', () => {
	if (!info.hasAttribute('hidden')) {
		if (i < 1) {
			i++
		} else {
			info.setAttribute('hidden', '');
			children[0].innerHTML = '';
			children[1].innerHTML = '';
			children[2].innerHTML = '';
			children[3].innerHTML = '';
			i = 0;
		}
		j = 0;
	}
	if (clickedIndex != 0 && info.hasAttribute('hidden')) {
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

	//click effects
	element.addEventListener('click', () => {
		if (!info.hasAttribute('hidden')) {
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
			element.style.transform = 'scale(1.25)';
			showInfo(clickedIndex);
			clickedIndex = currentIndex;
		} else {
			elements.forEach(e => {
				e.style.opacity = '1';
				e.style.transform = 'scale(1)';
			})
			cards.forEach(e => {
				e.style.opacity = '1';
				e.style.transform = 'scale(1)';
			})
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
		if (!info.hasAttribute('hidden')) {
			return
		}
		if (clickedIndexType == '') {
			elements.forEach(e => {
				if (e.dataset.index != `${currentIndex}`) {
					e.style.filter = 'brightness(0.9)';
				} else {
					e.style.filter = 'brightness(1.1)'
				}
			});
			cards.forEach(e => {
				e.style.filter = 'brightness(0.9)';
			});
		}
		element.style.transform = 'scale(1.25)';
	});

	element.addEventListener('mouseleave', () => {
		if (!info.hasAttribute('hidden')) {
			return
		}
		if (clickedIndexType == '') {
			elements.forEach(e => {
				e.style.filter = 'brightness(1)';
			});
		} else {
			elements.forEach(e => {
				e.style.filter = 'brightness(0.9)';
			});
			cards.forEach(e => {
				e.style.filter = 'brightness(0.9)';
			});
			elements[clickedIndex - 1].style.filter = 'brightness(1.1)';
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
	lanthanoid.style.marginTop = '2.5rem'
}

//Actinoids
for (let i = 89; i < 104; i++) {
	const lanthanoid = elements[i - 1];
	lanthanoid.style.gridRow = '9'
	lanthanoid.style.gridColumn = `${(i - 88) + 2}`
}