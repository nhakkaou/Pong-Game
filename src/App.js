import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
function App() {
  const balls = [
    {
      x: 4,
      y: 4,
      z: 0,
      color: 0x808b96,
    },
    {
      x: -5,
      y: 5,
      z: 0,
      color: 0xdaf7a6,
    },
    {
      x: -10,
      y: -10,
      z: 0,
      color: 0x85c1e9,
    },
  ];
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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
    /************             LIGHTS         ************/
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.castShadow = true;
    light.position.set(0, 10, 0);
    scene.add(light);

    const light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.castShadow = true;
    light2.position.set(-5, 4, -5);
    scene.add(light2);

    const light3 = new THREE.DirectionalLight(0xffffff, 1);
    light3.castShadow = true;
    light3.position.set(10, 4, 10);
    scene.add(light3);
    /***************            PLAN            ***********/
    const geometry = new THREE.PlaneBufferGeometry(40, 40);
    const planMesh = new THREE.MeshPhongMaterial({
      color: 0xfafafa,
      side: THREE.DoubleSide,
    });
    const plan = new THREE.Mesh(geometry, planMesh);
    plan.position.set(0, -10, 0);
    plan.receiveShadow = true;
    plan.rotation.x = -Math.PI / 2;
    plan.rotation.y = -0.5;
    scene.add(plan);
    ///***************************************** */
    const sphereGeometry = new THREE.SphereGeometry(1, 100, 100);
    for (let i = 0; i < balls.length; i++) {
      let sphereMaterial = new THREE.MeshPhongMaterial({
        color: balls[i].color,
        // emissive: 0x072534,
      });
      let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(balls[i].x, balls[i].y, balls[i].z);
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      scene.add(sphere);
    }
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    camera.position.set(0, 0, 30);
    camera.lookAt(0, 0, 0);
    scene.add(light);
    console.log(scene);
    const animate = function () {
      requestAnimationFrame(animate);
      for (let i = 1; i < scene.children.length; i++) {
        if (scene.children[i].geometry?.type === "SphereGeometry") {
          const element = scene.children[i].position;
          element.z -= 0.01;
          scene.children[i].position.set(element.x, element.y, element.z);
        }
      }
      renderer.render(scene, camera);
    };

    animate();
  }, []);
  return (
    <div className="App">
      <div id="app"></div>
    </div>
  );
}

export default App;
