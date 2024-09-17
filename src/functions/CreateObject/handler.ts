import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import crypto from "crypto";
// import multipart from "lambda-multipart-parser";
// import { CreateObjectGateway } from "@services/Gateways/CreateObject.gateway";
// import { CreateObjectUseCase } from "@services/UseCases/CreateObject/CreateObject.useCase";
// import { CreateObjectLoteUseCase } from "@services/UseCases/CreateObject/CreateObjectLote.useCase";

const handler = async (event) => {
  // const body = await multipart.parse(event);

  const isBase64Encoded = event.isBase64Encoded;

  const file = isBase64Encoded
    ? Buffer.from(event.body, "base64")
    : Buffer.from(event.body, "utf-8");

  // const file = body.files;

  // Converter Buffer para Uint8Array
  const fileContentArray = new Uint8Array(file);

  // Calcular o hash do conteúdo do arquivo
  const hash = crypto.createHash("sha256");

  hash.update(fileContentArray);
  const fileHash = hash.digest("hex");

  console.log("Hash do arquivo:", fileHash);

  // const input = {
  //   id_cliente: body.id_cliente,
  //   files: body.files,
  // };

  // const createObjectGateway = new CreateObjectGateway();
  // const createObjectUseCase = new CreateObjectUseCase(createObjectGateway);
  // const batchCreateObjectUseCase = new CreateObjectLoteUseCase(
  //   createObjectUseCase
  // );

  try {
    // await batchCreateObjectUseCase.execute(input);
    return formatJSONResponse(204);
  } catch (error) {
    console.error(error);
    return formatJSONResponse(500, {
      error: error.message,
    });
  }
};

export const main = middyfy(handler);
