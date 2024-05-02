import { expect } from "chai";
import router from "./router";
import Block from "./Block";
import sinon from "sinon";

describe("Router", () => {
  const getContentFake = sinon.fake.returns(document.createElement("div"));

  it("should handle routes", () => {
    class MyBlock extends Block {}
    router.use("/test", MyBlock);
    expect(router.routes).to.have.lengthOf(1);
  });

  it("should change route", () => {
    class MyBlock extends Block {
      getContent = getContentFake;
    }
    class MyBlock2 extends Block {
      getContent = getContentFake;
    }

    router.use("/", MyBlock).use("/test", MyBlock2).start();
    router.go("/test");
    expect(window.location.pathname).to.equal("/test");
  });

  it("should change currentRoute", () => {
    class MyBlock extends Block {
      getContent = getContentFake;
    }
    class MyBlock2 extends Block {
      getContent = getContentFake;
    }

    router.use("/", MyBlock).use("/test", MyBlock2).start();
    router.go("/test");

    // @ts-expect-error тестируем приватное поле
    expect(router._currentRoute.pathname).to.equal("/test");
  });
});
