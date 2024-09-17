import { CreateObjectGateway } from "@services/Gateways/CreateObject.gateway";

export class CreateObjectUseCase {
  constructor(private readonly createObjectGateway: CreateObjectGateway) {}

  async execute(input): Promise<void> {
    await this.createObjectGateway.create(input);
  }
}
