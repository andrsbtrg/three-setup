import * as THREE from 'three';
import { useEffect } from 'react';
import SceneInit from '../SceneInit';

function App() {
  useEffect(() => {

    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();
    // Add geometry to the scene

    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    
    test.scene.add(boxMesh);


    animate();
  }, []);

  return (
    <div>
      <canvas id = 'myThreeJsCanvas'></canvas>
    </div>
  )
}

export default App
