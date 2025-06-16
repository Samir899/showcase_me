import { get } from "./Api";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {HttpStatus} from "./HttpStatus";

describe("API Utils", () => {

  const server = setupServer(
    rest.get('/success', (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ message: 'some-response' }))
    }),
    rest.get('/failure', (_req, res, ctx) => {
      return res(ctx.status(404), ctx.json({ message: 'Not found!' }))
    }),
  );

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  describe("GET", () => {
    it("should return JSON response when request is successful", async () => {
      const result = await get("/success", [HttpStatus.OK]);

      expect(result).toEqual({ message: "some-response" });
    });

    it("should throw error if response status is not within acceptedResponseCodes", async () => {
      await expect(get("/failure", [ HttpStatus.OK ]))
        .rejects
        .toThrow("Not found!");
    });
  });
});
