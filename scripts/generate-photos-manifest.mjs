import fs from "node:fs";
import path from "node:path";

const PHOTOS_DIR = path.resolve(process.cwd(), "public", "photos");
const MANIFEST_PATH = path.join(PHOTOS_DIR, "photos.json");
const IMAGE_EXT = /\.(png|jpe?g|bmp|gif)$/i;

if (!fs.existsSync(PHOTOS_DIR)) {
  fs.mkdirSync(PHOTOS_DIR, { recursive: true });
}

const files = fs
  .readdirSync(PHOTOS_DIR)
  .filter((file) => IMAGE_EXT.test(file))
  .sort((a, b) => {
    const aNum = parseInt(a.match(/\d+/)?.[0] ?? "0", 10);
    const bNum = parseInt(b.match(/\d+/)?.[0] ?? "0", 10);
    return bNum - aNum;
  });

fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(files, null, 2)}\n`, "utf8");
console.log(
  `Generated ${path.relative(process.cwd(), MANIFEST_PATH)} (${files.length} photos)`,
);
