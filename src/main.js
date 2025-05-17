import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import "./style.css"
import * as THREE from "three"
import { seededRandom } from "three/src/math/MathUtils.js"

const elements = [...document.querySelectorAll(".element")];
const cards = [...document.querySelectorAll(".card")];
const html = document.querySelector("html");

const infoContainer = document.querySelector(".info-container");
const info = document.querySelector(".info");

const indicators = [...document.querySelectorAll(".indicators span")];

const simulation = document.querySelector(".simulation");
(screen.orientation).lock("landscape");

indicators.forEach(indicator => {
	// add box shadow to indicators, based on state for the first 4, and category for the rest
	if (indicator.classList.contains("state-indicator")) {
		indicator.style.background = `linear-gradient(90deg,rgba(var(--state-${indicator.dataset.name}), 0.5) 0%, rgba(var(--state-${indicator.dataset.name}), 0.35) 100%)`;
		indicator.style.boxShadow = `0.5px 0.5px calc(0.25 * var(--scale)) calc(0.25 * var(--scale)) rgb(var(--state-${indicator.dataset.name}))`;
	} else {
		indicator.style.background = `linear-gradient(90deg,rgba(var(--type-${indicator.dataset.name}), 0.5) 0%, rgba(var(--type-${indicator.dataset.name}), 0.35) 100%)`;
		indicator.style.boxShadow = `0.5px 0.5px calc(0.25 * var(--scale)) calc(0.25 * var(--scale)) rgb(var(--type-${indicator.dataset.name}))`;
		indicator.addEventListener("click", () => {
			html.scroll(0, 0);
			setTimeout(() => {
				highlightCategory(indicator.dataset.name);
			}, 1);
		});
	}
});

const infoChildren = [...info.querySelectorAll("*")];
const extraInfo = [
	...infoContainer.querySelectorAll(".info-container > *:not(:nth-child(1))")
];

const showInfo = elementIndex => {
	let element = elements[elementIndex];
	html.scroll(0, 0);
	infoContainer.removeAttribute("hidden");
	infoContainer.style.backgroundColor = `rgb(var(--type-${element.dataset.type}))`;
	infoContainer.style.boxShadow = `0 0 calc(0.5 * var(--scale)) calc(0.5 * var(--scale)) black`;

	info.style.backgroundColor = `rgb(var(--type-${element.dataset.type}))`;
	info.style.boxShadow = `0 0 calc(0.5 * var(--scale)) calc(0.5 * var(--scale)) black`;

	infoChildren[0].innerHTML = elementIndex + 1;
	infoChildren[1].innerHTML = element.children[1].innerHTML;
	infoChildren[2].innerHTML = element.dataset.name;
	infoChildren[3].innerHTML = element.dataset.weight;
	let state = document.querySelector(
		`.indicators span[data-name='${element.dataset.state}']`
	);
	let type = document.querySelector(
		`.indicators span[data-name='${element.dataset.type}']`
	);
	extraInfo[0].innerHTML = `State: <span> ${state.innerHTML} </span>`;
	extraInfo[0].querySelector(
		"span"
	).style.color = `rgb(var(--state-${element.dataset.state}))`;
	extraInfo[1].innerHTML = `Category: ${type.innerHTML}`;
	extraInfo[2].style.display = `block`;
}

const hideInfo = () => {
	if (infoContainer.hasAttribute("rendering")) {
		return
	}
	infoContainer.setAttribute("hidden", "");

	infoContainer.style.backgroundColor = ``;
	infoContainer.style.boxShadow = ``;

	info.style.backgroundColor = ``;
	info.style.boxShadow = ``;
	infoChildren[0].innerHTML = "";
	infoChildren[1].innerHTML = "";
	infoChildren[2].innerHTML = "";
	infoChildren[3].innerHTML = "";

	extraInfo[0].innerHTML = "";
	extraInfo[1].innerHTML = "";
	extraInfo[2].style.display = "none";
}

const resetEls = array => {
	array.forEach(e => {
		e.style.filter = "brightness(1)";
		e.style.transform = "scale(1)";
		e.style.opacity = "1";
	})
}

const highlightCategory = currentType => {
	//Highlight all elements
	resetEls(elements);
	resetEls(cards);
	//If an element is not of the same category as the one selected, unhighlight it
	elements.forEach(e => {
		if (currentType != e.dataset.type) {
			e.style.opacity = "0.5";
		}
	})
	cards.forEach(e => {
		if (currentType != e.dataset.type) {
			e.style.opacity = "0.5";
		}
	})
	indicators.forEach(indicator => {
		if (currentType == indicator.dataset.name) {
			indicator.style.filter = "brightness(1.25)";
		} else {
			indicator.style.filter = "brightness(0.5)";
		}
	})
}

infoContainer.addEventListener("click", e => {
	e.stopPropagation();
})

const clearAll = () => {
	if (!infoContainer.hasAttribute("hidden")) {
		hideInfo();
	}

	if (infoContainer.hasAttribute("hidden")) {
		resetEls(elements);
		resetEls(indicators);
		resetEls(cards);
		clickedIndex = -1;
	}
}

html.addEventListener("click", () => {
	clearAll();
})
html.addEventListener("keydown", e => {
	if (e.key == "Escape") {
		clearAll();
	}
})

infoContainer.addEventListener("click", e => {
	e.stopImmediatePropagation();
})

let clickedIndex = -1
elements.forEach((element, index) => {
	element.classList.add(`element-${index + 1}`);
	element.dataset.index = `${index + 1}`;

	//Color
	if (element.dataset.state != "solid") {
		element.children[1].style.webkitTextStroke = `1.5px rgb(var(--state-${element.dataset.state}))`;
	} else {
		element.children[1].style.webkitTextStroke = `1.5px black`;
	}
	element.style.background = `linear-gradient(90deg,rgba(var(--type-${element.dataset.type}), 0.55) 0%, rgba(var(--type-${element.dataset.type}), 1) 100%)`;
	element.style.boxShadow = ` 0.75px 0.75px 1.5px 1.5px rgba(255, 255, 255, 0.6)`;
	element.style.filter = "brightness(1)";

	//click effects
	element.addEventListener(
		"click",
		e => {
			e.stopPropagation()
			if (!infoContainer.hasAttribute("hidden")) {
				return
			}
			if (clickedIndex == index && !infoContainer.hasAttribute("hidden")) {
				clickedIndex = -1;
				resetEls(elements);
				resetEls(cards);
			}

			let currentType = element.dataset.type;
			highlightCategory(currentType);

			element.style.transform = "scale(1.2)";
			element.style.filter = "brightness(1.25)";

			clickedIndex = index;

			//Opens info panel
			showInfo(clickedIndex);
		},
		{ capture: true }
	)

	element.addEventListener("mouseenter", () => {
		// Enlarge hovered element
		element.style.transform = "scale(1.2)";
		element.style.filter = "brightness(1.25)";
	})

	element.addEventListener("mouseleave", () => {
		// Reset size of all elements except the selected one
		if (clickedIndex != index) {
			element.style.transform = "scale(1)";
			element.style.filter = "brightness(1)";
		}
	})
})

//Lanthanoids
for (let i = 57; i < 72; i++) {
	const lanthanoid = elements[i - 1];
	lanthanoid.style.gridRow = "8";
	lanthanoid.style.gridColumn = `${i - 56 + 2}`;
	lanthanoid.style.marginTop = "calc(2 * var(--scale))";
}

//Actinoids
for (let i = 89; i < 104; i++) {
	const actinoid = elements[i - 1];
	actinoid.style.gridRow = "9";
	actinoid.style.gridColumn = `${i - 88 + 2}`;
}

const fullContainer = document.querySelector(".full-container");
const renderButton = document.querySelector(".render");
renderButton.addEventListener(
	"click",
	e => {
		if (infoContainer.hasAttribute("rendering")) {
			e.stopPropagation();

			infoContainer.removeAttribute("rendering");

			fullContainer.style.display = "flex";
			resTracker.dispose();
			simulation.innerHTML = "";

			renderButton.innerHTML = "Render";

			setTimeout(() => {
				clearAll();
			}, 450)
		} else {
			infoContainer.setAttribute("rendering", "");
			showInfo(parseInt(infoChildren[0].innerHTML) - 1);

			fullContainer.style.display = "none";

			renderButton.innerHTML = "Return";
			RenderAtom(parseInt(infoChildren[0].innerHTML) - 1);
		}
	},
	{ capture: true }
)

// Resource Tracker

class ResourceTracker {
	constructor() {
		this.resources = new Set();
	}
	track(resource) {
		if (resource.dispose || resource instanceof THREE.Object3D) {
			this.resources.add(resource);
		}
		return resource;
	}
	untrack(resource) {
		this.resources.delete(resource);
	}
	dispose() {
		for (const resource of this.resources) {
			if (resource instanceof THREE.Object3D) {
				if (resource.parent) {
					resource.parent.remove(resource);
				}
			}
			if (resource.dispose) {
				resource.dispose();
			}
		}
		this.resources.clear();
	}
}
const resTracker = new ResourceTracker();
const track = resTracker.track.bind(resTracker);

// Geometry and Materials
const nucleonRadius = 0.5;
const nucleonGeometry = new THREE.SphereGeometry(nucleonRadius, 16, 16);
const protonMaterial = new THREE.MeshPhongMaterial({ color: 0xc80000 });
const neutronMaterial = new THREE.MeshPhongMaterial({ color: 0x0000c8 });

const electronMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
const electronRadius = 0.225;
const electronGeometry = new THREE.SphereGeometry(electronRadius, 16, 16);

const ringMaterial = new THREE.MeshBasicMaterial({
	color: 0xffff00,
	transparent: true
})

const fog = new THREE.FogExp2(0x000008, 0.05);
const light = new THREE.PointLight(0xffffff, 200);
light.position.set(10, 5, 5);

const speed = 1;

const RenderAtom = index => {
	const structure = [];
	elements[index].dataset.structure.split(",").forEach((value, i) => {
		structure[i] = parseInt(value);
	})

	// Creating Parameters
	const protonCount = structure[0];
	const neutronCount = structure[1];
	const totalNucleons = protonCount + neutronCount;
	const shells = [];

	for (let i = 2; i < structure.length; i++) {
		if (structure[i] > 0) {
			shells.push({ radius: 4 + 0.75 * i, count: structure[i] });
		}
	}

	const renderer = track(new THREE.WebGLRenderer({ antialias: true }));
	renderer.setSize(window.innerWidth, window.innerHeight);
	const camera = track(
		new THREE.PerspectiveCamera(
			90,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		)
	);
	const scene = track(new THREE.Scene());
	simulation.appendChild(renderer.domElement);

	const controls = track(new OrbitControls(camera, renderer.domElement));
	controls.rotateSpeed = 0.5;
	controls.enablePan = false;
	controls.dampingFactor = 0.1;
	controls.enableDamping = true;

	// Lighting And Fog
	renderer.setClearColor(0x000008);
	scene.add(track(new THREE.AmbientLight(0xffffff, 1)));
	scene.add(light);
	scene.fog = fog;

	const nucleons = []
	function randomVector3(scale) {
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
			mesh: track(
				new THREE.Mesh(
					nucleonGeometry,
					isProton ? protonMaterial : neutronMaterial
				)
			)
		});
	}

	// Force Simulation
	const iterations = Math.max(200, totalNucleons * 2);
	for (let step = 0; step < iterations; step++) {
		for (let i = 0; i < nucleons.length; i++) {
			let force = new THREE.Vector3();

			// Central Attraction
			const centerForce = nucleons[i].position.clone().multiplyScalar(-0.1);
			force.add(centerForce);

			const desiredSpacing = nucleonRadius * 2 // Center-To-Center Distance

			for (let j = 0; j < nucleons.length; j++) {
				if (i === j) continue
				const dir = nucleons[i].position.clone().sub(nucleons[j].position);
				const dist = dir.length();
				if (dist < 0.01) continue;

				const overlap = Math.max(0, desiredSpacing - dist);
				if (overlap > 0) {
					const repulsionStrength = Math.min((overlap / dist) * 0.2, 1.5);
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

	// Electron Orbits
	const electronSpeed = 0.02;

	let electrons = [];
	let rings = [];

	for (let s = 0; s < shells.length; s++) {
		const { radius, count } = shells[s];
		let group = [];
		for (let i = 0; i < count; i++) {
			const angle = (i / count) * Math.PI * 2;
			const electron = track(new THREE.Mesh(electronGeometry, electronMaterial));
			const orbit = track(new THREE.Object3D());
			electron.position.set(
				radius * Math.cos(angle),
				0,
				radius * Math.sin(angle)
			);
			orbit.add(electron);
			group.push(orbit);
			scene.add(orbit);
		}
		electrons.push(group);
		const ringGeometry = new THREE.TorusGeometry(radius, 0.05, 8, 100);
		const ring = new THREE.Mesh(ringGeometry, ringMaterial);
		ring.rotation.x = Math.PI / 2; // Align with XZ plane
		scene.add(ring);
		rings.push(ring);
	}

	camera.position.z = 37 + 1.25 * rings.length;
	scene.rotation.x += 0.3;
	controls.update();

	const maxZoom = 200;
	let frame = 0;

	// Initial Rotation Of Rings
	for (let i = 0; i < electrons.length; i++) {
		for (let j = 0; j < electrons[i].length; j++) {
			electrons[i][j].rotation.x += 1 * Math.ceil((i + 1) / 2) * speed;
		}
	}

	for (let i = 0; i < rings.length; i++) {
		rings[i].rotation.x += 1 * Math.ceil((i + 1) / 2) * speed;
	}

	// Animation Start
	function animate() {
		requestAnimationFrame(animate);
		frame++;

		// Rotate Into View
		if (frame <= maxZoom) {
			camera.position.z -= 0.1 * (1 + Math.abs(maxZoom / 2 - frame) / (maxZoom / 2));
			scene.rotation.y += Math.PI / 4 / 100;
		}

		for (let i = 0; i < electrons.length; i++) {
			for (let j = 0; j < electrons[i].length; j++) {
				electrons[i][j].rotation.y += electronSpeed * speed * Math.cbrt(i + 1);
			}
		}

		// Nucleus Wobble Effect
		for (let i = 0; i < nucleons.length; i++) {
			const shift = 0.0025 * (1 + seededRandom(i)) * speed;
			const nucleon = nucleons[i].mesh;
			let scalarPos = [...nucleon.position.clone()];
			scalarPos.forEach((pos, index, array) => {
				array[index] = pos > 0 ? 1 : -1;
			})
			const shiftVector = new THREE.Vector3(...scalarPos).multiplyScalar(shift);
			if ((frame + i * 10) % 50 > 24) {
				nucleon.position.add(shiftVector);
			} else {
				nucleon.position.sub(shiftVector);
			}
		}

		controls.update();
		renderer.render(scene, camera);
	}

	animate();

	window.addEventListener("resize", () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	});
}