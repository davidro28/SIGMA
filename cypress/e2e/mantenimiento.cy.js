describe("Pruebas E2E - Módulo de Mantenimiento SIGMA", () => {

  beforeEach(() => {

    // =========================================================
    // ABRIR SIGMA
    // =========================================================

    cy.visit("http://localhost:5173");

    // Verificar que estamos en Login
    cy.contains("Inicia sesión")
      .should("be.visible");

    // Ingresar correo
    cy.get('input[type="email"]')
      .should("be.visible")
      .type("davidprueba@prueba.com");

    // Ingresar contraseña
    cy.get('input[type="password"]')
      .should("be.visible")
      .type("prueba1");

    // Iniciar sesión
    cy.contains("Entrar en Sigma")
      .should("be.visible")
      .click();

    // Verificar inicio de sesión
    cy.url({ timeout: 10000 })
      .should(
        "match",
        /\/(General|Home_responsable|Home_gestortickets|HomeTecniMantenimiento)$/
      );

    // =========================================================
    // IR AL MÓDULO DE MANTENIMIENTO
    // =========================================================

    cy.visit("http://localhost:5173/Mantenimiento_Admin");

    // Verificar que cargó el módulo
    cy.contains("Mantenimiento")
      .should("be.visible");
  });


  // =========================================================
  // CP-MANT-01
  // CARGAR MÓDULO
  // =========================================================

  it("Debe cargar correctamente el módulo de Mantenimiento", () => {

    cy.contains("Mantenimiento")
      .should("be.visible");

    cy.contains("Ordenes Abiertas")
      .scrollIntoView()
      .should("be.visible");

    cy.contains("Presupuesto")
      .scrollIntoView()
      .should("be.visible");

    cy.contains("Total de Tickets")
      .scrollIntoView()
      .should("be.visible");

    cy.get("input")
      .filter('[placeholder*="Buscar"], [placeholder*="buscar"]')
      .should("exist");
  });


  // =========================================================
  // CP-MANT-02
  // BUSCAR ORDEN
  // =========================================================

  it("Debe permitir buscar una orden de mantenimiento", () => {

    cy.get("input")
      .filter('[placeholder*="Buscar"], [placeholder*="buscar"]')
      .first()
      .should("be.visible")
      .type("orden");

    cy.get("input")
      .filter('[placeholder*="Buscar"], [placeholder*="buscar"]')
      .first()
      .should("have.value", "orden");
  });


  // =========================================================
  // CP-MANT-03
  // FILTROS
  // =========================================================

  it("Debe mostrar los filtros de estado y prioridad", () => {

    cy.contains("Estado")
      .should("be.visible");

    cy.contains("Prioridad")
      .should("be.visible");
  });


  // =========================================================
  // CP-MANT-04
  // SECCIÓN DE ÓRDENES
  // =========================================================

  it("Debe mostrar correctamente la sección de órdenes de mantenimiento", () => {

    cy.get(".container-ordenes")
      .should("be.visible");
  });


  // =========================================================
  // CP-MANT-05
  // ABRIR NUEVA ORDEN
  // =========================================================

  it("Debe permitir abrir el formulario de nueva orden", () => {

    cy.contains("button", "+ Nueva Orden")
      .should("be.visible")
      .click();

    cy.get(".modal-overlay")
      .should("exist")
      .and("be.visible");

    cy.contains("Crear Nueva Orden")
      .should("be.visible");

    cy.get(".form-orden")
      .should("exist");
  });


  // =========================================================
  // CP-MANT-06
  // VERIFICAR CAMPOS DE NUEVA ORDEN
  // =========================================================

  it("Debe mostrar correctamente los campos de nueva orden", () => {

    // Abrir nueva orden
    cy.contains("button", "+ Nueva Orden")
      .should("be.visible")
      .click();

    // Verificar modal
    cy.get(".modal-overlay")
      .should("exist")
      .and("be.visible");

    // Verificar título
    cy.contains("Crear Nueva Orden")
      .should("be.visible");


    // =======================================================
    // ACTIVO
    // =======================================================

    cy.get('select[name="activoId"]')
      .should("exist")
      .and("be.visible");


    // =======================================================
    // TÉCNICO
    // =======================================================

    cy.get('select[name="tecnicoId"]')
      .should("exist")
      .and("be.visible");


    // =======================================================
    // TIPO
    // =======================================================

    cy.get('select[name="tipo"]')
      .should("exist")
      .and("be.visible");


    // =======================================================
    // PRIORIDAD
    // =======================================================

    cy.get('select[name="prioridad"]')
      .should("exist")
      .and("be.visible");


    // =======================================================
    // ESTADO
    // =======================================================

    cy.get('select[name="estado"]')
      .should("exist")
      .and("be.visible");


    // =======================================================
    // VENTANA
    // =======================================================

    cy.get('input[name="ventana"]')
      .should("exist")
      .and("be.visible");


    // =======================================================
    // SUBVENTANA
    // =======================================================

    cy.get('input[name="ventanaSub"]')
      .should("exist")
      .scrollIntoView()
      .should("be.visible");


    // =======================================================
    // ORIGEN
    // =======================================================

    cy.get('select[name="origen"]')
      .should("exist")
      .and("be.visible");


    // =======================================================
    // ID DE ORIGEN
    // =======================================================

    cy.get('input[name="origenId"]')
      .should("exist")
      .and("be.visible");


    // =======================================================
    // DESCRIPCIÓN
    // =======================================================

    cy.get('textarea[name="descripcion"]')
      .should("exist")
      .and("be.visible");


    // =======================================================
    // BOTÓN GUARDAR
    // =======================================================

    cy.contains("button", "Guardar")
      .should("exist")
      .and("be.visible");


    // =======================================================
    // BOTÓN CERRAR
    // =======================================================

    cy.contains("button", "Cerrar")
      .should("exist")
      .and("be.visible");
  });


  // =========================================================
  // CP-MANT-07
  // CERRAR NUEVA ORDEN
  // =========================================================

  it("Debe permitir cerrar el formulario de nueva orden", () => {

    // Abrir modal
    cy.contains("button", "+ Nueva Orden")
      .should("be.visible")
      .click();

    // Confirmar que está abierto
    cy.contains("Crear Nueva Orden")
      .should("be.visible");

    // Cerrar
    cy.contains("button", "Cerrar")
      .should("be.visible")
      .click();

    // Verificar que desapareció
    cy.contains("Crear Nueva Orden")
      .should("not.exist");

    // Verificar que desapareció el overlay
    cy.get(".modal-overlay")
      .should("not.exist");
  });


  // =========================================================
  // CP-MANT-08
  // SELECCIONAR DATOS DE LA ORDEN
  // =========================================================

  it("Debe permitir seleccionar los datos principales de una orden", () => {

    // Abrir modal
    cy.contains("button", "+ Nueva Orden")
      .should("be.visible")
      .click();

    // Verificar modal
    cy.contains("Crear Nueva Orden")
      .should("be.visible");


    // =======================================================
    // ACTIVOS
    // =======================================================

    cy.get('select[name="activoId"] option')
      .should("have.length.greaterThan", 1);


    // =======================================================
    // TÉCNICOS
    // =======================================================

    cy.get('select[name="tecnicoId"] option')
      .should("have.length.greaterThan", 1);


    // =======================================================
    // TIPO
    // =======================================================

    cy.get('select[name="tipo"]')
      .select("CORRECTIVO")
      .should("have.value", "CORRECTIVO");


    // =======================================================
    // PRIORIDAD
    // =======================================================

    cy.get('select[name="prioridad"]')
      .select("MEDIA")
      .should("have.value", "MEDIA");


    // =======================================================
    // ESTADO
    // =======================================================

    cy.get('select[name="estado"]')
      .select("PENDIENTE")
      .should("have.value", "PENDIENTE");


    // =======================================================
    // ORIGEN
    // =======================================================

    cy.get('select[name="origen"]')
      .select("Solicitud")
      .should("have.value", "Solicitud");


    // =======================================================
    // VENTANA
    // =======================================================

    cy.get('input[name="ventana"]')
      .type("Hoy 10:00 - 14:00")
      .should(
        "have.value",
        "Hoy 10:00 - 14:00"
      );


    // =======================================================
    // SUBVENTANA
    // =======================================================

    cy.get('input[name="ventanaSub"]')
      .type("2h retraso estimado")
      .should(
        "have.value",
        "2h retraso estimado"
      );


    // =======================================================
    // ID DE ORIGEN
    // =======================================================

    cy.get('input[name="origenId"]')
      .type("#129")
      .should(
        "have.value",
        "#129"
      );


    // =======================================================
    // DESCRIPCIÓN
    // =======================================================

    cy.get('textarea[name="descripcion"]')
      .type("Mantenimiento preventivo del activo.")
      .should(
        "have.value",
        "Mantenimiento preventivo del activo."
      );
  });

});