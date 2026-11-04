describe("Главная страница", () => {
  beforeEach(() => {
    cy.visit("/client/index.php");
  });

  it("Отображается заголовок «Идём в кино»", () => {
    cy.fixture("selectors").then(({ main }) => {
      cy.get(main.headerTitle).should("be.visible").and("contain", "Идём");
    });
  });

  it("Отображается расписание на 7 дней, сегодняшний день выбран", () => {
    cy.fixture("selectors").then(({ main }) => {
      cy.get(main.days).should("have.length", 7);
      cy.get(main.days).first().should("match", main.chosenDay);
    });
  });

  it("Отображаются фильмы с сеансами", () => {
    cy.fixture("selectors").then(({ main }) => {
      cy.get(main.movie).should("have.length.greaterThan", 0);
      cy.get(main.movie)
        .first()
        .within(() => {
          cy.get(main.movieTitle).should("not.be.empty");
          cy.get(main.seance).should("have.length.greaterThan", 0);
        });
    });
  });

  it("Выбор другого дня делает его активным", () => {
    cy.fixture("selectors").then(({ main }) => {
      cy.chooseDay(2);
      cy.get(main.days).eq(2).should("match", main.chosenDay);
      cy.get(main.days).first().should("not.match", main.chosenDay);
    });
  });
});
