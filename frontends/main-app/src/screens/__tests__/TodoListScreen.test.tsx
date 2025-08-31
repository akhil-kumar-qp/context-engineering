// file path: src/screens/__tests__/TodoListScreen.test.tsx
import {screen} from '@testing-library/dom'
import {App} from '../../App'
import {testUtil} from '../../tests/testUtil'

describe('TodoListScreen', () => {
  test('should render correctly', async () => {
    await testUtil.renderWithRoute(<App />, {route: '/'})

    await screen.findByText(/example/i)
  })
})
