export class CharacterDoesNotExist extends Error {
  constructor () {
    super('Character does not exist')
    this.name = 'CharacterDoesNotExist'
  }
}
