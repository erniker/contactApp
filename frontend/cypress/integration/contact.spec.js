describe("Contacts", () => {
  function fillAndSubmitContactForm(firstName, lastName, phoneNumber, email) {
    if (firstName) cy.get('input[name="firstName"]').type(firstName);
    if (lastName) cy.get('input[name="lastName"]').type(lastName);
    if (phoneNumber) cy.get('input[name="phoneNumber"]').type(phoneNumber);
    if (email) cy.get('input[name="email"]').type(email);
    cy.get(".btn[type=submit]").click();
  }

  function updateEmailContactForm(firstName, lastName, phoneNumber, email) {
    if (firstName) {
      cy.get('input[name="firstName"]').clear();
      cy.get('input[name="firstName"]').type(firstName);
    }
    if (lastName) {
      cy.get('input[name="lastName"]').clear();
      cy.get('input[name="lastName"]').type(lastName);
    }

    if (phoneNumber) {
      cy.get('input[name="phoneNumber"]').clear();
      cy.get('input[name="phoneNumber"]').type(phoneNumber);
    }
    if (email) {
      cy.get('input[name="email"]').clear();
      cy.get('input[name="email"]').type(email);
    }

    cy.get(".btn[type=submit]").click();
  }

  beforeEach(() => {
    cy.visit("/");
  });

  it("visits the app", () => {
    cy.visit("http://localhost:3000");
  });

  it("Type an empty fist name on form", () => {
    cy.get('a.nav-link[href="/contact"]').click();
    fillAndSubmitContactForm(
      undefined,
      "last name",
      "+34 678123456",
      "examplecontact@example.com"
    );
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`firstName should not be empty`);
    });
  });

  it("Type an empty last name on form", () => {
    cy.get('a.nav-link[href="/contact"]').click();
    fillAndSubmitContactForm(
      "first name",
      undefined,
      "+34 678123456",
      "examplecontact@example.com"
    );
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`lastName should not be empty`);
    });
  });

  it("Type an empty email on form", () => {
    cy.get('a.nav-link[href="/contact"]').click();
    fillAndSubmitContactForm(
      "first name",
      "last name",
      "+34 678123456",
      undefined
    );
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`email should not be empty`);
    });
  });

  it("Type an empty phone number on form", () => {
    cy.get('a.nav-link[href="/contact"]').click();
    fillAndSubmitContactForm(
      "first name",
      "last name",
      undefined,
      "examplecontact@example.com"
    );
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`phoneNumber should not be empty`);
    });
  });

  it("Type a wrong email on form", () => {
    cy.get('a.nav-link[href="/contact"]').click();
    fillAndSubmitContactForm(
      "first name",
      "last name",
      "+34 678123456",
      "exaplewrongemail@email"
    );
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`email must be an email`);
    });
  });

  it("Type a wrong phone number form", () => {
    cy.get('a.nav-link[href="/contact"]').click();
    fillAndSubmitContactForm(
      "first name",
      "last name",
      "+34 678123456789",
      "examplecontact@example.com"
    );
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`phoneNumber must be a valid phone number`);
    });
  });

  it("Create and remove contact", () => {
    cy.get('a.nav-link[href="/contact"]').click();
    fillAndSubmitContactForm(
      "first name",
      "last name",
      "+34 678123456",
      "examplecontact@example.com"
    );
    cy.visit("/");
    cy.get("table")
      .contains("td", "first name")
      .siblings()
      .contains("button", "Delete")
      .click();
  });

  it("Email already exists", () => {
    cy.get('a.nav-link[href="/contact"]').click();
    fillAndSubmitContactForm(
      "first name",
      "last name",
      "+34 678123456",
      "examplecontact@example.com"
    );
    cy.visit("/");
    cy.get('a.nav-link[href="/contact"]').click();
    fillAndSubmitContactForm(
      "first name",
      "last name",
      "+34 678123456",
      "examplecontact@example.com"
    );
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`Email already exists`);
    });
    cy.visit("/");
    cy.get("table")
      .contains("td", "first name")
      .siblings()
      .contains("button", "Delete")
      .click();
  });

  it("Create, update and remove contact", () => {
    cy.get('a.nav-link[href="/contact"]').click();
    fillAndSubmitContactForm(
      "first name",
      "last name",
      "+34 678123456",
      "examplecontact@example.com"
    );
    cy.visit("/");
    cy.get("table")
      .contains("td", "first name")
      .siblings()
      .contains("button", "Update")
      .click();
    updateEmailContactForm(
      undefined,
      undefined,
      undefined,
      "anotherexamplecontact@example.com"
    );
    cy.on("window:alert", (str) => {
      expect(str).to.equal(`Contact updated!`);
    });
  });
});
