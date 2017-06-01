export default {
  // page account login
  // filepath: /routes/admin/not-authenticated/account-login/page.js
  // routepath: /login
  'page--account-login.label.email': 'E-mail',
  'page--account-login.label.password': 'Senha',
  'page--account-login.placeholder.email': 'exemplo@email.com',
  'page--account-login.loading': 'Carregando...',
  'page--account-login.signin': 'Entrar',
  'page--account-login.ask-register': 'Ainda não é cadastrado?',
  'page--account-login.cta-signup': 'Clique para criar uma conta.',

  // page account register
  // filepath: /routes/admin/not-authenticated/account-register/page.js
  // routepath: /register
  'page--account-register.title': 'Crie sua conta no Bonde.',
  'page--account-register.form.name.label': 'Nome',
  'page--account-register.form.name.placeholder': 'Seu nome',
  'page--account-register.form.name.validation.required': 'Informe seu nome',
  'page--account-register.form.lastname.label': 'Sobrenome',
  'page--account-register.form.lastname.placeholder': 'Sobrenome',
  'page--account-register.form.email.label': 'E-mail',
  'page--account-register.form.email.placeholder': 'exemplo@email.com.br',
  'page--account-register.form.email.validation.required': 'Informe seu e-mail',
  'page--account-register.form.email.validation.invalid-email-format': 'E-mail inválido',
  'page--account-register.form.password.label': 'Senha',
  'page--account-register.form.password.label.validation.required': 'Informe uma senha',
  'page--account-register.form.password.label.validation.min-length': 'Sua senha precisa ter um minímo de 8 caracteres.',
  'page--account-register.form.password-confirm.label': 'Confirme sua senha',
  'page--account-register.form.password-confirm.label.validation.match': 'Senha não confere',
  'page--account-register.form.submit-button.default': 'Criar conta',
  'page--account-register.form.submit-button.saving': 'Salvando...',

  // page account edit
  // filepath: /routes/admin/authenticated/sidebar/account-edit/page.js
  // routepath: /account/edit
  'page--account-edit.header.title': 'Minha conta',
  'page--account-edit.header.tabs.user': 'Usuário',
  'page--account-edit.form.name.label': 'Nome',
  'page--account-edit.form.lastname.label': 'Sobrenome',
  'page--account-edit.form.email.label': 'E-mail',

  // page subscription edit
  // filepath: /routes/public/subscription-edit/page.js
  // routepath: /subscriptions/:id/edit
  'page--subscription-edit.title': 'Dados da Doação',
  'page--subscription-edit.helper-text': 'Selecione abaixo qual informação da sua doação quer alterar:',
  'page--subscription-edit.button.creditcard': 'Cartão de crédito',
  'page--subscription-edit.button.recurring': 'Data da doação',

  // form subscription credit card
  // filepath: /client/subscriptions/forms/credit-card-form.js
  // routepath: /subscriptions/:id/edit
  'form--subscription-creditcard.helper-text': 'Altere os dados do seu cartão de crédito preenchendo os campos abaixo. Sua doação continuará a mesma mas, a partir do momento em que salvar os dados abaixo, o valor será cobrado neste novo cartão ; )',

  'form--subscription-creditcard.previous-data.title': 'Dados do último cartão',
  'form--subscription-creditcard.previous-data.name': 'Nome',
  'form--subscription-creditcard.previous-data.expiration-date': 'Validade',

  'form--subscription-creditcard.form.number.label': 'Número',
  'form--subscription-creditcard.form.number.placeholder': 'Ex: 0000 0000 0000 0000',
  'form--subscription-creditcard.form.name.label': 'Nome',
  'form--subscription-creditcard.form.name.placeholder': '(igual ao que aparece no cartão)',
  'form--subscription-creditcard.form.expiration-date.label': 'Validade',
  'form--subscription-creditcard.form.expiration-date.placeholder': '00/00',
  'form--subscription-creditcard.form.cvv.label': 'CVV',
  'form--subscription-creditcard.form.cvv.placeholder': 'Ex: 000',
  'form--subscription-creditcard.form.submit-button.text': 'Salvar',
  'form--subscription-creditcard.form.validation.required': 'Obrigatório',

  // form subscription recurring
  // filepath: /client/subscriptions/forms/recurring-form.js
  // routepath: /subscriptions/:id/edit
  'form--subscription-recurring.helper-text': 'Preencha os campos abaixo para alterar a data em que a cobrança da sua doação é efetuada. Sua doação continuará a mesma mas, a partir do momento em que salvar os dados abaixo, o valor será cobrado neste novo cartão ; )',
  'form--subscription-recurring.form.process-at.label': 'Nova data de cobrança',
  'form--subscription-recurring.form.process-at.placeholder': 'Ex: DD/MM/AAAA',
  'form--subscription-recurring.form.submit-button.text': 'Salvar',
  'form--subscription-recurring.form.validation.required': 'Obrigatório',
  'form--subscription-recurring.form.validation.invalid-date-format': 'Formato de data inválido',

  // notifications
  // filepath: /client/utils/notifications.js
  // routepath: /subscriptions/:id/edit
  'notification--generic-request-error.title': 'Ops!',
  'notification--generic-request-error.message': 'Parece que teve algum problema técnico nessa última requisição. Pedimos que tente de novo daqui a pouco.',
  'notification--generic-save-success.title': 'Oba!',
  'notification--generic-save-success.message': 'A requisição foi feita com sucesso e, os seus dados estão salvos em segurança.',

  // page community list
  // filepath: /routes/admin/authenticated/external/community-list/page.js
  // routepath: /community
  'page--community-list.title': 'Olá {userFirstName},',
  'page--community-list.subtitle': 'Escolha uma das suas comunidades',
  'page--community-list.new': 'Crie uma nova comunidade',

  // component community settings menu
  // filepath: /client/community/components/settings-menu.js
  // routepath:
  //   - /community/domain
  //   - /community/domain/add
  //   - /community/info
  //   - /community/mailchimp
  //   - /community/recipient
  //   - /community/report
  'community.components--settings-menu.title': 'Configurações da comunidade',
  'community.components--settings-menu.tabs.info': 'Informações',
  'community.components--settings-menu.tabs.mailchimp': 'Mailchimp',
  'community.components--settings-menu.tabs.recipient': 'Recebedor',
  'community.components--settings-menu.tabs.report': 'Relatório',
  'community.components--settings-menu.tabs.domains': 'Domínios',

  // component community domain preview
  // filepath: /client/community/components/dns/dns-preview/domain-preview.js
  // routepath: /community/domain/add
  'community.components--domain-preview.li.domain.header': 'Domínio da comunidade',

  // component community subdomain preview and form
  // routepath: /community/domain
  'community.components--subdomain.label.name': 'Nome',
  'community.components--subdomain.label.record-type': 'Tipo',
  'community.components--subdomain.label.value': 'Valor',
  'community.components--subdomain.form.submit-button': 'Adicionar',
  'community.components--domain.preview.label.domain': 'Domínio da comunidade',
  'community.page--domain-list.header.dns-hosted-zone': 'Domínios da comunidade',
  'community.page--domain-list.header.dns-records': 'Registros DNS',
  'community.page--domain-list.header.dns-server': 'Servidor DNS',
  'community.page--domain-list.button.add-new-record': 'Adicionar novo registro',
  'community.page--domain-list.button.add-new-domain': 'Adicionar novo domínio',
  'community.page--domain-list.dialog.record-confirm-message': 'Tem certeza que deseja remover o registro',
  'community.page--domain-list.dialog.domain-confirm-message': 'Tem certeza que deseja remover o domínio',
  'community.page--domain-list.dns-record-description': 'Os registros DNS são configurações especiais que alteram a forma como o seu domínio trabalha. Com esses registros, você se conecta a serviços de terceiros como provedores de email. {link}.',
  'community.page--domain-list.dns-record-description.link': 'Saiba mais',
  'community.page--domain-list.dns-server-description': 'Os Servidores DNS são endereços utilizados pelas organizações de registro de domínios como {registrobr} ou {godaddy}, para identificarem em qual servidor se encontram as informações sobre o domínio registrado. Tire suas dúvidas {trilho}.',
  'community.page--domain-list.dns-server-description.trilho.link': 'no site de ajuda',

  // component community subdomain form
  // filepath: /client/community/components/dns/subdomain-form/index.js
  // routepath: /community/domain
  //'community.components--subdomain-form.subdomain.label': 'Subdomínio',
  //'community.components--subdomain-form.record-type.label': 'Tipo',
  //'community.components--subdomain-form.redirect-to.label': 'Redirecionar para',
  'community.components--subdomain-form.button.text': 'Adicionar',

  // page community domain
  // filepath: /routes/admin/authenticated/sidebar/community-settings/domain/page.js
  // routepath: /community/domain
  'page--community-domain.form.validation.required': 'Preenchimento obrigatório',

  'page--community-domain.section--dns-hosted-zone.title': 'Domínios da comunidade',
  'page--community-domain.section--dns-hosted-zone.add': 'Adicionar novo domínio',
  'page--community-domain.section--dns-hosted-zone.menu.subdomains': 'Subdomínios',
  'page--community-domain.section--dns-hosted-zone.menu.remove': 'Remover domínio',
  'page--community-domain.section--dns-hosted-zone.menu.remove.dialog.text': 'Tem certeza que deseja remover o domínio {domainName}?',
  'page--community-domain.section--dns-hosted-zone.menu.check-dns': 'Verificar DNS',

  'page--community-domain.section--dns-records.title': 'Subdomínios externos',
  'page--community-domain.section--dns-records.add': 'Adicionar novo subdomínio externo',
  'page--community-domain.section--dns-records.menu.remove': 'Remover subdomínio',
  'page--community-domain.section--dns-records.menu.remove.dialog.text': 'Tem certeza que deseja remover o subdomínio {subdomainName}?',

  // component dialog
  // filepath: /client/ux/components/dialog/index.js
  // routepath: /community/domain
  'ux.components--dialog.button.confirm.text': 'Confirmar',
  'ux.components--dialog.button.cancel.text': 'Cancelar',

  // page community domain create
  // filepath: /routes/admin/authenticated/sidebar/community-settings/domain-create/page.js
  // routepath: /community/domain/add
  'page--community-domain-create.title': 'Domínio da comunidade',

  'page--community-domain-create.step-add.title': 'Insira o domínio desejado',
  'page--community-domain-create.step-add.form.domain-name.label': 'Domínio da sua comunidade',
  'page--community-domain-create.step-add.form.domain-name.placeholder': 'Ex. minhacomunidade.org',
  'page--community-domain-create.step-add.form.domain-name.validation.required': 'Domínio é obrigatório.',
  'page--community-domain-create.step-add.form.domain-name.validation.invalid-domain-format': 'Domínio inválido',
  'page--community-domain-create.step-add.form.button.text': 'Adicionar',

  'page--community-domain-create.step-dns-servers.title': 'Altere os servidores do seu provedor DNS',
  'page--community-domain-create.step-dns-servers.first-paragraph': '1. Faça login no seu provedor de DNS (onde seu domínio está registrado, por exemplo GoDaddy, Locaweb, RegistroBR)',
  'page--community-domain-create.step-dns-servers.second-paragraph': '2. Encontre a página de {dnsManager}, e altere os {serversName} para os servidores do Bonde:',
  'page--community-domain-create.step-dns-servers.second-paragraph.dns-manager': 'gerenciador de DNS',
  'page--community-domain-create.step-dns-servers.second-paragraph.servers-name': 'nomes de servidor',
  'page--community-domain-create.step-dns-servers.button.text': 'Continuar',

  'page--community-domain-create.step-check.title': 'Teste a conexão',
  'page--community-domain-create.step-check.first-paragraph': 'Clique no botão abaixo para verificar se tudo está certo.',
  'page--community-domain-create.step-check.second-paragraph': 'Atenção: a mudança de DNS pode demorar até 48 horas para ser propagada pela internet.',
  'page--community-domain-create.step-check.button.text': 'Testar',

  // page community info
  // filepath: /routes/admin/authenticated/sidebar/community-settings/info/page.js
  // routepath: /community/info
  'page--community-info.form.name.label': 'Nome',
  'page--community-info.form.name.validation.required': 'Informe o nome da comunidade',
  'page--community-info.form.description.label': 'Descrição',
  'page--community-info.form.city.label': 'Cidade',
  'page--community-info.form.city.validation.required': 'Informe em qual cidade sua comunidade atua',
  'page--community-info.form.custom-from-email.label': 'E-mail de resposta para notificações',
  'page--community-info.form.custom-from-email.helper-text': 'Você deve preencher seguindo o formato padrão: Nome do contato <contato@provedor.com>',
  'page--community-info.form.custom-from-email.validation.invalid-email-format': 'E-mail de resposta fora do formato padrão',

  // component settings form
  // filepath: /client/ux/components/settings-form/index.js
  // routepath:
  //   - /account/edit
  //   - /community/info
  //   - /community/mailchimp
  //   - /community/recipient
  //   - /mobilizations/:mobilization_id/analytics
  //   - /mobilizations/:mobilization_id/basics
  //   - /mobilizations/:mobilization_id/customDomain
  //   - /mobilizations/:mobilization_id/sharing
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  'ux.components--settings-form.button.text': 'Salvar',
  'ux.components--settings-form.success-message': 'Dados editados com sucesso',

  // page community mailchimp
  // filepath: /routes/admin/authenticated/sidebar/community-settings/mailchimp/page.js
  // routepath: /community/mailchimp
  'page--community-mailchimp.form.api-key.label': 'Mailchimp API Key',
  'page--community-mailchimp.form.list-id.label': 'Mailchimp ID da lista',
  'page--community-mailchimp.form.group-id.label': 'Mailchimp ID do grupo',

  // page community new
  // filepath: /routes/admin/authenticated/external/community-new/page.js
  // routepath: /community/new
  'page--community-new.title': 'Crie uma comunidade',
  'page--community-new.subtitle': 'Comunidades do Bonde são grupos de ação que trabalham juntos por uma causa.',

  'page--community-new.form.name.label': 'Nome da comunidade',
  'page--community-new.form.name.placeholder': 'Exemplo: Movimento 90º São Paulo',
  'page--community-new.form.city.label': 'Cidade da comunidade',
  'page--community-new.form.city.placeholder': 'Exemplo: São Paulo',
  'page--community-new.form.submit-button.text.default': 'Criar comunidade',
  'page--community-new.form.submit-button.text.saving': 'Salvando...',

  // page community new (connected)
  // filepath: /routes/admin/authenticated/external/community-new/page.connected.js
  // routepath: /community/new
  'page--community-new.form.name.validation.required': 'Informe o nome da comunidade',
  'page--community-new.form.city.validation.required': 'Informe em qual cidade sua comunidade atua',

  // page community recipient
  // filepath: /routes/admin/authenticated/sidebar/community-settings/recipient/page.js
  // routepath: /community/recipient
  'page--community-recipient.pagarme-warning': 'Atenção: As doações só ficam disponíveis 31 dias após a transação de cartão de crédito ter sido criada (29 dias corridos + 2 dias úteis) no caso de transações com uma parcela e 2 dias úteis após o pagamento do boleto bancário. Caso a transação tenha de 2 a 12 parcelas, o recebimento normal será da seguinte forma: primeira parcela em 31 dias, segunda em 61, terceira em 91, e assim por diante.',

  'page--community-recipient.form.transfer-interval.label': 'Intervalo',
  'page--community-recipient.form.transfer-interval.value.weekly': 'Semanalmente',
  'page--community-recipient.form.transfer-interval.value.monthly': 'Mensalmente',
  'page--community-recipient.form.transfer-day.label': 'Dia de transferência',

  'page--community-recipient.section--account.header': 'Conta bancária',
  'page--community-recipient.form.bank-code.label': 'Banco',
  'page--community-recipient.form.bank-code.value.default': 'Selecione o banco',
  'page--community-recipient.form.bank-account-type.label': 'Tipo de conta',
  'page--community-recipient.form.bank-account-type.value.checking-account': 'Corrente',
  'page--community-recipient.form.bank-account-type.value.savings-account': 'Poupança',
  'page--community-recipient.form.bank-agency.label': 'Agência',
  'page--community-recipient.form.bank-agency-dv.label': 'Dígito',
  'page--community-recipient.form.bank-account.label': 'Conta',
  'page--community-recipient.form.bank-account-dv.label': 'Dígito',
  'page--community-recipient.form.bank-legal-name.label': 'Nome / Razão Social',
  'page--community-recipient.form.bank-document-number.label': 'CPF / CNPJ',

  // page community recipient (connected)
  // filepath: /routes/admin/authenticated/sidebar/community-settings/recipient/page.connected.js
  // routepath: /community/recipient
  'page--community-recipient.form.validation.required': 'Campo obrigatório',
  'page--community-recipient.form.bank-agency.validation.max-length': 'Deve conter no máximo 5 digitos',
  'page--community-recipient.form.bank-agency-dv.validation.length': 'Deve conter apenas 1 digito',
  'page--community-recipient.form.bank-account.validation.max-length': 'Deve conter no máximo 13 digitos',
  'page--community-recipient.form.bank-account-dv.validation.max-length': 'Deve conter no máximo 2 caracteres',
  'page--community-recipient.form.bank-document-number.validation.cnpj-length': 'CNPJ deve conter 14 digitos',
  'page--community-recipient.form.bank-document-number.validation.cpf-length': 'CPF deve conter 11 digitos',
  'page--community-recipient.form.bank-document-number.validation.invalid-cpf-format': 'CPF inválido',
  'page--community-recipient.form.bank-document-number.validation.invalid-cnpj-format': 'CNPJ inválido',

  // page community report
  // filepath: /routes/admin/authenticated/sidebar/community-settings/report/page.js
  // routepath: /community/report
  'page--community-report.section-button.donation.title': 'RELATÓRIO DE DOAÇÕES',
  'page--community-report.section-button.donation.helper-text': 'Clique no botão abaixo para baixar o relatório de doações da comunidade.',
  'page--community-report.section-button.donation.text': 'Baixar',

  'page--community-report.section-button.actions.title': 'RELATÓRIO DE AÇÕES',
  'page--community-report.section-button.actions.helper-text': 'Clique no botão abaixo para baixar o relatório de ações feitas na comunidade.',
  'page--community-report.section-button.actions.text': 'Baixar',

  'page--community-report.section-button.activists.title': 'RELATÓRIO DE ATIVISTAS',
  'page--community-report.section-button.activists.helper-text': 'Clique no botão abaixo para baixar o relatório dos ativistas da comunidade.',
  'page--community-report.section-button.activists.text': 'Baixar',

  // component sidebar
  // filepath: /client/components/navigation/sidebar/sidebar.js
  // routepath:
  //   - /account/edit
  //   - /community/domain
  //   - /community/domain/add
  //   - /community/info
  //   - /community/mailchimp
  //   - /community/recipient
  //   - /community/report
  //   - /mobilizations
  //   - /mobilizations/:mobilization_id/analytics
  //   - /mobilizations/:mobilization_id/basics
  //   - /mobilizations/:mobilization_id/blocks/create
  //   - /mobilizations/:mobilization_id/customDomain
  //   - /mobilizations/:mobilization_id/edit
  //   - /mobilizations/:mobilization_id/launch
  //   - /mobilizations/:mobilization_id/launch/end
  //   - /mobilizations/:mobilization_id/sharing
  //   - /mobilizations/:mobilization_id/templates/choose
  //   - /mobilizations/:mobilization_id/templates/choose/custom
  //   - /mobilizations/:mobilization_id/templates/choose/global
  //   - /mobilizations/:mobilization_id/templates/create
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/export
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/export
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/fields
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  //   - /mobilizations/new
  //   - /mobilizations/templates/list
  'components.navigation--sidebar.community-settings.item.mobilizations': 'Minhas Mobilizações',
  'components.navigation--sidebar.community-settings.item.info': 'Informações',
  'components.navigation--sidebar.community-settings.item.mailchimp': 'Mailchimp',
  'components.navigation--sidebar.community-settings.item.recipient': 'Recebedor',
  'components.navigation--sidebar.community-settings.item.report': 'Relatório',
  'components.navigation--sidebar.community-settings.item.domains': 'Domínios',

  'components.navigation--sidebar.mobilization-settings.item.launch': 'PUBLICAR BONDE',
  'components.navigation--sidebar.mobilization-settings.item.launched': 'BONDE público',
  'components.navigation--sidebar.mobilization-settings.item.edit': 'Editar mobilização',
  'components.navigation--sidebar.mobilization-settings.item.add-block': 'Adicionar conteúdo',
  'components.navigation--sidebar.mobilization-settings.item.open-at-new-tab': 'Ver em uma nova aba',
  'components.navigation--sidebar.mobilization-settings.item.config': 'Configurações',

  'components.navigation--sidebar.footer.account': 'Minha Conta',
  'components.navigation--sidebar.footer.sign-out': 'Sair',

  // component sidenav
  // filepath: /client/components/navigation/sidenav/sidenav.js
  // routepath:
  //   - /account/edit
  //   - /community/domain
  //   - /community/domain/add
  //   - /community/info
  //   - /community/mailchimp
  //   - /community/recipient
  //   - /community/report
  //   - /mobilizations
  //   - /mobilizations/:mobilization_id/analytics
  //   - /mobilizations/:mobilization_id/basics
  //   - /mobilizations/:mobilization_id/blocks/create
  //   - /mobilizations/:mobilization_id/customDomain
  //   - /mobilizations/:mobilization_id/edit
  //   - /mobilizations/:mobilization_id/launch
  //   - /mobilizations/:mobilization_id/launch/end
  //   - /mobilizations/:mobilization_id/sharing
  //   - /mobilizations/:mobilization_id/templates/choose
  //   - /mobilizations/:mobilization_id/templates/choose/custom
  //   - /mobilizations/:mobilization_id/templates/choose/global
  //   - /mobilizations/:mobilization_id/templates/create
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/export
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/export
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/fields
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  //   - /mobilizations/new
  //   - /mobilizations/templates/list
  'components.navigation--sidenav.config': 'Configurações',
  'components.navigation--sidenav.change-community': 'Trocar',

  // page mobilizations list
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-list/page.js
  // routepath: /mobilizations
  'page--mobilizations-list.page-header.title': 'Suas Mobilizações',
  'page--mobilizations-list.more-menu-action.open': 'Abrir página',
  'page--mobilizations-list.more-menu-action.create-template': 'Criar template',

  // component mobilizations page header
  // filepath: /client/mobilizations/components/page-header.js
  // routepath:
  //   - /mobilizations
  //   - /mobilizations/templates/list
  'mobilizations.components--page-header.button.text': 'Nova mobilização',
  'mobilizations.components--page-header.tabs.actives': 'Ativas',
  'mobilizations.components--page-header.tabs.templates': 'Templates',

  // component mobilizations list item: name
  // filepath: /client/mobilizations/components/list/items/name/index.js
  // routepath:
  //   - /mobilizations
  //   - /mobilizations/templates/list
  //   - /mobilizations/:mobilization_id/templates/choose/custom
  //   - /mobilizations/:mobilization_id/templates/choose/global
  //   - /mobilizations/:mobilization_id/templates/create
  'mobilizations.components--list.items.name.header.text': 'Nome',

  // component mobilizations list item: created at
  // filepath: /client/mobilizations/components/list/items/created-at.js
  // routepath:
  //   - /mobilizations
  //   - /mobilizations/templates/list
  //   - /mobilizations/:mobilization_id/templates/choose/custom
  //   - /mobilizations/:mobilization_id/templates/choose/global
  //   - /mobilizations/:mobilization_id/templates/create
  'mobilizations.components--list.items.created-at.header.text': 'Criada em',

  // component mobilizations list item: users
  // filepath: /client/mobilizations/components/list/items/users.js
  // routepath:
  //   - /mobilizations
  //   - /mobilizations/templates/list
  'mobilizations.components--list.items.users.header.text': 'Usuários',

  // component mobilizations list item: fund raising
  // filepath: /client/mobilizations/components/list/items/fund-raising.js
  // routepath:
  //   - /mobilizations
  //   - /mobilizations/templates/list
  'mobilizations.components--list.items.fund-raising.header.text': 'Arrecadações',
  'mobilizations.components--list.items.fund-raising.currency': 'R$',

  // component mobilizations page tab layout
  // filepath: /client/mobilizations/components/page-tab-layout.js
  // routepath:
  //   - /mobilizations/new
  //   - /mobilizations/:mobilization_id/templates/choose
  //   - /mobilizations/:mobilization_id/templates/choose/custom
  //   - /mobilizations/:mobilization_id/templates/choose/global
  'mobilizations.components--page-tab-layout.title': 'Nova mobilização',
  'mobilizations.components--page-tab-layout.tabs.goal': 'Objetivo',
  'mobilizations.components--page-tab-layout.tabs.templates': 'Templates',

  // page mobilizations new
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-new/page.js
  // routepath: /mobilizations/new
  'page--mobilizations-new.title': 'Qual o objetivo da sua mobilização?',
  'page--mobilizations-new.footer': 'Fique tranquil@ vc poderá editar depois se achar necessário.',

  // component mobilizations mobilization basics form
  // filepath: /client/mobilizations/components/mobilization-basics-form.js
  // routepath:
  //   - /mobilizations/new
  //   - /mobilizations/:mobilization_id/basics
  'mobilizations.components--basics-form.name.label': 'Nome',
  'mobilizations.components--basics-form.name.placeholder': 'Ex: Pela criação de uma delegacia de desaparecidos',
  'mobilizations.components--basics-form.name.validation.required': 'Insira o nome da mobilização',
  'mobilizations.components--basics-form.name.validation.max-length': 'Seu título está muito longo!',
  'mobilizations.components--basics-form.goal.label': 'Objetivo',
  'mobilizations.components--basics-form.goal.placeholder': 'Faça um texto curto, capaz de motivar outras pessoas a se unirem à sua mobilização. Você poderá alterar este texto depois.',
  'mobilizations.components--basics-form.goal.validation.required': 'Insira o objetivo da mobilização',
  'mobilizations.components--basics-form.goal.validation.max-length': 'O limite de caracteres foi atingido.',

  // component control buttons
  // filepath: /client/components/forms/control-buttons.js
  // routepath:
  //   - /account/edit
  //   - /community/domain
  //   - /community/domain/add
  //   - /community/info
  //   - /community/mailchimp
  //   - /community/new
  //   - /community/recipient
  //   - /login
  //   - /mobilizations/:mobilization_id/analytics
  //   - /mobilizations/:mobilization_id/basics
  //   - /mobilizations/:mobilization_id/customDomain
  //   - /mobilizations/:mobilization_id/launch
  //   - /mobilizations/:mobilization_id/sharing
  //   - /mobilizations/:mobilization_id/templates/create
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  //   - /mobilizations/new
  //   - /register
  //   - /subscriptions/:id/edit
  'components--control-buttons.input.value.default': 'Continuar',
  'components--control-buttons.input.value.saving': 'Salvando...',

  // page mobilizations templates choose
  // filepath: /routes/admin/authenticated/sidebar/templates-choose/page.js
  // routepath: /mobilizations/:mobilization_id/templates/choose
  'page--mobilizations.templates-choose.title': 'Como você deseja começar?',
  'page--mobilizations.templates-choose.browsable-list-item.blank': 'Criar mobilização do zero',
  'page--mobilizations.templates-choose.browsable-list-item.templates-custom': 'Meus templates',
  'page--mobilizations.templates-choose.browsable-list-item.templates-global': 'Templates globais',

  // component mobilizations templates selectable list
  // filepath: /client/mobilizations/templates/components/template-selectable-list.js
  // routepath:
  //   - /mobilizations/:mobilization_id/templates/choose/custom
  //   - /mobilizations/:mobilization_id/templates/choose/global
  'templates.components--selectable-list.filterable-search-bar.placeholder': 'Busque um template',
  'templates.components--selectable-list.empty-list-text': 'Não existe nenhum template com esse nome',
  'templates.components--selectable-list.button.back': 'Voltar',
  'templates.components--selectable-list.button.next': 'Continuar',

  // page mobilizations templates choose custom
  // filepath: /routes/admin/authenticated/sidebar/templates-choose-custom/page.js
  // routepath: /mobilizations/:mobilization_id/templates/choose/custom
  'page--mobilizations.templates-choose-custom.title': 'Meus Templates',

  // page mobilizations templates choose global
  // filepath: /routes/admin/authenticated/sidebar/templates-choose-global/page.js
  // routepath: /mobilizations/:mobilization_id/templates/choose/global
  'page--mobilizations.templates-choose-global.title': 'Templates Globais',

  // component mobilizations settings menu
  // filepath: /client/mobilizations/components/settings-menu.js
  // routepath:
  //   - /mobilizations/:mobilization_id/analytics
  //   - /mobilizations/:mobilization_id/basics
  //   - /mobilizations/:mobilization_id/customDomain
  //   - /mobilizations/:mobilization_id/sharing
  'mobilizations.components--settings-menu.title': 'Configure sua mobilização',
  'mobilizations.components--settings-menu.tabs.info': 'Informações básicas',
  'mobilizations.components--settings-menu.tabs.sharing': 'Compartilhamento',
  'mobilizations.components--settings-menu.tabs.domain': 'Domínio',

  // page mobilizations settings analytics
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-settings-analytics/page.js
  // routepath: /mobilizations/:mobilization_id/analytics
  'page--mobilizations-analytics.first-paragraph': 'Para acompanhar os resultados da sua mobilização, você precisa configurar uma conta no Google Analytics.',
  'page--mobilizations-analytics.second-paragraph': 'Siga os passos abaixo:',
  'page--mobilizations-analytics.ol.create-analytics-account': ' Crie uma conta no Google Analytics {link}',
  'page--mobilizations-analytics.ol.create-analytics-account.link': 'clicando aqui',
  'page--mobilizations-analytics.ol.keep-up-with': 'Obtenha sua ID de acompanhamento no Google Analytics. É um código que começa sempre com as letras UA, que você verá após criar sua conta lá.',
  'page--mobilizations-analytics.ol.paste-ga-code': 'Copie a ID de acompanhamento e cole no campo abaixo:',
  'page--mobilizations-analytics.ol.form.ga-code.label': 'ID do Google Analytics',
  'page--mobilizations-analytics.ol.done': 'Pronto! Você já pode acompanhar as estatísticas da sua mobilização no Google Analytics!',

  // page mobilizations settings analytics (connected)
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-settings-analytics/page.connected.js
  // routepath: /mobilizations/:mobilization_id/analytics
  'page--mobilizations-analytics.ol.form.ga-code.validation.invalid.ga-code.format': 'Informe uma ID válida',

  // page block create
  // filepath: /routes/admin/authenticated/sidebar/blocks-create/page.js
  // routepath: /mobilizations/:mobilization_id/blocks/create
  'page--block-create.title': 'Adicione um bloco de conteúdo',
  'page--block-create.tabs.blank-blocks': 'Blocos em branco',
  'page--block-create.helper-text': 'Os blocos serão adicionados ao fim da sua página, mas você pode trocá-los de ordem a qualquer momento',
  'page--block-create.type.label': 'Tipo de bloco',
  'page--block-create.background.label': 'Fundo',
  'page--block-create.background.image.placeholder.text': 'Selecione a imagem de fundo',
  'page--block-create.button-add.text': 'Adicionar',

  // page mobilizations domain
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-settings-domain/page.js
  // routepath: /mobilizations/:mobilization_id/customDomain
  'page--mobilizations-domain.form-domain.success-message': 'Dados de domínio salvos com sucesso',

  // component mobilizations form domain
  // filepath: /client/mobilizations/components/form-domain.js
  // routepath:
  //   - /mobilizations/:mobilization_id/customDomain
  //   - /mobilizations/:mobilization_id/launch
  'mobilizations.components--form-domain.helper-text-first-line': 'Estamos quase lá, agora você precisa escolher qual endereço será utilizado.',
  'mobilizations.components--form-domain.helper-text-second-line': 'Se você já cadastrou um domínio na comunidade, pode selecionar abaixo qual das opções melhor se encaixa!',
  'mobilizations.components--form-domain.helper-text-third-line': 'Para fazer o cadastro de um novo domínio, {link}.',
  'mobilizations.components--form-domain.helper-text-third-line.link': 'clique aqui',

  'mobilizations.components--form-domain.create-domain-text.first-line': 'Ops, você ainda não tem um domínio configurado na sua comunidade. Se quiser cadastar, {link}.',
  'mobilizations.components--form-domain.create-domain-text.first-line.link': 'clique aqui',
  'mobilizations.components--form-domain.create-domain-text.second-line': 'Senão você pode, abaixo, usar um domínio externo para configurar o endereço da sua mobilização.',

  'mobilizations.components--form-domain.basic.header-toggle.use-existing-domain': 'Quero usar um novo sub-domínio',
  'mobilizations.components--form-domain.basic.helper-text': 'Preencha abaixo o subdomínio e escolha o domínio que deseja configurar como endereço da sua mobilização',
  'mobilizations.components--form-domain.basic.form.subdomain.label': 'Subdomínio',
  'mobilizations.components--form-domain.basic.form.subdomain.placeholder': 'nomedamob',
  'mobilizations.components--form-domain.basic.form.domain.label': 'Domínio Principal',

  'mobilizations.components--form-domain.root.header-toggle.use-root-domain': 'Quero usar um domínio principal cadastrado na comunidade',
  'mobilizations.components--form-domain.root.helper-text': 'Escolha o domínio que deseja configurar como endereço da sua mobilização',

  'mobilizations.components--form-domain.advanced.header-toggle': 'Quero direcionar para um domínio externo',
  'mobilizations.components--form-domain.advanced.helper-text': 'Se você quer usar um domínio que comprou mas não está cadastrado na sua comunidade aqui, pode fazer isso. Por exemplo, se você já comprou www.meudominio.com.br você pode usá-lo para este BONDE. Demais, né? Preencha o campo abaixo e siga as orientações:',
  'mobilizations.components--form-domain.advanced.form.external-domain.label': 'Domínio personalizado',
  'mobilizations.components--form-domain.advanced.form.external-domain.placeholder': 'meudominio.com.br',

  'mobilizations.components--form-domain.cname-table.helper-text': '{strong}: você vai precisar configurar este domínio no seu servidor de registro para que o endereço seja redirecionado à página da sua mobilização. Pra isso, você vai precisar dessas informações aqui embaixo, anote aí:',
  'mobilizations.components--form-domain.cname-table.helper-text.strong': 'Não esqueça',
  'mobilizations.components--form-domain.cname-table.header.name': 'Nome',
  'mobilizations.components--form-domain.cname-table.header.record-type': 'Tipo',
  'mobilizations.components--form-domain.cname-table.header.data': 'Dados',
  'mobilizations.components--form-domain.cname-table.footer.helper-text': 'Se tiver alguma dúvida, dá uma olhada no tópico "Configurando seu domínio no BONDE", no nosso tutorial, o {link}.',

  // component mobrender mobilization
  // filepath: /client/mobrender/components/mobilization.js
  // routepath:
  //   - /mobilizations/:mobilization_id/edit
  //   - (public) /
  'mobrender.components--mobilization.footer.slogan': 'Feito pra causar. Feito com',

  // component mobrender block config menu
  // filepath: /client/mobrender/components/block-config-menu.js
  // routepath: /mobilizations/:mobilization_id/edit
  'mobrender.components--block-config-menu.item.change-background': 'Alterar fundo',
  'mobrender.components--block-config-menu.item.toggle-visibility.show': 'Mostrar',
  'mobrender.components--block-config-menu.item.toggle-visibility.hide': 'Esconder',
  'mobrender.components--block-config-menu.item.remove': 'Remover',
  'mobrender.components--block-config-menu.item.remove.confirm': 'Você tem certeza que quer remover este bloco?',
  'mobrender.components--block-config-menu.item.move-up': 'Mover para cima',
  'mobrender.components--block-config-menu.item.move-down': 'Mover para baixo',

  // component mobrender block change background
  // filepath: /client/mobrender/components/block-change-background.js
  // routepath: /mobilizations/:mobilization_id/edit
  'mobrender.components--block-change-background.button.save': 'Salvar',
  'mobrender.components--block-change-background.button.cancel': 'Cancelar',

  // component navigation navbar edition wrapper
  // filepath: /client/components/navigation/navbar/navbar-edition-wrapper.js
  // routepath:
  //   - /mobilizations/:mobilization_id/edit
  //   - (public) /
  'components.navigation--navbar-edition-wrapper.block': 'Bloco',

  // component mobilizations form share
  // filepath: /client/mobilizations/components/form-share.js
  // routepath:
  //   - /mobilizations/:mobilization_id/launch
  //   - /mobilizations/:mobilization_id/sharing
  'mobilizations.components--form-share.facebook.title': 'Share de Facebook',
  'mobilizations.components--form-share.facebook.helper-text': 'Configure o post que será publicado no Facebook sempre que alguém compartilhar a ação. É importante que esses textos sejam cativantes e curtos para não aparecerem cortados. :)',
  'mobilizations.components--form-share.facebook.form.share-image.label': 'Imagem',
  'mobilizations.components--form-share.facebook.form.share-title.label': 'Título do post',
  'mobilizations.components--form-share.facebook.form.share-title.placeholder': 'Um título direto que passe a ideia da sua mobilização',
  'mobilizations.components--form-share.facebook.form.share-description.label': 'Subtítulo do post',
  'mobilizations.components--form-share.facebook.form.share-description.placeholder': 'Complete a informação do título e chame o leitor para a mobilização',

  'mobilizations.components--form-share.twitter.title': 'Share de Twitter',
  'mobilizations.components--form-share.twitter.helper-text': 'Configure a mensagem que será publicada no Twitter sempre que alguém compartilhar sua mobilização.',
  'mobilizations.components--form-share.twitter.form.share-text.label': 'Texto do Tweet',
  'mobilizations.components--form-share.twitter.form.share-text.placeholder': 'Insira uma frase e chame o leitor para a mobilização',

  // page mobilizations launch
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-launch/page.js
  // routepath: /mobilizations/:mobilization_id/launch
  'page--mobilizations-launch.title': 'Lançando sua mobilização',
  'page--mobilizations-launch.steps.form-domain.title': 'Configure o endereço da mobilização',
  'page--mobilizations-launch.steps.form-share.title': 'Configure as informações de compartilhamento',
  'page--mobilizations-launch.steps.done.title': 'Seu BONDE está pronto!',
  'page--mobilizations-launch.steps.done.helper-text': 'Em uma nova aba, digite o endereço que cadastrou na mobilização para se certificar de que ela já está no ar. Se ainda não estiver, cheque se cadastrou os domínios corretamente. Está tudo certo? Então é só esperar ele propagar pela internet!',
  'page--mobilizations-launch.steps.done.button.open': 'Visualizar mobilização',
  'page--mobilizations-launch.button.saving': 'Salvando...',
  'page--mobilizations-launch.button.launch': 'Lançar mobilização',
  'page--mobilizations-launch.button.next': 'Continuar',
  'page--mobilizations-launch.form-share.validation.required': 'Obrigatório',

  // page mobilizations launch end
  // filepath: /routes/admin/authenticated/sidebar/mobilizations-launch-end/page.js
  // routepath: /mobilizations/:mobilization_id/launch/end
  'page--mobilizations-launch-end.heading.all-done': 'Tudo pronto?',
  'page--mobilizations-launch-end.heading.just-launch': 'Agora é só lançar e contar pra todo mundo!',
  'page--mobilizations-launch-end.title': 'Chegou a hora',
  'page--mobilizations-launch-end.button': 'Lançar mobilização',

  // page templates list
  // filepath: /routes/admin/authenticated/sidebar/templates-list/page.js
  // routepath: /mobilizations/templates/list
  'page--templates-list.header.title': 'Seus templates',
  'page--templates-list.empty-list.no-template': 'Nenhum template criado.',
  'page--templates-list.empty-list.create-one': 'Crie a partir de uma mobilização.',
  'page--templates-list.empty-list.mobilization-list': 'Lista de mobilizações',
  'page--templates-list.more-menu-action.remove.text': 'Remover',
  'page--templates-list.more-menu-action.remove.confirm': 'Tem certeza que deseja remover este template? Ao confirmar, não é possível desfazer esta ação.',

  // page templates create
  // filepath: /routes/admin/authenticated/sidebar/templates-create/page.js
  // routepath: /mobilizations/:mobilization_id/templates/create
  'page--templates-create.header.title': 'Crie um template a partir da mobilização',
  'page--templates-create.form.name.label': 'Nome do seu template',
  'page--templates-create.form.name.placeholder': 'Pela criação de uma delegacia de desaparecidos',
  'page--templates-create.form.goal.label': 'Descrição',
  'page--templates-create.form.goal.placeholder': 'Faça um texto curto, capaz de motivar outras pessoas a se unirem à sua mobilização. Você poderá alterar este texto depois.',

  // component donation widget settings menu
  // filepath: /client/mobilizations/widgets/__plugins__/donation/components/settings-menu.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  'donation.components--settings-menu.title': 'Configure o bloco de doação',
  'donation.components--settings-menu.tabs.adjusts': 'Ajustes',
  'donation.components--settings-menu.tabs.autofire': 'Mensagem agradecimento',
  'donation.components--settings-menu.tabs.post-action': 'Pós-doação',

  // page donation widget
  // filepath: /routes/admin/authenticated/sidebar/widgets-donation-settings/donation/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/donation
  'page--donation-widget.header.title': 'Crie um template a partir da mobilização',
  'page--donation-widget.form.submit-button': 'Salvar',
  'page--donation-widget.form.success-message': 'Formulário de doação configurado com sucesso!',
  'page--donation-widget.form.donation-title.label': 'Título do bloco de doação',
  'page--donation-widget.form.donation-title.placeholder': 'Ex.: Escolha um valor e contribua agora!',
  'page--donation-widget.form.payment-type.label': 'Tipo de doação',
  'page--donation-widget.form.payment-type.unique': 'Única',
  'page--donation-widget.form.payment-type.recurring': 'Recorrente',
  'page--donation-widget.form.payment-type.users-choice': 'Usuário escolhe',
  'page--donation-widget.form.payment-interval.label': 'Intervalo da recorrência',
  'page--donation-widget.form.payment-interval.monthly': 'Mensal',
  'page--donation-widget.form.payment-interval.semiannually': 'Semestral',
  'page--donation-widget.form.payment-interval.annually': 'Anual',
  'page--donation-widget.form.main-color.label': 'Defina a cor da página de pagamento',
  'page--donation-widget.form.main-color.helper-text': 'Selecione a cor no box abaixo ou insira o valor em hex, por exemplo: #DC3DCE.',
  'page--donation-widget.form.donation-default-value.label': 'Defina os valores para o bloco de doação',
  'page--donation-widget.form.donation-default-value.helper-text': 'Você pode ter até 5 valores por bloco de doação. Preencha apenas com números inteiros (Ex: 50)',
  'page--donation-widget.form.default-value-01.label': 'Valor 1',
  'page--donation-widget.form.default-value-01.placeholder': 'R$20',
  'page--donation-widget.form.default-value-02.label': 'Valor 2',
  'page--donation-widget.form.default-value-02.placeholder': 'R$50',
  'page--donation-widget.form.default-value-03.label': 'Valor 3',
  'page--donation-widget.form.default-value-03.placeholder': 'R$100',
  'page--donation-widget.form.default-value-04.label': 'Valor 4',
  'page--donation-widget.form.default-value-04.placeholder': 'R$200',
  'page--donation-widget.form.default-value-05.label': 'Valor 5',
  'page--donation-widget.form.default-value-05.placeholder': 'R$500',
  'page--donation-widget.form.default-value.radio.text': 'Default',
  'page--donation-widget.form.default-value.helper-text': '*todos os valores são em reais',
  'page--donation-widget.form.button-text.label': 'Texto do botão de doação',
  'page--donation-widget.form.button-text.placeholder': 'Ex.: Doe agora!',
  'page--donation-widget.form.payment-method.label': 'Habilitar pagamento por boleto?',
  'page--donation-widget.form.payment-method.helper-text': 'Cada boleto pago terá um custo adicional de R$3,00',
  'page--donation-widget.form.payment-method.radio.yes': 'Sim',
  'page--donation-widget.form.payment-method.radio.no': 'Não',
  'page--donation-widget.form.bank-account.label': 'Conta bancária',
  'page--donation-widget.form.bank-account.helper-text': 'Este bloco de doação está associado à conta correspondente da cidade no Pagar.me.',

  // page donation widget (connected)
  // filepath: /routes/admin/authenticated/sidebar/widgets-donation-settings/donation/page.connected.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/donation
  'page--donation-widget.form.validation.button-text.required': 'Insira o texto do botão',
  'page--donation-widget.form.validation.button-text.max-length': 'O limite de caracteres foi atingido.',

  // component widget autofire
  // filepath: /client/mobilizations/widgets/components/form-autofire.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/autofire
  'widgets.components--form-autofire.form.submit-button': 'Salvar',
  'widgets.components--form-autofire.form.success-message': 'Mensagem de agradecimento configurada com sucesso!',
  'widgets.components--form-autofire.form.sender-name.label': 'Nome do remetente',
  'widgets.components--form-autofire.form.sender-name.placeholder': 'Defina o nome que irá aparecer na mensagem enviada.',
  'widgets.components--form-autofire.form.sender-email.label': 'E-mail remetente',
  'widgets.components--form-autofire.form.sender-email.placeholder': 'Defina o e-mail que irá aparecer na mensagem enviada.',
  'widgets.components--form-autofire.form.sender-email.validation.invalid-email-format': 'Informe um e-mail inválido',
  'widgets.components--form-autofire.form.email-subject.label': 'Assunto do e-mail',
  'widgets.components--form-autofire.form.email-subject.placeholder': 'Defina o assunto que irá aparecer na mensagem enviada.',
  'widgets.components--form-autofire.form.email-text.label': 'Email de agradecimento',
  'widgets.components--form-autofire.form.email-text.placeholder': 'Ex: Obrigado por apostar na força da ação coletiva em rede. Sua participação é muito importante e, agora, precisamos da sua ajuda para que mais gente colabore com esta mobilização. Compartilhe nas suas redes clicando em um dos links abaixo. Um abraço.',

  // component widget form finish message
  // filepath: /client/mobilizations/widgets/components/form-finish-message/index.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  'widgets.components--form-finish-message.success-message': 'Formulário salvo com sucesso!',
  'widgets.components--form-finish-message.type.label': 'Tipo de mensagem',
  'widgets.components--form-finish-message.type.radio.share': 'Compartilhar',
  'widgets.components--form-finish-message.type.radio.custom': 'Customizar',
  'widgets.components--form-finish-message.type.validation.required': 'Nenhum tipo de mensagem foi selecionado',
  'widgets.components--form-finish-message.share.whatsapp-text.label': 'Texto do WhatsApp',
  'widgets.components--form-finish-message.share.whatsapp-text.placeholder': 'Faça um texto curto, capaz de motivar outras pessoas a se unirem à sua mobilização. Você poderá alterar este texto depois.',
  'widgets.components--form-finish-message.preview.label': 'Preview',
  'widgets.components--form-finish-message.custom.message.default': 'Clique aqui para editar...',

  // component share tell-a-friend
  // filepath: /client/components/share/tell-a-friend.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  //   - (public) /
  'share.components--tell-a-friend.text': 'Agora, compartilhe com seus amigos!',

  // component share facebook-share-button
  // filepath: /client/components/share/facebook-share-button.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  //   - (public) /
  'share.components--facebook-share-button.text': 'Compartilhar no Facebook',

  // component share twitter-share-button
  // filepath: /client/components/share/twitter-share-button.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  //   - (public) /
  'share.components--twitter-share-button.text': 'Compartilhar no Twitter',

  // component share whatsapp-share-button
  // filepath: /client/components/share/whatsapp-share-button.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  //   - (public) /
  'share.components--whatsapp-share-button.text': 'Compartilhar no WhatsApp',

  // page donation widget finish
  // filepath: /routes/admin/authenticated/sidebar/widgets-donation-settings/finish/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  'page--donation-widget-finish.form.success-message': 'Formulário de pós-doação salvo com sucesso!',

  // component donation widget tell-a-friend
  // filepath: /client/mobilizations/widgets/__plugins__/donation/components/donation-tell-a-friend.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/donation/finish
  //   - (public) /
  'donation.components--tell-a-friend.message': 'Oba, doação registrada! Sua doação é via boleto? Verifique seu email.',

  // config mobrender widgets
  // filepath: /client/mobrender/widgets/config.js
  // routepath: /mobilizations/:mobilization_id/edit
  'widgets.config--content.label': 'Texto',
  'widgets.config--content.default': 'Clique aqui para editar...',
  'widgets.config--form.label': 'Formulário',
  'widgets.config--form.default': 'Obrigado por apostar na força da ação coletiva em rede. Sua participação é muito importante e, agora, precisamos da sua ajuda para que mais gente colabore com esta mobilização. Compartilhe nas suas redes clicando em um dos links abaixo.\n\nUm abraço',
  'widgets.config--pressure.label': 'Pressão',
  'widgets.config--pressure.default.title': 'Envie um e-mail para quem pode tomar essa decisão',
  'widgets.config--pressure.default.button-text': 'Enviar e-mail',
  'widgets.config--donation.label': 'Doação',

  // component donation widget
  // filepath: /client/mobilizations/widgets/__plugins__/donation/components/__donation__/index.js
  // routepath:
  //   - /mobilizations/:mobilization_id/edit
  //   - (public) /
  'widgets.components--donation.default.button-text': 'Doar agora',
  'widgets.components--donation.default.title-text': 'Clique para configurar seu bloco de doação',
  'widgets.components--donation.period-label-options.month': 'mês',
  'widgets.components--donation.period-label-options.halfyear': 'semestre',
  'widgets.components--donation.period-label-options.year': 'ano',
  'widgets.components--donation.users-choice.recurring': 'Apoiar todo {periodLabelCurrent}',
  'widgets.components--donation.users-choice.unique': 'Doação única',

  // component form widget settings menu
  // filepath: /client/mobilizations/widgets/__plugins__/form/components/settings-menu.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/export
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/fields
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  'form-widget.components--settings-menu.title': 'Configure o formulário da sua ação',
  'form-widget.components--settings-menu.items.fields': 'Campos do formulário',
  'form-widget.components--settings-menu.items.adjusts': 'Ajustes',
  'form-widget.components--settings-menu.items.autofire': 'Mensagem agradecimento',
  'form-widget.components--settings-menu.items.report': 'Relatório',
  'form-widget.components--settings-menu.items.post-action': 'Pós-inscrição',

  // page form widget
  // filepath: /routes/admin/authenticated/sidebar/widgets-form-settings/form/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form
  'page--form-widget.form.success-message': 'Formulário configurado com sucesso!',
  'page--form-widget.form.widget-title.label': 'Título do formulário',
  'page--form-widget.form.widget-title.placeholder': 'Ex: Preencha o formulário abaixo para assinar a petição.',
  'page--form-widget.form.button-text.label': 'Botão',
  'page--form-widget.form.button-text.placeholder': 'Defina o texto do botão de confirmação do formulário.',
  'page--form-widget.form.counter-text.label': 'Contador',
  'page--form-widget.form.counter-text.placeholder': 'Defina o texto que ficará ao lado do número de pessoas que agiram.',

  // component data export
  // filepath: /client/mobilizations/widgets/components/data-export.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form/export
  'widgets.components--data-export.formated-export-at': '{date} às {time}',
  'widgets.components--data-export.loading.message': 'Aguarde enquanto estamos processando...',
  'widgets.components--data-export.exported.message': 'Última exportação: {formatedExportAt}.',
  'widgets.components--data-export.export.label': 'Exportar',
  'widgets.components--data-export.export.helper-text': 'Clique no botão abaixo para baixar o relatório completo do formulário em formato excel.',
  'widgets.components--data-export.export.button': 'Clique para baixar a planilha completa.',

  // action async widget data export
  // filepath: /client/mobrender/redux/action-creators/async-widget-data-export.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form/export
  'action--async-widget-data-export.no-data': 'Nao foi encontrado nenhum dado para ser exportado',

  // page form widget fields
  // filepath: /routes/admin/authenticated/sidebar/widgets-form-settings/fields/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form/fields
  'page--form-widget-fields.add-button': 'Adicionar um campo',
  'page--form-widget-fields.helper-text.still-empty': 'Seu formulário ainda não possui nenhum campo. Clique abaixo para começar a adicionar campos.',
  'page--form-widget-fields.helper-text.manage-fields': 'Adicione, remova, edite e ordene os campos do formulário de acordo com as necessidades da sua ação.',

  // component form widget
  // filepath: /client/mobilizations/widgets/__plugins__/form/components/__form__.js
  // routepath:
  //   - /mobilizations/:mobilization_id/edit
  //   - (public) /
  'form-widget.components--form.default.title-text': 'Clique para configurar seu formulário...',
  'form-widget.components--form.default.button-text': 'Enviar',
  'form-widget.components--form.default.counter-suffix': 'assinaturas',

  // component form widget input
  // filepath: /client/mobilizations/widgets/__plugins__/form/components/input.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form/fields
  'form-widget.components--input.click-to-edit': 'Clique para editar',
  'form-widget.components--input.field-dropdown.options.default': 'Selecione...',
  'form-widget.components--input.field-greetings.title': 'Mensagem de sucesso alterada para:',

  // component form widget input form
  // filepath: /client/mobilizations/widgets/__plugins__/form/components/input-form.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form/fields
  'form-widget.components--input-form.handle-remove.confirm': 'Você tem certeza que quer remover este campo?',
  'form-widget.components--input-form.handle-overlay-click.confirm': 'Ao sair sem salvar você perderá suas modificações. Deseja sair sem salvar?',
  'form-widget.components--input-form.field-title.label': 'Título do campo',
  'form-widget.components--input-form.field-title.placeholder': 'Ex: Email',
  'form-widget.components--input-form.field-helper-text.label': 'Texto de ajuda',
  'form-widget.components--input-form.field-helper-text.placeholder': 'Ex: Insira aqui o seu email',
  'form-widget.components--input-form.field-type.label': 'Tipo de campo',
  'form-widget.components--input-form.field-type.options.text': 'Texto',
  'form-widget.components--input-form.field-type.options.email': 'E-mail',
  'form-widget.components--input-form.field-type.options.number': 'Número',
  'form-widget.components--input-form.field-type.options.dropdown': 'Dropdown &#9733;',
  'form-widget.components--input-form.field-type.options.greetings': 'Saudação &#9733;',
  'form-widget.components--input-form.field-required.label': 'Obrigatório',
  'form-widget.components--input-form.field-required.radio.yes.label': 'Sim',
  'form-widget.components--input-form.field-required.radio.no.label': 'Não',
  'form-widget.components--input-form.button-move-up': 'Mover para cima',
  'form-widget.components--input-form.button-move-down': 'Mover para baixo',
  'form-widget.components--input-form.button-remove': 'Remover',
  'form-widget.components--input-form.button-cancel': 'Cancelar',
  'form-widget.components--input-form.button-save.saving': 'Salvando...',
  'form-widget.components--input-form.button-save.default': 'Salvar',

  // component mobrender widget overlay
  // filepath: /client/mobrender/components/widget-overlay.js
  // routepath: /mobilizations/:mobilization_id/edit
  'mobrender.components--widget-overlay.button.edit.title': 'Editar',
  'mobrender.components--widget-overlay.button.remove.title': 'Remover',

  // page form widget finish
  // filepath: /routes/admin/authenticated/sidebar/widgets-form-settings/finish/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  'page--form-widget-finish.success-message': 'Formulário de pós-inscrição salvo com sucesso!',

  // component form widget tell a friend
  // filepath: /client/mobilizations/widgets/__plugins__/form/components/form-tell-a-friend.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/form/finish
  //   - (public) /
  'form-widget.components--tell-a-friend.message': 'Formulário submetido com sucesso!',

  // component pressure widget settings menu
  // filepath: /client/mobilizations/widgets/__plugins__/pressure/components/settings-menu.js
  // routepath:
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/autofire
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  //   - /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  'pressure-widget.components--settings-menu.title': 'Configure seu formulário de pressão',
  'pressure-widget.components--settings-menu.items.form': 'Formulário',
  'pressure-widget.components--settings-menu.items.pressure-email': 'E-mail para alvo',
  'pressure-widget.components--settings-menu.items.autofire': 'Mensagem de agradecimento',
  'pressure-widget.components--settings-menu.items.post-action': 'Pós-pressão',

  // page pressure widget
  // filepath: /routes/admin/authenticated/sidebar/widgets-pressure-settings/pressure/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure
  'page--pressure-widget.success-message': 'Formulário de pressão configurado com sucesso!',
  'page--pressure-widget.form.title-text.label': 'Título do formulário',
  'page--pressure-widget.form.title-text.placeholder': 'Envie um e-mail para quem pode tomar essa decisão',
  'page--pressure-widget.form.button-text.label': 'Texto do botão',
  'page--pressure-widget.form.button-text.placeholder': 'Enviar e-mail',
  'page--pressure-widget.form.main-color.label': 'Cor do formulário',
  'page--pressure-widget.form.show-counter.label': 'Mostrar contador de pressão',
  'page--pressure-widget.form.show-counter.radio.yes.label': 'Sim',
  'page--pressure-widget.form.show-counter.radio.no.label': 'Não',
  'page--pressure-widget.form.counter-text.label': 'Texto do contador',
  'page--pressure-widget.form.counter-text.placeholder': 'pressões feitas',
  'page--pressure-widget.form.show-city-field.label': 'Mostrar campo de cidade',
  'page--pressure-widget.form.show-city-field.radio.yes.label': 'Sim',
  'page--pressure-widget.form.show-city-field.radio.no.label': 'Não',

  // page pressure widget (connected)
  // filepath: /routes/admin/authenticated/sidebar/widgets-pressure-settings/pressure/page.connected.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure
  'page--pressure-widget.form.validation.title-text.required': 'Insira um título para o formulário',
  'page--pressure-widget.form.validation.button-text.required': 'Insira um texto para o botão',

  // component widgets input tag
  // filepath: /client/mobilizations/widgets/components/input-tag.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  'widgets.components--input-tag.helper-text.target-format': '1. Informe nome e email. Ex.: Nome <email@provedor.com>',
  'widgets.components--input-tag.helper-text.enter-to-add': '2. Pressione <Enter> para adicionar mais alvos.',

  // page pressure widget email
  // filepath: /routes/admin/authenticated/sidebar/widgets-pressure-settings/email/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  'page--pressure-widget-email.success-message': 'Email para alvo configurado com sucesso!',
  'page--pressure-widget-email.form.input-tag.label': 'Alvos',
  'page--pressure-widget-email.form.input-tag.validation.invalid-target-format': 'Alvo fora do formato padrão. Ex.: Nome do alvo <alvo@provedor.com>',
  'page--pressure-widget-email.form.email-subject.label': 'Assunto do email',
  'page--pressure-widget-email.form.email-body.label': 'Corpo do email que será enviado',

  // page pressure widget email (connected)
  // filepath: /routes/admin/authenticated/sidebar/widgets-pressure-settings/email/page.connected.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure/email
  'page--pressure-widget-email.form.validation.required': 'Preenchimento obrigatório',

  // page pressure widget finish
  // filepath: /routes/admin/authenticated/sidebar/widgets-pressure-settings/finish/page.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  'page--pressure-widget-finish.success-message': 'Formulário de pós-pressão salvo com sucesso!',

  // component pressure widget tell a friend
  // filepath: /client/mobilizations/widgets/__plugins__/pressure/components/pressure-tell-a-friend.js
  // routepath: /mobilizations/:mobilization_id/widgets/:widget_id/pressure/finish
  'pressure-widget--tell-a-friend.message': 'Pressão enviada',

  //
  // page activists management
  // filepath: {incoming-for-v0.6.x release}
  //
  // if the namenclature of the items was not matching when implementing
  // this feature, consider to make the necessary changes. after it,
  // remove this comment and place the respective filepath of the
  // translation keys.
  //
  // maybe, new intl key name convention can be implemented.
  //   e.g.
  //   - page      ~> `p--`
  //   - component ~> `c--`
  //
  'p--activists-management.header.title': 'Base de usuários',
  'p--activists-management.header.button.upload.text': 'Upload',
  'p--activists-management.header.button.download.text': 'Download',
  'p--activists-management.content.title': '{totalNumber} pessoas',
  'p--activists-management.content.button.tagging.text': 'Etiquetar',
  'p--activists-management.content.button.email.text': 'Email',
  'p--activists-management.content.form-tagging.tags.placeholder': 'Digite tags separadas por vírgula',
  'p--activists-management.content.form-tagging.button.text': 'Adicionar etiqueta',
  'p--activists-management.content.form-tagging.success.message': 'Etiquetas adicionadas com sucesso a {taggedNumber} pessoas',
  'p--activists-management.content.form-tagging.success.undo': 'Desfazer',
  'p--activists-management.content.activist-spotlight.title': 'Perfil selecionado',
  'p--activists-management.content.activist-spotlight.email.label': 'Email',
  'p--activists-management.content.activist-spotlight.phone.label': 'Telefone',
  'p--activists-management.content.activist-spotlight.mobilizations.label': 'Mobilizações',
  'p--activists-management.content.activist-spotlight.tags.label': 'Etiquetas',
  'p--activists-management.content.activist-spotlight.form-tagging.button.text': 'Adicionar',

  // component activists management filterable list
  // filepath: {incoming-for-v0.6.x release}
  'activists-management.c--filterable-list.activist.placeholder': 'Quem você está procurando?',

  'activists-management.c--filterable-list.suggest.placeholder': 'Filtre por mobilizações ou formulários',
  'activists-management.c--filterable-list.suggest.operators.label': 'Operadores',
  'activists-management.c--filterable-list.suggest.operators.options.or.label': 'ou',
  'activists-management.c--filterable-list.suggest.operators.options.and.label': 'e',
  'activists-management.c--filterable-list.suggest.segment.donations.label': 'Doações',
  'activists-management.c--filterable-list.suggest.segment.pressures.label': 'Pressões',
  'activists-management.c--filterable-list.suggest.segment.gen-forms.label': 'Formulários genéricos',
  'activists-management.c--filterable-list.suggest.segment.other-tags.label': 'Outras etiquetas',

  'activists-management.c--filterable-list.period.options.today': 'Hoje',
  'activists-management.c--filterable-list.period.options.last-week': 'Na última semana',
  'activists-management.c--filterable-list.period.options.last-fortnight': 'Nos últimos 15 dias',
  'activists-management.c--filterable-list.period.options.last-month': 'Nos últimos 30 dias',
  'activists-management.c--filterable-list.period.options.last-quarter': 'Nos últimos 3 meses',
  'activists-management.c--filterable-list.period.options.last-year': 'No último ano',
  'activists-management.c--filterable-list.period.options.always': 'Sempre',
  'activists-management.c--filterable-list.period.options.custom-period': 'Customizar período...'
}
