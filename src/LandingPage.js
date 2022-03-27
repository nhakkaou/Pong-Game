import { useEffect } from "react";
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import fontFile from "./assets/Fonts/helvetiker.json";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
function LandingPage() {
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
    camera.position.set(
      13.877768088181375,
      12.829180712690405,
      36.574781956038876
    );
    const PointLight = new THREE.PointLight(0xffffff, 1, 100);
    PointLight.position.set(6, 10, 10);
    scene.add(PointLight);
    // scene.add(new THREE.AxesHelper(50));
    const font = new FontLoader().parse(fontFile);
    const textGeo = new TextGeometry("1337", {
      font: font,
      size: 9,
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.5,
      bevelSize: 0.1,
      bevelSegments: 5,
    });
    const textMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x00000,
      metalness: 0.5,
      roughness: 0.5,
      reflectivity: 0.5,
      clearcoat: 0.5,
      clearcoatRoughness: 0.5,
      clearcoatNormalScale: 0.5,
      sheen: 0.5,
    });

    const mesh = new THREE.Mesh(textGeo, textMaterial);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    console.log(scene);
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.update();

    const animate = function () {
      requestAnimationFrame(animate);
      PointLight.position.y = Math.sin(Date.now() * 0.001) * 10;
      PointLight.position.z = Math.sin(Date.now() * 0.001) * 10;
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

export default LandingPage;
