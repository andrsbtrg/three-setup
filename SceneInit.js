import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';


export default class SceneInit {
    constructor(canvasId) {
        
        // Core componentes to initialize Three.js app
        this.scene = undefined;
        this.camera= undefined;
        this.renderer = undefined;

        // Camera params
        this.fov = 45;
        this.nearPlane = 1;
        this.farPlane = 1000;
        this.canvasId = canvasId;

        // Additional components
        this.stats = undefined;
        this.clock = undefined;
        this.controls = undefined;

        // Lightnint is basically required
        this.ambientLight = undefined;
        this.directionalLight = undefined;
    }

    initialize() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            window.innerWidth / window.innerHeight,
            this.nearPlane,
            this.farPlane
        );

        this.camera.position.z = 48;
        this.clock = new THREE.Clock();
        // Specify a canvas which is already created in the HTML
        const canvas = document.getElementById(this.canvasId);
        
        this.renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);
    
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.ambientLight.castShadow = true;
        this.scene.add(this.ambientLight);
    
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.directionalLight.castShadow = true;
        this.directionalLight.position.set(0, 64, 32);
        this.scene.add(this.directionalLight);

        // Add orbit controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    
        // Add FPS stats
        this.stats = Stats();
        document.body.appendChild(this.stats.dom);
        
        // If window resizes
        window.addEventListener('resize', () => this.onWindowResize(), false);
    };

    animate() {
        // boxMesh.rotation.x += 0.01;
        // boxMesh.rotation.y += 0.01;
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
        this.stats.update();
        this.controls.update();
    };
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    
}