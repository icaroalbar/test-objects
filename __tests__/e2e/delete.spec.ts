import * as supertest from "supertest";

describe("Delete object", () => {
  it("Delete document 1", async () => {
    const input = {
      key: "test_integration1.txt",
    };

    const response = await supertest("http://localhost:8040/object")
      .delete("/")
      .send(input);
    expect(response.status).toEqual(200);
  });

  it("Delete document 2", async () => {
    const input = {
      key: "test_integration2.txt",
    };

    const response = await supertest("http://localhost:8040/object")
      .delete("/")
      .send(input);
    expect(response.status).toEqual(200);
  });
});
