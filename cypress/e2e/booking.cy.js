describe("Бронирование билета", () => {
  it("Бронирование места в зале, полученном из админки", () => {
    cy.getAdminHallNames().then((adminHalls) => {
      cy.visit("/client/index.php");
      // Завтрашний день — все сеансы ещё не начались
      cy.chooseDay(1);

      cy.fixture("selectors").then(({ main, hall, ticket }) => {
        cy.get(main.hallTitle)
          .then(($titles) =>
            [...$titles]
              .map((title) => title.textContent.trim())
              .find((name) => adminHalls.includes(name))
          )
          .then((hallName) => {
            expect(hallName, "доступный зал из админки").to.be.a("string");

            cy.openSeanceInHall(hallName);
            cy.get(hall.hallTitle).should("have.text", hallName);

            cy.selectFreeChairs(1);
            cy.bookSelectedChairs();

            cy.get(ticket.title).should("have.text", "Электронный билет");
            cy.get(ticket.chairs).should("not.be.empty");
            cy.get(ticket.qr).should("be.visible");
          });
      });
    });
  });
});
