describe('tests', () => {
  let sampleArray = new Array()
  Array.prototype.test = function() {
    return this.innerArray()
  }
  describe('empty', () => {
    it('testArray is empty', () => {
      sampleArray.innerArray = jest.fn(() => [])
      console.log(sampleArray.innerArray()) //['test']
      expect(sampleArray.test().length).toEqual(0)
    })
  })

  describe('not empty', () => {
    it('testArray is not empty', () => {
      sampleArray.innerArray = jest.fn(() => ['test'])
      expect(sampleArray.test().length).toEqual(1)
    })
  })
})
