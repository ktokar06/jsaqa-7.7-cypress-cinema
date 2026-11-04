Cypress.Commands.add("adminLogin", (email, password) => {
  cy.fixture("selectors").then(({ admin }) => {
    cy.visit("/admin/index.php");
    cy.get(admin.emailInput).type(email);
    cy.get(admin.passwordInput).type(password);
    cy.get(admin.loginButton).click();
  });
});

Cypress.Commands.add("getAdminHallNames", () => {
  return cy.fixture("admin").then(({ valid }) => {
    cy.adminLogin(valid.email, valid.password);
    return cy.fixture("selectors").then(({ admin }) => {
      return cy
        .get(admin.hallList)
        .should("have.length.greaterThan", 0)
        .then(($items) => [...$items].map((item) => item.textContent.trim()));
    });
  });
});

Cypress.Commands.add("chooseDay", (index) => {
  cy.fixture("selectors").then(({ main }) => {
    cy.get(main.days).eq(index).click();
  });
});

Cypress.Commands.add("openSeanceInHall", (hallName) => {
  cy.fixture("selectors").then(({ main }) => {
    cy.contains(main.hallTitle, hallName)
      .parents(main.hallBlock)
      .find(main.seance)
      .first()
      .click();
  });
});

Cypress.Commands.add("selectFreeChairs", (count = 1) => {
  cy.fixture("selectors").then(({ hall }) => {
    cy.get(hall.freeChair).then(($chairs) => {
      for (let i = 0; i < count; i++) {
        cy.wrap($chairs[i]).click();
      }
    });
    cy.get(hall.selectedChair).should("have.length", count);
  });
});

Cypress.Commands.add("bookSelectedChairs", () => {
  cy.fixture("selectors").then(({ hall, ticket }) => {
    cy.get(hall.acceptButton).should("not.be.disabled").click();
    cy.get(ticket.title).should("have.text", "Вы выбрали билеты:");
    cy.get(hall.acceptButton).click();
  });
});
