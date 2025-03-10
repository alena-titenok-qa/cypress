describe('Проверка авторизации', function () {

    it('Верный пароль и верный логин', function () {
         cy.visit('https://login.qa.studio/'); //зашли на сайт
         cy.get ('#mail').type('german@dolnikov.ru'); //ввели логин
         cy.get ('#pass').type('iLoveqastudio1'); // ввели пароль
         cy.get('#loginButton').click(); // нажала войти
         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // проверяю, что после авторизации вижу текст
         cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик
     })

     it('Логика восстановления пароля', function () {
        cy.visit('https://login.qa.studio/'); //зашли на сайт
        cy.get('#forgotEmailButton').click(); // нажать забыли пароль
        cy.get('#mailForgot').type('german@dolnikov.ru'); // ввели имейл
        cy.get('#restoreEmailButton').click(); // нажали отправить код
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); //проввряю текст
        cy.get('#messageHeader').should('be.visible');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик
     })

     it('Неверный пароль и верный логин', function () {
        cy.visit('https://login.qa.studio/'); //зашли на сайт
        cy.get ('#mail').type('german@dolnikov.ru'); //ввели логин
        cy.get ('#pass').type('iLoveqastudio12'); // ввели неверный пароль
        cy.get('#loginButton').click(); // нажала войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // проверяю текст
        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик
    })

    it('Верный пароль и неверный логин', function () {
        cy.visit('https://login.qa.studio/'); //зашли на сайт
        cy.get ('#mail').type('germann@dolnikov.ru'); //ввели неверный логин
        cy.get ('#pass').type('iLoveqastudio1'); // ввели верный пароль
        cy.get('#loginButton').click(); // нажала войти
        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // проверяю текст
        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик
    })

    it('Ошибка валидации', function () {
        cy.visit('https://login.qa.studio/'); //зашли на сайт
        cy.get ('#mail').type('germandolnikov.ru'); //ввели логин без собачки
        cy.get ('#pass').type('iLoveqastudio1'); // ввели верный пароль
        cy.get('#loginButton').click(); // нажала войти
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // проверяю текст
        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
    })

    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.visit('https://login.qa.studio/'); //зашли на сайт
        cy.get ('#mail').type('GerMan@Dolnikov.ru'); //ввели логин
        cy.get ('#pass').type('iLoveqastudio1'); // ввели верный пароль
        cy.get('#loginButton').click(); // нажала войти
        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // проверяю текст
        cy.get('#messageHeader').should('be.visible'); // текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // есть крестик
    })
})

import * as data from "../helpers/default_data.json"

describe('Покупка аватара', function () {                                // название набора тестов
    it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
         cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
         cy.get('input[type="email"]').type(data.login);                   // вводим логин
         cy.get('input[type="password"]').type(data.password);               // вводим пароль
         cy.get('button[type="submit"]').click();                        // нажимаем кнопку Подтвердить
         cy.wait(2000);
         cy.get('.header__container > .header__id').click({ force: true }); // Клик в шапке на аву тренера
         cy.get('[href="/shop"]').click();                               // нажимаем кнопку Магазин
         cy.get('.available > button').first().click({ force: true });   // кликаем Купить у первого доступного аватара
         cy.get('.credit').type('4620869113632996');                     // вводим номер карты
         cy.get('.k_input_ccv').type('125');                             // вводим CVV карты
         cy.get('.k_input_date').type('1225');                           // вводим срок действия карты
         cy.get('.k_input_name').type('NAME');                           // вводим имя владельца действия карты
         cy.get('.pay-btn').click();                                     // нажимаем кнопку Оплатить
         cy.get('#cardnumber').type('56456');                            // вводим код подтверждения СМС
         cy.get('.payment__submit-button').click();                      // нажимаем кнопку Отправить
         cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения о успешной покупке
     });
 });