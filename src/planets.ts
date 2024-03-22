import {
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Clock,
  TextureLoader,
} from "three";
import { planetTemplate } from "./planetHandler";

class Planet extends Mesh {
  // private solarRadius: number;
  private rotationSpeed: number;
  private revolutionSpeed: number; // TODO
  constructor(planetData: planetTemplate) {
    const geometry = new SphereGeometry(planetData.radius, 32, 16);
    const texture = new TextureLoader().load(planetData.textureFile);
    const material = new MeshBasicMaterial({ map: texture });
    super(geometry, material);
    this.name = planetData.name;
    // this.solarRadius = solarRadius;
    this.rotationSpeed = planetData.rotationSpeed;
    this.revolutionSpeed = planetData.revolutionSpeed;
    this.translateX(planetData.solarRadius);
  }

  public animate(clock: Clock) {
    const elapsed = clock.getDelta();
    this.rotateY(elapsed * this.rotationSpeed);

    // TODO
  }
}

export { Planet };
