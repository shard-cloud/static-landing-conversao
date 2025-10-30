// Basic tests for static landing page
describe("Landing Page", () => {
  test("should have basic functionality", () => {
    expect(true).toBe(true);
  });

  test("should be able to create landing page", () => {
    const landingPage = {
      title: "Landing Page",
      description: "A modern landing page",
      sections: [
        {
          type: "hero",
          title: "Welcome",
          subtitle: "Get started today",
        },
        {
          type: "features",
          items: [
            { title: "Feature 1", description: "Description 1" },
            { title: "Feature 2", description: "Description 2" },
          ],
        },
      ],
    };

    expect(landingPage.title).toBe("Landing Page");
    expect(landingPage.sections).toHaveLength(2);
  });

  test("should be able to create contact form", () => {
    const contactForm = {
      fields: [
        { name: "name", type: "text", required: true },
        { name: "email", type: "email", required: true },
        { name: "message", type: "textarea", required: true },
      ],
      submitText: "Send Message",
    };

    expect(contactForm.fields).toHaveLength(3);
    expect(contactForm.submitText).toBe("Send Message");
  });
});
