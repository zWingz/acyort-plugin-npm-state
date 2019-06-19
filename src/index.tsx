import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { http } from './http'
console.log(http)
http.getRange('@zzwing/react-image', 'last-month')
function App() {
  return <div>app</div>
}

ReactDOM.render(<App />, document.getElementById('app'))
