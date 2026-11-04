describe("Авторизация в админке", () => {
  it("Успешный вход с корректными данными", () => {
    cy.fixture("admin").then(({ valid }) => {
      cy.adminLogin(valid.email, valid.password);
      cy.fixture("selectors").then(({ admin }) => {
        cy.get(admin.stepTitle).first().should("have.text", valid.expected);
      });
    });
  });

  describe("Вход с некорректными данными", () => {
    // Данные загружаются синхронно, чтобы создать отдельный тест для каждого набора
    const { invalid } = require("../fixtures/admin.json");

    invalid.forEach((user) => {
      it(`Ошибка авторизации: ${user.name}`, () => {
        cy.adminLogin(user.email, user.password);
        cy.contains(user.expected).should("be.visible");
        cy.location("pathname").should("include", "authorization.php");
      });
    });
  });
});
