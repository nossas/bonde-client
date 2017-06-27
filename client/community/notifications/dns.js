
export const checkDNSSuccess = () => ({
  id: 'notify.community.check--dns--success',
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
  id: 'notify.community.check--dns--failure',
  title: 'Ooops!',
  status: 'error',
  message: 'A alteração de servidores DNS ' +
    'ainda está pendente. Você pode tentar ' +
    'de novo em alguns minutos.',
  dismissAfter: 0,
  dismissable: true,
  closeButton: false
})
