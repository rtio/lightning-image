# Lightning Image ⚡️

An efficient and flexible image format detection and processing library. With `Lightning Image`, you can effortlessly obtain the dimensions of images, determine their format, and even check if they are animated, all from just a few bytes of data!

## Handling Large Images with Security and User Experience in Mind 🖼️🔍🔐

`Lightning Image` is not just about handling large images; it's about doing it right. Some browsers have limitations with big pixel images, leading to not just processing issues but potential security vulnerabilities.

By relying on native methods, you may be forced to pass the image through the server for evaluation, opening the door to various risks. `Lightning Image` addresses these concerns by fetching only the first 1000 bytes of the image data, validating the format, and obtaining dimensions even for immense images that other methods might struggle with.

### Why it Matters?

- **No Browser Limitations**: Work seamlessly across browsers, without worrying about specific constraints on image size.
- **Enhanced Security**: Minimize the risk by handling image validation on the frontend, without the need for server-side evaluation.
- **Improved User Experience**: Provide instant feedback to users if an image cannot be loaded or uploaded, enhancing the overall user interaction.
- **Efficient Processing**: Handle large images with finesse, without bogging down the browser or compromising security.
- **Perfect for Heavy Use Cases**: Ideal for applications with extensive image processing needs where native methods might fail.

### For Backend Solutions

If you're looking for a powerful image processing library specifically tailored for backend environments, you might want to explore [Sharp](https://github.com/lovell/sharp), a high-performance Node.js image processing library. `Lightning Image` is designed with browser environments in mind and offers unique solutions for front-end challenges.

With `Lightning Image`, your image processing is not only lightning-fast but also secure and user-friendly. It's about making big feel small and safe! ⚡️🎨🛡️

## Features
- 🌩️ Lightning-fast image detection and processing.
- 🔍 Detects various image formats including PNG, JPEG, GIF, WEBP, AVIF, BMP, and TIFF.
- 🔄 Dynamic format checker imports for optimized performance.
- 🖼️ Fetches only the first 1000 bytes to minimize bandwidth and speed up detection.
- 📦 Provides UMD build for broad compatibility.

**Please note that currently the AVIF and TIFF image formats are behaving unexpectedly with some images. See the test file for details.**

## Installation

```bash
pnpm install @rtiodev/lightning-image
```

## Usage

### JavaScript Module Import

```javascript
import { getImageDimensions, getImageFormat, isAnimated } from 'lightning-image';

const imageURL = 'path_to_image/image.png';

// Get image dimensions
getImageDimensions(imageURL).then(dimensions => {
  console.log(dimensions);
  // { width: 100, height: 200, type: 'PNG' }
});

// Get image format
getImageFormat(imageURL).then(format => {
  console.log(format); // e.g., 'PNG'
});

// Check if the image is animated
isAnimated(imageURL).then(animated => {
  console.log(animated); // e.g., true
});
```

### Using in HTML

If you'd like to include `Lightning Image` directly in your HTML file, you can do so using the UMD build. Here's how:

1. **Include the script**:

If hosting locally:
```html
<script src="path_to_local_directory/lightning-image.js"></script>
```

Or, if using a CDN (this is just a placeholder link):
```html
<script src="https://cdn.example.com/lightning-image/latest/lightning-image.js"></script>
```

2. **Use the library**:

Once you've included the script, the library's functions will be available under a global namespace, e.g., `LightningImage`:

```html
<script>
    const imageURL = 'path_to_image/image.png';

    // Get image dimensions
    LightningImage.getImageDimensions(imageURL).then(dimensions => {
      console.log(dimensions); // { width: 100, height: 200, type: 'PNG' }
    });

    // Get image format
    LightningImage.getImageFormat(imageURL).then(format => {
      console.log(format); // e.g., 'PNG'
    });

    // Check if the image is animated
    LightningImage.isAnimated(imageURL).then(animated => {
      console.log(animated); // e.g., true
    });
</script>
```

## Build

The project provides various builds suitable for different environments getting leverage from [UMD (Universal Module Definition)](https://github.com/umdjs/umd).

## Contribute

If you'd like to contribute to the development of Lightning Image, please follow these steps:

1. **Raise an Issue**: Before making any changes, create an issue describing your idea or the desired change.
2. **Submit a PR**: Once your idea is approved, create a Pull Request. Make sure to include or update unit tests.
3. **Testing & Code Style**: Ensure all tests pass and fix any code style issues.
4. **Describe Your Changes**: Clearly describe what you've changed and include testing instructions.
5. **Breaking Changes Alert**: If your contribution introduces breaking changes, please highlight them. Any modification that disrupts the current workflow, like changing a namespace or functionality, is a breaking change.

Remember, if you're planning a significant refactor or introducing breaking changes, your PR might not be approved.

Once your PR is approved, it will be merged, and a new version will be released.

Certainly, let's add a development section to guide contributors through setting up the development environment and making changes.

## Development

### Setting Up the Development Environment

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/lightning-image.git
    cd lightning-image
    ```

2. **Install dependencies**:

    Ensure you have Node.js and npm installed. Once you've cloned the project, install the required dependencies:

    ```bash
    npm install
    ```

3. **Understanding the project structure**:

    The main library logic is housed in `lightning.ts`, and specific format checkers for each image type are in their respective files, e.g., `png.ts`, `jpeg.ts`, etc. Configuration for bundling is in `webpack.config.js`.

### Making Changes

1. **Branching**:

    Always create a new branch for your changes:

    ```bash
    git checkout -b feature/my-new-feature
    ```

2. **Code Style**:

    Please adhere to the existing coding style in the project. Proper naming, indentation, and comments are appreciated.

3. **Testing**:

    If you introduce new features or changes, make sure they don't break existing functionality. If possible, add tests that cover your changes.

4. **Building**:

    Before submitting your changes, build the project to ensure everything works:

    ```bash
    npm run build
    ```

    This will run the configurations specified in `webpack.config.js` and produce builds in the `dist` directory.

5. **Committing Changes**:

    Keep your commit messages descriptive and concise. Group smaller changes into a single commit. This makes it easier to track changes and revert if needed:

    ```bash
    git commit -m "Added a new feature to detect XYZ format"
    ```

6. **Pushing and Creating a Pull Request**:

    Once you've committed your changes, push them to your branch:

    ```bash
    git push origin feature/my-new-feature
    ```

    Then, head to the GitHub repository and create a new Pull Request. Fill in the PR template with details about your change.

7. **Feedback**:

    Maintainers will review your PR. Address any comments or feedback they might have. Once everything is approved, your changes will be merged.

### Getting Help

If you run into issues or need guidance, feel free to open an issue or contact the maintainers.

## License

This project is licensed under the [GNU GENERAL PUBLIC LICENSE Version 3](./LICENSE).
