// Question 3: Write a function that converts HEX to RGB. Then Make that function auto-dect the
// formats so that if you enter HEX color format it returns RGB and if you enter RGB color format
// it returns HEX.

// Regular expressions reference: https://javascript.info/regular-expressions

// Hex and RGB representations have a common structure of 3 values, which can be deconstructed
// before conversion. Each conversion function assumes it will receive an array of three or
// four strings.

/**
 * Returns an RGB color string from a HEX color string or HEX from RGB.
 * HEX format: '#rrggbb[aa]'. RGB format: 'rgb[a](r, g, b[, a])'.
 * 
 * @param {string} color
 */
function convertColor(color) {
    const toRgb = (hexVals) => {
        return `rgb(${hexVals.map((value) => {
            return Number.parseInt(value, 16).toString(10);
        }).join(', ')})`;
    };

    const toRgba = (hexVals) => {
        return hexVals.reduce((color, value, channel) => {
            if (channel === 3) {
                return `${color}${(Number.parseInt(value, 16) / 255.0).toFixed(2)})`;
            }
            return `${color}${Number.parseInt(value, 16).toString(10)}, `;
        }, 'rgba(');
    };

    const toHex = (rgbVals) => {
        return rgbVals.reduce((color, value, channel) => {
            if (channel === 3) {
                return `${color}${(Number.parseInt(value, 10) * 255).toString(16).padStart(2, '0')}`;
            }
            return `${color}${Number.parseInt(value, 10).toString(16).padStart(2, '0')}`;
        }, '#');
    };

    const handleAbbrev = (f) => (hexVals) => {
        return f(hexVals.map((hex) => `${hex}${hex}`));
    }

    const hexPatterns = {
        six: /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/,
        seven: /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/,
        three: /^#([0-9a-f])([0-9a-f])([0-9a-f])$/,
        four: /^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])$/,
    };

    const rgbPatterns = {
        rgb: new RegExp(`rgb\\(${[
            '(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])',
            '(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])',
            '(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])',
        ].join(',')}\\)`),
        rgba: new RegExp(`rgba\\(${[
            '(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])',
            '(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])',
            '(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])',
            '([01]\\.?|1\\.0?0?|0?\\.[0-9]?[0-9]?)',
        ].join(',')}\\)`),
    };

    const handling = [
        [rgbPatterns.rgba, toHex],
        [rgbPatterns.rgb, toHex],
        [hexPatterns.seven, toRgba],
        [hexPatterns.four, handleAbbrev(toRgba)],
        [hexPatterns.six, toRgb],
        [hexPatterns.three, handleAbbrev(toRgb)],
    ];

    const strippedColor = color.replace(/\s+/g, '');

    for (let [pattern, handler] of handling) {
        let matches = strippedColor.match(pattern);
        if (matches) {
            return handler(matches.slice(1));
        }
    }

    throw new SyntaxError();
}

const validColors = [
    ['#000000', 'rgb(0, 0, 0)'],
    ['#ffffff', 'rgb(255, 255, 255)'],
    ['#227c9d', 'rgb(34, 124, 157)'],
    ['#17c3b2', 'rgb(23, 195, 178)'],
    ['#ffcb77', 'rgb(255, 203, 119)'],
    ['#fe6d73', 'rgb(254, 109, 115)'],
    ['#fff', 'rgb(255, 255, 255)'],
    ['#000', 'rgb(0, 0, 0)'],
    ['#279', 'rgb(34, 119, 153)'],
    ['#1cb', 'rgb(17, 204, 187)'],
    ['#fc7', 'rgb(255, 204, 119)'],
    ['#f67', 'rgb(255, 102, 119)'],
    ['#00000000', 'rgba(0, 0, 0, 0.00)'],
    ['#ffffffff', 'rgba(255, 255, 255, 1.00)'],
    ['#227c9d73', 'rgba(34, 124, 157, 0.45)'],
    ['#17c3b29d', 'rgba(23, 195, 178, 0.62)'],
    ['#ffcb77b2', 'rgba(255, 203, 119, 0.70)'],
    ['#fe6d7377', 'rgba(254, 109, 115, 0.47)'],
    ['#0000', 'rgba(0, 0, 0, 0.00)'],
    ['#ffff', 'rgba(255, 255, 255, 1.00)'],
    ['#2797', 'rgba(34, 119, 153, 0.47)'],
    ['#1cb9', 'rgba(17, 204, 187, 0.60)'],
    ['#fc7b', 'rgba(255, 204, 119, 0.73)'],
    ['#f677', 'rgba(255, 102, 119, 0.47)'],
];

const invalidColors = [
    '#00000',
    '#ff',
    '123456',
    '#ffffffffff',
    'rgb(119, 153)',
    'rgb(304, 119, 153)',
    'rgba(17, 204, 187)',
    'rgba(255, 204, -119)',
    'rgb(254, 109, 115, 0.47)',
];

for (let [hex, rgb] of validColors) {
    console.log('input:', hex, 'output:', convertColor(hex), 'expected:', rgb);
    console.log('input:', rgb, 'output:', convertColor(rgb), 'expected:', hex);
}

for (let color of invalidColors) {
    try {
        console.log('input:', color, 'output:', convertColor(color), 'expected: error');
    } catch (err) {
        console.log('input:', color, 'output: error expected: error');
    }
}