export class CandidateNotExistError extends Error {
  constructor() {
    super(
      'Nenhum candidato compativel com as habilidades solicitadas foi encontrado',
    )
  }
}
