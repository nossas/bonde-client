export const bulkInsertSuccess = (intl, context) => ({
  title: intl.formatMessage({
    id: 'routes.admin.sidebar.activists.import-csv.insertActivists.title.success',
    defaultMessage: 'Importação concluída com sucesso!'
  }),
  status: 'success',
  message: intl.formatMessage({
    id: 'routes.admin.sidebar.activists.import-csv.insertActivists.message.success',
    defaultMessage: '{length} ativistas importados com sucesso.'
  }, context),
  dismissAfter: 0,
  dismissable: true,
  closeButton: false
})

export const bulkInsertFail = (intl, context) => ({
  title: intl.formatMessage({
    id: 'routes.admin.sidebar.activists.import-csv.insertActivists.title.fail',
    defaultMessage: 'Ooops!'
  }),
  status: 'error',
  message: intl.formatMessage({
    id: 'routes.admin.sidebar.activists.import-csv.insertActivists.message.fail',
    defaultMessage: '{error}'
  }, context),
  dismissAfter: 0,
  dismissable: true,
  closeButton: false
})
