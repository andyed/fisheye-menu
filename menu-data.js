/**
 * Menu data — real taxonomies and Psychodeli+ palettes for testing
 * fisheye flyout behavior at various depths and item counts.
 */

// ── Biological Taxonomy (Linnaean) ─────────────────────────────
const biology = {
  label: 'Biology',
  children: [
    { label: 'Animalia', children: [
      { label: 'Chordata', children: [
        { label: 'Mammalia', children: [
          { label: 'Primates' },
          { label: 'Carnivora' },
          { label: 'Cetacea' },
          { label: 'Chiroptera' },
          { label: 'Rodentia' },
          { label: 'Lagomorpha' },
          { label: 'Proboscidea' },
          { label: 'Perissodactyla' },
          { label: 'Artiodactyla' },
        ]},
        { label: 'Aves', children: [
          { label: 'Passeriformes' },
          { label: 'Accipitriformes' },
          { label: 'Strigiformes' },
          { label: 'Psittaciformes' },
          { label: 'Columbiformes' },
        ]},
        { label: 'Reptilia', children: [
          { label: 'Squamata' },
          { label: 'Testudines' },
          { label: 'Crocodilia' },
        ]},
        { label: 'Amphibia' },
        { label: 'Actinopterygii' },
      ]},
      { label: 'Arthropoda', children: [
        { label: 'Insecta', children: [
          { label: 'Coleoptera (beetles)' },
          { label: 'Lepidoptera (butterflies)' },
          { label: 'Hymenoptera (ants, bees)' },
          { label: 'Diptera (flies)' },
          { label: 'Hemiptera (true bugs)' },
          { label: 'Orthoptera (grasshoppers)' },
          { label: 'Odonata (dragonflies)' },
        ]},
        { label: 'Arachnida' },
        { label: 'Crustacea' },
        { label: 'Myriapoda' },
      ]},
      { label: 'Mollusca', children: [
        { label: 'Gastropoda' },
        { label: 'Bivalvia' },
        { label: 'Cephalopoda' },
      ]},
      { label: 'Cnidaria' },
      { label: 'Porifera' },
    ]},
    { label: 'Plantae', children: [
      { label: 'Angiosperms', children: [
        { label: 'Rosaceae (roses)' },
        { label: 'Fabaceae (legumes)' },
        { label: 'Poaceae (grasses)' },
        { label: 'Asteraceae (daisies)' },
        { label: 'Orchidaceae (orchids)' },
        { label: 'Solanaceae (nightshades)' },
      ]},
      { label: 'Gymnosperms', children: [
        { label: 'Pinaceae (pines)' },
        { label: 'Cupressaceae (cypress)' },
        { label: 'Ginkgoaceae' },
      ]},
      { label: 'Ferns' },
      { label: 'Mosses' },
    ]},
    { label: 'Fungi', children: [
      { label: 'Ascomycota' },
      { label: 'Basidiomycota' },
      { label: 'Zygomycota' },
      { label: 'Chytridiomycota' },
    ]},
    { label: 'Protista' },
    { label: 'Archaea' },
    { label: 'Bacteria' },
  ]
};

// ── Periodic Table Groups ──────────────────────────────────────
const chemistry = {
  label: 'Chemistry',
  children: [
    { label: 'Alkali Metals', children: [
      { label: 'Lithium (Li)' },
      { label: 'Sodium (Na)' },
      { label: 'Potassium (K)' },
      { label: 'Rubidium (Rb)' },
      { label: 'Caesium (Cs)' },
      { label: 'Francium (Fr)' },
    ]},
    { label: 'Alkaline Earth', children: [
      { label: 'Beryllium (Be)' },
      { label: 'Magnesium (Mg)' },
      { label: 'Calcium (Ca)' },
      { label: 'Strontium (Sr)' },
      { label: 'Barium (Ba)' },
      { label: 'Radium (Ra)' },
    ]},
    { label: 'Transition Metals', children: [
      { label: 'Iron (Fe)' },
      { label: 'Copper (Cu)' },
      { label: 'Zinc (Zn)' },
      { label: 'Silver (Ag)' },
      { label: 'Gold (Au)' },
      { label: 'Platinum (Pt)' },
      { label: 'Titanium (Ti)' },
      { label: 'Chromium (Cr)' },
      { label: 'Nickel (Ni)' },
      { label: 'Cobalt (Co)' },
      { label: 'Manganese (Mn)' },
      { label: 'Tungsten (W)' },
    ]},
    { label: 'Noble Gases', children: [
      { label: 'Helium (He)' },
      { label: 'Neon (Ne)' },
      { label: 'Argon (Ar)' },
      { label: 'Krypton (Kr)' },
      { label: 'Xenon (Xe)' },
      { label: 'Radon (Rn)' },
    ]},
    { label: 'Halogens', children: [
      { label: 'Fluorine (F)' },
      { label: 'Chlorine (Cl)' },
      { label: 'Bromine (Br)' },
      { label: 'Iodine (I)' },
      { label: 'Astatine (At)' },
    ]},
    { label: 'Lanthanides' },
    { label: 'Actinides' },
  ]
};

// ── Typography Classification ──────────────────────────────────
const typography = {
  label: 'Typography',
  children: [
    { label: 'Serif', children: [
      { label: 'Old Style', children: [
        { label: 'Garamond' },
        { label: 'Bembo' },
        { label: 'Palatino' },
        { label: 'Jenson' },
        { label: 'Caslon' },
      ]},
      { label: 'Transitional', children: [
        { label: 'Baskerville' },
        { label: 'Times New Roman' },
        { label: 'Georgia' },
        { label: 'Bookman' },
      ]},
      { label: 'Didone / Modern', children: [
        { label: 'Bodoni' },
        { label: 'Didot' },
        { label: 'Walbaum' },
      ]},
      { label: 'Slab Serif', children: [
        { label: 'Rockwell' },
        { label: 'Clarendon' },
        { label: 'Courier' },
        { label: 'Archer' },
        { label: 'Roboto Slab' },
      ]},
    ]},
    { label: 'Sans-Serif', children: [
      { label: 'Grotesque', children: [
        { label: 'Akzidenz-Grotesk' },
        { label: 'Franklin Gothic' },
        { label: 'News Gothic' },
      ]},
      { label: 'Neo-Grotesque', children: [
        { label: 'Helvetica' },
        { label: 'Arial' },
        { label: 'Univers' },
        { label: 'Roboto' },
        { label: 'San Francisco' },
        { label: 'Inter' },
      ]},
      { label: 'Humanist', children: [
        { label: 'Gill Sans' },
        { label: 'Frutiger' },
        { label: 'Optima' },
        { label: 'Verdana' },
        { label: 'Calibri' },
        { label: 'Lucida Grande' },
      ]},
      { label: 'Geometric', children: [
        { label: 'Futura' },
        { label: 'Avenir' },
        { label: 'Century Gothic' },
        { label: 'Gotham' },
        { label: 'Proxima Nova' },
      ]},
    ]},
    { label: 'Monospace', children: [
      { label: 'Courier New' },
      { label: 'Fira Code' },
      { label: 'JetBrains Mono' },
      { label: 'SF Mono' },
      { label: 'Cascadia Code' },
      { label: 'IBM Plex Mono' },
    ]},
    { label: 'Display' },
    { label: 'Script' },
  ]
};

// ── Dewey Decimal (top level + selections) ─────────────────────
const dewey = {
  label: 'Dewey Decimal',
  children: [
    { label: '000 Computer Science', children: [
      { label: '004 Data Processing' },
      { label: '005 Programming' },
      { label: '006 Special Methods', children: [
        { label: '006.3 Artificial Intelligence' },
        { label: '006.6 Computer Graphics' },
        { label: '006.7 Multimedia' },
      ]},
    ]},
    { label: '100 Philosophy', children: [
      { label: '110 Metaphysics' },
      { label: '120 Epistemology' },
      { label: '150 Psychology', children: [
        { label: '152 Perception' },
        { label: '153 Cognition' },
        { label: '154 Subconscious' },
      ]},
      { label: '160 Logic' },
      { label: '170 Ethics' },
    ]},
    { label: '200 Religion' },
    { label: '300 Social Sciences', children: [
      { label: '302 Social Interaction' },
      { label: '303 Social Processes' },
      { label: '330 Economics' },
      { label: '370 Education' },
    ]},
    { label: '400 Language' },
    { label: '500 Science', children: [
      { label: '510 Mathematics' },
      { label: '520 Astronomy' },
      { label: '530 Physics' },
      { label: '540 Chemistry' },
      { label: '570 Biology' },
      { label: '590 Zoology' },
    ]},
    { label: '600 Technology', children: [
      { label: '610 Medicine' },
      { label: '620 Engineering' },
      { label: '630 Agriculture' },
    ]},
    { label: '700 Arts', children: [
      { label: '710 Landscape & Urban' },
      { label: '720 Architecture' },
      { label: '740 Drawing & Decorative' },
      { label: '750 Painting' },
      { label: '780 Music' },
      { label: '790 Performing Arts' },
    ]},
    { label: '800 Literature' },
    { label: '900 History & Geography' },
  ]
};

// ── Psychodeli+ Color Palettes (subset) ────────────────────────
// Structured as categories with swatches for visual testing
const palettes = {
  label: 'Palettes',
  children: [
    { label: 'Psychedelic', children: [
      { label: 'Tie Dye', swatch: [255, 0, 127] },
      { label: 'Acid Trip', swatch: [0, 255, 100] },
      { label: 'Mushroom', swatch: [139, 90, 43] },
      { label: 'Hallucination', swatch: [200, 0, 255] },
      { label: 'Lava Lamp', swatch: [255, 100, 0] },
      { label: 'Third Eye', swatch: [75, 0, 200] },
      { label: 'Cosmic Consciousness', swatch: [0, 180, 255] },
      { label: 'Flower Power', swatch: [255, 105, 180] },
      { label: 'Groovy', swatch: [255, 200, 0] },
      { label: 'Peace & Love', swatch: [50, 200, 50] },
    ]},
    { label: 'Nature', children: [
      { label: 'Ocean', swatch: [0, 105, 148] },
      { label: 'Forest', swatch: [34, 139, 34] },
      { label: 'Desert', swatch: [210, 180, 140] },
      { label: 'Sunset', swatch: [255, 69, 0] },
      { label: 'Aurora', swatch: [0, 255, 180] },
      { label: 'Coral Reef', swatch: [255, 127, 80] },
      { label: 'Sakura', swatch: [255, 183, 197] },
      { label: 'Bamboo', swatch: [120, 180, 60] },
      { label: 'Rainforest', swatch: [0, 100, 50] },
      { label: 'Alpine', swatch: [100, 150, 200] },
      { label: 'Canyon', swatch: [180, 100, 50] },
      { label: 'Meadow', swatch: [120, 200, 80] },
    ]},
    { label: 'Moods', children: [
      { label: 'Fire', swatch: [255, 0, 0] },
      { label: 'Neon', swatch: [0, 255, 0] },
      { label: 'Midnight', swatch: [25, 25, 80] },
      { label: 'Lavender', swatch: [180, 130, 220] },
      { label: 'Roses', swatch: [220, 20, 60] },
      { label: 'Cherry', swatch: [200, 30, 50] },
    ]},
    { label: 'Weather', children: [
      { label: 'Thunderstorm', swatch: [60, 60, 100] },
      { label: 'Lightning', swatch: [255, 255, 200] },
      { label: 'Fog', swatch: [180, 180, 190] },
      { label: 'Blizzard', swatch: [220, 230, 255] },
      { label: 'Heatwave', swatch: [255, 150, 50] },
      { label: 'Monsoon', swatch: [50, 80, 120] },
      { label: 'Golden Hour', swatch: [255, 200, 100] },
    ]},
    { label: 'Retro', children: [
      { label: 'Grateful Dead', swatch: [220, 50, 50] },
      { label: 'Woodstock', swatch: [200, 150, 50] },
      { label: 'Studio 54', swatch: [200, 170, 0] },
      { label: 'Vaporwave', swatch: [255, 100, 200] },
      { label: 'Cyberpunk', swatch: [0, 255, 255] },
      { label: 'Matrix', swatch: [0, 200, 0] },
      { label: 'Mod London', swatch: [200, 50, 50] },
    ]},
    { label: 'Materials', children: [
      { label: 'Chrome', swatch: [200, 200, 210] },
      { label: 'Copper Glow', swatch: [180, 120, 60] },
      { label: 'Gilded Gold', swatch: [212, 175, 55] },
      { label: 'Obsidian', swatch: [30, 30, 35] },
      { label: 'Glass', swatch: [200, 220, 240] },
    ]},
  ]
};

// ── Export all menus ───────────────────────────────────────────
export const MENUS = [biology, chemistry, typography, dewey, palettes];
