export enum ImageType {
  JPEG = 'JPEG',
  PNG = 'PNG',
  GIF = 'GIF',
  WEBP = 'WEBP',
  AVIF = 'AVIF',
  BMP = 'BMP',
  TIFF = 'TIFF',
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface FormatHandler {
  type: ImageType;
  isValid: (data: DataView) => boolean;
  getDimensions: (data: DataView) => Dimensions;
  isAnimated: (data: DataView) => boolean;
}
