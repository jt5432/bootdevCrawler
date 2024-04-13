const {test, expect} = require('@jest/globals')
const {sortPages} = require('./report.js')

test('sort pages', () => {
    const input = {
        'http://wagslane.dev/path': 1,
        'http://wagslane.dev': 3,
        'http://wagslane.dev/path1': 2,
        'http://wagslane.dev/path2': 7,
        'http://wagslane.dev/path3': 5,
        'http://wagslane.dev/path4': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['http://wagslane.dev/path2', 7],
        ['http://wagslane.dev/path3', 5],
        ['http://wagslane.dev', 3],
        ['http://wagslane.dev/path4', 3],
        ['http://wagslane.dev/path1', 2],
        ['http://wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})