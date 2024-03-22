import {
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  SphereGeometry,
  TextureLoader,
} from "three";
import { planetTemplate } from "./planetHandler";

class Planet {
  // private solarRadius: number;
  // private name: string;
  private rotationSpeed: number;
  private revolutionSpeed: number; // TODO
  private mesh: Mesh;
  private orbitCenter: Object3D;

  constructor(planetData: planetTemplate) {
    const geometry = new SphereGeometry(planetData.radius, 32, 16);
    const texture = new TextureLoader().load(planetData.textureFile);
    let material;
    if (planetData.isStar != null && planetData.isStar) {
      material = new MeshBasicMaterial({ map: texture });
    } else {
      material = new MeshStandardMaterial({ map: texture });
    }

    // this.name = planetData.name;
    // this.solarRadius = solarRadius;
    this.rotationSpeed = planetData.rotationSpeed;
    this.revolutionSpeed = planetData.revolutionSpeed;
    this.mesh = new Mesh(geometry, material);
    this.orbitCenter = new Object3D();

    this.mesh.translateX(planetData.solarRadius);
    this.orbitCenter.add(this.mesh);
  }

  public animate(delta: number) {
    this.mesh.rotateY(delta * this.rotationSpeed * 0.1);
    this.orbitCenter.rotateY(delta * this.revolutionSpeed * 0.1);
    // TODO
    // const axis = new Vector3(0, 1, 0);
    // this.mesh.rotateOnWorldAxis(axis, delta * this.revolutionSpeed * 0.1);
  }

  public getOrbitCenter(): Object3D {
    return this.orbitCenter;
  }

  public getMesh(): Mesh {
    return this.mesh;
  }
}

export { Planet };
