import { useEffect } from "react";
import * as THREE from "three";

function App() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const light = new THREE.DirectionalLight(0xffffff, 1, 100);
    light.position.set(-2, 1, 0); //default; light shining from top
    scene.add(light);
    /******** PLAN ***********/
    var geometry = new THREE.PlaneGeometry(window.innerWidth, 10, 100, 100);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 4));
    const plane = new THREE.Mesh(geometry, planeMaterial);
    plane.receiveShadow = true;
    scene.add(plane);
    // var material = new THREE.MeshPhongMaterial({
    //   color: 0xfafafa,
    //   emissive: 0x072534,
    //   side: THREE.DoubleSide,
    //   flatShading: true,
    //   shininess: 100,
    // });

    // var mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);

    ///***************************************** */
    const sphereGeometry = new THREE.SphereGeometry(1, 100, 100);
    for (let i = 0; i < 20; i++) {
      let sphereMaterial = new THREE.MeshPhongMaterial({
        color: THREE.MathUtils.randInt(0, 0xffffff),
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true,
        // shininess: 50,
      });
      let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 20);
      let z = Math.floor(Math.random() * 10);
      sphere.position.set(x, y, z);
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      scene.add(sphere);
    }

    camera.position.z = 30;
    camera.lookAt(0, 0, 0);
    scene.add(light);
    renderer.render(scene, camera);
  }, []);
  return (
    <div className="App">
      <div id="app"></div>
    </div>
  );
}

export default App;
