const fp = require("lodash/fp");
const fs = require("fs");
const yaml = require("yaml");

const updateIf = fp.curry((path, updater, object) =>
  fp.has(path, object) ? fp.update(path, updater, object) : object
);

function transformSchema(root) {
  return fp.flow(
    (schema) =>
      updateIf(
        "required",
        fp.filter((required) => fp.has(["properties", required], schema)),
        schema
      ),
    updateIf("properties", fp.mapValues(transformSchema)),
    updateIf("items", transformSchema)
  )(root);
}

const stdin = yaml.parse(fs.readFileSync(process.stdin.fd, "utf-8"));
const transformed = fp.update(
  "spec.versions",
  fp.map(fp.update("schema.openAPIV3Schema", transformSchema)),
  stdin
);
console.log(process.stdout.fd, yaml.stringify(transformed));
