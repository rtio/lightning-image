import { Dimensions, FormatHandler, ImageType } from './image';

let formatCheckers: FormatHandler[] = [];

// To enhance performance (especially in a browser context), you can leverage
// dynamic imports for format checkers, so that only the necessary format
// checkers are imported and parsed when they're needed.
const formatCheckerImports = {
  [ImageType.PNG]: () => import('./png').then((m) => m.pngHandler),
  [ImageType.JPEG]: () => import('./jpeg').then((m) => m.jpegHandler),
  [ImageType.GIF]: () => import('./gif').then((m) => m.gifHandler),
  [ImageType.WEBP]: () => import('./webp').then((m) => m.webpHandler),
  [ImageType.AVIF]: () => import('./avif').then((m) => m.avifHandler),
  [ImageType.BMP]: () => import('./bmp').then((m) => m.bmpHandler),
  [ImageType.TIFF]: () => import('./tiff').then((m) => m.tiffHandler),
};

async function ensureFormatCheckersLoaded() {
  if (!formatCheckers.length) {
    formatCheckers = await loadFormatCheckers(formatCheckerImports);
  }
}

async function loadFormatCheckers(
  checkerImports: Record<ImageType, () => Promise<FormatHandler>>,
): Promise<FormatHandler[]> {
  const loadedCheckers: FormatHandler[] = [];
  for (const importFunc of Object.values(checkerImports)) {
    const checker = await importFunc();
    loadedCheckers.push(checker);
  }
  return loadedCheckers;
}

async function getDataViewFromUrl(
  url: string,
  readAll: boolean,
): Promise<DataView> {
  const response = readAll
    ? await fetch(url)
    : await fetch(url, { headers: { Range: 'bytes=0-999' } });

  if (!response.ok)
    throw new Error('Failed to fetch image data. Network error.');

  const data = await response.arrayBuffer();
  return new DataView(data);
}

async function processImageData(url: string, action): Promise<any> {
  await ensureFormatCheckersLoaded(); // This line ensures formatCheckers are loaded before processing.
  const view = await getDataViewFromUrl(url, false);

  for (const checker of formatCheckers) {
    if (checker.isValid(view)) {
      try {
        return action(checker, view);
      } catch (ShortOfBytesError) {
        // If the image is too short, we'll try to read the whole image.
        return action(checker, await getDataViewFromUrl(url, true));
      }
    }
  }

  throw new Error('Not a recognized image format.');
}

export async function getImageDimensions(
  url: string,
): Promise<Dimensions & { type: ImageType }> {
  return processImageData(url, (checker, view) => {
    const { width, height } = checker.getDimensions(view);
    return { width, height, type: checker.type };
  });
}

export const getImageFormat = (url: string) =>
  processImageData(url, (checker) => checker.type);

export const isAnimated = (url: string) =>
  processImageData(url, (checker, view) => checker.isAnimated(view) || false);
