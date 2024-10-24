import { createWriteStream } from "fs";
import { createCanvas, loadImage, registerFont } from "canvas";
import "dotenv/config";

registerFont("Thicker-Regular-trial.ttf", { family: "thicker" });
registerFont("LeagueGothic-Regular.otf", { family: "league" });
//registerFont("LeagueGothic-Regular.otf", { family: "league" });

const sFile = "./motor2.jpg", // source image
  sSave = "demoC.png"; // "save as

const text = "BENELLİ";
const model = "125 S";
const price = "100.000";
const km = "3000";
const year = "2023";
const city = "ANKARA";

const rectHeight = 150;
const WIDTH = 1080;
const HEIGHT = 1080 - rectHeight;
const canvas = createCanvas(WIDTH, HEIGHT + rectHeight),
  ctx = canvas.getContext("2d");

loadImage(sFile).then((img) => {
  bottomText();
  round(0, 0, 20, img);

  ctx.textAlign = "left";
  ctx.shadowOffsetX = -6;
  ctx.shadowOffsetY = 6;
  ctx.shadowBlur = 12;
  ctx.shadowColor = "rgba(0, 0, 0, 0.9)";

  //-------------------------------------  marka ve model ---------------------------------

  ctx.fillStyle = "#d5270a";
  ctx.strokeStyle = "#000";

  ctx.font = "bold 250px 'league'";
  const textWidth = ctx.measureText(text),
    tw = textWidth.width + 50;
  ctx.textAlign = "left";

  const textY = HEIGHT - 170;
  ctx.font = "bold 160px 'league'";
  ctx.fillText(text, (WIDTH - tw) / 2, textY);

  const realTextSize = ctx.measureText(text),
    realtw = realTextSize.width,
    realth =
      realTextSize.actualBoundingBoxAscent +
      realTextSize.actualBoundingBoxDescent;

  const priceY = textY + realth;
  ctx.letterSpacing = "100px";
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillText(model, (WIDTH - tw) / 2 + realtw + 50, textY);

  //-------------------------------------  fiyat ---------------------------------

  ctx.font = "bold 161px 'arial'";
  const priceWidth = ctx.measureText(price);
  let pw = priceWidth.width;
  pw = pw + 120;
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillText(price, (WIDTH - pw) / 2, priceY);
  ctx.fillStyle = "#d5270a";
  ctx.fillText("TL", (WIDTH - pw) / 2 + pw - 120, priceY);

  // -------------------------------------------------------------------------

  const out = createWriteStream(sSave),
    stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("Done"));
});

function round(x, y, radius, img) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + WIDTH - radius, y);
  ctx.quadraticCurveTo(x + WIDTH, y, x + WIDTH, y + radius);
  ctx.lineTo(x + WIDTH, y + HEIGHT - radius);
  ctx.quadraticCurveTo(x + WIDTH, y + HEIGHT, x + WIDTH - radius, y + HEIGHT);
  ctx.lineTo(x + radius, y + HEIGHT);
  ctx.quadraticCurveTo(x, y + HEIGHT, x, y + HEIGHT - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
}

function bottomText() {
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.beginPath();
  ctx.fillRect(0, HEIGHT, WIDTH, rectHeight);
  ctx.stroke();

  ctx.fillStyle = "#e0e0e0";
  ctx.textAlign = "center";
  ctx.font = "bold 25px 'arial'";

  const iconWidth = 20;
  const iconWidth2 = 10;
  const rectTextHeight = rectHeight * 0.34;

  ctx.fillText("KİLOMETRE", WIDTH / 6 + iconWidth, HEIGHT + rectTextHeight);
  ctx.fillText("MODEL", (1 * WIDTH) / 2 + iconWidth2, HEIGHT + rectTextHeight);
  ctx.fillText("ŞEHİR", (5 * WIDTH) / 6, HEIGHT + rectTextHeight);
  const info = ctx.measureText(price);
  const h = info.actualBoundingBoxAscent + info.actualBoundingBoxDescent + 35;

  ctx.font = "bold 48px 'arial'";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(km, WIDTH / 6 + iconWidth, HEIGHT + rectTextHeight + h);
  ctx.fillText(year, (1 * WIDTH) / 2 + iconWidth2, HEIGHT + rectTextHeight + h);
  ctx.font = city.length > 4 ? "bold 44px 'arial'" : "bold 48px 'arial'";
  ctx.fillText(city, (5 * WIDTH) / 6, HEIGHT + rectTextHeight + h - 1);
}
