import { useEffect } from "react";
import * as THREE from "three";
import img from "./assets/terrain.jpeg";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import font from "./assets/fonts.json";
function App() {
  const balls = [
    {
      x: 0,
      y: 0,
      z: 10,
      color: 0x93ff0a,
    },
    {
      x: -2,
      y: 0,
      z: 6,
      color: 0xdaf7a6,
    },
    {
      x: -1,
      y: 4,
      z: 10,
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
    const WIDTH_PLANE = 40;
    const HEIGHT_PLANE = 60;
    /********** render text */
    // var loaderText = new FontLoader();
    // const fontTmp = loaderText.parse(font);
    // var geometryText = new TextGeometry("Ping Pong", {
    //   font: fontTmp,
    //   size: 80,
    //   height: 3,
    //   curveSegments: 12,
    //   bevelEnabled: true,
    //   bevelThickness: 10,
    //   bevelSize: 8,
    //   bevelSegments: 5,
    // });
    // var textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });

    // var mesh = new THREE.Mesh(geometryText, textMaterial);
    // mesh.position.set(15, 150, 15);
    // mesh.castShadow = true;
    // mesh.receiveShadow = true;
    // mesh.rotation.y = Math.PI / 2;
    // scene.add(mesh);

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
    // texture.rotateX = -Math.PI / 2;
    // texture.repeat.set(1, 1);

    const cornerTop = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.5, WIDTH_PLANE),
      new THREE.MeshPhongMaterial({ color: 0xffffff })
    );
    cornerTop.position.set(0, HEIGHT_PLANE / 2, 0.75);
    cornerTop.receiveShadow = true;
    cornerTop.rotateX(Math.PI / 2);
    cornerTop.rotateY(Math.PI / 2);
    scene.add(cornerTop);
    const cornerBottom = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.5, WIDTH_PLANE),
      new THREE.MeshPhongMaterial({ color: 0xffffff })
    );
    cornerBottom.position.set(0, -HEIGHT_PLANE / 2, 0.75);
    cornerBottom.receiveShadow = true;
    cornerBottom.rotateX(Math.PI / 2);
    cornerBottom.rotateY(Math.PI / 2);
    scene.add(cornerBottom);

    const cornerLeft = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.5, HEIGHT_PLANE),
      new THREE.MeshPhongMaterial({ color: 0xffffff })
    );
    cornerLeft.position.set(-WIDTH_PLANE / 2, 0, 0.75);
    cornerLeft.receiveShadow = true;
    cornerLeft.rotateX(Math.PI / 2);
    scene.add(cornerLeft);

    const cornerRight = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.5, HEIGHT_PLANE),
      new THREE.MeshPhongMaterial({ color: 0xffffff })
    );
    cornerRight.position.set(WIDTH_PLANE / 2, 0, 0.75);
    cornerRight.receiveShadow = true;
    cornerRight.rotateX(Math.PI / 2);
    scene.add(cornerRight);
    const geometry = new THREE.PlaneBufferGeometry(WIDTH_PLANE, HEIGHT_PLANE);
    const planMesh = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      // map: texture,
      specularColor: 0xffffff,
      emissive: 0xfafaf,
      metalness: 1,
      roughness: 1,
      reflectivity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.3,
    });
    const plan = new THREE.Mesh(geometry, planMesh);
    plan.position.set(0, 0, 0);
    plan.receiveShadow = true;
    // plan.rotation.x = -Math.PI / 2;
    // plan.rotation.y = -0.5;
    scene.add(plan);
    // for (let i = 0; i < plan.geometry.vertices.length; i++) {
    //   const element = plan.geometry.vertices[i];
    // }
    /***************            BALL            ***********/
    const sphereGeometry = new THREE.SphereGeometry(0.5, 100, 100);
    for (let i = 0; i < balls.length; i++) {
      let sphereMaterial = new THREE.MeshPhysicalMaterial({
        color: balls[i].color,
        emissive: 0x000000,
        metalness: 0.5,
        roughness: 0.5,
        reflectivity: 0.5,
        clearcoat: 0.5,
        clearcoatRoughness: 0.5,
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
      let vector = new THREE.Vector2(0.07, 0.07);
      let dy = 1;
      for (let i = 1; i < scene.children.length; i++) {
        if (scene.children[i].geometry?.type === "SphereGeometry") {
          const element = scene.children[i].position;

          const plane = new THREE.Plane(
            new THREE.Vector3(0, 0, 1),
            // plan.geometry.parameters.width / 40
            0
          );
          const sphereBB = new THREE.Box3().setFromObject(scene.children[i]);
          if (
            !sphereBB.intersectsPlane(plane) ||
            scene.children[i].position.z >= 20
          ) {
            dy = -dy;
            element.z += vector.y * dy;
          }

          scene.children[i].position.set(element.x, element.y, element.z);
        }
      }
      light3.position.set(
        camera.position.x,
        camera.position.y,
        camera.position.z
      );
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
