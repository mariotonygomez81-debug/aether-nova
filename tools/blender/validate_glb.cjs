const fs = require("fs");
const path = require("path");
const validator = require("gltf-validator");

async function main() {
  const input = process.argv[2];
  const reportPath = process.argv[3];
  if (!input || !reportPath || !fs.existsSync(input)) {
    throw new Error("Usage: node validate_glb.cjs <model.glb> <report.json>");
  }
  const bytes = new Uint8Array(fs.readFileSync(input));
  const report = await validator.validateBytes(bytes, {
    uri: path.basename(input),
    maxIssues: 1000,
    ignoredIssues: []
  });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  const errors = report.issues?.numErrors ?? 0;
  const warnings = report.issues?.numWarnings ?? 0;
  console.log(JSON.stringify({
    asset: path.basename(input),
    version: report.info?.version,
    generator: report.info?.generator,
    errors,
    warnings,
    infos: report.issues?.numInfos ?? 0,
    hints: report.issues?.numHints ?? 0
  }, null, 2));
  if (errors > 0) process.exitCode = 1;
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
