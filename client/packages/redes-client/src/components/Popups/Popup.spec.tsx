import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, waitFor, fireEvent } from "@testing-library/react";
import faker from "faker/locale/pt_BR";

import Popups from "./";
import { FilterProvider } from "../../services/FilterProvider";

describe("Popups", () => {
  const matchUsers = {
    recipient: {
      firstName: faker.name.firstName(),
      phone: null,
      whatsapp: null,
      group: {
        settings: {
          communication: {
            whatsapp: "IFIRSTNAME, DEU MATCH! O seu contato acaba de ser enviado para a VFIRSTNAME! Obrigada, AGENT"
          }
        }
      }
    },
    volunteer: {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      phone: faker.phone.phoneNumber(),
      registrationNumber: "12312312",
      whatsapp: faker.phone.phoneNumber(),
      group: {
        settings: {
          communication: {
            whatsapp: "VFIRSTNAME, DEU MATCH! O seu número de atendimento acaba de ser enviado para a IFIRSTNAME! Obrigada, AGENT"
          }
        }
      }
    },
  };
  const user = {
    avatar: null,
    createdAt: faker.date.past(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    id: faker.random.uuid(),
    isAdmin: false,
    lastName: faker.name.lastName(),
  };
  let isOpen = true;
  const setModal = (e: boolean) => jest.fn(() => (isOpen = e));
  let createRelationship: (args: {
    variables: Record<string, any>;
  }) => Promise<any>;

  describe("Match confirmation popup", () => {
    beforeEach(() => {
      createRelationship = jest.fn().mockResolvedValueOnce({ data: "Ok" });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("The recipient and volunteer names are correct", () => {
      const { getByText } = render(
        <FilterProvider>
          <Popups
            match={matchUsers}
            setModal={setModal}
            isOpen={isOpen}
            createRelationship={createRelationship}
            user={user}
            community={{ id: 40 }}
            loading={false}
          />
        </FilterProvider>
      );
      const titleConfirm = getByText("Confirma?");
      const recipientName = matchUsers.recipient.firstName;
      const volunteerName = matchUsers.volunteer.firstName;
      const textConfirm = getByText(
        `${recipientName} será encaminhada para ${volunteerName}.`
      );
      expect(titleConfirm).toBeInTheDocument();
      expect(textConfirm).toBeInTheDocument();
    });

    describe("The match is made and the final popup screen is rendered", () => {
      beforeEach(() => {
        createRelationship = jest.fn().mockResolvedValueOnce({ data: "Ok" });
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it("should render the success screen", async () => {
        const { getByText } = render(
          <FilterProvider>
            <Popups
              match={matchUsers}
              setModal={setModal}
              isOpen={isOpen}
              createRelationship={createRelationship}
              user={user}
              community={{ id: 40 }}
              loading={false}
            />
          </FilterProvider>,
          { wrapper: BrowserRouter }
        );

        const confirmButton = getByText(/Confirmar/);

        fireEvent.click(confirmButton);

        await waitFor(() => {
          const titleSuccess = getByText("Eba!");
          const recipientName = matchUsers.recipient.firstName;
          const volunteerName = matchUsers.volunteer.firstName;
          const textSuccess = getByText(
            `Uma relação foi criada entre ${recipientName} e ${volunteerName}.`
          );
          expect(titleSuccess).toBeInTheDocument();
          expect(textSuccess).toBeInTheDocument();
        });
      });
      test("links have the correct text", async () => {
        const { getByText } = render(
          <FilterProvider>
            <Popups
              match={matchUsers}
              setModal={setModal}
              isOpen={isOpen}
              createRelationship={createRelationship}
              user={user}
              community={{ id: 40 }}
              loading={false}
            />
          </FilterProvider>,
          { wrapper: BrowserRouter }
        );

        const confirmButton = getByText(/Confirmar/);

        fireEvent.click(confirmButton);

        await waitFor(() => {
          const { recipient, volunteer } = matchUsers
          const recipientButton = getByText(recipient.firstName);
          const volunteerButton = getByText(volunteer.firstName);

          const recipientNumber = (recipient.whatsapp || recipient.phone || "0").split(" ").join("%20")
          const volunteerNumber = (volunteer.whatsapp || volunteer.phone || "0").split(" ").join("%20")

          const recipientText = encodeURIComponent(`${recipient.firstName}, DEU MATCH! O seu contato acaba de ser enviado para a ${volunteer.firstName}! Obrigada, ${user.firstName}`)
          const volunteerText = encodeURIComponent(`${volunteer.firstName}, DEU MATCH! O seu número de atendimento acaba de ser enviado para a ${recipient.firstName}! Obrigada, ${user.firstName}`)

          expect(recipientButton.closest("a")?.href).toStrictEqual(`https://web.whatsapp.com/send?phone=55${recipientNumber}&text=${recipientText}`)
          expect(volunteerButton.closest("a")?.href).toStrictEqual(`https://web.whatsapp.com/send?phone=55${volunteerNumber}&text=${volunteerText}`)
        });
      });
    });
    describe("The match isn't successful", () => {
      beforeEach(() => {
        createRelationship = jest.fn().mockRejectedValueOnce({
          message: "Houve um erro ao executar o match",
          graphQLErrors: ["Erro 404"]
        });
      });

      afterEach(() => {
        jest.clearAllMocks();
      });
      it("should render the error screen", async () => {
        const { getByText } = render(
          <FilterProvider>
            <Popups
              match={matchUsers}
              setModal={setModal}
              isOpen={isOpen}
              createRelationship={createRelationship}
              user={user}
              community={{ id: 40 }}
              loading={false}
            />
          </FilterProvider>,
          { wrapper: BrowserRouter }
        );

        const confirmButton = getByText(/Confirmar/);

        fireEvent.click(confirmButton);

        await waitFor(() => {
          const { recipient, volunteer } = matchUsers
          const title = getByText("Ops!")
          expect(title).toBeInTheDocument()

          const subtitle = getByText(`Encontramos um erro e ${recipient.firstName} não pôde ser encaminhada para ${volunteer.firstName}`)
          expect(subtitle).toBeInTheDocument()

          const tryAgainButton = getByText("tentar novamente")
          expect(tryAgainButton).toBeInTheDocument()
        });
      })
    })
  });
});
