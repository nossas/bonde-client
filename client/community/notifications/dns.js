export const checkDNSSuccess = () => ({
  title: 'Uhuu!',
  status: 'success',
  message: 'Os servidores DNS foram sincronizados, ' +
  'agora você pode configurar seu e-mail e outros ' +
  'serviços, assim como escolher o domínio da sua ' +
  'mobilização.',
  dismissAfter: 7000,
  dismissable: true,
  closeButton: false
})

export const checkDNSFailure = () => ({
  title: 'Ooops!',
  status: 'error',
  message: 'A sincronização ainda está pendente, ' +
  'você pode tentar de novo em alguns minutos.',
  dismissAfter: 0,
  dismissable: true,
  closeButton: false
})
