window.location = {search: []}
// console.log(window.location.search + '10');
describe('tests', () => {
  let sampleArray = new Array()
  Array.prototype.test = function() {
    return this.innerArray()
  }
  describe('empty', () => {
    beforeEach(() => {
      sampleArray.innerArray = jest.fn(() => [])
    })
    it('testArray is empty', () => {
      // console.log(sampleArray.innerArray()) //['test']
      expect(sampleArray.test().length).toEqual(0)
    })
  })

  describe('not empty', () => {
    beforeEach(() => {
      sampleArray.innerArray = jest.fn(() => ['test'])
    })
    it('testArray is not empty', () => {
      expect(sampleArray.test().length).toEqual(1)
    })
  })
})
