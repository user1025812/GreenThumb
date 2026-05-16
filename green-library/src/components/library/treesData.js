import Dita from "../../assets/Dita.png";
import Araucaria from "../../assets/Araucaria.png";
import Aunasin from "../../assets/Aunasin.jpg";
import NeemTree from "../../assets/NeemTree.jpg";
import Botong from "../../assets/Botong.jpg";
import Napoleon from "../../assets/Napoleon.jpg";
import BottleBrush from "../../assets/BottleBrush.jpg";
import Bitaog from "../../assets/Bitaog.jpg";
import YlangYlang from "../../assets/YlangYlang.jpg";
import Kalingag from "../../assets/Kalingag.jpg";
import BagawakMorado from "../../assets/BagawakMorado.jpg";
import Salingbobog from "../../assets/Salingbobog.jpg";
import HandkerchiefTree from "../../assets/HandkerchiefTree.jpg";
import Katmon from "../../assets/Katmon.jpg";
import RainbowTree from "../../assets/RainbowTree.jpg";

const trees = [
  {
    id: 1,
    name: "Dita",
    image: Dita,
    familyName: "Apocynaceae",
    conservationStatus: "Least Concern",

    description: 
    `A native tree to the Philippines, the Dita is an evergreen tree 
    that can grow up to 40 meters in height and even further in its 
    natural environment (Flora Fauna Web, 2022).`,

    source: 
    `Philippine Guidebook on Plant Species Suitable for Urban Greening
    Published by: Department of Environment and Natural Resources (DENR)`,
  },

  {
    id: 2,
    name: "Araucaria",
    image: Araucaria,
    familyName: "Araucariaceae",
    conservationStatus: "Vulnerable",

    description: 
    `Araucaria tree is often mistaken as a pine tree in the urban setting 
    due to its conical growth form. The Araucaria is native to Australia 
    and can reach heights of 30 meters in its lifetime.

    This tree produces cones and appears dark green all year round. It is 
    suited for formal gardens and large landscapes.`,

    source: 
    `Philippine Guidebook on Plant Species Suitable for Urban Greening
    Published by: Department of Environment and Natural Resources (DENR)`,
  },

  {
    id: 3,
    name: "Aunasin",
    image: Aunasin,
    familyName: "Primulaceae",
    conservationStatus: "Not Evaluated",

    description: 
    `This small shrubby tree is gradually becoming a popular ornamental 
    plant especially in botanical gardens. It naturally grows under larger 
    trees and thrives best in semi-shaded areas.`,

    source: 
    `Philippine Guidebook on Plant Species Suitable for Urban Greening
    Published by: Department of Environment and Natural Resources (DENR)`,
  },

  {
    id: 4,
    name: "Neem Tree",
    image: NeemTree,
    familyName: "Meliaceae",
    conservationStatus: "Not Evaluated",

    description: 
    `Native to the Indian subcontinent, this evergreen tree is commonly 
    used as a shade tree in parks and commercial establishments. Its leaves also act 
    as natural insect repellents.`,

    source: 
    `Philippine Guidebook on Plant Species Suitable for Urban Greening
    Published by: Department of Environment and Natural Resources (DENR)`,
  },

  {
    id: 5,
    name: "Botong",
    image: Botong,
    familyName: "Lecythidaceae",
    conservationStatus: "Least Concern",

    description: 
    `Botong can grow up to 30 meters in height and naturally grows 
  across coastlines and sandy soils. It is characterized by broad shiny leaves and 
  beautiful flowers.`,

    source: 
    `Philippine Guidebook on Plant Species Suitable for Urban Greening
    Published by: Department of Environment and Natural Resources (DENR)`,
  },

  {
    id: 6,
    name: "Napoleon's Plume",
    image: Napoleon,
    familyName: "Fabaceae",
    conservationStatus: "Not Evaluated",

    description: `Napoleon’s Plume is known for its distinctive leaves that mimic 
    butterfly wings. It creates the illusion of green butterflies gathering around 
    its flowers.`,

    source: 
    `Philippine Guidebook on Plant Species Suitable for Urban Greening
    Published by: Department of Environment and Natural Resources (DENR)`,
  },

  {
    id: 7,
    name: "Bottle Brush Tree",
    image: BottleBrush,
    familyName: "Myrtaceae",
    conservationStatus: "Not Evaluated",

    description: 
    `The Bottlebrush tree produces flowers resembling baby bottle cleaning brushes. 
    It thrives in both wet and dry conditions making it low maintenance.`,

    source: 
    `Philippine Guidebook on Plant Species Suitable for Urban Greening
    Published by: Department of Environment and Natural Resources (DENR)`,
  },

  {
    id: 8,
    name: "Bitaog",
    image: Bitaog,
    familyName: "Calophyllaceae",
    conservationStatus: "Least Concern",

    description: 
    `Bitaog naturally occurs along shorelines and is highly tolerant to salty 
    environments and strong winds. It is one of the best shade trees for urban areas.`,

    source: 
    `Philippine Guidebook on Plant Species Suitable for Urban Greening
    Published by: Department of Environment and Natural Resources (DENR)`,
  },

  {
    id: 9,
    name: "Ylang-Ylang",
    image: YlangYlang,
    familyName: "Annonaceae",
    conservationStatus: "Least Concern",

    description: 
    `Ylang-Ylang is famous for its fragrant flowers which are used in 
    perfume production. It can grow up to 20 meters tall.`,

    source: 
    `Philippine Guidebook on Plant Species Suitable for Urban Greening
    Published by: Department of Environment and Natural Resources (DENR)`,
  },

  {
    id: 10,
    name: "Kalingag",
    image: Kalingag,
    familyName: "Lauraceae",
    conservationStatus: "Near Threatened",

    description: 
    `Kalingag is also known as Philippine cinnamon. It is valued for 
    its aromatic bark which is used for culinary and medicinal purposes.`,

    source: 
    `Philippine Guidebook on Plant Species Suitable for Urban Greening
    Published by: Department of Environment and Natural Resources (DENR)`,
  },

  {
    id: 11,
    name: "Bagawak Morado",
    image: BagawakMorado,
    familyName: "Lamiaceae",
    conservationStatus: "Least Concern",

    description: 
    `Bagawak Morado is known for its colorful foliage and stunning 
    flower clusters that resemble fireworks when blooming.`,

    source:
    `Philippine Guidebook on Plant Species Suitable for Urban Greening
    Published by: Department of Environment and Natural Resources (DENR)`,
  },

  {
    id: 12,
    name: "Salingbobog",
    image: Salingbobog,
    familyName: "Capparaceae",
    conservationStatus: "Least Concern",

    description: 
    `Salingbobog is one of the most beautiful native flowering trees 
    in the Philippines, producing vibrant white and pink flowers.`,

    source: 
    `Philippine Guidebook on Plant Species Suitable for Urban Greening
    Published by: Department of Environment and Natural Resources (DENR)`,
  },

  {
    id: 13,
    name: "Handkerchief Tree",
    image: HandkerchiefTree,
    familyName: "Fabaceae",
    conservationStatus: "Not Evaluated",

    description:
     `This tree changes leaf colors throughout the year and produces 
     fruits resembling human brains. It is ideal for shaded pathways.`,

    source: 
    `Philippine Guidebook on Plant Species Suitable for Urban Greening
    Published by: Department of Environment and Natural Resources (DENR)`,
  },

  {
    id: 14,
    name: "Katmon",
    image: Katmon,
    familyName: "Dilleniaceae",
    conservationStatus: "Near Threatened",

    description: 
    `Katmon is endemic to the Philippines and valued for its edible 
    fruits which are processed into jams and pickles.`,

    source: 
    `Philippine Guidebook on Plant Species Suitable for Urban Greening
    Published by: Department of Environment and Natural Resources (DENR)`,
  },

  {
    id: 15,
    name: "Rainbow Tree",
    image: RainbowTree,
    familyName: "Myrtaceae",
    conservationStatus: "Not Evaluated",

    description: 
    `The Rainbow Tree is considered one of the most beautiful trees 
in the world because of its colorful bark and towering appearance.`,

    source: 
    `Philippine Guidebook on Plant Species Suitable for Urban Greening
    Published by: Department of Environment and Natural Resources (DENR)`,
  },
];

export default trees;