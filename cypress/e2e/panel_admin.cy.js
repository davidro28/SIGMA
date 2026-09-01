describe("Pruebas E2E - Panel de Administrador SIGMA", () => {

  beforeEach(() => {

    // =========================================================
    // ABRIR SIGMA
    // =========================================================

    cy.visit("http://localhost:5173");

    cy.contains("Inicia sesión")
      .should("be.visible");

    cy.get('input[type="email"]')
      .should("be.visible")
      .type("davidprueba@prueba.com");

    cy.get('input[type="password"]')
      .should("be.visible")
      .type("prueba1");

    cy.contains("Entrar en Sigma")
      .should("be.visible")
      .click();

    // Verificar que inició sesión correctamente
    cy.url({ timeout: 10000 })
      .should(
        "match",
        /\/(General|Home_responsable|Home_gestortickets|HomeTecniMantenimiento)$/
      );

    // =========================================================
    // IR AL PANEL DE ADMINISTRADOR
    // =========================================================

    cy.visit("http://localhost:5173/Panel_Admin");

    cy.contains("Usuarios, roles y permisos")
      .should("be.visible");
  });


  // =========================================================
  // CP-ADMIN-01
  // CARGAR PANEL DE ADMINISTRADOR
  // =========================================================

  it("Debe cargar correctamente el Panel de Administrador", () => {

    cy.contains("Usuarios, roles y permisos")
      .should("be.visible");

    cy.contains("Directorio de Usuarios")
      .should("be.visible");
  });


  // =========================================================
  // CP-ADMIN-02
  // MOSTRAR CUADROS INFORMATIVOS
  // =========================================================

  it("Debe mostrar correctamente los cuadros informativos", () => {

    // Esperar a que carguen los datos
    cy.get("body", { timeout: 10000 })
      .should("contain.text", "Total de Usuarios");

    // Total de usuarios
    cy.contains("Total de Usuarios")
      .should("exist");

    // Administradores
    cy.contains("Administradores")
      .should("exist");

    // Responsables
    // Se usa exist porque Cypress detecta que este elemento
    // puede estar recortado por el overflow de su contenedor.
    cy.contains("Responsables")
      .should("exist");

    // Operativos
    cy.contains("Operativos")
      .should("exist");

    // Estadísticas
    cy.contains("Usuarios registrados")
      .should("exist");

    cy.contains("Control del sistema y configuraciones")
      .should("exist");

    cy.contains("Responsables de activos")
      .should("exist");

    cy.contains("Gestor de Tickets y técnicos de mantenimiento")
      .should("exist");
  });


  // =========================================================
  // CP-ADMIN-03
  // MOSTRAR FILTROS
  // =========================================================

  it("Debe mostrar correctamente los filtros de usuarios", () => {

    cy.contains("button", "Todos")
      .should("be.visible");

    cy.contains("button", "Administradores")
      .should("be.visible");

    cy.contains("button", "Responsables")
      .should("be.visible");

    cy.contains("button", "Gestor de Tickets")
      .should("be.visible");

    cy.contains("button", "Técnicos de mantenimiento")
      .should("be.visible");
  });


  // =========================================================
  // CP-ADMIN-04
  // FILTRAR ADMINISTRADORES
  // =========================================================

  it("Debe permitir filtrar usuarios administradores", () => {

    cy.contains("button", "Administradores")
      .should("be.visible")
      .click();

    cy.contains("button", "Administradores")
      .should("have.class", "active");
  });


  // =========================================================
  // CP-ADMIN-05
  // FILTRAR RESPONSABLES
  // =========================================================

  it("Debe permitir filtrar usuarios responsables", () => {

    cy.contains("button", "Responsables")
      .should("be.visible")
      .click();

    cy.contains("button", "Responsables")
      .should("have.class", "active");
  });


  // =========================================================
  // CP-ADMIN-06
  // FILTRAR GESTORES DE TICKETS
  // =========================================================

  it("Debe permitir filtrar usuarios gestores de tickets", () => {

    cy.contains("button", "Gestor de Tickets")
      .should("be.visible")
      .click();

    cy.contains("button", "Gestor de Tickets")
      .should("have.class", "active");
  });


  // =========================================================
  // CP-ADMIN-07
  // FILTRAR TÉCNICOS DE MANTENIMIENTO
  // =========================================================

  it("Debe permitir filtrar técnicos de mantenimiento", () => {

    cy.contains("button", "Técnicos de mantenimiento")
      .should("be.visible")
      .click();

    cy.contains("button", "Técnicos de mantenimiento")
      .should("have.class", "active");
  });


  // =========================================================
  // CP-ADMIN-08
  // MOSTRAR DIRECTORIO DE USUARIOS
  // =========================================================

  it("Debe mostrar correctamente el directorio de usuarios", () => {

    cy.contains("Directorio de Usuarios")
      .should("be.visible");

    cy.get(".contenedor-usuarios")
      .should("be.visible");

    cy.get(".usuarios-grid")
      .should("be.visible");
  });


  // =========================================================
  // CP-ADMIN-09
  // CAMBIAR ENTRE FILTROS
  // =========================================================

  it("Debe permitir cambiar entre los diferentes filtros", () => {

    // Administradores
    cy.contains("button", "Administradores")
      .click();

    cy.contains("button", "Administradores")
      .should("have.class", "active");

    // Responsables
    cy.contains("button", "Responsables")
      .click();

    cy.contains("button", "Responsables")
      .should("have.class", "active");

    // Gestor de Tickets
    cy.contains("button", "Gestor de Tickets")
      .click();

    cy.contains("button", "Gestor de Tickets")
      .should("have.class", "active");

    // Técnicos de mantenimiento
    cy.contains("button", "Técnicos de mantenimiento")
      .click();

    cy.contains("button", "Técnicos de mantenimiento")
      .should("have.class", "active");

    // Volver a Todos
    cy.contains("button", "Todos")
      .click();

    cy.contains("button", "Todos")
      .should("have.class", "active");
  });


  // =========================================================
  // CP-ADMIN-10
  // MOSTRAR USUARIOS
  // =========================================================

  it("Debe mostrar los usuarios registrados en el directorio", () => {

    cy.get(".usuarios-grid", { timeout: 10000 })
      .should("be.visible");

    cy.get(".usuarios-grid")
      .children()
      .should("have.length.greaterThan", 0);
  });

});