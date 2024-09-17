import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { region } from "@libs/aws-region";
// import crypto from "crypto";

interface File {
  filename: string;
  content: Buffer; // Use Buffer para o conteúdo do arquivo
  contentType: string;
}

interface CreateObjectInput {
  files: File[];
}

export class CreateObjectGateway {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client(region);
  }

  async create(input: CreateObjectInput): Promise<void> {
    const file = input.files[0];
    const fileContent = file.content;

    // // Converter Buffer para Uint8Array
    // const fileContentArray = new Uint8Array(fileContent);

    // // Calcular o hash do conteúdo do arquivo
    // const hash = crypto.createHash("sha256");

    // hash.update(fileContentArray);
    // const fileHash = hash.digest("hex");

    const bucket = process.env.AWS_BUCKET;
    if (!bucket) {
      throw new Error("AWS_BUCKET environment variable is not defined");
    }

    const values = {
      Bucket: bucket,
      Key: file.filename,
      Body: fileContent,
      ContentType: file.contentType,
    };

    const command = new PutObjectCommand(values);

    try {
      await this.s3Client.send(command);
      console.log("Arquivo enviado com sucesso para o S3.");
    } catch (error) {
      console.error("Erro ao enviar arquivo para o S3:", error);
      throw error;
    }
  }
}
