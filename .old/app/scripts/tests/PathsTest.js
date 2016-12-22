import * as Paths from './../Paths'

describe('Paths', () => {
  describe('#login', () => {
    it('should return the path', () => {
      expect(Paths.login()).to.equal('/login')
    })
  })

  describe('#logout', () => {
    it('should return the path', () => {
      expect(Paths.logout()).to.equal('/logout')
    })
  })

  describe('#mobilizations', () => {
    it('should return the path', () => {
      expect(Paths.mobilizations()).to.equal('/')
    })
  })

  describe('#mobilization', () => {
    it('should return the custom domain when it is set', () => {
      expect(Paths.mobilization({custom_domain: 'meurio.org.br'}, 'reboo.org'))
        .to.equal('http://meurio.org.br')
    })

    it('should return the subdomain address when custom domain is not set', () => {
      expect(Paths.mobilization({slug: 'meurio'}, 'reboo.org'))
        .to.equal('http://meurio.reboo.org')
    })

    it('should return the slug address when custom domain is set and app domain is staging', () => {
      expect(Paths.mobilization({slug: 'meurio'}, 'reboo-staging.org'))
        .to.equal('http://meurio.reboo-staging.org')
    })
  })

  describe('#newMobilization', () => {
    it('should return the path', () => {
      expect(Paths.newMobilization()).to.equal('/mobilizations/new')
    })
  })

  describe('#editMobilization', () => {
    it('should return the path', () => {
      expect(Paths.editMobilization(1)).to.equal('/mobilizations/1/edit')
    })
  })

  describe('#newMobilizationBlock', () => {
    it('should return the path', () => {
      expect(Paths.newMobilizationBlock(1)).to.equal('/mobilizations/1/blocks/new')
    })
  })

  describe('#configDonationMobilizationWidget', () => {
    it('should return the path', () => {
      expect(Paths.donationMobilizationWidget(1, 2)).to.equal('/mobilizations/1/widgets/2/donation')
    })
  })
})
