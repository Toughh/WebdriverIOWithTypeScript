Feature: Parfum Product Listing based on selected filters

  Scenario Outline: As a user, I should be able to filter out parfum sale products

    Given the user navigates to the website
    When the user clicks the "Accept Cookies" button
    When user click on parent "<menu>"
    When user select an option "<option1>" from dropdown <dropdown1>
    And user select an option "<option2>" from dropdown <dropdown2>
    And user select an option "<option3>" from dropdown <dropdown3>
    And user select an option "<option4>" from dropdown <dropdown4>
    And user select an option "<option5>" from dropdown <dropdown5>
    Then all displayed items should have the selected filter "<category>"
    Then all displayed items should have the selected filter "<option3>"

    Examples:
      | menu   | dropdown1 | option1   | category | dropdown2 | option2     | dropdown3 | option3             | dropdown4 | option4  | dropdown5 | option5        |
      | parfum |     6     | Sale      | Sale     |     7     | Weihnachten |     2     |  4711               |     3     | Unisex   |     1     | Eau de Cologne |
		  | parfum |     6     | NEU       | NEU      |     7     | Weihnachten |     2     | Abercrombie & Fitch |     3     | Männlich |     1     |     Duftset    |
		  | parfum |     6     | Limitiert | Sale     |     7     | Weihnachten |     2     | Abercrombie & Fitch |     3     | Männlich |     1     |     Duftset    |
