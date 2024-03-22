import {
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SphereGeometry,
  TextureLoader,
  Vector3,
} from "three";
import { planetTemplate } from "./planetHandler";

class Planet extends Mesh {
  // private solarRadius: number;
  private rotationSpeed: number;
  private revolutionSpeed: number; // TODO
  constructor(planetData: planetTemplate) {
    const geometry = new SphereGeometry(planetData.radius, 32, 16);
    const texture = new TextureLoader().load(planetData.textureFile);
    const material = new MeshStandardMaterial({ map: texture });
    super(geometry, material);
    this.name = planetData.name;
    // this.solarRadius = solarRadius;
    this.rotationSpeed = planetData.rotationSpeed;
    this.revolutionSpeed = planetData.revolutionSpeed;
    this.translateX(planetData.solarRadius);
  }

  public animate(delta: number) {
    this.rotateY(delta * this.rotationSpeed * 0.1);
    // TODO
    const axis = new Vector3(0, 1, 0);
    this.rotateOnWorldAxis(axis, delta * this.revolutionSpeed * 0.1);
  }
}

export { Planet };
