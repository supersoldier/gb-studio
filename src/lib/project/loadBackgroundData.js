import glob from "glob";
import { promisify } from "util";
import uuid from "uuid/v4";
import sizeOf from "image-size";

const TILE_SIZE = 8;

const globAsync = promisify(glob);
const sizeOfAsync = promisify(sizeOf);

const loadBackgroundData = async filename => {
  const size = await sizeOfAsync(filename);
  const relativePath = filename.replace(/.*assets\/backgrounds\//, "");
  return {
    id: uuid(),
    name: relativePath.replace(".png", ""),
    width: size.width / TILE_SIZE,
    height: size.height / TILE_SIZE,
    filename: relativePath,
    _v: Date.now()
  };
};

const loadAllBackgroundData = async projectRoot => {
  const imagePaths = await globAsync(
    projectRoot + "/assets/backgrounds/**/*.png"
  );
  const imageData = await Promise.all(imagePaths.map(loadBackgroundData));
  return imageData;
};

export default loadAllBackgroundData;
export { loadBackgroundData };
