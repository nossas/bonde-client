export const genericRequestError = () => ({
  title: 'Ops!',
  status: 'error',
  message:
    'Parece que teve algum problema técnico nessa última requisição. ' +
    'Pedimos que tente de novo daqui a pouco.',
  dismissAfter: 0,
  dismissible: true,
  closeButton: false
})
