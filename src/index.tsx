import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { http } from './http'
import { NpmCount } from './npmCount'
import { Provider } from './Context'
import Select from './component/Select'
import './style.less'

declare const npmRepo: string[]

const NPM_REPO = npmRepo

const RANGE_OPTIONS = ['last-week', 'last-month'].map(each => ({
  name: each,
  value: each
}))

function App() {
  const [range, setRange] = React.useState('last-week')
  return (
    <div className='app-container'>
      <h2 className='app-title'>
        <svg viewBox='0 0 780 250'>
          <path
            fill='#231F20'
            d='M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z'
          />
        </svg>
        <span style={{ marginRight: 'auto' }}>Downloads Count</span>
        <Select value={range} options={RANGE_OPTIONS} onChange={setRange} all={false}/>
      </h2>
      <div className='chart-wrapper'>
        {NPM_REPO.map(each => (
          <NpmCount key={each} repo={each} range={range}/>
        ))}
      </div>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('app'))
