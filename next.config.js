const withImages = require('next-images')
module.exports = withImages({
  webpack(config, options) {
    return config
  },
  domains: [],
  env: {
    GRAPHCMS_ENDPOINT: 'https://api-eu-central-1.graphcms.com/v2/ckohv5kc0nmxo01z00aewhcq3/master',
    GRAPHCMS_TOKEN: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MjEwOTk1MDEsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2Nrb2h2NWtjMG5teG8wMXowMGFld2hjcTMvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiZDA3Mjk5NmYtNGVlNi00ZDRlLWFhNzUtNmI2ZDcwM2FlY2ZkIiwianRpIjoiY2tvcTBzY3RqbHB5NTAxejI2aHg3ZW91ZiJ9.fY97FpVWtF-OJKaBeE_4S45LCUePxBHDNzQqBscWjBWY5PJ4o_dl1dxxBI9_MJ8rYXr2rIyGZcQGefR0D4iif46Ls0wulETopqSCf6G6utGv0OIZDFriKnWW-mMOYH4hhsy9ALxrZg5GFz_kVWRuXif2elP2eV5cgESbIh1Eb8L1iL052YpJff8k1-IgDzKdPW035WMRffRR8phek_v8oGW39wy2_fLqHSSUC3Z24bvZ6mZpK_EdTubaPYtJb_8C4MrbzANVPAKGZbmWIpm5uoM9izuCujQwsKX60kQh1QkZ6n817Wa1Xe7tuJAeCnPPXrGXIxZes9FRtoK27wYWgmXQYynzl46xnZSlUubc5Czp1xg0xWrVtHMI2Jh0LUqJIsYJTIGTset-Cy-_TiuFXjHVaA5H6p-Txr8HLvNXIa8NwwiR_i-mMpSqIliBqQn2W6zll9qMN2AjXKcGhH14tmP_qv6CQoY1ubPRkvArdxMEuIB2CBO4X3j_GLckGwhmxSMAs-nnrbHwexFzIsAhu7V2zDWAjlEIs4b0G5VC-ugJAbd0K5yENynLFNdMfeA7vJd8L-t81VlittJwYR-euMJp8_T0ToHIlKaD7fb0kGzNCSqJIpkDKhBjAhKi6ixBlsFaql8wueMxxodcfF0o0iCgzQu1835jfC1k-TOcjZg',
    SERVER: 'http://localhost:8000'
  },
})
