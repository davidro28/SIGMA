describe("Pruebas E2E - Módulo de Tickets SIGMA", () => {

  beforeEach(() => {

    // Abrir SIGMA
    cy.visit("http://localhost:5173");

    // Verificar que estamos en Login
    cy.contains("Inicia sesión").should("be.visible");

    // Iniciar sesión
    cy.get('input[type="email"]')
      .type("davidprueba@prueba.com");

    cy.get('input[type="password"]')
      .type("prueba1");

    cy.contains("Entrar en Sigma")
      .click();

    // Esperar a que termine el login
    cy.url({ timeout: 10000 })
      .should(
        "match",
        /\/(General|Home_responsable|Home_gestortickets|HomeTecniMantenimiento)$/
      );

    // Ir al módulo de Tickets
    cy.visit("http://localhost:5173/Tickets");

    // Verificar que estamos en Tickets
    cy.contains("Tickets")
      .should("be.visible");

    cy.contains("Visualiza, filtra y crea tickets")
      .should("be.visible");
  });


  it("Debe cargar correctamente el módulo de Tickets", () => {

    // Verificar título
    cy.contains("Tickets")
      .should("be.visible");

    // Verificar filtros
    cy.contains("Filtros rápidos")
      .should("be.visible");

    cy.get(".input-busqueda")
      .should("be.visible");

    // Verificar filtros principales
    cy.contains("Estado:")
      .should("be.visible");

    cy.contains("Prioridad:")
      .should("be.visible");

    cy.contains("Activo:")
      .should("be.visible");

    cy.contains("Responsable:")
      .should("be.visible");

    // Verificar botón Nuevo ticket
    cy.contains("Nuevo ticket")
      .should("be.visible");

  });


  it("Debe permitir buscar un ticket", () => {

    // Escribir una búsqueda
    cy.get(".input-busqueda")
      .type("ticket");

    // Verificar que el campo conserva la búsqueda
    cy.get(".input-busqueda")
      .should("have.value", "ticket");

  });


  it("Debe permitir filtrar tickets por estado", () => {

    // Seleccionar estado Abierto
    cy.get(".grupo-filtro")
      .contains("Estado:")
      .parent()
      .find("select")
      .select("ABIERTO");

    // Verificar que el filtro quedó seleccionado
    cy.get(".grupo-filtro")
      .contains("Estado:")
      .parent()
      .find("select")
      .should("have.value", "ABIERTO");

  });


  it("Debe permitir filtrar tickets por prioridad", () => {

    // Seleccionar prioridad Alta
    cy.get(".grupo-filtro")
      .contains("Prioridad:")
      .parent()
      .find("select")
      .select("ALTA");

    // Verificar selección
    cy.get(".grupo-filtro")
      .contains("Prioridad:")
      .parent()
      .find("select")
      .should("have.value", "ALTA");

  });


  it("Debe permitir utilizar los estados rápidos", () => {

    // Presionar Abierto
    cy.contains("button", "Abierto")
      .click();

    // Verificar que el botón queda activo
    cy.contains("button", "Abierto")
      .should("have.class", "active");

    // Presionar En progreso
    cy.contains("button", "En progreso")
      .click();

    cy.contains("button", "En progreso")
      .should("have.class", "active");

    // Presionar Cerrado
    cy.contains("button", "Cerrado")
      .click();

    cy.contains("button", "Cerrado")
      .should("have.class", "active");

  });


  it("Debe permitir visualizar el detalle de un ticket", () => {

    // Verificar si existen tickets cargados
    cy.get("body").then(($body) => {

      if ($body.find(".btn-ver").length > 0) {

        // Abrir el primer ticket
        cy.get(".btn-ver")
          .first()
          .click();

        // Verificar que aparece el modal
        cy.get(".modal-ticket")
          .should("be.visible");

        // Verificar información del ticket
        cy.contains("Activo")
          .should("be.visible");

        cy.contains("Responsable")
          .should("be.visible");

        cy.contains("Solicitante")
          .should("be.visible");

        cy.contains("Descripción")
          .should("be.visible");

        // Cerrar modal
        cy.contains("Cerrar")
          .click();

        // Verificar que el modal desapareció
        cy.get(".modal-ticket")
          .should("not.exist");

      } else {

        // Si no hay tickets, verificar el mensaje correspondiente
        cy.contains("No se encontraron tickets")
          .should("be.visible");

      }

    });

  });


  it("Debe navegar correctamente al formulario de Nuevo Ticket", () => {

    // Presionar Nuevo ticket
    cy.contains("Nuevo ticket")
      .click();

    // Verificar redirección
    cy.url({ timeout: 10000 })
      .should("include", "/NuevoTicket");

  });

});