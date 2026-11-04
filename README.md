# ДЗ 7.7. Cypress 2 — UI-тесты кинотеатра «Идём в кино»

Приложение: [FS21-diplom](https://github.com/Evgeniy-Varlamov/FS21-diplom), стенд — https://qamid.tmweb.ru

## Тесты
| Spec | Что проверяет |
|---|---|
| `main-page.cy.js` | Заголовок, расписание на 7 дней, фильмы с сеансами, переключение дня |
| `admin-login.cy.js` | Вход в админку: happy path и 2 sad path (данные в фикстуре `admin.json`) |
| `booking.cy.js` | Бронирование места в зале, название которого берётся из админки |

- Все селекторы хранятся в фикстуре `cypress/fixtures/selectors.json`.
- Повторяющиеся шаги вынесены в кастомные команды `cypress/support/commands.js`.

## Запуск
```bash
npm install
npm test               # headless
npm run cy:open        # интерактивный режим
```

## Dashboard (Cypress Cloud)
1. Создать проект в [Cypress Cloud](https://cloud.cypress.io) и включить публичный доступ (Project settings → Access to Runs → Public).
2. Запустить с записью результатов:
```bash
CYPRESS_PROJECT_ID=<projectId> npx cypress run --record --key <recordKey>
```

## Найденные дефекты
В скриптах админки есть обращения к неопределённым функциям и переменным
(`showPopup`, `chairChecked`, `startSales`) — см. issues репозитория.
Эти ошибки из `/admin/js/` игнорируются в `cypress/support/e2e.js`, чтобы не мешать проверкам.
