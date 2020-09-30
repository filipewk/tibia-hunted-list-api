export class CharacterAlreadyAdded extends Error {
  constructor () {
    super('The received character is already added to hunted-list')
    this.name = 'CharacterAlreadyAdded'
  }
}
