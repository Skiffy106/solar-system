import { Scene } from "three";
import { Planet } from "./planets";

export type planetTemplate = {
  name: string;
  radius: number;
  solarRadius: number;
  rotationSpeed: number;
  revolutionSpeed: number;
  textureFile: string;
  isStar?: boolean;
};

type planetsDataTemplate = {
  star: planetTemplate;
  planets: (planetTemplate & { children?: planetTemplate[] })[];
};

export const solarSystemData: planetsDataTemplate = {
  star: {
    name: "Sun",
    radius: 5,
    solarRadius: 0,
    rotationSpeed: 0,
    revolutionSpeed: 0,
    textureFile: "sun.jpg",
    isStar: true,
  },
  planets: [
    {
      name: "Earth",
      radius: 2,
      solarRadius: 10,
      rotationSpeed: 1,
      revolutionSpeed: 3,
      textureFile: "earth.jpg",
      children: [
        {
          name: "Moon",
          radius: 1,
          solarRadius: 0,
          rotationSpeed: 0,
          revolutionSpeed: 0,
          textureFile: "moon.jpg",
        },
      ],
    },
    {
      name: "Mercury",
      radius: 1.5,
      solarRadius: 0,
      rotationSpeed: 0,
      revolutionSpeed: 0,
      textureFile: "mercury.jpg",
    },
  ],
};

export function generatePlanets(scene: Scene): Planet[] {
  const retArr: Planet[] = [];

  const sun = new Planet(solarSystemData.star);
  // const pointLight = new PointLight(new Color(0xffff00), 2, 300);

  retArr.push(sun);
  // scene.add(pointLight);
  scene.add(sun.getOrbitCenter());

  solarSystemData.planets.forEach((planetData) => {
    const planet = new Planet(planetData);
    retArr.push(planet);
    // if (planetData.children != null) {
    //   planetData.children.forEach((data) => {
    //     const subplanet = new Planet(data);
    //     retArr.push(planet);
    //     planet.add(subplanet);
    //   });
    // }
    scene.add(planet.getOrbitCenter());
  });
  return retArr;
}
