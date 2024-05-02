import { expect } from "chai";
import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";

import HTTPTransport from "./HTTPTransport";

describe("HTTPTransport", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let request: SinonFakeXMLHttpRequest;
  let http: HTTPTransport;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-expect-error не соответствует точному типу глобального XMLHttpRequest
    global.XMLHttpRequest = xhr;

    xhr.onCreate = req => {
      request = req;
    };

    http = new HTTPTransport();
  });

  afterEach(() => {
    xhr.restore();
  });

  it("should make a GET request", async () => {
    http.get("http://example.com");

    expect(request.method).to.equal("GET");
    expect(request.url).to.equal("http://example.com");
  });

  it("should make a POST request with data", async () => {
    const data = { key: "value" };
    http.post("http://example.com", { data });

    expect(request.method).to.equal("POST");
    expect(request.url).to.equal("http://example.com");
    expect(request.requestBody).to.equal(JSON.stringify(data));
  });

  it("должен выполнить PUT-запрос с данными", async () => {
    const data = { key: "value" };
    http.put("http://example.com", { data });

    expect(request.method).to.equal("PUT");
    expect(request.url).to.equal("http://example.com");
    expect(request.requestBody).to.equal(JSON.stringify(data));
  });

  it("должен выполнить DELETE-запрос", async () => {
    http.delete("http://example.com");

    expect(request.method).to.equal("DELETE");
    expect(request.url).to.equal("http://example.com");
  });
});
