const trees = [
  {
    id: 1,
    name: "Dita",
    price: 250,
    image: "/Dita.png",
    familyName: "Apocynaceae",
    conservationStatus: "Least Concern",
    treeId: "TRE-001",
    species: "Alstonia scholaris",
    assignedFarmer: "Juan Dela Cruz",
    lastUpdate: "2025-05-01",
    currentLocation: "Batangas, Philippines",
    stage: "Planted",
    nextUpdateDue: "2025-08-01",
    photoUpload: null,
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
    price: 300,
    image: "/Araucaria.png",
    familyName: "Araucariaceae",
    conservationStatus: "Vulnerable",
    treeId: "TRE-002",
    species: "Araucaria heterophylla",
    assignedFarmer: "Maria Santos",
    lastUpdate: "2025-04-15",
    currentLocation: "Laguna, Philippines",
    stage: "Pending",
    nextUpdateDue: "2025-07-15",
    photoUpload: null,
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
    price: 150,
    image: "/Aunasin.jpg",
    familyName: "Primulaceae",
    conservationStatus: "Not Evaluated",
    treeId: "TRE-003",
    species: "Ardisia elliptica",
    assignedFarmer: "Pedro Reyes",
    lastUpdate: "2025-03-20",
    currentLocation: "Quezon, Philippines",
    stage: "Paid",
    nextUpdateDue: "2025-06-20",
    photoUpload: null,
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
    price: 180,
    image: "/NeemTree.jpg",
    familyName: "Meliaceae",
    conservationStatus: "Not Evaluated",
    treeId: "TRE-004",
    species: "Azadirachta indica",
    assignedFarmer: "Ana Villanueva",
    lastUpdate: "2025-04-01",
    currentLocation: "Cebu, Philippines",
    stage: "Planted",
    nextUpdateDue: "2025-07-01",
    photoUpload: null,
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
    price: 220,
    image: "/Botong.jpg",
    familyName: "Lecythidaceae",
    conservationStatus: "Least Concern",
    treeId: "TRE-005",
    species: "Barringtonia asiatica",
    assignedFarmer: "Carlos Mendoza",
    lastUpdate: "2025-05-10",
    currentLocation: "Palawan, Philippines",
    stage: "Planted",
    nextUpdateDue: "2025-08-10",
    photoUpload: null,
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
    price: 200,
    image: "/Napoleon.jpg",
    familyName: "Fabaceae",
    conservationStatus: "Not Evaluated",
    treeId: "TRE-006",
    species: "Bauhinia purpurea",
    assignedFarmer: "Rosa Garcia",
    lastUpdate: "2025-03-05",
    currentLocation: "Davao, Philippines",
    stage: "Pending",
    nextUpdateDue: "2025-06-05",
    photoUpload: null,
    description: `Napoleon's Plume is known for its distinctive leaves that mimic 
    butterfly wings. It creates the illusion of green butterflies gathering around 
    its flowers.`,
    source: 
    `Philippine Guidebook on Plant Species Suitable for Urban Greening
    Published by: Department of Environment and Natural Resources (DENR)`,
  },

  {
    id: 7,
    name: "Bottle Brush Tree",
    price: 200,
    image: "/BottleBrush.jpg",
    familyName: "Myrtaceae",
    conservationStatus: "Not Evaluated",
    treeId: "TRE-007",
    species: "Callistemon citrinus",
    assignedFarmer: "Jose Ramos",
    lastUpdate: "2025-04-22",
    currentLocation: "Bukidnon, Philippines",
    stage: "Paid",
    nextUpdateDue: "2025-07-22",
    photoUpload: null,
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
    price: 230,
    image: "/Bitaog.jpg",
    familyName: "Calophyllaceae",
    conservationStatus: "Least Concern",
    treeId: "TRE-008",
    species: "Calophyllum inophyllum",
    assignedFarmer: "Luisa Torres",
    lastUpdate: "2025-05-03",
    currentLocation: "Samar, Philippines",
    stage: "Planted",
    nextUpdateDue: "2025-08-03",
    photoUpload: null,
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
    price: 300,
    image: "/YlangYlang.jpg",
    familyName: "Annonaceae",
    conservationStatus: "Least Concern",
    treeId: "TRE-009",
    species: "Cananga odorata",
    assignedFarmer: "Ramon Flores",
    lastUpdate: "2025-04-10",
    currentLocation: "Bataan, Philippines",
    stage: "Planted",
    nextUpdateDue: "2025-07-10",
    photoUpload: null,
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
    price: 170,
    image: "/Kalingag.jpg",
    familyName: "Lauraceae",
    conservationStatus: "Near Threatened",
    treeId: "TRE-010",
    species: "Cinnamomum mercadoi",
    assignedFarmer: "Elena Cruz",
    lastUpdate: "2025-03-15",
    currentLocation: "Mindoro, Philippines",
    stage: "Pending",
    nextUpdateDue: "2025-06-15",
    photoUpload: null,
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
    price: 210,
    image: "/BagawakMorado.jpg",
    familyName: "Lamiaceae",
    conservationStatus: "Least Concern",
    treeId: "TRE-011",
    species: "Clerodendrum quadriloculare",
    assignedFarmer: "Antonio Reyes",
    lastUpdate: "2025-05-08",
    currentLocation: "Iloilo, Philippines",
    stage: "Paid",
    nextUpdateDue: "2025-08-08",
    photoUpload: null,
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
    price: 350,
    image: "/Salingbobog.jpg",
    familyName: "Capparaceae",
    conservationStatus: "Least Concern",
    treeId: "TRE-012",
    species: "Crateva religiosa",
    assignedFarmer: "Marilou Bautista",
    lastUpdate: "2025-04-28",
    currentLocation: "Leyte, Philippines",
    stage: "Planted",
    nextUpdateDue: "2025-07-28",
    photoUpload: null,
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
    price: 170,
    image: "/HandkerchiefTree.jpg",
    familyName: "Fabaceae",
    conservationStatus: "Not Evaluated",
    treeId: "TRE-013",
    species: "Dalbergia pinnata",
    assignedFarmer: "Benjamin Lim",
    lastUpdate: "2025-03-25",
    currentLocation: "Pangasinan, Philippines",
    stage: "Pending",
    nextUpdateDue: "2025-06-25",
    photoUpload: null,
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
    price: 400,
    image: "/Katmon.jpg",
    familyName: "Dilleniaceae",
    conservationStatus: "Near Threatened",
    treeId: "TRE-014",
    species: "Dillenia philippinensis",
    assignedFarmer: "Gloria Navarro",
    lastUpdate: "2025-05-12",
    currentLocation: "Rizal, Philippines",
    stage: "Planted",
    nextUpdateDue: "2025-08-12",
    photoUpload: null,
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
    price: 320,
    image: "/RainbowTree.jpg",
    familyName: "Myrtaceae",
    conservationStatus: "Not Evaluated",
    treeId: "TRE-015",
    species: "Eucalyptus deglupta",
    assignedFarmer: "Fernando Aquino",
    lastUpdate: "2025-04-05",
    currentLocation: "Nueva Ecija, Philippines",
    stage: "Paid",
    nextUpdateDue: "2025-07-05",
    photoUpload: null,
    description: 
    `The Rainbow Tree is considered one of the most beautiful trees 
in the world because of its colorful bark and towering appearance.`,
    source: 
    `Philippine Guidebook on Plant Species Suitable for Urban Greening
    Published by: Department of Environment and Natural Resources (DENR)`,
  },
];

export default trees;