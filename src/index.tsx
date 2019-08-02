import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { RangeType } from './http'
import { NpmCount } from './npmCount'
// import Select from './component/Select'
import { DatePicker } from 'antd'
import * as moment from 'moment'
import './style.less'
import { RangePickerValue } from 'antd/lib/date-picker/interface'

const { RangePicker } = DatePicker
function disabledDate(current) {
  // Can not select days before today and today
  return current && current > moment().endOf('day')
}
declare const NPM_REPO: string[]
const start = moment().subtract(7, 'days')
const end = moment()
const FORMAT = 'YYYY-MM-DD'
function App() {
  const [value, setRange] = React.useState<{
    range: RangePickerValue
    format: RangeType
  }>({
    range: [start, end],
    format: [start.format(FORMAT), end.format(FORMAT)]
  })
  const onChange = React.useCallback((arg1, arg2) => {
    setRange({
      range: arg1,
      format: arg2
    })
  }, [])
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
        <RangePicker
          disabledDate={disabledDate}
          value={value.range}
          onChange={onChange}
        />
      </h2>
      <div className='chart-wrapper'>
        {NPM_REPO.map(each => (
          <NpmCount key={each} repo={each} range={value.format} />
        ))}
      </div>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('app'))
