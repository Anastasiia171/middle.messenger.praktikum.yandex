import { expect } from "chai";
import sinon from "sinon";
import Block from "./Block";

describe("Block", () => {
  let component: Block<any>;

  beforeEach(() => {
    component = new Block({});
  });

  it("should initialize with default props", () => {
    expect(component.props).to.deep.equal({});
  });

  it("should call componentDidMount after initialization", () => {
    const componentDidMountSpy = sinon.spy(component, "componentDidMount");
    component.dispatchComponentDidMount();
    expect(componentDidMountSpy.calledOnce).to.be.true;
  });

  it("should change props after setProps", () => {
    const NEW_PROPS = { newProp: "newValue" };
    component.setProps(NEW_PROPS);
    expect(component.props).to.deep.equal(NEW_PROPS);
  });

  it("should call componentDidUpdate when props change", () => {
    const componentDidUpdateSpy = sinon.spy(component, "componentDidUpdate");
    component.setProps({ newProp: "newValue" });

    expect(componentDidUpdateSpy.calledOnce).to.be.true;
  });
});
