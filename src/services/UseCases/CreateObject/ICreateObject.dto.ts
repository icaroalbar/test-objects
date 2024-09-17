export interface ICreateObjectDTO {
  id_cliente: string;
  files: { content: Buffer; filename: string; contentType: string }[];
}
