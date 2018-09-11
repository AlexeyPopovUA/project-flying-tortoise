import Filter from "../../src/model/Filter";

describe("Filter::Unit", () => {
    it("Should be created w/o errors", () => {
        expect(() => new Filter("key", "value")).not.toThrow();
    });

    it("Should contain correct default type", () => {
        const filter = new Filter("key", "value");
        expect(filter.type).toBe(Filter.TYPE.EQUALS);
    });
});