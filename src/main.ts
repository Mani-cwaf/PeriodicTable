import './style.css'

const elements = [...document.querySelectorAll('.element')] as HTMLElement[];
const cards = [...document.querySelectorAll('.card')] as HTMLElement[];
const html = document.querySelector('html') as HTMLElement;

const infoContainer = document.querySelector('.info-container') as HTMLElement;
const info = document.querySelector('.info') as HTMLElement;

const indicators = [...document.querySelectorAll('.indicators span')] as HTMLElement[];

const simulation = document.querySelector('.simulation') as HTMLElement

type OrientationLockType = "any" | "landscape" | "natural" | "portrait" | OrientationType
interface ScreenOrientation extends EventTarget {
  lock(orientation: OrientationLockType): Promise<void>;
}

(screen.orientation as unknown as ScreenOrientation).lock("landscape");

indicators.forEach((indicator) => {
	// add box shadow to indicators, based on state for the first 4, and category for the rest 
	if (indicator.classList.contains('state-indicator')) {
		indicator.style.backgroundColor = `rgba(var(--state-${indicator.dataset.name}), 0.25)`
		indicator.style.boxShadow = `0 0 calc(0.25 * var(--scale)) calc(0.25 * var(--scale)) rgb(var(--state-${indicator.dataset.name}))`;
	} else {
		indicator.style.backgroundColor = `rgba(var(--type-${indicator.dataset.name}), 0.25)`
		indicator.style.boxShadow = `0 0 calc(0.25 * var(--scale)) calc(0.25 * var(--scale)) rgb(var(--type-${indicator.dataset.name}))`;
		indicator.addEventListener('click', () => {
			html.scroll(0, 0);
			setTimeout(() => {
				highlightCategory(indicator.dataset.name as string);
			}, 1);
		});
	}
});

const infoChildren = [...info.querySelectorAll('*')] as HTMLElement[];
const extraInfo = [...infoContainer.querySelectorAll('.info-container > *:not(:nth-child(1))')] as HTMLElement[];

const showInfo = (elementIndex: any) => {
	let element = elements[elementIndex];
	html.scroll(0, 0);
	infoContainer.removeAttribute('hidden');
	infoContainer.style.backgroundColor = `rgb(var(--type-${element.dataset.type}))`;
	infoContainer.style.boxShadow = `0 0 calc(0.5 * var(--scale)) calc(0.5 * var(--scale)) black`;

	info.style.backgroundColor = `rgb(var(--type-${element.dataset.type}))`;
	info.style.boxShadow = `0 0 calc(0.5 * var(--scale)) calc(0.5 * var(--scale)) black`;

	infoChildren[0].innerHTML = elementIndex + 1;
	infoChildren[1].innerHTML = element.children[1].innerHTML;
	infoChildren[2].innerHTML = element.dataset.name as string;
	infoChildren[3].innerHTML = element.dataset.weight as string;
	let state = document.querySelector(`.indicators span[data-name='${element.dataset.state}']`) as HTMLElement;
	let type = document.querySelector(`.indicators span[data-name='${element.dataset.type}']`) as HTMLElement;
	extraInfo[0].innerHTML = `State: <span> ${state.innerHTML} </span>`;
	(extraInfo[0].querySelector('span') as HTMLElement).style.color = `rgb(var(--state-${element.dataset.state}))`;
	extraInfo[1].innerHTML = `Category: ${type.innerHTML}`;
	extraInfo[2].style.display = `block`;
}

const hideInfo = () => {
	if (infoContainer.hasAttribute('rendering')) {
		return;
	}
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
	extraInfo[2].style.display = 'none';
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
	resetEls(cards);
	//If an element is not of the same category as the one selected, unhighlight it
	elements.forEach(e => {
		if (currentType != e.dataset.type) {
			e.style.opacity = '0.4';
		}
	})
	cards.forEach(e => {
		if (currentType != e.dataset.type) {
			e.style.opacity = '0.4';
		}
	})
	indicators.forEach(indicator => {
		if (currentType == indicator.dataset.name) {
			indicator.style.filter = 'brightness(2)';
		} else {
			indicator.style.filter = 'brightness(0.5)';
		}
	});
}

infoContainer.addEventListener('click', (e) => { e.stopPropagation() })

const clearAll = () => {
	if (!infoContainer.hasAttribute('hidden')) {
		hideInfo();
	}

	if (infoContainer.hasAttribute('hidden')) {
		resetEls(elements);
		resetEls(indicators);
		resetEls(cards);
		clickedIndex = -1;
		clickedIndexType = '';
	}
}

html.addEventListener('click', () => {
	clearAll()
});
html.addEventListener('keydown', (e) => {
	if (e.key == "Escape") {
		clearAll()
	}
});

infoContainer.addEventListener('click', (e) => { e.stopImmediatePropagation() })

let clickedIndex = -1;
let clickedIndexType = '';
elements.forEach((element, index) => {
	let currentIndexType = element.dataset.type as string;
	element.classList.add(`element-${index + 1}`);
	element.dataset.index = `${index + 1}`;

	//Color
	if (element.dataset.state != "solid") {
		(element.children[1] as HTMLElement).style.webkitTextStroke = `1.5px rgb(var(--state-${element.dataset.state}))`;
	} else {
		(element.children[1] as HTMLElement).style.webkitTextStroke = `1.5px black`;
	}
	element.style.backgroundColor = `rgb(var(--type-${element.dataset.type}))`;
	element.style.boxShadow = ` 0 0 1.5px 1.5px rgb(225, 225, 225)`;

	//click effects
	element.addEventListener('click', (e) => {
		e.stopPropagation();
		if (!infoContainer.hasAttribute('hidden')) {
			return;
		}
		if (clickedIndex == index && !infoContainer.hasAttribute('hidden')) {
			clickedIndex = -1;
			resetEls(elements);
			resetEls(cards);
		}

		if (clickedIndexType == currentIndexType) {
			clickedIndexType = '';
			elements[clickedIndex].style.transform = 'scale(1)';
			elements[clickedIndex].style.filter = 'brightness(1)';
			//showInfo(clickedIndex);
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

		//Opens info panel
		showInfo(clickedIndex);
	}, { capture: true });

	element.addEventListener('mouseenter', () => {
		// Enlarge hovered element
		element.style.transform = 'scale(1.25)';

		// If no element is selected, highlight hovered element
		if (clickedIndexType == '') {
			elements.forEach(e => {
				if (e.dataset.index == `${index + 1}`) {
					e.style.filter = 'brightness(1.5)'
				}
			});
		}
	});

	element.addEventListener('mouseleave', () => {
		// When element is no longer hovered, reset brightness
		element.style.filter = 'brightness(1)';

		// If any element is selected, keep it highlighted
		if (clickedIndexType != '') {
			elements[clickedIndex].style.filter = 'brightness(1.5)';
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
	lanthanoid.style.gridRow = '8';
	lanthanoid.style.gridColumn = `${(i - 56) + 2}`;
	lanthanoid.style.marginTop = 'calc(2 * var(--scale))';
}

//Actinoids
for (let i = 89; i < 104; i++) {
	const actinoid = elements[i - 1];
	actinoid.style.gridRow = '9';
	actinoid.style.gridColumn = `${(i - 88) + 2}`;
}

const fullContainer = document.querySelector('.full-container') as HTMLElement;
const renderButton = document.querySelector('.render') as HTMLElement
renderButton.addEventListener('click', (e) => {
	if (infoContainer.hasAttribute('rendering')) {
		e.stopPropagation();

		infoContainer.removeAttribute('rendering')

		fullContainer.style.display = "flex";
		simulation.innerHTML = '';

		renderButton.innerHTML = 'Render';

		setTimeout(() => {
			clearAll()
		}, 450);
	} else {
		infoContainer.setAttribute('rendering', '')
		showInfo(parseInt(infoChildren[0].innerHTML) - 1)

		fullContainer.style.display = "none";

		renderButton.innerHTML = 'Return';
		RenderAtom(parseInt(infoChildren[0].innerHTML) - 1);
	}
}, { capture: true });

import * as THREE from 'three';

const RenderAtom = (index: number) => {
	const structure: any[] = []
	elements[index].dataset.structure!.split(',').forEach((value, i) => {
		structure[i] = parseInt(value);
	})

	// Creating Parameters
	const protonCount = structure[0];
	const neutronCount = structure[1];
	const shells = [];

	for (let i = 2; i < structure.length; i++) {
		if (structure[i] > 0) {
			shells.push({ radius: 4 + 0.75 * i, count: structure[i] })
		}
	}

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	simulation.appendChild(renderer.domElement);

	// Lighting
	scene.add(new THREE.AmbientLight(0xffffff, 1));
	const light = new THREE.PointLight(0xffffff, 100);
	light.position.set(5, 5, 5);
	scene.add(light);

	const nucleonRadius = 0.5;
	const totalNucleons = protonCount + neutronCount;

	// Geometry and Materials
	const geometry = new THREE.SphereGeometry(nucleonRadius, 16, 16);
	const protonMaterial = new THREE.MeshPhongMaterial({ color: 0xc80000 });
	const neutronMaterial = new THREE.MeshPhongMaterial({ color: 0x0000c8 });

	const nucleons: any[] = [];

	function randomVector3(scale: number) {
		return new THREE.Vector3(
			(Math.random() - 0.5) * scale,
			(Math.random() - 0.5) * scale,
			(Math.random() - 0.5) * scale
		);
	}

	// Initialize positions
	for (let i = 0; i < totalNucleons; i++) {
		const isProton = i < protonCount;
		nucleons.push({
			position: randomVector3(nucleonRadius * 3),
			velocity: new THREE.Vector3(),
			mesh: new THREE.Mesh(geometry, isProton ? protonMaterial : neutronMaterial),
		});
	}

	// Force simulation
	const iterations = Math.max(200, totalNucleons * 2);
	for (let step = 0; step < iterations; step++) {
		for (let i = 0; i < nucleons.length; i++) {
			let force = new THREE.Vector3();

			// Central attraction
			const centerForce = nucleons[i].position.clone().multiplyScalar(-0.1);
			force.add(centerForce);

			const desiredSpacing = nucleonRadius * 2; // center-to-center distance

			for (let j = 0; j < nucleons.length; j++) {
				if (i === j) continue;
				const dir = nucleons[i].position.clone().sub(nucleons[j].position);
				const dist = dir.length();
				if (dist < 0.01) continue;

				const overlap = Math.max(0, desiredSpacing - dist);
				if (overlap > 0) {
					const repulsionStrength = Math.min((overlap / dist) * 0.2, 1.5);;
					dir.normalize().multiplyScalar(repulsionStrength);
					force.add(dir);
				}
			}

			// Apply velocity
			nucleons[i].velocity.clampLength(0, 0.2);
			nucleons[i].velocity.add(force).multiplyScalar(0.8); // damping
		}

		// Update positions
		for (let nucleon of nucleons) {
			nucleon.position.add(nucleon.velocity);
		}
	}

	// Add to scene
	for (let nucleon of nucleons) {
		nucleon.mesh.position.copy(nucleon.position);
		scene.add(nucleon.mesh);
	}

	// --- Electron Orbit Section ---
	const electronMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
	const electronRadius = 0.25;
	const electronGeometry = new THREE.SphereGeometry(electronRadius, 16, 16);

	const ringMaterial = new THREE.MeshBasicMaterial({
		color: 0xc8c800,
		wireframe: true,
		opacity: 0.5,
		transparent: true,
	});

	const electronSpeed = 0.02

	let electrons: THREE.Object3D<THREE.Object3DEventMap>[][] = [];
	let rings: THREE.Object3D<THREE.Object3DEventMap>[] = [];

	for (let s = 0; s < shells.length; s++) {
		const { radius, count } = shells[s];
		let group: THREE.Object3D<THREE.Object3DEventMap>[] = []
		for (let i = 0; i < count; i++) {
			const angle = (i / count) * Math.PI * 2;
			const electron = new THREE.Mesh(electronGeometry, electronMaterial);
			const orbit = new THREE.Object3D();
			electron.position.set(radius * Math.cos(angle), 0, radius * Math.sin(angle));
			orbit.add(electron);
			orbit.userData = { count };
			scene.add(orbit);
			group.push(orbit);
		}
		electrons.push(group);
		const ringGeometry = new THREE.TorusGeometry(radius, 0.05, 8, 100);
		const ring = new THREE.Mesh(ringGeometry, ringMaterial);
		ring.rotation.x = Math.PI / 2; // Align with XZ plane
		scene.add(ring);
		rings.push(ring);
	}

	camera.position.z = 37 + 1.25 * rings.length;

	const nucleonInitialPos: any[] = []
	for (let i = 0; i < nucleons.length; i++) {
		nucleonInitialPos.push(nucleons[i].mesh.position.clone());
	}

	const speed = 1;
	const maxZoom = 200;
	let frame = 0;

	function animate() {
		requestAnimationFrame(animate);

		frame++

		if (frame <= maxZoom) {
			camera.position.z -= 0.1 * (1 + (Math.abs(maxZoom / 2 - frame) / (maxZoom / 2)));
			scene.rotation.y += 0.015;
		}

		for (let i = 0; i < electrons.length; i++) {
			for (let j = 0; j < electrons[i].length; j++) {
				electrons[i][j].rotation.y += electronSpeed * speed;
				electrons[i][j].rotation.x += 0.005 * (i + 1) * speed;
			}
		}

		for (let i = 0; i < rings.length; i++) {
			rings[i].rotation.x += 0.005 * (i + 1) * speed;
		}

		const shift = (0.5 - Math.random()) / 5
		for (let i = 0; i < nucleons.length; i++) {
			const nucleon = nucleons[i].mesh;
			if (nucleon.position.x == nucleonInitialPos[i].x) {
				nucleon.position.x += shift * speed;
				nucleon.position.z += shift / 2 * speed;
				nucleon.position.y += shift / 3 * speed;
			} else if (frame % 5 == 0) {
				nucleon.position.x = nucleonInitialPos[i].x;
				nucleon.position.y = nucleonInitialPos[i].y;
				nucleon.position.z = nucleonInitialPos[i].z;
			}
		}

		renderer.render(scene, camera);
	}

	animate();

	window.addEventListener('resize', () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	});
}