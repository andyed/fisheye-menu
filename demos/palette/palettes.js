// 148 hand-crafted color palettes by Andy Edmonds.
// Each entry has 6–8 anchor colours; buildPaletteLUT interpolates them
// into a 256-entry RGBA LUT with the last anchor wrapping to the first
// so the gradient is seamless when used as a repeating texture.
// Released under the same MIT license as the surrounding repo.

export const COLOR_THEMES = {
    tiedye: {
        name: 'Tie Dye',
        colors: [
            [255, 0, 127],    // Hot magenta
            [148, 0, 211],    // Dark violet
            [75, 0, 130],     // Indigo
            [0, 0, 255],      // Blue
            [0, 255, 255],    // Cyan
            [0, 255, 0],      // Green
            [255, 255, 0],    // Yellow
            [255, 127, 0]     // Orange
        ],
        mood: ['energetic', 'psychedelic']
    },

    reggae: {
        name: 'Reggae',
        colors: [
            [244, 67, 54],    // Red - Start with red
            [255, 87, 34],    // Red-orange
            [255, 140, 0],    // Dark orange - smooth transition
            [255, 215, 0],    // Gold
            [200, 200, 50],   // Yellow-green transition
            [139, 195, 74],   // Lime green
            [46, 125, 50],    // Dark green
            [34, 80, 34]      // Deep forest green - End darker
        ],
        mood: ['relaxed', 'warm', 'earthy']
    },

    roses: {
        name: 'Roses',
        colors: [
            [139, 0, 0],      // Dark red
            [178, 34, 34],    // Firebrick
            [220, 20, 60],    // Crimson
            [255, 105, 180],  // Hot pink
            [255, 182, 193],  // Light pink
            [255, 240, 245],  // Lavender blush
            [147, 112, 219],  // Medium purple
            [106, 90, 205]    // Slate blue
        ],
        mood: ['romantic', 'gentle', 'warm']
    },

    sunset: {
        name: 'Sunset',
        colors: [
            [25, 25, 112],    // Midnight blue
            [72, 61, 139],    // Dark slate blue
            [138, 43, 226],   // Blue violet
            [255, 20, 147],   // Deep pink
            [255, 69, 0],     // Red-orange
            [255, 140, 0],    // Dark orange
            [255, 215, 0],    // Gold
            [255, 250, 205]   // Lemon chiffon
        ],
        mood: ['dramatic', 'warm', 'transitional']
    },

    ocean: {
        name: 'Ocean',
        colors: [
            [0, 0, 139],      // Dark blue
            [0, 105, 148],    // Deep sea
            [0, 119, 190],    // Ocean blue
            [3, 169, 244],    // Light blue
            [0, 188, 212],    // Cyan
            [0, 150, 136],    // Teal
            [77, 208, 225],   // Sky blue
            [224, 247, 250]   // Ice blue
        ],
        mood: ['calm', 'cool', 'flowing']
    },

    fire: {
        name: 'Fire',
        colors: [
            [139, 0, 0],      // Dark red
            [178, 34, 34],    // Firebrick
            [220, 20, 60],    // Crimson
            [255, 0, 0],      // Red
            [255, 69, 0],     // Red-orange
            [255, 140, 0],    // Dark orange
            [255, 165, 0],    // Orange
            [255, 215, 0]     // Gold
        ],
        mood: ['intense', 'hot', 'energetic']
    },

    forest: {
        name: 'Forest',
        colors: [
            [0, 100, 0],      // Dark green
            [34, 139, 34],    // Forest green
            [46, 125, 50],    // Green
            [76, 175, 80],    // Light green
            [139, 195, 74],   // Lime green
            [205, 220, 57],   // Yellow-green
            [139, 69, 19],    // Saddle brown
            [101, 67, 33]     // Dark brown
        ],
        mood: ['natural', 'earthy', 'calm']
    },

    neon: {
        name: 'Neon',
        colors: [
            [255, 0, 127],    // Hot pink - Start
            [255, 0, 200],    // Bright magenta
            [200, 0, 255],    // Purple-magenta
            [138, 43, 226],   // Blue violet
            [0, 150, 255],    // Bright blue
            [0, 255, 200],    // Cyan-green
            [57, 255, 20],    // Neon green
            [200, 255, 0]     // Yellow-green - smooth spectrum flow
        ],
        mood: ['electric', 'vibrant', 'synthetic']
    },

    lavender: {
        name: 'Lavender',
        colors: [
            [138, 43, 226],   // Blue violet
            [147, 112, 219],  // Medium purple
            [186, 85, 211],   // Medium orchid
            [218, 112, 214],  // Orchid
            [221, 160, 221],  // Plum
            [238, 130, 238],  // Violet
            [216, 191, 216],  // Thistle
            [230, 230, 250]   // Lavender
        ],
        mood: ['dreamy', 'soft', 'peaceful']
    },

    midnight: {
        name: 'Midnight',
        colors: [
            [20, 20, 50],     // Very dark blue (avoid pure black)
            [25, 25, 112],    // Midnight blue
            [50, 50, 130],    // Deep blue
            [72, 61, 139],    // Dark slate blue
            [106, 90, 205],   // Slate blue
            [123, 104, 238],  // Medium slate blue
            [147, 112, 219],  // Medium purple
            [170, 130, 230]   // Light purple
        ],
        mood: ['mysterious', 'cool', 'deep']
    },

    desert: {
        name: 'Desert',
        colors: [
            [140, 70, 40],    // Deep terracotta
            [170, 90, 50],    // Burnt sienna
            [200, 120, 60],   // Clay orange
            [220, 150, 80],   // Sandy orange
            [235, 180, 110],  // Warm sand
            [245, 210, 150],  // Light sand
            [250, 230, 190],  // Pale sand
            [255, 245, 220]   // Very pale cream
        ],
        mood: ['warm', 'dry', 'earthy']
    },

    cherry: {
        name: 'Cherry',
        colors: [
            [100, 0, 30],     // Deep cherry red
            [150, 0, 40],     // Dark cherry
            [200, 20, 50],    // Cherry red
            [240, 50, 80],    // Bright cherry
            [255, 100, 130],  // Cherry pink
            [255, 150, 170],  // Light cherry pink
            [255, 200, 210],  // Pale pink
            [255, 230, 235]   // Very pale pink (no muddy wheat)
        ],
        mood: ['sweet', 'bright', 'cheerful']
    },

    seventies: {
        name: '70s',
        colors: [
            [120, 60, 20],    // Deep brown
            [160, 80, 30],    // Rich brown
            [200, 110, 40],   // Burnt orange-brown
            [220, 140, 50],   // Orange-brown
            [230, 170, 70],   // Goldenrod
            [210, 180, 100],  // Muted gold
            [190, 160, 110],  // Tan (less gray)
            [170, 140, 100]   // Warm brown (back to brown, no rosy gray)
        ],
        mood: ['retro', 'warm', 'earthy', 'nostalgic']
    },

    redmoon: {
        name: 'Red Moon',
        colors: [
            [30, 0, 20],      // Very dark red-black (avoid pure black)
            [51, 0, 20],      // Deep maroon
            [80, 0, 20],      // Dark blood red
            [120, 0, 20],     // Blood red
            [160, 0, 20],     // Deep crimson
            [200, 20, 30],    // Crimson
            [240, 60, 40],    // Bright red
            [255, 100, 60]    // Red-orange glow
        ],
        mood: ['dramatic', 'mysterious', 'intense', 'nocturnal']
    },

    harvest: {
        name: 'Harvest',
        colors: [
            [101, 67, 33],    // Dark brown
            [130, 85, 40],    // Rich brown
            [165, 110, 50],   // Burnt sienna
            [200, 140, 60],   // Golden brown
            [230, 170, 70],   // Harvest gold
            [240, 150, 50],   // Pumpkin orange
            [235, 110, 50],   // Deep orange
            [210, 70, 40]     // Burnt red
        ],
        mood: ['warm', 'autumnal', 'earthy', 'abundant']
    },

    wildflowers: {
        name: 'Wildflowers',
        colors: [
            [30, 144, 255],   // Dodger blue - Start with blue
            [138, 43, 226],   // Blue violet - Blue to purple transition
            [186, 85, 211],   // Medium orchid - Mid purple
            [255, 20, 147],   // Deep pink - Purple to pink
            [255, 105, 180],  // Hot pink - Lighter pink
            [255, 180, 120],  // Peach - Pink to yellow transition
            [255, 215, 0],    // Gold - Bright yellow
            [120, 200, 80]    // Meadow green - Yellow to green
        ],
        mood: ['vibrant', 'natural', 'cheerful', 'diverse']
    },

    lotus: {
        name: 'Lotus',
        colors: [
            [180, 120, 200],  // Soft purple (center)
            [220, 170, 220],  // Lavender
            [240, 200, 220],  // Pink-lavender
            [250, 220, 230],  // Very pale pink
            [245, 250, 245],  // Almost white (petal tips)
            [230, 250, 235],  // Very pale green
            [200, 240, 210],  // Pale mint
            [170, 230, 190]   // Soft green (leaves)
        ],
        mood: ['peaceful', 'spiritual', 'gentle', 'pure']
    },

    poppy: {
        name: 'Poppy',
        colors: [
            [139, 0, 0],      // Dark red
            [180, 0, 0],      // Deep red
            [220, 20, 60],    // Crimson
            [255, 40, 40],    // Bright red
            [255, 100, 80],   // Red-coral transition
            [120, 140, 100],  // Olive-gray (petal base to stem)
            [60, 100, 60],    // Dark olive green
            [34, 80, 34]      // Deep forest (avoid pure black)
        ],
        mood: ['bold', 'striking', 'natural', 'vibrant']
    },

    orchid: {
        name: 'Orchid',
        colors: [
            [105, 50, 160],   // Deep purple - Start brighter than indigo
            [138, 70, 200],   // Rich violet
            [170, 100, 215],  // Medium violet
            [195, 115, 220],  // Light orchid
            [218, 140, 225],  // Pale orchid
            [235, 170, 230],  // Light violet-pink
            [245, 210, 240],  // Very light pink
            [250, 235, 245]   // Near-white lavender
        ],
        mood: ['exotic', 'elegant', 'sophisticated', 'delicate']
    },

    circus: {
        name: 'Circus',
        colors: [
            [255, 0, 0],      // Pure red
            [255, 165, 0],    // Orange
            [255, 215, 0],    // Gold
            [0, 128, 0],      // Green
            [0, 0, 255],      // Blue
            [128, 0, 128],    // Purple
            [255, 20, 147],   // Deep pink
            [255, 69, 0]      // Red-orange
        ],
        mood: ['playful', 'vibrant', 'energetic', 'festive']
    },

    victorian: {
        name: 'Victorian Garden',
        colors: [
            [107, 142, 35],   // Olive drab - Start with muted green
            [120, 130, 80],   // Sage green
            [147, 112, 219],  // Medium purple
            [165, 90, 210],   // Medium orchid
            [185, 105, 185],  // Medium violet
            [205, 135, 175],  // Dusty rose
            [221, 160, 221],  // Plum
            [230, 195, 230]   // Light thistle
        ],
        mood: ['elegant', 'romantic', 'refined', 'nostalgic']
    },

    nightclub: {
        name: 'Night Club',
        colors: [
            [72, 61, 139],    // Dark slate blue - Start brighter
            [105, 75, 180],   // Medium slate blue
            [138, 43, 226],   // Blue violet
            [190, 30, 220],   // Bright violet
            [230, 50, 180],   // Hot pink
            [255, 20, 147],   // Deep pink
            [80, 200, 220],   // Bright cyan
            [120, 100, 200]   // Light violet
        ],
        mood: ['electric', 'intense', 'nocturnal', 'vibrant']
    },

    tropical: {
        name: 'Tropical',
        colors: [
            [0, 180, 180],    // Bright teal - Start
            [0, 220, 200],    // Aqua
            [100, 240, 200],  // Light sea green
            [200, 255, 150],  // Lime-yellow transition
            [255, 215, 0],    // Gold
            [255, 160, 0],    // Bright orange
            [255, 100, 100],  // Coral
            [255, 50, 150]    // Hot pink - smooth spectrum
        ],
        mood: ['vibrant', 'warm', 'exotic', 'energetic']
    },

    carnival: {
        name: 'Carnival',
        colors: [
            [255, 69, 0],     // Red-orange - Start bright
            [255, 140, 0],    // Orange
            [255, 215, 0],    // Gold
            [218, 165, 32],   // Goldenrod
            [150, 100, 180],  // Purple-transition
            [128, 0, 180],    // Purple
            [100, 0, 150],    // Deep purple
            [178, 34, 80]     // Crimson-purple - smooth spectrum
        ],
        mood: ['festive', 'bold', 'celebratory', 'energetic']
    },

    moon: {
        name: 'Moon',
        colors: [
            [55, 58, 70],     // Lunar shadow (cool gray) - Start darker but not black
            [85, 90, 105],    // Medium crater shadow
            [115, 118, 135],  // Moon rock gray (blue-gray)
            [145, 150, 165],  // Medium lunar dust
            [175, 178, 195],  // Lunar dust (cool)
            [195, 205, 225],  // Cool highlight (blue highlight)
            [215, 218, 235],  // Bright crater rim (bright cool)
            [235, 238, 250]   // Sunlit surface (near-white cool)
        ],
        mood: ['dramatic', 'cold', 'desolate', 'mysterious']
    },

    galaxy: {
        name: 'Galaxy',
        colors: [
            [25, 25, 112],    // Midnight blue - Start with deep blue instead of black
            [50, 45, 125],    // Deep space blue
            [72, 61, 139],    // Dark slate blue
            [98, 82, 188],    // Medium-dark slate blue
            [123, 104, 238],  // Medium slate blue
            [180, 128, 232],  // Light violet
            [218, 112, 214],  // Orchid
            [240, 200, 230]   // Light pink-lavender
        ],
        mood: ['cosmic', 'mysterious', 'deep', 'ethereal']
    },

    emerald: {
        name: 'Emerald',
        colors: [
            [0, 60, 0],       // Deep green
            [0, 100, 40],     // Dark emerald
            [0, 128, 64],     // Emerald green
            [46, 139, 87],    // Sea green
            [60, 179, 113],   // Medium sea green
            [80, 200, 120],   // Emerald (bright)
            [144, 238, 144],  // Light green
            [200, 250, 200]   // Pale mint
        ],
        mood: ['natural', 'fresh', 'calm', 'vibrant']
    },

    sunshine: {
        name: 'Sunshine',
        colors: [
            [255, 140, 0],    // Dark orange - Depth
            [255, 165, 0],    // Orange
            [255, 191, 0],    // Amber
            [255, 215, 0],    // Gold
            [255, 255, 0],    // Yellow
            [255, 250, 205],  // Lemon chiffon
            [255, 255, 224],  // Light yellow
            [255, 255, 240]   // Ivory
        ],
        mood: ['bright', 'cheerful', 'warm', 'daylight']
    },

    cyberpunk: {
        name: 'Cyberpunk',
        colors: [
            [20, 0, 40],      // Deep void purple
            [80, 0, 120],     // Dark neon purple
            [138, 43, 226],   // Neon violet
            [255, 0, 255],    // Magenta
            [0, 255, 255],    // Cyan
            [0, 255, 128],    // Spring green
            [255, 255, 0],    // Neon yellow
            [50, 50, 50]      // Dark gray (grid contrast)
        ],
        mood: ['futuristic', 'intense', 'synthetic', 'vibrant']
    },

    mint: {
        name: 'Mint',
        colors: [
            [0, 80, 60],      // Deep teal
            [0, 128, 128],    // Teal
            [32, 178, 170],   // Light sea green
            [72, 209, 204],   // Medium turquoise
            [64, 224, 208],   // Turquoise
            [127, 255, 212],  // Aquamarine
            [175, 238, 238],  // Pale turquoise
            [240, 255, 250]   // Mint cream
        ],
        mood: ['fresh', 'cool', 'clean', 'soft']
    },

    berry: {
        name: 'Berry',
        colors: [
            [75, 0, 130],     // Indigo (Blueberry)
            [128, 0, 128],    // Purple (Grape)
            [139, 0, 139],    // Dark magenta
            [199, 21, 133],   // Medium violet red (Raspberry)
            [255, 20, 147],   // Deep pink
            [219, 112, 147],  // Pale violet red
            [255, 105, 180],  // Hot pink
            [255, 192, 203]   // Pink
        ],
        mood: ['sweet', 'vibrant', 'lush', 'warm']
    },
    classicChristmas: {
        name: 'ClassicChristmas',
        colors: [
            [160, 0, 0],       // Deep red (traditional holiday red)
            [0, 100, 0],       // Dark green (evergreen)
            [255, 255, 255],   // Pure white (snowy accents)
            [255, 215, 0],     // Gold (ornamental highlights)
            [139, 69, 19],     // Saddle brown (woodsy warmth)
            [0, 128, 128]      // Teal (modern accent)
        ],
        mood: ['festive', 'traditional', 'cozy', 'christmas', 'holiday']
    },
    winterWonderland: {
        name: 'WinterWonderland',
        colors: [
            [240, 248, 255],   // Alice blue (icy snow)
            [176, 224, 230],   // Powder blue (soft frost)
            [135, 206, 235],   // Sky blue (clear winter sky)
            [0, 191, 255],     // Deep sky blue (bright accents)
            [255, 250, 250],   // Snow white (fluffy snow)
            [192, 192, 192]    // Silver (frozen shimmer)
        ],
        mood: ['frosty', 'calm', 'magical', 'christmas', 'holiday', 'winter']
    },
    candyCane: {
        name: 'CandyCane',
        colors: [
            [255, 0, 0],       // Bright red (candy stripes)
            [255, 255, 255],   // Pure white (classic contrast)
            [255, 182, 193],   // Light pink (sweet accents)
            [250, 128, 114],   // Salmon (playful warmth)
            [255, 160, 122],   // Light coral (soft holiday cheer)
            [245, 245, 245]    // White smoke (gentle snow tones)
        ],
        mood: ['playful', 'cheerful', 'light', 'christmas', 'holiday', 'sweet']
    }, nordicNoel: {
        name: 'NordicNoel',
        colors: [
            [178, 34, 34],     // Firebrick (deep red, Nordic textiles)
            [47, 79, 79],      // Dark slate gray (winter nights)
            [220, 220, 220],   // Gainsboro (snowy accents)
            [169, 169, 169],   // Dark gray (subtle contrast)
            [25, 25, 112],     // Midnight blue (northern sky)
            [255, 250, 240]    // Floral white (soft holiday light)
        ],
        mood: ['minimal', 'cozy', 'modern', 'christmas', 'holiday', 'scandi']
    }, xmas: {
        name: 'Christmas',
        colors: [
            [160, 0, 0],       // Deep red (classic holiday red)
            [200, 20, 20],     // Bright red (festive and bold)
            [255, 255, 255],   // Pure white (snow and winter)
            [0, 100, 0],       // Dark green (classic evergreen)
            [34, 139, 34],     // Forest green (natural and earthy)
            [0, 128, 128],     // Teal (modern holiday accent)
            [255, 223, 0],     // Gold (warm and luxurious)
            [255, 215, 180]    // Soft peach (cozy and inviting)
        ],
        mood: ['festive', 'warm', 'cheerful']
    }, rusticHoliday: {
        name: 'Rustic Holiday',
        colors: [
            [139, 0, 0],       // Dark red (vintage decorations)
            [85, 107, 47],     // Dark olive green (natural tones)
            [210, 180, 140],   // Tan (wooden textures)
            [160, 82, 45],     // Sienna (earthy warmth)
            [255, 228, 196],   // Bisque (soft holiday glow)
            [128, 128, 0]      // Olive (subtle holiday green)
        ],
        mood: ['natural', 'earthy', 'cozy']
    },
    xmasSilver: {
        name: 'ChristmasSilver',
        colors: [
            [160, 0, 0],       // Deep red (classic holiday red)
            [200, 20, 20],     // Bright red (festive and bold)
            [255, 255, 255],   // Pure white (snow and winter)
            [0, 100, 0],       // Dark green (classic evergreen)
            [34, 139, 34],     // Forest green (natural and earthy)
            [0, 128, 128],     // Teal (modern holiday accent)
            [192, 192, 192],   // Silver (cool and elegant)
            [211, 211, 211]    // Light gray (frosty and subtle)
        ],
        mood: ['festive', 'cool', 'cheerful']
    },
    ash: {
        name: 'Ash',
        colors: [
            [20, 20, 20],     // Charcoal
            [45, 45, 45],     // Dark ash
            [75, 75, 75],     // Smoked gray
            [110, 110, 110],  // Warm gray
            [145, 145, 145],  // Light ash
            [185, 185, 185],  // Pale smoke
            [215, 215, 215],  // Soft white
            [235, 235, 235]   // Near-white
        ],
        mood: ['minimal', 'somber', 'neutral', 'industrial']
    },

    obsidian: {
        name: 'Obsidian',
        colors: [
            [10, 10, 20],     // Black-blue
            [20, 20, 40],     // Deep void
            [35, 25, 60],     // Violet-black
            [60, 40, 90],     // Dark amethyst
            [90, 70, 130],    // Purple glass
            [120, 110, 160],  // Soft violet
            [160, 150, 200],  // Pale glow
            [200, 195, 230]   // Reflected light
        ],
        mood: ['dark', 'mysterious', 'glassy', 'introspective']
    },

    dawn: {
        name: 'Dawn',
        colors: [
            [40, 50, 90],     // Pre-dawn blue
            [80, 90, 140],    // Cool morning sky
            [140, 140, 180],  // Early light
            [200, 170, 190],  // Lavender sunrise
            [255, 190, 170],  // Peach glow
            [255, 215, 180],  // Soft gold
            [255, 235, 210],  // Warm mist
            [255, 250, 240]   // Morning white
        ],
        mood: ['hopeful', 'gentle', 'awakening', 'calm']
    },

    dusk: {
        name: 'Dusk',
        colors: [
            [90, 60, 110],    // Muted purple
            [120, 70, 120],   // Violet dusk
            [160, 80, 110],   // Rose fade
            [200, 90, 90],    // Ember red
            [220, 120, 80],   // Warm afterglow
            [200, 140, 120],  // Dusty peach
            [160, 150, 170],  // Evening haze
            [120, 120, 150]   // Night approach
        ],
        mood: ['melancholic', 'reflective', 'soft', 'transitional']
    },

    rain: {
        name: 'Rain',
        colors: [
            [30, 40, 60],     // Storm cloud
            [50, 70, 100],    // Wet asphalt
            [80, 110, 140],   // Rain-soaked blue
            [110, 140, 170],  // Mist
            [150, 170, 190],  // Light rain
            [180, 200, 215],  // Overcast sky
            [210, 225, 235],  // Pale drizzle
            [235, 245, 250]   // Clean air
        ],
        mood: ['calm', 'sad', 'ambient', 'cool']
    },

    tundra: {
        name: 'Tundra',
        colors: [
            [30, 50, 50],     // Frozen earth
            [60, 80, 90],     // Cold stone
            [90, 110, 120],   // Arctic water
            [130, 145, 150],  // Ice fog
            [170, 180, 185],  // Snow shadow
            [200, 210, 215],  // Snow light
            [225, 235, 240],  // Ice glare
            [245, 250, 252]   // Polar white
        ],
        mood: ['cold', 'isolated', 'minimal', 'vast']
    },

    moss: {
        name: 'Moss',
        colors: [
            [20, 50, 20],     // Deep moss
            [40, 80, 30],     // Forest moss
            [70, 110, 50],    // Living green
            [100, 140, 70],   // Soft moss
            [130, 160, 90],   // Lichen
            [160, 180, 120],  // Pale growth
            [190, 200, 150],  // Sunlit moss
            [220, 230, 190]   // Forest air
        ],
        mood: ['organic', 'earthy', 'quiet', 'alive']
    },

    rust: {
        name: 'Rust',
        colors: [
            [60, 30, 20],     // Dark iron
            [90, 40, 25],     // Old metal
            [120, 55, 30],    // Rust brown
            [160, 70, 35],    // Oxide
            [190, 90, 45],    // Warm rust
            [200, 120, 80],   // Corroded orange
            [180, 140, 110],  // Faded steel
            [160, 160, 150]   // Dusty metal
        ],
        mood: ['industrial', 'decay', 'gritty', 'warm']
    },

    glass: {
        name: 'Glass',
        colors: [
            [220, 240, 245],  // Clear highlight
            [190, 225, 235],  // Light cyan
            [150, 200, 215],  // Soft blue
            [120, 170, 195],  // Glass body
            [90, 140, 170],   // Blue depth
            [110, 160, 185],  // Refraction
            [160, 210, 225],  // Light bend
            [240, 250, 252]   // Specular white
        ],
        mood: ['clean', 'modern', 'light', 'smooth']
    },

    hallucination: {
        name: 'Hallucination',
        colors: [
            [255, 0, 140],    // Hot pink
            [255, 80, 0],     // Burning orange
            [255, 230, 0],    // Acid yellow
            [80, 255, 0],     // Toxic green
            [0, 255, 200],    // Electric cyan
            [0, 120, 255],    // Intense blue
            [140, 0, 255],    // Neon violet
            [255, 255, 255]   // Overexposed white
        ],
        mood: ['psychedelic', 'chaotic', 'intense', 'surreal']
    },

    silence: {
        name: 'Silence',
        colors: [
            [245, 245, 245],  // Near white
            [235, 235, 235],
            [225, 225, 225],
            [215, 215, 215],
            [205, 205, 205],
            [195, 195, 195],
            [185, 185, 185],
            [175, 175, 175]
        ],
        mood: ['minimal', 'calm', 'neutral', 'empty']
    },

    usa: {
        name: 'USA',
        colors: [
            [178, 34, 34],    // Firebrick Red (Flag Red)
            [220, 20, 60],    // Crimson
            [255, 255, 255],  // White
            [240, 240, 240],  // Off-white
            [0, 50, 160],     // Royal Blue
            [25, 25, 112],    // Midnight Blue (Flag Blue)
            [65, 105, 225],   // Royal Blue (lighter)
            [255, 0, 0]       // Bright Red
        ],
        mood: ['bold', 'patriotic', 'energetic']
    },

    lava: {
        name: 'Lava',
        colors: [
            [20, 0, 0],       // Charred Black
            [60, 10, 0],      // Deep Magma
            [139, 0, 0],      // Dark Red
            [200, 20, 0],     // Flowing Lava
            [255, 69, 0],     // Red Orange
            [255, 140, 0],    // Bright Orange
            [255, 215, 0],    // Molten Gold
            [255, 255, 180]   // White Heat
        ],
        mood: ['intense', 'hot', 'dangerous', 'energetic']
    },

    armageddon: {
        name: 'Armageddon',
        colors: [
            [20, 20, 20],     // Ash Black
            [50, 50, 55],     // Smoke Grey
            [80, 70, 60],     // Dust
            [100, 40, 20],    // Rust
            [150, 50, 20],    // Burning Earth
            [200, 80, 30],    // Firestorm
            [120, 20, 20],    // Blood Red
            [40, 10, 10]      // Deep Shadow
        ],
        mood: ['apocalyptic', 'dark', 'intense', 'gritty']
    },

    russia: {
        name: 'Russia',
        colors: [
            [255, 255, 255],  // Snow White
            [240, 248, 255],  // Alice Blue
            [0, 57, 166],     // Strong Blue
            [25, 25, 112],    // Deep Blue
            [213, 43, 30],    // Flag Red
            [139, 0, 0],      // Dark Red
            [180, 160, 120],  // Winter Wheat (Gold accent for richness)
            [255, 215, 0]     // Imperial Gold
        ],
        mood: ['bold', 'cold', 'imperial', 'strong']
    },

    deepsea: {
        name: 'Deep Sea',
        colors: [
            [0, 0, 20],       // Abyss Black
            [0, 20, 40],      // Trench Blue
            [0, 40, 80],      // Deep Ocean
            [0, 80, 100],     // Dark Teal
            [0, 120, 120],    // Marine Teal
            [0, 150, 130],    // Sea Green
            [0, 50, 80],      // Midnight Blue
            [0, 10, 30]       // Abyssal
        ],
        mood: ['mysterious', 'cold', 'dark', 'calm']
    },

    // ═══════════════════════════════════════════════════════════════════
    // NATURE THEMES
    // ═══════════════════════════════════════════════════════════════════

    meadow: {
        name: 'Meadow',
        colors: [
            [124, 185, 82],   // Fresh grass
            [154, 205, 102],  // Sunlit grass
            [184, 225, 132],  // Light meadow
            [255, 250, 205],  // Buttercup yellow
            [255, 182, 193],  // Wild rose pink
            [216, 191, 216],  // Clover purple
            [144, 238, 144],  // Pale green
            [107, 142, 35]    // Olive grass
        ],
        mood: ['peaceful', 'natural', 'cheerful', 'spring']
    },

    prairie: {
        name: 'Prairie',
        colors: [
            [194, 178, 128],  // Wheat gold
            [218, 195, 145],  // Dry grass
            [238, 220, 175],  // Pale straw
            [210, 180, 140],  // Tan earth
            [176, 155, 115],  // Prairie dust
            [139, 119, 85],   // Dried brush
            [160, 200, 220],  // Big sky blue
            [120, 150, 100]   // Sage brush
        ],
        mood: ['vast', 'warm', 'earthy', 'peaceful']
    },

    savanna: {
        name: 'Savanna',
        colors: [
            [194, 154, 84],   // Golden grass
            [218, 175, 105],  // Sun-bleached
            [238, 200, 135],  // Dry season
            [245, 222, 179],  // Wheat
            [210, 140, 80],   // Sunset orange
            [180, 90, 50],    // Acacia bark
            [90, 120, 70],    // Scrub green
            [60, 90, 50]      // Dark foliage
        ],
        mood: ['warm', 'wild', 'vast', 'african']
    },

    jungle: {
        name: 'Jungle',
        colors: [
            [0, 60, 20],      // Deep canopy
            [20, 100, 40],    // Dense foliage
            [50, 140, 60],    // Jungle green
            [80, 180, 80],    // Bright leaf
            [120, 200, 100],  // Sunlit canopy
            [180, 220, 140],  // Light filter
            [100, 80, 60],    // Tree bark
            [60, 40, 30]      // Forest floor
        ],
        mood: ['dense', 'humid', 'wild', 'tropical']
    },

    rainforest: {
        name: 'Rainforest',
        colors: [
            [0, 80, 60],      // Deep emerald
            [0, 120, 80],     // Wet leaves
            [50, 160, 100],   // Bright green
            [100, 200, 140],  // Mist green
            [150, 220, 180],  // Light canopy
            [0, 150, 150],    // Tropical teal
            [80, 60, 50],     // Wet bark
            [40, 80, 100]     // Rainy sky
        ],
        mood: ['humid', 'lush', 'alive', 'tropical']
    },

    coralReef: {
        name: 'Coral Reef',
        colors: [
            [255, 127, 80],   // Coral orange
            [255, 99, 71],    // Tomato coral
            [255, 182, 193],  // Pink anemone
            [255, 215, 0],    // Yellow tang
            [0, 206, 209],    // Turquoise water
            [64, 224, 208],   // Aqua
            [138, 43, 226],   // Purple coral
            [0, 139, 139]     // Deep teal
        ],
        mood: ['vibrant', 'tropical', 'colorful', 'alive']
    },

    tidePool: {
        name: 'Tide Pool',
        colors: [
            [60, 90, 90],     // Wet rock
            [80, 120, 120],   // Pool water
            [100, 150, 140],  // Shallow pool
            [140, 180, 170],  // Clear water
            [180, 100, 80],   // Starfish orange
            [120, 80, 100],   // Sea urchin purple
            [200, 180, 160],  // Sand
            [60, 120, 80]     // Seaweed green
        ],
        mood: ['calm', 'natural', 'coastal', 'peaceful']
    },

    mangrove: {
        name: 'Mangrove',
        colors: [
            [50, 70, 50],     // Murky water
            [70, 100, 70],    // Swamp green
            [100, 130, 90],   // Mangrove leaf
            [130, 160, 110],  // Sunlit leaf
            [90, 70, 50],     // Root brown
            [120, 90, 60],    // Bark
            [80, 100, 80],    // Brackish
            [60, 80, 70]      // Shadow
        ],
        mood: ['humid', 'murky', 'natural', 'mysterious']
    },

    alpine: {
        name: 'Alpine',
        colors: [
            [200, 220, 240],  // Snow field
            [150, 180, 210],  // Ice blue
            [100, 140, 180],  // Mountain shadow
            [80, 120, 100],   // Alpine grass
            [120, 100, 80],   // Rock face
            [160, 140, 120],  // Granite
            [60, 80, 60],     // Pine tree
            [40, 60, 80]      // Deep shadow
        ],
        mood: ['cold', 'majestic', 'vast', 'clean']
    },

    canyon: {
        name: 'Canyon',
        colors: [
            [180, 80, 50],    // Red rock
            [200, 100, 60],   // Sandstone
            [220, 130, 80],   // Orange cliff
            [240, 170, 120],  // Sunlit rock
            [180, 140, 100],  // Tan layer
            [140, 100, 70],   // Shadow rock
            [100, 70, 50],    // Deep canyon
            [60, 130, 180]    // Sky stripe
        ],
        mood: ['dramatic', 'vast', 'ancient', 'warm']
    },

    cave: {
        name: 'Cave',
        colors: [
            [30, 30, 35],     // Deep cave
            [50, 50, 55],     // Dark rock
            [80, 75, 70],     // Limestone
            [110, 100, 90],   // Cave wall
            [140, 130, 120],  // Light rock
            [100, 120, 140],  // Underground pool
            [60, 80, 70],     // Moss
            [40, 35, 30]      // Shadow
        ],
        mood: ['mysterious', 'dark', 'ancient', 'cool']
    },

    autumnLeaves: {
        name: 'Autumn Leaves',
        colors: [
            [180, 50, 20],    // Deep red maple
            [220, 80, 30],    // Burnt orange
            [240, 140, 40],   // Golden oak
            [255, 180, 60],   // Yellow birch
            [200, 160, 80],   // Fading leaf
            [140, 100, 60],   // Brown crisp
            [100, 80, 50],    // Fallen leaves
            [60, 80, 40]      // Late grass
        ],
        mood: ['warm', 'nostalgic', 'transitional', 'cozy']
    },

    springBloom: {
        name: 'Spring Bloom',
        colors: [
            [255, 182, 193],  // Cherry blossom
            [255, 192, 203],  // Pink bloom
            [255, 240, 245],  // Pale petal
            [200, 255, 200],  // Fresh green
            [144, 238, 144],  // New leaf
            [255, 255, 150],  // Daffodil
            [200, 162, 200],  // Lilac
            [150, 200, 255]   // Spring sky
        ],
        mood: ['fresh', 'cheerful', 'renewal', 'gentle']
    },

    summerHaze: {
        name: 'Summer Haze',
        colors: [
            [255, 220, 180],  // Hazy sun
            [255, 200, 150],  // Warm glow
            [240, 230, 200],  // Heat shimmer
            [200, 220, 180],  // Dry grass
            [180, 200, 220],  // Hazy sky
            [220, 180, 160],  // Dusty path
            [160, 180, 140],  // Faded green
            [140, 160, 180]   // Distant hills
        ],
        mood: ['warm', 'lazy', 'nostalgic', 'dreamy']
    },

    aurora: {
        name: 'Aurora',
        colors: [
            [0, 255, 127],    // Bright green
            [50, 255, 150],   // Electric green
            [100, 200, 255],  // Cyan glow
            [150, 100, 255],  // Purple wave
            [200, 50, 200],   // Magenta
            [100, 50, 150],   // Deep violet
            [20, 30, 60],     // Night sky
            [10, 15, 40]      // Dark sky
        ],
        mood: ['magical', 'ethereal', 'cold', 'mysterious']
    },

    bioluminescence: {
        name: 'Bioluminescence',
        colors: [
            [0, 255, 200],    // Electric cyan
            [0, 200, 255],    // Glowing blue
            [100, 255, 255],  // Bright aqua
            [0, 150, 200],    // Deep glow
            [0, 100, 150],    // Ocean blue
            [0, 60, 100],     // Dark water
            [0, 30, 60],      // Deep sea
            [0, 15, 30]       // Abyss
        ],
        mood: ['magical', 'mysterious', 'cool', 'ethereal']
    },

    fireflies: {
        name: 'Fireflies',
        colors: [
            [200, 255, 100],  // Firefly glow
            [180, 230, 80],   // Yellow-green light
            [150, 200, 60],   // Soft glow
            [50, 70, 50],     // Night grass
            [30, 50, 40],     // Dark meadow
            [20, 35, 30],     // Deep shadow
            [100, 80, 60],    // Tree bark
            [60, 80, 100]     // Twilight sky
        ],
        mood: ['magical', 'peaceful', 'nocturnal', 'romantic']
    },

    bamboo: {
        name: 'Bamboo',
        colors: [
            [80, 120, 60],    // Bamboo green
            [120, 160, 80],   // Light bamboo
            [160, 190, 110],  // Sunlit leaves
            [200, 220, 150],  // Pale green
            [180, 160, 100],  // Bamboo stalk
            [150, 130, 80],   // Dry bamboo
            [120, 100, 60],   // Brown node
            [90, 80, 50]      // Shadow
        ],
        mood: ['zen', 'peaceful', 'asian', 'natural']
    },

    sakura: {
        name: 'Sakura',
        colors: [
            [255, 183, 197],  // Pink blossom
            [255, 209, 220],  // Pale pink
            [255, 240, 245],  // White petal
            [255, 160, 180],  // Deep pink
            [200, 150, 160],  // Fading petal
            [120, 100, 80],   // Branch brown
            [180, 220, 255],  // Spring sky
            [80, 120, 60]     // New leaves
        ],
        mood: ['gentle', 'romantic', 'japanese', 'spring']
    },

    wetlands: {
        name: 'Wetlands',
        colors: [
            [70, 90, 70],     // Marsh green
            [90, 120, 90],    // Reed green
            [120, 150, 110],  // Light marsh
            [80, 100, 80],    // Murky water
            [100, 80, 60],    // Mud
            [140, 120, 90],   // Dried reed
            [60, 80, 90],     // Overcast
            [50, 60, 50]      // Deep shadow
        ],
        mood: ['murky', 'natural', 'calm', 'humid']
    },

    // ═══════════════════════════════════════════════════════════════════
    // WEATHER THEMES
    // ═══════════════════════════════════════════════════════════════════

    thunderstorm: {
        name: 'Thunderstorm',
        colors: [
            [30, 30, 50],     // Storm cloud
            [50, 50, 70],     // Dark gray
            [80, 80, 100],    // Cloud
            [200, 200, 255],  // Lightning flash
            [255, 255, 255],  // Bright flash
            [100, 100, 130],  // Rain cloud
            [60, 60, 80],     // Dark sky
            [40, 40, 60]      // Night storm
        ],
        mood: ['dramatic', 'intense', 'dark', 'powerful']
    },

    lightning: {
        name: 'Lightning',
        colors: [
            [255, 255, 255],  // Core white
            [200, 200, 255],  // Electric white
            [150, 150, 255],  // Blue glow
            [100, 100, 200],  // Purple edge
            [50, 50, 100],    // Dark cloud
            [30, 30, 60],     // Storm sky
            [255, 230, 200],  // Warm flash
            [20, 20, 40]      // Night
        ],
        mood: ['electric', 'intense', 'dramatic', 'powerful']
    },

    hurricane: {
        name: 'Hurricane',
        colors: [
            [40, 60, 80],     // Storm blue
            [60, 90, 120],    // Wind gray
            [90, 130, 160],   // Rain band
            [120, 160, 190],  // Outer band
            [180, 200, 210],  // Eye wall
            [220, 230, 240],  // Eye
            [100, 120, 140],  // Inner band
            [50, 70, 90]      // Dark spiral
        ],
        mood: ['powerful', 'swirling', 'ominous', 'dramatic']
    },

    fog: {
        name: 'Fog',
        colors: [
            [200, 200, 200],  // Dense fog
            [210, 210, 210],  // Medium fog
            [220, 220, 220],  // Light fog
            [230, 230, 230],  // Thin fog
            [240, 240, 240],  // Mist
            [190, 195, 200],  // Cool fog
            [195, 190, 185],  // Warm fog
            [180, 180, 180]   // Shadow in fog
        ],
        mood: ['mysterious', 'soft', 'calm', 'ethereal']
    },

    morningDew: {
        name: 'Morning Dew',
        colors: [
            [200, 230, 200],  // Dewy green
            [180, 220, 220],  // Wet grass
            [220, 240, 250],  // Water droplet
            [255, 255, 255],  // Sparkle
            [180, 200, 180],  // Fresh leaf
            [150, 180, 160],  // Grass blade
            [255, 240, 220],  // Morning sun
            [200, 220, 240]   // Dawn sky
        ],
        mood: ['fresh', 'clean', 'peaceful', 'morning']
    },

    blizzard: {
        name: 'Blizzard',
        colors: [
            [240, 245, 255],  // White out
            [220, 230, 245],  // Snow
            [200, 210, 230],  // Ice
            [180, 190, 210],  // Shadow snow
            [160, 170, 190],  // Storm gray
            [140, 150, 170],  // Dark snow
            [255, 255, 255],  // Bright white
            [120, 130, 150]   // Deep shadow
        ],
        mood: ['cold', 'intense', 'white', 'chaotic']
    },

    frost: {
        name: 'Frost',
        colors: [
            [220, 240, 255],  // Ice blue
            [200, 225, 245],  // Frost
            [180, 210, 235],  // Cold blue
            [160, 195, 225],  // Ice shadow
            [240, 250, 255],  // Bright ice
            [255, 255, 255],  // White frost
            [140, 180, 210],  // Deep frost
            [100, 140, 180]   // Shadow
        ],
        mood: ['cold', 'crisp', 'delicate', 'winter']
    },

    rainbow: {
        name: 'Rainbow',
        colors: [
            [255, 0, 0],      // Red
            [255, 127, 0],    // Orange
            [255, 255, 0],    // Yellow
            [0, 255, 0],      // Green
            [0, 0, 255],      // Blue
            [75, 0, 130],     // Indigo
            [148, 0, 211],    // Violet
            [255, 192, 203]   // Pink fade
        ],
        mood: ['cheerful', 'hopeful', 'colorful', 'magical']
    },

    doubleRainbow: {
        name: 'Double Rainbow',
        colors: [
            [255, 100, 100],  // Soft red
            [255, 180, 100],  // Soft orange
            [255, 255, 150],  // Soft yellow
            [150, 255, 150],  // Soft green
            [150, 150, 255],  // Soft blue
            [180, 130, 200],  // Soft violet
            [200, 180, 220],  // Pale purple
            [220, 200, 230]   // Secondary bow
        ],
        mood: ['magical', 'intense', 'colorful', 'euphoric']
    },

    overcast: {
        name: 'Overcast',
        colors: [
            [150, 155, 160],  // Gray sky
            [170, 175, 180],  // Light gray
            [190, 195, 200],  // Cloud
            [160, 165, 175],  // Shadow
            [180, 185, 190],  // Bright spot
            [140, 145, 150],  // Dark cloud
            [200, 205, 210],  // Light break
            [130, 135, 140]   // Deep gray
        ],
        mood: ['neutral', 'calm', 'soft', 'muted']
    },

    heatwave: {
        name: 'Heatwave',
        colors: [
            [255, 100, 50],   // Blazing orange
            [255, 150, 80],   // Hot orange
            [255, 200, 120],  // Heat shimmer
            [255, 230, 180],  // Bleached
            [255, 255, 200],  // White hot
            [200, 180, 150],  // Parched
            [180, 150, 120],  // Dry earth
            [255, 80, 30]     // Intense heat
        ],
        mood: ['hot', 'intense', 'harsh', 'energetic']
    },

    monsoon: {
        name: 'Monsoon',
        colors: [
            [40, 60, 80],     // Storm dark
            [60, 90, 110],    // Rain cloud
            [80, 120, 140],   // Wet gray
            [100, 150, 170],  // Rain
            [150, 180, 190],  // Light rain
            [50, 100, 80],    // Wet green
            [80, 130, 100],   // Soaked leaf
            [30, 50, 60]      // Dark
        ],
        mood: ['intense', 'wet', 'tropical', 'dramatic']
    },

    clearSky: {
        name: 'Clear Sky',
        colors: [
            [135, 206, 235],  // Sky blue
            [100, 180, 220],  // Upper sky
            [70, 150, 200],   // Deep blue
            [180, 220, 240],  // Horizon
            [220, 240, 255],  // Light sky
            [255, 255, 255],  // Clouds
            [200, 230, 250],  // Pale blue
            [50, 120, 180]    // Zenith
        ],
        mood: ['peaceful', 'clear', 'optimistic', 'calm']
    },

    goldenHour: {
        name: 'Golden Hour',
        colors: [
            [255, 200, 100],  // Golden light
            [255, 180, 80],   // Warm gold
            [255, 160, 60],   // Deep gold
            [255, 140, 50],   // Orange glow
            [255, 220, 150],  // Soft gold
            [255, 240, 200],  // Pale warmth
            [200, 150, 100],  // Shadow warmth
            [150, 100, 80]    // Deep shadow
        ],
        mood: ['warm', 'romantic', 'magical', 'peaceful']
    },

    blueMoon: {
        name: 'Blue Moon',
        colors: [
            [20, 30, 60],     // Night sky
            [40, 50, 90],     // Deep blue
            [70, 90, 140],    // Moon glow
            [120, 150, 200],  // Bright glow
            [180, 200, 230],  // Moonlight
            [220, 230, 250],  // Bright moon
            [50, 60, 100],    // Shadow
            [30, 40, 70]      // Deep night
        ],
        mood: ['mysterious', 'cool', 'nocturnal', 'rare']
    },

    // ═══════════════════════════════════════════════════════════════════
    // HIPPY / PSYCHEDELIC THEMES
    // ═══════════════════════════════════════════════════════════════════

    gratefulDead: {
        name: 'Grateful Dead',
        colors: [
            [255, 0, 0],      // Steal Your Face red
            [0, 0, 200],      // Classic blue
            [255, 255, 255],  // White lightning
            [255, 200, 0],    // Golden Road
            [200, 0, 200],    // Purple rain
            [0, 200, 100],    // Green grass
            [255, 100, 0],    // Orange sunshine
            [100, 0, 150]     // Deep purple
        ],
        mood: ['psychedelic', 'retro', 'trippy', 'americana']
    },

    woodstock: {
        name: 'Woodstock',
        colors: [
            [255, 105, 180],  // Hot pink
            [255, 165, 0],    // Orange
            [255, 255, 0],    // Yellow
            [50, 205, 50],    // Lime green
            [0, 191, 255],    // Sky blue
            [138, 43, 226],   // Blue violet
            [165, 42, 42],    // Brown (mud!)
            [255, 218, 185]   // Peach flesh
        ],
        mood: ['retro', 'peace', 'love', 'festival', 'sixties']
    },

    mandala: {
        name: 'Mandala',
        colors: [
            [218, 165, 32],   // Gold center
            [255, 100, 100],  // Red ring
            [255, 180, 100],  // Orange ring
            [255, 255, 150],  // Yellow ring
            [100, 200, 100],  // Green ring
            [100, 150, 255],  // Blue ring
            [180, 100, 255],  // Violet ring
            [255, 255, 255]   // White light
        ],
        mood: ['spiritual', 'meditative', 'geometric', 'sacred']
    },

    chakra: {
        name: 'Chakra',
        colors: [
            [255, 0, 0],      // Root - Red
            [255, 127, 0],    // Sacral - Orange
            [255, 255, 0],    // Solar Plexus - Yellow
            [0, 255, 0],      // Heart - Green
            [0, 191, 255],    // Throat - Blue
            [75, 0, 130],     // Third Eye - Indigo
            [148, 0, 211],    // Crown - Violet
            [255, 255, 255]   // Pure light
        ],
        mood: ['spiritual', 'healing', 'energetic', 'meditative']
    },

    acidTrip: {
        name: 'Acid Trip',
        colors: [
            [255, 0, 255],    // Electric magenta
            [0, 255, 255],    // Cyan flash
            [255, 255, 0],    // Acid yellow
            [0, 255, 0],      // Neon green
            [255, 0, 127],    // Hot pink
            [127, 0, 255],    // Purple haze
            [255, 127, 0],    // Orange trail
            [0, 127, 255]     // Electric blue
        ],
        mood: ['psychedelic', 'intense', 'surreal', 'trippy']
    },

    mushroom: {
        name: 'Mushroom',
        colors: [
            [139, 90, 43],    // Cap brown
            [205, 133, 63],   // Tan cap
            [245, 245, 220],  // Cream gills
            [200, 0, 0],      // Amanita red
            [255, 255, 255],  // White spots
            [100, 149, 237],  // Vision blue
            [148, 0, 211],    // Purple haze
            [50, 100, 50]     // Forest floor
        ],
        mood: ['natural', 'psychedelic', 'earthy', 'mystical']
    },

    peaceAndLove: {
        name: 'Peace & Love',
        colors: [
            [255, 105, 180],  // Love pink
            [255, 182, 193],  // Soft pink
            [255, 255, 200],  // Mellow yellow
            [200, 255, 200],  // Peace green
            [200, 200, 255],  // Sky blue
            [230, 200, 255],  // Lavender
            [255, 200, 150],  // Warm peach
            [255, 255, 255]   // White light
        ],
        mood: ['peaceful', 'loving', 'gentle', 'hippie']
    },

    flowerPower: {
        name: 'Flower Power',
        colors: [
            [255, 100, 150],  // Pink daisy
            [255, 200, 0],    // Sunflower
            [255, 150, 50],   // Marigold
            [200, 100, 200],  // Purple flower
            [100, 200, 100],  // Stem green
            [255, 255, 150],  // Pale petal
            [255, 50, 100],   // Red poppy
            [150, 200, 255]   // Sky
        ],
        mood: ['cheerful', 'retro', 'hippie', 'natural']
    },

    groovy: {
        name: 'Groovy',
        colors: [
            [255, 140, 0],    // Groovy orange
            [255, 200, 50],   // Yellow
            [200, 100, 50],   // Brown
            [255, 100, 100],  // Coral
            [100, 150, 100],  // Avocado green
            [200, 150, 100],  // Tan
            [150, 100, 50],   // Dark brown
            [255, 180, 100]   // Peach
        ],
        mood: ['retro', 'warm', 'seventies', 'funky']
    },

    thirdEye: {
        name: 'Third Eye',
        colors: [
            [75, 0, 130],     // Deep indigo
            [100, 0, 180],    // Violet
            [130, 50, 200],   // Purple
            [180, 100, 220],  // Light violet
            [255, 255, 255],  // Inner light
            [200, 200, 255],  // Glow
            [50, 0, 100],     // Deep purple
            [0, 0, 80]        // Void
        ],
        mood: ['mystical', 'spiritual', 'deep', 'psychedelic']
    },

    cosmicConsciousness: {
        name: 'Cosmic Consciousness',
        colors: [
            [0, 0, 40],       // Deep space
            [50, 0, 100],     // Purple nebula
            [100, 50, 150],   // Cosmic violet
            [200, 150, 255],  // Star glow
            [255, 255, 255],  // Pure light
            [255, 200, 255],  // Pink nebula
            [100, 200, 255],  // Blue star
            [255, 255, 200]   // Golden light
        ],
        mood: ['cosmic', 'transcendent', 'spiritual', 'vast']
    },

    incense: {
        name: 'Incense',
        colors: [
            [80, 60, 50],     // Sandalwood
            [120, 80, 60],    // Amber
            [160, 100, 70],   // Warm brown
            [200, 150, 100],  // Golden smoke
            [180, 160, 140],  // Light smoke
            [220, 200, 180],  // Rising smoke
            [100, 70, 50],    // Dark wood
            [60, 40, 30]      // Shadow
        ],
        mood: ['warm', 'meditative', 'earthy', 'calming']
    },

    lavaLamp: {
        name: 'Lava Lamp',
        colors: [
            [255, 50, 100],   // Hot pink blob
            [255, 100, 50],   // Orange blob
            [255, 200, 50],   // Yellow blob
            [100, 50, 200],   // Purple liquid
            [50, 50, 150],    // Blue liquid
            [200, 50, 150],   // Magenta
            [255, 150, 100],  // Peach blob
            [80, 40, 120]     // Dark purple
        ],
        mood: ['retro', 'hypnotic', 'groovy', 'psychedelic']
    },

    vwBus: {
        name: 'VW Bus',
        colors: [
            [255, 200, 100],  // Cream yellow
            [255, 150, 50],   // Orange
            [100, 180, 180],  // Surf teal
            [255, 100, 100],  // Coral red
            [255, 255, 255],  // White
            [150, 200, 100],  // Sage green
            [200, 150, 100],  // Tan
            [80, 60, 50]      // Brown trim
        ],
        mood: ['retro', 'adventurous', 'hippie', 'cheerful']
    },

    tieBreak: {
        name: 'Tie Dye Spiral',
        colors: [
            [255, 0, 100],    // Pink spiral
            [255, 100, 0],    // Orange burst
            [255, 255, 0],    // Yellow ring
            [0, 255, 100],    // Green swirl
            [0, 100, 255],    // Blue splash
            [100, 0, 255],    // Purple wave
            [255, 255, 255],  // White space
            [255, 0, 200]     // Magenta
        ],
        mood: ['psychedelic', 'colorful', 'hippie', 'swirling']
    },

    dreamCatcher: {
        name: 'Dream Catcher',
        colors: [
            [139, 90, 43],    // Leather brown
            [180, 120, 60],   // Light leather
            [64, 224, 208],   // Turquoise bead
            [255, 255, 255],  // White feather
            [200, 200, 200],  // Gray feather
            [139, 0, 0],      // Red bead
            [218, 165, 32],   // Gold thread
            [50, 50, 70]      // Night sky
        ],
        mood: ['spiritual', 'native', 'protective', 'mystical']
    },

    karma: {
        name: 'Karma',
        colors: [
            [218, 165, 32],   // Golden energy
            [255, 200, 100],  // Light gold
            [255, 255, 200],  // White light
            [200, 150, 100],  // Warm neutral
            [150, 100, 80],   // Earth
            [100, 80, 60],    // Grounding
            [255, 230, 180],  // Aura
            [180, 140, 100]   // Balance
        ],
        mood: ['spiritual', 'warm', 'balanced', 'peaceful']
    },

    nirvana: {
        name: 'Nirvana',
        colors: [
            [255, 255, 255],  // Pure white
            [240, 240, 255],  // Light violet
            [220, 220, 255],  // Pale blue
            [200, 200, 255],  // Soft violet
            [180, 200, 255],  // Sky
            [255, 240, 255],  // Pink white
            [255, 255, 240],  // Warm white
            [230, 230, 250]   // Lavender
        ],
        mood: ['transcendent', 'peaceful', 'pure', 'spiritual']
    },

    om: {
        name: 'Om',
        colors: [
            [255, 153, 51],   // Saffron
            [255, 200, 100],  // Light saffron
            [255, 255, 255],  // White
            [0, 128, 0],      // Green
            [255, 230, 200],  // Cream
            [200, 100, 50],   // Rust
            [255, 215, 0],    // Gold
            [139, 69, 19]     // Brown
        ],
        mood: ['spiritual', 'sacred', 'meditative', 'indian']
    },

    zenGarden: {
        name: 'Zen Garden',
        colors: [
            [180, 170, 160],  // Raked sand
            [200, 190, 180],  // Light sand
            [220, 215, 210],  // Pale stone
            [100, 100, 90],   // Dark rock
            [80, 100, 60],    // Moss
            [120, 110, 100],  // Medium stone
            [160, 150, 140],  // Gravel
            [60, 80, 50]      // Deep moss
        ],
        mood: ['zen', 'peaceful', 'minimal', 'meditative']
    },

    cosmicDust: {
        name: 'Cosmic Dust',
        colors: [
            [180, 150, 200],  // Pale purple
            [150, 120, 180],  // Dusty violet
            [200, 180, 220],  // Light lavender
            [255, 200, 220],  // Pink dust
            [220, 200, 180],  // Tan dust
            [180, 200, 220],  // Blue dust
            [255, 220, 200],  // Warm dust
            [160, 140, 160]   // Gray dust
        ],
        mood: ['cosmic', 'ethereal', 'soft', 'dreamy']
    },

    // ═══════════════════════════════════════════════════════════════════
    // NEW & CREATIVE THEMES
    // ═══════════════════════════════════════════════════════════════════

    grapes: {
        name: 'Grapes',
        colors: [
            [88, 24, 69],     // Concord Purple
            [120, 40, 100],   // Deep Violet
            [148, 0, 50],     // Red Globe
            [173, 255, 47],   // Green Grape
            [154, 205, 50],   // Yellow-Green
            [50, 100, 50],    // Vine Green
            [220, 200, 255],  // Pale bloom
            [75, 0, 130]      // Indigo
        ],
        mood: ['rich', 'organic', 'lush', 'fruit']
    },

    halloween: {
        name: 'Halloween',
        colors: [
            [255, 117, 24],   // Pumpkin Orange
            [255, 165, 0],    // Bright Orange
            [20, 20, 20],     // Midnight Black
            [100, 20, 140],   // Witch Purple
            [128, 255, 0],    // Slime Green
            [136, 0, 0],      // Blood Red
            [248, 248, 255],  // Ghost White
            [75, 0, 130]      // Deep Indigo
        ],
        mood: ['spooky', 'fun', 'dark', 'playful']
    },

    persimmon: {
        name: 'Persimmon Tree',
        colors: [
            [255, 69, 0],     // Ripe Orange
            [255, 120, 20],   // Bright Persimmon
            [255, 165, 79],   // Pale Orange
            [178, 34, 34],    // Deep Red-Orange
            [154, 205, 50],   // Unripe Green
            [34, 139, 34],    // Leaf Green
            [101, 67, 33],    // Branch Brown
            [255, 220, 180]   // Fruit Flesh
        ],
        mood: ['autumnal', 'warm', 'fruity', 'natural']
    },

    appleVarieties: {
        name: 'Apple Varieties',
        colors: [
            [176, 23, 31],    // Red Delicious
            [220, 40, 60],    // Gala Red
            [255, 105, 180],  // Pink Lady
            [238, 219, 0],    // Golden Delicious
            [142, 198, 65],   // Granny Smith
            [154, 205, 50],   // Green
            [255, 253, 208],  // Flesh
            [184, 134, 11]    // Russet
        ],
        mood: ['fresh', 'crisp', 'fruit', 'colorful']
    },

    delasoul: {
        name: 'De La Soul',
        colors: [
            [255, 215, 0],    // Daisy Yellow
            [255, 20, 147],   // Fluorescent Pink
            [50, 205, 50],    // Retro Green
            [255, 140, 0],    // Bright Orange
            [135, 206, 235],  // Sky Blue
            [0, 191, 255],    // Deep Sky Blue
            [20, 20, 20],     // Vinyl Black
            [255, 255, 255]   // Fresh White
        ],
        mood: ['retro', 'hip-hop', 'funky', 'playful', 'flower power']
    },

    vaporwave: {
        name: 'Vaporwave',
        colors: [
            [255, 113, 206],  // Cyber Pink
            [1, 205, 254],    // Cool Blue
            [5, 255, 161],    // Mint
            [185, 103, 255],  // Lavender
            [255, 251, 150],  // Pale Yellow
            [255, 0, 255],    // Magenta
            [0, 255, 255],    // Cyan
            [50, 20, 60]      // Deep Purple
        ],
        mood: ['retro', 'digital', 'neon', 'nostalgic', 'aesthetic']
    },

    coffee: {
        name: 'Coffee Shop',
        colors: [
            [43, 27, 23],     // Espresso
            [59, 39, 33],     // Mocha
            [101, 67, 33],    // Dark Roast
            [139, 69, 19],    // Medium Roast
            [197, 161, 131],  // Latte
            [210, 180, 140],  // Cappuccino
            [245, 222, 179],  // Crema
            [255, 250, 240]   // Steamed Milk
        ],
        mood: ['warm', 'cozy', 'awakening', 'brown']
    },

    matrix: {
        name: 'The Matrix',
        colors: [
            [0, 20, 0],       // Black Green
            [0, 40, 0],       // Dark Green
            [0, 80, 0],       // Deep Green
            [0, 143, 17],     // Matrix Green
            [0, 200, 50],     // Code Green
            [0, 255, 65],     // Bright Code
            [150, 255, 150],  // Glitch White
            [20, 20, 20]      // Dark Reality
        ],
        mood: ['digital', 'futuristic', 'cyberpunk', 'tech']
    },

    rainbowSherbert: {
        name: 'Rainbow Sherbert',
        colors: [
            [255, 105, 180],  // Raspberry pink
            [255, 160, 122],  // Light salmon
            [255, 218, 185],  // Peach
            [255, 255, 224],  // Light yellow cream
            [152, 251, 152],  // Pastel lime
            [255, 182, 193],  // Light pink
            [255, 228, 196],  // Bisque
            [250, 250, 210]   // Light goldenrod yellow
        ],
        mood: ['sweet', 'pale', 'fun', 'dessert']
    },

    pride: {
        name: 'Pride',
        colors: [
            [228, 3, 3],      // Life (Red)
            [255, 140, 0],    // Healing (Orange)
            [255, 237, 0],    // Sunlight (Yellow)
            [0, 128, 38],     // Nature (Green)
            [0, 77, 255],     // Harmony (Blue)
            [117, 7, 135],    // Spirit (Purple)
            [255, 255, 255],  // Inclusion (White)
            [255, 175, 200]   // Inclusion (Pink)
        ],
        mood: ['vibrant', 'bold', 'celebratory', 'inclusive']
    },

    whisky: {
        name: 'Whisky',
        colors: [
            [218, 165, 32],   // Goldenrod
            [184, 134, 11],   // Dark Goldenrod
            [205, 133, 63],   // Peru
            [139, 69, 19],    // Saddle Brown
            [160, 82, 45],    // Sienna
            [210, 105, 30],   // Chocolate
            [255, 215, 0],    // Gold
            [50, 20, 0]       // Deep Amber
        ],
        mood: ['warm', 'rich', 'sophisticated', 'liquid']
    },

    orangeJuice: {
        name: 'Orange Juice',
        colors: [
            [255, 165, 0],    // Orange
            [255, 140, 0],    // Dark Orange
            [255, 215, 0],    // Gold
            [255, 255, 0],    // Yellow
            [255, 223, 0],    // Golden Yellow
            [255, 200, 50],   // Sun Yellow
            [255, 100, 0],    // Deep Orange
            [255, 255, 200]   // Pale Pulp
        ],
        mood: ['bright', 'citrus', 'energetic', 'sunny']
    },

    peacock: {
        name: 'Peacock',
        colors: [
            [0, 100, 100],    // Dark Cyan
            [0, 128, 128],    // Teal
            [0, 0, 139],      // Dark Blue
            [65, 105, 225],   // Royal Blue
            [50, 205, 50],    // Lime Green
            [34, 139, 34],    // Forest Green
            [154, 205, 50],   // Yellow Green
            [218, 165, 32]    // Golden Eye
        ],
        mood: ['rich', 'exotic', 'shimmering', 'vibrant']
    },

    oilSlick: {
        name: 'Oil Slick',
        colors: [
            [10, 10, 10],     // Black base
            [75, 0, 130],     // Indigo sheenn
            [0, 100, 0],      // Dark Green sheen
            [139, 0, 139],    // Dark Magenta sheen
            [25, 25, 112],    // Midnight Blue
            [128, 0, 128],    // Purple
            [0, 128, 128],    // Teal
            [40, 40, 40]      // Dark Grey
        ],
        mood: ['dark', 'iridescent', 'urban', 'slick']
    },

    cottonCandy: {
        name: 'Cotton Candy',
        colors: [
            [255, 182, 193],  // Light Pink
            [255, 105, 180],  // Hot Pink
            [255, 240, 245],  // Lavender Blush
            [135, 206, 235],  // Sky Blue
            [176, 224, 230],  // Powder Blue
            [224, 255, 255],  // Light Cyan
            [238, 130, 238],  // Violet
            [255, 255, 255]   // Sugar White
        ],
        mood: ['sweet', 'soft', 'playful', 'pastel']
    },

    juicyFruit: {
        name: 'Juicy Fruit',
        colors: [
            [30, 0, 50],      // Deep plum
            [150, 0, 80],     // Fruit punch magenta
            [255, 40, 0],     // Blood orange
            [255, 140, 0],    // Tangerine
            [255, 230, 0],    // Citrus yellow
            [0, 200, 120],    // Fresh mint
            [0, 140, 255],    // Blue raspberry
            [245, 250, 255]   // Bright highlight
        ],
        mood: ['vibrant', 'juicy', 'energetic', 'bright']
    },

    blackSage: {
        name: 'Black Sage',
        colors: [
            [8, 10, 12],      // Near-black
            [20, 30, 28],     // Deep sage
            [35, 55, 48],     // Dark moss
            [70, 95, 85],     // Sage green
            [120, 150, 135],  // Soft sage
            [175, 200, 188],  // Pale sage
            [220, 230, 225],  // Misty light
            [245, 250, 248]   // Porcelain white
        ],
        mood: ['moody', 'earthy', 'cool', 'refined']
    },

    appleVarieties: {
        name: 'Apple Varieties',
        colors: [
            [25, 30, 12],     // Orchard stem
            [80, 120, 20],    // Granny Smith
            [130, 170, 45],   // Golden green
            [255, 215, 90],   // Golden delicious
            [210, 40, 40],    // Red delicious
            [255, 90, 90],    // Gala blush
            [255, 220, 200],  // Pale flesh
            [120, 60, 25]     // Bark brown
        ],
        mood: ['fresh', 'crisp', 'cheerful', 'natural']
    },

    japaneseMaple: {
        name: 'Japanese Maple',
        colors: [
            [25, 5, 10],      // Deep bark
            [60, 10, 20],     // Dark burgundy
            [120, 20, 30],    // Maple red
            [180, 40, 30],    // Crimson leaf
            [220, 80, 20],    // Ember orange
            [255, 140, 0],    // Autumn gold
            [255, 200, 80],   // Sunlit leaf
            [255, 235, 210]   // Pale highlight
        ],
        mood: ['autumnal', 'dramatic', 'warm', 'elegant']
    },

    whitewaterRiver: {
        name: 'Whitewater River',
        colors: [
            [8, 15, 45],      // Deep navy
            [0, 50, 110],     // River depth
            [0, 95, 160],     // Cold blue
            [0, 140, 200],    // Rapids blue
            [90, 190, 215],   // Aerated water
            [190, 235, 245],  // Foamy mist
            [245, 250, 255],  // Whitewater
            [120, 150, 175]   // Stone reflection
        ],
        mood: ['cool', 'fresh', 'dynamic', 'crisp']
    },

    burblingCreek: {
        name: 'Burbling Creek',
        colors: [
            [10, 22, 20],     // Deep pool
            [20, 55, 50],     // Dark teal
            [30, 95, 85],     // Creek green
            [45, 135, 115],   // Mossy water
            [85, 170, 135],   // Bright moss
            [150, 200, 170],  // Shallow water
            [215, 230, 220],  // Foam light
            [120, 110, 90]    // River stone
        ],
        mood: ['calm', 'natural', 'refreshing', 'flowing']
    },

    modLondon: {
        name: 'Mod London',
        colors: [
            [0, 0, 0],        // Black
            [255, 255, 255],  // White
            [255, 0, 0],      // Mod red
            [0, 120, 255],    // Scooter blue
            [255, 215, 0],    // Gold accent
            [0, 180, 120],    // Mint green
            [160, 0, 255],    // Electric purple
            [255, 120, 0]     // Orange pop
        ],
        mood: ['bold', 'retro', 'graphic', 'energetic']
    },

    woodstock: {
        name: 'Woodstock',
        colors: [
            [60, 35, 20],     // Muddy ground
            [90, 70, 40],     // Warm brown
            [150, 120, 60],   // Sunlit field
            [210, 180, 80],   // Golden light
            [120, 170, 60],   // Grass green
            [60, 120, 90],    // Forest teal
            [90, 120, 180],   // Sky blue
            [230, 235, 255]   // Cloud white
        ],
        mood: ['nostalgic', 'natural', 'warm', 'laid-back']
    },

    lavaLamp: {
        name: 'Lava Lamp',
        colors: [
            [25, 5, 40],      // Deep purple glass
            [90, 0, 80],      // Magenta core
            [180, 0, 60],     // Hot pink
            [255, 60, 0],     // Lava orange
            [255, 150, 0],    // Amber glow
            [255, 235, 120],  // Warm light
            [0, 170, 255],    // Cool contrast
            [240, 245, 255]   // Highlight
        ],
        mood: ['psychedelic', 'retro', 'glowing', 'dreamy']
    },

    groovyPoster: {
        name: 'Groovy Poster',
        colors: [
            [20, 10, 50],     // Deep indigo
            [255, 0, 120],    // Hot magenta
            [255, 90, 0],     // Orange burst
            [255, 210, 0],    // Sun yellow
            [0, 200, 120],    // Acid green
            [0, 120, 255],    // Electric blue
            [160, 0, 255],    // Violet
            [245, 250, 255]   // Bright white
        ],
        mood: ['psychedelic', 'bold', 'vibrant', 'retro']
    },

    studio54: {
        name: 'Studio 54',
        colors: [
            [5, 5, 10],       // Night black
            [40, 40, 70],     // Deep indigo
            [120, 0, 200],    // Violet
            [255, 0, 140],    // Fuchsia
            [255, 140, 0],    // Disco amber
            [255, 230, 0],    // Spotlight
            [0, 200, 220],    // Neon cyan
            [220, 230, 240]   // Silver shimmer
        ],
        mood: ['nightlife', 'glam', 'energetic', 'retro']
    },

    psychedelicBus: {
        name: 'Psychedelic Bus',
        colors: [
            [0, 40, 90],      // Deep blue
            [0, 160, 200],    // Turquoise
            [0, 220, 120],    // Bright green
            [255, 230, 0],    // Yellow
            [255, 120, 0],    // Orange
            [255, 0, 80],     // Pink
            [140, 0, 220],    // Purple
            [245, 250, 255]   // White
        ],
        mood: ['psychedelic', 'adventurous', 'vivid', 'retro']
    },

    highContrastMono: {
        name: 'High Contrast Mono',
        colors: [
            [0, 0, 0],        // Pure black
            [20, 20, 20],     // Charcoal
            [60, 60, 60],     // Dark gray
            [120, 120, 120],  // Mid gray
            [180, 180, 180],  // Light gray
            [220, 220, 220],  // Pale gray
            [245, 245, 245],  // Near white
            [255, 255, 255]   // Pure white
        ],
        mood: ['minimal', 'graphic', 'bold', 'high-contrast']
    },

    noirDuotone: {
        name: 'Noir Duotone',
        colors: [
            [0, 0, 0],        // Black
            [10, 10, 25],     // Ink blue
            [25, 25, 60],     // Deep blue
            [40, 60, 120],    // Steel blue
            [80, 110, 180],   // Blue highlight
            [140, 170, 220],  // Pale blue
            [200, 220, 240],  // Mist
            [255, 255, 255]   // White
        ],
        mood: ['noir', 'cinematic', 'cool', 'high-contrast']
    },

    chrome: {
        name: 'Chrome',
        colors: [
            [10, 10, 15],     // Deep metal
            [35, 40, 50],     // Dark steel
            [70, 75, 90],     // Steel
            [110, 120, 140],  // Brushed metal
            [160, 170, 190],  // Silver
            [200, 210, 225],  // Bright silver
            [230, 235, 245],  // Chrome highlight
            [255, 255, 255]   // Specular
        ],
        mood: ['sleek', 'industrial', 'cool', 'modern']
    },

    copperGlow: {
        name: 'Copper Glow',
        colors: [
            [30, 15, 5],      // Dark copper
            [70, 30, 10],     // Burnt copper
            [120, 50, 20],    // Copper
            [170, 80, 30],    // Warm copper
            [210, 110, 40],   // Bright copper
            [235, 150, 80],   // Copper sheen
            [245, 200, 150],  // Warm highlight
            [255, 245, 235]   // Soft white
        ],
        mood: ['warm', 'metallic', 'luminous', 'earthy']
    },

    gildedGold: {
        name: 'Gilded Gold',
        colors: [
            [35, 20, 0],      // Dark gold
            [80, 45, 0],      // Antique gold
            [130, 80, 10],    // Golden brown
            [180, 120, 10],   // Gold
            [220, 170, 20],   // Bright gold
            [245, 210, 60],   // Metallic sheen
            [255, 235, 150],  // Highlight
            [255, 250, 230]   // Pale gold
        ],
        mood: ['luxury', 'warm', 'regal', 'luminous']
    },

    bioluminescent: {
        name: 'Bioluminescent',
        colors: [
            [0, 5, 15],       // Deep ocean
            [0, 20, 40],      // Midnight teal
            [0, 50, 80],      // Deep cyan
            [0, 110, 120],    // Ocean glow
            [0, 200, 170],    // Bright aqua
            [80, 255, 210],   // Electric teal
            [160, 255, 240],  // Sea sparkle
            [235, 255, 255]   // Glow white
        ],
        mood: ['mysterious', 'cool', 'glowing', 'ethereal']
    },

    deepSeaPressure: {
        name: 'Deep Sea Pressure',
        colors: [
            [0, 0, 15],       // Abyss
            [0, 5, 35],       // Midnight blue
            [0, 20, 60],      // Deep blue
            [0, 45, 90],      // Cold blue
            [0, 80, 120],     // Slate blue
            [0, 130, 160],    // Deep teal
            [60, 180, 200],   // Pressure glow
            [190, 235, 245]   // Surface mist
        ],
        mood: ['deep', 'cool', 'moody', 'oceanic']
    },

    arcticIce: {
        name: 'Arctic Ice',
        colors: [
            [5, 15, 30],      // Polar night
            [20, 40, 70],     // Deep ice
            [40, 80, 120],    // Ice blue
            [80, 130, 170],   // Glacier
            [130, 180, 210],  // Pale ice
            [190, 220, 235],  // Frost
            [230, 245, 250],  // Snow light
            [255, 255, 255]   // White
        ],
        mood: ['cold', 'crisp', 'clean', 'bright']
    },

    urbanNeonGrit: {
        name: 'Urban Neon Grit',
        colors: [
            [15, 15, 20],     // Asphalt
            [40, 40, 50],     // Concrete
            [90, 0, 140],     // Neon purple
            [0, 160, 255],    // Electric blue
            [0, 255, 180],    // Neon mint
            [255, 40, 120],   // Pink tube
            [255, 160, 0],    // Sodium orange
            [230, 230, 240]   // Streetlight glare
        ],
        mood: ['urban', 'gritty', 'neon', 'high-contrast']
    },

    midnightFilm: {
        name: 'Midnight Film',
        colors: [
            [5, 5, 5],        // True black
            [20, 20, 25],     // Carbon
            [40, 40, 55],     // Deep slate
            [80, 80, 110],    // Cool midtone
            [130, 140, 170],  // Screen glow
            [180, 190, 210],  // Silver light
            [220, 225, 235],  // Soft white
            [255, 255, 255]   // White
        ],
        mood: ['cinematic', 'nocturnal', 'cool', 'high-contrast']
    },

    thermalSpectrum: {
        name: 'Thermal Spectrum',
        colors: [
            [10, 0, 40],      // Deep violet
            [50, 0, 120],     // Purple
            [0, 80, 200],     // Cold blue
            [0, 200, 160],    // Cyan-green
            [255, 230, 0],    // Yellow
            [255, 140, 0],    // Orange
            [255, 40, 0],     // Red
            [255, 255, 255]   // Hot white
        ],
        mood: ['intense', 'scientific', 'vivid', 'high-contrast']
    },

    opArt: {
        name: 'Op Art',
        colors: [
            [0, 0, 0],        // Black
            [255, 255, 255],  // White
            [0, 0, 0],        // Black
            [255, 255, 255],  // White
            [255, 0, 0],      // Red accent
            [0, 0, 255],      // Blue accent
            [0, 0, 0],        // Black
            [255, 255, 255]   // White
        ],
        mood: ['graphic', 'retro', 'bold', 'high-contrast']
    },

    signalFire: {
        name: 'Signal Fire',
        colors: [
            [15, 5, 5],       // Ash
            [70, 10, 10],     // Ember red
            [130, 10, 10],    // Hot ember
            [255, 40, 0],     // Flame
            [255, 120, 0],    // Orange flame
            [255, 210, 0],    // Yellow flame
            [200, 200, 200],  // Smoke
            [255, 255, 255]   // Flash
        ],
        mood: ['intense', 'warm', 'dramatic', 'high-contrast']
    },

    radioactive: {
        name: 'Radioactive',
        colors: [
            [0, 255, 0],      // Lime
            [50, 205, 50],    // Lime Green
            [173, 255, 47],   // Green Yellow
            [255, 255, 0],    // Yellow
            [255, 215, 0],    // Gold
            [0, 0, 0],        // Warning Black
            [30, 30, 30],     // Dark Grey
            [200, 255, 200]   // Glow Green
        ],
        mood: ['toxic', 'neon', 'intense', 'warning']
    }

};

// ---------------------------------------------------------------------------
// LUT builder
// ---------------------------------------------------------------------------
// Hand-crafted themes have 6–8 anchor colours. The spiral palette is a wrapping
// 256-entry LUT sampled by `fract(C / 2π)` in the fragment shader. We expand
// each theme's anchors with linear interpolation, then wrap the last anchor
// back to the first so the texture's REPEAT wrap reads continuously.
//
// Returns Uint8Array(N*4) RGBA, alpha = 255.
export function buildPaletteLUT(themeName, N = 256) {
  const theme = COLOR_THEMES[themeName] || COLOR_THEMES.tiedye;
  const anchors = theme.colors;
  const k = anchors.length;
  const out = new Uint8Array(N * 4);
  for (let i = 0; i < N; i++) {
    const t = i / N;            // [0..1)
    const s = t * k;            // [0..k)
    const i0 = Math.floor(s) % k;
    const i1 = (i0 + 1) % k;    // wrap to first anchor for seamless loop
    const f = s - Math.floor(s);
    const a0 = anchors[i0], a1 = anchors[i1];
    out[i*4    ] = Math.round(a0[0] * (1 - f) + a1[0] * f);
    out[i*4 + 1] = Math.round(a0[1] * (1 - f) + a1[1] * f);
    out[i*4 + 2] = Math.round(a0[2] * (1 - f) + a1[2] * f);
    out[i*4 + 3] = 255;
  }
  return out;
}

export const PALETTE_NAMES = Object.keys(COLOR_THEMES);
