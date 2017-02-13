export const noop = () => {}

export const store = (state = {}) => ({
  getState: () => state,
  subscribe: noop,
  dispatch: noop
})

// @revert
export const state = ({
  "form": {},
  "blocks": {
    "loaded": true,
    "loading": false,
    "requesting": false,
    "data": [
      {
        "id": 3528,
        "mobilization_id": 336,
        "created_at": "2017-01-15T03:41:18.524-02:00",
        "updated_at": "2017-01-15T03:41:18.524-02:00",
        "bg_class": "{\"r\":51,\"g\":51,\"b\":51,\"a\":1}",
        "position": 1,
        "hidden": null,
        "bg_image": null,
        "name": null,
        "menu_hidden": null
      }
    ],
    "uploadingBackgroundImage": false,
    "editionMode": false
  },
  "auth": {
    "loaded": true,
    "loading": false,
    "user": null,
    "credentials": null
  },
  "community": {
    "isLoaded": false,
    "data": []
  },
  "widgets": {
    "dataExport": {
      "loading": false,
      "success": false
    },
    "list": {
      "loaded": true,
      "loading": false,
      "data": [
        {
          "id": 5702,
          "block_id": 3528,
          "kind": "donation",
          "settings": {
            "email_text": "Email de agradecimento",
            "main_color": "#54d0f6",
            "title_text": "Título do bloco de doação",
            "button_text": "Doe agora!",
            "sender_name": "Nome do remetente",
            "payment_type": "users_choice",
            "sender_email": "email@remetente.com",
            "email_subject": "Assunto do email",
            "finish_message": "{\"entityMap\":{},\"blocks\":[{\"key\":\"bnse8\",\"text\":\"Pós-doação\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":10,\"style\":\"center\"},{\"offset\":0,\"length\":10,\"style\":\"BOLD\"},{\"offset\":0,\"length\":10,\"style\":\"color: rgba(208,2,27,1);\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"5rjea\",\"text\":\"Hello World\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":11,\"style\":\"center\"},{\"offset\":0,\"length\":11,\"style\":\"BOLD\"},{\"offset\":0,\"length\":11,\"style\":\"color: rgba(208,2,27,1);\"},{\"offset\":0,\"length\":11,\"style\":\"font-size: 30px;\"}],\"entityRanges\":[],\"data\":{}}]}",
            "donation_value1": "20",
            "donation_value2": "50",
            "donation_value3": "100",
            "donation_value4": "200",
            "donation_value5": "500",
            "payment_methods": "true",
            "recurring_period": "30",
            "finish_message_type": "custom",
            "default_donation_value": "3",
            "finish_message_background": "255,255,255,1"
          },
          "sm_size": 12,
          "md_size": 6,
          "lg_size": 3,
          "form_entries_count": 0,
          "donations_count": 8,
          "created_at": "2017-01-15T03:41:18.535-02:00",
          "updated_at": "2017-01-15T20:46:41.199-02:00",
          "action_community": false,
          "action_opportunity": false,
          "exported_at": null,
          "match_list": [],
          "count": 0
        },
        {
          "id": 5703,
          "block_id": 3528,
          "kind": "pressure",
          "settings": {
            "targets": "Gabriel Ramos Takeda <gabriel@nossas.org>;Gabriel Ramos Takeda <gabrielrtakeda@gmail.com>",
            "show_city": "city-true",
            "count_text": "Texto do contador",
            "email_text": "Email de agradecimento",
            "main_color": "#f23392",
            "title_text": "Título do formulário",
            "button_text": "Texto do botão",
            "reply_email": "gabriel@nossas.org",
            "sender_name": "Nome do remetente",
            "sender_email": "email@remetente.com",
            "show_counter": "true",
            "email_subject": "Assunto do email",
            "pressure_body": "Corpo do email que será enviado",
            "finish_message": "{\"entityMap\":{},\"blocks\":[{\"key\":\"82vi9\",\"text\":\"Pós-pressão\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":11,\"style\":\"center\"},{\"offset\":0,\"length\":11,\"style\":\"BOLD\"},{\"offset\":0,\"length\":11,\"style\":\"color: rgba(208,2,27,1);\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"5qdve\",\"text\":\"Hello World\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":11,\"style\":\"center\"},{\"offset\":0,\"length\":11,\"style\":\"BOLD\"},{\"offset\":0,\"length\":11,\"style\":\"font-size: 30px;\"},{\"offset\":0,\"length\":11,\"style\":\"color: rgba(208,2,27,1);\"}],\"entityRanges\":[],\"data\":{}}]}",
            "pressure_subject": "Assunto do email",
            "finish_message_type": "custom",
            "finish_message_background": "255,255,255,1"
          },
          "sm_size": 12,
          "md_size": 6,
          "lg_size": 3,
          "form_entries_count": 0,
          "donations_count": 0,
          "created_at": "2017-01-15T03:41:18.601-02:00",
          "updated_at": "2017-01-15T20:46:52.531-02:00",
          "action_community": false,
          "action_opportunity": false,
          "exported_at": null,
          "match_list": [],
          "count": 13
        },
        {
          "id": 5704,
          "block_id": 3528,
          "kind": "form",
          "settings": {
            "fields": [
              {
                "uid": "field-1484466889105-23",
                "kind": "text",
                "label": "Nome",
                "placeholder": "Insira aqui seu nome",
                "required": "true"
              }
            ],
            "count_text": "Contador",
            "email_text": "Obrigado por apostar na força da ação coletiva em rede. Sua participação é muito importante e, agora, precisamos da sua ajuda para que mais gente colabore com esta mobilização. Compartilhe nas suas redes clicando em um dos links abaixo.\n\nUm abraço",
            "button_text": "Botão",
            "sender_name": "Nome do remetente",
            "sender_email": "email@remetente.com",
            "email_subject": "Assunto do email",
            "call_to_action": "Título do formulário",
            "finish_message": "{\"entityMap\":{},\"blocks\":[{\"key\":\"emrc6\",\"text\":\"Pós-inscrição\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":13,\"style\":\"BOLD\"},{\"offset\":0,\"length\":13,\"style\":\"center\"},{\"offset\":0,\"length\":13,\"style\":\"color: rgba(208,2,27,1);\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"7bel\",\"text\":\"Hello World\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":11,\"style\":\"BOLD\"},{\"offset\":0,\"length\":11,\"style\":\"center\"},{\"offset\":0,\"length\":11,\"style\":\"font-size: 30px;\"},{\"offset\":0,\"length\":11,\"style\":\"color: rgba(208,2,27,1);\"}],\"entityRanges\":[],\"data\":{}}]}",
            "finish_message_type": "custom",
            "finish_message_background": "255,255,255,1"
          },
          "sm_size": 12,
          "md_size": 6,
          "lg_size": 3,
          "form_entries_count": 4,
          "donations_count": 0,
          "created_at": "2017-01-15T03:41:18.606-02:00",
          "updated_at": "2017-01-15T20:47:05.385-02:00",
          "action_community": false,
          "action_opportunity": true,
          "exported_at": null,
          "match_list": [],
          "count": 0
        },
        {
          "id": 5705,
          "block_id": 3528,
          "kind": "match",
          "settings": {
            "choices1": "Cais Mauá",
            "choicesA": "Marilyn Monroe,Willy Wonka,Chico Buarque,Macaco de pelúcia,Chloe",
            "title_text": "Escolhe teu meme!",
            "labelChoices1": "Mobilização",
            "labelChoicesA": "Personagem",
            "finish_message": "{\"entityMap\":{},\"blocks\":[{\"key\":\"e3ff0\",\"text\":\"Pós-combinação\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":14,\"style\":\"center\"},{\"offset\":0,\"length\":14,\"style\":\"BOLD\"},{\"offset\":0,\"length\":14,\"style\":\"color: rgba(208,2,27,1);\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"c82d8\",\"text\":\"Hello World\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":11,\"style\":\"center\"},{\"offset\":0,\"length\":11,\"style\":\"BOLD\"},{\"offset\":0,\"length\":11,\"style\":\"font-size: 30px;\"},{\"offset\":0,\"length\":11,\"style\":\"color: rgba(208,2,27,1);\"}],\"entityRanges\":[],\"data\":{}}]}",
            "finish_message_type": "custom",
            "finish_message_background": "255,255,255,1"
          },
          "sm_size": 12,
          "md_size": 6,
          "lg_size": 3,
          "form_entries_count": 0,
          "donations_count": 0,
          "created_at": "2017-01-15T03:41:18.611-02:00",
          "updated_at": "2017-01-15T23:00:31.552-02:00",
          "action_community": false,
          "action_opportunity": false,
          "exported_at": null,
          "match_list": [
            {
              "id": 22,
              "widget_id": 5705,
              "first_choice": "Cais Mauá",
              "second_choice": "Marilyn Monroe",
              "goal_image": "https://s3.amazonaws.com/hub-central/uploads/1479303146__MPOA_cards_cais_-_marilyn.jpg",
              "created_at": "2016-11-16T11:32:30.563-02:00",
              "updated_at": "2016-11-16T11:32:30.563-02:00"
            },
            {
              "id": 23,
              "widget_id": 5705,
              "first_choice": "Cais Mauá",
              "second_choice": "Willy Wonka",
              "goal_image": "https://s3.amazonaws.com/hub-central/uploads/1479303150__MPOA_cards_cais_-_wonka.jpg",
              "created_at": "2016-11-16T11:32:35.150-02:00",
              "updated_at": "2016-11-16T11:32:35.150-02:00"
            },
            {
              "id": 24,
              "widget_id": 5705,
              "first_choice": "Cais Mauá",
              "second_choice": "Chico Buarque",
              "goal_image": "https://s3.amazonaws.com/hub-central/uploads/1479303153_card_chico_quadrado.jpg",
              "created_at": "2016-11-16T11:32:42.946-02:00",
              "updated_at": "2016-11-16T11:32:42.946-02:00"
            },
            {
              "id": 25,
              "widget_id": 5705,
              "first_choice": "Cais Mauá",
              "second_choice": "Macaco de pelúcia",
              "goal_image": "https://s3.amazonaws.com/hub-central/uploads/1479303157_monkey_card.jpg",
              "created_at": "2016-11-16T11:32:45.557-02:00",
              "updated_at": "2016-11-16T11:32:45.557-02:00"
            },
            {
              "id": 26,
              "widget_id": 5705,
              "first_choice": "Cais Mauá",
              "second_choice": "Chloe",
              "goal_image": "https://s3.amazonaws.com/hub-central/uploads/1479303163__MPOA_cards_cais_-_chloe.jpg",
              "created_at": "2016-11-16T11:32:48.579-02:00",
              "updated_at": "2016-11-16T11:32:48.579-02:00"
            }
          ],
          "count": 0
        }
      ],
      "saving": false
    },
    "plugins": {
      "match": {
        "loading": false,
        "data": []
      },
      "pressure": {
        "saving": false,
        "filled": false
      },
      "form": {
        "saving": false
      },
      "donation": {
        "saving": false
      },
      "content": {
        "editorLinkTargetType": "_self"
      }
    }
  },
  "mobilization": {
    "list": {
      "isLoaded": true,
      "loading": false,
      "data": [
        {
          "id": 336,
          "name": "Hello World I",
          "created_at": "2017-01-15T03:41:02.896-02:00",
          "updated_at": "2017-01-15T03:41:02.896-02:00",
          "user_id": 71,
          "color_scheme": "wonderland-scheme",
          "google_analytics_code": null,
          "goal": "Hello World I",
          "header_font": null,
          "body_font": null,
          "facebook_share_title": null,
          "facebook_share_description": null,
          "facebook_share_image": null,
          "slug": "291-hello-world-i",
          "custom_domain": null,
          "twitter_share_text": "Acabei de colaborar com Hello World I. Participe você também: ",
          "community_id": 31
        }
      ]
    },
    "templates": {
      "list": {
        "loading": false,
        "loaded": false,
        "global": [],
        "custom": []
      },
      "filterable": {
        "list": []
      },
      "selectable": {}
    }
  },
  "colorPicker": {
    "loading": false,
    "loaded": false
  }
})
