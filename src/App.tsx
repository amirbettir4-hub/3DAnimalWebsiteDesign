import { useEffect, useMemo, useRef, useState } from "react";

const leopard =
  "https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=2200&q=90";
const jellyfish =
  "https://images.unsplash.com/photo-1495012379376-194a416fcc5f?auto=format&fit=crop&w=1400&q=90";

const species = [
  { name: "Snow leopard", scientific: "Panthera uncia", habitat: "Land", region: "Himalayas", status: "Vulnerable", image: "https://images.unsplash.com/photo-1712684637542-8842bf3fee1f?auto=format&fit=crop&w=1400&q=88" },
  { name: "Humpback whale", scientific: "Megaptera novaeangliae", habitat: "Ocean", region: "Pacific Ocean", status: "Recovering", image: "https://images.unsplash.com/photo-1617925109341-2b99305cdee2?auto=format&fit=crop&w=1600&q=88" },
  { name: "Eurasian eagle-owl", scientific: "Bubo bubo", habitat: "Air", region: "Northern Eurasia", status: "Stable", image: "https://images.unsplash.com/photo-1706085698372-ec92f8a1159f?auto=format&fit=crop&w=1400&q=88" },
  { name: "Bengal tiger", scientific: "Panthera tigris", habitat: "Land", region: "Indian subcontinent", status: "Endangered", image: "https://images.unsplash.com/photo-1668588704062-8faa21a1f5d0?auto=format&fit=crop&w=1400&q=88" },
  { name: "Moon jelly", scientific: "Aurelia aurita", habitat: "Ocean", region: "Open waters", status: "Abundant", image: jellyfish },
  { name: "African leopard", scientific: "Panthera pardus", habitat: "Land", region: "Sub-Saharan Africa", status: "Vulnerable", image: leopard },
  { name: "Red fox", scientific: "Vulpes vulpes", habitat: "Land", region: "Northern hemisphere", status: "Stable", image: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=1400&q=88" },
  { name: "Green sea turtle", scientific: "Chelonia mydas", habitat: "Ocean", region: "Tropical seas", status: "Endangered", image: "https://images.unsplash.com/photo-1576707948881-b485713fbad7?auto=format&fit=crop&w=1400&q=88" },
  { name: "Reef manta ray", scientific: "Mobula alfredi", habitat: "Ocean", region: "Indo-Pacific", status: "Vulnerable", image: "https://images.unsplash.com/photo-1549132734-353aad5e228c?auto=format&fit=crop&w=1400&q=88" },
  { name: "Greater flamingo", scientific: "Phoenicopterus roseus", habitat: "Air", region: "Coastal wetlands", status: "Stable", image: "https://images.unsplash.com/photo-1579538613958-4a428b5cb10a?auto=format&fit=crop&w=1400&q=88" },
  { name: "Poison dart frog", scientific: "Dendrobatidae", habitat: "Wetlands", region: "Central America", status: "Threatened", image: "https://images.unsplash.com/photo-1642279713764-42250d242a21?auto=format&fit=crop&w=1400&q=88" },
  { name: "Swallowtail butterfly", scientific: "Papilionidae", habitat: "Air", region: "Temperate forest", status: "Monitored", image: "https://images.unsplash.com/photo-1682994058020-ce6bbee189ae?auto=format&fit=crop&w=1400&q=88" },
  { name: "Masai giraffe", scientific: "Giraffa tippelskirchi", habitat: "Land", region: "East African savanna", status: "Endangered", image: "https://images.unsplash.com/photo-1703934169695-9c91c8bc69c3?auto=format&fit=crop&w=1400&q=88" },
  { name: "African elephant", scientific: "Loxodonta africana", habitat: "Land", region: "Sub-Saharan Africa", status: "Endangered", image: "https://images.unsplash.com/photo-1720005979515-60f2fa091fad?auto=format&fit=crop&w=1400&q=88" },
  { name: "Plains zebra", scientific: "Equus quagga", habitat: "Land", region: "Eastern Africa", status: "Near threatened", image: "https://images.unsplash.com/photo-1579172342894-e6d751ec390c?auto=format&fit=crop&w=1400&q=88" },
  { name: "Cheetah", scientific: "Acinonyx jubatus", habitat: "Land", region: "African grasslands", status: "Vulnerable", image: "https://images.unsplash.com/photo-1642954271221-09021433d387?auto=format&fit=crop&w=1400&q=88" },
  { name: "Giant Pacific octopus", scientific: "Enteroctopus dofleini", habitat: "Ocean", region: "North Pacific", status: "Data deficient", image: "https://images.unsplash.com/photo-1683163826671-7c79d06088b7?auto=format&fit=crop&w=1400&q=88" },
  { name: "Bottlenose dolphin", scientific: "Tursiops truncatus", habitat: "Ocean", region: "Temperate seas", status: "Stable", image: "https://images.unsplash.com/photo-1643674427053-49ea437ce6ca?auto=format&fit=crop&w=1400&q=88" },
  { name: "Grey reef shark", scientific: "Carcharhinus amblyrhynchos", habitat: "Ocean", region: "Coral reefs", status: "Endangered", image: "https://images.unsplash.com/photo-1566812201627-d2ebc5b056f9?auto=format&fit=crop&w=1400&q=88" },
  { name: "Long-snouted seahorse", scientific: "Hippocampus guttulatus", habitat: "Ocean", region: "Atlantic seagrass", status: "Data deficient", image: "https://images.unsplash.com/photo-1782049466840-33bd6bb84a06?auto=format&fit=crop&w=1400&q=88" },
  { name: "European brown bear", scientific: "Ursus arctos arctos", habitat: "Land", region: "Northern forests", status: "Protected", image: "https://images.unsplash.com/photo-1604429860647-58a940b46855?auto=format&fit=crop&w=1400&q=88" },
  { name: "Eurasian lynx", scientific: "Lynx lynx", habitat: "Land", region: "Boreal forest", status: "Recovering", image: "https://images.unsplash.com/photo-1636903773533-84cf46aff23b?auto=format&fit=crop&w=1400&q=88" },
  { name: "White-tailed deer", scientific: "Odocoileus virginianus", habitat: "Land", region: "North America", status: "Stable", image: "https://images.unsplash.com/photo-1723750981400-27544bc9d06e?auto=format&fit=crop&w=1400&q=88" },
  { name: "Eastern grey squirrel", scientific: "Sciurus carolinensis", habitat: "Land", region: "Eastern woodlands", status: "Stable", image: "https://images.unsplash.com/photo-1624117190463-b95d30d0278e?auto=format&fit=crop&w=1400&q=88" },
  { name: "Northern raccoon", scientific: "Procyon lotor", habitat: "Wetlands", region: "North America", status: "Expanding", image: "https://images.unsplash.com/photo-1685491107139-7d7f4f17b3eb?auto=format&fit=crop&w=1400&q=88" },
  { name: "Scarlet macaw", scientific: "Ara macao", habitat: "Air", region: "Amazon rainforest", status: "Declining", image: "https://images.unsplash.com/photo-1544923408-75c5cef46f14?auto=format&fit=crop&w=1400&q=88" },
  { name: "Toco toucan", scientific: "Ramphastos toco", habitat: "Air", region: "South America", status: "Stable", image: "https://images.unsplash.com/photo-1699388423083-91ea640a9af8?auto=format&fit=crop&w=1400&q=88" },
  { name: "Eclectus parrot", scientific: "Eclectus roratus", habitat: "Air", region: "Australasian rainforest", status: "Vulnerable", image: "https://images.unsplash.com/photo-1697789344805-bc64b0874465?auto=format&fit=crop&w=1400&q=88" },
  { name: "Indian peafowl", scientific: "Pavo cristatus", habitat: "Air", region: "Indian subcontinent", status: "Stable", image: "https://images.unsplash.com/photo-1525124353074-04c2b1a035a3?auto=format&fit=crop&w=1400&q=88" },
  { name: "Black-and-red broadbill", scientific: "Cymbirhynchus macrorhynchos", habitat: "Air", region: "Southeast Asia", status: "Stable", image: "https://images.unsplash.com/photo-1588715703712-2a8d1b0c9619?auto=format&fit=crop&w=1400&q=88" },
  { name: "Eastern grey kangaroo", scientific: "Macropus giganteus", habitat: "Land", region: "Eastern Australia", status: "Stable", image: "https://images.unsplash.com/photo-1614398306313-aa5a4c465e9e?auto=format&fit=crop&w=1400&q=88" },
  { name: "Koala", scientific: "Phascolarctos cinereus", habitat: "Land", region: "Eastern Australia", status: "Vulnerable", image: "https://images.unsplash.com/photo-1786250320508-9c8f3bba1a43?auto=format&fit=crop&w=1400&q=88" },
  { name: "Polar bear", scientific: "Ursus maritimus", habitat: "Land", region: "Arctic sea ice", status: "Vulnerable", image: "https://images.unsplash.com/photo-1514061842379-da1141f46ab9?auto=format&fit=crop&w=1400&q=88" },
  { name: "Snowy owl", scientific: "Bubo scandiacus", habitat: "Air", region: "Arctic tundra", status: "Vulnerable", image: "https://images.unsplash.com/photo-1780408584411-37e7e04227bb?auto=format&fit=crop&w=1400&q=88" },
  { name: "Reindeer", scientific: "Rangifer tarandus", habitat: "Land", region: "Circumpolar tundra", status: "Vulnerable", image: "https://images.unsplash.com/photo-1589659344494-f2f07ecff3ac?auto=format&fit=crop&w=1400&q=88" },
  { name: "Adélie penguin", scientific: "Pygoscelis adeliae", habitat: "Ocean", region: "Antarctica", status: "Stable", image: "https://images.unsplash.com/photo-1779622899408-8cb7b6c65cac?auto=format&fit=crop&w=1400&q=88" },
  { name: "Common chameleon", scientific: "Chamaeleo chamaeleon", habitat: "Land", region: "Mediterranean scrub", status: "Stable", image: "https://images.unsplash.com/photo-1573115846435-f287289feb2a?auto=format&fit=crop&w=1400&q=88" },
  { name: "Green iguana", scientific: "Iguana iguana", habitat: "Land", region: "Central America", status: "Stable", image: "https://images.unsplash.com/photo-1610629651605-0b181ad69aab?auto=format&fit=crop&w=1400&q=88" },
  { name: "American alligator", scientific: "Alligator mississippiensis", habitat: "Wetlands", region: "Southeastern USA", status: "Recovered", image: "https://images.unsplash.com/photo-1576503205892-b93e3a1881b1?auto=format&fit=crop&w=1400&q=88" },
  { name: "Asian water monitor", scientific: "Varanus salvator", habitat: "Wetlands", region: "South and Southeast Asia", status: "Stable", image: "https://images.unsplash.com/photo-1717151129315-2b8e50ac0028?auto=format&fit=crop&w=1400&q=88" },
  { name: "Capybara", scientific: "Hydrochoerus hydrochaeris", habitat: "Wetlands", region: "South America", status: "Stable", image: "https://images.unsplash.com/photo-1700553792546-3fbfc6b6613e?auto=format&fit=crop&w=1400&q=88" },
  { name: "North American beaver", scientific: "Castor canadensis", habitat: "Wetlands", region: "North America", status: "Stable", image: "https://images.unsplash.com/photo-1537314551123-2d8de5db4415?auto=format&fit=crop&w=1400&q=88" },
  { name: "Dromedary camel", scientific: "Camelus dromedarius", habitat: "Land", region: "North Africa and Arabia", status: "Domesticated", image: "https://images.unsplash.com/photo-1616599458812-d7c86e0add7e?auto=format&fit=crop&w=1400&q=88" },
  { name: "Fennec fox", scientific: "Vulpes zerda", habitat: "Land", region: "Sahara Desert", status: "Stable", image: "https://images.unsplash.com/photo-1719433203940-a9329d15d3e9?auto=format&fit=crop&w=1400&q=88" },
  { name: "California sea lion", scientific: "Zalophus californianus", habitat: "Ocean", region: "Eastern Pacific", status: "Stable", image: "https://images.unsplash.com/photo-1695250436848-7afd4dafaa43?auto=format&fit=crop&w=1400&q=88" },
  { name: "Southern stingray", scientific: "Hypanus americanus", habitat: "Ocean", region: "Western Atlantic", status: "Near threatened", image: "https://images.unsplash.com/photo-1790684921240-dfabe4d9aa99?auto=format&fit=crop&w=1400&q=88" },
  { name: "Bornean orangutan", scientific: "Pongo pygmaeus", habitat: "Land", region: "Borneo rainforest", status: "Critically endangered", image: "https://images.unsplash.com/photo-1785246580342-cd6271ce143f?auto=format&fit=crop&w=1400&q=88" },
  { name: "Brown-throated sloth", scientific: "Bradypus variegatus", habitat: "Land", region: "Central and South America", status: "Stable", image: "https://images.unsplash.com/photo-1604165645922-eb8fdc7d84ee?auto=format&fit=crop&w=1400&q=88" },
  { name: "Meerkat", scientific: "Suricata suricatta", habitat: "Land", region: "Southern Africa", status: "Stable", image: "https://images.unsplash.com/photo-1759221947594-2b8bdcb05c8d?auto=format&fit=crop&w=1400&q=88" },
  { name: "Orca", scientific: "Orcinus orca", habitat: "Ocean", region: "Global oceans", status: "Data deficient", image: "https://images.unsplash.com/photo-1721750887731-a0c76043092d?auto=format&fit=crop&w=1400&q=88" },
  { name: "Spotted hyena", scientific: "Crocuta crocuta", habitat: "Land", region: "Sub-Saharan Africa", status: "Stable", image: "https://images.unsplash.com/photo-1789660635966-46a81131609f?auto=format&fit=crop&w=1400&q=88" },
  { name: "Southern white rhinoceros", scientific: "Ceratotherium simum", habitat: "Land", region: "Southern Africa", status: "Near threatened", image: "https://images.unsplash.com/photo-1675331157578-a8926d6753b6?auto=format&fit=crop&w=1400&q=88" },
  { name: "Bighorn sheep", scientific: "Ovis canadensis", habitat: "Land", region: "Western North America", status: "Stable", image: "https://images.unsplash.com/photo-1611029237967-cddfe88cc5c9?auto=format&fit=crop&w=1400&q=88" },
  { name: "Mountain goat", scientific: "Oreamnos americanus", habitat: "Land", region: "North American ranges", status: "Stable", image: "https://images.unsplash.com/photo-1561805852-68bed6972914?auto=format&fit=crop&w=1400&q=88" },
  { name: "Alpine ibex", scientific: "Capra ibex", habitat: "Land", region: "European Alps", status: "Recovered", image: "https://images.unsplash.com/photo-1547624822-1bc2e25d0ada?auto=format&fit=crop&w=1400&q=88" },
  { name: "Red panda", scientific: "Ailurus fulgens", habitat: "Land", region: "Eastern Himalayas", status: "Endangered", image: "https://images.unsplash.com/photo-1683220642973-a4d0ca134714?auto=format&fit=crop&w=1400&q=88" },
  { name: "Western lowland gorilla", scientific: "Gorilla gorilla gorilla", habitat: "Land", region: "Central African rainforest", status: "Critically endangered", image: "https://images.unsplash.com/photo-1703925154866-231ce27ad92a?auto=format&fit=crop&w=1400&q=88" },
  { name: "Atlantic puffin", scientific: "Fratercula arctica", habitat: "Air", region: "North Atlantic", status: "Vulnerable", image: "https://images.unsplash.com/photo-1490718720478-364a07a997cd?auto=format&fit=crop&w=1400&q=88" },
  { name: "Moose", scientific: "Alces alces", habitat: "Wetlands", region: "Northern forests", status: "Stable", image: "https://images.unsplash.com/photo-1698623037967-ce256eb02a54?auto=format&fit=crop&w=1400&q=88" },
  { name: "Brown pelican", scientific: "Pelecanus occidentalis", habitat: "Air", region: "American coastlines", status: "Recovered", image: "https://images.unsplash.com/photo-1504807836432-616b5ed9c285?auto=format&fit=crop&w=1400&q=88" },
  { name: "African lion", scientific: "Panthera leo", habitat: "Land", region: "Sub-Saharan Africa", status: "Vulnerable", image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1400&q=88" },
  { name: "Hippopotamus", scientific: "Hippopotamus amphibius", habitat: "Wetlands", region: "Sub-Saharan Africa", status: "Vulnerable", image: "https://images.unsplash.com/photo-1712642421888-b3de5073231f?auto=format&fit=crop&w=1400&q=88" },
  { name: "Black rhinoceros", scientific: "Diceros bicornis", habitat: "Land", region: "Eastern and southern Africa", status: "Critically endangered", image: "https://images.unsplash.com/photo-1580661442800-a0c2662cbcbe?auto=format&fit=crop&w=1400&q=88" },
  { name: "Giant panda", scientific: "Ailuropoda melanoleuca", habitat: "Land", region: "Central China", status: "Vulnerable", image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=1400&q=88" },
  { name: "Harbor seal", scientific: "Phoca vitulina", habitat: "Ocean", region: "Northern coastlines", status: "Stable", image: "https://images.unsplash.com/photo-1633975041923-5a4c5807975a?auto=format&fit=crop&w=1400&q=88" },
  { name: "Japanese macaque", scientific: "Macaca fuscata", habitat: "Land", region: "Japanese islands", status: "Stable", image: "https://images.unsplash.com/photo-1677030043730-ca16085218a1?auto=format&fit=crop&w=1400&q=88" },
  { name: "Komodo dragon", scientific: "Varanus komodoensis", habitat: "Land", region: "Indonesian islands", status: "Endangered", image: "https://images.unsplash.com/photo-1590691563977-97e10916647b?auto=format&fit=crop&w=1400&q=88" },
  { name: "Okapi", scientific: "Okapia johnstoni", habitat: "Land", region: "Congo rainforest", status: "Endangered", image: "https://images.unsplash.com/photo-1785277168940-9ac364c6c085?auto=format&fit=crop&w=1400&q=88" },
  { name: "Blue wildebeest", scientific: "Connochaetes taurinus", habitat: "Land", region: "African savanna", status: "Stable", image: "https://images.unsplash.com/photo-1517118828960-de5ea37d8ae6?auto=format&fit=crop&w=1400&q=88" },
  { name: "Emperor penguin", scientific: "Aptenodytes forsteri", habitat: "Ocean", region: "Antarctica", status: "Near threatened", image: "https://images.unsplash.com/photo-1587606605848-7395dfb56d90?auto=format&fit=crop&w=1400&q=88" },
  { name: "Axolotl", scientific: "Ambystoma mexicanum", habitat: "Wetlands", region: "Mexico City canals", status: "Critically endangered", image: "https://images.unsplash.com/photo-1718393178841-015484337266?auto=format&fit=crop&w=1400&q=88" },
  { name: "Pangolin", scientific: "Manis pentadactyla", habitat: "Land", region: "South and Southeast Asia", status: "Critically endangered", image: "https://images.unsplash.com/photo-1603703661537-137f7373028a?auto=format&fit=crop&w=1400&q=88" },
  { name: "Platypus", scientific: "Ornithorhynchus anatinus", habitat: "Wetlands", region: "Eastern Australia", status: "Near threatened", image: "https://images.unsplash.com/photo-1709187149178-8142bdac880c?auto=format&fit=crop&w=1400&q=88" },
  { name: "Hammerhead shark", scientific: "Sphyrna mokarran", habitat: "Ocean", region: "Tropical coastlines", status: "Critically endangered", image: "https://images.unsplash.com/photo-1706957782008-c26bd6c10840?auto=format&fit=crop&w=1400&q=88" },
  { name: "Arctic fox", scientific: "Vulpes lagopus", habitat: "Land", region: "Arctic tundra", status: "Least concern", image: "https://images.unsplash.com/photo-1470093851219-69951fcbb533?auto=format&fit=crop&w=1400&q=88" },
  { name: "Tasmanian devil", scientific: "Sarcophilus harrisii", habitat: "Land", region: "Tasmania", status: "Endangered", image: "https://images.unsplash.com/photo-1564360827970-90aea1384d80?auto=format&fit=crop&w=1400&q=88" },
  { name: "Manatee", scientific: "Trichechus manatus", habitat: "Ocean", region: "Caribbean and Gulf coast", status: "Vulnerable", image: "https://images.unsplash.com/photo-1502727002602-2e55a2b341a4?auto=format&fit=crop&w=1400&q=88" },
] as const;

type SpeciesDetail = { diet: string; lifespan: string; size: string; activity: string; fact: string; };

const speciesDetails: Record<(typeof species)[number]["scientific"], SpeciesDetail> = {
  "Panthera uncia": { diet: "Wild sheep, ibex", lifespan: "15–18 years", size: "75–150 cm", activity: "Dawn and dusk", fact: "Its oversized paws act like natural snowshoes on steep Himalayan slopes." },
  "Megaptera novaeangliae": { diet: "Krill, small fish", lifespan: "80–90 years", size: "12–16 metres", activity: "Seasonal migration", fact: "Each population develops complex songs that evolve from year to year." },
  "Bubo bubo": { diet: "Mammals, birds", lifespan: "20–30 years", size: "58–75 cm", activity: "Nocturnal", fact: "Its powerful flight is nearly silent because of specialized feather edges." },
  "Panthera tigris": { diet: "Deer, wild boar", lifespan: "10–15 years", size: "2.4–3.1 metres", activity: "Mostly nocturnal", fact: "Every tiger has a stripe pattern as individual as a human fingerprint." },
  "Aurelia aurita": { diet: "Plankton", lifespan: "About 1 year", size: "5–40 cm", activity: "Continuous drifting", fact: "Four horseshoe-shaped organs visible through its bell are part of its digestive system." },
  "Panthera pardus": { diet: "Antelope, primates", lifespan: "12–17 years", size: "90–190 cm", activity: "Mostly nocturnal", fact: "A leopard can carry prey heavier than itself high into a tree." },
  "Vulpes vulpes": { diet: "Rodents, fruit, insects", lifespan: "3–6 years", size: "45–90 cm", activity: "Dawn and dusk", fact: "Red foxes use Earth's magnetic field to improve the accuracy of hunting leaps." },
  "Chelonia mydas": { diet: "Seagrass, algae", lifespan: "60–80 years", size: "80–120 cm", activity: "Daytime", fact: "Females navigate thousands of kilometres back to the beach where they hatched." },
  "Mobula alfredi": { diet: "Plankton", lifespan: "Around 40 years", size: "Up to 5.5 m wide", activity: "Day and night", fact: "Manta rays have the largest brain-to-body ratio of any living fish." },
  "Phoenicopterus roseus": { diet: "Algae, crustaceans", lifespan: "30–50 years", size: "110–150 cm", activity: "Daytime", fact: "Their pink color comes from carotenoid pigments in the food they filter." },
  "Dendrobatidae": { diet: "Ants, tiny insects", lifespan: "5–15 years", size: "1.5–6 cm", activity: "Daytime", fact: "Their warning colors advertise chemical defenses obtained partly from their diet." },
  "Papilionidae": { diet: "Flower nectar", lifespan: "Several weeks", size: "6–14 cm wingspan", activity: "Daytime", fact: "Some swallowtails mimic toxic butterflies to discourage predators." },
  "Giraffa tippelskirchi": { diet: "Leaves, shoots", lifespan: "20–25 years", size: "Up to 5.5 m tall", activity: "Daytime", fact: "A giraffe has seven neck vertebrae—the same number as a human." },
  "Loxodonta africana": { diet: "Grass, bark, fruit", lifespan: "60–70 years", size: "Up to 4 m tall", activity: "Day and night", fact: "Elephants communicate through low rumbles that can travel through the ground." },
  "Equus quagga": { diet: "Grasses", lifespan: "20–25 years", size: "1.2–1.4 m tall", activity: "Day and night", fact: "Striping may help confuse biting flies as they approach the zebra's coat." },
  "Acinonyx jubatus": { diet: "Small antelope", lifespan: "10–12 years", size: "110–140 cm", activity: "Daytime", fact: "A flexible spine allows the cheetah's stride to stretch to roughly seven metres." },
  "Enteroctopus dofleini": { diet: "Crabs, fish, shellfish", lifespan: "3–5 years", size: "Up to 5 m arm span", activity: "Mostly nocturnal", fact: "It has three hearts, blue blood, and thousands of chemical sensors in its suckers." },
  "Tursiops truncatus": { diet: "Fish, squid", lifespan: "40–60 years", size: "2–4 metres", activity: "Day and night", fact: "Dolphins use unique signature whistles that function much like individual names." },
  "Carcharhinus amblyrhynchos": { diet: "Reef fish, squid", lifespan: "About 25 years", size: "1.5–2 metres", activity: "Mostly nocturnal", fact: "Its exaggerated swimming posture is a warning display when it feels threatened." },
  "Hippocampus guttulatus": { diet: "Tiny crustaceans", lifespan: "3–5 years", size: "Up to 21 cm", activity: "Daytime", fact: "Male seahorses carry the developing young and give birth." },
  "Ursus arctos arctos": { diet: "Omnivorous", lifespan: "20–30 years", size: "1.5–2.8 metres", activity: "Variable", fact: "Brown bears can detect food from several kilometres away with an exceptional sense of smell." },
  "Lynx lynx": { diet: "Deer, hares", lifespan: "10–17 years", size: "80–130 cm", activity: "Dawn and dusk", fact: "Its broad, furry paws spread its weight across deep winter snow." },
  "Odocoileus virginianus": { diet: "Leaves, shoots, fruit", lifespan: "6–14 years", size: "1.5–2.2 metres", activity: "Dawn and dusk", fact: "The raised white tail flashes as a visual alarm to nearby deer." },
  "Sciurus carolinensis": { diet: "Seeds, nuts, fungi", lifespan: "6–12 years", size: "38–52 cm", activity: "Daytime", fact: "Forgotten seed caches help forests regenerate by planting future trees." },
  "Procyon lotor": { diet: "Omnivorous", lifespan: "2–5 years wild", size: "40–70 cm", activity: "Nocturnal", fact: "Highly sensitive front paws help raccoons identify objects, especially in water." },
  "Ara macao": { diet: "Fruit, nuts, seeds", lifespan: "40–50 years", size: "80–95 cm", activity: "Daytime", fact: "Pairs often remain bonded for life and reinforce that bond through mutual grooming." },
  "Ramphastos toco": { diet: "Fruit, insects, eggs", lifespan: "15–20 years", size: "55–65 cm", activity: "Daytime", fact: "Its enormous bill is lightweight and helps release excess body heat." },
  "Eclectus roratus": { diet: "Fruit, seeds, flowers", lifespan: "30–40 years", size: "35–40 cm", activity: "Daytime", fact: "Males are bright green while females are predominantly red and blue." },
  "Pavo cristatus": { diet: "Seeds, insects, plants", lifespan: "15–20 years", size: "Up to 2.3 m", activity: "Daytime", fact: "The eye-spotted train is made of elongated upper-tail feathers, not the true tail." },
  "Cymbirhynchus macrorhynchos": { diet: "Insects, fruit", lifespan: "Unknown", size: "20–24 cm", activity: "Daytime", fact: "It builds a hanging, pouch-like nest over water to reduce predator access." },
  "Macropus giganteus": { diet: "Grasses", lifespan: "8–12 years", size: "Up to 1.8 m", activity: "Dawn and dusk", fact: "Its elastic tendons recycle energy, making long-distance hopping remarkably efficient." },
  "Phascolarctos cinereus": { diet: "Eucalyptus leaves", lifespan: "10–15 years", size: "60–85 cm", activity: "Mostly nocturnal", fact: "Koalas may sleep up to 20 hours daily because their food provides little energy." },
  "Ursus maritimus": { diet: "Primarily seals", lifespan: "20–30 years", size: "1.8–2.8 metres", activity: "Day and night", fact: "Its skin is black and its apparently white fur is actually translucent." },
  "Bubo scandiacus": { diet: "Lemmings, birds", lifespan: "10–20 years", size: "52–71 cm", activity: "Day and night", fact: "Unlike many owls, snowy owls often hunt in daylight during the Arctic summer." },
  "Rangifer tarandus": { diet: "Lichens, grasses", lifespan: "15–20 years", size: "1.6–2.1 metres", activity: "Migratory", fact: "Both male and female reindeer grow antlers—unusual among deer." },
  "Pygoscelis adeliae": { diet: "Krill, fish", lifespan: "10–20 years", size: "46–71 cm", activity: "Daytime", fact: "Adélie penguins can dive to around 170 metres in pursuit of prey." },
  "Chamaeleo chamaeleon": { diet: "Insects", lifespan: "3–5 years", size: "20–40 cm", activity: "Daytime", fact: "Its eyes rotate independently, creating an almost complete field of view." },
  "Iguana iguana": { diet: "Leaves, flowers, fruit", lifespan: "10–20 years", size: "Up to 2 metres", activity: "Daytime", fact: "Green iguanas can survive falls from high forest canopies and are strong swimmers." },
  "Alligator mississippiensis": { diet: "Fish, birds, mammals", lifespan: "35–50 years", size: "2.5–4.5 metres", activity: "Dawn and dusk", fact: "Alligator-made ponds provide vital water refuges for many other wetland species." },
  "Varanus salvator": { diet: "Fish, carrion, rodents", lifespan: "10–15 years", size: "1.5–2.5 metres", activity: "Daytime", fact: "This powerful swimmer can remain underwater for many minutes while hunting." },
  "Hydrochoerus hydrochaeris": { diet: "Grasses, aquatic plants", lifespan: "8–12 years", size: "1–1.3 metres", activity: "Dawn and dusk", fact: "The world's largest rodent can remain submerged for roughly five minutes." },
  "Castor canadensis": { diet: "Bark, leaves, aquatic plants", lifespan: "10–20 years", size: "74–90 cm", activity: "Mostly nocturnal", fact: "Beaver dams create wetlands that support fish, birds, amphibians, and countless insects." },
  "Camelus dromedarius": { diet: "Desert vegetation", lifespan: "40–50 years", size: "1.8–2 metres tall", activity: "Daytime", fact: "Its hump stores fat—not water—while specialized blood cells help it withstand dehydration." },
  "Vulpes zerda": { diet: "Insects, rodents, fruit", lifespan: "10–14 years", size: "24–41 cm", activity: "Nocturnal", fact: "Enormous ears release heat and can detect prey moving beneath desert sand." },
  "Zalophus californianus": { diet: "Fish, squid", lifespan: "20–30 years", size: "1.5–2.4 metres", activity: "Day and night", fact: "Sea lions can rotate their hind flippers forward, allowing them to walk on land." },
  "Hypanus americanus": { diet: "Shellfish, worms, fish", lifespan: "15–25 years", size: "Up to 1.5 m wide", activity: "Day and night", fact: "Electroreceptors around the mouth detect prey hidden beneath seafloor sand." },
  "Pongo pygmaeus": { diet: "Fruit, leaves, insects", lifespan: "35–45 years", size: "1.2–1.5 metres", activity: "Daytime", fact: "Orangutans build a new sleeping nest high in the canopy nearly every evening." },
  "Bradypus variegatus": { diet: "Leaves and buds", lifespan: "20–30 years", size: "42–80 cm", activity: "Day and night", fact: "Algae growing in its fur adds camouflage and supports a miniature ecosystem." },
  "Suricata suricatta": { diet: "Insects, reptiles, eggs", lifespan: "8–12 years", size: "25–35 cm", activity: "Daytime", fact: "Group members take turns standing guard and use distinct calls for different threats." },
  "Orcinus orca": { diet: "Fish, seals, whales", lifespan: "50–80 years", size: "6–9 metres", activity: "Day and night", fact: "Different orca communities have unique dialects and hunting traditions passed between generations." },
  "Crocuta crocuta": { diet: "Large mammals, carrion", lifespan: "12–25 years", size: "95–165 cm", activity: "Mostly nocturnal", fact: "Hyenas are skilled hunters with complex matriarchal societies, not simply scavengers." },
  "Ceratotherium simum": { diet: "Grasses", lifespan: "40–50 years", size: "3.4–4.2 metres", activity: "Dawn and dusk", fact: "The name white rhino likely comes from a word describing its wide, grass-cropping mouth." },
  "Ovis canadensis": { diet: "Grasses, shrubs", lifespan: "10–15 years", size: "1.5–1.8 metres", activity: "Daytime", fact: "Rams collide horns at high speed, protected by specialized skull and neck structures." },
  "Oreamnos americanus": { diet: "Grasses, mosses, shrubs", lifespan: "12–15 years", size: "1.2–1.8 metres", activity: "Daytime", fact: "Split hooves with rubbery pads provide remarkable grip on near-vertical rock." },
  "Capra ibex": { diet: "Alpine grasses", lifespan: "15–20 years", size: "1.2–1.7 metres", activity: "Dawn and dusk", fact: "Ibex can climb steep dam walls to reach mineral-rich salt deposits." },
  "Ailurus fulgens": { diet: "Mostly bamboo", lifespan: "8–12 years", size: "50–64 cm", activity: "Dawn and dusk", fact: "A false thumb—an enlarged wrist bone—helps the red panda grip bamboo stems." },
  "Gorilla gorilla gorilla": { diet: "Fruit, leaves, shoots", lifespan: "35–40 years", size: "1.4–1.8 metres", activity: "Daytime", fact: "Gorillas maintain strong family bonds and communicate using gestures, calls, and facial expressions." },
  "Fratercula arctica": { diet: "Small fish", lifespan: "20–30 years", size: "26–29 cm", activity: "Daytime", fact: "Backward-facing mouth spines let puffins hold many fish while continuing to hunt." },
  "Alces alces": { diet: "Leaves, twigs, aquatic plants", lifespan: "15–20 years", size: "1.4–2.1 m tall", activity: "Dawn and dusk", fact: "Moose are powerful swimmers and can dive several metres to feed on aquatic plants." },
  "Pelecanus occidentalis": { diet: "Fish", lifespan: "15–25 years", size: "1–1.5 metres", activity: "Daytime", fact: "Brown pelicans plunge-dive from the air, using expandable throat pouches to scoop fish." },
  "Panthera leo": { diet: "Antelope, zebra, buffalo", lifespan: "10–14 years", size: "1.7–2.5 metres", activity: "Mostly nocturnal", fact: "Lions are the most social cats, living in cooperative family groups called prides." },
  "Hippopotamus amphibius": { diet: "Grasses", lifespan: "40–50 years", size: "3–5 metres", activity: "Mostly nocturnal", fact: "Hippos produce a natural reddish skin secretion that helps protect against sun and microbes." },
  "Diceros bicornis": { diet: "Leaves, shoots, shrubs", lifespan: "35–50 years", size: "3–3.8 metres", activity: "Dawn and dusk", fact: "A pointed, prehensile upper lip helps black rhinos select leaves and twigs." },
  "Ailuropoda melanoleuca": { diet: "Bamboo", lifespan: "15–20 years", size: "1.2–1.9 metres", activity: "Dawn and dusk", fact: "A giant panda spends up to 14 hours a day eating enough bamboo to survive." },
  "Phoca vitulina": { diet: "Fish, squid, crustaceans", lifespan: "25–35 years", size: "1.2–1.9 metres", activity: "Day and night", fact: "Sensitive whiskers can track the water trails left behind by swimming fish." },
  "Macaca fuscata": { diet: "Fruit, leaves, insects", lifespan: "25–32 years", size: "47–60 cm", activity: "Daytime", fact: "Some groups learned to warm themselves in hot springs, a behavior passed culturally." },
  "Varanus komodoensis": { diet: "Deer, pigs, carrion", lifespan: "Around 30 years", size: "2–3 metres", activity: "Daytime", fact: "Komodo dragons combine serrated teeth, venom, and powerful tracking senses when hunting." },
  "Okapia johnstoni": { diet: "Leaves, buds, fruit", lifespan: "20–30 years", size: "1.9–2.5 metres", activity: "Daytime", fact: "The okapi is the giraffe's closest living relative despite its zebra-like leg stripes." },
  "Connochaetes taurinus": { diet: "Short grasses", lifespan: "15–20 years", size: "1.7–2.4 metres", activity: "Daytime", fact: "Vast herds follow seasonal rains in one of the planet's largest land migrations." },
  "Aptenodytes forsteri": { diet: "Fish, krill, squid", lifespan: "15–20 years", size: "100–130 cm", activity: "Day and night", fact: "Males incubate a single egg on their feet through the Antarctic winter without feeding." },
  "Ambystoma mexicanum": { diet: "Worms, insects, small fish", lifespan: "10–15 years", size: "15–30 cm", activity: "Mostly nocturnal", fact: "Unlike most amphibians, axolotls never fully metamorphose and keep their feathery gills for life." },
  "Manis pentadactyla": { diet: "Ants and termites", lifespan: "Unknown in the wild", size: "40–60 cm", activity: "Nocturnal", fact: "Its keratin scales are the most trafficked mammal product in the world." },
  "Ornithorhynchus anatinus": { diet: "Insect larvae, shrimp", lifespan: "10–17 years", size: "38–60 cm", activity: "Dawn and dusk", fact: "The male platypus delivers venom through a spur on its hind leg, and it can sense prey through electroreception." },
  "Sphyrna mokarran": { diet: "Rays, squid, crustaceans", lifespan: "20–30 years", size: "3.5–6 metres", activity: "Day and night", fact: "Its wide head improves its vision and gives extra space for the electroreceptors it uses to find prey." },
  "Vulpes lagopus": { diet: "Lemmings, birds, fish", lifespan: "3–6 years", size: "46–68 cm", activity: "Dawn and dusk", fact: "Its coat changes from white in winter to brown in summer, and it can survive temperatures below −50°C." },
  "Sarcophilus harrisii": { diet: "Carrion, small mammals, birds", lifespan: "5–6 years", size: "57–65 cm", activity: "Nocturnal", fact: "Its powerful bite is stronger per kilogram than any other mammal's, and it can eat up to 40% of its body weight in one sitting." },
  "Trichechus manatus": { diet: "Seagrass, aquatic plants", lifespan: "40–60 years", size: "3–4 metres", activity: "Day and night", fact: "Manatees are strict herbivores and can eat up to 10% of their body weight in plants every day." },
};

const quizQuestionBank = [
  { question: "Which creature has existed for more than 500 million years?", options: ["Moon jelly", "Snow leopard", "Toco toucan", "Red fox"], answer: 0, fact: "Jellyfish predate dinosaurs by hundreds of millions of years." },
  { question: "Which animal is the fastest runner on land?", options: ["Cheetah", "Kangaroo", "Bengal tiger", "African elephant"], answer: 0, fact: "A cheetah can accelerate to around 100 km/h in only a few seconds." },
  { question: "A humpback whale's song can travel across...", options: ["A small reef", "Entire ocean basins", "Only 100 metres", "Fresh water"], answer: 1, fact: "Low-frequency whale calls can travel immense distances through the ocean." },
  { question: "Which animal can independently move both eyes?", options: ["Snowy owl", "Chameleon", "Sea turtle", "Raccoon"], answer: 1, fact: "A chameleon's eyes can scan two different directions at the same time." },
  { question: "What is the largest animal in this living archive?", options: ["Polar bear", "African elephant", "Humpback whale", "Manta ray"], answer: 2, fact: "Adult humpbacks can reach around 16 metres and weigh roughly 30 tonnes." },
  { question: "Which animal changes skin color to communicate and regulate heat?", options: ["Green iguana", "Chameleon", "Alligator", "Sea turtle"], answer: 1, fact: "Chameleons change color for communication, temperature control, and camouflage." },
  { question: "Which bird cannot fly but is an exceptional swimmer?", options: ["Flamingo", "Snowy owl", "Adélie penguin", "Scarlet macaw"], answer: 2, fact: "Penguin wings evolved into powerful flippers that propel them through water." },
  { question: "Which animal carries its young in a pouch?", options: ["Koala", "Red fox", "Raccoon", "Cheetah"], answer: 0, fact: "Koalas are marsupials, and newborn joeys continue developing inside a pouch." },
  { question: "Which species has three hearts and blue blood?", options: ["Manta ray", "Octopus", "Reef shark", "Moon jelly"], answer: 1, fact: "An octopus has two hearts for its gills and one that circulates blood around its body." },
  { question: "Which animal has fingerprints remarkably similar to humans?", options: ["Koala", "Polar bear", "Dolphin", "Kangaroo"], answer: 0, fact: "Koala fingerprints are so human-like that they can be difficult to distinguish." },
  { question: "Which species is famous for building complex underwater gardens?", options: ["Seahorse", "Dolphin", "Octopus", "Alligator"], answer: 2, fact: "Some octopuses arrange shells, stones, and other objects around their dens." },
  { question: "Which land animal has the largest ears in this archive?", options: ["African elephant", "Red fox", "Giraffe", "Kangaroo"], answer: 0, fact: "An African elephant's huge ears help release body heat in warm climates." },
  { question: "Which animal can sleep while continuing to swim?", options: ["Sea turtle", "Dolphin", "Manta ray", "Penguin"], answer: 1, fact: "Dolphins rest one half of their brain at a time so they can surface to breathe." },
] as const;

function createQuiz() {
  return [...quizQuestionBank].sort(() => Math.random() - 0.5).slice(0, 5).map((question) => {
    const shuffledOptions = question.options.map((option, index) => ({ option, correct: index === question.answer })).sort(() => Math.random() - 0.5);
    return { question: question.question, options: shuffledOptions.map(({ option }) => option), answer: shuffledOptions.findIndex(({ correct }) => correct), fact: question.fact };
  });
}

const habitatNotes = {
  Land: "Adapted to life across solid ground, this species reads scent, sound, and movement with extraordinary precision.",
  Ocean: "Shaped by currents and pressure, this species moves through a world where light, distance, and sound behave differently.",
  Air: "Built around lightness and control, this species connects distant ecosystems through movement, migration, and flight.",
  Wetlands: "Living at the meeting point of land and water, this species depends on one of the planet's richest and most fragile habitats.",
} as const;

const ecosystemRoles = {
  Land: "Land animals shape vegetation, move nutrients, disperse seeds, control prey populations, and create habitat for other life.",
  Ocean: "Marine species move energy through the food web and help cycle carbon and nutrients between the surface and deep ocean.",
  Air: "Flying species connect distant habitats by pollinating plants, dispersing seeds, controlling insects, and moving nutrients.",
  Wetlands: "Wetland species maintain waterways, regulate prey, move seeds, and support ecosystems that store water and carbon.",
} as const;

function conservationContext(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes("critically endangered")) return "This species faces an extremely high risk of extinction in the wild. Habitat protection and direct recovery programs are urgent.";
  if (normalized.includes("endangered")) return "This species faces a very high risk of extinction. Protecting connected habitat and reducing human-caused mortality are essential.";
  if (normalized.includes("vulnerable") || normalized.includes("threatened")) return "Populations are under significant pressure. Monitoring, habitat conservation, and reducing exploitation can prevent further decline.";
  if (normalized.includes("data deficient") || normalized.includes("unknown")) return "Scientists do not yet have enough evidence to measure population health confidently. Field research is a conservation priority.";
  if (normalized.includes("recovered") || normalized.includes("recovering")) return "Conservation action has improved this population, demonstrating that legal protection and habitat restoration can work.";
  return "Populations are currently considered relatively secure, but long-term monitoring and healthy habitat remain important.";
}

function ArrowIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>; }
function ShuffleIcon() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 3h5v5" /><path d="M4 20 21 3" /><path d="M21 16v5h-5" /><path d="m15 15 6 6" /><path d="M4 4l5 5" /></svg>; }

function JellySculpture() {
  return (
    <div className="sculpture-wrap" aria-label="A dimensional moon jelly specimen">
      <div className="model-shadow" />
      <div className="model-orbit model-orbit-wide"><span /></div>
      <div className="model-orbit model-orbit-tall"><span /></div>
      <div className="specimen-lens">
        <div className="lens-image" style={{ backgroundImage: `url(${jellyfish})` }} />
        <div className="lens-refraction" />
        <div className="lens-shine" />
        <div className="lens-grid"><span /><span /><span /></div>
        <div className="lens-label"><small>LIVE SPECIMEN</small><strong>AA–01</strong></div>
      </div>
      <span className="model-node node-one" />
      <span className="model-node node-two" />
      <span className="model-node node-three" />
    </div>
  );
}

export default function App() {
  const filmRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<{ context: AudioContext; gain: GainNode; oscillators: OscillatorNode[]; } | null>(null);
  const themeInitRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [habitat, setHabitat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [archivePage, setArchivePage] = useState(0);
  const [selectedSpecies, setSelectedSpecies] = useState<number | null>(null);
  const [journalOpen, setJournalOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizChoice, setQuizChoice] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(createQuiz);
  const [soundOn, setSoundOn] = useState(false);

  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const speciesOfDayIndex = useMemo(() => {
    const dayNumber = Math.floor(Date.now() / 86_400_000);
    return (dayNumber * 7 + 13) % species.length;
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeInitRef.current) {
      document.documentElement.classList.add("theme-changing");
      const timer = window.setTimeout(() => document.documentElement.classList.remove("theme-changing"), 420);
      return () => window.clearTimeout(timer);
    }
    themeInitRef.current = true;
  }, [theme]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(searchQuery.trim().toLowerCase()), 150);
    return () => window.clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setArchivePage(0);
  }, [debouncedQuery, habitat]);

  const filteredSpecies = species.filter((animal) => {
    if (habitat !== "All" && animal.habitat !== habitat) return false;
    if (!debouncedQuery) return true;
    const haystack = `${animal.name} ${animal.scientific} ${animal.region} ${animal.status} ${animal.habitat}`.toLowerCase();
    return haystack.includes(debouncedQuery);
  });
  const archivePageCount = Math.max(1, Math.ceil(filteredSpecies.length / 12));
  const pagedSpecies = filteredSpecies.slice(archivePage * 12, archivePage * 12 + 12);

  useEffect(() => {
    let frame = 0;
    const updateFilm = () => {
      const section = filmRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      const nextProgress = Math.min(1, Math.max(0, -rect.top / distance));
      setProgress(nextProgress);
      const pageDistance = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--page-progress", String(Math.min(1, Math.max(0, window.scrollY / pageDistance))));
      document.documentElement.style.setProperty("--hero-parallax", `${Math.min(window.scrollY, window.innerHeight) * 0.07}px`);
      const video = videoRef.current;
      if (video?.duration && Number.isFinite(video.duration)) {
        const targetTime = nextProgress * Math.max(0, video.duration - 0.08);
        if (Math.abs(video.currentTime - targetTime) > 0.035) video.currentTime = targetTime;
      }
    };
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(updateFilm); };
    updateFilm();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  useEffect(() => {
    if (selectedSpecies === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedSpecies(null);
      if (event.key === "ArrowRight") setSelectedSpecies((current) => current === null ? null : (current + 1) % species.length);
      if (event.key === "ArrowLeft") setSelectedSpecies((current) => current === null ? null : (current - 1 + species.length) % species.length);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", onKeyDown); };
  }, [selectedSpecies]);

  useEffect(() => () => { audioRef.current?.oscillators.forEach((oscillator) => oscillator.stop()); void audioRef.current?.context.close(); }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let pointerX = window.innerWidth / 2; let pointerY = window.innerHeight / 2; let ringX = pointerX; let ringY = pointerY; let frame = 0;
    const renderCursor = () => { ringX += (pointerX - ringX) * 0.16; ringY += (pointerY - ringY) * 0.16; if (cursorRingRef.current) cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`; frame = requestAnimationFrame(renderCursor); };
    const moveCursor = (event: PointerEvent) => { pointerX = event.clientX; pointerY = event.clientY; if (cursorDotRef.current) cursorDotRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`; cursorDotRef.current?.classList.add("visible"); cursorRingRef.current?.classList.add("visible"); };
    const setCursorState = (event: PointerEvent) => { const target = event.target as HTMLElement; cursorRingRef.current?.classList.toggle("is-active", Boolean(target.closest("button, [role='button']"))); cursorRingRef.current?.classList.toggle("is-image", Boolean(target.closest(".species-image, .journal-card, .story-hero"))); };
    const hideCursor = () => { cursorDotRef.current?.classList.remove("visible"); cursorRingRef.current?.classList.remove("visible"); };
    frame = requestAnimationFrame(renderCursor);
    window.addEventListener("pointermove", moveCursor);
    document.addEventListener("pointerover", setCursorState);
    document.documentElement.addEventListener("mouseleave", hideCursor);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", moveCursor); document.removeEventListener("pointerover", setCursorState); document.documentElement.removeEventListener("mouseleave", hideCursor); };
  }, []);

  useEffect(() => {
    if (!journalOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setJournalOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", closeOnEscape); };
  }, [journalOpen]);

  const goTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const playTone = (frequency = 420) => { const audio = audioRef.current; if (!audio || !soundOn) return; const tone = audio.context.createOscillator(); const gain = audio.context.createGain(); tone.type = "sine"; tone.frequency.value = frequency; gain.gain.setValueAtTime(0, audio.context.currentTime); gain.gain.linearRampToValueAtTime(0.035, audio.context.currentTime + 0.015); gain.gain.exponentialRampToValueAtTime(0.001, audio.context.currentTime + 0.22); tone.connect(gain).connect(audio.context.destination); tone.start(); tone.stop(audio.context.currentTime + 0.24); };

  const toggleSound = () => {
    if (audioRef.current) { audioRef.current.gain.gain.linearRampToValueAtTime(0, audioRef.current.context.currentTime + 0.35); window.setTimeout(() => { audioRef.current?.oscillators.forEach((oscillator) => oscillator.stop()); void audioRef.current?.context.close(); audioRef.current = null; }, 400); setSoundOn(false); return; }
    const context = new AudioContext(); const gain = context.createGain(); const filter = context.createBiquadFilter(); gain.gain.value = 0.018; filter.type = "lowpass"; filter.frequency.value = 380; filter.Q.value = 1.4; gain.connect(filter).connect(context.destination);
    const oscillators = [73.42, 110, 146.83].map((frequency, index) => { const oscillator = context.createOscillator(); oscillator.type = index === 1 ? "sine" : "triangle"; oscillator.frequency.value = frequency; oscillator.detune.value = index * 4 - 4; oscillator.connect(gain); oscillator.start(); return oscillator; });
    audioRef.current = { context, gain, oscillators }; setSoundOn(true);
  };

  const openRandomSpecies = () => {
    let next = Math.floor(Math.random() * species.length);
    if (next === selectedSpecies && species.length > 1) next = (next + 1) % species.length;
    setSelectedSpecies(next);
    playTone(280 + Math.random() * 220);
  };

  return (
    <main>
      <div className="cursor-dot" ref={cursorDotRef} />
      <div className="cursor-ring" ref={cursorRingRef}><span>VIEW</span></div>
      <div className="page-progress" />
      <nav className="nav-shell" aria-label="Main navigation">
        <button className="brand" onClick={() => goTo("home")} aria-label="Wildform home">
          <span className="brand-mark"><i /><i /><i /></span>WILDFORM
        </button>
        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <button onClick={() => goTo("film")}>Field film</button>
          <button onClick={() => goTo("specimen")}>Specimen 01</button>
          <button onClick={() => goTo("archive")}>Species</button>
          <button onClick={() => goTo("quiz")}>Quiz</button>
          <button onClick={() => goTo("journal")}>Journal</button>
        </div>

        <button
          className="random-species-btn"
          onClick={openRandomSpecies}
          aria-label="Open a random species"
          title="Surprise me"
        >
          <ShuffleIcon />
        </button>

        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle light and dark mode"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <button className={`sound-toggle ${soundOn ? "is-on" : ""}`} onClick={toggleSound} aria-label={soundOn ? "Turn ambient sound off" : "Turn ambient sound on"}>
          <span /><span /><span /><i>{soundOn ? "Sound on" : "Sound off"}</i>
        </button>
        <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </nav>

      <section className="hero" id="home">
        <div className="hero-image" style={{ backgroundImage: `url(${leopard})` }} role="img" aria-label="African leopard resting in low light" />
        <div className="hero-grain" />
        <div className="hero-copy">
          <p className="eyebrow"><span>01</span> A digital natural history</p>
          <h1>The wild is<em>alive.</em></h1>
          <p className="intro">Get closer to the creatures that shape our living planet. An immersive study of instinct, movement, and form.</p>
          <p className="typewriter-line">OBSERVE · LEARN · PROTECT</p>
          <button className="round-link" onClick={() => goTo("film")}><span>Begin<br />the descent</span><ArrowIcon /></button>
        </div>
        <div className="hero-meta"><p>AMAZON BASIN</p><p>03° 28′ 12″ S</p></div>
        <div className="scroll-cue"><span />SCROLL TO EXPLORE</div>
      </section>

      <section className="species-marquee" aria-label="Featured species">
        <div>
          {[...species.slice(0, 14), ...species.slice(0, 14)].map((animal, index) => (
            <span key={`${animal.scientific}-${index}`}>{animal.name}<i>—</i></span>
          ))}
        </div>
      </section>

      <section className="film-section" id="film" ref={filmRef}>
        <div className="film-sticky">
          <video ref={videoRef} className={`film-video ${videoReady ? "is-ready" : ""}`} muted playsInline preload="auto" poster={jellyfish} onLoadedMetadata={() => { if (videoRef.current) videoRef.current.currentTime = 0.01; }} onCanPlay={() => setVideoReady(true)} onError={() => setVideoFailed(true)} style={{ transform: `scale(${1.04 + progress * 0.08})` }}>
            <source src="https://res.cloudinary.com/demo/video/upload/q_auto,f_auto/samples/sea-turtle.mp4" type="video/mp4" />
          </video>
          <div className="water-caustics" />
          <div className="film-overlay" />
          <div className={`film-loader ${videoReady || videoFailed ? "is-hidden" : ""}`}><span /><p>LOADING FIELD FILM</p></div>
          <div className="film-chrome"><p><i /> SCROLL-DRIVEN FILM</p><p>CHAPTER 01 — PELAGIC</p></div>
          <div className="film-progress"><span style={{ transform: `scaleY(${progress})` }} /></div>
          <div className={`film-title ${progress > 0.38 ? "faded" : ""}`}><p>DESCEND BELOW THE SURFACE</p><h2>Where life<br />becomes light.</h2></div>
          <div className={`film-transition ${progress > 0.72 ? "visible" : ""}`}><p>NEXT SPECIMEN</p><strong>Aurelia aurita</strong><span>Moon jelly · Pelagic zone</span></div>
          <div className={`depth-gate ${progress > 0.86 ? "visible" : ""}`}><span /><span /><span /></div>
          <p className="film-counter">{String(Math.round(progress * 100)).padStart(2, "0")} / 100</p>
        </div>
      </section>

      <section className="specimen" id="specimen" onMouseMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width - 0.5; const y = (event.clientY - rect.top) / rect.height - 0.5; event.currentTarget.style.setProperty("--look-x", `${x * 12}deg`); event.currentTarget.style.setProperty("--look-y", `${y * -10}deg`); event.currentTarget.style.setProperty("--glow-x", `${65 + x * 18}%`); event.currentTarget.style.setProperty("--glow-y", `${50 + y * 18}%`); }} onMouseLeave={(event) => { event.currentTarget.style.setProperty("--look-x", "0deg"); event.currentTarget.style.setProperty("--look-y", "0deg"); event.currentTarget.style.setProperty("--glow-x", "72%"); event.currentTarget.style.setProperty("--glow-y", "50%"); }}>
        <div className="specimen-noise" />
        <div className="specimen-copy">
          <p className="eyebrow"><span>02</span> Living sculpture</p>
          <h2>Built to<br /><em>drift.</em></h2>
          <p className="specimen-description">No brain. No heart. Yet every pulse is precise. Rotate your perspective and discover a form refined over 500 million years.</p>
          <div className="specimen-facts"><div><span>01</span><p>DEPTH</p><strong>200m</strong></div><div><span>02</span><p>WATER</p><strong>95%</strong></div><div><span>03</span><p>AGE</p><strong>500m yr</strong></div></div>
        </div>
        <JellySculpture />
        <div className="specimen-index"><span>PL–004</span><span>SCYPHOZOA</span><span>∞ DRIFT</span></div>
        <p className="drag-note">MOVE YOUR CURSOR<br />TO SHIFT PERSPECTIVE</p>
      </section>

      <section className="archive" id="archive">
        <div className="archive-intro">
          <div><p className="eyebrow"><span>03</span> Living archive</p><h2>One planet.<br /><em>Infinite forms.</em></h2></div>
          <div className="archive-controls">
            <p>Explore a growing field index of creatures from mountain peaks to the deepest open water.</p>

            <div className="species-search">
              <span className="search-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by name, region, or status…"
                aria-label="Search species"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <div className="habitat-filter" aria-label="Filter species by habitat">
              {["All", "Land", "Ocean", "Air", "Wetlands"].map((item) => (
                <button className={habitat === item ? "active" : ""} key={item} onClick={() => { setHabitat(item); setArchivePage(0); }}>{item}</button>
              ))}
            </div>
          </div>
        </div>

        <button
          className="species-of-day"
          onClick={() => { setSelectedSpecies(speciesOfDayIndex); playTone(340); }}
          aria-label={`Open field profile for ${species[speciesOfDayIndex].name}, species of the day`}
        >
          <div className="species-of-day-image">
            <img
              src={species[speciesOfDayIndex].image}
              alt={`${species[speciesOfDayIndex].name} — ${species[speciesOfDayIndex].region}`}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="species-of-day-body">
            <p className="species-of-day-kicker">
              <span>SPECIES OF THE DAY</span>
              <i>{String(speciesOfDayIndex + 1).padStart(2, "0")} / {String(species.length).padStart(2, "0")}</i>
            </p>
            <h3>{species[speciesOfDayIndex].name}</h3>
            <p className="species-of-day-sci">{species[speciesOfDayIndex].scientific}</p>
            <p className="species-of-day-fact">{speciesDetails[species[speciesOfDayIndex].scientific].fact}</p>
            <span className="species-of-day-cta">
              Open field profile
              <ArrowIcon />
            </span>
          </div>
        </button>

        <div className="species-grid">
          {pagedSpecies.length === 0 && (
            <div className="species-empty">
              <p>No species match "<strong>{searchQuery}</strong>".</p>
              <button onClick={() => { setSearchQuery(""); setHabitat("All"); }}>Clear filters</button>
            </div>
          )}
          {pagedSpecies.map((animal, index) => (
              <button className="species-card" key={animal.scientific} onClick={() => { setSelectedSpecies(species.indexOf(animal)); playTone(330 + index * 12); }} aria-label={`Open field profile for ${animal.name}`}>
                <div className="species-image">
                  <img
                    src={animal.image}
                    alt={`${animal.name} — ${animal.region}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="species-number">{String(archivePage * 12 + index + 1).padStart(2, "0")}</span>
                  <span className="species-habitat">{animal.habitat}</span>
                  <div className="species-scan" />
                </div>
                <div className="species-content">
                  <div><p>{animal.scientific}</p><h3>{animal.name}</h3></div>
                  <div className="species-meta"><span>{animal.region}</span><span><i />{animal.status}</span></div>
                </div>
              </button>
            ))}
        </div>
        <div className="archive-pagination">
          <button onClick={() => { setArchivePage((page) => Math.max(0, page - 1)); document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" }); }} disabled={archivePage === 0}>← Previous page</button>
          <div>
            {Array.from({ length: archivePageCount }, (_, index) => (
              <button key={index} className={archivePage === index ? "active" : ""} onClick={() => { setArchivePage(index); document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" }); }} aria-label={`Open archive page ${index + 1}`}>{String(index + 1).padStart(2, "0")}</button>
            ))}
          </div>
          <button onClick={() => { setArchivePage((page) => Math.min(archivePageCount - 1, page + 1)); document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" }); }} disabled={archivePage === archivePageCount - 1}>Next page →</button>
        </div>
        <div className="archive-footer"><p><span>{String(species.length).padStart(2, "0")}</span> SPECIES DOCUMENTED</p><p>VOLUME 01 · THE LIVING WORLD</p></div>
      </section>

      <section className="quiz-section" id="quiz">
        <div className="quiz-visual">
          <div className="quiz-image">
            <img
              src={species[33].image}
              alt={`${species[33].name} — ${species[33].region}`}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="quiz-image-overlay" />
          <p>FIELD TEST / 01</p><span>TEST YOUR INSTINCTS</span>
        </div>
        <div className="quiz-shell">
          <p className="eyebrow"><span>04</span> Field intelligence</p>
          {!quizComplete ? (
            <>
              <div className="quiz-progress"><span style={{ transform: `scaleX(${(quizStep + 1) / activeQuiz.length})` }} /></div>
              <p className="quiz-count">QUESTION {String(quizStep + 1).padStart(2, "0")} OF {String(activeQuiz.length).padStart(2, "0")}</p>
              <h2>{activeQuiz[quizStep].question}</h2>
              <div className="quiz-options">
                {activeQuiz[quizStep].options.map((option, index) => {
                  const isCorrect = index === activeQuiz[quizStep].answer;
                  const isSelected = quizChoice === index;
                  const revealed = quizChoice !== null;
                  return (
                    <button key={option} className={`${isSelected ? "selected" : ""} ${revealed && isCorrect ? "correct" : ""} ${revealed && isSelected && !isCorrect ? "wrong" : ""}`} onClick={() => { if (quizChoice !== null) return; setQuizChoice(index); playTone(isCorrect ? 620 : 220); if (isCorrect) setQuizScore((score) => score + 1); }}>
                      <span>{String.fromCharCode(65 + index)}</span>{option}
                    </button>
                  );
                })}
              </div>
              {quizChoice !== null && (
                <div className="quiz-reveal">
                  <p>{quizChoice === activeQuiz[quizStep].answer ? "Correct observation." : "Not quite — keep exploring."}</p>
                  <span>{activeQuiz[quizStep].fact}</span>
                  <button onClick={() => { if (quizStep === activeQuiz.length - 1) { setQuizComplete(true); } else { setQuizStep((step) => step + 1); setQuizChoice(null); } }}>{quizStep === activeQuiz.length - 1 ? "Reveal result" : "Next question"}<ArrowIcon /></button>
                </div>
              )}
            </>
          ) : (
            <div className="quiz-result">
              <p>FIELD TEST COMPLETE</p>
              <strong>{quizScore}/{activeQuiz.length}</strong>
              <h2>{quizScore === activeQuiz.length ? "Wildlife expert." : quizScore >= 3 ? "Natural observer." : "Curious explorer."}</h2>
              <span>{quizScore >= 3 ? "Your instincts are sharp. Keep following the traces." : "The wild always has more to teach us. Return to the archive and look closer."}</span>
              <button onClick={() => { setQuizStep(0); setQuizChoice(null); setQuizScore(0); setQuizComplete(false); setActiveQuiz(createQuiz()); }}>Retake the field test</button>
            </div>
          )}
        </div>
      </section>

      <section className="journal" id="journal">
        <p className="eyebrow"><span>05</span> Field notes</p>
        <div className="journal-heading"><h2>Every creature<br />holds a <em>story.</em></h2><p>Stories from the edge of the known world, told through science, cinema, and digital craft.</p></div>
        <article className="journal-card" role="button" tabIndex={0} aria-label="Read Ghosts of the flooded forest" onClick={() => { setJournalOpen(true); playTone(390); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { setJournalOpen(true); } }}>
          <div>
            <img
              src={leopard}
              alt="African leopard moving through a flooded forest"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p>CONSERVATION · 8 MIN READ</p><h3>Ghosts of the flooded forest</h3>
          <button aria-label="Read story"><ArrowIcon /></button>
        </article>
      </section>

      <footer><p>WILDFORM / DIGITAL NATURAL HISTORY</p><p>MADE FOR THE CURIOUS</p></footer>

      {selectedSpecies !== null && (
        <div className="species-modal" role="dialog" aria-modal="true" aria-label={`${species[selectedSpecies].name} field profile`} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedSpecies(null); }}>
          <div className="modal-panel">
            <button className="modal-close" onClick={() => setSelectedSpecies(null)} aria-label="Close field profile"><span /><span /></button>
            <div className="modal-image">
              <img
                src={species[selectedSpecies].image}
                alt={`${species[selectedSpecies].name} in ${species[selectedSpecies].region}`}
                decoding="async"
              />
              <span>{String(selectedSpecies + 1).padStart(2, "0")} / {species.length}</span><p>FIELD PROFILE</p>
            </div>
            <div className="modal-content">
              <p className="modal-kicker">{species[selectedSpecies].habitat} · {species[selectedSpecies].region}</p>
              <h2>{species[selectedSpecies].name}</h2>
              <p className="modal-scientific">{species[selectedSpecies].scientific}</p>
              <p className="modal-description">{habitatNotes[species[selectedSpecies].habitat]}{" "}{speciesDetails[species[selectedSpecies].scientific].fact}</p>
              <div className="modal-data">
                <div><span>HABITAT</span><strong>{species[selectedSpecies].habitat}</strong></div>
                <div><span>RANGE</span><strong>{species[selectedSpecies].region}</strong></div>
                <div><span>STATUS</span><strong>{species[selectedSpecies].status}</strong></div>
                <div><span>DIET</span><strong>{speciesDetails[species[selectedSpecies].scientific].diet}</strong></div>
                <div><span>LIFESPAN</span><strong>{speciesDetails[species[selectedSpecies].scientific].lifespan}</strong></div>
                <div><span>SIZE</span><strong>{speciesDetails[species[selectedSpecies].scientific].size}</strong></div>
              </div>
              <div className="modal-observation"><span>OBSERVATION</span><p>Most active:{" "}<strong>{speciesDetails[species[selectedSpecies].scientific].activity}</strong></p></div>
              <div className="modal-learning">
                <div><span>ECOLOGICAL ROLE</span><p>{ecosystemRoles[species[selectedSpecies].habitat]}</p></div>
                <div><span>CONSERVATION CONTEXT</span><p>{conservationContext(species[selectedSpecies].status)}</p></div>
              </div>
              <div className="modal-nav">
                <button onClick={() => setSelectedSpecies((selectedSpecies - 1 + species.length) % species.length)}>← Previous</button>
                <button onClick={() => setSelectedSpecies((selectedSpecies + 1) % species.length)}>Next →</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {journalOpen && (
        <div className="story-modal" role="dialog" aria-modal="true" aria-label="Ghosts of the flooded forest article" onMouseDown={(event) => { if (event.target === event.currentTarget) setJournalOpen(false); }}>
          <article className="story-panel">
            <button className="story-close" onClick={() => setJournalOpen(false)} aria-label="Close article"><span /><span /></button>
            <header className="story-hero">
              <img
                src={leopard}
                alt="African leopard moving through the flooded Okavango Delta"
                decoding="async"
              />
              <div><p>FIELD NOTE 001 · OKAVANGO DELTA</p><h2>Ghosts of the<br /><em>flooded forest.</em></h2><span>Words from the field · 8 minute read</span></div>
            </header>
            <div className="story-body">
              <aside><p>SPECIES</p><strong>Panthera pardus</strong><p>REGION</p><strong>Okavango floodplain</strong><p>STATUS</p><strong>Vulnerable</strong></aside>
              <div className="story-copy">
                <p className="story-lead">At the place where the river becomes forest, a spotted shadow moves between roots and reflected light.</p>
                <p>Seasonal floods transform vast areas of rainforest into a shifting aquatic world. Trails disappear, scent marks wash away, and familiar hunting grounds become channels. The animals that remain must read an entirely different map.</p>
                <h3>A landscape in motion</h3>
                <p>Camera traps reveal how adaptable large cats can be. They travel along fallen trunks, rest on elevated ground, and time their movement with the retreating water. Every image is a fragment of a much larger story—one that unfolds mostly beyond human sight.</p>
                <blockquote>“To protect a species, we must protect the routes it has not yet needed to take.”</blockquote>
                <p>Connected forest gives wildlife room to respond to fire, flood, drought, and human pressure. Conservation here is not only about isolated reserves. It is about preserving living corridors across an ecosystem that never stops changing.</p>
                <section className="learning-chapter">
                  <p>ECOSYSTEM LESSON 01</p><h3>How a floodplain works</h3>
                  <p>A floodplain is low-lying land that regularly receives water from a river. In the Okavango, seasonal water spreads across grassland and woodland instead of flowing directly into the sea. This pulse creates temporary channels, replenishes soil, and concentrates fish, antelope, birds, and predators around changing resources.</p>
                  <div className="learning-diagram"><div><span>01</span><strong>RAIN</strong><p>Water falls hundreds of kilometres upstream.</p></div><i>→</i><div><span>02</span><strong>FLOOD</strong><p>Slow-moving water spreads across the delta.</p></div><i>→</i><div><span>03</span><strong>RENEWAL</strong><p>Nutrients support a burst of biological activity.</p></div></div>
                </section>
                <section className="learning-chapter">
                  <p>ECOSYSTEM LESSON 02</p><h3>Why predators matter</h3>
                  <p>Large predators influence where herbivores feed and how long they remain in one place. This can prevent intense grazing in vulnerable areas and helps vegetation recover. Their presence also indicates that the ecosystem still has enough connected habitat and prey to support a complex food web.</p>
                  <ul><li><span>POPULATION</span> Predators can prevent any one prey species from becoming overly abundant.</li><li><span>BEHAVIOR</span> The risk of predation changes when and where herbivores feed.</li><li><span>BIODIVERSITY</span> Balanced food webs create opportunities for more species to coexist.</li></ul>
                </section>
                <section className="field-glossary">
                  <p>FIELD GLOSSARY</p>
                  <div><article><span>01</span><h4>Wildlife corridor</h4><p>A connected route that lets animals move safely between habitats.</p></article><article><span>02</span><h4>Camera trap</h4><p>A motion-triggered camera used to observe wildlife without a person present.</p></article><article><span>03</span><h4>Trophic cascade</h4><p>Changes that move through a food web when predators increase or decline.</p></article></div>
                </section>
                <div className="story-facts"><div><span>12 KM</span><p>DAILY RANGE</p></div><div><span>58%</span><p>FOREST COVER</p></div><div><span>03:42</span><p>CAMERA CAPTURE</p></div></div>
              </div>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
