import Store from "../../src/collection/Store";

describe("Store::Unit", () => {
    let store;
    const responseMock = {
        json: () => Promise.resolve({
            items: [
                {
                    name: "test1",
                    value: "test111"
                },
                {
                    name: "test2",
                    value: "test222"
                },
                {
                    name: "test3",
                    value: "test333"
                },
                {
                    name: "test33",
                    value: "test3333"
                }
            ]
        })
    };

    afterEach(() => {
        if (store) {
            store.destroy();
            store = null;
        }

        //todo Normal mock is needed, not a hack
        global.fetch && delete global.fetch;
    });

    it("Should be created w/o errors", () => {
        expect(() => new Store({url: ""})).not.toThrow();
    });

    it("Should return empty data on error", done => {
        store = new Store({url: ""});
        global.fetch = () => Promise.reject("test rejection");

        store.load()
            .then(data => {
                expect(data).toBeDefined();
                expect(data.length).toBe(0);
                done();
            })
            .catch(e => done(e));
    });

    it("Should return non empty data on non empty response", done => {
        store = new Store({url: ""});
        global.fetch = () => Promise.resolve(responseMock);

        store.load()
            .then(data => {
                expect(data).toBeDefined();
                expect(data.length).toBe(4);
                done();
            })
            .catch(e => done(e));
    });
});
