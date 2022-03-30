import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Test from "./assets/yaretzi/fireyaretziresp.gltf";
import TestTexture from "./assets/yaretzi/ao clothes.png";
import Skin from "./assets/yaretzi/skintest.jpg";

function App() {
  let SpeedBall = new THREE.Vector2(0.5, 0.4);
  let SpeedPaddle = new THREE.Vector2(0.5, 0.4);
  const balls = [
    {
      x: 3,
      y: 3,
      z: 1,
      color: 0xffffff,
    },
    {
      x: -2,
      y: -2,
      z: 1,
      color: 0xdaf7a6,
    },
    {
      x: 6,
      y: 6,
      z: 1,
      color: 0x85c1e9,
    },
  ];
  const Paddle_Width = 1.5;
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
    /************             LIGHTS         ************/
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.castShadow = true;
    light.position.set(0, 0, 10);
    scene.add(light);

    const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    light2.castShadow = true;
    light2.position.set(0, -HEIGHT_PLANE / 2 + 3, 10);
    scene.add(light2);

    const light3 = new THREE.DirectionalLight(0xffffff, 0.1);
    light3.castShadow = true;
    // light3.position.set(camera.position);
    scene.add(light3);

    const cornerTop = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.5, WIDTH_PLANE),
      new THREE.MeshPhongMaterial({ color: 0xadff2f })
    );
    cornerTop.position.set(0, HEIGHT_PLANE / 2, 0.75);
    cornerTop.receiveShadow = true;
    cornerTop.rotateX(Math.PI / 2);
    cornerTop.rotateY(Math.PI / 2);
    scene.add(cornerTop);
    const cornerBottom = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.5, WIDTH_PLANE),
      new THREE.MeshPhongMaterial({ color: 0xadff2f })
    );
    cornerBottom.position.set(0, -HEIGHT_PLANE / 2, 0.75);
    cornerBottom.receiveShadow = true;
    cornerBottom.rotateX(Math.PI / 2);
    cornerBottom.rotateY(Math.PI / 2);
    scene.add(cornerBottom);

    const cornerLeft = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.5, HEIGHT_PLANE),
      new THREE.MeshPhongMaterial({ color: 0xadff2f })
    );
    cornerLeft.position.set(-WIDTH_PLANE / 2, 0, 0.75);
    cornerLeft.receiveShadow = true;
    cornerLeft.rotateX(Math.PI / 2);
    scene.add(cornerLeft);

    const cornerRight = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.5, HEIGHT_PLANE),
      new THREE.MeshPhongMaterial({ color: 0xadff2f })
    );
    cornerRight.position.set(WIDTH_PLANE / 2, 0, 0.75);
    cornerRight.receiveShadow = true;
    cornerRight.rotateX(Math.PI / 2);
    scene.add(cornerRight);
    const geometry = new THREE.PlaneBufferGeometry(WIDTH_PLANE, HEIGHT_PLANE);
    const planMesh = new THREE.MeshPhysicalMaterial({
      color: 0xba0808,
      emissive: 0xffffff,
      metalness: 1,
      roughness: 0,
      reflectivity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
    });
    const plan = new THREE.Mesh(geometry, planMesh);
    plan.position.set(0, 0, 0);
    plan.receiveShadow = true;
    scene.add(plan);

    /**************************Paddle*************************** */
    const Paddle1 = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 2, WIDTH_PLANE / 5),
      new THREE.MeshPhysicalMaterial({
        color: 0x00bfff,
        metalness: 0.5,
        roughness: 0.5,
        reflectivity: 1,
        clearcoat: 0.5,
        clearcoatRoughness: 0.5,
      })
    );
    Paddle1.position.set(0, -HEIGHT_PLANE / 2 + 3, 0);
    Paddle1.rotateX(Math.PI / 2);
    Paddle1.rotateY(Math.PI / 2);
    Paddle1.receiveShadow = true;
    scene.add(Paddle1);

    const Paddle2 = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 2, WIDTH_PLANE / 5),
      new THREE.MeshPhysicalMaterial({
        color: 0xdc143c,
        emissive: 0x0000,
        metalness: 0,
        roughness: 1,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.2,
      })
    );
    Paddle2.position.set(0, HEIGHT_PLANE / 2 - 3, 0);
    Paddle2.rotateX(Math.PI / 2);
    Paddle2.rotateY(Math.PI / 2);
    Paddle2.receiveShadow = true;
    scene.add(Paddle2);

    /***************            BALL            ***********/
    const sphereGeometry = new THREE.SphereGeometry(1, 100, 100);
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
    /***************            Audience            ***********/
    // var mesh;
    // var map = new THREE.TextureLoader().load(TestTexture);
    // var skinMap = new THREE.TextureLoader().load(Skin);
    // map.encoding = THREE.sRGBEncoding;
    // new GLTFLoader().load(
    //   // resource URL
    //   Test,
    //   // called when the resource is loaded
    //   function (gltf) {
    //     for (let i = 0; i < gltf.scene.children.length; i++) {
    //       mesh = gltf.scene.children[i];
    //       mesh.material = new THREE.MeshBasicMaterial({
    //         map: map,
    //         color: 0xff00ff,
    //       });
    //       mesh.position.copy(Paddle1.position);
    //       mesh.scale.set(2, 2, 2);
    //       mesh.rotateX(Math.PI / 2);
    //       scene.add(mesh);
    //     }
    //     for (let i = 0; i < gltf.scene.children.length; i++) {
    //       const element = gltf.scene.children[i];
    //       mesh = element;
    //       mesh.material = new THREE.MeshBasicMaterial({
    //         map: skinMap,
    //       });
    //       mesh.position.copy(Paddle1.position);
    //       mesh.scale.set(2, 2, 2);
    //       mesh.rotateX(Math.PI / 2);
    //       scene.add(mesh);
    //     }

    //     // gltf.scene.position.copy(Paddle1.position);
    //     // gltf.scene.scale.set(2, 2, 2);
    //     // gltf.scene.rotateX(Math.PI / 2);
    //     // scene.add(gltf.scene);
    //     console.log("Scene", scene);
    //   },
    //   // called while loading is progressing
    //   function (xhr) {
    //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    //   },
    //   // called when loading has errors
    //   function (error) {
    //     console.log(error);
    //   }
    // );

    /******************************************************* */
    camera.position.set(
      -0.018223506966510716,
      -39.32133451246589,
      12.195381095421007
    );
    camera.lookAt(plan.position);
    scene.add(light);
    scene.add(new THREE.AxesHelper(50));
    console.log(scene);
    let dy = 1;
    let dx = 1;
    const animate = function () {
      requestAnimationFrame(animate);

      let sphereBB = new THREE.Box3().setFromObject(scene.children[10]);
      let cornerRightBB = new THREE.Box3().setFromObject(cornerRight);
      let cornerLeftBB = new THREE.Box3().setFromObject(cornerLeft);
      let cornerTopBB = new THREE.Box3().setFromObject(cornerTop);
      let cornerBottomBB = new THREE.Box3().setFromObject(cornerBottom);
      let Paddle1BB = new THREE.Box3().setFromObject(Paddle1);
      let Paddle2BB = new THREE.Box3().setFromObject(Paddle2);
      if (
        sphereBB.intersectsBox(cornerRightBB) ||
        sphereBB.intersectsBox(cornerLeftBB)
      )
        dx *= -1;
      if (
        sphereBB.intersectsBox(Paddle1BB) ||
        sphereBB.intersectsBox(Paddle2BB)
      )
        dy *= -1;
      if (
        sphereBB.intersectsBox(cornerTopBB) ||
        sphereBB.intersectsBox(cornerBottomBB)
      )
        scene.children[10].position.set(0, 0, 1);
      scene.children[10].position.set(
        scene.children[10].position.x + SpeedBall.x * dx,
        scene.children[10].position.y + SpeedBall.y * dy,
        scene.children[10].position.z
      );
      for (let i = 0; i < scene.children.length; i++) {
        if (
          scene.children[i]?.geometry?.type === "BoxGeometry" &&
          (i === 8 || i === 7)
        )
          scene.children[i].position.x =
            scene.children[10].position.x - SpeedPaddle.x;
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

// if (scene.children[i].geometry?.type === "SphereGeometry") {
//   const element = scene.children[i].position;
//   // const plane = new THREE.Plane(
//   //   new THREE.Vector3(0, 0, 1),
//   //   0
//   // );
//   //   element.z += vector.y * dy;
//   // }
// }
