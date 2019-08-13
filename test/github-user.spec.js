
import { github } from "../src/js/api/github";

describe("Test Github api client", () => {
  
  let resultUser, resultRepos;

  const testApi = async testParam => {
    resultUser = await github.user(testParam);
    resultRepos = await github.repos(testParam);
    return { ...resultUser, ...resultRepos };
  };
 
  describe(`Test param TYPES passed to api-client endpoints USER and REPOS, only allowed STRING :`, () => {
    
    it(`- STRING 'edgarayllon' MUST return user and repos info`, async () => {
      
      await testApi("edgarayllon");
      expect(resultUser && resultRepos).not.toBeUndefined();
      expect(resultUser.login && resultRepos.length).toBeTruthy();
    });

    it(`- UNDEFINED must return false`, async () => {
      await testApi(undefined);

      expect(resultUser && resultRepos).not.toBeUndefined();
      expect(resultUser && resultRepos).toBeFalsy();
    });

    it(`- NULL must return false`, async () => {
      await testApi(null);

      expect(resultUser && resultRepos).not.toBeUndefined();
      expect(resultUser && resultRepos).toBeFalsy();
    });

    it(`- NUMBER must return false`, async () => {
      await testApi(2);

      expect(resultUser && resultRepos).not.toBeUndefined();
      expect(resultUser && resultRepos).toBeFalsy();
    });

    it(`- OBJECT must return false`, async () => {
      await testApi({});

      expect(resultUser && resultRepos).not.toBeUndefined();
      expect(resultUser && resultRepos).toBeFalsy();

      await testApi({ test: "test" });

      expect(resultUser && resultRepos).not.toBeUndefined();
      expect(resultUser && resultRepos).toBeFalsy();
    });

    it(`- ARRAY must return false`, async () => {
      await testApi([]);

      expect(resultUser && resultRepos).not.toBeUndefined();
      expect(resultUser && resultRepos).toBeFalsy();

      await testApi(["test", 1]);

      expect(resultUser && resultRepos).not.toBeUndefined();
      expect(resultUser && resultRepos).toBeFalsy();
    });

    it(`- SYMBOL must return false`, async () => {
      await testApi(Symbol("test"));

      expect(resultUser && resultRepos).not.toBeUndefined();
      expect(resultUser && resultRepos).toBeFalsy();
    });

    it(`- FUNCTION must return false`, async () => {
      await testApi(test => test);

      expect(resultUser && resultRepos).not.toBeUndefined();
      expect(resultUser && resultRepos).toBeFalsy();
    });

    it(`- BOOLEAN must return false`, async () => {
      await testApi(true);

      expect(resultUser && resultRepos).not.toBeUndefined();
      expect(resultUser && resultRepos).toBeFalsy();

      await testApi(false);

      expect(resultUser && resultRepos).not.toBeUndefined();
      expect(resultUser && resultRepos).toBeFalsy();
    });
  });

  describe("Test if STRING param follow Github API username specs.", () => {
    it(`-  'AbC', '111', 'A1B22' are valid alphanumeric in range A-Z, 0-9`, async () => {
      await testApi("AbC");

      expect(resultUser).not.toBeFalsy();

      await testApi("111");

      expect(resultUser).not.toBeFalsy();

      await testApi("A1B22");

      expect(resultUser).not.toBeFalsy();
    });

    it(`-  'ÑU', '1Ñ1', 'A1Ç' are NOT valid, alphanumeric in range A-Z, 0-9`, async () => {
      await testApi("ÑU");

      expect(resultUser).toBeFalsy();

      await testApi("1Ñ1");

      expect(resultUser).toBeFalsy();

      await testApi("A1Ç");

      expect(resultUser).toBeFalsy();
    });

    it(`-  'A/B', 'A=C', 'D?A1' are NOT valid, because special chars`, async () => {
      await testApi("A/B");

      expect(resultUser).toBeFalsy();

      await testApi("A=C");

      expect(resultUser).toBeFalsy();

      await testApi("D?A1");

      expect(resultUser).toBeFalsy();
    });

    it(`- 'A1-B-22' and 'A-1B22' are valid, hypen can separate characters`, async () => {
      await testApi("A1-B-22");

      expect(resultUser).not.toBeFalsy();

      await testApi("A-1B2-2");

      expect(resultUser).not.toBeFalsy();
    });

    it(`- '-A1B22', 'A1B22-' and '-A1B22-' are NOT valid, username begins or ends with hypen`, async () => {
      await testApi("-A1B22");

      expect(resultUser).toBeFalsy();

      await testApi("A1B22-");

      expect(resultUser).toBeFalsy();

      await testApi("-A1B22-");

      expect(resultUser).toBeFalsy();
    });

    it(`- 'A--1B22' and 'A-1B---22' are NOT valid, can't use two or more hypen consecutive`, async () => {
      await testApi("A--1B22");

      expect(resultUser).toBeFalsy();

      await testApi("A-1B---22");

      expect(resultUser).toBeFalsy();
    });
  });

  describe("Test returned values of Github api.", () => {
    it(`-  'edgarayllon', returns user existence, name 'Edgar Ayllon' and repos`, async () => {
      await testApi("edgarayllon");

      expect(resultUser).not.toBeFalsy();
      expect(
        (resultUser.name = "Edgar Ayllon" && resultRepos.length > 0)
      ).toBeTruthy();
    });

    it(`-  '28845', returns 'Not Found'`, async () => {
      await testApi("28845");

      expect(resultUser).not.toBeFalsy();
      expect((resultUser.message = "Not Found")).toBeTruthy();
    });
  });
});
