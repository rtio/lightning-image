import { Dimensions, FormatHandler, ImageType } from './image';

// This object is used to dynamically import the format handlers
export const tiffHandler: FormatHandler = {
  type: ImageType.TIFF,
  isValid: isTiff,
  getDimensions: getTiffDimensions,
  isAnimated: () => false,
};

function isTiff(imageDataView: DataView): boolean {
  const signature = imageDataView.getUint16(0, false);
  return (
    imageDataView.byteLength > 2 &&
    (signature === 0x4949 || signature === 0x4d4d)
  );
}

function getTiffDimensions(imageDataView: DataView): Dimensions {
  const littleEndian = imageDataView.getUint16(0, false) === 0x4949;
  const ifdOffset = imageDataView.getUint32(4, littleEndian);

  // This simple version only extracts width and height from the first IFD
  // TIFFs can be much more complex with multiple IFDs
  let width = 0;
  let height = 0;
  const entries = imageDataView.getUint16(ifdOffset, littleEndian);
  for (let i = 0; i < entries; i++) {
    const tag = imageDataView.getUint16(ifdOffset + 2 + i * 12, littleEndian);
    const type = imageDataView.getUint16(
      ifdOffset + 2 + i * 12 + 2,
      littleEndian,
    );
    const count = imageDataView.getUint32(
      ifdOffset + 2 + i * 12 + 4,
      littleEndian,
    );
    const valueOffset = imageDataView.getUint32(
      ifdOffset + 2 + i * 12 + 8,
      littleEndian,
    );

    if (type === 3 && count === 1) {
      // It's a short, value is inline
      if (tag === 256) {
        width = valueOffset;
      } else if (tag === 257) {
        height = valueOffset;
      }
    }
  }

  return { width, height };
}
