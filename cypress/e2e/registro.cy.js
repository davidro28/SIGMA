describe("Pruebas E2E - Registro SIGMA", () => {

  it("Debe registrar un usuario correctamente", () => {

    // =====================================================
    // 1. Abrir registro
    // =====================================================

    cy.visit("/register");

    cy.contains("Registro de usuario")
      .should("be.visible");


    // =====================================================
    // 2. Nombre
    // =====================================================

    cy.get('input[name="nombre"]')
      .should("be.visible")
      .type("David Prueba");


    // =====================================================
    // 3. Correo
    // =====================================================

    cy.get('input[name="email"]')
      .should("be.visible")
      .type(`david${Date.now()}@prueba.com`);


    // =====================================================
    // 4. Teléfono
    // =====================================================

    cy.get('input[name="telefono"]')
      .should("be.visible")
      .type("3001234567");


    // =====================================================
    // 5. Empresa
    // =====================================================

    cy.get('input[name="empresa"]')
      .should("be.visible")
      .type("SIGMA");


    // =====================================================
    // 6. Tipo de documento
    // =====================================================

    cy.get('select[name="tipoDocumento"]')
      .should("be.visible")
      .select("CC");


    // =====================================================
    // 7. Número de documento
    // =====================================================

    cy.get('input[name="numeroDocumento"]')
      .should("be.visible")
      .type(`${Date.now()}`);


    // =====================================================
    // 8. Contraseña
    // =====================================================

    cy.get('input[name="password"]')
      .should("be.visible")
      .type("Prueba12345");


    // =====================================================
    // 9. Confirmar contraseña
    // =====================================================

    cy.get('input[name="confirmPassword"]')
      .should("be.visible")
      .type("Prueba12345");


    // =====================================================
    // 10. Abrir términos
    // =====================================================

    cy.contains("términos y condiciones")
      .should("be.visible")
      .click();


    // =====================================================
    // 11. Verificar modal
    // =====================================================

    cy.contains("Términos y condiciones de SIGMA")
      .should("be.visible");


    // =====================================================
    // 12. Aceptar términos
    // =====================================================

    cy.get(".accept-btn")
      .should("be.visible")
      .click();


    // =====================================================
    // 13. Verificar botón habilitado
    // =====================================================

    cy.contains("Crear cuenta")
      .should("be.visible")
      .and("not.be.disabled");


    // =====================================================
    // 14. Crear cuenta
    // =====================================================

    cy.contains("Crear cuenta")
      .click();


    // =====================================================
    // 15. Verificar registro exitoso
    // =====================================================

    cy.contains("¡Cuenta creada correctamente!", {
      timeout: 10000
    })
      .should("be.visible");


    // =====================================================
    // 16. Verificar redirección
    // =====================================================

    cy.url({
      timeout: 10000
    }).should("include", "/login");

  });

});