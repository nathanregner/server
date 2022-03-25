import * as k8s from "@kubernetes/client-node";
import {
  V1CustomResourceDefinitionSpec,
  V1CustomResourceDefinitionVersion,
} from "@kubernetes/client-node";
import { compile } from "json-schema-to-typescript";
import * as fs from "fs";
import { V1JSONSchemaProps } from "@kubernetes/client-node/dist/gen/model/v1JSONSchemaProps";

async function generateSchema(name: string) {
  const {
    body: { spec },
  } = await api.readCustomResourceDefinition(name);
  return Promise.all(
    spec.versions.map(async (version) => {
      const schema = normalizeSchema(closeSchema(extendSchema(version, spec)));
      return await writeSchema(
        `${spec.names.kind}.${version.name}`,
        await compile(schema, spec.names.kind)
      );
    })
  );
}

// strip nulls/undefined
function normalizeSchema(schema: V1JSONSchemaProps) {
  return JSON.parse(JSON.stringify(schema));
}

// disallow extra properties
function closeSchema(schema: V1JSONSchemaProps): V1JSONSchemaProps {
  const newSchema = {
    ...schema,
    additionalProperties: false as any,
  };
  if (schema.properties) {
    newSchema.properties = Object.entries(schema.properties).reduce(
      (acc, [name, prop]) => {
        acc[name] = closeSchema(prop);
        return acc;
      },
      {} as NonNullable<V1JSONSchemaProps["properties"]>
    );
  }
  if (schema.items) {
    newSchema.items = closeSchema(schema.items);
  }
  return newSchema;
}

function extendSchema(
  version: V1CustomResourceDefinitionVersion,
  spec: V1CustomResourceDefinitionSpec
) {
  const schema = version.schema?.openAPIV3Schema!!;
  return {
    ...schema,
    required: [...(schema.required ?? []), "apiVersion", "kind", "spec"],
    properties: {
      ...schema.properties,
      apiVersion: { enum: [`${spec.group}/${version.name}`] } as any,
      kind: { enum: [spec.names.kind] } as any,
    },
  };
}

function writeSchema(name: string, content: string) {
  return new Promise<any>((resolve, reject) =>
    fs.writeFile(`./src/common/manifest/${name}.ts`, content, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    })
  );
}

const config = new k8s.KubeConfig();
config.loadFromDefault();
const api = config.makeApiClient(k8s.ApiextensionsV1Api);

// ~ kubectl get customresourcedefinitions.apiextensions.k8s.io ...
Promise.all(
  [
    "certificates.cert-manager.io",
    "clusterissuers.cert-manager.io",
    "virtualservices.networking.istio.io",
  ].map(generateSchema)
).then(() => console.log("Done"));
