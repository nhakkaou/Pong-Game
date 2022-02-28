import { useEffect } from "react";
import * as THREE from "three";
import img from "./texture.jpeg";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
function App() {
  const balls = [
    {
      x: 0,
      y: 0,
      z: 10,
      color: 0x808b96,
    },
    // {
    //   x: -2,
    //   y: -10,
    //   z: 0,
    //   color: 0xdaf7a6,
    // },
    // {
    //   x: -1,
    //   y: -9,
    //   z: 1,
    //   color: 0x85c1e9,
    // },
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
    const light = new THREE.DirectionalLight(0xffffff, 0.7);
    light.castShadow = true;
    light.position.set(0, 10, 0);
    scene.add(light);

    const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    light2.castShadow = true;
    light2.position.set(-5, 4, -5);
    scene.add(light2);

    const light3 = new THREE.DirectionalLight(0xffffff, 0.5);
    light3.castShadow = true;
    light3.position.set(10, 4, 10);
    scene.add(light3);
    /***************            PLAN            ***********/
    // const loader = new THREE.TextureLoader();
    // const texture = loader.load(img);
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(1, 1);
    const geometry = new THREE.PlaneBufferGeometry(60, 60);
    const planMesh = new THREE.MeshPhongMaterial({
      color: 0xc3c3c3,
      // map: texture,
      side: THREE.DoubleSide,
    });
    const plan = new THREE.Mesh(geometry, planMesh);
    plan.position.set(0, 0, 0);
    plan.receiveShadow = true;
    // plan.rotation.x = -Math.PI / 2;
    // plan.rotation.y = -0.5;
    scene.add(plan);
    // for (let i = 0; i < plan.geometry.vertices.length; i++) {
    //   const element = plan.geometry.vertices[i];
    console.log("ELMNT", plan);
    // }
    /***************            BALL            ***********/
    const sphereGeometry = new THREE.SphereGeometry(0.5, 100, 100);
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
    camera.position.set(
      plan.position.x - 10,
      plan.position.y - 3,
      plan.position.z
    );
    camera.lookAt(plan.position);
    scene.add(light);
    scene.add(new THREE.AxesHelper(50));
    console.log(scene);
    const animate = function () {
      requestAnimationFrame(animate);
      let vector = new THREE.Vector2(0.1, 0.1);
      let dy = -1;
      for (let i = 1; i < scene.children.length; i++) {
        if (scene.children[i].geometry?.type === "SphereGeometry") {
          const element = scene.children[i].position;
          element.z += vector.y * dy;
          scene.children[i].position.set(element.x, element.y, element.z);
          const plane = new THREE.Plane(
            plan.position,
            plan.geometry.parameters.width / 2
          );
          console.log("PLANE", plane);
          const ray = new THREE.Ray(scene.children[i].position, plan.position)
            // .distanceToPoint(target);
            .intersectsPlane(plane);

          console.log(ray);

          // if (intersect[0].distance == 0) console.log("INTERSECT", intersect);
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
