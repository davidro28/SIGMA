describe("Pruebas E2E - Módulo de Activos SIGMA", () => {

  beforeEach(() => {

    // =====================================================
    // INGRESAR AL MÓDULO DE ACTIVOS
    // =====================================================

    cy.visit("/Activos");

    // Verificar que cargó correctamente
    cy.contains("Catálogo de activos")
      .should("be.visible");

  });


  // =====================================================
  // CP-001 - Visualizar catálogo de activos
  // =====================================================

  it("Debe visualizar correctamente el catálogo de activos", () => {

    // Verificar título
    cy.contains("Catálogo de activos")
      .should("be.visible");

    // Verificar descripción
    cy.contains(
      "Visualiza los activos con su imagen, tipo y estado"
    ).should("be.visible");

    // Verificar barra de búsqueda
    cy.get('input[placeholder="Buscar activo por nombre"]')
      .should("be.visible");

    // Verificar botón nuevo activo
    cy.contains("Nuevo activo")
      .should("be.visible");

    // Verificar filtros
    cy.contains("Todos")
      .should("be.visible");

    cy.contains("Celular")
      .should("be.visible");

    cy.contains("Tablet")
      .should("be.visible");

    cy.contains("Periféricos")
      .should("be.visible");

    cy.contains("Pantalla")
      .should("be.visible");

  });


  // =====================================================
  // CP-002 - Buscar activo
  // =====================================================

  it("Debe permitir buscar un activo por nombre", () => {

    cy.get('input[placeholder="Buscar activo por nombre"]')
      .should("be.visible")
      .type("iPhone");

    // Verificar que el campo conserva el texto
    cy.get('input[placeholder="Buscar activo por nombre"]')
      .should("have.value", "iPhone");

  });


  // =====================================================
  // CP-003 - Filtrar activos por tipo
  // =====================================================

  it("Debe permitir filtrar los activos por tipo", () => {

    // Seleccionar filtro Celular
    cy.contains("Celular")
      .click();

    // Verificar que el botón queda activo
    cy.contains("Celular")
      .should("have.class", "active");

  });


  // =====================================================
  // CP-004 - Ver detalles de un activo
  // =====================================================

  it("Debe permitir visualizar los detalles de un activo", () => {

    // Buscar el primer botón "Ver detalles"
    cy.contains("Ver detalles")
      .first()
      .should("be.visible")
      .click();

    // Verificar que aparece el modal
    cy.get(".modal-overlay")
      .should("be.visible");

    // Verificar información del modal
    cy.get(".modal-titulo")
      .should("be.visible");

    cy.contains("Tipo")
      .should("be.visible");

    cy.contains("N° de serie")
      .should("be.visible");

    cy.contains("Responsable")
      .should("be.visible");

    cy.contains("Descripción")
      .should("be.visible");

  });


  // =====================================================
  // CP-005 - Cerrar detalles del activo
  // =====================================================

  it("Debe permitir cerrar el detalle del activo", () => {

    // Abrir detalles
    cy.contains("Ver detalles")
      .first()
      .click();

    // Verificar modal
    cy.get(".modal-overlay")
      .should("be.visible");

    // Cerrar modal
    cy.get(".modal-close")
      .click();

    // Verificar que desapareció
    cy.get(".modal-overlay")
      .should("not.exist");

  });


  // =====================================================
  // CP-006 - Abrir asignación de responsable
  // =====================================================

  it("Debe permitir abrir la ventana de asignación de responsable", () => {

    // Abrir responsable del primer activo
    cy.contains("Responsable")
      .first()
      .click();

    // Verificar modal
    cy.get(".modal-overlay")
      .should("be.visible");

    // Verificar título
    cy.contains("Asignar responsable")
      .should("be.visible");

    // Verificar información del activo
    cy.contains("Activo:")
      .should("be.visible");

    // Verificar responsable actual
    cy.contains("Responsable actual:")
      .should("be.visible");

  });


  // =====================================================
  // CP-007 - Cerrar ventana de responsable
  // =====================================================

  it("Debe permitir cerrar la ventana de asignación de responsable", () => {

    // Abrir modal
    cy.contains("Responsable")
      .first()
      .click();

    cy.get(".modal-overlay")
      .should("be.visible");

    // Cerrar
    cy.get(".modal-close")
      .click();

    // Verificar cierre
    cy.get(".modal-overlay")
      .should("not.exist");

  });


  // =====================================================
  // CP-008 - Navegar a nuevo activo
  // =====================================================

  it("Debe permitir acceder al formulario de nuevo activo", () => {

    cy.contains("Nuevo activo")
      .should("be.visible")
      .click();

    // Verificar URL
    cy.url()
      .should("include", "/NuevoActivo");

  });

});