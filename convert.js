/**
 * convert.js
 * Run this whenever you update Survivordle_Master.xlsx:
 *   node convert.js
 *
 * Reads the Contestants tab and outputs public/contestants.json
 * Requires: npm install xlsx
 */

const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const INPUT_FILE = "./Survivordle_Master.xlsx";
const OUTPUT_FILE = "./public/contestants.json";
const SHEET_NAME = "Contestants";

// Column index map (0-based)
const COL = {
  full_name:    7,
  season_num:   6,
  season_name:  2,
  age:          8,
  gender:       9,
  place:        10,
  tribe:        11,
  returnee:     12,
  before:       13,
  after:        14,
  castaway_id:  15,
  state:        18,
  episode:      19,
  day:          20,
  result:       22,
  jury:         24,
  finalist:     25,
  winner:       26,
};

function juryTier(jury, finalist, winner) {
  if (winner)   return "Winner";
  if (finalist) return "Finalist";
  if (jury)     return "Jury";
  return "Non-Jury";
}

function toInt(val) {
  if (val === null || val === undefined || val === "") return null;
  const n = parseInt(val, 10);
  return isNaN(n) ? null : n;
}

function toBool(val) {
  if (typeof val === "boolean") return val;
  if (typeof val === "string") return ["true", "yes", "1"].includes(val.trim().toLowerCase());
  return Boolean(val);
}

const wb = XLSX.readFile(INPUT_FILE);
const ws = wb.Sheets[SHEET_NAME];
const raw = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null });

// Skip header row (index 0)
const contestants = [];
let skipped = 0;

for (let i = 1; i < raw.length; i++) {
  const row = raw[i];
  const name    = row[COL.full_name];
  const season  = toInt(row[COL.season_num]);
  const place   = toInt(row[COL.place]);

  // Skip blank rows
  if (!name || !season || !place) { skipped++; continue; }

  const castawayId = row[COL.castaway_id];
  const seasonName = (row[COL.season_name] || "").replace("Survivor: ", "");
  const jury     = toBool(row[COL.jury]);
  const finalist = toBool(row[COL.finalist]);
  const winner   = toBool(row[COL.winner]);
  const before   = row[COL.before];
  const after    = row[COL.after];

  contestants.push({
    id:             `${castawayId}_${season}`,
    castaway_id:    castawayId,
    name:           String(name).trim(),
    season,
    seasonName,
    seasonNameFull: row[COL.season_name],
    placement:      place,
    gender:         row[COL.gender],
    startingTribe:  row[COL.tribe],
    returnee:       toBool(row[COL.returnee]),
    age:            toInt(row[COL.age]),
    state:          row[COL.state],
    episodeOut:     toInt(row[COL.episode]),
    day:            toInt(row[COL.day]),
    result:         row[COL.result],
    juryTier:       juryTier(jury, finalist, winner),
    placedBefore:   (before && before !== "N/A") ? before : null,
    placedAfter:    (after  && after  !== "N/A") ? after  : null,
  });
}

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(contestants, null, 2));
console.log(`✅ Wrote ${contestants.length} contestants to ${OUTPUT_FILE} (skipped ${skipped} blank rows)`);
