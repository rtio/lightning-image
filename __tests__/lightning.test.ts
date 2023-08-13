import { getImageDimensions, getImageFormat, isAnimated } from '../src/lightning';
import { ImageType } from '../src/image';

const host = 'http://localhost:3000';

const TEST_CASES = [
    {
        url: `${host}/lightweight-20000x20000.jpg`,
        expectedDimensions: { width: 20000, height: 20000 },
        expectedFormat: ImageType.JPEG,
        expectedAnimated: false,
        expectedError: null,
    },
    {
        url: `${host}/lightweight-30000x30000.jpg`,
        expectedDimensions: { width: 30000, height: 30000 },
        expectedFormat: ImageType.JPEG,
        expectedAnimated: false,
        expectedError: null,
    },
    {
        url: `${host}/lightweight-with-many-pixels.jpg`,
        expectedDimensions: { width: 64250, height: 64250 },
        expectedFormat: ImageType.JPEG,
        expectedAnimated: false,
        expectedError: null,
    },
    {
        url: `${host}/transparence.png`,
        expectedDimensions: { width: 864, height: 409 },
        expectedFormat: ImageType.PNG,
        expectedAnimated: false,
        expectedError: null,
    },
    {
        url: `${host}/animated.png`,
        expectedDimensions: { width: 480, height: 400 },
        expectedFormat: ImageType.PNG,
        expectedAnimated: true,
        expectedError: null,
    },
    {
        url: `${host}/lossless.webp`,
        expectedDimensions: { width: 386, height: 395 },
        expectedFormat: ImageType.WEBP,
        expectedAnimated: false,
        expectedError: null,
    },
    {
        url: `${host}/lossy.webp`,
        expectedDimensions: { width: 1024, height: 772 },
        expectedFormat: ImageType.WEBP,
        expectedAnimated: false,
        expectedError: null,
    },
    {
        url: `${host}/lossy-with-alpha.webp`,
        expectedDimensions: { width: 800, height: 600 },
        expectedFormat: ImageType.WEBP,
        expectedAnimated: false,
        expectedError: null,
    },
    {
        url: `${host}/animated.webp`,
        expectedDimensions: { width: 253, height: 345 },
        expectedFormat: ImageType.WEBP,
        expectedAnimated: true,
        expectedError: null,
    },
    {
        url: `${host}/animated.gif`,
        expectedDimensions: { width: 220, height: 226 },
        expectedFormat: ImageType.GIF,
        expectedAnimated: true,
        expectedError: null,
    },
    {
        url: `${host}/static.gif`,
        expectedDimensions: { width: 128, height: 107 },
        expectedFormat: ImageType.GIF,
        expectedAnimated: false,
        expectedError: null,
    },
    {
        url: `${host}/all_gray.bmp`,
        expectedDimensions: { width: 8, height: 2 },
        expectedFormat: ImageType.BMP,
        expectedAnimated: false,
        expectedError: null,
    },
    {
        url: `${host}/bmp_08.bmp`,
        expectedDimensions: { width: 255, height: 255 },
        expectedFormat: ImageType.BMP,
        expectedAnimated: false,
        expectedError: null,
    },
    {
        url: `${host}/bmp_24.bmp`,
        expectedDimensions: { width: 200, height: 200 },
        expectedFormat: ImageType.BMP,
        expectedAnimated: false,
        expectedError: null,
    },
    {
        url: `${host}/at3_1m4_01.tif`,
        expectedDimensions: { width: 640, height: 480 },
        expectedFormat: ImageType.TIFF,
        expectedAnimated: false,
        expectedError: null,
    },
    // {
    //     url: `${host}/greyscale.tif`,
    //     expectedDimensions: { width: 256, height: 256 },
    //     expectedFormat: ImageType.TIFF,
    //     expectedAnimated: false,
    //     expectedError: null,
    // },
    {
        url: `${host}/rgb.tif`,
        expectedDimensions: { width: 346, height: 207 },
        expectedFormat: ImageType.TIFF,
        expectedAnimated: false,
        expectedError: null,
    },
    // {
    //     url: `${host}/static.avif`,
    //     expectedDimensions: { width: 722, height: 1024 },
    //     expectedFormat: ImageType.AVIF,
    //     expectedAnimated: false,
    //     expectedError: null,
    // },
    // {
    //     url: `${host}/animated.avif`,
    //     expectedDimensions: { width: 800, height: 450 },
    //     expectedFormat: ImageType.AVIF,
    //     expectedAnimated: true,
    //     expectedError: null,
    // },
    // {
    //     url: `${host}/monochrome.avif`,
    //     expectedDimensions: { width: 1204, height: 800 },
    //     expectedFormat: ImageType.AVIF,
    //     expectedAnimated: true,
    //     expectedError: null,
    // },
    // Add more test cases as needed...
];

describe('Image Processor', () => {

    TEST_CASES.forEach((testCase) => {

        it(`should get correct image dimensions for ${testCase.url}`, async () => {
            try {
                const dimensions = await getImageDimensions(testCase.url);
                expect(dimensions.width).toBe(testCase.expectedDimensions.width);
                expect(dimensions.height).toBe(testCase.expectedDimensions.height);
                expect(dimensions.type).toBe(testCase.expectedFormat);
            } catch (error) {
                expect(error.message).toBe(testCase.expectedError);
            }
        });

        it(`should get correct image format for ${testCase.url}`, async () => {
            try {
                const format = await getImageFormat(testCase.url);
                expect(format).toBe(testCase.expectedFormat);
            } catch (error) {
                expect(error.message).toBe(testCase.expectedError);
            }
        });

        it(`should correctly identify if ${testCase.url} is animated`, async () => {
            try {
                const animated = await isAnimated(testCase.url);
                expect(animated).toBe(testCase.expectedAnimated);
            } catch (error) {
                expect(error.message).toBe(testCase.expectedError);
            }
        });

    });
});
