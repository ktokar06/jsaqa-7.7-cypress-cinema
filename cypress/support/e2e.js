import "./commands";

// В скриптах админки есть дефекты: обращения к неопределённым функциям и переменным
// (showPopup, chairChecked, startSales и др.). На тесты они не влияют, поэтому
// игнорируются только ошибки из /admin/js/, остальные исключения роняют тест.
Cypress.on("uncaught:exception", (err) => {
  if (err.stack && err.stack.includes("/admin/js/")) {
    return false;
  }
});
