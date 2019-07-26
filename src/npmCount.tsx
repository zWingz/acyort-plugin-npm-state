// https://github.com/npm/registry/blob/master/docs/download-counts.md
import * as React from 'react'
import * as G2 from '@antv/g2'
import { http, NpmDownloadCount, RangeType } from './http'
type Prop = {
  repo: string
  range: RangeType
}

type State = {
  downloads: NpmDownloadCount
  weekType: boolean
}

export class NpmCount extends React.PureComponent<Prop, State> {
  state = {
    downloads: {
      downloads: [],
      start: '',
      end: '',
      package: ''
    },
    weekType: false
  }
  chart: G2.Chart = null
  $el: React.RefObject<HTMLDivElement> = React.createRef()
  async getDownloadCount() {
    const data = await http.getRange(this.props.repo, this.props.range)
    let { downloads } = data
    const { length } = downloads
    let weekType = false
    if (length > 60) {
      weekType = true
      const tmp: NpmDownloadCount['downloads'] = []
      const step = 7
      for (let i = length - 1; i > 0; ) {
        const start = i - step
        const arr = downloads.slice(Math.max(0, start), Math.max(0, i))
        if (!arr.length) return
        tmp.unshift({
          day: `${arr[0].day}/${arr[arr.length - 1].day}`,
          downloads: arr.reduce((sum, each) => sum + each.downloads, 0)
        })
        i = start
      }
      downloads = tmp
    }
    this.setState(
      {
        downloads: {
          ...data,
          downloads
        },
        weekType
      },
      () => {
        this.renderChart()
      }
    )
  }
  async componentDidMount() {
    this.getDownloadCount()
  }
  componentDidUpdate(prevProps: Prop, prevState) {
    const { repo, range } = this.props
    if (prevProps.repo !== repo || prevProps.range !== range) {
      this.getDownloadCount()
    }
  }
  renderChart() {
    const { weekType } = this.state
    let chart: G2.Chart
    if (!this.chart) {
      this.chart = new G2.Chart({
        container: this.$el.current,
        forceFit: true,
        height: 200,
        padding: 'auto'
      })
      chart = this.chart
      chart.scale('downloads', {
        alias: 'download count'
      })
      chart.scale('day', {
        alias: 'day'
        // type: 'time'
      })
      chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      })
      chart
        .line()
        .position('day*downloads')
        .style({
          stroke: 'rgb(200,0,4)'
        })
      chart.source(this.state.downloads.downloads)
      this.chart.render()
    } else {
      this.chart.axis('day', { label: weekType ? null : {} })
      this.chart.changeData(this.state.downloads.downloads)
    }
  }
  render() {
    const { repo } = this.props
    return (
      <div className='chart'>
        <div className='repo-title'>
          <a target='_blank' href={`https://www.npmjs.com/package/${repo}`}>
            {repo}
          </a>
        </div>
        <div className='g2-chart' ref={this.$el} />
      </div>
    )
  }
}
