import { CreateObjectUseCase } from "./CreateObject.useCase";

export class CreateObjectLoteUseCase {
  constructor(private readonly createObjectUseCase: CreateObjectUseCase) {}

  async execute(input): Promise<void> {
    const { id_cliente, files } = input;

    if (!Array.isArray(files) || files.length === 0) {
      throw new Error(
        "O campo 'files' não pode ser um array vazio de arquivos."
      );
    }

    const createObjectPromises = files.map(async (file) => {
      const fileInput = {
        id_cliente,
        files: [file],
      };

      await this.createObjectUseCase.execute(fileInput);
    });

    await Promise.all(createObjectPromises);
  }
}
