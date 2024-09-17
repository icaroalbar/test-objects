import * as supertest from "supertest";
import * as path from "path";

describe("Object create", () => {
  const input = {
    name: "testeajocnlkcm",
    file: "__tests__/e2e/test_integration1.txt",
  };

  it("Create", async () => {
    const response = await supertest("http://localhost:8040/object")
    .post("/")
      .set("Authorization", process.env.TOKEN_SECRET_PRIMARY)
      .field("name", input.name)
      .attach("file", path.resolve(input.file));
      expect(response.status).toEqual(200);
  });
});
