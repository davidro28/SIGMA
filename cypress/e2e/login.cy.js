describe("Pruebas E2E - Login SIGMA", () => {

  it("Debe iniciar sesión correctamente", () => {

    // Abrir SIGMA
    cy.visit("http://localhost:5173");

    // Verificar que estamos en el login
    cy.contains("Inicia sesión").should("be.visible");

    // Escribir correo
    cy.get('input[type="email"]')
      .type("davidprueba@prueba.com");

    // Escribir contraseña
    cy.get('input[type="password"]')
      .type("prueba1");

    // Presionar botón de iniciar sesión
    cy.contains("Entrar en Sigma")
      .click();

    // Esperar a que termine el proceso de login
    cy.url().should(
      "match",
      /\/(General|Home_responsable|Home_gestortickets|HomeTecniMantenimiento)$/
    );

    // Verificar que se guardó el token
    cy.window().then((window) => {
      expect(window.localStorage.getItem("token")).to.not.be.null;
    });

  });

});